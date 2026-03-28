'use client'

import { useRef, useCallback } from 'react'

export function useTiltEffect(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      ref.current.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`
    },
    [maxTilt]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    ref.current.style.transition = 'transform 0.5s ease'
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 500)
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}
