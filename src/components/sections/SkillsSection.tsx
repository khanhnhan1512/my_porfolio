'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import { skills, skillCategoryColors, type SkillCategory } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

const SkillsCanvas = dynamic(
  () => import('@/components/three/SkillsCanvas'),
  {
    ssr: false,
    loading: () => <SkillsFallback activeCategory={null} />,
  }
)

const categories: (SkillCategory | 'All')[] = [
  'All',
  'Languages',
  'Frameworks',
  'Tools',
  'Visualization',
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(
    null
  )
  const { isMobile } = useDeviceDetect()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <h2
        data-animate
        className="mb-4 text-3xl font-bold opacity-0 md:text-4xl"
      >
        Skills & <span className="text-accent">Technologies</span>
      </h2>
      <div data-animate className="mb-8 h-1 w-16 rounded bg-accent opacity-0" />

      {/* Filter */}
      <div data-animate className="mb-8 flex flex-wrap gap-2 opacity-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              (cat === 'All' && !activeCategory) || cat === activeCategory
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-accent/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Canvas or Fallback */}
      <div className="relative h-[500px] w-full">
        {isMobile ? (
          <SkillsFallback activeCategory={activeCategory} />
        ) : (
          <SkillsCanvas activeCategory={activeCategory} />
        )}
      </div>
    </section>
  )
}

function SkillsFallback({
  activeCategory,
}: {
  activeCategory: SkillCategory | null
}) {
  const filtered = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills

  const grouped = filtered.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3
            className="mb-3 text-sm font-semibold uppercase tracking-wider"
            style={{ color: skillCategoryColors[category as SkillCategory] }}
          >
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill.name}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
