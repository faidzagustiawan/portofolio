// src/app/useAppLoader.js
import { useEffect, useRef, useState } from 'react'
import { preloadTasks } from './preloadTasks'
import {
  hasPreloadedAssets,
  markAssetsPreloaded
} from './preloadStorage'

export function useAppLoader(location, displayedLocation, setDisplayedLocation) {
  const isFirstLoad = useRef(true)

  const alreadyPreloaded = hasPreloadedAssets()

  // 🔥 Jika sudah preload → langsung lompat ke fase sapaan (1)
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
      markAssetsPreloaded() // 🔥 SIMPAN KE STORAGE
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
  // FASE 1 — SAPAAN SELESAI
  // ============================
  const handlePreloaderComplete = () => {
    if (isFirstLoad.current) {
      setLoadingPhase(2)
      isFirstLoad.current = false
      window.scrollTo(0, 0)
    }
  }

  // ============================
  // PAGE TRANSITION
  // ============================
  useEffect(() => {
    if (isFirstLoad.current) return

    if (location.pathname !== displayedLocation.pathname) {
      const t = setTimeout(() => {
        setDisplayedLocation(location)
        window.scrollTo(0, 0)
      }, 800)

      return () => clearTimeout(t)
    }
  }, [location, displayedLocation])

  return {
    isFirstLoad,
    loadingPhase,
    downloadProgress,
    handlePreloaderComplete
  }
}
