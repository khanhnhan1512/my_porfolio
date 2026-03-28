'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll('[data-animate]')

    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      }
    )
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col items-center gap-6 text-center"
    >
      <p data-animate className="font-mono text-sm tracking-widest text-accent opacity-0">
        Welcome to my portfolio
      </p>

      <h1 data-animate className="text-5xl font-bold leading-tight opacity-0 md:text-7xl">
        Hi, I&apos;m{' '}
        <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
          Nhan Nguyen
        </span>
      </h1>

      <h2 data-animate className="text-2xl font-medium text-muted opacity-0 md:text-3xl">
        Data Engineer &amp; AI Engineer
      </h2>

      <p
        data-animate
        className="max-w-md font-mono text-sm leading-relaxed text-muted opacity-0"
      >
        Building scalable data pipelines and intelligent AI systems.
        Turning raw data into real-world impact.
      </p>

      <div data-animate className="flex gap-4 opacity-0">
        <button
          onClick={() => scrollTo('#projects')}
          className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-transform hover:scale-105"
        >
          View Projects
        </button>
        <button
          onClick={() => scrollTo('#contact')}
          className="rounded-full border border-accent/30 px-6 py-3 font-medium text-accent transition-colors hover:bg-accent/10"
        >
          Get in Touch
        </button>
      </div>

      {/* Scroll indicator */}
      <div data-animate className="absolute -bottom-20 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex animate-bounce flex-col items-center gap-2">
          <span className="text-xs text-muted">Scroll Down</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-muted"
          >
            <path
              d="M10 4v12m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
