# Phase 01 — Project Setup

## Context Links

- [Main Plan](plan.md)
- Dependencies: None (first phase)
- [Tech Stack Research](research/researcher-01-report.md)

## Overview

- **Date**: 2026-03-27
- **Description**: Initialize Next.js 15 project, install all dependencies, configure TypeScript, Tailwind v4, ESLint, Prettier, Git repo, folder structure
- **Priority**: P0
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Next.js 15 uses App Router by default with React 19
- Tailwind v4 uses `@tailwindcss/postcss` plugin (no tailwind.config.js needed, uses CSS-based config)
- R3F components must never render on server — always use `next/dynamic` with `ssr: false`
- Keep 3D assets in `/public/models/` for Vercel CDN serving

## Requirements

### Functional
- Working Next.js dev server with hot reload
- TypeScript strict mode enabled
- Tailwind CSS processing utility classes
- ESLint + Prettier formatting on save
- Git repo initialized with proper .gitignore

### Non-Functional
- `npm run dev` starts without errors
- `npm run build` completes successfully
- Clean folder structure matching conventions

## Architecture

```
my_porfolio/
├── public/
│   ├── models/          # 3D assets (GLB/GLTF)
│   ├── images/          # Static images
│   └── fonts/           # Self-hosted fonts (if needed)
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page (single-page portfolio)
│   │   └── globals.css  # Tailwind imports + CSS variables
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── sections/    # Page sections (Hero, About, etc.)
│   │   └── three/       # R3F 3D components
│   ├── lib/
│   │   ├── utils.ts     # Utility functions (cn helper, etc.)
│   │   └── constants.ts # Site data, theme constants
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript type definitions
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/package.json`
- `e:/My Document/My_Pet_Projects/my_porfolio/next.config.ts`
- `e:/My Document/My_Pet_Projects/my_porfolio/tsconfig.json`
- `e:/My Document/My_Pet_Projects/my_porfolio/postcss.config.mjs`
- `e:/My Document/My_Pet_Projects/my_porfolio/.eslintrc.json`
- `e:/My Document/My_Pet_Projects/my_porfolio/.prettierrc`
- `e:/My Document/My_Pet_Projects/my_porfolio/.gitignore`
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/layout.tsx`
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx`
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/globals.css`
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/utils.ts`
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts`

## Implementation Steps

1. **Create Next.js project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. **Install 3D dependencies**
   ```bash
   npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
   npm install -D @types/three
   ```

3. **Install animation dependencies**
   ```bash
   npm install gsap @gsap/react lenis framer-motion
   ```

4. **Install utility dependencies**
   ```bash
   npm install clsx zustand
   ```

5. **Install dev tools**
   ```bash
   npm install -D prettier prettier-plugin-tailwindcss
   ```

6. **Configure Prettier** — create `.prettierrc`:
   ```json
   {
     "semi": false,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "plugins": ["prettier-plugin-tailwindcss"]
   }
   ```

7. **Configure next.config.ts** — enable React strict mode, set transpile packages if needed

8. **Set up CSS variables** in `globals.css`:
   ```css
   @import "tailwindcss";

   @theme {
     --color-background: #0f172a;
     --color-foreground: #f1f5f9;
     --color-accent: #38bdf8;
     --color-accent-secondary: #a78bfa;
   }
   ```

9. **Create utility helper** `src/lib/utils.ts`:
   ```ts
   import { clsx, type ClassValue } from 'clsx'
   export function cn(...inputs: ClassValue[]) { return clsx(inputs) }
   ```

10. **Create folder structure** — `components/ui/`, `components/sections/`, `components/three/`, `hooks/`, `types/`, `public/models/`, `public/images/`

11. **Set up .gitignore** (see research report for full list)

12. **Initialize Git repo**
    ```bash
    git init && git add -A && git commit -m "Initial project setup"
    ```

13. **Verify**: run `npm run dev`, confirm page loads at localhost:3000

## Todo List

- [ ] Create Next.js 15 project with create-next-app
- [ ] Install 3D deps (three, R3F, drei, postprocessing)
- [ ] Install animation deps (gsap, @gsap/react, lenis, framer-motion)
- [ ] Install utilities (clsx, zustand)
- [ ] Install dev tools (prettier, prettier-plugin-tailwindcss)
- [ ] Configure Prettier
- [ ] Set up Tailwind CSS variables in globals.css
- [ ] Create cn() utility helper
- [ ] Create folder structure
- [ ] Configure .gitignore
- [ ] Init Git repo + initial commit
- [ ] Verify dev server runs cleanly

## Success Criteria

- `npm run dev` starts without errors
- `npm run build` completes without errors
- All dependencies in package.json
- Folder structure matches architecture diagram
- Git repo initialized with clean first commit

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Dep version conflicts (React 19 + R3F) | High | Pin versions; check R3F React 19 support before install |
| Tailwind v4 breaking changes | Medium | Follow v4 migration guide; use `@tailwindcss/postcss` |
| create-next-app prompts blocking automation | Low | Use flags to skip prompts |

## Next Steps

Proceed to [Phase 02 — Layout & Navigation](phase-02-layout-and-navigation.md)
