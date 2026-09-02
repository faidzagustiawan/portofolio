import { useCallback, useMemo, useState } from 'react'
import { PageTransitionContext } from '@/context/page-transition-context'

export function PageTransitionProvider({ children }) {
  const [isActive, setIsActive] = useState(false)
  const [words, setWords] = useState([])

  const show = useCallback((newWords) => {
    setWords(newWords)
    setIsActive(true)
  }, [])

  const hide = useCallback(() => setIsActive(false), [])

  // Memoised so consumers can safely list `show`/`hide` as effect dependencies.
  const value = useMemo(() => ({ isActive, words, show, hide }), [isActive, words, show, hide])

  return <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>
}
