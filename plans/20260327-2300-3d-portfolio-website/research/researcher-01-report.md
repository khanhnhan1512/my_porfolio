# 3D Portfolio Website - Tech Stack Research

## 1. 3D Web Frameworks Comparison

| Criteria | Three.js | React Three Fiber (R3F) | Babylon.js |
|---|---|---|---|
| **Ease of use** | Imperative API, steeper curve | Declarative JSX, React-native feel | Full-featured but heavier API |
| **React integration** | Manual (refs, useEffect) | Native - IS the React renderer | Possible but not idiomatic |
| **Community** | Massive (95k+ GitHub stars) | Large & growing (27k+ stars), drei ecosystem | Smaller community, Microsoft-backed |
| **Bundle size** | ~150KB min+gz | Thin wrapper over Three.js | ~400KB+ min+gz |
| **Perf** | Direct WebGL, full control | Minimal overhead over Three.js | Excellent but overkill for portfolio |
| **Vercel compat** | Perfect (client-side) | Perfect (works with Next.js SSR) | Works but SSR quirks |

**Verdict**: R3F wins for a React-based portfolio. It IS Three.js under the hood, but with React's component model, hooks, and ecosystem. Babylon.js is better suited for game-like apps.

## 2. Recommended Tech Stack

### Frontend Framework: Next.js (App Router)

- **Why Next.js over Vite+React**: SSR/SSG for SEO (portfolio needs discoverability), image optimization via `next/image`, native Vercel deployment, file-based routing
- **Why not Astro**: Astro excels at content sites but R3F needs heavy client interactivity; Astro's island architecture adds friction for full-page 3D scenes
- **Version**: Next.js 15+ (App Router, React 19, Turbopack)

### 3D Library: React Three Fiber + drei + postprocessing

- **R3F**: Declarative Three.js scenes as React components
- **drei**: 100+ ready-made helpers (OrbitControls, Text3D, Float, Sparkles, Environment, useGLTF, etc.) - massive time saver
- **@react-three/postprocessing**: Bloom, depth-of-field, vignette effects with minimal setup

### Animation

| Library | Use Case |
|---|---|
| **GSAP** (gsap) | Timeline-based scroll animations, text reveals, morphing; gold standard for web animation |
| **Framer Motion** (motion) | React-native enter/exit/layout animations for UI elements |
| **Lenis** (@studio-freight/lenis) | Smooth scroll with lerp; pairs perfectly with GSAP ScrollTrigger |
| **@react-spring/three** | Physics-based animations inside R3F canvas |

- Use GSAP for scroll-driven 3D camera movement + section transitions
- Use Framer Motion for UI overlays, modals, nav
- Lenis for smooth-scroll foundation

### Styling: Tailwind CSS v4

- **Why Tailwind**: Fastest iteration, great with Next.js, tiny production bundles via purge, responsive utilities
- **Why not CSS Modules**: Fine but slower to iterate; no design-system consistency out of the box
- **Why not styled-components**: Runtime CSS-in-JS has perf cost; falling out of favor with RSC

### Deployment: Vercel

- Next.js on Vercel = zero-config deployment
- Edge functions for any API routes
- Automatic image optimization
- Preview deployments per PR
- **Key config**: Set `output: 'standalone'` only if needed; default works fine
- **Caveat**: 3D assets (GLB/GLTF models) go in `/public` - Vercel serves them via CDN automatically
- Consider Vercel Analytics for Core Web Vitals monitoring

## 3. Key Dependencies

### Core

```
next                        # Framework (SSR, routing, optimization)
react, react-dom            # UI library
typescript                  # Type safety
```

### 3D & Animation

```
three                       # 3D engine (peer dep of R3F)
@react-three/fiber          # React renderer for Three.js
@react-three/drei           # Helpers: OrbitControls, Text3D, useGLTF, Environment, Float...
@react-three/postprocessing # Visual effects: bloom, DOF, vignette
gsap                        # Scroll + timeline animations (free for personal use)
@gsap/react                 # useGSAP hook for React cleanup
lenis                       # Smooth scroll (renamed from @studio-freight/lenis)
framer-motion               # UI enter/exit animations
```

### Styling & UI

```
tailwindcss                 # Utility-first CSS
@tailwindcss/postcss        # Tailwind v4 PostCSS plugin
clsx                        # Conditional class joining
```

### Dev Tools

```
@types/three                # Three.js type definitions
eslint, eslint-config-next  # Linting
prettier, prettier-plugin-tailwindcss  # Formatting
```

### Optional but Recommended

```
@react-three/rapier         # Physics (if interactive elements needed)
zustand                     # Lightweight state management for 3D scene state
sharp                       # Next.js image optimization (auto-installed)
```

## 4. Performance Considerations

### Model Optimization (Critical)

- **GLTF/GLB only** - most efficient web 3D format; avoid FBX/OBJ
- Compress with `gltf-transform` or Draco compression: 60-90% size reduction
- Target <2MB total for all 3D assets on landing
- Use `meshopt` compression for best decode speed
- Reduce polygon count in Blender before export (decimate modifier)

### Loading Strategy

- **`React.lazy` + `Suspense`** for all 3D components - keep initial JS bundle small
- `useGLTF.preload('/model.glb')` in drei to start loading models early
- Show skeleton/2D fallback while 3D loads (progressive enhancement)
- `next/dynamic` with `ssr: false` for R3F Canvas - avoids SSR errors and reduces server payload

### Runtime Performance

- **Use `frameloop="demand"`** on R3F Canvas when scene is static - stops render loop, saves battery
- **Instanced meshes** for repeated geometry (particles, grids)
- Dispose textures/geometries on unmount via drei's automatic disposal
- Limit post-processing effects on mobile (detect via `navigator.hardwareConcurrency`)
- Use `THREE.LOD` or manual LOD switching for complex models at distance

### Mobile Strategy

- Detect GPU tier with `detect-gpu` package (free, 1KB)
- **Tier 0-1 (low-end)**: Skip 3D entirely, show static images/CSS animations
- **Tier 2 (mid)**: Simplified scene, no post-processing, lower resolution
- **Tier 3 (high)**: Full experience
- Set `dpr={[1, 1.5]}` on Canvas to cap pixel ratio (retina kills GPU)
- Touch-friendly interactions; no hover-dependent 3D interactions on mobile

### Vercel-Specific

- Enable `next/image` for all 2D assets (auto WebP/AVIF)
- Set `Cache-Control` headers for GLB files in `next.config.js`: `immutable, max-age=31536000`
- Use Vercel Speed Insights to monitor real-user 3D performance
- Keep serverless function bundle <50MB (3D assets in `/public`, not imported in server code)

### Lighthouse Targets

- Aim for 90+ on desktop, 70+ on mobile (3D sites inherently heavier)
- `@next/bundle-analyzer` to audit JS size
- Total page weight target: <3MB first load including 3D assets

---

**Bottom line**: Next.js 15 + R3F + drei + GSAP + Tailwind on Vercel. This stack has the best DX, ecosystem support, and deployment story for a visually impressive 3D portfolio. Start with a simple scene, optimize aggressively, and progressively enhance for capable devices.
