/**
 * Reads content/projects.json, the one source of project data.
 *
 * The build scripts and the app both read this file, so the sitemap, the link
 * preview cards, and the prerendered pages can never disagree about which
 * projects exist. Array order is display order.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export const PROJECTS_FILE = path.join(root, 'content', 'projects.json')

export function loadProjects() {
  const records = JSON.parse(readFileSync(PROJECTS_FILE, 'utf8'))
  if (!Array.isArray(records)) throw new Error('content/projects.json must be an array')
  return records.filter((record) => record && record.slug)
}
