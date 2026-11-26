/**
 * Writes public/sitemap.xml from content/projects.json.
 *
 * The previous sitemap hard-coded five slugs and had already drifted from the
 * project list, so this runs as part of the build instead.
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import './load-env.js'
import { loadProjects } from './load-projects.js'
import { HTML_LANG, LOCALES, PREFIX } from '../src/i18n/locale.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://faidzagustiawan.id').replace(/\/+$/, '')

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/work', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
]

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

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
  const projects = loadProjects()

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
