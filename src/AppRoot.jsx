import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { LocaleProvider } from '@/i18n/LocaleContext'
import { PageTransitionProvider } from '@/context/PageTransitionContext'
import { ProjectsProvider } from '@/context/ProjectsContext'
import App from '@/App'

/**
 * The provider tree, shared verbatim by the browser entry and the prerenderer.
 *
 * Only the router differs between the two: BrowserRouter in the browser,
 * StaticRouter during the build. The locale is passed in rather than derived
 * here, because the router's basename has to be decided before it mounts, and
 * both entries need the same answer for hydration to match.
 */
export default function AppRoot({ router: Router, routerProps, locale, initialProjects }) {
  return (
    <StrictMode>
      {/* reducedMotion="user" makes every framer-motion transform and layout
          animation respect the OS setting without per-component guards. */}
      <MotionConfig reducedMotion="user">
        <LocaleProvider locale={locale}>
          <HelmetProvider>
            <Router {...routerProps}>
              <ProjectsProvider initialProjects={initialProjects}>
                <PageTransitionProvider>
                  <App />
                </PageTransitionProvider>
              </ProjectsProvider>
            </Router>
          </HelmetProvider>
        </LocaleProvider>
      </MotionConfig>
    </StrictMode>
  )
}
