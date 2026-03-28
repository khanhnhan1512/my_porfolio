# Phase 02 — Layout & Navigation

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 01](phase-01-project-setup.md) (project must be scaffolded)
- [Design Research](research/researcher-02-report.md)

## Overview

- **Date**: 2026-03-27
- **Description**: Build root layout, responsive glassmorphism navbar, smooth scroll with Lenis, footer, dark theme, font loading (Inter + JetBrains Mono)
- **Priority**: P0
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Dark theme is best for 3D (less visual clash, glowing accents pop)
- Color palette: `#0f172a` bg, `#38bdf8` accent, `#f1f5f9` text
- Lenis pairs perfectly with GSAP ScrollTrigger for smooth scroll
- Inter (headings) + JetBrains Mono (code accents) for data-science feel
- Glassmorphism navbar: `backdrop-blur-md bg-white/5 border-white/10`

## Requirements

### Functional
- Root layout with dark theme applied globally
- Responsive navbar with links to all sections (smooth scroll anchors)
- Mobile hamburger menu with animated open/close
- Smooth scrolling via Lenis integrated with GSAP ScrollTrigger
- Footer with copyright + social links
- Active section highlighting in nav

### Non-Functional
- Navbar transparent on top, glassmorphism on scroll
- Font loading with `next/font` (no FOUT)
- Text contrast >= 4.5:1 over dark backgrounds
- Nav z-index above 3D canvas layers

## Architecture

```
layout.tsx
├── <LenisProvider>       # Smooth scroll wrapper
│   ├── <Navbar />        # Fixed top, glassmorphism
│   ├── <main>{children}</main>
│   └── <Footer />
```

- Lenis initialized in a client component provider
- GSAP ScrollTrigger connected to Lenis scroll events
- Navbar uses Framer Motion for mobile menu animation

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/layout.tsx` — modify
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/globals.css` — modify
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/Navbar.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/MobileMenu.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/Footer.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/providers/LenisProvider.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/providers/GSAPProvider.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add nav links)

## Implementation Steps

1. **Load fonts** in `layout.tsx` using `next/font/google`:
   ```tsx
   import { Inter, JetBrains_Mono } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
   const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
   ```

2. **Set up root layout** — apply font variables + dark bg to `<html>` and `<body>`

3. **Create LenisProvider** (`'use client'`):
   - Init Lenis instance with `smooth: true, lerp: 0.1`
   - Use `useEffect` + `requestAnimationFrame` loop for Lenis
   - Connect Lenis to GSAP ScrollTrigger via `ScrollTrigger.scrollerProxy` or Lenis's `on('scroll')` callback

4. **Create GSAPProvider** (`'use client'`):
   - Register GSAP plugins: `ScrollTrigger`
   - Set up GSAP context for cleanup

5. **Create Navbar**:
   - Fixed position, full width, z-50+
   - Nav links array from constants: `['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Contact']`
   - Scroll spy: use `IntersectionObserver` to track active section
   - Glassmorphism effect: toggle class on scroll (transparent at top, blurred on scroll)
   - Logo/name on left, links on right
   - Desktop: horizontal links; Mobile: hamburger icon

6. **Create MobileMenu**:
   - Framer Motion `AnimatePresence` for slide-in/fade
   - Full-screen overlay or side drawer
   - Close on link click or outside tap

7. **Create Footer**:
   - Simple: copyright year, social icon links (GitHub, LinkedIn, Kaggle)
   - Subtle top border

8. **Define nav constants** in `constants.ts`:
   ```ts
   export const NAV_LINKS = [
     { label: 'About', href: '#about' },
     { label: 'Skills', href: '#skills' },
     { label: 'Projects', href: '#projects' },
     { label: 'Experience', href: '#experience' },
     { label: 'Contact', href: '#contact' },
   ]
   ```

9. **Add global styles** in `globals.css` — scrollbar styling, selection color, smooth scroll base

10. **Wire up page.tsx** — add section placeholder `<div>`s with IDs matching nav hrefs

## Todo List

- [ ] Configure Inter + JetBrains Mono fonts via next/font
- [ ] Set up dark theme in layout.tsx (bg-background, text-foreground)
- [ ] Create LenisProvider with GSAP ScrollTrigger integration
- [ ] Create GSAPProvider
- [ ] Build Navbar with glassmorphism scroll effect
- [ ] Build MobileMenu with Framer Motion animation
- [ ] Implement scroll spy for active section highlighting
- [ ] Build Footer component
- [ ] Add nav link constants
- [ ] Add section placeholder divs in page.tsx
- [ ] Test smooth scrolling between sections
- [ ] Test responsive behavior at all breakpoints

## Success Criteria

- Smooth scroll works between all section anchors
- Navbar becomes glassmorphism on scroll
- Active section highlighted in nav
- Mobile menu opens/closes with animation
- Fonts load without flash of unstyled text
- Dark theme applied consistently

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Lenis conflicts with R3F scroll | Medium | Test early; may need to exclude Canvas from Lenis |
| GSAP ScrollTrigger + Lenis sync issues | Medium | Use Lenis's official GSAP integration pattern |
| Glassmorphism not visible on all browsers | Low | Fallback to solid semi-transparent bg |

## Next Steps

Proceed to [Phase 03 — Hero Section](phase-03-hero-section.md)
