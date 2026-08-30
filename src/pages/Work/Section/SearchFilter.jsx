import { Search, X } from 'lucide-react'
import { categories, year } from '@/data/projects'

export function SearchFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  resultsCount 
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-white transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-12 pr-12 py-4 text-base md:text-lg bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filters - Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-400 block">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 border ${
                    selectedCategory === category
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Year Filter */}
          <div className="space-y-3">
            <label className="text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-400 block">
              Year
            </label>
            <div className="flex flex-wrap gap-2">
              {year.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedYear(item)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 border ${
                    selectedYear === item
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white hover:scale-105'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count with Clear Filters */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-900 mt-4">
          <div className="text-sm text-neutral-400 mt-4">
            Showing <span className="font-semibold text-white">{resultsCount}</span> project{resultsCount !== 1 ? 's' : ''}
          </div>
          
          {(selectedCategory !== 'All' || selectedYear !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedYear('All')
                setSearchQuery('')
              }}
              className="text-sm text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4 mt-4"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
