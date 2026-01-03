import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'


export function QuoteSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })

  // kiri
  const leftX = useTransform(scrollYProgress, [0, 0.5], [0, 1300])
  const leftRotate = useTransform(scrollYProgress, [0, 0.5], [-100, 10])

  // kanan
  const rightX = useTransform(scrollYProgress, [0, 0.5], [1050, 0])
  const rightRotate = useTransform(scrollYProgress, [0, 0.5], [-50, 30])



  return (
    <section className="py-100 md:py-150 lg:py-200 overflow-hidden bg-neutral-950 border-y border-neutral-800">
      <blockquote
        ref={ref}
        className="relative text-center mx-auto"
      >

    
        {/* SVG kiri */}
        <motion.img
          src="https://res.cloudinary.com/dwudbtejo/image/upload/v1767265159/Untitled_design_3_svzorj.svg"
          className="absolute grayscale z-0 scale-130 -left-440  lg:-left-400  bottom-30 lg:bottom-0 pointer-events-none"
          style={{
            x: leftX,
            rotate: leftRotate,
          }}
          alt=""
        />

        {/* SVG kanan */}
        <motion.img
          src="https://res.cloudinary.com/dwudbtejo/image/upload/v1767265261/Untitled_design_4_czlga1.svg"
          className="absolute grayscale z-0 scale-130 -right-5 lg:right-20 -bottom-20 lg:-bottom-70 pointer-events-none"
          style={{
            x: rightX,
            rotate: rightRotate,
          }}
          alt=""
        />

        <p className="relative z-10 text-3xl md:text-4xl lg:text-7xl  font-bold leading-tight mb-8 text-white">
          “Knowing yourself <br />
          is the beginning of all wisdom.”
        </p>

        <div className="relative z-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-700" />
          <cite className="text-lg font-medium not-italic text-neutral-500">
            Socrates
          </cite>
          <div className="h-px w-12 bg-neutral-700" />
        </div>
      </blockquote>
    </section>
  )
}
