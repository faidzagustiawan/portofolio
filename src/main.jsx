import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoot from '@/AppRoot'

const container = document.getElementById('root')
const { prerendered, route } = document.documentElement.dataset

const normalise = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)

/**
 * True only when the served markup was rendered for this exact URL.
 *
 * Cloudflare's `single-page-application` fallback answers any unknown path with
 * the prerendered home page, so "there is markup" is not enough — hydrating the
 * home tree against `/work/something` would mismatch every node.
 */
const isExactPrerender = prerendered === 'true' && normalise(route || '') === normalise(location.pathname)

function readEmbeddedProjects() {
  const node = document.getElementById('__PROJECTS__')
  if (!node) return null
  try {
    return JSON.parse(node.textContent)
  } catch {
    // Malformed payload: fall through and let the provider fetch normally.
    return null
  }
}

// On a fallback the embedded feed is whatever the last build knew about, which
// is exactly the case where it might be missing the project being asked for.
// Passing null makes the provider fetch fresh.
const initialProjects = isExactPrerender ? readEmbeddedProjects() : null

const tree = <AppRoot router={BrowserRouter} initialProjects={initialProjects} />

if (isExactPrerender) {
  hydrateRoot(container, tree)
} else {
  // Drop any markup meant for a different route before rendering over it.
  container.replaceChildren()
  createRoot(container).render(tree)
}
