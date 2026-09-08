import { useId, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useCopy } from '@/i18n/locale-context'

const METHOD_TONE = {
  GET: 'text-emerald-400',
  POST: 'text-sky-400',
  PUT: 'text-amber-400',
  PATCH: 'text-amber-400',
  DELETE: 'text-red-400',
}

/**
 * What a backend project looks like when it has no screens.
 *
 * A screenshot of Postman proves nothing; the interesting part of an API is the
 * shape of what goes in and what comes back. Each endpoint is a tab, and both
 * sides of the exchange are shown together so the reader can see the mapping
 * without scrolling between them.
 */
export function SnippetConsole({ snippets }) {
  const copy = useCopy().detail.snippets
  const [active, setActive] = useState(0)
  const baseId = useId()

  if (snippets.length === 0) return null

  const snippet = snippets[active]

  const onKeyDown = (event) => {
    const delta = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!delta) return
    event.preventDefault()
    const next = (active + delta + snippets.length) % snippets.length
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div
        role="tablist"
        aria-label={copy.listLabel}
        onKeyDown={onKeyDown}
        className="flex overflow-x-auto border-b border-neutral-800"
      >
        {snippets.map((item, index) => (
          <button
            key={item.id}
            id={`${baseId}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            className={`shrink-0 px-4 py-3 text-sm font-mono whitespace-nowrap border-b-2 transition-colors ${
              index === active
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {item.method && (
              <span className={`mr-2 ${METHOD_TONE[item.method] || 'text-neutral-400'}`}>
                {item.method}
              </span>
            )}
            {/* The margin separates these visually; the space separates them
                for anything reading the label out loud. */}
            {' '}
            {item.label}
          </button>
        ))}
      </div>

      <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`}>
        {snippet.path && (
          <p className="px-4 pt-4 text-sm font-mono text-neutral-400 break-all">{snippet.path}</p>
        )}
        {snippet.note && <p className="px-4 pt-3 text-sm text-neutral-400">{snippet.note}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 m-4 rounded-lg overflow-hidden">
          <Pane title={copy.request} code={snippet.request} />
          <Pane title={copy.response} code={snippet.response} />
        </div>
      </div>
    </div>
  )
}

function Pane({ title, code }) {
  const copy = useCopy().detail.snippets
  const [copied, setCopied] = useState(false)

  if (!code) return null

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard access can be refused; the code is selectable either way.
    }
  }

  return (
    <div className="bg-neutral-950 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">{title}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          ) : (
            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          )}
          {copied ? copy.copied : copy.copy}
        </button>
      </div>

      <pre className="overflow-x-auto text-sm font-mono leading-relaxed text-neutral-300 m-0">
        <code>{code}</code>
      </pre>
    </div>
  )
}
