'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutData } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')

    gsap.fromTo(
      els,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
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
      id="about"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <h2
        data-animate
        className="mb-4 text-3xl font-bold opacity-0 md:text-4xl"
      >
        About{' '}
        <span className="text-accent">Me</span>
      </h2>
      <div data-animate className="mb-12 h-1 w-16 rounded bg-accent opacity-0" />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Avatar */}
        <div data-animate className="flex items-center justify-center opacity-0">
          <div className="relative size-64 overflow-hidden rounded-2xl border-2 border-accent/20 md:size-80">
            <Image
              src="/images/avatar.jpg"
              alt="Nhan Nguyen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 320px"
              priority
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col justify-center gap-6">
          {aboutData.bio.map((paragraph, i) => (
            <p
              key={i}
              data-animate
              className="leading-relaxed text-muted opacity-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
        {aboutData.stats.map((stat) => (
          <div
            key={stat.label}
            data-animate
            className="rounded-xl border border-border bg-card p-6 text-center opacity-0"
          >
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
