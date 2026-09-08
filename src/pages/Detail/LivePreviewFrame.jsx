import { useState } from 'react'
import { ExternalLink, Maximize2 } from 'lucide-react'
import { PreviewPoster } from './PreviewPoster'
import { PreviewModal } from './PreviewModal'
import { useCopy } from '@/i18n/locale-context'

/**
 * The real site, opened over the case study.
 *
 * The iframe is mounted only while the dialog is open: nothing of the other
 * application is fetched until a visitor asks for it, and closing the dialog
 * unloads it rather than leaving it running behind the page.
 *
 * Below `md` the dialog is not offered. A desktop application squeezed into a
 * 375px column reads as broken work rather than as a preview, so the small
 * screen gets a plain link out instead.
 */
export function LivePreviewFrame({ project, url, kind }) {
  const copy = useCopy().detail.preview
  const [isOpen, setIsOpen] = useState(false)
  const [runId, setRunId] = useState(0)

  const label = kind === 'demo' ? copy.demoLabel : copy.liveLabel
  const host = url.replace(/^https?:\/\//, '')

  return (
    <>
      <PreviewPoster project={project} tone={kind} label={label} subtitle={host}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hidden md:inline-flex items-center gap-3 px-6 py-3 bg-white text-neutral-950 rounded-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          <Maximize2 className="w-4 h-4" aria-hidden="true" />
          {copy.load}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-3 px-6 py-3 bg-white text-neutral-950 rounded-xl font-medium"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          {copy.newTab}
        </a>

        <p className="text-sm text-neutral-400 max-w-sm">
          <span className="hidden md:inline">{copy.loadHint}</span>
          <span className="md:hidden">{copy.mobileHint}</span>
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          {copy.newTab}
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </PreviewPoster>

      <PreviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={label}
        subtitle={host}
        externalUrl={url}
        onReset={() => setRunId((n) => n + 1)}
      >
        <div className="flex flex-col w-full h-full">
          <iframe
            key={runId}
            src={url}
            title={copy.frameTitle(project.name)}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            className="flex-1 min-h-0 w-full border-0 bg-white"
          />

          {/* A site can refuse to be framed, and cross-origin gives no way to
              detect that from here, so the way out is stated rather than kept
              for the failure it cannot see coming. */}
          <p className="shrink-0 px-4 py-2.5 text-center text-xs text-neutral-500 border-t border-neutral-800 m-0">
            {copy.blockedHint}{' '}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors"
            >
              {copy.newTab}
            </a>
            .
          </p>
        </div>
      </PreviewModal>
    </>
  )
}
