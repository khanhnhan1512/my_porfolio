# Phase 08 — Contact Section

## Context Links

- [Main Plan](plan.md)
- Dependencies: [Phase 02](phase-02-layout-and-navigation.md) (layout)
- [Design Research](research/researcher-02-report.md) — contact form approaches

## Overview

- **Date**: 2026-03-27
- **Description**: Contact form with EmailJS integration, social links (GitHub, LinkedIn, Kaggle), form validation, success/error states, subtle 3D accent
- **Priority**: P1
- **Implementation Status**: Not started
- **Review Status**: Not reviewed

## Key Insights

- EmailJS allows sending emails from client-side without a backend (free tier: 200 emails/month)
- Alternative: Resend via Next.js API route (server-side, more secure)
- Form validation: use native HTML5 validation + light JS validation (no heavy form library needed)
- 3D accent: subtle particle effect or animated gradient, not a full scene
- Social links are critical for a portfolio — GitHub, LinkedIn, Kaggle minimum

## Requirements

### Functional
- Contact form: name, email, message fields
- Client-side validation (required fields, email format)
- Submit sends email via EmailJS (or Resend API route)
- Success state: thank-you message with animation
- Error state: error message with retry option
- Loading state: spinner/disabled button during submission
- Social links: GitHub, LinkedIn, Kaggle (with icons)
- GSAP scroll reveal animation

### Non-Functional
- Form accessible (labels, aria attributes, focus management)
- Rate limiting on submit (prevent spam double-clicks)
- No secrets exposed in client code (if using Resend, use API route)

## Architecture

```
sections/ContactSection.tsx
├── ContactForm.tsx       # Form with validation + submission
├── SocialLinks.tsx       # Icon links row
└── ContactBackground.tsx # Optional subtle 3D accent (dynamic import)
```

### EmailJS Flow
```
User submits form → EmailJS SDK → EmailJS service → Email to inbox
```

### Alternative Resend Flow
```
User submits form → fetch('/api/send') → Resend API → Email to inbox
```

## Related Code Files

- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ContactSection.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/sections/ContactForm.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/components/ui/SocialLinks.tsx` — create
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/api/send/route.ts` — create (if using Resend)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/lib/constants.ts` — modify (add social links)
- `e:/My Document/My_Pet_Projects/my_porfolio/src/app/page.tsx` — modify
- `e:/My Document/My_Pet_Projects/my_porfolio/.env.local` — create (API keys, never commit)

## Implementation Steps

1. **Set up EmailJS** (recommended for simplicity):
   - Create account at emailjs.com
   - Set up email service (Gmail/Outlook)
   - Create email template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Get: Service ID, Template ID, Public Key
   - Install: `npm install @emailjs/browser`
   - Store keys as `NEXT_PUBLIC_EMAILJS_*` env vars

2. **Create ContactForm** (`'use client'`):
   ```tsx
   // State: { name, email, message, status: 'idle' | 'sending' | 'success' | 'error' }
   // Validate before submit:
   //   - name: required, min 2 chars
   //   - email: required, regex validation
   //   - message: required, min 10 chars
   // On submit: emailjs.send(serviceId, templateId, templateParams, publicKey)
   // Disable button during send, show spinner
   // On success: show thank-you, reset form after 3s
   // On error: show error message with retry
   ```

3. **Create form UI**:
   - Glassmorphism card container
   - Floating labels or placeholder labels
   - Input styling: `bg-white/5 border-white/10 focus:border-accent`
   - Submit button: accent bg, hover scale effect
   - Success state: checkmark icon + "Message sent!" with Framer Motion enter
   - Error state: red warning + "Something went wrong. Try again."

4. **Create SocialLinks**:
   - Row of icon buttons: GitHub, LinkedIn, Kaggle
   - Use inline SVG icons or a lightweight icon library
   - Hover: scale + accent color transition
   - Open in new tab with `target="_blank" rel="noopener noreferrer"`

5. **Define social data** in `constants.ts`:
   ```ts
   export const SOCIAL_LINKS = [
     { name: 'GitHub', url: 'https://github.com/username', icon: 'github' },
     { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'linkedin' },
     { name: 'Kaggle', url: 'https://kaggle.com/username', icon: 'kaggle' },
   ]
   ```

6. **Create ContactSection** — wrapper `<section id="contact">`:
   - Heading: "Get In Touch"
   - Two-column: form left, social links + info right (stacked on mobile)
   - Optional: brief CTA text ("Have a project in mind? Let's talk.")

7. **Add environment variables** to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

8. **Add scroll reveal** — GSAP fade-up for the form and social links

9. **Add rate limiting** — disable submit button for 30s after successful send to prevent spam

## Todo List

- [ ] Set up EmailJS account + template
- [ ] Install @emailjs/browser
- [ ] Create ContactForm with validation + states
- [ ] Create SocialLinks component
- [ ] Create ContactSection wrapper
- [ ] Add environment variables to .env.local
- [ ] Add GSAP scroll reveal
- [ ] Add rate limiting on submit
- [ ] Test form submission (success + error paths)
- [ ] Test responsive layout
- [ ] Test accessibility (keyboard nav, screen reader)

## Success Criteria

- Form validates inputs before submission
- Email sends successfully via EmailJS
- Success/error states display appropriately
- Social links open in new tabs
- Form is keyboard-navigable and accessible
- Section animates in on scroll

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| EmailJS free tier limit (200/mo) hit | Low | Sufficient for portfolio; upgrade or switch to Resend if needed |
| NEXT_PUBLIC_ env vars expose keys | Low | EmailJS public key is designed to be client-exposed; rate limit on EmailJS dashboard |
| Spam submissions | Medium | Add honeypot field (hidden input); enable EmailJS captcha if needed |

## Security Considerations

- EmailJS public key is safe to expose (domain-restricted on EmailJS dashboard)
- If using Resend: keep API key server-only (no NEXT_PUBLIC_ prefix), use API route
- Add honeypot field to catch bots: hidden input that should remain empty
- Sanitize message content before display in email template
- Never log or store submitted email addresses client-side

## Next Steps

Proceed to [Phase 09 — Performance & Responsive](phase-09-performance-and-responsive.md)
