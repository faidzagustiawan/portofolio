import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useTransitionNavigate } from '@/hooks/useTransitionNavigate'
import Magnet from '@/components/Animation/Magnet'
import LanguageToggle from '@/components/Layout/LanguageToggle'
import { useCopy } from '@/i18n/locale-context'
import { playHoverSound, playClickSound } from '@/utils/sound'

// A modified click is the browser's to handle — open in a new tab, download,
// context menu — so the animated navigation only claims the plain left click.
const isPlainClick = (e) => !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const tNavigate = useTransitionNavigate()
  const menuButtonRef = useRef(null)
  const copy = useCopy().nav

  const navItems = [
    { label: copy.work, path: '/work' },
    { label: copy.contact, path: '/contact' },
  ]

  // Derived during render rather than in an effect: closing the menu is a
  // reaction to the route changing, not a synchronisation with anything external.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  const isActive = (path) => location.pathname === path

  const handleNavClick = (e, path, label) => {
    if (!isPlainClick(e)) return
    e.preventDefault()
    if (isActive(path)) return
    playClickSound()
    tNavigate(path, label)
  }

  const renderNavItem = ({ label, path }) => {
    const active = isActive(path)

    return (
      <Magnet key={path} padding={40} magnetStrength={50} disabled={active}>
        <Link
          to={path}
          onClick={(e) => handleNavClick(e, path, label)}
          onMouseEnter={() => {
            if (!active) playHoverSound()
          }}
          aria-current={active ? 'page' : undefined}
          className={`px-3 py-2 text-lg font-medium transition-colors select-none ${
            active ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          {label}
        </Link>
      </Magnet>
    )
  }

  return (
    <header
      className={`fixed top-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled ? 'bg-black/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav aria-label={copy.primary} className="max-w-8xl mx-6 lg:mx-50 py-5 flex items-center justify-between">
        {/* LOGO — the label slides to reveal the surname on hover */}
        <Magnet padding={70} magnetStrength={5000}>
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/', copy.home)}
            onMouseEnter={playHoverSound}
            aria-label={copy.homeAria}
            className="group flex items-center space-x-2 text-lg font-bold tracking-wide select-none text-white"
          >
            <span className="inline-block transition-transform duration-700 group-hover:rotate-[360deg]">
              &copy;
            </span>

            {/* Collapsed width ends just after "Faidz"; widening to the full
                measured text is what reveals the surname, so no second
                transform has to stay in sync with it. */}
            <span className="relative block w-[7.8rem] group-hover:w-[14.6rem] overflow-hidden transition-[width] duration-700 ease-out">
              <span className="inline-block whitespace-nowrap">Code by Faidz&nbsp;Agustiawan</span>
            </span>
          </Link>
        </Magnet>

        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map(renderNavItem)}
          <LanguageToggle />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? copy.closeMenu : copy.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="text-white"
          >
            {isOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 flex justify-end"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-right">
              {[{ label: copy.home, path: '/' }, ...navItems].map(renderNavItem)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
