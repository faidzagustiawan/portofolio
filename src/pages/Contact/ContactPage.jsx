import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  Github,
  Linkedin,
  Mail,
  Download
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import SEO from "@/components/SEO"

/* =====================
   ANIMATION
===================== */
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


const lockPage = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.pointerEvents = 'none'
}

const unlockPage = () => {
  document.body.style.overflow = ''
  document.body.style.pointerEvents = ''
}

const fullscreenToast = (type, message) =>
  toast.custom(
    (t) => (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center
        bg-neutral-950/90 backdrop-blur-md transition-opacity
        ${t.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-6 text-center text-white">
          {type === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="text-2xl md:text-3xl font-medium tracking-tight">
                Sending your message…
              </p>
            </>
          )}


          {type === 'success' && (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-400" />

              <div className="flex flex-col gap-2">
                <p className="text-3xl md:text-4xl font-semibold tracking-tight">
                  Message Sent
                </p>
                <p className="text-neutral-400 text-base md:text-lg">
                  Thanks for reaching out. I’ll get back to you soon.
                </p>
              </div>
            </>
          )}


          {type === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-400" />
              <p className="text-xl font-medium">{message}</p>
            </>
          )}
        </div>
      </div>
    ),
    { duration: Infinity }
  )


/* =====================
   CONTACT PAGE
===================== */
export default function ContactPage() {


  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  })

  const [botField, setBotField] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  /* ===== Local Time ===== */
  const [time, setTime] = useState('')
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-ID', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  /* =====================
     SUBMIT HANDLER
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (botField) return

    setIsSubmitting(true)
    lockPage()

    const toastId = fullscreenToast('loading', 'Sending your message…')

    try {
      await emailjs.send(
        'service_gn4iko8',
        'template_0s4xa5r',
        {
          name: formState.name,
          email: formState.email,
          title: formState.title,
          message: formState.message,
        },
        'iItwsyPtsQCulJJHD'
      )

      await emailjs.send(
        'service_gn4iko8',
        'template_onqzfb3',
        {
          name: formState.name,
          email: formState.email,
          title: formState.title,
          message: formState.message,
        },
        'iItwsyPtsQCulJJHD'
      )

      toast.dismiss(toastId)
      fullscreenToast('success', 'Message sent successfully 🚀')

      setFormState({
        name: '',
        email: '',
        title: '',
        message: '',
      })

      setTimeout(() => {
        toast.dismiss()
        unlockPage()
      }, 1800)

    } catch (err) {
      console.error(err)

      toast.dismiss(toastId)
      fullscreenToast('error', 'Failed to send message')

      setTimeout(() => {
        toast.dismiss()
        unlockPage()
      }, 2000)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      <SEO title="Contact" description="Get in touch. Let's discuss your next project." url="/contact" />
      {/* --- HEADER & FORM SECTION --- */}
      <div className="pt-32 lg:pt-60 pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            {/* ===== LEFT CONTENT ===== */}
            <div>
              <FadeUp>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                  Let's start a <br className="hidden lg:block" /> project together
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="flex flex-col gap-6 text-neutral-400 text-lg md:text-xl max-w-md">
                  <p>
                    Interested in working together? Fill out the form or send me
                    an email. I'm currently{' '}
                    <span className="text-green-400 font-medium">
                      available
                    </span>{' '}
                    for freelance work.
                  </p>

                  <div className="flex items-center gap-6 text-sm font-mono uppercase tracking-widest mt-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Malang, ID</span>
                    </div>
                    <div>{time}</div>
                  </div>

                  <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-neutral-800">
                    <span className="text-sm font-mono uppercase tracking-widest text-neutral-400">Connect</span>
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:faidzagustiawan@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group">
                        <Mail className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        Email
                      </a>
                      <a href="https://www.linkedin.com/in/muhammad-faidz-agustiawan-8692821bb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group">
                        <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        LinkedIn
                      </a>
                      <a href="https://github.com/faidzagustiawan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-medium hover:bg-white hover:text-black hover:border-white transition-all group">
                        <Github className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                        GitHub
                      </a>
                    </div>
                    <div className="mt-2">
                      <a href="/CV-Muhammad%20Faidz%20Agustiawan.pdf" target="_blank" rel="noopener noreferrer" download className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-xl text-sm font-medium hover:bg-white hover:text-black transition-all group">
                        <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                        Download Resume
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ===== FORM ===== */}
            <div className="relative">
              <div
                className={`bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800 transition-all ${isSubmitting
                  ? 'blur-sm pointer-events-none opacity-60'
                  : ''
                  }`}
              >
                <FadeUp delay={0.2}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot */}
                    <input
                      type="text"
                      tabIndex="-1"
                      autoComplete="off"
                      className="hidden"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />

                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                        Your Name
                      </label>
                      <input
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                       Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                        Project / Subject
                      </label>
                      <input
                        required
                        value={formState.title}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3"
                        placeholder="Website redesign, collaboration, etc."
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-mono uppercase tracking-widest text-neutral-400">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isSuccess}
                      className={`w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${isSuccess
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-black hover:bg-neutral-200'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
