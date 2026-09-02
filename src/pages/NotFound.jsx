import { Link } from 'react-router-dom'
import ScrollRevealBlock from '@/components/Animation/ScrollRevealBlock'
import Magnet from '@/components/Animation/Magnet'
import SEO from '@/components/SEO'
import { useCopy } from '@/i18n/locale-context'

const NotFound = () => {
  const copy = useCopy().notFound

  return (
  <main className="bg-neutral-950 text-white min-h-screen overflow-hidden">
    <SEO title={copy.seoTitle} description={copy.seoDescription} noIndex />

    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p
        aria-hidden="true"
        className="text-[8rem] md:text-[14rem] xl:text-[18rem] font-medium leading-none text-white/90"
      >
        404
      </p>

      <h1 className="sr-only">{copy.heading}</h1>

      <ScrollRevealBlock y={40} blur={8} scale={0.95} className="mt-10">
        <p className="text-lg md:text-xl text-white/70 max-w-xl">
          The page you're looking for doesn't exist — or it was never meant to be found.
        </p>
      </ScrollRevealBlock>

      <ScrollRevealBlock y={30} blur={6} scale={0.95} className="mt-14">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Magnet padding={1500} magnetStrength={10}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black text-base md:text-lg font-medium hover:bg-neutral-200 transition-colors duration-300"
            >
              Go home →
            </Link>
          </Magnet>

          <Magnet padding={1500} magnetStrength={10}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/30 text-white text-base md:text-lg font-medium hover:bg-white/10 transition-colors duration-300"
            >
              {copy.work}
            </Link>
          </Magnet>
        </div>
      </ScrollRevealBlock>
    </section>
    </main>
  )
}

export default NotFound
