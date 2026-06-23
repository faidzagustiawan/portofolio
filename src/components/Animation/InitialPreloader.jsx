import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { preloaderWords } from '@/data/preLoaderWords'

export default function InitialPreloader({ onComplete }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index === preloaderWords.length - 1) {
      const timer = setTimeout(() => {
        onComplete()
      }, 600) // Delay before the blob slides up
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setIndex(i => i + 1)
    }, index === 0 ? 800 : 150)

    return () => clearTimeout(timer)
  }, [index, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-neutral-950 pointer-events-none shadow-2xl"
      initial={{ y: "0%", borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }}
      exit={{ 
        y: "-110%", 
        borderBottomLeftRadius: "200%", 
        borderBottomRightRadius: "200%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="flex items-center text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        <span className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full mr-4 md:mr-6" />
        {preloaderWords[index]}
      </div>
    </motion.div>
  )
}
