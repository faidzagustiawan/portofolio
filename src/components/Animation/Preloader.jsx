import { useEffect, useState } from 'react'
import { motion } from 'framer-motion' // Hapus useMotionValue, useTransform (tidak perlu lagi)
import { Dot } from 'lucide-react'

// 1. Variant untuk Background Hitam (Blob)
const blobVariants = {
  initial: {
    y: "100%",
    borderTopLeftRadius: "200%",
    borderTopRightRadius: "200%",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
  },
  enter: {
    y: "0%",
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    borderBottomLeftRadius: "0%",
    borderBottomRightRadius: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "-100%",
    borderTopLeftRadius: "0%",
    borderTopRightRadius: "0%",
    borderBottomLeftRadius: "200%", 
    borderBottomRightRadius: "200%", 
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2,
    },
  },
}

// 2. Variant Baru untuk Text (Agar sinkron dengan Blob tanpa error NaN)
const textVariants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8, // Durasi sama dengan blob
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2, // Delay sama dengan blob
    },
  }
}

export default function Preloader({
  words = [],
  isFirstLoad,
  onComplete,
}) {
  const [index, setIndex] = useState(0)

  /* ================= WORD SEQUENCE ================= */
  useEffect(() => {
    if (!words.length) return

    if (index === words.length - 1) {
      const endTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 200) 
      return () => clearTimeout(endTimer)
    }

    const timer = setTimeout(() => {
      setIndex((i) => i + 1)
    }, index === 0 ? 1000 : 180)

    return () => clearTimeout(timer)
  }, [index, words, onComplete])

  const currentWord = words[index] ?? ""

  // Logic isFirstLoad: Jika first load, jangan animasi dari bawah (skip initial)
  const initialVariant = isFirstLoad ? false : "initial"

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* BLOB */}
      <motion.div
        variants={blobVariants}
        initial={initialVariant}
        animate="enter"
        exit="exit"
        className="absolute w-[140vw] h-[110vh] bg-gray-950 shadow-2xl"
      />

      {/* TEXT */}
      {/* Kita tempel variant text disini agar geraknya bareng blob */}
      <motion.div
        variants={textVariants}
        initial={initialVariant}
        animate="enter"
        exit="exit"
        className="absolute inset-0 z-10 flex items-center justify-center text-5xl font-bold text-white"
      >
        {words.length > 1 && <Dot className="mr-2 text-blue-400" />}
        {currentWord}
      </motion.div>
    </div>
  )
}