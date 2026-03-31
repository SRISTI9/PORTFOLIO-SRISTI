import { useRef, Suspense, lazy, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { resumeData } from '../../data/resume'

const LaptopScene = lazy(() => import('../3d/LaptopScene'))

const ROLES = ['AI Engineer', 'Software Developer', 'Problem Solver', 'Hackathon Winner']

function TypewriterRole() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = ROLES[index]
    let timeout
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="gradient-text font-display font-bold" style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)' }}>
      {displayed}<span className="typing-cursor text-neon-blue">|</span>
    </span>
  )
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }
const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mouseRef.current = {
      x: ((e.clientX / window.innerWidth) - 0.5) * 2,
      y: -((e.clientY / window.innerHeight) - 0.5) * 2,
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full opacity-5" style={{ background: 'linear-gradient(180deg, transparent, #00D4FF 30%, transparent)' }} />
        <div className="absolute top-0 left-3/4 w-px h-full opacity-5" style={{ background: 'linear-gradient(180deg, transparent, #7C3AED 50%, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 items-center pt-28 pb-16">
        {/* LEFT */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10">

          {/* Status badge */}
          <motion.div variants={item} className="inline-flex mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase"
              style={{ background: 'rgba(0,212,255,0.06)', borderColor: 'rgba(0,212,255,0.2)', color: '#00D4FF' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Internships · 2025
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="font-display font-black leading-none mb-3"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.02em' }}>
            <span className="text-white">R </span>
            <span style={{ WebkitTextStroke: '2px rgba(0,212,255,0.6)', color: 'transparent' }}>Sristi</span>
          </motion.h1>

          {/* Typewriter tagline */}
          <motion.div variants={item} className="mb-5 h-9 flex items-center">
            <TypewriterRole />
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="text-white/50 max-w-lg mb-8 leading-relaxed font-body"
            style={{ fontSize: 'clamp(0.875rem, 1.4vw, 1rem)' }}>
            Building intelligent systems at the intersection of{' '}
            <span className="text-neon-blue font-medium">Agentic AI</span> and{' '}
            <span className="text-purple-400 font-medium">full-stack engineering</span>.
            Hackathon winner. GHCI Scholar. 300+ DSA problems solved.
          </motion.p>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-8 mb-8 flex-wrap">
            {resumeData.stats.map(s => (
              <div key={s.label}>
                <div className="font-display font-black text-2xl" style={{ background: 'linear-gradient(135deg, #00D4FF, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-mono text-white/35 uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-6">
            <a href={resumeData.links.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              <span>View GitHub →</span>
            </a>
            <button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline text-sm">
              Explore Projects
            </button>
          </motion.div>
          <div className="flex gap-4 mt-6">

  {/* VIEW RESUME */}
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-outline px-6 py-3 text-sm"
  >
    View Resume
  </a>

  {/* DOWNLOAD RESUME */}
  <a
    href="/resume.pdf"
    download
    className="btn-primary px-6 py-3 text-sm"
  >
    Download Resume ↓
  </a>

</div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-5">
            {[
              { label: 'LinkedIn', href: resumeData.links.linkedin },
              { label: 'LeetCode', href: resumeData.links.leetcode },
              { label: 'Email', href: `mailto:${resumeData.emails[1]}` },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-white/35 hover:text-neon-blue transition-colors duration-200">
                {link.label} ↗
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D Scene */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.6 }}
          className="relative h-[480px] lg:h-[580px]">
        
        <Suspense fallback={
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative">
      <div className="w-20 h-20 rounded-full border border-neon-blue/20 animate-ping absolute inset-0" />
      <div className="w-20 h-20 rounded-full border-2 border-t-neon-blue border-neon-blue/10 animate-spin" />
    </div>
  </div>
}>
  <LaptopScene mouse={mouseRef} />
</Suspense>
</motion.div>
</div>  
          

          
      

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono text-white/25 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-neon-blue/50 to-transparent" />
      </motion.div>
    </section>
  )
}
