import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Lock, Archive, FlaskConical } from 'lucide-react'
import { ProjectMedia } from '@/components/UI/ProjectMedia'
import { LivePreviewFrame } from './LivePreviewFrame'
import { ProjectSandbox } from './ProjectSandbox'
import { hasDemo } from '@/demos/registry'
import { useCopy } from '@/i18n/locale-context'

/** The URL a preview would frame, and which kind of thing it is. */
function embeddable(project) {
  if (project.access === 'demo' && project.demoUrl) return { url: project.demoUrl, kind: 'demo' }
  if (project.access === 'public' && project.liveUrl) return { url: project.liveUrl, kind: 'live' }
  return null
}

/**
 * Picks what fills the hero slot. `previewmode` in the CMS overrides this, but
 * only downwards — a mode whose material is missing falls back rather than
 * rendering an empty frame.
 */
function resolveMode(project) {
  const frame = embeddable(project)
  const sandbox = hasDemo(project.sandboxId)

  if (project.previewMode === 'embed' && frame) return 'embed'
  if (project.previewMode === 'sandbox' && sandbox) return 'sandbox'
  if (project.previewMode === 'media') return 'media'

  if (frame) return 'embed'
  if (sandbox) return 'sandbox'
  return 'media'
}

export function ProjectPreview({ project }) {
  const mode = resolveMode(project)

  if (mode === 'embed') {
    const { url, kind } = embeddable(project)
    return <LivePreviewFrame project={project} url={url} kind={kind} />
  }

  if (mode === 'sandbox') {
    return <ProjectSandbox project={project} />
  }

  return (
    <div className="aspect-video w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden relative">
      <ProjectMedia project={project} priority className="w-full h-full object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-neutral-950/50 to-transparent pointer-events-none"
      />
    </div>
  )
}

const NOTICE_ICON = {
  public: Globe,
  demo: FlaskConical,
  internal: Lock,
  archived: Archive,
}

/**
 * Says plainly why the project can or cannot be opened.
 *
 * This used to be a modal that appeared after a visitor clicked a link that did
 * nothing — the page promised something it could not deliver, then asked for an
 * email. Stating the access up front costs one line and makes the walkthrough
 * below it the answer rather than the consolation prize.
 */
export function AccessNotice({ project }) {
  const copy = useCopy().detail.access
  const notice = copy[project.access]
  if (!notice) return null

  const Icon = NOTICE_ICON[project.access]
  const body = (project.access === 'demo' && project.demoNote) || notice.body
  const closed = project.access === 'internal' || project.access === 'archived'

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-neutral-800 p-5 ${
        closed ? 'bg-neutral-900' : 'bg-neutral-900/40'
      }`}
    >
      <span
        aria-hidden="true"
        className="shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center"
      >
        <Icon className="w-4 h-4 text-neutral-300" />
      </span>

      <div className="flex-1">
        <p className="text-sm font-medium text-white m-0">{notice.title}</p>
        <p className="text-sm text-neutral-400 m-0 mt-1 leading-relaxed">{body}</p>
      </div>

      {closed && (
        <Link
          to="/contact"
          className="group shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
        >
          {copy.cta}
          <ArrowRight
            aria-hidden="true"
            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  )
}
