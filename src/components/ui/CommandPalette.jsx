import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resumeData } from '../../data/resume'

const commands = [
  { id: 'hero',         label: 'Go to Home',         section: '#hero',         icon: '🏠', keys: 'H' },
  { id: 'about',        label: 'About Sristi',        section: '#about',        icon: '👩‍💻', keys: 'A' },
  { id: 'skills',       label: 'Technical Skills',    section: '#skills',       icon: '⚡', keys: 'S' },
  { id: 'projects',     label: 'View Projects',       section: '#projects',     icon: '🚀', keys: 'P' },
  { id: 'achievements', label: 'Achievements',        section: '#achievements', icon: '🏆', keys: 'W' },
  { id: 'contact',      label: 'Contact Me',          section: '#contact',      icon: '✉️', keys: 'C' },
  { id: 'github',       label: 'Open GitHub',         href: resumeData.links.github,   icon: '🐙', external: true },
  { id: 'linkedin',     label: 'Open LinkedIn',       href: resumeData.links.linkedin, icon: '💼', external: true },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) execute(filtered[selected])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, selected, filtered])

  const execute = (cmd) => {
    setOpen(false)
    if (cmd.external) {
      window.open(cmd.href, '_blank')
    } else {
      document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Hint */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
        <kbd className="px-2 py-1 glass rounded text-xs font-mono text-white/60 border border-white/10">/</kbd>
        <span className="text-xs font-mono text-white/40">Command palette</span>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 cmd-backdrop z-[9998]"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg"
            >
              <div className="glass-strong rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(0, 212, 255, 0.2)', boxShadow: '0 0 60px rgba(0, 212, 255, 0.1), 0 25px 50px rgba(0,0,0,0.5)' }}>
                {/* Search input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                  <svg className="w-4 h-4 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => { setQuery(e.target.value); setSelected(0) }}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none font-body"
                  />
                  <kbd className="px-2 py-0.5 glass rounded text-xs font-mono text-white/30 border border-white/10">ESC</kbd>
                </div>

                {/* Results */}
                <div className="py-2 max-h-72 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div className="px-5 py-6 text-center text-white/30 text-sm font-mono">No commands found</div>
                  ) : filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-100 ${
                        selected === i ? 'bg-neon-blue/10 text-white' : 'text-white/60 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg w-6 text-center">{cmd.icon}</span>
                      <span className="flex-1 text-sm font-body">{cmd.label}</span>
                      {cmd.keys && (
                        <kbd className="px-2 py-0.5 glass rounded text-[10px] font-mono text-white/30 border border-white/10">
                          {cmd.keys}
                        </kbd>
                      )}
                      {cmd.external && (
                        <svg className="w-3 h-3 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                <div className="px-5 py-2 border-t border-white/5 flex gap-4 text-[10px] font-mono text-white/25">
                  <span>↑↓ navigate</span>
                  <span>↵ select</span>
                  <span>ESC close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
