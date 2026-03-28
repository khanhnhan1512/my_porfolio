# Research Report: 3D Portfolio Website for Data Science Student

## 1. Portfolio Sections & Content

### Hero Section
- **Recommended 3D elements**: particle field (data-point aesthetic), animated globe (shows global data reach), floating geometric polyhedra, neural-network node graph
- Particle systems work best -- lightweight, performant, and thematically fitting for data science (evoke scatter plots / embeddings)
- Avoid heavy GLTF models in hero; prefer procedural geometry for fast LCP
- Include name, title ("Data Scientist"), one-liner tagline, CTA button

### About Section
- Short bio (3-4 sentences), photo or 3D avatar
- Subtle parallax or floating 3D shapes as background accents
- Mention domain focus: ML, NLP, CV, analytics, etc.

### Skills / Tech Stack
- **3D approach**: interactive 3D tag cloud (spherical word cloud), orbiting skill icons, or animated bar chart in 3D space
- Group: Languages (Python, R, SQL), Frameworks (TensorFlow, PyTorch, scikit-learn), Tools (Jupyter, Docker, Git), Viz (Plotly, D3, Tableau)
- Hover/click reveals proficiency or project count

### Projects Showcase
- Card grid or carousel; each card has thumbnail, title, tech tags, short description
- Project types to feature: ML model (with metrics), interactive dashboard, data viz, Kaggle competition, research notebook
- Optional: embed live Plotly/D3 charts or link to Streamlit demos
- 3D accent: tilt-on-hover cards (react-tilt), or 3D carousel rotation

### Experience / Education Timeline
- Vertical or horizontal timeline with scroll-triggered reveal
- 3D: camera dolly along timeline axis on scroll, or floating date markers in 3D space
- Include internships, courses, certifications, publications

### Contact Section
- Simple form (name, email, message) + social links (GitHub, LinkedIn, Kaggle)
- 3D accent: animated envelope model, or particle transition effect
- Use EmailJS or Resend for serverless form submission

### What Makes Sections Engaging with 3D
- Scroll-triggered transitions between sections (camera moves through 3D space)
- Consistent 3D theme thread (e.g., particles morph from globe -> network -> chart)
- Interactivity: mouse-follow parallax, click-to-explore, drag-to-rotate

---

## 2. 3D Design Patterns

### Scroll-Driven Animations
- **GSAP ScrollTrigger + Three.js**: industry standard combo; pin scenes, animate camera on scroll progress
- **React Three Fiber + ScrollControls** (from @react-three/drei): declarative scroll-linked 3D in React/Next.js
- Pattern: divide page into scroll "pages"; each page triggers camera position/rotation change
- Keep total polycount < 100k for smooth scroll on mid-range devices

### Interactive 3D Backgrounds
- **Particle fields**: use Three.js Points / InstancedMesh; 5k-20k particles performant
- **Floating geometry**: low-poly icosahedrons, torus knots drifting slowly; react to mouse position
- **Vanta.js**: quick drop-in animated 3D backgrounds (net, globe, birds) -- good for MVP
- **TSParticles (tsparticles.js)**: 2D/2.5D particle backgrounds, lighter than full Three.js

### 3D Model Showcases
- Use `@react-three/drei`'s `<Stage>`, `<Environment>`, `<ContactShadows>` for polished presentation
- Lazy-load models with `useGLTF` + Suspense; show placeholder while loading
- Draco compression: reduces GLTF size 80-90%

### Free 3D Asset Sources
| Source | Format | Notes |
|--------|--------|-------|
| Sketchfab (CC) | GLTF/GLB | Largest library, filter by free+downloadable |
| poly.pizza | GLTF | Low-poly, fast, no signup |
| Kenney.nl | GLTF | Game-style assets, CC0 |
| Quaternius | GLTF | Free packs, CC0 |
| three.js examples | built-in | Procedural geometry, no download needed |
| Mixamo | FBX | Free animated characters (Adobe account) |
| Hugging Face 3D | GLTF | AI-generated 3D models |

