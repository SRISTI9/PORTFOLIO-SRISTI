import { motion } from 'framer-motion'
import { resumeData } from '../../data/resume'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-lg">
          <span className="gradient-text">R Sristi</span>
          <span className="text-white/20 ml-2 text-sm font-mono">· portfolio</span>
        </div>

        <div className="text-xs font-mono text-white/30 text-center">
          Built with React · Three.js · Framer Motion · Tailwind
          <br />
          <span className="text-white/20">© {new Date().getFullYear()} R Sristi. All rights reserved.</span>
        </div>

        <div className="flex gap-4">
          {[
            { label: 'GitHub', href: resumeData.links.github },
            { label: 'LinkedIn', href: resumeData.links.linkedin },
            { label: 'LeetCode', href: resumeData.links.leetcode },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-white/40 hover:text-neon-blue transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
