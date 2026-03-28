'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeShape({
  position,
  geometry,
  speed = 0.5,
  color = '#38bdf8',
}: {
  position: [number, number, number]
  geometry: 'icosahedron' | 'torusKnot' | 'octahedron'
  speed?: number
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.2

    // Mouse parallax
    meshRef.current.position.x +=
      (position[0] + pointer.x * 0.3 - meshRef.current.position.x) * 0.02
    meshRef.current.position.y +=
      (position[1] + pointer.y * 0.2 - meshRef.current.position.y) * 0.02
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
        {geometry === 'torusKnot' && (
          <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
        )}
        {geometry === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingShapes() {
  return (
    <group>
      <WireframeShape position={[-3, 1.5, -2]} geometry="icosahedron" speed={0.4} />
      <WireframeShape
        position={[3.5, -1, -3]}
        geometry="torusKnot"
        speed={0.3}
        color="#a78bfa"
      />
      <WireframeShape position={[-1, -2, -1.5]} geometry="octahedron" speed={0.5} />
    </group>
  )
}
