import { useId } from 'react'
import { Search, X } from 'lucide-react'
import { useCopy } from '@/i18n/locale-context'

const chipClass = (selected) =>
  `px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 border ${
    selected
      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
      : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white hover:scale-105'
  }`

function FilterGroup({ legend, options, selected, onSelect, render }) {
  return (
    <fieldset className="space-y-3 border-0 p-0 m-0">
      <legend className="text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-400">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={selected === option}
            className={chipClass(selected === option)}
          >
            {render ? render(option) : option}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export function SearchFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  categories,
  years,
  resultsCount,
  hasActiveFilters,
  onClearFilters,
}) {
  const searchId = useId()
  const copy = useCopy().work
  const categoryNames = useCopy().categories

  // The chip values stay the raw CMS strings so filtering keeps working; only
  // the label is translated.
  const label = (value) => (value === 'All' ? copy.all : categoryNames[value] || value)

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
      <div className="space-y-6">
        <div className="relative group">
          <label htmlFor={searchId} className="sr-only">
            {copy.searchLabel}
          </label>
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-white transition-colors pointer-events-none"
          />
          <input
            id={searchId}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="w-full pl-12 pr-12 py-4 text-base md:text-lg bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-500 rounded-xl focus:border-white/30 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              aria-label={copy.clearSearch}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FilterGroup
            legend={copy.filterType}
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            render={label}
          />
          <FilterGroup
            legend={copy.filterYear}
            options={years}
            selected={selectedYear}
            onSelect={setSelectedYear}
            render={(value) => (value === 'All' ? copy.all : value)}
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-neutral-900">
          <p className="text-sm text-neutral-400" role="status" aria-live="polite">
            {copy.showing(resultsCount)}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-sm text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4"
            >
              {copy.clearFilters}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
