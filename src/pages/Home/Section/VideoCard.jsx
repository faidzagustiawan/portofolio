import { useInViewVideo } from "@/hooks/useInViewVideo"

const VideoCard = ({ item }) => {
  const videoRef = useInViewVideo()

  return (
    <div className="relative group w-full sm:w-90 md:w-105 h-55 sm:h-60 md:h-65 rounded-2xl overflow-hidden transition-transform duration-700 ease-out md:group-hover:scale-105">
      
      <video
        ref={videoRef}
        src={item.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
        <h3 className="text-lg md:text-2xl font-medium text-white">
          {item.title}
        </h3>
        <p className="text-white/70 text-xs md:text-sm">
          {item.field} · {item.year}
        </p>
      </div>

    </div>
  )
}

export default VideoCard
