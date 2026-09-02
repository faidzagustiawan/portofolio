/**
 * Rebuilds the hero portrait from the original FotoFaidz.svg.
 *
 * The SVG is a 3.3 MB wrapper around two embedded PNGs: a full-colour photo and
 * a luminance mask that cuts the subject out of its background. This script
 * unwraps them, applies the mask as a real alpha channel, crops to the region
 * the SVG's viewBox actually shows, and emits AVIF/WebP at the two widths the
 * hero requests.
 *
 * Run with: pnpm hero:build   (only needed when the source portrait changes)
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(root, 'scripts', 'source', 'FotoFaidz.svg')
const OUT_DIR = path.join(root, 'public', 'hero')

// Derived from the SVG's transform: source pixels map to user units via
// scale(0.19629, 0.196137) translate(-94.933206, -59.279975), and the viewBox
// shows 0..255 x 0..453.749989.
const CROP = { left: 484, top: 302, width: 1299, height: 2314 }
const WIDTHS = [720, 1200]

function extractPngs(svg) {
  const matches = [...svg.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)]
  if (matches.length !== 2) {
    throw new Error(`expected 2 embedded PNGs in the SVG, found ${matches.length}`)
  }
  // The larger payload is the photo; the smaller one is the mask.
  const buffers = matches.map((m) => Buffer.from(m[1], 'base64'))
  return buffers[0].length > buffers[1].length
    ? { photo: buffers[0], mask: buffers[1] }
    : { photo: buffers[1], mask: buffers[0] }
}

async function main() {
  if (!existsSync(SOURCE)) {
    throw new Error(`missing source portrait at ${SOURCE}`)
  }

  const { photo, mask } = extractPngs(readFileSync(SOURCE, 'utf8'))

  const { width, height } = await sharp(photo).metadata()

  // The mask encodes coverage as luminance. Interleave it into the photo by
  // hand rather than via joinChannel, which drops the extra band here.
  const rgb = await sharp(photo).removeAlpha().raw().toBuffer()
  const alpha = await sharp(mask).greyscale().toColourspace('b-w').raw().toBuffer()

  const rgba = Buffer.allocUnsafe(width * height * 4)
  for (let i = 0, j = 0, k = 0; i < alpha.length; i++, j += 3, k += 4) {
    rgba[k] = rgb[j]
    rgba[k + 1] = rgb[j + 1]
    rgba[k + 2] = rgb[j + 2]
    rgba[k + 3] = alpha[i]
  }

  const cutout = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .extract(CROP)
    .png()
    .toBuffer()

  const manifest = []
  for (const w of WIDTHS) {
    const resized = sharp(cutout).resize({ width: w, withoutEnlargement: true })
    const avif = await resized.clone().avif({ quality: 55, effort: 6 }).toBuffer()
    const webp = await resized.clone().webp({ quality: 78, effort: 6 }).toBuffer()

    writeFileSync(path.join(OUT_DIR, `portrait-${w}.avif`), avif)
    writeFileSync(path.join(OUT_DIR, `portrait-${w}.webp`), webp)
    manifest.push(`portrait-${w}: avif ${(avif.length / 1024).toFixed(0)} KB, webp ${(webp.length / 1024).toFixed(0)} KB`)
  }

  console.log(manifest.join('\n'))
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
