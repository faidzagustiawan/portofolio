
import { useRef, useEffect } from 'react'

export function LogoLoop({
  logos = [],
  speed = 100,
  direction = 'left',
  logoHeight = 40,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#000000',
  ariaLabel = 'Logo carousel',
}) {
  const trackRef = useRef(null)
  const isPaused = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId
    let position = 0

    const animate = () => {
      if (!isPaused.current) {
        position += direction === 'left' ? -speed / 60 : speed / 60
        track.style.transform = `translateX(${position}px)`

        const trackWidth = track.scrollWidth / 2
        if (Math.abs(position) >= trackWidth) {
          position = 0
        }
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [speed, direction])

  const handleMouseEnter = () => {
    if (hoverSpeed === 0) isPaused.current = true
  }

  const handleMouseLeave = () => {
    isPaused.current = false
  }

  return (
    <div className="relative w-screen h-full overflow-x-hidden" aria-label={ariaLabel}>
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        className="flex items-center absolute left-0"
        style={{ gap: `${gap}px`, height: `${logoHeight}px` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <a
            key={i}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 ${
              scaleOnHover ? 'hover:scale-125' : ''
            }`}
            style={{ height: `${logoHeight}px`, fontSize: `${logoHeight}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={logo.title}
          >
            {logo.node}
          </a>
        ))}
      </div>
    </div>
  )
}
