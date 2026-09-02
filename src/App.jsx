import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import AppLayout from '@/components/Layout/Layout'
import AppRoutes from './Routes'
import PageTransition from '@/components/Animation/PageTransition'
import InitialPreloader from '@/components/Animation/InitialPreloader'
import { CustomCursor } from '@/components/UI/CustomCursor'
import { useIntroGate } from '@/hooks/useIntroGate'

const PRELOADER_KEY = 'preloaderLastShown'

export default function App() {
  const location = useLocation()

  const [isFirstLoad, dismissIntro] = useIntroGate()

  const handlePreloaderComplete = () => {
    try {
      localStorage.setItem(PRELOADER_KEY, Date.now().toString())
    } catch {
      // Storage blocked (private mode, cookies off) — the intro replays next visit.
    }
    // Dropping the flag also removes the pre-paint backdrop, which would
    // otherwise outlive the exit animation.
    dismissIntro()
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-neutral-950"
      >
        Skip to content
      </a>

      <CustomCursor />

      <AnimatePresence>
        {isFirstLoad && (
          <InitialPreloader key="initial-preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AppLayout>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Suspense
              fallback={
                <div
                  className="flex h-screen w-full items-center justify-center text-white"
                  role="status"
                  aria-label="Loading page"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
                    <div className="h-3 w-3 animate-pulse rounded-full bg-white [animation-delay:150ms]" />
                    <div className="h-3 w-3 animate-pulse rounded-full bg-white [animation-delay:300ms]" />
                  </div>
                </div>
              }
            >
              <AppRoutes location={location} />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </AppLayout>
    </div>
  )
}
