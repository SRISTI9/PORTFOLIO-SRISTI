import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Ring } from '@react-three/drei'
import * as THREE from 'three'

// CORE (minimal glowing center)
function CoreOrb() {
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.3
      innerRef.current.rotation.y = t * 0.5
    }
  })

  return (
    <group>
      {/* small glow core */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* wireframe shell */}
      <group ref={innerRef}>
        <Sphere args={[0.8, 16, 16]}>
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            wireframe
            transparent
            opacity={0.15}
          />
        </Sphere>
      </group>

      <pointLight color="#00D4FF" intensity={2} distance={4} />
    </group>
  )
}

// RINGS
function OrbitRings() {
  const groupRef = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.4
      groupRef.current.rotation.y = t * 0.2
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3
      ring2Ref.current.rotation.x = t * 0.2
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <Ring args={[1.4, 1.5, 128]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      <group ref={ring2Ref} rotation={[0.4, 0, 0.4]}>
        <Ring args={[1.7, 1.75, 128]}>
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={1.5}
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      <Ring args={[2.0, 2.02, 128]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <meshStandardMaterial
          color="#06FFF0"
          emissive="#06FFF0"
          emissiveIntensity={1}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Ring>
    </>
  )
}

// PARTICLES
function Particles() {
  const count = 100

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1.5 + Math.random() * 1.0

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }

    return arr
  }, [])

  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.08
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.03} transparent opacity={0.7} />
    </points>
  )
}

// MAIN SCENE
function Scene({ mouse }) {
  const groupRef = useRef()
  const scrollY = useRef(0)

  // track scroll
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    // mouse parallax
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.4,
      0.05
    )

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.2,
      0.05
    )

    // 🔥 scroll rotation effect
    groupRef.current.rotation.y += scrollY.current * 0.00005
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <CoreOrb />
        <OrbitRings />
      </Float>
      <Particles />
    </group>
  )
}

// MAIN EXPORT
export default function LaptopScene({ mouse }) {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} color="#00D4FF" intensity={1} />
      <pointLight position={[-5, -3, 3]} color="#7C3AED" intensity={0.8} />

      <Scene mouse={mouse} />

      <fog attach="fog" args={['#020408', 10, 20]} />
    </Canvas>
  )
}