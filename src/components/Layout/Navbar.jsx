import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTransitionNavigate } from '@/hooks/useTransitionNavigate'
import Magnet from '@/components/Animation/Magnet'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const tNavigate = useTransitionNavigate()

  // close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const linkClass = (path) => {
    const active = isActive(path)

    return `
      px-3 py-2 text-l font-medium transition-colors select-none
      ${active
        ? 'text-white cursor-none pointer-events-none'
        : 'text-white/60 hover:text-white cursor-pointer'
      }
    `
  }

  const renderNavItem = (label, path) => {
    const active = isActive(path)

    return (
      <Magnet
        key={path}
        padding={40}
        magnetStrength={50}
        disabled={active}
      >
        <button
          onClick={() => {
            if (!active) tNavigate(path, label)
          }}
          className={linkClass(path)}
          aria-disabled={active}
        >
          {label}
        </button>
      </Magnet>
    )
  }

  return (
    <header
      className={`
        fixed top-0 w-full z-9999 pointer-events-auto
        transition-all duration-300
        ${isScrolled
          ? 'bg-black/20 backdrop-blur-md border-b border-white/10 '
          : 'bg-transparent'
        }
      `}
    >
      {/* Note: Saya sesuaikan mx-50 menjadi responsive juga (lg:mx-50) 
         agar di layar tablet kontennya tidak terlalu terhimpit ke tengah.
      */}
      <nav className="max-w-8xl mx-6 lg:mx-50 h-auto py-5 flex items-center justify-between">

        {/* LOGO */}
        <Magnet padding={70} magnetStrength={5000}>
          <button
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault()
                return
              }
              tNavigate('/', 'Home')
            }}
            className={`group flex items-center space-x-2 text-lg font-bold tracking-wide select-none transition-colors duration-500 ${location.pathname === '/' ? 'text-white' : 'text-white cursor-pointer'}`}
          >
            {/* COPYRIGHT */}
            <span className="inline-block transition-transform duration-700 group-hover:rotate-360">
              &copy;
            </span>

            {/* MASKED + EXPAND WIDTH */}
            <span className="relative w-32.5 group-hover:w-55 overflow-hidden transition-[width] duration-700 ease-out">
              <span className="inline-block whitespace-nowrap transition-transform duration-700 ease-out group-hover:-translate-x-18.75">
                Code by Faidz<span className="text-white/40"></span>&nbsp;Agustiawan
              </span>
            </span>
          </button>
        </Magnet>

        {/* DESKTOP MENU - Perubahan disini (md -> lg) */}
        {/* Menu ini sekarang HILANG di tablet, dan hanya muncul di Desktop Besar */}
        <div className="hidden lg:flex items-center space-x-8">
          {renderNavItem('About', '/about')}
          {renderNavItem('Work', '/work')}
          {renderNavItem('Contact', '/contact')}
        </div>

        {/* MOBILE/TABLET BUTTON - Perubahan disini (md -> lg) */}
        {/* Tombol ini sekarang MUNCUL di tablet */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white cursor-pointer"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* MOBILE/TABLET MENU DROPDOWN - Perubahan disini (md -> lg) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            lg:hidden bg-black/95 backdrop-blur-md
            border-t border-white/10 flex justify-end
          "
        >
          <div className="flex flex-col px-6 py-4 space-y-4 text-right">
            {renderNavItem('Home', '/')}
            {renderNavItem('About', '/about')}
            {renderNavItem('Work', '/work')}
            {renderNavItem('Contact', '/contact')}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar