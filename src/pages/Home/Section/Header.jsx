import ScrollVelocity from '@/components/Animation/ScrollVelocity'
import LocationBadge from './LocationBadge'
import LightRays from '@/components/Background/LightRays'

const Header = ({ children }) => {

  return (
    <header className="bg-neutral-950">

      <section className="relative w-full h-[80vh] xl:h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-0 bottom-0 h-100 bg-linear-to-t from-black to-transparent z-60 pointer-events-none" />

        <div className="absolute inset-0 z-50">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.5}
            lightSpread={0.1}
            rayLength={1}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.2}
            distortion={0.05}
            className="custom-rays"
          />
        </div>



        {/* LOCATED BADGE */}
        <LocationBadge />



        {/* FOTO */}
        <div className="relative z-10 h-screen group pointer-events-none flex items-center justify-center">
          <div className="relative overflow-visible rounded-2xl">

            <img
              src="/FotoFaidz.svg" // dari PUBLIC
              alt="Faidz"
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
          <p className="text-xl md:text-2xl text-white/80 leading-snug">
            Student<br />
            Information System
          </p>
        </div>

      </section>
    </header>
  )
}

export default Header
