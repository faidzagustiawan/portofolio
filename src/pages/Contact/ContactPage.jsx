import { useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Github,
  Linkedin,
  Mail,
  Download,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import SEO from '@/components/SEO'

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  ownerTemplate: import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER,
  autoReplyTemplate: import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const EMPTY_FORM = { name: '', email: '', title: '', message: '' }

const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const inputClass =
  'w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:border-white/30 transition-colors'

function Field({ label, htmlFor, children }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-mono uppercase tracking-widest text-neutral-400"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

/** Faidz's local time, not the visitor's — the label next to it says Malang. */
function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Jakarta',
        }).format(new Date())
      )

    update()
    const interval = setInterval(update, 30_000)
    return () => clearInterval(interval)
  }, [])

  return time
}

export default function ContactPage() {
  const [formState, setFormState] = useState(EMPTY_FORM)
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const isMounted = useRef(true)

  const time = useLocalTime()
  const ids = {
    name: useId(),
    email: useId(),
    title: useId(),
    message: useId(),
  }

  useEffect(() => () => {
    isMounted.current = false
  }, [])

  const update = (key) => (e) => setFormState((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (botField) return
    if (status === 'sending') return

    const configured = Object.values(EMAILJS).every(Boolean)
    if (!configured) {
      setStatus('error')
      setErrorMessage('The contact form is not configured. Please email me directly.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    const payload = { ...formState }

    try {
      await emailjs.send(EMAILJS.serviceId, EMAILJS.ownerTemplate, payload, EMAILJS.publicKey)

      // The auto-reply is a courtesy. If it fails the message still reached me,
      // so it must not turn a delivered enquiry into a visible failure.
      emailjs
        .send(EMAILJS.serviceId, EMAILJS.autoReplyTemplate, payload, EMAILJS.publicKey)
        .catch(() => {})

      if (!isMounted.current) return
      setStatus('success')
      setFormState(EMPTY_FORM)
    } catch (err) {
      if (!isMounted.current) return
      setStatus('error')
      setErrorMessage(err?.text || 'Something went wrong sending that. Please email me directly.')
    }
  }

  const isSending = status === 'sending'

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      <SEO
        title="Contact"
        description="Get in touch with Faidz Agustiawan about freelance work, collaborations, or a role."
        url="/contact"
      />

      <div className="pt-32 lg:pt-60 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* ===== LEFT ===== */}
            <div>
              <FadeUp>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                  Let's build <br className="hidden lg:block" /> something together
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="flex flex-col gap-6 text-neutral-400 text-lg md:text-xl max-w-md">
                  <p>
                    Interested in working together? Use the form or email me directly. I'm currently{' '}
                    <span className="text-emerald-400 font-medium">available</span> for freelance
                    work.
                  </p>

                  <div className="flex items-center gap-6 text-sm font-mono uppercase tracking-widest mt-4">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      Malang, ID
                    </span>
                    <span>{time} local</span>
                  </div>

                  <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-neutral-800">
                    <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                      Connect
                    </span>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="mailto:faidzagustiawan@gmail.com"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group"
                      >
                        <Mail className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        Email
                      </a>
                      <a
                        href="https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group"
                      >
                        <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/faidzagustiawan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group"
                      >
                        <Github className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        GitHub
                      </a>
                    </div>

                    <div className="mt-2">
                      <a
                        href="/CV-Muhammad-Faidz-Agustiawan.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl text-sm font-medium hover:bg-white hover:text-black transition-all group"
                      >
                        <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                        Download resume
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ===== FORM ===== */}
            <div className="relative">
              <div className="bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800">
                <FadeUp delay={0.2}>
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-center gap-4 py-12"
                        role="status"
                      >
                        <CheckCircle2 className="w-14 h-14 text-emerald-400" aria-hidden="true" />
                        <h2 className="text-2xl font-semibold">Message sent</h2>
                        <p className="text-neutral-400">
                          Thanks for reaching out. I'll get back to you soon.
                        </p>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="mt-2 text-sm text-neutral-400 underline underline-offset-4 hover:text-white transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        noValidate={false}
                      >
                        {/* Honeypot: off-screen rather than display:none, which some
                            bots skip, and hidden from assistive tech. */}
                        <div className="absolute left-[-9999px]" aria-hidden="true">
                          <label htmlFor="company-website">Leave this field empty</label>
                          <input
                            id="company-website"
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={botField}
                            onChange={(e) => setBotField(e.target.value)}
                          />
                        </div>

                        <Field label="Your name" htmlFor={ids.name}>
                          <input
                            id={ids.name}
                            name="name"
                            required
                            autoComplete="name"
                            value={formState.name}
                            onChange={update('name')}
                            className={inputClass}
                            placeholder="Jane Doe"
                          />
                        </Field>

                        <Field label="Your email" htmlFor={ids.email}>
                          <input
                            id={ids.email}
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={formState.email}
                            onChange={update('email')}
                            className={inputClass}
                            placeholder="jane@example.com"
                          />
                        </Field>

                        <Field label="Project or subject" htmlFor={ids.title}>
                          <input
                            id={ids.title}
                            name="title"
                            required
                            value={formState.title}
                            onChange={update('title')}
                            className={inputClass}
                            placeholder="Website redesign, collaboration, a role"
                          />
                        </Field>

                        <Field label="Message" htmlFor={ids.message}>
                          <textarea
                            id={ids.message}
                            name="message"
                            rows={4}
                            required
                            value={formState.message}
                            onChange={update('message')}
                            className={`${inputClass} resize-none`}
                            placeholder="Tell me about your project…"
                          />
                        </Field>

                        {status === 'error' && (
                          <p
                            role="alert"
                            className="flex items-start gap-2 text-sm text-red-300 bg-red-950/40 border border-red-900/60 rounded-lg px-4 py-3"
                          >
                            <XCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                            {errorMessage}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="w-4 h-4" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
