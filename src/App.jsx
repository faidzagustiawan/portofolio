import { Suspense, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import AppLayout from '@/components/Layout/Layout'
import AppRoutes from './Routes'
import PageTransition from '@/components/Animation/PageTransition'
import InitialPreloader from '@/components/Animation/InitialPreloader'
import { CustomCursor } from '@/components/UI/CustomCursor'

export default function App() {
  const location = useLocation()
  
  // Initialize state based on localStorage timestamp
  const [isFirstLoad, setIsFirstLoad] = useState(() => {
    const lastShown = localStorage.getItem('preloaderLastShown')
    if (lastShown) {
      const timePassed = Date.now() - parseInt(lastShown, 10)
      const tenMinutes = 10 * 60 * 1000
      // If less than 10 minutes have passed, don't show the preloader
      if (timePassed < tenMinutes) return false
    }
    return true
  })

  const handlePreloaderComplete = () => {
    localStorage.setItem('preloaderLastShown', Date.now().toString())
    setIsFirstLoad(false)
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white selection:bg-white selection:text-neutral-950 cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {isFirstLoad && (
          <InitialPreloader key="initial-preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <AppLayout>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Suspense fallback={
              <div className="flex h-screen w-full items-center justify-center text-white">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-white delay-75"></div>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-white delay-150"></div>
                </div>
              </div>
            }>
              <AppRoutes location={location} />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </AppLayout>
    </div>
  )
}


