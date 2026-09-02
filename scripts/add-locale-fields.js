/**
 * Adds the Indonesian counterparts of every translatable field to the
 * `projects` collection.
 *
 * The base fields stay English — that matches the taglines, client and duration
 * values already in the CMS, and keeps the existing URLs, sitemap and canonical
 * tags pointing at the English pages. Indonesian lives in `<field>_id`.
 *
 * Idempotent: a field that already exists is left alone, so this can be re-run
 * after adding a name to LOCALE_FIELDS.
 *
 *   pnpm pb:schema -- --dry-run
 *   pnpm pb:schema
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')
const DRY_RUN = process.argv.includes('--dry-run')

// Suffix, not prefix: `overview_id` reads as "the Indonesian overview", while a
// prefix would collide with how PocketBase names its own record identifier.
const LOCALE_SUFFIX = '_id'

/** Source field -> the type its translation should copy. */
const LOCALE_FIELDS = [
  'tagline',
  'overview',
  'challenge',
  'approach',
  'solution',
  'contribution',
  'outcome',
  'client',
  'duration',
]

async function authenticate() {
  const identity = process.env.PB_ADMIN_EMAIL
  const password = process.env.PB_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD
  if (!identity || !password) {
    throw new Error('set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD (or ADMIN_PASSWORD) in .env')
  }

  for (const url of [
    `${PB_URL}/api/collections/_superusers/auth-with-password`,
    `${PB_URL}/api/admins/auth-with-password`,
  ]) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, email: identity, password }),
    })
    if (response.ok) return (await response.json()).token
    if (response.status !== 404) {
      throw new Error(`auth failed (${response.status}) — check the credentials in .env`)
    }
  }
  throw new Error('no usable auth endpoint')
}

async function main() {
  const token = await authenticate()

  const collections = await (
    await fetch(`${PB_URL}/api/collections?perPage=200`, { headers: { Authorization: token } })
  ).json()

  const collection = collections.items.find((c) => c.name === 'projects')
  if (!collection) throw new Error('no `projects` collection')

  // Older PocketBase calls it `schema`; newer ones call it `fields`.
  const key = collection.schema ? 'schema' : 'fields'
  const fields = collection[key]
  const existing = new Set(fields.map((f) => f.name))

  const backup = path.join(root, 'scripts', `.pb-schema-backup-${Date.now()}.json`)
  writeFileSync(backup, JSON.stringify(collection, null, 2))
  console.log(`backup: ${path.relative(root, backup)}\n`)

  const additions = []
  for (const name of LOCALE_FIELDS) {
    const target = `${name}${LOCALE_SUFFIX}`
    if (existing.has(target)) {
      console.log(`  = ${target.padEnd(20)} sudah ada`)
      continue
    }

    const source = fields.find((f) => f.name === name)
    if (!source) {
      console.error(`  ✗ ${name.padEnd(20)} field asalnya tidak ada — dilewati`)
      continue
    }

    // Copy the source field's type and options so the pair behaves identically,
    // but never carry over its id or `required`: a translation may lag behind.
    const { id: _id, name: _name, required: _required, ...rest } = source
    additions.push({ ...rest, name: target, required: false })
    console.log(`  + ${target.padEnd(20)} ${source.type} (menyalin ${name})`)
  }

  if (additions.length === 0) {
    console.log('\nTidak ada yang perlu ditambah.')
    return
  }

  if (DRY_RUN) {
    console.log(`\n[dry run] ${additions.length} field akan ditambahkan. Tidak ada yang dikirim.`)
    return
  }

  const response = await fetch(`${PB_URL}/api/collections/${collection.id}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ [key]: [...fields, ...additions] }),
  })

  if (!response.ok) {
    throw new Error(`${response.status}: ${(await response.text()).slice(0, 400)}`)
  }

  console.log(`\n[selesai] ${additions.length} field ditambahkan.`)
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
