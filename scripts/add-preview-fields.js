/**
 * Adds the fields the in-page project preview needs to the `projects`
 * collection.
 *
 * Until now the detail page inferred everything from one signal: a `liveurl`
 * either existed or it did not. That conflates four different situations — a
 * public site, a sanitised demo, a client system nobody outside may open, and
 * something that used to be live and no longer is. Each deserves a different
 * call to action, so the distinction becomes an explicit field instead of an
 * accident of an empty column.
 *
 * Idempotent: an existing field is left exactly as it is, so this can be re-run
 * after adding an entry to FIELDS.
 *
 *   pnpm pb:preview -- --dry-run
 *   pnpm pb:preview
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')
const DRY_RUN = process.argv.includes('--dry-run')

/**
 * Every field is optional. A record that has none of them still renders the
 * page it renders today — the mapper derives sane values from `liveurl`.
 */
const FIELDS = [
  {
    name: 'access',
    type: 'select',
    options: { maxSelect: 1, values: ['public', 'demo', 'internal', 'archived'] },
    note: 'who may open the real thing',
  },
  {
    name: 'demourl',
    type: 'url',
    options: { exceptDomains: null, onlyDomains: null },
    note: 'sanitised deployment, dummy data',
  },
  { name: 'demonote', type: 'text', note: 'one line: what the demo is and is not' },
  { name: 'demonote_id', type: 'text', note: 'Indonesian demonote' },
  {
    name: 'previewmode',
    type: 'select',
    options: { maxSelect: 1, values: ['auto', 'embed', 'sandbox', 'media'] },
    note: 'what fills the hero slot; auto picks by what is filled in',
  },
  { name: 'sandboxid', type: 'text', note: 'folder name under src/demos/' },
  {
    name: 'walkthrough',
    type: 'json',
    options: { maxSize: 2000000 },
    note: 'annotated screen steps',
  },
  {
    name: 'snippets',
    type: 'json',
    options: { maxSize: 2000000 },
    note: 'request/response blocks for API projects',
  },
  {
    name: 'repos',
    type: 'json',
    options: { maxSize: 2000000 },
    note: 'more than one repository per project: [{label, url}]',
  },
  {
    name: 'sourcehidden',
    type: 'bool',
    options: {},
    note: 'true hides the repository link without deleting githuburl',
  },
]

const DEFAULT_TEXT_OPTIONS = { min: null, max: null, pattern: '' }

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
  for (const { note, name, type, options = DEFAULT_TEXT_OPTIONS } of FIELDS) {
    if (existing.has(name)) {
      console.log(`  = ${name.padEnd(16)} sudah ada`)
      continue
    }

    // PocketBase moved the per-type settings out of an `options` object and
    // onto the field itself in the same release that renamed `schema` to
    // `fields`, so the shape follows whichever this server speaks.
    additions.push(
      key === 'schema'
        ? { system: false, name, type, required: false, presentable: false, unique: false, options }
        : { name, type, required: false, presentable: false, ...options }
    )
    console.log(`  + ${name.padEnd(16)} ${type.padEnd(7)} ${note}`)
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
