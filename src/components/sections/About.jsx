import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { resumeData } from '../../data/resume'

function StatCard({ value, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass neon-border rounded-2xl p-6 text-center"
    >
      <div className="font-display font-bold text-3xl gradient-text mb-1">{value}</div>
      <div className="text-xs font-mono text-white/40 uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-neon-blue" />
            <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">
              About Me
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <h2 className="section-title text-white mb-6">
                Building the{' '}
                <span className="gradient-text">Future</span>
                <br />
                One Line at a Time
              </h2>

              <p className="text-white/60 leading-relaxed mb-4">
                I'm a third-year IT undergraduate at BVRIT Hyderabad, passionate about
                bridging the gap between <span className="text-neon-blue">Agentic AI</span> and
                real-world software systems. I thrive at the intersection of machine learning
                and full-stack development.
              </p>

              <p className="text-white/60 leading-relaxed mb-6">
                Beyond code, I've led 50+ students as an{' '}
                <span className="text-purple-400">SSC Leader</span>, and represented my school,
                district, state, and national teams as a{' '}
                <span className="text-neon-cyan">Basketball Captain</span> — proof that
                leadership is my second language.
              </p>

              {/* Education pills */}
              <div className="space-y-3">
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="glass rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-display font-semibold text-white">
                        {edu.institution}
                      </div>
                      <div className="text-xs text-white/50 mt-0.5">{edu.degree}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-neon-blue">{edu.period}</div>
                      {edu.grade && (
                        <div className="text-xs text-purple-400 mt-0.5">{edu.grade}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stats + extra */}
            <div className="space-y-6">
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {resumeData.stats.map((s, i) => (
                  <StatCard key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
                ))}
              </div>

              {/* Leadership highlight */}
              <div className="glass neon-border rounded-2xl p-6 space-y-4">
                <div className="text-xs font-mono text-neon-blue uppercase tracking-widest mb-2">
                  Leadership
                </div>
                {resumeData.leadership.map((l, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-neon-blue to-purple-600 flex-shrink-0 self-stretch" />
                    <div>
                      <div className="text-sm font-semibold text-white">{l.role}</div>
                      <div className="text-xs text-white/50 mt-0.5">{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
