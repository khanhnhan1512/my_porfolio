import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import LenisProvider from '@/components/providers/LenisProvider'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Nhan Nguyen | Data & AI Engineer',
  description:
    'Portfolio of Nhan Nguyen — Data Engineer & AI Engineer building scalable data pipelines and intelligent AI systems.',
  keywords: [
    'data engineering',
    'AI engineer',
    'machine learning',
    'portfolio',
    'python',
    'data pipelines',
    'LLM',
  ],
  authors: [{ name: 'Nhan Nguyen' }],
  openGraph: {
    title: 'Nhan Nguyen | Data & AI Engineer',
    description:
      'Building scalable data pipelines and intelligent AI systems. Portfolio of Nhan Nguyen.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhan Nguyen | Data & AI Engineer',
    description:
      'Building scalable data pipelines and intelligent AI systems. Portfolio of Nhan Nguyen.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-foreground">
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
