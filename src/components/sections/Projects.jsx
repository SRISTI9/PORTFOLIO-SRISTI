import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { resumeData } from '../../data/resume'

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 })
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
  }

  const inView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease',
      }}
      className="relative group project-card"
    >
      {/* Glow follow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, rgba(0, 212, 255, 0.08), transparent)`,
        }}
      />

      <div className="glass rounded-2xl p-6 h-full border border-white/5 hover:border-neon-blue/20 transition-colors duration-300 relative overflow-hidden">
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-mono bg-neon-blue/10 border border-neon-blue/30 text-neon-blue px-2 py-0.5 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Project number */}
        <div className="text-5xl font-display font-bold text-white/5 mb-4 leading-none">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-blue transition-colors duration-200">
          {project.title}
        </h3>

        {/* Highlight */}
        {project.highlight && (
          <div className="text-xs font-mono text-purple-400 mb-3">{project.highlight}</div>
        )}

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="skill-badge">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-neon-blue transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-neon-cyan transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-px bg-neon-blue" />
          <span className="text-xs font-mono text-neon-blue tracking-widest uppercase">
            Selected Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title text-white mb-12"
        >
          Projects &{' '}
          <span className="gradient-text">Builds</span>
        </motion.h2>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={resumeData.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-block"
          >
            View All on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
