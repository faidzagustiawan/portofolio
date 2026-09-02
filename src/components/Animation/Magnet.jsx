import { useEffect, useRef } from 'react'

/**
 * Pulls its children toward the pointer when it comes within `padding`.
 *
 * Writes the transform straight to the node inside a rAF rather than through
 * state: a magnet updating on every mousemove would otherwise re-render its
 * whole subtree at pointer frequency.
 */
const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const wrapperRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const inner = innerRef.current
    const wrapper = wrapperRef.current
    if (!inner || !wrapper) return

    const reset = () => {
      inner.style.transition = inactiveTransition
      inner.style.transform = 'translate3d(0, 0, 0)'
    }

    const canMagnetise =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (disabled || !canMagnetise) {
      reset()
      return
    }

    let frame = 0
    let wasActive = false

    const handleMouseMove = (e) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const { left, top, width, height } = wrapper.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        const withinRange =
          Math.abs(centerX - e.clientX) < width / 2 + padding &&
          Math.abs(centerY - e.clientY) < height / 2 + padding

        if (withinRange) {
          if (!wasActive) {
            inner.style.transition = activeTransition
            wasActive = true
          }
          const offsetX = (e.clientX - centerX) / magnetStrength
          const offsetY = (e.clientY - centerY) / magnetStrength
          inner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
        } else if (wasActive) {
          wasActive = false
          reset()
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', handleMouseMove)
      reset()
    }
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition])

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  )
}

export default Magnet
