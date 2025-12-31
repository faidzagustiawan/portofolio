import { createContext, useContext, useState } from 'react'
import ThemeCanvas from '@/components/Animation/ThemeCanvas'

const ThemeContext = createContext(null)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const bodyRect = document.body.getBoundingClientRect()

    const deviceZoomRatio =
      document.documentElement.clientWidth / window.innerWidth

    const x = rect.left - bodyRect.left + rect.width / 2
    const y =
      (deviceZoomRatio > 1 ? rect.top - bodyRect.top : rect.top) +
      rect.height / 2

    const nextTheme = theme === 'light' ? 'dark' : 'light'

    window.dispatchEvent(
      new CustomEvent('theme-toggle', {
        detail: { x, y, nextTheme },
      })
    )
  }

  const commitTheme = (nextTheme) => {
    const root = document.documentElement
    nextTheme === 'dark'
      ? root.classList.add('dark')
      : root.classList.remove('dark')

    setTheme(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      <ThemeCanvas onCommit={commitTheme} />
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
