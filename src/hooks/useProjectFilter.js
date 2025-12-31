
import { useMemo, useState } from 'react'

export function useProjectFilter(projects) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = 
        selectedCategory === 'All' || project.category === selectedCategory

      // Year filter
      const matchesYear = 
        selectedYear === 'All' || project.year === selectedYear

      return matchesSearch && matchesCategory && matchesYear
    })
  }, [projects, searchQuery, selectedCategory, selectedYear])

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    filteredProjects,
  }
}
