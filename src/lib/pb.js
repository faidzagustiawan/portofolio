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
    demoUrl: item.demourl || null,
    demoNote: translated(item, 'demonote', locale),
    // A repository link can be withheld without deleting the URL the CMS holds,
    // so the record stays a complete note to self.
    repos: parseRepos(item, locale),
    sourceHidden: Boolean(item.sourcehidden && (item.githuburl || parseList(item.repos).length > 0)),

    access: normaliseAccess(item),
    sandboxId: item.sandboxid || null,
    walkthrough: parseWalkthrough(item, locale),
    snippets: parseSnippets(item, locale),
    previewMode: item.previewmode && item.previewmode !== 'auto' ? item.previewmode : null,

    nextProjectSlug: item.nextprojectslug || null,
  }
}

/**
 * Repository links.
 *
 * A project is not always one repository — a platform split into an API and a
 * frontend has two, and linking only one of them misrepresents the work. The
 * `repos` field holds as many as the project has, each with the label that says
 * which part it is; `githuburl` stays the single-repository shorthand and is
 * used when `repos` is empty, so no existing record had to change.
 */
function parseRepos(item, locale) {
  if (item.sourcehidden) return []

  const listed = parseList(item.repos)
    .filter((repo) => repo && typeof repo === 'object' && /^https?:\/\//.test(repo.url || ''))
    .map((repo, index) => ({
      id: `${index}`,
      url: repo.url,
      label: entryText(repo, 'label', locale),
    }))

  if (listed.length > 0) return listed
  return item.githuburl ? [{ id: '0', url: item.githuburl, label: '' }] : []
}

const ACCESS = new Set(['public', 'demo', 'internal', 'archived'])

/**
 * `access` is what decides which call to action the detail page offers. Records
 * predating the field fall back to the rule the page used to apply implicitly:
 * a live URL meant public, its absence meant nothing to link to.
 */
function normaliseAccess(item) {
  if (ACCESS.has(item.access)) return item.access
  if (item.liveurl) return 'public'
  if (item.demourl) return 'demo'
  return 'internal'
}

/** Reads a translatable key out of a JSON blob's entry, English as fallback. */
function entryText(entry, field, locale) {
  const value = locale === DEFAULT_LOCALE ? entry[field] : entry[localeField(field, locale)]
  const chosen = typeof value === 'string' && value.trim() !== '' ? value : entry[field]
  return typeof chosen === 'string' ? chosen : ''
}

/**
 * Walkthrough steps: an image plus the sentence explaining what the screen is
 * doing. `image` may name a file attached to the record or be an absolute URL,
 * so a step can point at an asset hosted elsewhere without a re-upload.
 */
function parseWalkthrough(item, locale) {
  const attached = Array.isArray(item.visualdetails) ? item.visualdetails : []

  return parseList(item.walkthrough)
    .filter((step) => step && typeof step === 'object')
    .map((step, index) => ({
      id: `${index}`,
      image: resolveStepImage(item, attached, step.image, index),
      title: entryText(step, 'title', locale),
      body: entryText(step, 'body', locale),
    }))
    .filter((step) => step.image || step.title)
}

/**
 * Finds the file a walkthrough step means.
 *
 * PocketBase appends a random suffix to every upload, so `detail-2.webp` is
 * stored as `detail-2_a9Kd21.webp` and a step written before the upload would
 * point at a file that does not exist. The name is therefore matched by its
 * stem, and a step with no usable name falls back to the attachment in the same
 * position — which is what `detail-N` ordering means anyway.
 */
function resolveStepImage(item, attached, name, index) {
  if (/^https?:\/\//.test(name || '')) return name

  if (typeof name === 'string' && name.trim() !== '') {
    const stem = name.replace(/\.[^.]+$/, '')
    const match = attached.find((file) => file === name || file.startsWith(`${stem}_`))
    if (match) return pbFileUrl(item, match)
  }

  return pbFileUrl(item, attached[index]) || null
}

/** Request/response pairs, for projects whose whole surface is an API. */
function parseSnippets(item, locale) {
  return parseList(item.snippets)
    .filter((snippet) => snippet && typeof snippet === 'object')
    .map((snippet, index) => ({
      id: `${index}`,
      label: entryText(snippet, 'label', locale) || `#${index + 1}`,
      method: (snippet.method || '').toUpperCase(),
      path: snippet.path || '',
      note: entryText(snippet, 'note', locale),
      request: typeof snippet.request === 'string' ? snippet.request : stringify(snippet.request),
      response: typeof snippet.response === 'string' ? snippet.response : stringify(snippet.response),
    }))
    .filter((snippet) => snippet.request || snippet.response)
}

function stringify(value) {
  if (value === undefined || value === null) return ''
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
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
