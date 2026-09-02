import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProjectsContext } from '@/context/projects-context'
import { PB_URL, mapProjectRecord } from '@/lib/pb'

const ENDPOINT = `${PB_URL}/api/collections/projects/records?sort=-year&perPage=200`

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  const retry = useCallback(() => setReloadToken((n) => n + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProjects() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(ENDPOINT, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Project feed responded ${response.status}`)
        }
        const data = await response.json()
        setProjects((data.items || []).map(mapProjectRecord))
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    fetchProjects()
    return () => controller.abort()
  }, [reloadToken])

  // Filter options follow the live data, so a new category or year in
  // PocketBase shows up without a code change and never offers an empty filter.
  const categories = useMemo(
    () => ['All', ...[...new Set(projects.map((p) => p.category).filter(Boolean))].sort()],
    [projects]
  )

  const years = useMemo(
    () => ['All', ...[...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) => b - a)],
    [projects]
  )

  const value = useMemo(
    () => ({ projects, isLoading, error, retry, categories, years }),
    [projects, isLoading, error, retry, categories, years]
  )

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}
