import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, TriangleAlert } from 'lucide-react'
import { PreviewPoster } from './PreviewPoster'
import { PreviewModal } from './PreviewModal'
import { loadDemo } from '@/demos/registry'
import { useCopy } from '@/i18n/locale-context'

/**
 * A demo of the project's interface, rebuilt in this repository and running on
 * data that only exists in memory. See `src/demos/README.md` for the contract.
 *
 * Loaded on click and only in the browser: a demo is a whole small application,
 * and neither the prerender nor a visitor who scrolls past should pay for it.
 * That is also why this does not use `React.lazy` — a Suspense boundary would
 * be resolved during the static render, baking the demo into the HTML.
 */
export function ProjectSandbox({ project }) {
  const copy = useCopy().detail.preview
  const [Demo, setDemo] = useState(null)
  const [state, setState] = useState('idle')
  const [runId, setRunId] = useState(0)
  const cancelled = useRef(false)

  useEffect(() => () => {
    cancelled.current = true
  }, [])

  const start = useCallback(async () => {
    setState('loading')
    try {
      const component = await loadDemo(project.sandboxId)
      if (cancelled.current) return
      if (!component) {
        setState('error')
        return
      }
      setDemo(() => component)
      setState('open')
    } catch {
      if (!cancelled.current) setState('error')
    }
  }, [project.sandboxId])

  return (
    <>
      <PreviewPoster project={project} tone="sandbox" label={copy.sandboxLabel}>
        {state === 'error' ? (
          <p className="flex items-center gap-2 text-sm text-neutral-400">
            <TriangleAlert className="w-4 h-4" aria-hidden="true" />
            {copy.sandboxError}
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={() => (Demo ? setState('open') : start())}
              disabled={state === 'loading'}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-neutral-950 rounded-xl font-medium hover:bg-neutral-200 transition-colors disabled:opacity-60"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              {state === 'loading' ? copy.sandboxLoading : copy.sandboxLoad}
            </button>
            <p className="text-sm text-neutral-400 max-w-sm">{copy.sandboxHint}</p>
          </>
        )}
      </PreviewPoster>

      <PreviewModal
        isOpen={state === 'open'}
        onClose={() => setState('closed')}
        title={copy.sandboxLabel}
        subtitle={project.name}
        onReset={() => setRunId((n) => n + 1)}
      >
        {/* The key is the reset: remounting is the only way to be sure nothing
            from the previous run is still on screen. */}
        {Demo && (
          <div key={runId} className="min-h-full bg-neutral-950">
            <Demo />
          </div>
        )}
      </PreviewModal>
    </>
  )
}
