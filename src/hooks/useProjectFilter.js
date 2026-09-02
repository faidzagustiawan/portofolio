import { useDeferredValue, useMemo, useState } from 'react'

const normalise = (value) => String(value ?? '').toLowerCase()

export function useProjectFilter(projects) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')

  // Keeps typing responsive while the list re-filters.
  const deferredQuery = useDeferredValue(searchQuery)

  const filteredProjects = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase()

    return projects.filter((project) => {
      const matchesSearch =
        query === '' ||
        normalise(project.name).includes(query) ||
        normalise(project.tagline).includes(query) ||
        normalise(project.category).includes(query) ||
        project.technologies?.some((tech) => normalise(tech).includes(query))

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const matchesYear = selectedYear === 'All' || project.year === selectedYear

      return matchesSearch && matchesCategory && matchesYear
    })
  }, [projects, deferredQuery, selectedCategory, selectedYear])

  const hasActiveFilters =
    selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery.trim() !== ''

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedYear('All')
    setSearchQuery('')
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    filteredProjects,
    hasActiveFilters,
    clearFilters,
  }
}
