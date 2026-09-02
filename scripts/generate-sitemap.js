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

function renderUrl({ path: routePath, changefreq, priority, lastmod }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(SITE_URL + routePath)}</loc>`,
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
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderUrl),
    '</urlset>',
    '',
  ].join('\n')

  writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml)

  // robots.txt is written here too: its only variable part is the sitemap URL,
  // and keeping it in the same script is what stops the two from drifting onto
  // different domains.
  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n')
  writeFileSync(path.join(root, 'public', 'robots.txt'), robots)

  console.log(`[sitemap] ${entries.length} URLs written for ${SITE_URL}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
