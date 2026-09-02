import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { PageTransitionProvider } from '@/context/PageTransitionContext'
import { ProjectsProvider } from '@/context/ProjectsContext'
import App from '@/App'

/**
 * The provider tree, shared verbatim by the browser entry and the prerenderer.
 *
 * Only the router differs between the two, so it is passed in: BrowserRouter in
 * the browser, StaticRouter during the build. Everything below it must render
 * identically in both, or hydration will not match.
 */
export default function AppRoot({ router: Router, routerProps, initialProjects }) {
  return (
    <StrictMode>
      {/* reducedMotion="user" makes every framer-motion transform and layout
          animation respect the OS setting without per-component guards. */}
      <MotionConfig reducedMotion="user">
        <HelmetProvider>
          <Router {...routerProps}>
            <ProjectsProvider initialProjects={initialProjects}>
              <PageTransitionProvider>
                <App />
              </PageTransitionProvider>
            </ProjectsProvider>
          </Router>
        </HelmetProvider>
      </MotionConfig>
    </StrictMode>
  )
}
