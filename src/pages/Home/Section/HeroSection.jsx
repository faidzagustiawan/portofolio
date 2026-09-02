import ScrollVelocity from '@/components/Animation/ScrollVelocity'
import LocationBadge from './LocationBadge'
import { useCopy } from '@/i18n/locale-context'

const HeroSection = () => {
  const copy = useCopy().home

  return (
    <header className="fixed inset-0 z-0 bg-neutral-950">
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-x-0 bottom-0 h-100 bg-linear-to-t from-neutral-950 to-transparent z-40 pointer-events-none" />

        <div className="z-50">
          <LocationBadge />
        </div>

        {/* PORTRAIT — the LCP element, preloaded from index.html */}
        <div className="relative z-10 h-screen pointer-events-none flex items-center justify-center">
          <picture>
            {/* Chosen by viewport rather than by a sizes descriptor: the portrait
                is height-constrained (h-[70vh], w-auto), and a width-based
                descriptor cannot describe that. */}
            <source type="image/avif" media="(max-width: 768px)" srcSet="/hero/portrait-720.avif" />
            <source type="image/avif" srcSet="/hero/portrait-1200.avif" />
            <source type="image/webp" media="(max-width: 768px)" srcSet="/hero/portrait-720.webp" />
            <source type="image/webp" srcSet="/hero/portrait-1200.webp" />
            <img
              src="/hero/portrait-1200.webp"
              alt={copy.portraitAlt}
              width="1200"
              height="2138"
              fetchPriority="high"
              decoding="async"
              className="object-cover h-[70vh] xl:h-[110vh] w-auto grayscale"
            />
          </picture>
        </div>

        {/* NAME MARQUEE */}
        <div className="absolute -bottom-30 w-full z-10 my-20 pointer-events-none" aria-hidden="true">
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

        {/* ROLE */}
        <div className="absolute right-6 md:right-16 top-1/2 -translate-y-10 z-20 text-right">
          <p className="text-xl md:text-2xl text-white/80 leading-snug font-light">
            Full-Stack<br />
            Developer
          </p>
        </div>
      </section>
    </header>
  )
}

export default HeroSection
