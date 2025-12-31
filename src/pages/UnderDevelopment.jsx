import { useEffect, useState } from "react"

const GAME_DURATION = 5

const randomPosition = () => ({
  top: `${Math.random() * 80 + 10}%`,
  left: `${Math.random() * 80 + 10}%`,
})

const UnderDevelopment = () => {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [dotPos, setDotPos] = useState(randomPosition())

  /* TIMER */
  useEffect(() => {
    if (!started || finished) return

    if (timeLeft === 0) {
      setFinished(true)
      setTimeout(() => setShowResult(true), 300)
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [started, timeLeft, finished])

  const handleDotClick = () => {
    setScore((s) => s + 1)
    setDotPos(randomPosition())
  }

  return (
    <main className="bg-black text-white min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* ================= GAME ================= */}
      <div
        className={`
          w-full max-w-md space-y-6 text-center
          transition-all duration-300
          ${finished ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
        `}
      >
        <h1 className="text-2xl md:text-3xl font-medium">
          Tap the Dot
        </h1>

        {!started && (
          <p className="text-white/60 text-sm md:text-base">
            You have <span className="text-white">{GAME_DURATION} seconds</span>.
            Tap the moving dot as many times as you can.
          </p>
        )}

        {started && (
          <div className="flex justify-between text-sm text-white/60">
            <span>Time: {timeLeft}s</span>
            <span>Score: {score}</span>
          </div>
        )}

        <div
          className="
            relative
            w-full h-80
            border border-white/20
            rounded-2xl
            overflow-hidden
            bg-neutral-950
          "
        >
          {!started && (
            <button
              onClick={() => setStarted(true)}
              className="
                absolute inset-0
                flex items-center justify-center
                text-lg font-medium
                hover:text-white
                transition
              "
            >
              Tap to Start
            </button>
          )}

          {started && (
            <button
              onClick={handleDotClick}
              className="
                absolute
                w-8 h-8
                rounded-full
                bg-white
                hover:scale-110
                transition-transform
              "
              style={dotPos}
            />
          )}
        </div>
      </div>

      {/* ================= RESULT ================= */}
      {showResult && (
        <div
          className="
            absolute
            inset-0
            flex items-center justify-center
            px-6
            transition-all duration-500
            opacity-100 scale-100
          "
        >
          <div className="text-center max-w-xl space-y-6 animate-fade-in">

            <h1 className="text-3xl md:text-5xl font-medium">
              🚧 Under Development
            </h1>

            <p className="text-white/70 text-lg">
              Nice reflexes! You scored{" "}
              <span className="text-white font-medium">{score}</span>.
            </p>

            <p className="text-white/50 text-base leading-relaxed">
              This page isn’t ready yet — but the developer is currently
              <span className="text-white"> working hard </span>
              polishing pixels, fixing bugs, and shipping something meaningful.
              🛠️☕
            </p>

            <a
              href="/"
              className="
                inline-flex items-center gap-2
                px-8 py-4
                rounded-full
                bg-white text-gray-900
                font-medium
                hover:bg-gray-900 hover:text-white
                transition
              "
            >
              Back to Home →
            </a>

          </div>
        </div>
      )}

    </main>
  )
}

export default UnderDevelopment
