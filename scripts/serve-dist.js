/**
 * Serves dist/ the way Vercel does, which `vite preview` does not: exact file
 * first, then the directory's index.html, then spa.html as the fallback.
 *
 * Without this, preview rewrites every route to the prerendered home page and
 * the per-route HTML never gets exercised locally.
 */
import { createReadStream, existsSync, statSync } from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(root, 'dist')
const PORT = Number(process.env.PORT || 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
}

const isFile = (p) => existsSync(p) && statSync(p).isFile()

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  // Reject traversal before touching the filesystem.
  const target = path.join(DIST, path.normalize(clean).replace(/^(\.\.[/\\])+/, ''))
  if (!target.startsWith(DIST)) return null

  if (isFile(target)) return target
  const indexed = path.join(target, 'index.html')
  if (isFile(indexed)) return indexed

  const shell = path.join(DIST, 'spa.html')
  return isFile(shell) ? shell : null
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url || '/')
    if (!file) {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('Not found')
      return
    }

    const isFallback = path.basename(file) === 'spa.html' && req.url !== '/spa.html'
    res.writeHead(isFallback ? 200 : 200, {
      'content-type': TYPES[path.extname(file)] || 'application/octet-stream',
      'cache-control': file.includes(`${path.sep}assets${path.sep}`)
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    })
    createReadStream(file).pipe(res)
  })
  .listen(PORT, () => {
    console.log(`dist served at http://localhost:${PORT} (Vercel-style resolution)`)
  })
