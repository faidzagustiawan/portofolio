/**
 * Builds one 1200x630 link-preview card per project into dist/og/.
 *
 * Every project page previously unfurled with the same generic site card. These
 * use the project's own accent gradient, name, and tagline, so a shared link is
 * recognisable before anyone clicks it.
 *
 * Runs after `vite build` because it reads the gradient colours back out of the
 * compiled CSS: the class names live in PocketBase, so this file has no other
 * way to know what `from-blue-600` resolves to.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import './load-env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(root, 'dist')
const OUT_DIR = path.join(DIST, 'og')
const PB_URL = (process.env.VITE_PB_URL || 'https://faidz.fun/pb').replace(/\/+$/, '')

// Printed in the card's corner. Derived rather than written out again, so the
// cards cannot end up advertising a domain the site no longer uses.
const SITE_HOST = (process.env.VITE_SITE_URL || 'https://faidzagustiawan.id')
  .replace(/^https?:\/\//, '')
  .replace(/\/+$/, '')

const WIDTH = 1200
const HEIGHT = 630
const SANS = 'Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif'
const MONO = 'Consolas, Menlo, Monaco, monospace'
const FALLBACK = ['#404040', '#171717']

// --- oklch -> hex ---------------------------------------------------------
// Tailwind v4 emits its palette in oklch, which sharp's SVG renderer does not
// understand, so the values are converted here.

const gamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)
const clamp255 = (v) => Math.max(0, Math.min(255, Math.round(v * 255)))

function oklchToHex(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3

  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s

  return (
    '#' +
    [r, g, bl]
      .map((c) => clamp255(gamma(c)).toString(16).padStart(2, '0'))
      .join('')
  )
}

/**
 * Maps Tailwind colour names to hex, read from the compiled stylesheet.
 *
 * The utilities themselves only point at a variable
 * (`.from-blue-600{--tw-gradient-from:var(--color-blue-600)}`), so the actual
 * values come from the `--color-*` declarations in the theme block.
 */
function readGradientPalette() {
  const assets = path.join(DIST, 'assets')
  const cssFile = readdirSync(assets).find((name) => name.endsWith('.css'))
  if (!cssFile) throw new Error('no compiled stylesheet in dist/assets')

  const css = readFileSync(path.join(assets, cssFile), 'utf8')
  const palette = new Map()

  const rule = /--color-([a-z]+-\d+):\s*oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/g
  for (const [, name, l, c, h] of css.matchAll(rule)) {
    // Lightness is written as a percentage in the compiled output.
    palette.set(name, oklchToHex(Number(l) / 100, Number(c), Number(h)))
  }

  return palette
}

/** `from-blue-600` / `to-cyan-500` -> the palette key they resolve to. */
const paletteKey = (utility) => String(utility || '').replace(/^(from|to)-/, '')

// --- card -----------------------------------------------------------------

const escapeXml = (value) =>
  String(value ?? '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

/** Wraps at a character budget rather than measuring — good enough for two lines. */
function wrap(text, maxChars, maxLines) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (candidate.length > maxChars && line) {
      lines.push(line)
      line = word
      if (lines.length === maxLines) break
    } else {
      line = candidate
    }
  }
  if (line && lines.length < maxLines) lines.push(line)

  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{0,2}$/, '…')
  }
  return lines
}

function cardSvg(project, palette) {
  const [fromClass, toClass] = String(project.color || '').split(/\s+/)
  const from = palette.get(paletteKey(fromClass)) || FALLBACK[0]
  const to = palette.get(paletteKey(toClass)) || FALLBACK[1]

  const nameLines = wrap(project.name, 22, 2)
  const taglineLines = wrap(project.tagline, 52, 2)
  const meta = [project.category, project.year].filter(Boolean).join('  ·  ')
  const tech = (project.technologies || []).slice(0, 4).join('   ·   ')

  const nameStartY = nameLines.length === 1 ? 300 : 250

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${to}" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="veil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0a0a0a"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#accent)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#veil)"/>
  <rect x="0" y="0" width="${WIDTH}" height="5" fill="#ffffff" opacity="0.85"/>

  <text x="72" y="128" font-family="${MONO}" font-size="23" fill="#ffffff" opacity="0.72" letter-spacing="4">
    ${escapeXml(meta.toUpperCase())}
  </text>

  ${nameLines
    .map(
      (line, i) =>
        `<text x="72" y="${nameStartY + i * 84}" font-family="${SANS}" font-size="76" font-weight="700" fill="#ffffff">${escapeXml(line)}</text>`
    )
    .join('\n  ')}

  ${taglineLines
    .map(
      (line, i) =>
        `<text x="72" y="${nameStartY + nameLines.length * 84 + 22 + i * 44}" font-family="${SANS}" font-size="32" fill="#e5e5e5" opacity="0.92">${escapeXml(line)}</text>`
    )
    .join('\n  ')}

  <text x="72" y="556" font-family="${MONO}" font-size="22" fill="#ffffff" opacity="0.6">
    ${escapeXml(tech)}
  </text>
  <text x="${WIDTH - 72}" y="556" text-anchor="end" font-family="${SANS}" font-size="22" font-weight="600" fill="#ffffff" opacity="0.75">
    ${escapeXml(SITE_HOST)}
  </text>
</svg>`
}

async function fetchProjects() {
  const url = `${PB_URL}/api/collections/projects/records?perPage=200`
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`PocketBase responded ${response.status}`)
  return (await response.json()).items || []
}

async function main() {
  const palette = readGradientPalette()

  let projects = []
  try {
    projects = await fetchProjects()
  } catch (err) {
    console.warn(`[og] could not reach PocketBase (${err.message}) — no project cards written`)
    return
  }

  mkdirSync(OUT_DIR, { recursive: true })

  for (const project of projects) {
    if (!project.slug) continue
    const svg = cardSvg(project, palette)
    const jpeg = await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toBuffer()
    writeFileSync(path.join(OUT_DIR, `${project.slug}.jpg`), jpeg)
  }

  console.log(`[og] ${projects.length} project cards written (palette entries: ${palette.size})`)
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
