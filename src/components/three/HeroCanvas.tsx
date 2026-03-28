'use client'

import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 75 }}
      className="absolute inset-0 -z-10"
      style={{ position: 'absolute' }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <FloatingShapes />
    </Canvas>
  )
}
