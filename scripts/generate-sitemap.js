/**
 * Writes public/sitemap.xml from the live PocketBase project list.
 *
 * The previous sitemap hard-coded five slugs and had already drifted from the
 * eight records in the CMS, so this runs as part of the build instead.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'
import { HTML_LANG, LOCALES, PREFIX } from '../src/i18n/locale.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://faidzagustiawan.id').replace(/\/+$/, '')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/work', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
]

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

async function fetchProjects() {
  const url = `${PB_URL}/api/collections/projects/records?perPage=200&fields=slug,updated`
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!response.ok) throw new Error(`PocketBase responded ${response.status}`)
  const data = await response.json()
  return (data.items || []).filter((item) => item.slug)
}

/** One entry per locale, each listing the others as alternates. */
function renderUrl({ path: routePath, changefreq, priority, lastmod }, locale) {
  const href = (loc) => {
    const prefix = PREFIX[loc] || ''
    return SITE_URL + (routePath === '/' ? prefix || '/' : `${prefix}${routePath}`)
  }

  return [
    '  <url>',
    `    <loc>${escapeXml(href(locale))}</loc>`,
    // Each entry points at every language it exists in, which is what tells a
    // search engine the two URLs are the same page rather than duplicates.
    ...LOCALES.map(
      (alt) =>
        `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[alt]}" href="${escapeXml(href(alt))}"/>`
    ),
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n')
}

async function main() {
  let projects = []
  try {
    projects = await fetchProjects()
  } catch (err) {
    // A build must not fail because the CMS blinked; the static routes still ship.
    console.warn(`[sitemap] could not reach PocketBase (${err.message}) — writing static routes only`)
  }

  const entries = [
    ...STATIC_ROUTES,
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: project.updated ? project.updated.slice(0, 10) : undefined,
    })),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...LOCALES.flatMap((locale) => entries.map((entry) => renderUrl(entry, locale))),
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml)

  // robots.txt is written here too: its only variable part is the sitemap URL,
  // and keeping it in the same script is what stops the two from drifting onto
  // different domains.
  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')
  writeFileSync(path.join(root, 'public', 'robots.txt'), robots)

  console.log(`[sitemap] ${entries.length * LOCALES.length} URLs written for ${SITE_URL} (${LOCALES.length} locales)`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
