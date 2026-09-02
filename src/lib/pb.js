import { DEFAULT_LOCALE, localeField } from '@/i18n/locale'

const RAW_BASE = import.meta.env.VITE_PB_URL || 'https://faidz.fun/pb'

export const PB_URL = RAW_BASE.replace(/\/+$/, '')

/** Absolute URL for a file stored on a PocketBase record. */
export function pbFileUrl(record, filename) {
  if (!filename) return null
  return `${PB_URL}/api/files/${record.collectionId}/${record.id}/${filename}`
}

/** Fields that exist once per locale, English in the base column. */
const TRANSLATED = [
  'tagline',
  'overview',
  'challenge',
  'approach',
  'solution',
  'contribution',
  'outcome',
  'client',
  'duration',
]

/**
 * Reads a translatable field, falling back to English when the translation is
 * missing. A half-translated record then renders as a complete page in the
 * reader's language wherever possible, and in English where it is not — which
 * beats an empty section.
 */
function translated(item, field, locale) {
  if (locale === DEFAULT_LOCALE) return item[field] || ''
  const value = item[localeField(field, locale)]
  return (typeof value === 'string' && value.trim() !== '' ? value : item[field]) || ''
}

/**
 * PocketBase returns lowercase column names. Anything the UI reads as a string
 * gets a '' default and anything it maps over gets [], so a half-filled record
 * renders as a gap instead of throwing.
 */
export function mapProjectRecord(item, locale = DEFAULT_LOCALE) {
  const visualDetails = Array.isArray(item.visualdetails) ? item.visualdetails : []
  const copy = Object.fromEntries(TRANSLATED.map((f) => [f, translated(item, f, locale)]))

  return {
    id: item.id,
    slug: item.slug || '',
    name: item.name || 'Untitled project',
    featured: Boolean(item.featured),
    year: item.year ? String(item.year) : '',
    category: item.category || 'Uncategorised',

    image: pbFileUrl(item, item.image),
    video: pbFileUrl(item, item.video),
    visualDetails: visualDetails.map((file) => pbFileUrl(item, file)).filter(Boolean),

    technologies: parseList(item.technologies),
    team: parseList(item.team),

    ...copy,

    role: item.role || '',
    color: item.color || 'from-neutral-700 to-neutral-900',

    liveUrl: item.liveurl || null,
    githubUrl: item.githuburl || null,
    nextProjectSlug: item.nextprojectslug || null,
  }
}

function parseList(value) {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string' || value.trim() === '') return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
