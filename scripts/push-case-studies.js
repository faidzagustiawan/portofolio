/**
 * Pushes content/case-studies.json into the PocketBase `projects` collection.
 *
 * Two rules make this safe to run repeatedly:
 *
 *   1. Any value still containing "[ISI" is skipped. Those are the parts only
 *      Faidz can write — client names, user counts, team split — and publishing
 *      the bracket text would be worse than leaving the old copy in place.
 *   2. Every record is backed up to scripts/.pb-content-backup-<ts>.json before
 *      the first write, so a bad run can be undone.
 *
 *   pnpm pb:content -- --dry-run    report what would change, send nothing
 *   pnpm pb:content                 apply it
 */
import { writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')
const SOURCE = path.join(root, 'content', 'case-studies.json')

const DRY_RUN = process.argv.includes('--dry-run')
const PLACEHOLDER = '[ISI'

const isIncomplete = (value) => typeof value === 'string' && value.includes(PLACEHOLDER)

/** This instance predates the _superusers collection, so try both routes. */
async function authenticate(email, password) {
  for (const url of [
    `${PB_URL}/api/collections/_superusers/auth-with-password`,
    `${PB_URL}/api/admins/auth-with-password`,
  ]) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: email, email, password }),
    })
    if (response.ok) return (await response.json()).token
    if (response.status !== 404) {
      throw new Error(`auth failed (${response.status}) — check PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD`)
    }
  }
  throw new Error('no usable auth endpoint — check VITE_PB_URL')
}

async function fetchRecords(token) {
  const response = await fetch(`${PB_URL}/api/collections/projects/records?perPage=200`, {
    headers: token ? { Authorization: token } : {},
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`project feed responded ${response.status}`)
  return (await response.json()).items || []
}

async function patchRecord(token, id, fields) {
  const response = await fetch(`${PB_URL}/api/collections/projects/records/${id}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })
  if (!response.ok) {
    throw new Error(`${response.status}: ${(await response.text()).slice(0, 300)}`)
  }
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

function main() {
  const content = JSON.parse(readFileSync(SOURCE, 'utf8'))
  const email = process.env.PB_ADMIN_EMAIL
  const password = process.env.PB_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

  if (!DRY_RUN && (!email || !password)) {
    console.error('Set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD in .env (never .env.production).')
    process.exitCode = 1
    return
  }

  return run(content, email, password)
}

async function run(content, email, password) {
  const token = DRY_RUN ? null : await authenticate(email, password)
  const records = await fetchRecords(token)
  const bySlug = new Map(records.map((r) => [r.slug, r]))

  if (!DRY_RUN) {
    const backup = path.join(root, 'scripts', `.pb-content-backup-${Date.now()}.json`)
    writeFileSync(backup, JSON.stringify(records, null, 2))
    console.log(`backup: ${path.relative(root, backup)}\n`)
  }

  let written = 0
  let held = 0

  for (const [slug, fields] of Object.entries(content)) {
    if (slug.startsWith('_')) continue

    const record = bySlug.get(slug)
    if (!record) {
      console.error(`  ✗ ${slug.padEnd(22)} no record with this slug`)
      continue
    }

    const changes = {}
    const skipped = []
    const unchanged = []

    for (const [field, value] of Object.entries(fields)) {
      if (isIncomplete(value)) {
        skipped.push(field)
        continue
      }
      // technologies comes back as an array or a JSON string depending on the field type.
      const current =
        field === 'technologies' && typeof record[field] === 'string'
          ? JSON.parse(record[field])
          : record[field]

      if (same(current, value)) unchanged.push(field)
      else changes[field] = value
    }

    const changed = Object.keys(changes)
    held += skipped.length

    if (changed.length === 0) {
      console.log(`  = ${slug.padEnd(22)} tidak ada perubahan${skipped.length ? `  · ditahan: ${skipped.join(', ')}` : ''}`)
      continue
    }

    if (DRY_RUN) {
      console.log(`  · ${slug.padEnd(22)} akan tulis: ${changed.join(', ')}`)
    } else {
      try {
        await patchRecord(token, record.id, changes)
        written += changed.length
        console.log(`  → ${slug.padEnd(22)} ditulis: ${changed.join(', ')}`)
      } catch (err) {
        console.error(`  ✗ ${slug.padEnd(22)} ${err.message}`)
        continue
      }
    }

    if (skipped.length) console.log(`    ${' '.repeat(22)} ditahan: ${skipped.join(', ')}`)
    if (unchanged.length) console.log(`    ${' '.repeat(22)} sudah sama: ${unchanged.join(', ')}`)
  }

  console.log()
  if (DRY_RUN) {
    console.log(`[dry run] ${held} field ditahan karena masih memuat "${PLACEHOLDER}". Tidak ada yang dikirim.`)
  } else {
    console.log(`[selesai] ${written} field ditulis, ${held} ditahan karena masih memuat "${PLACEHOLDER}".`)
    if (written > 0) {
      console.log('Halaman di-prerender saat build — jalankan deploy supaya perubahan ini tayang.')
    }
  }
}

Promise.resolve(main()).catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
