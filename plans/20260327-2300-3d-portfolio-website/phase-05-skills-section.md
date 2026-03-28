# Phase 05 — Skills Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout), [Phase 03](phase-03-hero-section.md) (3D patterns)
- [Design Research](research/researcher-02-report.md) — skills visualization approaches

## Overview

- **Date**: 2026-03-27
- **Description**: Interactive 3D skills visualization — orbiting tech icons or spherical tag cloud using R3F, grouped by category, with hover/click interaction
- **Priority**: P1
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- 3D spherical tag cloud is the most visually striking approach for skills
- Use `@react-three/drei`'s `<Text>` or `<Html>` for skill labels in 3D space
- Group by category: Languages, Frameworks, Tools, Visualization
- Alternative: orbiting rings where each ring = category, icons orbit on ring
- Keep interactive — hover reveals details, click could filter
- Mobile: fall back to categorized grid with animated cards

## Requirements

### Functional
- 3D visualization of 15-25 skills/technologies
- Skills grouped by category (Languages, Frameworks, Tools, Viz)
- Hover interaction: highlight skill, show tooltip or details
- Category filter: toggle which groups are visible
- Auto-rotation of the 3D visualization (slow)
- Drag-to-rotate interaction on desktop

### Non-Functional
- Smooth 60fps with all skills rendered
- Text legible in 3D space
- Mobile fallback renders all skills in categorized 2D grid

## Architecture

```
sections/SkillsSection.tsx
├── SkillsCanvas.tsx         # dynamic import, ssr: false
│   └── <Canvas>
│       ├── <SkillsSphere />  # Spherical tag cloud layout
│       ├── <SkillNode />     # Individual skill in 3D (reusable)
│       └── <OrbitControls /> # Drag to rotate (no zoom)
├── SkillsFilter.tsx         # Category toggle buttons
├── SkillsFallback.tsx       # 2D categorized grid for mobile
└── SkillTooltip.tsx         # Hover detail popup
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/SkillsSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/SkillsCanvas.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/SkillsSphere.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/three/SkillNode.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/SkillsFilter.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/SkillsFallback.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/SkillTooltip.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add skills data)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify

## Implementation Steps

1. **Define skills data** in `constants.ts`:
   ```ts
   export type SkillCategory = 'Languages' | 'Frameworks' | 'Tools' | 'Visualization'
   export interface Skill {
     name: string
     category: SkillCategory
     icon?: string   // optional icon path or emoji
   }
   export const SKILLS: Skill[] = [
     { name: 'Python', category: 'Languages' },
     { name: 'R', category: 'Languages' },
     { name: 'SQL', category: 'Languages' },
     { name: 'TensorFlow', category: 'Frameworks' },
     { name: 'PyTorch', category: 'Frameworks' },
     { name: 'scikit-learn', category: 'Frameworks' },
     { name: 'Pandas', category: 'Frameworks' },
     { name: 'Docker', category: 'Tools' },
     { name: 'Git', category: 'Tools' },
     { name: 'Jupyter', category: 'Tools' },
     { name: 'Plotly', category: 'Visualization' },
     { name: 'D3.js', category: 'Visualization' },
     // ... more skills
   ]
   ```

2. **Create SkillsSection** — wrapper `<section id="skills">` with heading, filter buttons above canvas, canvas in center.

3. **Create SkillsSphere** — distribute skill nodes on a sphere surface:
   - Use Fibonacci sphere algorithm for even distribution:
     ```ts
     // For N points on unit sphere:
     const phi = Math.acos(1 - 2 * (i + 0.5) / N)
     const theta = Math.PI * (1 + Math.sqrt(5)) * i
     const x = Math.sin(phi) * Math.cos(theta) * radius
     const y = Math.sin(phi) * Math.sin(theta) * radius
     const z = Math.cos(phi) * radius
     ```
   - Auto-rotate: slow Y-axis rotation via `useFrame`
   - React to filter: animate nodes in/out with spring physics

4. **Create SkillNode** — individual skill in 3D:
   - Use `<Html>` from drei for crisp text rendering in 3D space
   - Or use `<Text>` from drei for pure 3D text (better performance)
   - Color-coded by category
   - Scale up on hover (pointer events via R3F)
   - On hover: update zustand store with hovered skill for tooltip

5. **Create SkillsFilter** — row of category toggle buttons:
   - Framer Motion layout animation for smooth button state changes
   - "All" button + one per category
   - State managed locally or via zustand

6. **Create SkillsCanvas** — dynamic import wrapper:
   - `<Canvas camera={{ position: [0, 0, 8], fov: 50 }}>`
   - `<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />`

7. **Create SkillsFallback** — 2D grid for mobile:
   - Category headings with skill badges/chips underneath
   - Framer Motion stagger reveal on scroll

8. **Create SkillTooltip** — HTML overlay showing skill details on hover (positioned via pointer coords)

9. **Add GSAP scroll-triggered entrance** — section heading and filter buttons animate in

## Todo List

- [ ] Define skills data array in constants
- [ ] Create SkillsSection wrapper with heading
- [ ] Create SkillsSphere (Fibonacci distribution on sphere)
- [ ] Create SkillNode (3D text per skill, color by category)
- [ ] Create SkillsFilter (category toggle buttons)
- [ ] Create SkillsCanvas (dynamic import, OrbitControls)
- [ ] Create SkillsFallback (2D grid for mobile)
- [ ] Add hover interaction + tooltip
- [ ] Add category filtering with animated transitions
- [ ] Add GSAP scroll entrance animation
- [ ] Test with 20+ skills for performance
- [ ] Test mobile fallback

## Success Criteria

- Skills distributed evenly on a 3D sphere, auto-rotating
- Category filter hides/shows relevant skills with animation
- Hover highlights skill and shows tooltip
- Drag-to-rotate works on desktop
- Mobile shows clean categorized 2D grid
- 60fps with all skills visible

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Text readability in 3D space | High | Use `<Html>` from drei for crisp rendering; ensure sufficient size |
| Too many skills lag the scene | Medium | Limit to 25 max; use instancing if needed |
| OrbitControls conflicts with page scroll | Medium | `enableZoom={false}`, `enablePan={false}`; stop propagation |

## Next Steps

Proceed to [Phase 06 — Projects Section](phase-06-projects-section.md)
