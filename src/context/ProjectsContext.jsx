import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProjectsContext } from '@/context/projects-context'
import { PB_URL, mapProjectRecord } from '@/lib/pb'
import { useLocale } from '@/i18n/locale-context'

const ENDPOINT = `${PB_URL}/api/collections/projects/records?sort=-year&perPage=200`

export function ProjectsProvider({ children, initialProjects = null }) {
  const { locale } = useLocale()

  const hasInitial = Array.isArray(initialProjects) && initialProjects.length > 0

  const [projects, setProjects] = useState(() => initialProjects ?? [])
  const [isLoading, setIsLoading] = useState(!hasInitial)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  // The build bakes the feed into every page, so the first paint after
  // hydration already has data. Only refetch when there was none, or when
  // something explicitly asks for a retry.
  const skipInitialFetch = useRef(hasInitial)

  const retry = useCallback(() => setReloadToken((n) => n + 1), [])

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false
      return
    }

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
        setProjects((data.items || []).map((item) => mapProjectRecord(item, locale)))
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message)
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    fetchProjects()
    return () => controller.abort()
  }, [reloadToken, locale])

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
