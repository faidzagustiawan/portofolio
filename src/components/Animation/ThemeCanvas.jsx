import { useEffect, useRef } from 'react'

/**
 * ============================
 * CONFIG (AMAN DIUBAH)
 * ============================
 */
const EXP = 4              // eksponensial growth
const RADIUS_SPEED = 0.1      // kecepatan per ms
const DEBUG = true            // MATIKAN jika sudah OK

/**
 * ============================
 * THEME CANVAS
 * ============================
 * - Canvas fullscreen
 * - Circle grow / shrink
 * - Reversible
 * - Time-based
 * - State-machine sederhana
 */
export default function ThemeCanvas({ onCommit }) {
  const canvasRef = useRef(null)

  /**
   * ============================
   * STATE MACHINE (PERSISTENT)
   * ============================
   */
  const machine = useRef({
    ctx: null,
    running: false,

    // direction
    isDark: false,

    // geometry
    center: { x: 0, y: 0 },
    radius: 0,
    maxRadius: 0,

    // timing
    lastTime: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    machine.current.ctx = ctx

    /**
     * ============================
     * RESIZE & SCALE
     * ============================
     */
    const resize = () => {
      const dpr = window.devicePixelRatio * 0.5

      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100vw'
      canvas.style.height = '100vh'

      // RESET transform dulu (INI PENTING)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      machine.current.maxRadius = Math.pow(
        Math.max(window.innerWidth, window.innerHeight),
        1 / EXP
      )

      if (DEBUG) {
        console.log('[ThemeCanvas][resize]', {
          width: canvas.width,
          height: canvas.height,
          maxRadius: machine.current.maxRadius,
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    /**
     * ============================
     * START EVENT (CUSTOM EVENT)
     * ============================
     */
    const start = (e) => {
      const { x, y, nextTheme } = e.detail
      const m = machine.current

      if (DEBUG) {
        console.log('[ThemeCanvas][start]', {
          x,
          y,
          nextTheme,
          prevRunning: m.running,
          prevRadius: m.radius,
        })
      }

      m.center = { x, y }
      m.isDark = nextTheme === 'dark'
      m.running = true
      m.lastTime = performance.now()

      // 🔥 KUNCI: RESET RADIUS SESUAI ARAH
      m.radius = m.isDark ? 0 : m.maxRadius

      requestAnimationFrame(loop)
    }

    window.addEventListener('theme-toggle', start)

    /**
     * ============================
     * MAIN LOOP
     * ============================
     */
    const loop = (time) => {
      const m = machine.current
      if (!m.running) return

      const dt = Math.max(1, time - m.lastTime)
      m.lastTime = time

      // update radius (grow / shrink)
      m.radius += (m.isDark ? 1 : -1) * RADIUS_SPEED * dt

      // clear frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // actual visual radius (eksponensial)
      const visualRadius = Math.pow(m.radius, EXP)

      // ============================
      // DRAW
      // ============================
      ctx.fillStyle = DEBUG
        ? 'rgba(255,255,0,0.85)' // DEBUG: kuning terang
        : 'hsl(var(--background))'

      ctx.beginPath()
      ctx.arc(m.center.x, m.center.y, visualRadius, 0, Math.PI * 2)
      ctx.fill()

      if (DEBUG) {
        console.log('[ThemeCanvas][frame]', {
          dt,
          radius: m.radius,
          visualRadius,
          direction: m.isDark ? 'GROW (dark)' : 'SHRINK (light)',
        })
      }

      /**
       * ============================
       * STOP CONDITION
       * ============================
       */
      const shouldStop =
        (m.isDark && m.radius >= m.maxRadius) ||
        (!m.isDark && m.radius <= 0)

      if (shouldStop) {
        if (DEBUG) {
          console.log('[ThemeCanvas][stop]', {
            finalRadius: m.radius,
            committing: m.isDark ? 'dark' : 'light',
          })
        }

        m.running = false

        // COMMIT THEME (DOM)
        onCommit(m.isDark ? 'dark' : 'light')

        // biarkan frame terakhir terlihat
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          if (DEBUG) {
            console.log('[ThemeCanvas][cleanup] canvas cleared')
          }
        }, 120)

        return
      }

      requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('theme-toggle', start)
    }
  }, [onCommit])

  /**
   * ============================
   * CANVAS ELEMENT
   * ============================
   */
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,                 // di atas semua
        pointerEvents: 'none',
        background: DEBUG
          ? 'rgba(255,0,0,0.08)'        // DEBUG: merah transparan
          : 'transparent',
      }}
    />
  )
}
