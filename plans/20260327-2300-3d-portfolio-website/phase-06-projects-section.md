# Phase 06 — Projects Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout), [Phase 03](phase-03-hero-section.md) (3D patterns)
- [Design Research](research/researcher-02-report.md) — project showcase patterns

## Overview

- **Date**: 2026-03-27
- **Description**: Project cards grid with 3D tilt-on-hover effect, category filter, project detail modal, GSAP scroll reveal
- **Priority**: P1
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Tilt-on-hover creates compelling 3D feel without full R3F Canvas
- Can use CSS `transform: perspective() rotateX() rotateY()` driven by mouse position — no Three.js needed
- Project types for data science: ML model, dashboard, data viz, Kaggle competition, research notebook
- Card should show: thumbnail, title, short description, tech tags, links (GitHub, live demo)
- Filter by category keeps section manageable as projects grow

## Requirements

### Functional
- Grid of project cards (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card: thumbnail image, title, description (2 lines), tech tags, action links
- 3D tilt effect on hover (perspective + rotate based on mouse position within card)
- Category filter buttons (All, ML, Dashboard, Viz, Other)
- Click card or "View Details" opens modal with full project info
- GSAP scroll-triggered stagger reveal for cards

### Non-Functional
- Thumbnails optimized via `next/image`
- Modal accessible (focus trap, Escape to close, aria labels)
- Card tilt smooth (60fps, requestAnimationFrame)

## Architecture

```
sections/ProjectsSection.tsx
├── ProjectsFilter.tsx     # Category toggle buttons
├── ProjectsGrid.tsx       # Responsive grid container
│   └── ProjectCard.tsx    # Individual card with tilt effect
├── ProjectModal.tsx       # Detail modal (Framer Motion)
└── useTiltEffect.ts       # Custom hook for CSS 3D tilt
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ProjectsSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ProjectsFilter.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ProjectsGrid.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/ProjectCard.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/ProjectModal.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/hooks/useTiltEffect.ts` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add projects data)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify

## Implementation Steps

1. **Define projects data** in `constants.ts`:
   ```ts
   export interface Project {
     id: string
     title: string
     description: string
     longDescription: string
     thumbnail: string          // path in /public/images/projects/
     category: 'ML' | 'Dashboard' | 'Viz' | 'Other'
     techStack: string[]
     githubUrl?: string
     liveUrl?: string
     metrics?: string           // e.g., "95% accuracy" or "10k rows processed"
   }
   export const PROJECTS: Project[] = [ /* ... */ ]
   ```

2. **Create useTiltEffect hook**:
   ```ts
   // Attach to card ref
   // On mousemove: calculate rotateX/Y from cursor position relative to card center
   // Apply via CSS transform: perspective(1000px) rotateX(Xdeg) rotateY(Ydeg)
   // On mouseleave: reset to 0 with transition
   // Max tilt: ~10-15 degrees
   // Add subtle shine/glare overlay that follows cursor
   ```

3. **Create ProjectCard**:
   - Glassmorphism card style: `bg-white/5 border border-white/10 rounded-xl`
   - Thumbnail via `next/image` (aspect-video, object-cover)
   - Title, 2-line description (line-clamp-2)
   - Tech tag pills: small rounded badges
   - Action links: GitHub icon, external link icon
   - Apply useTiltEffect on the card container
   - `transform-style: preserve-3d` on card for depth effect

4. **Create ProjectsFilter** — same pattern as SkillsFilter:
   - "All" + category buttons
   - Framer Motion `layoutId` for active indicator animation

5. **Create ProjectsGrid**:
   - CSS Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - Framer Motion `AnimatePresence` for filter transitions (cards animate out/in)
   - `layout` prop on each card for smooth reflow

6. **Create ProjectModal**:
   - Framer Motion `motion.div` with backdrop
   - Full project details: long description, all tech tags, metrics, screenshots
   - Links to GitHub and live demo
   - Close button + Escape key + click outside to close
   - Focus trap for accessibility

7. **Create ProjectsSection** — wrapper `<section id="projects">`:
   - Heading: "Projects" with accent underline
   - Filter buttons
   - Grid
   - Modal (rendered via portal or at section level)

8. **Add GSAP scroll reveal**:
   - Cards stagger in from below: `gsap.from('.project-card', { y: 80, opacity: 0, stagger: 0.1, scrollTrigger: {...} })`

## Todo List

- [ ] Define projects data array in constants
- [ ] Create useTiltEffect hook (CSS perspective transform)
- [ ] Create ProjectCard with tilt + glassmorphism
- [ ] Create ProjectsFilter with category buttons
- [ ] Create ProjectsGrid with AnimatePresence filtering
- [ ] Create ProjectModal with accessibility
- [ ] Create ProjectsSection wrapper
- [ ] Add GSAP stagger scroll reveal
- [ ] Add project thumbnail images to public/images/projects/
- [ ] Test tilt effect smoothness
- [ ] Test filter transitions
- [ ] Test modal accessibility (focus trap, escape, aria)
- [ ] Test responsive grid at all breakpoints

## Success Criteria

- Cards display in responsive grid with thumbnails
- Tilt effect follows mouse smoothly on hover
- Category filter shows/hides cards with animation
- Modal opens with full project details, closes properly
- Cards animate in on scroll
- All images lazy-loaded and optimized

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tilt effect janky on low-end devices | Low | Use `will-change: transform`, limit to desktop only |
| Too many project images slow page load | Medium | Lazy load all thumbnails, use placeholder blur |
| Modal scroll conflicts with Lenis | Medium | Pause Lenis while modal is open, restore on close |

## Next Steps

Proceed to [Phase 07 — Experience Section](phase-07-experience-section.md)
