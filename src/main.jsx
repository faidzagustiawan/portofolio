import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoot from '@/AppRoot'
import { DEFAULT_LOCALE, PREFIX, localeFromPath } from '@/i18n/locale'

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

// The locale comes from the URL so the browser and the build always agree.
// A non-default locale becomes the router's basename, which keeps every <Link>
// inside the app locale-relative without a single call site knowing about it.
const locale = localeFromPath(location.pathname)
const basename = PREFIX[locale] || undefined

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

const tree = (
  <AppRoot
    router={BrowserRouter}
    routerProps={{ basename }}
    locale={locale}
    initialProjects={initialProjects}
  />
)

if (isExactPrerender) {
  hydrateRoot(container, tree)
} else {
  // Drop any markup meant for a different route before rendering over it.
  container.replaceChildren()
  createRoot(container).render(tree)
}

if (locale !== DEFAULT_LOCALE) document.documentElement.lang = locale
