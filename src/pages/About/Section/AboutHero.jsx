
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollRevealLoveable'
import { SplitText } from '@/components/animation/SplitText'
import Lanyard from '@/components/Animation/Lanyard'

export function AboutHero() {
  const { scrollY } = useScroll()
  
  const yText = useTransform(scrollY, [0, 1000], [0, 200]) 
  const yLanyard = useTransform(scrollY, [0, 1000], [0, 100])

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden flex items-center bg-neutral-950">
      <div className="w-full max-w-7xl mx-auto -mt-50 lg:-mt-0 md:mx-0 md:pl-32 px-6 md:px-12 relative h-full flex flex-col justify-center lg:flex-row lg:items-center">
        
        <motion.div 
          style={{ y: yText }} 
          className="max-w-4xl relative z-10 text-center lg:text-left"
        >
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">
              About Me
            </p>
          </ScrollReveal>

          <h1 className="text-3xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-12">
            <SplitText delay={200} stagger={40}>A frontend</SplitText>
            <br />
            <span className="text-neutral-500">
              <SplitText delay={400} stagger={40}>developer who</SplitText>
            </span>
            <br />
            <SplitText delay={600} stagger={40}>loves motion</SplitText>
          </h1>
        </motion.div>

        <motion.div 
          style={{ y: yLanyard }}
          className='absolute w-full h-[300px] mt-12 md:absolute top-70 md:right-0 lg:xl:right-150 lg:xl:-top-900 md:w-full md:h-full md:mt-0 md:pointer-events-none'
        >
          <div className="w-full h-full flex items-center justify-center lg:block lg:w-1000">
            <Lanyard cameraDistance={18} />
          </div>
        </motion.div>

      </div>
    </div>
  )
}
