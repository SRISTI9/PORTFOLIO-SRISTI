import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { resumeData } from '../../data/resume'

const certColors = {
  "Programming & Dev": { color: '#00D4FF', bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)' },
  "Data & Analytics": { color: '#7C3AED', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
  "Security & Systems": { color: '#FF006E', bg: 'rgba(255,0,110,0.08)', border: 'rgba(255,0,110,0.2)' },
  "Other": { color: '#06FFF0', bg: 'rgba(6,255,240,0.08)', border: 'rgba(6,255,240,0.2)' },
}

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="achievements" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* ── ACHIEVEMENTS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-neon-blue" />
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">Milestones</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="section-title text-white mb-12">
          Achievements & <span className="gradient-text">Recognition</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {resumeData.achievements.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-neon-blue/25 transition-colors duration-300 group">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-display font-bold text-white text-sm mb-1 group-hover:text-neon-blue transition-colors">{item.title}</div>
              <div className="text-white/50 text-xs leading-relaxed mb-3">{item.desc}</div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', color: '#00D4FF' }}>{item.org}</span>
                <span className="text-[10px] font-mono text-white/25">{item.year}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── LEADERSHIP ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-purple-500" />
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">Leadership & Activities</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
          className="font-display font-bold text-2xl text-white mb-8">
          Leading <span className="gradient-text">Beyond Code</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {resumeData.leadership.map((item, i) => (
            <motion.div key={item.role}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/25 transition-colors duration-300">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl">{i === 0 ? '🎓' : '🏀'}</div>
                <div>
                  <div className="font-display font-bold text-white text-sm">{item.role}</div>
                  <div className="text-[10px] font-mono text-purple-400 mt-0.5">{item.org}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex gap-2 text-xs text-white/55 leading-relaxed">
                    <span className="text-neon-blue flex-shrink-0 mt-0.5">›</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── CERTIFICATIONS ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-neon-cyan" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">Certifications</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 }}
          className="font-display font-bold text-2xl text-white mb-8">
          Continuous <span className="gradient-text">Learning</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(resumeData.certifications).map(([category, certs], ci) => {
            const style = certColors[category] || certColors["Other"]
            return (
              <motion.div key={category}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + ci * 0.08 }}
                className="rounded-2xl p-5 border"
                style={{ background: style.bg, borderColor: style.border }}>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 font-semibold" style={{ color: style.color }}>
                  {category}
                </div>
                <div className="space-y-3">
                  {certs.map(cert => (
                    <div key={cert.name} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="text-xs font-display font-semibold text-white/85 leading-tight">{cert.name}</div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: style.color, opacity: 0.7 }}>{cert.org}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
