import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight, Send, Loader2, CheckCircle2 } from 'lucide-react';

// --- DATA SOCIAL (Bisa dipindah ke data/socials.js) ---
const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/username' },
  { name: 'GitHub', url: 'https://github.com/username' },
  { name: 'Instagram', url: 'https://instagram.com/username' },
  { name: 'Twitter/X', url: 'https://twitter.com/username' },
];

// --- COMPONENTS ANIMASI ---
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function ContactPage() {
  // State untuk form
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Logic jam lokal (agar klien tau zona waktu kamu)
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Dummy Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi delay kirim email (2 detik)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950 pt-32 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          <div>
            <FadeUp>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
                Let's start a <br className="hidden lg:block" /> project together
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-6 text-neutral-400 text-lg md:text-xl max-w-md">
                <p>
                  Interested in working together? Fill out the form or send me an email. 
                  I'm currently <span className="text-green-400 font-medium">available</span> for freelance work.
                </p>
                
                {/* Location & Time */}
                <div className="flex items-center gap-6 text-sm font-mono uppercase tracking-widest mt-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Malang, ID</span>
                  </div>
                  <div>
                    <span>{time}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800">
            <FadeUp delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-mono uppercase tracking-widest text-neutral-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-mono uppercase tracking-widest text-neutral-500">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-mono uppercase tracking-widest text-neutral-500">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSuccess 
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

        {/* --- FOOTER INFO (Email & Socials) --- */}
        <div className="border-t border-neutral-800 pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Email Besar */}
            <div>
              <FadeUp delay={0.3}>
                <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">Contact Details</h3>
                <a 
                  href="mailto:hello@yourname.com" 
                  className="text-2xl md:text-4xl font-semibold hover:text-neutral-400 transition-colors"
                >
                  hello@yourname.com
                </a>
              </FadeUp>
            </div>

            {/* Social Links */}
            <div>
              <FadeUp delay={0.4}>
                <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-4">Socials</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border-b border-neutral-800 pb-2 hover:border-white transition-colors"
                    >
                      <span className="text-lg text-neutral-400 group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>
            
          </div>
        </div>

      </div>
    </main>
  );
}