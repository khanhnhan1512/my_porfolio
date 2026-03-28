'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '@/lib/constants'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section header
    const headers = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(
      headers,
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

    // Animate timeline line height
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      )
    }

    // Animate entries
    const entries = sectionRef.current.querySelectorAll('[data-entry]')
    entries.forEach((entry, i) => {
      const isLeft = i % 2 === 0
      gsap.fromTo(
        entry,
        { x: isLeft ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            once: true,
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <h2
        data-animate
        className="mb-4 text-center text-3xl font-bold opacity-0 md:text-4xl"
      >
        Experience & <span className="text-accent">Education</span>
      </h2>
      <div
        data-animate
        className="mx-auto mb-16 h-1 w-16 rounded bg-accent opacity-0"
      />

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div
          ref={lineRef}
          className="absolute top-0 left-4 h-full w-0.5 origin-top bg-accent/30 md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="relative space-y-12">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <li
                key={item.id}
                data-entry
                className={cn(
                  'relative flex opacity-0',
                  'ml-12 md:ml-0',
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Node */}
                <div className="absolute left-[-2.15rem] top-2 z-10 md:left-1/2 md:-translate-x-1/2">
                  <div
                    className={cn(
                      'size-4 rounded-full border-2',
                      item.type === 'experience'
                        ? 'border-accent bg-accent/20'
                        : 'border-accent-secondary bg-accent-secondary/20'
                    )}
                  />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    'w-full rounded-xl border border-border bg-card p-5 md:w-[calc(50%-2rem)]',
                    isLeft ? 'md:mr-auto' : 'md:ml-auto'
                  )}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-medium',
                        item.type === 'experience'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-accent-secondary/10 text-accent-secondary'
                      )}
                    >
                      {item.type === 'experience' ? '💼' : '🎓'}{' '}
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {item.dateRange}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mb-2 text-sm text-accent">
                    {item.organization}
                  </p>
                  <p className="mb-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
