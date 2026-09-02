import { Link } from 'react-router-dom'
import { ProjectMedia } from '@/components/UI/ProjectMedia'

const VideoCard = ({ item }) => (
  <Link to={`/work/${item.slug}`} className="group block">
    <div className="relative w-full sm:w-90 md:w-105 h-55 sm:h-60 md:h-65 rounded-2xl overflow-hidden border border-neutral-800 transition-transform duration-700 ease-out md:group-hover:scale-105">
      <ProjectMedia project={item} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
        <p className="text-lg md:text-2xl font-medium text-white">{item.name}</p>
        <p className="text-white/70 text-xs md:text-sm">
          {item.category} · {item.year}
        </p>
      </div>
    </div>
  </Link>
)

export default VideoCard
