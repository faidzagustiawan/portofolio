/**
 * Migrasi data projects dari src/data/projects.js ke PocketBase.
 *
 * Kredensial dibaca dari .env (jangan di-hardcode di file ini):
 *   PB_URL=https://faidz.fun/pb
 *   PB_ADMIN_EMAIL=...
 *   PB_ADMIN_PASSWORD=...
 *   VITE_R2_PUBLIC_URL=https://pub-xxxx.r2.dev
 *
 * Pakai:
 *   node scripts/migrate-to-pb.js --dry-run      # lihat payload, tanpa nulis ke server
 *   node scripts/migrate-to-pb.js                # simpan URL R2 apa adanya (default)
 *   node scripts/migrate-to-pb.js --upload-media # download dari R2, upload ke field file PocketBase
 *   node scripts/migrate-to-pb.js --check-media  # cek semua URL media saja, tanpa nulis
 *   node scripts/migrate-to-pb.js --only=finote  # satu slug saja
 *
 * Idempoten: record dicocokkan lewat `slug`. Ada = update, belum ada = create.
 */
import 'dotenv/config';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const UPLOAD_MEDIA = args.includes('--upload-media');
const CHECK_MEDIA = args.includes('--check-media');
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1] ?? null;

const unquote = (v) => (v || '').replace(/^"|"$/g, '').replace(/\/+$/, '');
const PB_URL = unquote(process.env.PB_URL || 'https://faidz.fun/pb');
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;
const R2_BASE_URL = unquote(process.env.VITE_R2_PUBLIC_URL);
const COLLECTION = process.env.PB_COLLECTION || 'projects';

/** Baca projects.js sebagai ES module asli; cuma tukar `import.meta.env` yang tidak ada di Node. */
async function readProjects() {
  const src = path.resolve('src/data/projects.js');
  const code = fs
    .readFileSync(src, 'utf-8')
    .replace(/import\.meta\.env\.VITE_R2_PUBLIC_URL/g, JSON.stringify(R2_BASE_URL));

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pb-migrate-'));
  const tmp = path.join(dir, 'projects.mjs');
  fs.writeFileSync(tmp, code);
  try {
    const mod = await import(pathToFileURL(tmp).href);
    return mod.projects;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

async function pb(pathname, { token, ...init } = {}) {
  const res = await fetch(`${PB_URL}${pathname}`, {
    ...init,
    headers: {
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: token } : {}),
      ...init.headers,
    },
  });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // Bukan JSON — biasanya halaman error dari proxy/CDN di depan PocketBase.
    const err = new Error(
      `${res.status} ${pathname}: server membalas HTML, bukan JSON. ` +
        `Cek apakah ${PB_URL} masih hidup. Cuplikan: ${text.slice(0, 120).replace(/\s+/g, ' ')}`
    );
    err.status = res.status;
    throw err;
  }
  if (!res.ok) {
    const err = new Error(`${res.status} ${pathname}: ${body?.message || text}`);
    err.status = res.status;
    err.data = body?.data;
    throw err;
  }
  return body;
}

