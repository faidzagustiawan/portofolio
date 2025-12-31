import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { FileDown } from "lucide-react"
import clsx from "clsx"

export default function FloatingCV() {
  const [expanded, setExpanded] = useState(false)
  const [nudgeShown, setNudgeShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpanded(true)
      setNudgeShown(true)

      setTimeout(() => setExpanded(false), 3000)
    }, 7000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="/CV-Muhammad Faidz Agustiawan.pdf"
      download
      className="fixed bottom-15 right-10 z-9999"
      aria-label="Download CV"
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{
          width: expanded ? 200 : 64,   // 🔥 LEBIH BESAR
          scale: 1,
          boxShadow: [
            "0 0 0px rgba(185,28,28,0)",
            "0 0 25px rgba(185,28,28,0.55)",
            "0 0 0px rgba(185,28,28,0)",
          ],
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 260,
            damping: 20,
          },
          scale: {
            type: "spring",
            stiffness: 180,
          },
          boxShadow: {
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => nudgeShown && setExpanded(false)}
        className={clsx(
          "h-[64px]",                       // 🔥 LEBIH TINGGI
          "bg-red-900 text-white",
          "rounded-full",
          "flex items-center gap-4",
          "px-5",
          "cursor-pointer",
          "overflow-hidden",
          "select-none",
          "shadow-xl"
        )}
      >
        {/* Icon */}
        <span className="shrink-0">
          <FileDown size={24} />            {/* 🔥 ICON LEBIH BESAR */}
        </span>

        {/* Text */}
        <AnimatePresence>
          {expanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              className="text-base whitespace-nowrap font-medium"
            >
              Yes, this is my CV
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </a>
  )
}
