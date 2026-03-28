# Phase 10 — Deployment

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 09](phase-09-performance-and-responsive.md) (optimization must be complete)
- [Design Research](research/researcher-02-report.md) — Vercel deployment, GitHub setup

## Overview

- **Date**: 2026-03-27
- **Description**: GitHub repo setup, README, Vercel project creation, environment variables, optional custom domain, analytics, final QA
- **Priority**: P0
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- Vercel auto-detects Next.js — zero config deployment
- Git integration: every push to main triggers production deploy
- Preview deployments per PR (great for testing)
- Environment variables set in Vercel dashboard (not committed)
- `@vercel/analytics` and `@vercel/speed-insights` for monitoring
- Keep 3D assets in `/public` — served via Vercel CDN automatically

## Requirements

### Functional
- GitHub repository created and code pushed
- Vercel project connected to GitHub repo
- Environment variables configured (EmailJS keys)
- Successful production build and deployment
- README with project overview, screenshot, tech stack, local setup
- Analytics tracking enabled

### Non-Functional
- Auto-deploy on push to main
- Preview deploys on pull requests
- SSL certificate active
- Page loads successfully on production URL

## Architecture

### Deployment Flow
```
Local dev → git push → GitHub → Vercel (auto-detect) → Build → Deploy → CDN
```

### Environment Variables (Vercel Dashboard)
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID    → Production + Preview
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID   → Production + Preview
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY    → Production + Preview
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/README.md` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/.gitignore` — verify
- `e:/My Document/My_Pet_Projects/my_porfolio/.env.local` — verify (not committed)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/layout.tsx` — modify (add analytics)
- `e:/My Document/My_Pet_Projects/my_porfolio/package.json` — modify (add type-check script)

## Implementation Steps

1. **Verify .gitignore** covers:
   ```
   node_modules/
   .next/
   .env*.local
   .vercel/
   *.tsbuildinfo
   .DS_Store
   Thumbs.db
   ```

2. **Create README.md**:
   - Project title + one-line description
   - Screenshot or GIF of the portfolio
   - Tech stack badges
   - Quick start: `git clone`, `npm install`, `cp .env.example .env.local`, `npm run dev`
   - Create `.env.example` with placeholder values
   - Brief folder structure
   - Deployment note: "Deployed on Vercel"
   - License: MIT

3. **Add convenience scripts** to `package.json`:
   ```json
   "scripts": {
     "dev": "next dev --turbopack",
     "build": "next build",
     "start": "next start",
     "lint": "next lint",
     "type-check": "tsc --noEmit",
     "analyze": "ANALYZE=true next build"
   }
   ```

4. **Create GitHub repository**:
   ```bash
   git init
   git add -A
   git commit -m "Initial commit: 3D portfolio website"
   gh repo create my-portfolio --public --source=. --push
   ```

5. **Connect Vercel**:
   - Go to vercel.com/new
   - Import GitHub repo
   - Framework: Next.js (auto-detected)
   - Build settings: defaults are fine
   - Add environment variables from `.env.local`
   - Deploy

6. **Install analytics**:
   ```bash
   npm install @vercel/analytics @vercel/speed-insights
   ```
   Add to `layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/next'
   // Inside <body>: <Analytics /> <SpeedInsights />
   ```

7. **Optional: custom domain**:
   - Add domain in Vercel Dashboard > Settings > Domains
   - DNS: CNAME `cname.vercel-dns.com` (subdomain) or A `76.76.21.21` (apex)
   - SSL auto-provisioned

8. **Final QA checklist**:
   - [ ] Production URL loads without errors
   - [ ] All sections render correctly
   - [ ] 3D scenes load (desktop) and fallbacks show (mobile)
   - [ ] Smooth scroll works between sections
   - [ ] Contact form sends email successfully
   - [ ] All links work (social, project GitHub/live)
   - [ ] Responsive at all breakpoints
   - [ ] Meta tags / OG image display in link previews
   - [ ] No console errors
   - [ ] Lighthouse scores meet targets

9. **Set up optional CI** (GitHub Actions):
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

## Todo List

- [ ] Verify .gitignore is comprehensive
- [ ] Create README.md with screenshot + setup instructions
- [ ] Create .env.example with placeholder values
- [ ] Add type-check and analyze scripts to package.json
- [ ] Initialize Git repo and push to GitHub
- [ ] Create Vercel project and connect to GitHub
- [ ] Configure environment variables in Vercel dashboard
- [ ] Deploy and verify production build succeeds
- [ ] Install and configure @vercel/analytics + @vercel/speed-insights
- [ ] Run final QA checklist on production URL
- [ ] Optional: configure custom domain
- [ ] Optional: set up GitHub Actions CI

## Success Criteria

- Site deployed and accessible at Vercel URL
- Auto-deploys on push to main branch
- All sections functional on production
- Contact form works in production
- Analytics collecting data
- README enables another developer to set up locally

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Build fails on Vercel (works locally) | Medium | Run `npm run build` locally first; check Node version matches |
| Environment variables missing on Vercel | Medium | Verify in Vercel dashboard; test contact form on preview deploy first |
| Large 3D assets exceed Vercel limits | Low | Keep total /public < 50MB; compress all assets |
| OG image not showing in link previews | Low | Test with opengraph.xyz; ensure absolute URL for og:image |

## Security Considerations

- Never commit `.env.local` (verify in .gitignore)
- EmailJS public key is safe to expose (domain-restricted)
- If using Resend: API key must be server-only env var (no NEXT_PUBLIC_ prefix)
- Enable Vercel's DDoS protection (on by default)
- Review GitHub repo visibility — public is fine for portfolio

## Next Steps

After deployment:
- Share portfolio URL on LinkedIn, GitHub profile, resume
- Monitor Vercel Analytics for performance regressions
- Iterate on content and projects as they evolve
- Consider adding a blog section in the future (Next.js MDX)
