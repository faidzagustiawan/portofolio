
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Dot } from 'lucide-react'



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


export default function Preloader({
  words = [],
  isFirstLoad,
  onComplete,
}) {
  const [index, setIndex] = useState(0)

  /* ================= WORD SEQUENCE ================= */
  useEffect(() => {
    if (!words.length) return

    // selesai di kata terakhir
    if (index === words.length - 1) {
      const endTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 200) // biar kata terakhir kebaca

      return () => clearTimeout(endTimer)
    }

    const timer = setTimeout(() => {
      setIndex((i) => i + 1)
    }, index === 0 ? 1000 : 180)

    return () => clearTimeout(timer)
  }, [index, words, onComplete])



  const currentWord = words[index] ?? ""

  const blobY = useMotionValue(0)

  const textY = useTransform(blobY, (v) => v)

  const textOpacity = useTransform(blobY, ['100%', '60%', '0%'], [0, 0.6, 1])
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden">
      {/* BLOB */}
      <motion.div
        variants={blobVariants}
        initial={isFirstLoad ? false : "initial"}
        animate="enter"
        exit="exit"
        onUpdate={(latest) => {
          if (latest.y !== undefined) {
            blobY.set(latest.y)
          }
        }}
        className="absolute w-[140vw] h-[110vh] bg-gray-950"
      />

      {/* TEXT */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
        }}
        className="absolute inset-0 z-10 flex items-center justify-center text-5xl font-bold text-white"
      >
        {words.length > 1 && <Dot className="mr-2 text-blue-400" />}
        {currentWord}
      </motion.div>
    </div>
  )
}
