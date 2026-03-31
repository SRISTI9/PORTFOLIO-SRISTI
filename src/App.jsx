import { useEffect } from 'react'
import Lenis from 'lenis'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'
import Footer from './components/ui/Footer'
import CommandPalette from './components/ui/CommandPalette'
import ParticleBackground from './components/ui/ParticleBackground'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative min-h-screen bg-dark-950 overflow-x-hidden">
      <div className="noise-overlay" />
      <div className="gradient-mesh fixed inset-0 pointer-events-none z-0" />
      <ParticleBackground />
      <CustomCursor />
      <CommandPalette />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
