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
    handlePreloaderComplete
  } = useAppLoader(location, displayedLocation, setDisplayedLocation)

  const showPreloader =
    loadingPhase === 1 ||
    location.pathname !== displayedLocation.pathname

  // --- LOGIC PERUBAHAN DI SINI ---
  // 1. Pecah URL berdasarkan garis miring '/'
  // 2. Filter(Boolean) untuk menghapus string kosong (akibat double slash atau trailing slash)
  // 3. Pop() untuk mengambil elemen paling terakhir
  const getLastPathSegment = (path) => {
    if (path === '/') return 'Home'
    return path.split('/').filter(Boolean).pop()
  }

  const words =
    loadingPhase === 1
      ? preloaderWords
      : [getLastPathSegment(location.pathname)] 
  // -------------------------------

  return (
    <div className="min-h-screen w-full bg-neutral-950"> {/* Sesuaikan bg dengan tema */}
      <div className={loadingPhase !== 2 ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 transition-opacity duration-500'}>
        <AppLayout>
          <Suspense fallback={null}>
            <AppRoutes location={displayedLocation} />
          </Suspense>
        </AppLayout>
      </div>

      <AnimatePresence mode="wait">
        {loadingPhase === 0 && isFirstLoad.current && (
          <ProgressBar progress={downloadProgress} />
        )}

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