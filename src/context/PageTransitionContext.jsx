import { createContext, useContext, useState } from "react"

const PageTransitionContext = createContext(null)

export function PageTransitionProvider({ children }) {
  const [isActive, setIsActive] = useState(false)
  const [words, setWords] = useState([])

  const show = (newWords) => {
    setWords(newWords)
    setIsActive(true)
  }

  const showHelloOnce = (helloWords) => {
  if (window.__HELLO_SHOWN__) return

  window.__HELLO_SHOWN__ = true
  setWords(helloWords)
  setIsActive(true)

  }

  const hide = () => setIsActive(false)

  return (
    <PageTransitionContext.Provider
      value={{
        isActive,
        words,
        show,
        showHelloOnce,
        hide,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(PageTransitionContext)
