'use client'

import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'
import FloatingShapes from './FloatingShapes'

export default function GlobalBackground() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.5} />
      <ParticleField />
      <FloatingShapes />
    </Canvas>
  )
}
