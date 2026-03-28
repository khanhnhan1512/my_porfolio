'use client'

import { useDeviceDetect } from '@/hooks/useDeviceDetect'
import HeroContent from './HeroContent'
import HeroFallback from './HeroFallback'

export default function HeroSection() {
  const { isMobile } = useDeviceDetect()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Mobile-only CSS fallback (global 3D canvas handles desktop) */}
      {isMobile && <HeroFallback />}
      <HeroContent />
    </section>
  )
}
