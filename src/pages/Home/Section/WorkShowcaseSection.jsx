import LogoLoop from "@/components/Animation/LogoLoop"
import Magnet from "@/components/Animation/Magnet"
import { Link } from "react-router-dom"
import { homeProjects } from "@/data/homeProjects"
import VideoCard from "./VideoCard"

const renderCard = (item) => <VideoCard key={item.id} item={item} />

const WorkShowcaseSection = () => {
  return (
    <section className="relative bg-neutral-950 py-32 overflow-hidden">

      {/* HEADER */}
      <div className="mb-16 px-4 md:px-16 flex justify-between items-center relative z-30 gap-4">
        <h2 className="text-xl md:text-5xl font-medium">
          Selected Work
        </h2>

        <Magnet padding={2000} magnetStrength={10}>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-base md:text-lg font-medium
              text-white border border-white/30 px-6 py-3 rounded-full
              hover:bg-white hover:text-black transition"
          >
            Discover my work →
          </Link>
        </Magnet>
      </div>

      {/* FADES */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-40 bg-linear-to-r from-black to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-40 bg-linear-to-l from-black to-transparent z-20" />

      <div className="space-y-8 relative z-10">
        <LogoLoop
          logos={homeProjects}
          speed={60}
          gap={40}
          pauseOnHover
          fadeOut={false}
          renderItem={renderCard}
        />

        <LogoLoop
          logos={homeProjects}
          speed={-60}
          gap={40}
          pauseOnHover
          fadeOut={false}
          renderItem={renderCard}
        />
      </div>

    </section>
  )
}

export default WorkShowcaseSection
