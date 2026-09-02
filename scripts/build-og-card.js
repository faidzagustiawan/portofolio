/**
 * Builds public/og-cover.png — the 1200x630 card link unfurlers show.
 *
 * The hero portrait is 1200x2138, so handing it to Twitter or Slack as an
 * og:image gets it centre-cropped into an unreadable slice. This composes a
 * proper landscape card instead.
 *
 * Run with: pnpm og:build
 */
import { existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORTRAIT = path.join(root, 'public', 'hero', 'portrait-1200.webp')
const OUT = path.join(root, 'public', 'og-cover.jpg')

const WIDTH = 1200
const HEIGHT = 630
const SANS = "Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif"
const MONO = "Consolas, Menlo, Monaco, monospace"

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="#ffffff" opacity="0.9"/>
  <text x="72" y="250" font-family="${SANS}" font-size="76" font-weight="700" fill="#ffffff">
    Faidz Agustiawan
  </text>
  <text x="72" y="322" font-family="${SANS}" font-size="38" font-weight="400" fill="#a3a3a3">
    Full-Stack Developer
  </text>
  <text x="72" y="404" font-family="${MONO}" font-size="24" fill="#737373" letter-spacing="3">
    MALANG, INDONESIA
  </text>
  <text x="72" y="530" font-family="${SANS}" font-size="26" fill="#8a8a8a">
    React · Next.js · Laravel · Node.js
  </text>
</svg>`

async function main() {
  if (!existsSync(PORTRAIT)) {
    throw new Error(`missing ${PORTRAIT} — run "pnpm hero:build" first`)
  }

  // Show head and shoulders only: the full 1:1.78 portrait shrunk into a
  // 630px-tall band would be a distant figure at thumbnail size.
  const portrait = sharp(PORTRAIT)
  const meta = await portrait.metadata()
  const cropHeight = Math.round(meta.height * 0.62)

  const cutout = await portrait
    .extract({ left: 0, top: 0, width: meta.width, height: cropHeight })
    .resize({ height: HEIGHT, fit: 'inside' })
    .toBuffer()

  const cutoutMeta = await sharp(cutout).metadata()

  const card = await sharp(Buffer.from(background))
    .composite([
      {
        input: cutout,
        top: HEIGHT - cutoutMeta.height,
        left: WIDTH - cutoutMeta.width - 40,
      },
    ])
    .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toBuffer()

  writeFileSync(OUT, card)
  console.log(`[og] og-cover.jpg written (${(card.length / 1024).toFixed(0)} KB)`)
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
