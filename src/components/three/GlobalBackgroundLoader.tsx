'use client'

import dynamic from 'next/dynamic'
import { useDeviceDetect } from '@/hooks/useDeviceDetect'

const GlobalBackground = dynamic(() => import('./GlobalBackground'), {
  ssr: false,
})

export default function GlobalBackgroundLoader() {
  const { isMobile } = useDeviceDetect()
  if (isMobile) return null
  return <GlobalBackground />
}
