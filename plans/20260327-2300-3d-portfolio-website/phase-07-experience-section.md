# Phase 07 — Experience & Education Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout + scroll)
- [Design Research](research/researcher-02-report.md) — timeline patterns

## Overview

- **Date**: 2026-03-27
- **Description**: Vertical timeline component with scroll-triggered reveal, education + experience entries, subtle 3D accents
- **Priority**: P1
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Vertical timeline is the clearest layout for experience/education
- Alternating left/right cards on desktop, all-left on mobile
- GSAP ScrollTrigger perfect for progressive timeline reveal
- 3D accents: small floating shapes along the timeline line, or glowing timeline nodes
- Keep it data-driven (array of entries in constants)

## Requirements

### Functional
- Vertical timeline with center line (desktop) or left-aligned line (mobile)
- Two types of entries: Experience (work/internships) and Education
- Each entry: date range, title, organization, description, tags
- Icon or indicator differentiating experience vs education
- Scroll-triggered reveal: entries animate in sequentially as user scrolls
- Subtle 3D accent on timeline nodes (optional)

### Non-Functional
- Timeline line draws as user scrolls (animated stroke)
- Smooth entry animations (no popping)
- Accessible: proper semantic HTML (ordered list or similar)

## Architecture

```
sections/ExperienceSection.tsx
├── Timeline.tsx              # Timeline container with center/left line
│   ├── TimelineLine.tsx      # Animated SVG line (scroll-driven)
│   └── TimelineEntry.tsx     # Individual card (alternating sides)
└── TimelineNode.tsx          # Circle node at each entry (optional 3D glow)
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ExperienceSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/Timeline.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/TimelineLine.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/TimelineEntry.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/TimelineNode.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add experience/education data)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify

## Implementation Steps

1. **Define experience/education data** in `constants.ts`:
   ```ts
   export interface TimelineItem {
     id: string
     type: 'experience' | 'education'
     title: string
     organization: string
     dateRange: string         // "Jan 2024 - Present"
     description: string
     tags?: string[]
     icon?: string             // briefcase or graduation-cap
   }
   export const TIMELINE: TimelineItem[] = [
     // Sorted newest-first
   ]
   ```

2. **Create Timeline** — container with relative positioning:
   - Center line: `absolute left-1/2 w-0.5 bg-accent/30` (desktop)
   - Mobile: `left-4` for left-aligned
   - Entries alternate: odd items right, even items left (desktop)
   - Use `ol` for semantic order

3. **Create TimelineLine** — animated line that draws on scroll:
   - SVG line with `stroke-dasharray` and `stroke-dashoffset`
   - GSAP ScrollTrigger scrub: offset decreases as user scrolls through section
   - Alternative: simple CSS background with `scaleY` animated from 0 to 1

4. **Create TimelineEntry**:
   - Card: glassmorphism style matching project cards
   - Layout: date badge on top, title, organization, description, tag pills
   - Connecting line from card to center node
   - GSAP scroll reveal: `fromTo({ x: side === 'left' ? -60 : 60, opacity: 0 }, { x: 0, opacity: 1 })`

5. **Create TimelineNode**:
   - Circle on the center line at each entry position
   - Color-coded: accent for experience, secondary for education
   - Optional: subtle CSS glow animation (`box-shadow` pulse)
   - No full R3F Canvas here (overkill) — CSS effects sufficient

6. **Create ExperienceSection** — wrapper `<section id="experience">`:
   - Heading: "Experience & Education"
   - Optional tab toggle: "All" / "Experience" / "Education"
   - Timeline component

7. **Add scroll animations**:
   - Timeline line animates (draws) on scroll scrub
   - Each entry reveals with GSAP ScrollTrigger (staggered, `once: true`)

## Todo List

- [ ] Define timeline data array in constants (experience + education)
- [ ] Create ExperienceSection wrapper
- [ ] Create Timeline container with center line
- [ ] Create TimelineLine with scroll-driven draw animation
- [ ] Create TimelineEntry with alternating layout
- [ ] Create TimelineNode with glow effect
- [ ] Add GSAP scroll-triggered entry reveals
- [ ] Add optional type filter (experience vs education)
- [ ] Test responsive (alternating desktop, stacked mobile)
- [ ] Test scroll animation timing

## Success Criteria

- Timeline displays entries in reverse chronological order
- Line draws progressively as user scrolls
- Entries alternate left/right on desktop, stack on mobile
- Each entry animates in on scroll
- Experience and education visually distinguishable

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Timeline line animation flickers | Low | Use GSAP scrub with `ease: 'none'` for smooth drawing |
| Alternating layout breaks on odd entry counts | Low | Handle last item centering or consistent side |
| Too many entries make section too long | Low | Collapse older entries behind "Show more" |

## Next Steps

Proceed to [Phase 08 — Contact Section](phase-08-contact-section.md)
