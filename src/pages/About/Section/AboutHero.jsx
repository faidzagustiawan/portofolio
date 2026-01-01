
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/animation/ScrollRevealLoveable'
import { SplitText } from '@/components/animation/SplitText'
import Lanyard from '@/components/Animation/Lanyard'

export function AboutHero() {
  const { scrollY } = useScroll()
  
  const yText = useTransform(scrollY, [0, 1000], [0, 200]) 
  const yLanyard = useTransform(scrollY, [0, 1000], [0, 100])

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-x-hidden flex items-center bg-neutral-950">
      <div className="w-screen max-w-7xl mx-auto -mt-50 lg:-mt-0 md:mx-0 md:pl-32 px-6 md:px-12 relative h-full flex flex-col justify-center lg:flex-row lg:items-center">
        
        <motion.div 
          style={{ y: yText }} 
          className="max-w-4xl relative -top-40 xl:top-0 z-10 text-center lg:text-left"
        >
          <ScrollReveal animation="fade-up">
            <p className="text-md font-mono uppercase tracking-widest text-neutral-500 mb-6">
              About Me
            </p>
          </ScrollReveal>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-12">
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
          className='absolute w-700 xl:-top-40 top-25 xl:z-0 z-20 -right-290  xl:-right-370 '
        >
          <div className="xl:h-270 h-200   items-center justify-center ">
            <Lanyard cameraDistance={1} />
          </div>
        </motion.div>

      </div>
    </div>
  )
}
