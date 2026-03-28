# Phase 03 — Hero Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout + scroll required)
- [Tech Stack Research](research/researcher-01-report.md) — R3F patterns, performance
- [Design Research](research/researcher-02-report.md) — hero 3D elements, fallback patterns

## Overview

- **Date**: 2026-03-27
- **Description**: Full-screen hero with R3F Canvas, interactive particle field, floating geometry, name/title/CTA overlay, mouse-follow parallax, mobile 2D fallback
- **Priority**: P0
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Particle fields are ideal for data science portfolios (evoke scatter plots / embeddings)
- Procedural geometry only — no GLTF models in hero for fast LCP
- 5k-20k particles performant with `InstancedMesh` or `Points`
- Must use `next/dynamic` with `ssr: false` for R3F Canvas
- `frameloop="demand"` when scene is static saves battery
- Cap `dpr` at `[1, 1.5]` to prevent retina GPU overload
- Mobile fallback: CSS gradient + subtle CSS animation instead of full 3D

## Requirements

### Functional
- Full-viewport 3D scene as background
- Particle field with slow drift animation (data-point aesthetic)
- 2-3 floating geometric shapes (icosahedron, torus knot) with slow rotation
- Mouse-follow parallax: particles/geometry react to cursor position
- Text overlay: name, title ("Data Scientist"), one-line tagline
- CTA button: scroll to projects or contact section
- Scroll-down indicator (animated chevron)

### Non-Functional
- LCP < 2.5s (text renders before 3D loads)
- Smooth 60fps on mid-range desktop
- Graceful fallback on mobile / low-GPU devices
- Canvas behind text (z-index layering)

## Architecture

```
sections/HeroSection.tsx (server component wrapper)
├── HeroContent.tsx           # Text overlay (name, title, CTA)
├── HeroCanvas.tsx            # dynamic import, ssr: false
│   └── <Canvas>
│       ├── <ParticleField />  # InstancedMesh or Points
│       ├── <FloatingShapes /> # Icosahedron, torus knot
│       ├── <MouseTracker />   # Raycaster / pointer state
│       └── <Effects />        # Bloom, vignette (optional)
└── HeroFallback.tsx          # Static/CSS fallback for mobile
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/HeroSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/HeroContent.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/HeroCanvas.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/ParticleField.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/FloatingShapes.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/MouseTracker.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/HeroFallback.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/hooks/useDeviceDetect.ts` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify

## Implementation Steps

1. **Create HeroSection** — wrapper div with `id="hero"`, `h-screen`, relative positioning. Conditionally render HeroCanvas or HeroFallback based on device.

2. **Create useDeviceDetect hook**:
   ```tsx
   // Detect mobile via matchMedia + optional detect-gpu
   // Returns { isMobile, gpuTier }
   // Install: npm install detect-gpu
   ```

3. **Create HeroCanvas** (`'use client'`, loaded via `next/dynamic`):
   ```tsx
   import dynamic from 'next/dynamic'
   const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
     ssr: false,
     loading: () => <HeroFallback />
   })
   ```
   - Canvas props: `dpr={[1, 1.5]}`, `camera={{ position: [0, 0, 5], fov: 75 }}`
   - Set `className="absolute inset-0 -z-10"` so it sits behind text

4. **Build ParticleField**:
   - Use `THREE.Points` with `BufferGeometry`
   - Generate random positions in a sphere/cube volume (5k-10k points)
   - Vertex shader: slow drift using `sin(time + position)` for organic movement
   - Fragment shader: soft circular point with accent color
   - Alternative: use `@react-three/drei`'s `<Sparkles>` for quick version
   - React to mouse: shift particle positions toward/away from cursor

5. **Build FloatingShapes**:
   - 2-3 `<Float>` wrapped geometries from drei
   - Icosahedron + TorusKnot with wireframe or translucent material
   - Accent color with low opacity: `meshStandardMaterial({ color: '#38bdf8', wireframe: true, opacity: 0.3 })`
   - Slow auto-rotation via `useFrame`

6. **Build MouseTracker**:
   - Use R3F's `useThree` + pointer state to get normalized mouse position
   - Store in zustand or context for ParticleField and FloatingShapes to consume
   - Apply smooth lerp to prevent jitter

7. **Build HeroContent** — absolutely positioned over canvas:
   - Name: large heading (text-5xl md:text-7xl)
   - Title: "Data Scientist" with accent color
   - Tagline: one-liner in JetBrains Mono
   - CTA: button scrolling to `#projects`
   - GSAP text reveal animation on mount (staggered `fromTo`)

8. **Build HeroFallback** — mobile/low-GPU version:
   - Dark gradient background with subtle CSS `@keyframes` floating dots
   - Same text content as HeroContent

9. **Add scroll-down indicator** — animated bouncing chevron at bottom of hero

10. **Add optional postprocessing** — `<EffectComposer>` with `<Bloom>` (subtle, luminanceThreshold: 0.8) for glow on particles. Disable on tier < 3.

## Todo List

- [ ] Create HeroSection wrapper with id="hero"
- [ ] Create useDeviceDetect hook (mobile + GPU tier)
- [ ] Create HeroCanvas with dynamic import (ssr: false)
- [ ] Build ParticleField (5k-10k points, drift animation)
- [ ] Build FloatingShapes (2-3 wireframe geometries with Float)
- [ ] Build MouseTracker (pointer parallax with lerp)
- [ ] Build HeroContent (name, title, tagline, CTA)
- [ ] Build HeroFallback (CSS gradient + animation)
- [ ] Add GSAP text reveal animation
- [ ] Add scroll-down chevron indicator
- [ ] Test on desktop (60fps target)
- [ ] Test mobile fallback triggers correctly

## Success Criteria

- Hero fills viewport, 3D scene renders behind text
- Particles drift smoothly and react to mouse movement
- Floating shapes rotate slowly
- Text is readable over 3D scene (contrast)
- CTA button scrolls to target section
- Mobile shows fallback instead of 3D
- No SSR errors from Three.js

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3D kills LCP (text hidden until Canvas loads) | High | Text renders independently; Canvas is background layer |
| Particle count too high for mid-range GPU | Medium | Start with 5k, benchmark, adjust; use detect-gpu |
| Mouse tracking causes jitter | Low | Smooth with lerp factor (0.05-0.1) |
| SSR crash from Three.js window/document access | High | Always `ssr: false` on dynamic import |

## Security Considerations

- No user input in this section
- 3D assets are procedural (no external model loading)

## Next Steps

Proceed to [Phase 04 — About Section](phase-04-about-section.md). Patterns established here (dynamic import, device detection, Canvas layering) reused in all subsequent 3D sections.
