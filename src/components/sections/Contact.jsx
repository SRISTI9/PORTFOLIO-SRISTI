import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { resumeData } from '../../data/resume'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/mwvwblgj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus(null)
      }
    } catch (err) {
      setStatus(null)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto" ref={ref}>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-title text-white mb-4"
        >
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-white/50 mb-12 max-w-xl"
        >
          Open for SDE and AI internships. Reach out anytime 🚀
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT → FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >

            {status === 'sent' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-2xl p-10 text-center flex flex-col items-center gap-4"
              >
                <div className="text-5xl">🚀</div>
                <div className="text-white font-bold text-xl">Message Sent!</div>
                <div className="text-white/50 text-sm">I’ll get back to you soon</div>

                <button
                  onClick={() => setStatus(null)}
                  className="btn-outline mt-3"
                >
                  Send Another
                </button>
              </motion.div>

            ) : (

              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 border border-white/5">

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  required
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>

              </form>
            )}
          </motion.div>

          {/* RIGHT → INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
          >

            {/* Primary Email */}
            <a
              href={`mailto:${resumeData.emails[1]}`}
              className="glass rounded-xl p-5 flex items-center gap-4 border border-white/5 hover:border-neon-blue/30 transition"
            >
              <span className="text-2xl">📧</span>
              <div>
                <div className="text-xs text-white/40 uppercase">Primary Email</div>
                <div className="text-neon-blue text-sm">{resumeData.emails[1]}</div>
              </div>
            </a>

            {/* College Email */}
            <a
              href={`mailto:${resumeData.emails[0]}`}
              className="glass rounded-xl p-5 flex items-center gap-4 border border-white/5 hover:border-neon-blue/30 transition"
            >
              <span className="text-2xl">🎓</span>
              <div>
                <div className="text-xs text-white/40 uppercase">College Email</div>
                <div className="text-neon-blue text-sm">{resumeData.emails[0]}</div>
              </div>
            </a>

            {/* Location */}
            <div className="glass rounded-xl p-5 flex items-center gap-4 border border-white/5">
              <span className="text-2xl">📍</span>
              <div>
                <div className="text-xs text-white/40 uppercase">Location</div>
                <div className="text-white/70 text-sm">{resumeData.location}</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-xl p-5 border border-white/5">
              <div className="text-xs text-white/40 uppercase mb-4">Find Me Online</div>
              <div className="flex gap-3">

                <a
                  href={resumeData.links.github}
                  target="_blank"
                  className="flex-1 text-center py-2 glass rounded-xl hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href={resumeData.links.linkedin}
                  target="_blank"
                  className="flex-1 text-center py-2 glass rounded-xl hover:text-blue-400"
                >
                  LinkedIn
                </a>

                <a
                  href={resumeData.links.leetcode}
                  target="_blank"
                  className="flex-1 text-center py-2 glass rounded-xl hover:text-yellow-400"
                >
                  LeetCode
                </a>

              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 p-4 glass rounded-xl border border-neon-blue/20">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70">
                Available for <span className="text-neon-blue">SDE & AI Internships</span> — 2026
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}