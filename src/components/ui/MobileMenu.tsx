'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onNavigate: (href: string) => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-40 flex h-full w-64 flex-col gap-2 border-l border-white/10 bg-background/95 px-6 pt-24 backdrop-blur-md md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => onNavigate(link.href)}
                className={cn(
                  'rounded-lg px-4 py-3 text-left text-lg font-medium transition-colors',
                  activeSection === link.href
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
