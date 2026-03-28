# 3D Portfolio Website — Implementation Plan

Modern interactive 3D portfolio for a data science student. Built with Next.js 15 + React Three Fiber, deployed on Vercel. Features particle-field hero, 3D skills visualization, scroll-triggered animations, and responsive mobile fallbacks.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript, React 19)
- **3D**: React Three Fiber + @react-three/drei + @react-three/postprocessing
- **Animation**: GSAP + @gsap/react + Lenis (smooth scroll) + Framer Motion (UI)
- **Styling**: Tailwind CSS v4 + clsx
- **State**: zustand (3D scene state)
- **Deployment**: Vercel (auto-deploy from GitHub)

## Phases

| # | Phase | Status | Complexity | File |
|---|-------|--------|------------|------|
| 1 | Project Setup | `[x] Complete` | Low | [phase-01](phase-01-project-setup.md) |
| 2 | Layout & Navigation | `[x] Complete` | Medium | [phase-02](phase-02-layout-and-navigation.md) |
| 3 | Hero Section | `[x] Complete` | High | [phase-03](phase-03-hero-section.md) |
| 4 | About Section | `[x] Complete` | Low | [phase-04](phase-04-about-section.md) |
| 5 | Skills Section | `[x] Complete` | High | [phase-05](phase-05-skills-section.md) |
| 6 | Projects Section | `[x] Complete` | Medium | [phase-06](phase-06-projects-section.md) |
| 7 | Experience Section | `[x] Complete` | Medium | [phase-07](phase-07-experience-section.md) |
| 8 | Contact Section | `[x] Complete` | Medium | [phase-08](phase-08-contact-section.md) |
| 9 | Performance & Responsive | `[x] Complete` | High | [phase-09](phase-09-performance-and-responsive.md) |
| 10 | Deployment | `[x] Complete` | Low | [phase-10](phase-10-deployment.md) |

## Dependencies

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phases 4-8 (parallel) ──► Phase 9 ──► Phase 10
```

- **Phase 1** blocks everything (project scaffold)
- **Phase 2** blocks all sections (layout/nav/scroll required)
- **Phase 3** should be done first (sets 3D patterns reused in 4-8)
- **Phases 4-8** can be built in parallel after Phase 3
- **Phase 9** requires all sections complete (optimization pass)
- **Phase 10** requires Phase 9 (deploy only after QA)

## Research Reports

- [Tech Stack Research](research/researcher-01-report.md)
- [Design & Deployment Research](research/researcher-02-report.md)

## Key Decisions

- Dark theme: `#0f172a` bg, `#38bdf8` accent, `#f1f5f9` text
- Fonts: Inter (headings) + JetBrains Mono (code/accents)
- Procedural geometry only in hero (no GLTF models) for fast LCP
- GPU tier detection for mobile fallbacks (detect-gpu package)
- All R3F components loaded via `next/dynamic` with `ssr: false`
- Target: Lighthouse 90+ desktop, 70+ mobile, <3MB first load
