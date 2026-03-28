'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 5000

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const { pointer } = useThree()

  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  const basePositions = useMemo(() => new Float32Array(positions), [positions])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime * 0.3
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const baseX = basePositions[i3]
      const baseY = basePositions[i3 + 1]
      const baseZ = basePositions[i3 + 2]

      posArr[i3] = baseX + Math.sin(time + baseY * 0.5) * 0.3
      posArr[i3 + 1] = baseY + Math.cos(time + baseX * 0.5) * 0.3
      posArr[i3 + 2] = baseZ + Math.sin(time + baseZ * 0.5) * 0.2
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Subtle mouse influence on rotation
    pointsRef.current.rotation.y +=
      (pointer.x * 0.1 - pointsRef.current.rotation.y) * 0.02
    pointsRef.current.rotation.x +=
      (pointer.y * 0.05 - pointsRef.current.rotation.x) * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#38bdf8"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
