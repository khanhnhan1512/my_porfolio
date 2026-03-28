'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { skills, skillCategoryColors, type SkillCategory } from '@/lib/constants'

function SkillNode({
  skill,
  position,
  visible,
}: {
  skill: { name: string; category: SkillCategory }
  position: [number, number, number]
  visible: boolean
}) {
  const ref = useRef<THREE.Group>(null)
  const targetScale = visible ? 1 : 0

  useFrame(() => {
    if (!ref.current) return
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    )
    // Always face camera
    ref.current.quaternion.identity()
  })

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.3}
        color={skillCategoryColors[skill.category]}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff"
      >
        {skill.name}
      </Text>
    </group>
  )
}

function SkillsSphere({
  activeCategory,
}: {
  activeCategory: SkillCategory | null
}) {
  const groupRef = useRef<THREE.Group>(null)

  const positions = useMemo(() => {
    const radius = 3.5
    return skills.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / skills.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return [
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.sin(phi) * Math.sin(theta) * radius,
        Math.cos(phi) * radius,
      ] as [number, number, number]
    })
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[i]}
          visible={!activeCategory || skill.category === activeCategory}
        />
      ))}
    </group>
  )
}

export default function SkillsCanvas({
  activeCategory,
}: {
  activeCategory: SkillCategory | null
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      className="absolute inset-0"
      style={{ position: 'absolute' }}
    >
      <ambientLight intensity={1} />
      <SkillsSphere activeCategory={activeCategory} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}
