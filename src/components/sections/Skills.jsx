import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import { resumeData } from '../../data/resume'

const categoryColors = {
  Languages: '#00D4FF',
  Frontend: '#7C3AED',
  Backend: '#06FFF0',
  Databases: '#FF006E',
  'AI/ML': '#F59E0B',
  Core: '#10B981',
  Tools: '#8B5CF6',
}

function SkillSphere() {
  const groupRef = useRef()
  const skills = Object.entries(resumeData.skills).flatMap(([cat, items]) =>
    items.map((skill) => ({ skill, color: categoryColors[cat] || '#00D4FF' }))
  )

  // Distribute on sphere surface
  const positions = skills.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / skills.length)
    const theta = Math.sqrt(skills.length * Math.PI) * phi
    return new THREE.Vector3(
      2.5 * Math.cos(theta) * Math.sin(phi),
      2.5 * Math.sin(theta) * Math.sin(phi),
      2.5 * Math.cos(phi)
    )
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central glow sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Skill nodes */}
      {skills.map(({ skill, color }, i) => (
        <group key={skill} position={positions[i]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </mesh>
          <Text
            position={[0, 0.18, 0]}
            fontSize={0.14}
            color={color}
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {skill}
          </Text>
        </group>
      ))}

      {/* Connecting lines from center */}
      {positions.map((pos, i) => {
        const points = [new THREE.Vector3(0, 0, 0), pos]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial
              color={skills[i].color}
              transparent
              opacity={0.08}
            />
          </line>
        )
      })}

      <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={2} distance={5} />
    </group>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 px-6 relative">
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
            Technical Arsenal
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="section-title text-white mb-12"
        >
          Skills &{' '}
          <span className="gradient-text">Technologies</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] lg:h-[500px]"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-neon-blue/30 border-t-neon-blue animate-spin" />
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="#7C3AED" />
                <SkillSphere />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Skill categories */}
          <div className="space-y-4">
            {Object.entries(resumeData.skills).map(([category, skills], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: categoryColors[category], boxShadow: `0 0 8px ${categoryColors[category]}` }}
                  />
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: categoryColors[category] }}
                  >
                    {category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
