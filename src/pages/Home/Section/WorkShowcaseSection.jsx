import LogoLoop from '@/components/Animation/LogoLoop'
import Magnet from '@/components/Animation/Magnet'
import { Link } from 'react-router-dom'
import { useProjects } from '@/context/projects-context'
import VideoCard from './VideoCard'

const WorkShowcaseSection = () => {
  const { projects } = useProjects()

  // Fall back to the full list so the marquee is never empty just because no
  // record has been flagged featured yet.
  const featured = projects.filter((p) => p.featured)
  const showcase = featured.length > 0 ? featured : projects

  const renderCard = (item) => <VideoCard key={item.id} item={item} />

  return (
    <section className="relative bg-neutral-950 py-32 overflow-hidden">
      <div className="mb-16 px-4 md:px-16 flex flex-wrap justify-between items-center relative z-30 gap-4">
        <h2 className="text-xl md:text-5xl font-medium">Selected Work</h2>

        <Magnet padding={2000} magnetStrength={10}>
          <Link
            to="/work"
            className="inline-flex items-center gap-3 text-base md:text-lg font-medium text-white border border-white/30 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-colors"
          >
            Discover my work →
          </Link>
        </Magnet>
      </div>

      {showcase.length > 0 && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-linear-to-r from-neutral-950 to-transparent z-20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-linear-to-l from-neutral-950 to-transparent z-20"
          />

          <div className="space-y-8 relative z-10">
            <LogoLoop
              logos={showcase}
              speed={60}
              gap={40}
              pauseOnHover
              fadeOut={false}
              renderItem={renderCard}
            />

            <LogoLoop
              logos={showcase}
              speed={-60}
              gap={40}
              pauseOnHover
              fadeOut={false}
              renderItem={renderCard}
            />
          </div>
        </>
      )}
    </section>
  )
}

export default WorkShowcaseSection
