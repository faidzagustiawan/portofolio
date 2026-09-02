import { createContext, useContext } from 'react'

export const PageTransitionContext = createContext(null)

export function usePageTransition() {
  const value = useContext(PageTransitionContext)
  if (!value) throw new Error('usePageTransition must be used inside <PageTransitionProvider>')
  return value
}