/** PocketBase < 0.23 pakai /api/admins, >= 0.23 pakai collection _superusers. */
async function authAdmin() {
  const body = JSON.stringify({ identity: PB_ADMIN_EMAIL, password: PB_ADMIN_PASSWORD });
  const endpoints = [
    '/api/admins/auth-with-password',
    '/api/collections/_superusers/auth-with-password',
  ];
  for (const endpoint of endpoints) {
    try {
      const data = await pb(endpoint, { method: 'POST', body });
      return data.token;
    } catch (err) {
      if (err.status !== 404) throw err;
    }
  }
  throw new Error('Endpoint auth admin tidak ditemukan di server ini.');
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Ambil skema koleksi supaya payload cuma berisi field yang benar-benar ada. */
async function readSchema(token) {
  const col = await pb(`/api/collections/${COLLECTION}`, { token });
  const fields = col.fields ?? col.schema ?? [];
  const byNormalized = new Map();
  for (const f of fields) byNormalized.set(normalize(f.name), f);
  return { collectionId: col.id, fields, byNormalized };
}

async function fetchAsBlob(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} gagal ambil media: ${url}`);
  return new Blob([await res.arrayBuffer()], {
    type: res.headers.get('content-type') || 'application/octet-stream',
  });
}

const PB_FILE_LIMIT = 50 * 1024 * 1024;

/**
 * Cek semua URL media sebelum menulis apa pun, supaya migrasi tidak berhenti
 * di tengah dan meninggalkan sebagian record sudah ter-update sebagian belum.
 */
async function preflightMedia(projects) {
  const urls = [];
  for (const p of projects) {
    for (const u of [p.image, p.video, ...(p.visualDetails ?? []), ...(p.team ?? []).map((t) => t.avatar)]) {
      if (u) urls.push(u);
    }
  }
  const unique = [...new Set(urls)];
  console.log(`Preflight: cek ${unique.length} URL media...`);

  const results = await Promise.all(
    unique.map(async (u) => {
      try {
        let res = await fetch(u, { method: 'HEAD' });
        // Sebagian CDN menolak HEAD; coba range 1 byte sebagai cadangan.
        if (!res.ok) res = await fetch(u, { headers: { Range: 'bytes=0-0' } });
        return { url: u, ok: res.ok, size: Number(res.headers.get('content-length') || 0) };
      } catch (err) {
        return { url: u, ok: false, size: 0, error: err.message };
      }
    })
  );

  const bad = results.filter((r) => !r.ok);
  const oversize = results.filter((r) => r.ok && r.size > PB_FILE_LIMIT);

  if (bad.length) {
    console.error(`\n${bad.length}/${unique.length} media tidak bisa diambil:`);
    for (const r of bad.slice(0, 10)) console.error(`  ${r.url} — ${r.error ?? 'HTTP error'}`);
    if (bad.length > 10) console.error(`  ...dan ${bad.length - 10} lagi`);
    console.error('\nPeriksa VITE_R2_PUBLIC_URL dan akses jaringan ke host itu.');
    return false;
  }
  if (oversize.length) {
    console.error('\nMelebihi batas 50MB per file di koleksi PocketBase:');
    for (const r of oversize) console.error(`  ${r.url} — ${(r.size / 1048576).toFixed(1)}MB`);
    return false;
  }

  const total = results.reduce((sum, r) => sum + r.size, 0);
  console.log(`Preflight OK — ${unique.length} file, total ${(total / 1048576).toFixed(1)}MB\n`);
  return true;
}

/** Nilai mentah per project, sebelum dicocokkan ke skema. */
function buildValues(project) {
  return {
    slug: project.slug,
    name: project.name,
    tagline: project.tagline,
    featured: Boolean(project.featured),
    year: project.year ? Number.parseInt(project.year, 10) : null,
    category: project.category,
    technologies: project.technologies ?? [],
    overview: project.overview,
    challenge: project.challenge,
    approach: project.approach,
    solution: project.solution,
    contribution: project.contribution,
    outcome: project.outcome,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    nextProjectSlug: project.nextProjectSlug,
    role: project.role,
    client: project.client,
    duration: project.duration,
    color: project.color,
    team: project.team ?? [],
    image: project.image,
    video: project.video,
    visualDetails: project.visualDetails ?? [],
  };
}

const isEmpty = (v) =>
  v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

/**
 * Cocokkan nilai ke field yang ada di skema dan sesuaikan tipenya.
 * files hanya terisi kalau field-nya bertipe `file` dan --upload-media aktif.
 */
function shapePayload(values, schema) {
  const record = {};
  const files = [];
  const skipped = [];
  const fileSkips = [];

  for (const [key, rawValue] of Object.entries(values)) {
    const field = schema.byNormalized.get(normalize(key));
    if (!field) {
      if (!isEmpty(rawValue)) skipped.push(key);
      continue;
    }

    if (field.type === 'file') {
      if (!UPLOAD_MEDIA) {
        if (!isEmpty(rawValue)) fileSkips.push(key);
        continue;
      }
      const urls = (Array.isArray(rawValue) ? rawValue : [rawValue]).filter(Boolean);
      for (const url of urls) {
        files.push({ field: field.name, url, filename: path.basename(new URL(url).pathname) });
      }
      continue;
    }

    let value = rawValue;
    if (value === null || value === undefined) {
      value = field.type === 'number' ? null : '';
    } else if (field.type === 'number') {
      value = value === '' ? null : Number(value);
    } else if (field.type === 'bool') {
      value = Boolean(value);
    } else if (field.type === 'json' || field.type === 'select') {
      // array/objek dikirim apa adanya
    } else if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    record[field.name] = value;
  }

  return { record, files, skipped, fileSkips };
}

async function toBody(record, files) {
  if (!files.length) return JSON.stringify(record);
  const form = new FormData();
  for (const [k, v] of Object.entries(record)) {
    form.append(k, typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v ?? ''));
  }
  for (const f of files) {
    form.append(f.field, await fetchAsBlob(f.url), f.filename);
  }
  return form;
}

async function main() {
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    console.error('PB_ADMIN_EMAIL / PB_ADMIN_PASSWORD belum diset di .env');
    process.exit(1);
  }
  if (!R2_BASE_URL) {
    console.error('VITE_R2_PUBLIC_URL belum diset di .env — URL media akan kosong.');
    process.exit(1);
  }

  let projects = await readProjects();
  if (ONLY) projects = projects.filter((p) => p.slug === ONLY);
  if (!projects.length) {
    console.error(ONLY ? `Tidak ada project dengan slug "${ONLY}".` : 'projects.js kosong.');
    process.exit(1);
  }

  if (CHECK_MEDIA) {
    process.exit((await preflightMedia(projects)) ? 0 : 1);
  }
  if (UPLOAD_MEDIA && !DRY_RUN && !(await preflightMedia(projects))) {
    console.error('Migrasi dibatalkan — tidak ada record yang disentuh.');
    process.exit(1);
  }

  const token = await authAdmin();
  const schema = await readSchema(token);
  console.log(
    `Koleksi "${COLLECTION}": ${schema.fields.map((f) => `${f.name}:${f.type}`).join(', ')}`
  );
  console.log(
    `${projects.length} project. media=${UPLOAD_MEDIA ? 'upload ke PocketBase' : 'simpan URL R2'}${DRY_RUN ? ' (dry-run)' : ''}\n`
  );

  const warned = new Set();
  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const project of projects) {
    const { record, files, skipped, fileSkips } = shapePayload(buildValues(project), schema);
    for (const s of skipped) {
      if (!warned.has(s)) {
        warned.add(s);
        console.warn(`  ! "${s}" tidak ada di koleksi — dilewati`);
      }
    }
    for (const s of fileSkips) {
      const msg = `file:${s}`;
      if (!warned.has(msg)) {
        warned.add(msg);
        console.warn(`  ! "${s}" adalah field file — jalankan dengan --upload-media untuk mengisinya`);
      }
    }

    const filter = encodeURIComponent(`slug='${project.slug}'`);
    const existing = await pb(
      `/api/collections/${COLLECTION}/records?perPage=1&filter=${filter}`,
      { token }
    );
    const hit = existing.items[0];

    if (DRY_RUN) {
      console.log(`[dry-run] ${hit ? 'UPDATE' : 'CREATE'} ${project.slug}`, {
        ...record,
        _files: files.map((f) => `${f.field}:${f.filename}`),
      });
      continue;
    }

    try {
      const body = await toBody(record, files);
      if (hit) {
        await pb(`/api/collections/${COLLECTION}/records/${hit.id}`, {
          method: 'PATCH',
          token,
          body,
        });
        updated += 1;
        console.log(`updated  ${project.slug}`);
      } else {
        await pb(`/api/collections/${COLLECTION}/records`, { method: 'POST', token, body });
        created += 1;
        console.log(`created  ${project.slug}`);
      }
    } catch (err) {
      failed += 1;
      console.error(`FAILED   ${project.slug}: ${err.message}`, err.data ?? '');
    }
  }

  if (!DRY_RUN) console.log(`\nSelesai. created=${created} updated=${updated} failed=${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
