import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRoot from '@/AppRoot'

const container = document.getElementById('root')

// The build prerenders every known route and embeds the project feed, so the
// markup is already correct and the data is already here. Adopt both instead of
// rebuilding the page and refetching what the build already resolved.
const isPrerendered = document.documentElement.dataset.prerendered === 'true'

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

const tree = <AppRoot router={BrowserRouter} initialProjects={readEmbeddedProjects()} />

if (isPrerendered) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
