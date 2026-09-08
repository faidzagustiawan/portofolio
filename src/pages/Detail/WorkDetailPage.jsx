import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { useProjects } from '@/context/projects-context'
import { AccessNotice, ProjectPreview } from './ProjectPreview'
import { ProductTour } from './ProductTour'
import { SnippetConsole } from './SnippetConsole'
import { TeamSection } from './TeamSection'
import { SmartImage } from '@/components/UI/SmartImage'
import SEO from '@/components/SEO'
import { useCopy } from '@/i18n/locale-context'

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

/** Two-column section with a running number that never has to be hand-kept. */
const NumberedSection = ({ step, eyebrow, heading, children, className = '' }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 ${className}`}>
    <div className="lg:col-span-4">
      <FadeUp>
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
          {String(step).padStart(2, '0')}. {eyebrow}
        </h2>
        <p className="text-3xl font-bold text-white">{heading}</p>
      </FadeUp>
    </div>
    <div className="lg:col-span-8">
      <FadeUp delay={0.1}>{children}</FadeUp>
    </div>
  </div>
)

const Prose = ({ children }) => (
  <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">{children}</p>
)

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { projects, isLoading, error } = useProjects()
  const copy = useCopy().detail

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-neutral-400">
        <p role="status">{copy.loading}</p>
      </div>
    )
  }

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <SEO title={copy.notFoundTitle} url={`/work/${slug}`} noIndex />
        <h1 className="text-3xl font-bold mb-4">{copy.notFoundTitle}</h1>
        <p className="text-neutral-400 mb-8 max-w-md">
          {error
            ? copy.notFoundFeedError
            : copy.notFoundBody}
        </p>
        <Link
          to="/work"
          className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          {copy.back}
        </Link>
      </main>
    )
  }

  const nextProject = projects.find((p) => p.slug === project.nextProjectSlug)

  // Only the sections this project actually filled in get a number.
  const sections = [
    project.overview && { key: 'overview', body: project.overview },
    project.challenge && { key: 'challenge', body: project.challenge, banded: true },
    project.approach && { key: 'approach', body: project.approach },
    project.solution && { key: 'solution', body: project.solution },
    project.contribution && { key: 'contribution', body: project.contribution },
  ].filter(Boolean)

  const teamStep = sections.length + 1
  const outcomeStep = teamStep + (project.team.length > 0 ? 1 : 0)

  const links = [
    project.access === 'public' && project.liveUrl && { href: project.liveUrl, label: copy.viewLive },
    project.demoUrl && { href: project.demoUrl, label: copy.viewDemo },
    // One entry per repository, labelled when a project has more than one part.
    ...project.repos.map((repo) => ({
      href: repo.url,
      label: repo.label ? `${copy.viewSource} · ${repo.label}` : copy.viewSource,
    })),
  ].filter(Boolean)

  return (
    <main
      key={slug}
      className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950"
    >
      <SEO
        title={project.name}
        description={project.tagline || project.overview}
        image={project.image || `/og/${project.slug}.jpg`}
        url={`/work/${project.slug}`}
        type="article"
      />

      {/* --- HERO --- */}
      <section className="flex flex-col justify-end relative pt-32 pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <FadeUp>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            {copy.back}
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                {project.name}
              </motion.h1>
            </div>

            {project.tagline && (
              <FadeUp delay={0.2}>
                <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </FadeUp>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <FadeUp delay={0.4}>
              <dl className="grid grid-cols-2 gap-y-8 gap-x-4 border-t border-neutral-800 pt-8 lg:border-none lg:pt-0">
                {[
                  { label: copy.role, value: project.role },
                  { label: copy.year, value: project.year },
                  { label: copy.client, value: project.client },
                  { label: copy.duration, value: project.duration },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                        {item.label}
                      </dt>
                      <dd className="font-medium text-base md:text-lg">{item.value}</dd>
                    </div>
                  ))}
              </dl>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* --- TECH MARQUEE --- */}
      {project.technologies.length > 0 && (
        <section className="py-8 border-y border-neutral-900 bg-neutral-900/20 overflow-hidden">
          <h2 className="sr-only">{copy.technologiesUsed}</h2>
          {/* The marquee repeats itself, so assistive tech reads the plain list
              above it instead of four duplicated passes. */}
          <ul className="sr-only">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="flex whitespace-nowrap" aria-hidden="true">
            <motion.div
              animate={{ x: '-50%' }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
              className="flex gap-12 md:gap-24 pl-12 md:pl-24"
            >
              {[...Array(4)].map((_, groupIndex) => (
                <React.Fragment key={groupIndex}>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={`${groupIndex}-${i}`}
                      className="text-lg md:text-xl font-medium text-neutral-500"
                    >
                      {tech}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* --- PREVIEW --- */}
      <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
        <ScaleIn>
          <ProjectPreview project={project} />
        </ScaleIn>

        <FadeUp delay={0.1}>
          <div className="mt-6">
            <AccessNotice project={project} />
          </div>
        </FadeUp>
      </section>

      {/* --- NARRATIVE --- */}
      {sections.map((section, i) =>
        section.banded ? (
          <section
            key={section.key}
            className="py-24 bg-neutral-900/50 border-y border-neutral-900 my-12"
          >
            <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
              <NumberedSection step={i + 1} eyebrow={copy.sections[section.key][0]} heading={copy.sections[section.key][1]}>
                <Prose>{section.body}</Prose>
              </NumberedSection>
            </div>
          </section>
        ) : (
          <section
            key={section.key}
            className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24"
          >
            <NumberedSection step={i + 1} eyebrow={copy.sections[section.key][0]} heading={copy.sections[section.key][1]}>
              <Prose>{section.body}</Prose>
            </NumberedSection>
          </section>
        )
      )}

      {/* --- WALKTHROUGH --- */}
      {project.walkthrough.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
          <FadeUp>
            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
              {copy.tour.eyebrow}
            </h2>
            <p className="text-3xl font-bold text-white mb-10">{copy.tour.heading}</p>
          </FadeUp>

          <ProductTour steps={project.walkthrough} />
        </section>
      )}

      {/* --- API --- */}
      {project.snippets.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
          <FadeUp>
            <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
              {copy.snippets.eyebrow}
            </h2>
            <p className="text-3xl font-bold text-white mb-10">{copy.snippets.heading}</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <SnippetConsole snippets={project.snippets} />
          </FadeUp>
        </section>
      )}

      {/* --- VISUAL DETAILS --- */}
      {project.walkthrough.length === 0 && project.visualDetails.length > 0 && (
        <section className="py-12">
          <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-8">
            <FadeUp>
              <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4">
                {copy.visualEyebrow}
              </h2>
              <p className="text-3xl font-bold text-white">{copy.visualHeading}</p>
            </FadeUp>
          </div>

          <ul className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 lg:px-16 pb-8 list-none m-0">
            {project.visualDetails.map((src, i) => (
              <li key={src} className="shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-center">
                <FadeUp delay={i * 0.1}>
                  <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                    <SmartImage
                      src={src}
                      alt={copy.detailAlt(project.name, i + 1)}
                      className="w-full h-full"
                    />
                  </div>
                </FadeUp>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- TEAM --- */}
      <TeamSection team={project.team} step={teamStep} />

      {/* --- OUTCOME --- */}
      {(project.outcome || links.length > 0 || project.sourceHidden) && (
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-16 md:py-24">
          <div className="p-8 md:p-12 bg-neutral-900 rounded-2xl border border-neutral-800">
            <NumberedSection step={outcomeStep} eyebrow={copy.sections.outcome[0]} heading={copy.sections.outcome[1]}>
              {project.outcome && <Prose>{project.outcome}</Prose>}

              {/* Only the links that lead somewhere. A dead "view live" that
                  opens a dialog explaining itself was worse than its absence. */}
              {(links.length > 0 || project.sourceHidden) && (
                <div className="flex flex-wrap items-center gap-8 mt-8">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base font-medium text-white border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all group"
                    >
                      {link.label}
                      <ExternalLink
                        aria-hidden="true"
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}

                  {project.sourceHidden && (
                    <span className="text-base text-neutral-500">{copy.sourceOnRequest}</span>
                  )}
                </div>
              )}
            </NumberedSection>
          </div>
        </section>
      )}

      {/* --- NEXT PROJECT --- */}
      {nextProject && (
        <section className="border-t border-neutral-800 bg-neutral-950">
          <Link to={`/work/${nextProject.slug}`} className="group block relative overflow-hidden">
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-linear-to-r ${nextProject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
            />

            <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24 md:py-32 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <span className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-4 block">
                    {copy.nextProject}
                  </span>
                  <p className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white transition-transform duration-700 group-hover:translate-x-4">
                    {nextProject.name}
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 border border-neutral-700 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-transparent shrink-0 group-hover:scale-110"
                  >
                    <ArrowUpRight className="w-6 h-6 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}
    </main>
  )
}
