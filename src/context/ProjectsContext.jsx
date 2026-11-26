import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ProjectsContext } from '@/context/projects-context'
import { mapProjectRecord } from '@/lib/projects'
import { useLocale } from '@/i18n/locale-context'

// A separate chunk: prerendered pages already carry the data inline, so only
// the SPA shell (or a locale switch) ever downloads it.
const loadRecords = () => import('../../content/projects.json').then((mod) => mod.default)

export function ProjectsProvider({ children, initialProjects = null }) {
  const { locale } = useLocale()

  const hasInitial = Array.isArray(initialProjects) && initialProjects.length > 0

  const [projects, setProjects] = useState(() => initialProjects ?? [])
  const [isLoading, setIsLoading] = useState(!hasInitial)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  // The build bakes the data into every page, so the first paint after
  // hydration already has it. Only load the chunk when there was none, or when
  // something explicitly asks for a retry.
  const skipInitialFetch = useRef(hasInitial)

  const retry = useCallback(() => setReloadToken((n) => n + 1), [])

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false
      return
    }

    let cancelled = false

    async function loadProjects() {
      setIsLoading(true)
      setError(null)
      try {
        const records = await loadRecords()
        if (!cancelled) setProjects(records.map((item) => mapProjectRecord(item, locale)))
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadProjects()
    return () => {
      cancelled = true
    }
  }, [reloadToken, locale])

  // Filter options follow the data, so a new category or year in
  // content/projects.json shows up without a code change and never offers an
  // empty filter.
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
