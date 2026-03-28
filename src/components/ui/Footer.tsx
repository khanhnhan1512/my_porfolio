import { socialLinks } from '@/lib/constants'
import SocialIcon from './SocialIcon'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Nhan Nguyen. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted transition-colors hover:text-accent"
            >
              <SocialIcon icon={link.icon} className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
