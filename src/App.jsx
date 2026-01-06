import { Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import AppLayout from '@/components/Layout/Layout'
import AppRoutes from './Routes'
import { useAppLoader } from '@/hooks/useAppLoader'

import Preloader from '@/components/Animation/Preloader'
import ProgressBar from '@/components/Animation/ProgressBar'
import { preloaderWords } from '@/data/preLoaderWords'

export default function App() {
  const location = useLocation()
  const [displayedLocation, setDisplayedLocation] = useState(location)

  const {
    isFirstLoad,
    loadingPhase,
    downloadProgress,
    handlePreloaderComplete,
    isTransitioning // <--- Ambil state baru dari hook
  } = useAppLoader(location, displayedLocation, setDisplayedLocation)

  // LOGIC FIX:
  // Tampilkan preloader jika:
  // 1. Sedang Loading awal (Phase 1)
  // 2. ATAU sedang proses transisi (termasuk buffer time 150ms)
  const showPreloader = loadingPhase === 1 || isTransitioning

  // Helper function tetap sama
  const getLastPathSegment = (path) => {
    if (path === '/') return 'Home'
    return path.split('/').filter(Boolean).pop()
  }

  // Logic words tetap aman karena 'location' sudah berubah duluan saat buffer
  const words =
    loadingPhase === 1
      ? preloaderWords
      : [getLastPathSegment(location.pathname)] 

  return (
    <div className="min-h-screen w-full bg-neutral-950">
      
      {/* KONTEN UTAMA */}
      {/* Saat loading awal (Phase != 2), sembunyikan layout agar rapi */}
      <div className={loadingPhase !== 2 ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-500'}>
        <AppLayout>
          {/* Suspense fallback null karena preloader sudah menutupi layar */}
          <Suspense fallback={null}>
            <AppRoutes location={displayedLocation} />
          </Suspense>
        </AppLayout>
      </div>

      <AnimatePresence mode="wait">
        {/* Progress Bar (Hanya saat First Load & Phase 0) */}
        {loadingPhase === 0 && isFirstLoad.current && (
          <ProgressBar progress={downloadProgress} />
        )}

        {/* Preloader Utama */}
        {showPreloader && (
          <Preloader
            words={words}
            isFirstLoad={isFirstLoad.current}
            onComplete={handlePreloaderComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}