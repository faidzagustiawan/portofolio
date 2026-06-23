import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ScrollFloat = ({
  children,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = [0.16, 1, 0.3, 1], // similar to power3.out
  stagger = 0.04,
}) => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" })

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : ''
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        className="inline-block"
        variants={{
          hidden: {
            opacity: 0,
            y: "140%",
            scaleY: 2.6,
            scaleX: 0.7,
          },
          visible: {
            opacity: 1,
            y: "0%",
            scaleY: 1,
            scaleX: 1,
          }
        }}
        transition={{ duration: animationDuration, ease }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))
  }, [children, animationDuration, ease])

  return (
    <h2 ref={containerRef} className={containerClassName}>
      <motion.span
        className={`inline-block ${textClassName}`}
        style={{ transformOrigin: '50% 0%' }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: stagger }}
      >
        {splitText}
      </motion.span>
    </h2>
  )
}

export default ScrollFloat
