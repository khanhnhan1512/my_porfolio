# Phase 09 — Performance & Responsive Optimization

## Context Links

- [Main Plan](plan.md)
- Dependencies: All section phases (01-08) must be complete
- [Tech Stack Research](research/researcher-01-report.md) — performance section
- [Design Research](research/researcher-02-report.md) — mobile strategy, responsive 3D

## Overview

- **Date**: 2026-03-27
- **Description**: GPU tier detection, mobile 3D fallbacks, image optimization, bundle analysis, Lighthouse optimization, comprehensive responsive testing
- **Priority**: P0
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- `detect-gpu` package (1KB) returns GPU tier 0-3 for conditional rendering
- Tier 0-1: skip 3D entirely; Tier 2: simplified; Tier 3: full experience
- Cap `dpr` at `[1, 1.5]` — retina displays kill GPU on 3D
- `frameloop="demand"` stops render loop when scene is static
- `next/image` auto-converts to WebP/AVIF and lazy loads
- `@next/bundle-analyzer` to audit JS bundle size
- Total page weight target: <3MB including 3D assets
- Lighthouse targets: 90+ desktop, 70+ mobile

## Requirements

### Functional
- GPU tier detection driving 3D complexity levels
- Mobile-specific fallbacks for all 3D sections
- All images optimized (WebP/AVIF via next/image)
- Bundle size analyzed and optimized
- Lighthouse audit passing targets

### Non-Functional
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Smooth 60fps on mid-range desktop GPUs
- Usable experience on low-end mobile (no 3D)
- Total JS bundle < 300KB gzipped (excluding 3D lazy chunks)

## Architecture

```
hooks/useGPUTier.ts          # GPU detection hook
hooks/useMediaQuery.ts       # Responsive breakpoint hook
components/three/R3FWrapper.tsx  # Conditional Canvas wrapper (tier-aware)
```

### Tiered Rendering Strategy
```
Tier 3 (High GPU):    Full 3D + postprocessing + high particle count
Tier 2 (Mid GPU):     3D but no postprocessing, 50% particles, lower dpr
Tier 1 (Low GPU):     Minimal 3D, simple geometries only
Tier 0 (No WebGL):    CSS fallbacks for all sections, no Canvas
Mobile (<768px):       Force Tier 1 or 0 regardless of GPU
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/hooks/useGPUTier.ts` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/hooks/useMediaQuery.ts` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/R3FWrapper.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/hooks/useDeviceDetect.ts` — modify (enhance)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/HeroCanvas.tsx` — modify (add tier logic)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/SkillsCanvas.tsx` — modify (add tier logic)
- `e:/My Document/My_Pet_Projects/my_porfolio/next.config.ts` — modify (headers, optimization)
- `e:/My Document/My_Pet_Projects/my_porfolio/package.json` — modify (add analyze script)

## Implementation Steps

1. **Install performance deps**:
   ```bash
   npm install detect-gpu
   npm install -D @next/bundle-analyzer
   ```

2. **Create useGPUTier hook**:
   ```ts
   import { getGPUTier } from 'detect-gpu'
   // Returns { tier: 0-3, isMobile: boolean, loading: boolean }
   // Cache result in zustand or module-level variable (run once)
   // Default to tier 1 while loading (safe middle ground)
   ```

3. **Create useMediaQuery hook**:
   ```ts
   // Standard SSR-safe matchMedia hook
   // Presets: useIsMobile(), useIsTablet(), useIsDesktop()
   ```

4. **Create R3FWrapper** — conditional Canvas:
   ```tsx
   // If tier >= threshold: render <Canvas> with tier-appropriate dpr and settings
   // If tier < threshold: render fallback component
   // Props: { fallback, minTier?, children }
   ```

5. **Update all 3D canvases** to use R3FWrapper and tier-based settings:
   - Hero: tier 0-1 → HeroFallback; tier 2 → reduced particles; tier 3 → full
   - Skills: tier 0-1 → SkillsFallback; tier 2+ → SkillsCanvas
   - About background: tier 0-2 → skip; tier 3 → show

6. **Optimize Canvas settings** across all R3F components:
   - `dpr={tier >= 3 ? [1, 2] : [1, 1.5]}`
   - `frameloop={isInView ? 'always' : 'demand'}` — stop rendering when off-screen
   - Use IntersectionObserver to track if Canvas is in viewport

7. **Optimize images**:
   - Audit all `<img>` tags → replace with `next/image`
   - Add `placeholder="blur"` with `blurDataURL` for project thumbnails
   - Set explicit `width` and `height` to prevent CLS
   - Profile photo: priority load; project thumbs: lazy

8. **Configure next.config.ts**:
   ```ts
   // Add cache headers for static assets
   async headers() {
     return [{
       source: '/models/:path*',
       headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
     }]
   }
   ```

9. **Set up bundle analyzer**:
   ```ts
   // next.config.ts
   const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })
   // package.json script: "analyze": "ANALYZE=true next build"
   ```
   - Run `npm run analyze`, identify large chunks
   - Ensure R3F/Three.js only in lazy-loaded client chunks, not in main bundle

10. **Run Lighthouse audit**:
    - Desktop: target 90+ (Performance, Accessibility, Best Practices, SEO)
    - Mobile: target 70+ Performance, 90+ others
    - Fix: eliminate render-blocking resources, reduce unused JS, compress assets

11. **Responsive testing checklist**:
    - 320px (small mobile), 375px (iPhone), 768px (tablet), 1024px (laptop), 1440px (desktop)
    - Test navbar, hero, all sections, footer at each breakpoint
    - Test touch interactions (no hover-dependent functionality on mobile)

12. **Add meta tags for SEO** in `layout.tsx`:
    ```tsx
    export const metadata = {
      title: 'Your Name | Data Scientist',
      description: 'Portfolio of a data scientist...',
      openGraph: { ... },
      twitter: { ... }
    }
    ```

## Todo List

- [ ] Install detect-gpu and @next/bundle-analyzer
- [ ] Create useGPUTier hook
- [ ] Create useMediaQuery hook
- [ ] Create R3FWrapper conditional component
- [ ] Update HeroCanvas with tier logic
- [ ] Update SkillsCanvas with tier logic
- [ ] Update AboutBackground with tier logic
- [ ] Add frameloop="demand" for off-screen canvases
- [ ] Replace all img tags with next/image
- [ ] Add blur placeholders to project thumbnails
- [ ] Configure cache headers in next.config.ts
- [ ] Set up and run bundle analyzer
- [ ] Run Lighthouse audit, fix issues
- [ ] Test all responsive breakpoints
- [ ] Add SEO meta tags
- [ ] Test on real mobile device (not just DevTools)

## Success Criteria

- Lighthouse desktop: 90+ all categories
- Lighthouse mobile: 70+ performance, 90+ others
- Total page weight < 3MB on first load
- Main JS bundle < 300KB gzipped
- 3D sections gracefully degrade on low-end devices
- No layout shift (CLS < 0.1)
- All images served as WebP/AVIF

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Three.js in main bundle despite dynamic import | High | Verify with bundle analyzer; ensure all R3F behind `ssr: false` dynamic |
| detect-gpu returns wrong tier | Medium | Allow manual override via query param for testing (?tier=0) |
| LCP poor due to font loading | Medium | Use `font-display: swap` (default in next/font), preload critical fonts |
| CLS from images without dimensions | Medium | Always set width/height on next/image |

## Next Steps

Proceed to [Phase 10 — Deployment](phase-10-deployment.md)
