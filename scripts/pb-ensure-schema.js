/**
 * Tambah field yang belum ada di koleksi PocketBase `projects`.
 *
 * Hanya MENAMBAH. Field lama disalin apa adanya — tipe, nama, dan opsinya tidak
 * pernah diubah atau dihapus. Snapshot skema lama disimpan ke
 * scripts/.pb-schema-backup-<timestamp>.json sebelum menulis.
 *
 * Tipe field media (video, visualDetails) mengikuti tipe field `image` yang
 * sudah ada, supaya konsisten dengan cara koleksi ini dibuat.
 *
 * Pakai:
 *   node scripts/pb-ensure-schema.js --dry-run   # lihat rencana perubahan
 *   node scripts/pb-ensure-schema.js             # terapkan
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

const DRY_RUN = process.argv.includes('--dry-run');

const unquote = (v) => (v || '').replace(/^"|"$/g, '').replace(/\/+$/, '');
const PB_URL = unquote(process.env.PB_URL || 'https://faidz.fun/pb');
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL;
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD;
const COLLECTION = process.env.PB_COLLECTION || 'projects';

async function pb(pathname, { token, ...init } = {}) {
  const res = await fetch(`${PB_URL}${pathname}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {}),
      ...init.headers,
    },
  });
  const text = await res.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    const err = new Error(`${res.status} ${pathname}: server membalas HTML, bukan JSON. Cek apakah ${PB_URL} masih hidup.`);
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

async function authAdmin() {
  const body = JSON.stringify({ identity: PB_ADMIN_EMAIL, password: PB_ADMIN_PASSWORD });
  const endpoints = [
    '/api/admins/auth-with-password',
    '/api/collections/_superusers/auth-with-password',
  ];
  for (const endpoint of endpoints) {
    try {
      return (await pb(endpoint, { method: 'POST', body })).token;
    } catch (err) {
      if (err.status !== 404) throw err;
    }
  }
  throw new Error('Endpoint auth admin tidak ditemukan di server ini.');
}

const textField = (name) => ({ name, type: 'text', required: false, options: {} });
const jsonField = (name) => ({ name, type: 'json', required: false, options: { maxSize: 2000000 } });
const fileField = (name, maxSelect, mimeTypes) => ({
  name,
  type: 'file',
  required: false,
  options: { maxSelect, maxSize: 52428800, mimeTypes, thumbs: [], protected: false },
});

const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const VIDEO_MIMES = ['video/mp4', 'video/webm', 'video/quicktime'];

async function main() {
  if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
    console.error('PB_ADMIN_EMAIL / PB_ADMIN_PASSWORD belum diset di .env');
    process.exit(1);
  }

  const token = await authAdmin();
  const col = await pb(`/api/collections/${COLLECTION}`, { token });
  const existing = col.fields ?? col.schema ?? [];
  const key = 'fields' in col ? 'fields' : 'schema';

  const backup = path.join('scripts', `.pb-schema-backup-${Date.now()}.json`);
  fs.writeFileSync(backup, JSON.stringify(col, null, 2));
  console.log(`Snapshot skema lama: ${backup}`);

  const have = new Map(existing.map((f) => [f.name.toLowerCase(), f]));
  console.log(`Field sekarang: ${existing.map((f) => `${f.name}:${f.type}`).join(', ')}\n`);

  // Ikuti tipe `image` supaya video/visualDetails konsisten dengannya.
  const imageType = have.get('image')?.type ?? 'text';
  const mediaIsFile = imageType === 'file';
  console.log(`image bertipe "${imageType}" — video/visualdetails dibuat sebagai ${mediaIsFile ? 'file' : 'text/json'}\n`);

  const wanted = [
    textField('challenge'),
    textField('approach'),
    textField('solution'),
    textField('contribution'),
    textField('outcome'),
    textField('role'),
    textField('client'),
    textField('duration'),
    textField('color'),
    textField('liveurl'),
    textField('nextprojectslug'),
    jsonField('team'),
    mediaIsFile ? fileField('video', 1, VIDEO_MIMES) : textField('video'),
    mediaIsFile ? fileField('visualdetails', 8, IMAGE_MIMES) : jsonField('visualdetails'),
  ];

  const toAdd = wanted.filter((f) => !have.has(f.name.toLowerCase()));
  if (!toAdd.length) {
    console.log('Semua field sudah ada. Tidak ada perubahan.');
    return;
  }

  console.log(`Akan ditambah (${toAdd.length}): ${toAdd.map((f) => `${f.name}:${f.type}`).join(', ')}`);
  if (DRY_RUN) {
    console.log('\n[dry-run] tidak ada yang ditulis.');
    return;
  }

  // Kirim field lama utuh + field baru. Objek lama tidak disentuh sama sekali.
  await pb(`/api/collections/${col.id}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ [key]: [...existing, ...toAdd] }),
  });

  const after = await pb(`/api/collections/${COLLECTION}`, { token });
  const afterFields = after.fields ?? after.schema ?? [];
  console.log(`\nSelesai. Field sekarang: ${afterFields.map((f) => `${f.name}:${f.type}`).join(', ')}`);
}

main().catch((err) => {
  console.error(err.message, err.data ?? '');
  process.exit(1);
});
