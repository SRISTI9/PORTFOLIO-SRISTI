import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const trailSpringConfig = { damping: 35, stiffness: 150 }

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trailSpringX = useSpring(trailX, trailSpringConfig)
  const trailSpringY = useSpring(trailY, trailSpringConfig)

  const isHoveringRef = useRef(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
      trailX.set(e.clientX - 20)
      trailY.set(e.clientY - 20)
    }

    const enter = () => { isHoveringRef.current = true }
    const leave = () => { isHoveringRef.current = false }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor"
        style={{ x: springX, y: springY }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#00D4FF',
            boxShadow: '0 0 10px #00D4FF, 0 0 20px rgba(0, 212, 255, 0.5)',
          }}
        />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="custom-cursor"
        style={{ x: trailSpringX, y: trailSpringY }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(0, 212, 255, 0.4)',
            boxShadow: '0 0 15px rgba(0, 212, 255, 0.1)',
          }}
        />
      </motion.div>
    </>
  )
}