### Color Schemes & Typography
- **Dark themes** work best with 3D (less visual clash, glowing accents pop)
- Palette: deep navy/charcoal base + 1-2 accent colors (electric blue, cyan, magenta)
- Data-science feel: `#0f172a` bg, `#38bdf8` accent, `#f1f5f9` text
- **Fonts**: monospace for code feel (JetBrains Mono, Fira Code); geometric sans for headings (Inter, Space Grotesk, Outfit)
- Ensure text contrast ratio >= 4.5:1 over 3D backgrounds (use semi-transparent overlay if needed)

---

## 3. Vercel Deployment Best Practices

### Next.js Optimization
- Use App Router (app/); leverage Server Components by default
- `next/image` for all images (auto WebP/AVIF, lazy load)
- Dynamic import 3D components: `dynamic(() => import('./Scene'), { ssr: false })` -- critical for Three.js
- Enable `output: 'standalone'` only if needed; default Vercel adapter is fine
- Set `reactStrictMode: true` in next.config

### Build Settings
- Framework preset: Next.js (auto-detected)
- Build command: `next build` (default)
- Output dir: `.next` (default)
- Node version: 20.x (set in Settings > General)
- Install command: `npm ci` (faster than `npm install`)

### Environment Variables
- Add via Vercel Dashboard > Settings > Environment Variables
- Prefix public vars with `NEXT_PUBLIC_`
- Keep secrets (API keys, email service tokens) server-only (no prefix)
- Use `.env.local` locally; never commit it

### Custom Domain
- Add domain in Vercel Dashboard > Settings > Domains
- Point DNS: CNAME `cname.vercel-dns.com` for subdomains, A record `76.76.21.21` for apex
- SSL auto-provisioned (Let's Encrypt)
- Enable "Redirect www to non-www" or vice versa

### Analytics & Performance
- Enable Vercel Analytics (free tier: 2.5k events/month) for Web Vitals
- Enable Speed Insights for per-page LCP/FID/CLS tracking
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Use `@vercel/analytics` and `@vercel/speed-insights` packages
- Monitor 3D pages especially -- they tend to have high TTI

---

## 4. GitHub Repository Setup

### .gitignore (Next.js + 3D)
```
node_modules/
.next/
out/
.env*.local
*.tsbuildinfo
next-env.d.ts
.vercel/
# 3D assets (large files -- use Git LFS or CDN instead)
*.glb
*.gltf
*.fbx
*.hdr
# OS
.DS_Store
Thumbs.db
```
- For large 3D assets: either use Git LFS (`git lfs track "*.glb"`) or host on CDN/public bucket
- Alternative: keep optimized/compressed models in `public/models/` and track them (if < 5MB each)

### README Structure
- Project title + live demo link + screenshot/gif
- Tech stack badges (Next.js, Three.js, TailwindCSS, Vercel)
- Quick start: `git clone`, `npm install`, `npm run dev`
- Project structure overview (brief)
- Deployment instructions
- License (MIT)

### GitHub Actions
- **Not strictly needed** if deploying via Vercel Git integration (auto-deploys on push)
- Optional: lint/type-check CI on PRs
```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
```

---

## 5. Responsive Design with 3D

### Mobile Strategy
- **Detect device**: use `navigator.hardwareConcurrency`, `navigator.deviceMemory`, or viewport width
- **Tiered rendering**:
  - Desktop (>1024px): full 3D scene, high particle count, post-processing
  - Tablet (768-1024px): reduced particles (50%), no post-processing
  - Mobile (<768px): minimal 3D or 2D fallback (CSS animations, static images, Lottie)

### Performance Techniques
- `useDetectGPU()` from `@react-three/drei` -- returns GPU tier; conditionally render
- Set `pixelRatio` to `Math.min(window.devicePixelRatio, 2)` -- prevents 3x rendering on high-DPI phones
- Use `frameloop="demand"` on R3F Canvas when not animating (stops render loop)
- Reduce geometry segments, disable shadows, lower texture resolution on mobile

### Touch Interactions
- Replace hover effects with tap (no hover on touch devices)
- Use `OrbitControls` with `enableZoom={false}` to prevent conflict with page scroll
- Swipe gestures for carousels instead of drag-rotate
- Increase touch targets to minimum 44x44px

### Fallback Pattern
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
return isMobile ? <StaticHero /> : <ThreeCanvas><Scene3D /></ThreeCanvas>
```
- Serve a high-quality static image or CSS gradient + Lottie animation as mobile fallback
- This alone can save 200-500KB bundle + significant GPU usage on mobile
