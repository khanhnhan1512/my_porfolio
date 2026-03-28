# 3D Portfolio Website

An interactive 3D portfolio website built for a data science student, featuring particle animations, floating geometry, and scroll-driven interactions.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **3D**: React Three Fiber + drei
- **Animation**: GSAP + Lenis + Framer Motion
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

## Features

- Interactive 3D particle field hero section
- 3D spherical skills tag cloud with category filtering
- Project cards with CSS 3D tilt effect
- Scroll-triggered timeline for experience/education
- Contact form with EmailJS integration
- GPU-tier aware rendering (fallbacks for mobile/low-end)
- Smooth scroll with Lenis + GSAP ScrollTrigger
- SEO optimized with Open Graph meta tags
- Vercel Analytics + Speed Insights

## Getting Started

```bash
git clone https://github.com/khanhnhan1512/my-portfolio.git
cd my-portfolio
npm install
cp .env.example .env.local
# Edit .env.local with your EmailJS credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file based on `.env.example`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## Project Structure

```
src/
  app/            # Next.js app router pages
  components/
    sections/     # Page sections (Hero, About, Skills, etc.)
    three/        # React Three Fiber 3D components
    ui/           # Reusable UI components
    providers/    # Context providers (Lenis, etc.)
  hooks/          # Custom React hooks
  lib/            # Utilities and constants
  types/          # TypeScript definitions
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` triggers auto-deploy.

## License

MIT
