
import { AboutHero } from './Section/AboutHero'
import { IntroSection } from './Section/IntroSection'
import { ExpertiseSection } from './Section/ExpertiseSection'
import { QuoteSection } from './Section/QuoteSection'
import { CTASection } from './Section/CTASection'
import './about.css'


export default function AboutPage() {
  return (
    <main className="bg-neutral-950 text-white font-sans selection:bg-white selection:text-neutral-950">
      
      {/* Fixed Hero Background */}
      <AboutHero />

      {/* Scrolling Content */}
      <div className="relative z-10 mt-[100vh] bg-neutral-950 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
        <IntroSection />
        <ExpertiseSection />
        <QuoteSection />
        <CTASection />
      </div>

    </main>
  )
}