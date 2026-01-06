import { useEffect, useRef, useState } from 'react'
import { preloadTasks } from './preloadTasks'
import {
  hasPreloadedAssets,
  markAssetsPreloaded
} from './preloadStorage'

export function useAppLoader(location, displayedLocation, setDisplayedLocation) {
  const isFirstLoad = useRef(true)
  const alreadyPreloaded = hasPreloadedAssets()

  // STATE: Apakah sedang dalam proses transisi (tutup/buka tirai)?
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 1. FASE LOADING AWAL
  const [loadingPhase, setLoadingPhase] = useState(
    alreadyPreloaded ? 1 : 0
  )

  const [downloadProgress, setDownloadProgress] = useState(
    alreadyPreloaded ? 100 : 0
  )

  // ============================
  // FASE 0 — ASSET DOWNLOAD
  // ============================
  useEffect(() => {
    if (alreadyPreloaded || !isFirstLoad.current) return

    let current = 0
    let finished = false

    const loadAssets = async () => {
      await Promise.all(preloadTasks.map(task => task()))
      finished = true
      markAssetsPreloaded()
    }

    loadAssets()

    const timer = setInterval(() => {
      const max = finished ? 100 : 90
      const diff = max - current
      current += diff > 0 ? Math.ceil(diff / 10) : 1
      setDownloadProgress(current)

      if (current >= 100 && finished) {
        clearInterval(timer)
        setTimeout(() => setLoadingPhase(1), 1500)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // ============================
  // FASE 1 — KLIK START / SELESAI
  // ============================
  const handlePreloaderComplete = () => {
    if (isFirstLoad.current) {
      setLoadingPhase(2)
      isFirstLoad.current = false
      window.scrollTo(0, 0)
    }
  }

  // ============================
  // FASE TRANSISI HALAMAN (CRITICAL FIX)
  // ============================
  useEffect(() => {
    if (isFirstLoad.current) return

    // Jika URL berubah (user klik menu)
    if (location.pathname !== displayedLocation.pathname) {
      
      // 1. Kunci preloader agar muncul
      setIsTransitioning(true)

      // 2. Tunggu animasi 'Enter' selesai (800ms sesuai durasi animasi blob)
      const t = setTimeout(() => {
        
        // 3. Swap halaman di balik layar (saat layar tertutup hitam)
        setDisplayedLocation(location)
        window.scrollTo(0, 0)

        // 4. BERI JEDA SEDIKIT (BUFFER)
        // Ini kuncinya: Beri waktu 100ms bagi React untuk me-render DOM baru 
        // sebelum kita menyuruh preloader untuk 'Exit'.
        setTimeout(() => {
           setIsTransitioning(false) 
        }, 150) // 150ms sangat aman untuk mencegah flash putih

      }, 800)

      return () => clearTimeout(t)
    }
  }, [location, displayedLocation])

  return {
    isFirstLoad,
    loadingPhase,
    downloadProgress,
    handlePreloaderComplete,
    isTransitioning // <--- Return state baru ini
  }
}