import ScrollVelocity from '@/components/Animation/ScrollVelocity'
import LocationBadge from './LocationBadge'

const HeroSection = () => {

  return (
    <header className="fixed inset-0 z-0 bg-neutral-950">

      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-0 bottom-0 h-100 bg-linear-to-t from-neutral-950 to-transparent z-40 pointer-events-none" />
        
        {/* Subtle background glow replacing LightRays */}
        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" /> */}

        {/* LOCATED BADGE */}
        <div className="z-50">
          <LocationBadge />
        </div>

        {/* FOTO */}
        <div className="relative z-10 h-screen group pointer-events-none flex items-center justify-center">
          <div className="relative overflow-visible rounded-2xl">

            <img
              src="/FotoFaidz.svg"
              alt="Faidz Agustiawan"
              width="800"
              height="1200"
              fetchPriority="high"
              className="
                object-cover h-[70vh] xl:h-[110vh] w-auto
                -bottom-10  
                grayscale
              "
            />

          </div>
        </div>

        {/* SCROLL VELOCITY */}
        <div className="absolute -bottom-30 w-full z-10 my-20 pointer-events-none">
          <ScrollVelocity
            texts={['FAIDZ AGUSTIAWAN -']}
            velocity={300}
            className="
              text-[10rem] md:text-[15rem] xl:text-[20rem]
              font-medium
              leading-none
              text-white/90
              tracking-wide
              py-20
            "
          />
        </div>

        {/* ROLE TEXT */}
        <div className="absolute right-6 md:right-16 top-1/2 -translate-y-10 z-20 text-right">
          <p className="text-xl md:text-2xl text-white/80 leading-snug font-light">
            Student<br />
            Information System
          </p>
        </div>

      </section>
    </header>
  )
}

export default HeroSection
