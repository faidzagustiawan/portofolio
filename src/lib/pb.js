const RAW_BASE = import.meta.env.VITE_PB_URL || 'https://faidz.fun/pb'

export const PB_URL = RAW_BASE.replace(/\/+$/, '')

/** Absolute URL for a file stored on a PocketBase record. */
export function pbFileUrl(record, filename) {
  if (!filename) return null
  return `${PB_URL}/api/files/${record.collectionId}/${record.id}/${filename}`
}

/**
 * PocketBase returns lowercase column names. Anything the UI reads as a string
 * gets a '' default and anything it maps over gets [], so a half-filled record
 * renders as a gap instead of throwing.
 */
export function mapProjectRecord(item) {
  const visualDetails = Array.isArray(item.visualdetails) ? item.visualdetails : []

  return {
    id: item.id,
    slug: item.slug || '',
    name: item.name || 'Untitled project',
    tagline: item.tagline || '',
    featured: Boolean(item.featured),
    year: item.year ? String(item.year) : '',
    category: item.category || 'Uncategorised',

    image: pbFileUrl(item, item.image),
    video: pbFileUrl(item, item.video),
    visualDetails: visualDetails.map((file) => pbFileUrl(item, file)).filter(Boolean),

    technologies: parseList(item.technologies),
    team: parseList(item.team),

    overview: item.overview || '',
    challenge: item.challenge || '',
    approach: item.approach || '',
    solution: item.solution || '',
    contribution: item.contribution || '',
    outcome: item.outcome || '',

    role: item.role || '',
    client: item.client || '',
    duration: item.duration || '',
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
