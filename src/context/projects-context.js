import { createContext, useContext } from 'react'

/**
 * Kept apart from the provider component so the module exports no components —
 * that is what lets Fast Refresh keep working for the provider file.
 */
export const ProjectsContext = createContext(null)

export function useProjects() {
  const value = useContext(ProjectsContext)
  if (!value) throw new Error('useProjects must be used inside <ProjectsProvider>')
  return value
}
