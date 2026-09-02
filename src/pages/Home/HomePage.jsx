import { useEffect, useRef } from 'react'
import { usePageTransition } from '@/context/page-transition-context'
import { preloaderWords } from '@/data/preLoaderWords'

import HeroSection from './Section/HeroSection'
import { IntroSection } from './Section/IntroSection'
import { ExpertiseSection } from './Section/ExpertiseSection'
import WorkShowcaseSection from './Section/WorkShowcaseSection'
import FinalCTASection from './Section/FinalCTASection'

import SEO from '@/components/SEO'
import { useCopy } from '@/i18n/locale-context'

const HomePage = () => {
  const copy = useCopy().home
  const { show } = usePageTransition()
  const booted = useRef(false)

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    show(preloaderWords)
  }, [show])

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      <SEO url="/" title={copy.seoTitle} />

      {/* The hero renders the name as a decorative marquee, so the page's real
          heading lives here for crawlers and screen readers. */}
      <h1 className="sr-only">{copy.h1}</h1>

      <HeroSection />

      {/* Scrolls over the fixed hero */}
      <div className="relative z-10 mt-[100vh] bg-neutral-950 shadow-[0_-10px_50px_rgba(0,0,0,0.5)]">
        <IntroSection />
        <ExpertiseSection />
        <WorkShowcaseSection />
        <FinalCTASection />
      </div>
    </main>
  )
}

export default HomePage
