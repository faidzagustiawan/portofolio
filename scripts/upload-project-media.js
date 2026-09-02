/**
 * Uploads project media to PocketBase in bulk, so the eight records do not have
 * to be edited one at a time in the admin UI.
 *
 * Layout it expects (folder name = the project's slug):
 *
 *   media/
 *     pantausam/
 *       image.jpg          -> image           (one file, 5 MB limit)
 *       video.mp4          -> video           (optional, one file)
 *       detail-1.jpg       -> visualdetails   (optional, any number)
 *       detail-2.jpg
 *
 * Only fields with a matching local file are touched; anything absent is left
 * as it is on the record. Run with --dry-run first — it reports exactly what
 * would be sent and needs no credentials.
 *
 *   pnpm pb:upload -- --dry-run
 *   pnpm pb:upload
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const MEDIA_DIR = path.join(root, 'media')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')

const DRY_RUN = process.argv.includes('--dry-run')

// The image field is capped at 5 MB by the collection schema; anything larger
// is rejected by the server, so it is worth catching before the upload.
const IMAGE_MAX_BYTES = 5 * 1024 * 1024

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif']
const VIDEO_EXT = ['.mp4', '.webm', '.mov']

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
}

const human = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

/** PocketBase renamed the admin auth route; try the current one, then the old. */
async function authenticate(email, password) {
  const routes = [
    `${PB_URL}/api/collections/_superusers/auth-with-password`,
    `${PB_URL}/api/admins/auth-with-password`,
  ]

  for (const url of routes) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: email, email, password }),
    })

    if (response.ok) return (await response.json()).token
    if (response.status !== 404) {
      const detail = await response.text()
      throw new Error(`auth failed (${response.status}): ${detail.slice(0, 200)}`)
    }
  }

  throw new Error('no usable auth endpoint — check VITE_PB_URL')
}

async function fetchProjects(token) {
  const url = `${PB_URL}/api/collections/projects/records?perPage=200`
  const response = await fetch(url, {
    headers: token ? { Authorization: token } : {},
    signal: AbortSignal.timeout(20_000),
  })
  if (!response.ok) throw new Error(`project feed responded ${response.status}`)
  return (await response.json()).items || []
}

/** Reads one slug folder into the set of fields it wants to update. */
function collectMedia(slugDir) {
  const files = readdirSync(slugDir).filter((name) => !name.startsWith('.'))
  const found = { image: null, video: null, visualdetails: [] }

  for (const name of files.sort()) {
    const ext = path.extname(name).toLowerCase()
    const full = path.join(slugDir, name)
    if (!statSync(full).isFile()) continue

    const base = path.basename(name, ext).toLowerCase()

    if (base === 'image' && IMAGE_EXT.includes(ext)) found.image = full
    else if (base === 'video' && VIDEO_EXT.includes(ext)) found.video = full
    else if (base.startsWith('detail') && IMAGE_EXT.includes(ext)) found.visualdetails.push(full)
  }

  return found
}

function toFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return new File([readFileSync(filePath)], path.basename(filePath), {
    type: MIME[ext] || 'application/octet-stream',
  })
}

async function updateRecord(token, id, media) {
  const form = new FormData()

  if (media.image) form.set('image', toFile(media.image))
  if (media.video) form.set('video', toFile(media.video))
  // Repeating the key is how PocketBase receives a multi-file field.
  for (const detail of media.visualdetails) form.append('visualdetails', toFile(detail))

  const response = await fetch(`${PB_URL}/api/collections/projects/records/${id}`, {
    method: 'PATCH',
    headers: { Authorization: token },
    body: form,
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`${response.status}: ${detail.slice(0, 300)}`)
  }
}

function describe(slug, media) {
  const parts = []
  if (media.image) parts.push(`image=${path.basename(media.image)} (${human(statSync(media.image).size)})`)
  if (media.video) parts.push(`video=${path.basename(media.video)} (${human(statSync(media.video).size)})`)
  if (media.visualdetails.length) parts.push(`visualdetails×${media.visualdetails.length}`)
  return `${slug.padEnd(24)} ${parts.join('  ')}`
}

async function main() {
  if (!existsSync(MEDIA_DIR)) {
    console.error(`No media/ directory at ${MEDIA_DIR}`)
    console.error('Create one folder per slug, e.g. media/pantausam/image.jpg')
    process.exitCode = 1
    return
  }

  const slugs = readdirSync(MEDIA_DIR).filter((name) =>
    statSync(path.join(MEDIA_DIR, name)).isDirectory()
  )

  if (slugs.length === 0) {
    console.error('media/ has no slug folders in it')
    process.exitCode = 1
    return
  }

  // The record list is public, so a dry run can validate slugs without login.
  const email = process.env.PB_ADMIN_EMAIL
  const password = process.env.PB_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD

  let token = null
  if (!DRY_RUN) {
    if (!email || !password) {
      console.error('Set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD in .env (never .env.production).')
      process.exitCode = 1
      return
    }
    token = await authenticate(email, password)
  }

  const projects = await fetchProjects(token)
  const bySlug = new Map(projects.map((p) => [p.slug, p]))

  const planned = []
  let problems = 0

  for (const slug of slugs.sort()) {
    const record = bySlug.get(slug)
    if (!record) {
      console.error(`  ✗ ${slug.padEnd(24)} no project with this slug — folder name must match`)
      problems++
      continue
    }

    const media = collectMedia(path.join(MEDIA_DIR, slug))
    if (!media.image && !media.video && media.visualdetails.length === 0) {
      console.error(`  ✗ ${slug.padEnd(24)} no recognised files (image.*, video.*, detail-*.*)`)
      problems++
      continue
    }

    if (media.image && statSync(media.image).size > IMAGE_MAX_BYTES) {
      console.error(`  ✗ ${slug.padEnd(24)} image is ${human(statSync(media.image).size)}, over the 5 MB field limit`)
      problems++
      continue
    }

    planned.push({ slug, id: record.id, media })
    console.log(`  ${DRY_RUN ? '·' : '→'} ${describe(slug, media)}`)
  }

  if (DRY_RUN) {
    console.log(`\n[dry run] ${planned.length} record(s) would be updated, ${problems} skipped.`)
    console.log('Nothing was sent. Drop --dry-run to upload.')
    return
  }

  let done = 0
  for (const { slug, id, media } of planned) {
    try {
      await updateRecord(token, id, media)
      done++
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`)
      problems++
    }
  }

  console.log(`\n[upload] ${done} record(s) updated, ${problems} skipped.`)
  if (done > 0) {
    console.log('Rebuild and redeploy — the prerendered pages embed the feed, so')
    console.log('the new media will not appear until the next build.')
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
