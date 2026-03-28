# Phase 04 — About Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout), [Phase 03](phase-03-hero-section.md) (3D patterns)
- [Design Research](research/researcher-02-report.md)

## Overview

- **Date**: 2026-03-27
- **Description**: About section with bio, photo/avatar, subtle 3D floating shapes background, GSAP scroll-triggered reveal animations
- **Priority**: P1
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Keep 3D minimal here — subtle accents, not a full scene
- Floating low-poly shapes in background add depth without competing with content
- GSAP ScrollTrigger for reveal-on-scroll is the standard pattern
- Photo optimized with `next/image` for auto WebP/AVIF
- Semi-transparent overlay if text contrast is insufficient over 3D

## Requirements

### Functional
- Bio text (3-4 sentences): who, domain focus (ML/NLP/analytics), passion
- Profile photo or stylized avatar
- Stats row: years experience, projects completed, publications/certifications
- Subtle 3D floating shapes in background (reuse FloatingShapes pattern)
- Scroll-triggered reveal: elements animate in as user scrolls to section

### Non-Functional
- Text readable over any background (4.5:1 contrast)
- Image loads lazily, optimized via next/image
- Animation triggers once (no re-trigger on scroll back)

## Architecture

```
sections/AboutSection.tsx
├── AboutContent.tsx       # Bio text + stats
├── AboutImage.tsx         # Profile photo with styling
└── AboutBackground.tsx    # Subtle 3D shapes (optional, dynamic import)
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/AboutSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/AboutContent.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/AboutImage.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/AboutBackground.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add about data)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify
- `e:/My Document/My_Pet_Projects/my_porfolio/public/images/profile.jpg` — add

## Implementation Steps

1. **Create AboutSection** — wrapper `<section id="about">` with `min-h-screen`, `py-20`, relative positioning. Two-column layout: image left, text right (stacked on mobile).

2. **Create AboutContent**:
   - Heading: "About Me" with accent underline
   - Bio paragraphs from constants
   - Stats row: 3-4 stat cards (number + label) with accent borders
   - All content wrapped in refs for GSAP animation targets

3. **Create AboutImage**:
   - `next/image` with `priority={false}`, `loading="lazy"`
   - Rounded styling with accent border/glow
   - Optional: slight tilt on hover via CSS transform

4. **Create AboutBackground** (optional, `'use client'`, dynamic import):
   - Small R3F Canvas with 3-5 slowly floating shapes
   - Very low opacity (0.1-0.2), positioned absolute behind content
   - Reuse `<Float>` from drei
   - Skip entirely on mobile

5. **Add GSAP scroll-triggered reveals**:
   ```tsx
   useGSAP(() => {
     gsap.from('.about-content', {
       scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
       y: 60, opacity: 0, duration: 0.8, stagger: 0.15
     })
   })
   ```

6. **Define about data** in `constants.ts`:
   ```ts
   export const ABOUT = {
     bio: "...",
     stats: [
       { value: "3+", label: "Years Experience" },
       { value: "15+", label: "Projects" },
       { value: "5", label: "Publications" }
     ]
   }
   ```

7. **Wire into page.tsx** — import and place after HeroSection

## Todo List

- [ ] Create AboutSection with two-column layout
- [ ] Create AboutContent with bio + stats row
- [ ] Create AboutImage with next/image optimization
- [ ] Create subtle AboutBackground 3D shapes (optional)
- [ ] Add GSAP scroll-triggered reveal animations
- [ ] Define about data in constants
- [ ] Add profile photo to public/images/
- [ ] Test responsive layout (stacked on mobile)
- [ ] Test scroll animation trigger point

## Success Criteria

- Bio and photo display in clean two-column layout
- Stats row shows key numbers
- Content animates in on first scroll into view
- Photo loads lazily and is optimized
- Section looks good without 3D background (progressive enhancement)

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3D background competes with text readability | Medium | Keep shapes very low opacity; add semi-transparent backdrop to text area |
| GSAP ScrollTrigger not synced with Lenis | Medium | Ensure GSAPProvider from Phase 02 connects Lenis scroll events |

## Next Steps

Proceed to [Phase 05 — Skills Section](phase-05-skills-section.md)
