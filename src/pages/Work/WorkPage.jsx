
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { projects } from '@/data/projects'
import { WorkHero } from './Section/WorkHero'
import { SearchFilter } from './Section/SearchFilter'
import { ProjectListDesktop } from './Section/ProjectListDesktop'
import { ProjectGridMobile } from './Section/ProjectGridMobile'
import { FloatingPreview } from './Section/FloatingPreview'
import { StatsSection } from './Section/StatsSection'
import { useCursorTracking } from '@/hooks/useCursorTracking'
import { useHoverIntent } from '@/hooks/useHoverIntent'
import { useProjectFilter } from '@/hooks/useProjectFilter'

export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  const { mouseX, mouseY, cursorX, cursorY } = useCursorTracking()
  const intent = useHoverIntent(activeIndex)

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    filteredProjects,
  } = useProjectFilter(projects)

  return (
    <main className="min-h-screen bg-neutral-950 pt-32 md:pt-40 text-white selection:bg-white selection:text-neutral-950">
      <WorkHero />

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        resultsCount={filteredProjects.length}
      />

      <ProjectListDesktop
        projects={filteredProjects}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      <ProjectGridMobile projects={filteredProjects} />

      <StatsSection />

      <AnimatePresence>
        <FloatingPreview
          activeIndex={activeIndex}
          cursorX={cursorX}
          cursorY={cursorY}
          intent={intent}
          projects={filteredProjects}
        />
      </AnimatePresence>
    </main>
  )
}