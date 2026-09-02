import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { usePageTransition } from '@/context/page-transition-context'

import { useProjects } from '@/context/projects-context'
import { WorkHero } from './Section/WorkHero'
import { SearchFilter } from './Section/SearchFilter'
import { ProjectListDesktop } from './Section/ProjectListDesktop'
import { ProjectGridMobile } from './Section/ProjectGridMobile'
import { FloatingPreview } from './Section/FloatingPreview'
import { StatsSection } from './Section/StatsSection'
import { useCursorTracking } from '@/hooks/useCursorTracking'
import { useHoverIntent } from '@/hooks/useHoverIntent'
import { useProjectFilter } from '@/hooks/useProjectFilter'
import SEO from '@/components/SEO'

function FeedState({ children }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 text-center">{children}</section>
  )
}

export default function WorkPage() {
  const { projects, isLoading, error, retry, categories, years } = useProjects()
  const [activeIndex, setActiveIndex] = useState(null)
  const { show } = usePageTransition()
  const booted = useRef(false)

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    show(['WORK', 'PROJECTS', 'EXPERIMENTS'])
  }, [show])

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
    hasActiveFilters,
    clearFilters,
  } = useProjectFilter(projects)

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-neutral-950">
      <SEO
        title="Selected Work"
        description="Web and mobile projects by Faidz Agustiawan — full-stack builds, frontend experiments, and the reasoning behind each one."
        url="/work"
      />
      <WorkHero />

      {isLoading && (
        <FeedState>
          <p className="text-neutral-400" role="status">
            Loading projects…
          </p>
        </FeedState>
      )}

      {error && (
        <FeedState>
          <p className="text-neutral-300 mb-6">
            The project feed did not load. {error}
          </p>
          <button
            type="button"
            onClick={retry}
            className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors"
          >
            Try again
          </button>
        </FeedState>
      )}

      {!isLoading && !error && (
        <>
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            categories={categories}
            years={years}
            resultsCount={filteredProjects.length}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          {filteredProjects.length === 0 ? (
            <FeedState>
              <p className="text-neutral-400">
                {hasActiveFilters
                  ? 'No projects match those filters yet.'
                  : 'No projects published yet.'}
              </p>
            </FeedState>
          ) : (
            <>
              <ProjectListDesktop
                projects={filteredProjects}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                mouseX={mouseX}
                mouseY={mouseY}
              />

              <ProjectGridMobile projects={filteredProjects} />
            </>
          )}
        </>
      )}

      <StatsSection />

      <AnimatePresence>
        {activeIndex !== null && (
          <FloatingPreview
            activeIndex={activeIndex}
            cursorX={cursorX}
            cursorY={cursorY}
            intent={intent}
            projects={filteredProjects}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
