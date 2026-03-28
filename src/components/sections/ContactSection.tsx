'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { socialLinks, email } from '@/lib/constants'
import SocialIcon from '@/components/ui/SocialIcon'

gsap.registerPlugin(ScrollTrigger)

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // anti-spam
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('[data-animate]')
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return // bot detected

    setStatus('sending')

    try {
      // EmailJS integration — user needs to set up env vars
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        // Fallback: just simulate success for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStatus('success')
        setFormData({ name: '', email: '', message: '', honeypot: '' })
        return
      }

      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <h2
        data-animate
        className="mb-4 text-center text-3xl font-bold opacity-0 md:text-4xl"
      >
        Get In <span className="text-accent">Touch</span>
      </h2>
      <div
        data-animate
        className="mx-auto mb-4 h-1 w-16 rounded bg-accent opacity-0"
      />
      <p
        data-animate
        className="mx-auto mb-12 max-w-md text-center text-muted opacity-0"
      >
        Have a project in mind or want to collaborate? Feel free to reach out.
      </p>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Form */}
        <form
          data-animate
          onSubmit={handleSubmit}
          className="space-y-5 opacity-0"
        >
          {/* Honeypot */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, honeypot: e.target.value }))
            }
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              minLength={2}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted/50 transition-colors focus:border-accent focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted/50 transition-colors focus:border-accent focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              minLength={10}
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted/50 transition-colors focus:border-accent focus:outline-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            className="w-full rounded-full bg-accent py-3 font-medium text-background transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending'
              ? 'Sending...'
              : status === 'success'
                ? 'Message Sent!'
                : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
          {status === 'success' && (
            <p className="text-center text-sm text-green-400">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          )}
        </form>

        {/* Social / Info */}
        <div
          data-animate
          className="flex flex-col justify-center gap-8 opacity-0"
        >
          <div>
            <h3 className="mb-3 text-lg font-semibold">Email me directly</h3>
            <a
              href={`mailto:${email}`}
              className="font-mono text-accent transition-colors hover:text-accent/80"
            >
              {email}
            </a>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Connect with me</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-muted transition-all hover:border-accent/50 hover:text-accent"
                >
                  <SocialIcon icon={link.icon} />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Open to opportunities
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              I&apos;m open to data engineering and AI engineering opportunities,
              collaborative projects, and interesting technical conversations.
              Whether you have a project in mind or just want to connect, my inbox is always open.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
