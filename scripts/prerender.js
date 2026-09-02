/**
 * Renders every known route to static HTML after the client build.
 *
 * The site is a client-rendered SPA, which means link unfurlers — Twitter,
 * Slack, WhatsApp, LinkedIn — never see per-page Open Graph tags, because none
 * of them run JavaScript. This walks the routes, renders each with
 * react-dom/static, and writes a real HTML file per URL with its own head.
 *
 * The project feed is fetched once and baked into every page, so the first
 * paint after hydration already has data and the browser makes no API call.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import 'dotenv/config'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(root, 'dist')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')

const STATIC_ROUTES = ['/', '/work', '/contact']

const HEAD_MARKER = '<!--app-head-->'
const HEAD_FALLBACK_END = '<!--/app-head-fallback-->'
const APP_MARKER = '<!--app-html-->'
const LINKS_MARKER = '<!--app-links-->'

// Only the home page renders the portrait, and only the shell has to call
// PocketBase — every prerendered page ships the feed inline. Emitting either
// hint everywhere would cost a wasted download or a wasted connection.
const HERO_PRELOAD = [
  '<link rel="preload" as="image" type="image/avif" fetchpriority="high" media="(min-width: 769px)"',
  '    href="/hero/portrait-1200.avif" />',
  '  <link rel="preload" as="image" type="image/avif" fetchpriority="high" media="(max-width: 768px)"',
  '    href="/hero/portrait-720.avif" />',
].join('\n  ')

const PB_PRECONNECT = `<link rel="preconnect" href="${PB_URL.replace(/^(https?:\/\/[^/]+).*$/, '$1')}" crossorigin />`

// U+2028 and U+2029 are valid JSON but terminate a line inside a script tag.
const LINE_SEPARATORS = new RegExp("[\\u2028\\u2029]", "g")

/** Escapes the sequences that would let embedded data break out of a script tag. */
const safeJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(LINE_SEPARATORS, (c) => '\\u' + c.charCodeAt(0).toString(16))

async function fetchProjects() {
  const url = `${PB_URL}/api/collections/projects/records?sort=-year&perPage=200`
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`PocketBase responded ${response.status}`)
  const data = await response.json()
  return data.items || []
}

function outputPath(route) {
  if (route === '/') return path.join(DIST, 'index.html')
  return path.join(DIST, route.replace(/^\//, ''), 'index.html')
}

function buildPage(template, { route, head, html, projects }) {
  const headStart = template.indexOf(HEAD_MARKER)
  const headEnd = template.indexOf(HEAD_FALLBACK_END)
  if (headStart === -1 || headEnd === -1) {
    throw new Error('index.html is missing its head markers')
  }

  // The fallback tags between the markers only exist for the SPA shell; a
  // prerendered page replaces them outright so nothing is emitted twice.
  const withHead =
    template.slice(0, headStart) +
    head +
    template.slice(headEnd + HEAD_FALLBACK_END.length)

  const dataScript = `<script type="application/json" id="__PROJECTS__">${safeJson(projects)}</script>`

  return withHead
    .replace('<html lang="en">', '<html lang="en" data-prerendered="true">')
    .replace(LINKS_MARKER, route === '/' ? HERO_PRELOAD : '')
    .replace(APP_MARKER, html)
    .replace('</body>', `  ${dataScript}\n</body>`)
}

function buildShell(template) {
  // Same document, minus the prerendered body and the markers. Vercel serves
  // this for any path the last build did not know about, and main.jsx falls
  // back to a full client render because data-prerendered is absent.
  return template
    .replace(HEAD_MARKER, '')
    .replace(HEAD_FALLBACK_END, '')
    .replace(LINKS_MARKER, PB_PRECONNECT)
    .replace(APP_MARKER, '')
}

async function main() {
  const template = readFileSync(path.join(DIST, 'index.html'), 'utf8')
  // pathToFileURL, not a bare path: Windows drive letters read as a URL scheme
  // to the ESM loader.
  const entry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
  const { render, mapProjects } = await import(entry)

  let records = []
  try {
    records = await fetchProjects()
  } catch (err) {
    console.warn(`[prerender] could not reach PocketBase (${err.message}) — prerendering static routes only`)
  }

  const projects = mapProjects(records)
  const routes = [...STATIC_ROUTES, ...projects.filter((p) => p.slug).map((p) => `/work/${p.slug}`)]

  writeFileSync(path.join(DIST, 'spa.html'), buildShell(template))

  for (const route of routes) {
    const { html, head } = await render(route, projects)
    const file = outputPath(route)
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, buildPage(template, { route, head, html, projects }))
  }

  console.log(`[prerender] ${routes.length} routes written, plus spa.html`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
