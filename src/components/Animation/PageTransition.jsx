import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { projects } from '@/data/projects'

const PageTransition = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top immediately when the new route mounts 
    // (this happens while the screen is fully covered by the blob)
    window.scrollTo(0, 0)
  }, [])

  // Determine the text to show on the blob
  const getTransitionText = () => {
    const path = location.pathname
    if (path === '/') return 'Home'
    
    const segments = path.split('/').filter(Boolean)
    const lastSegment = segments.pop() || ''
    
    // Check if it's a project detail page (path starts with /work/ and has a slug)
    if (path.startsWith('/work/') && lastSegment) {
      const project = projects.find(p => p.slug === lastSegment)
      if (project) return project.name
    }
    
    // Capitalize and format general routes
    return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const text = getTransitionText()

  return (
    <>
      {children}
      
      {/* EXIT: Covers the screen (Blob slides up from bottom) */}
      <motion.div
        className="fixed top-0 left-[-20vw] w-[140vw] h-[110vh] bg-neutral-900 flex items-center justify-center z-[9999] pointer-events-none shadow-2xl"
        initial={{ y: "100%", borderTopLeftRadius: "200%", borderTopRightRadius: "200%" }}
        animate={{ y: "100%", transition: { duration: 0 } }}
        exit={{ 
          y: "0%", 
          borderTopLeftRadius: "0%", 
          borderTopRightRadius: "0%", 
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
        }}
      >
        <motion.span
          className="text-4xl md:text-6xl font-bold text-white opacity-0"
          exit={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
        >
          {text}
        </motion.span>
      </motion.div>
      
      {/* ENTER: Reveals the screen (Blob slides up to top) */}
      <motion.div
        className="fixed top-0 left-[-20vw] w-[140vw] h-[110vh] bg-neutral-900 flex items-center justify-center z-[9999] pointer-events-none shadow-2xl"
        initial={{ y: "0%", borderBottomLeftRadius: "0%", borderBottomRightRadius: "0%" }}
        animate={{ 
          y: "-110%", 
          borderBottomLeftRadius: "200%", 
          borderBottomRightRadius: "200%", 
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
        }}
        exit={{ y: "-110%", transition: { duration: 0 } }}
      >
        <motion.span
          className="text-4xl md:text-6xl font-bold text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {text}
        </motion.span>
      </motion.div>
    </>
  )
}

export default PageTransition
