import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'exdreamcolors - Free Online Color Tools for Developers',
    template: '%s | exdreamcolors'
  },
  description: 'Free online color tools for developers and designers. Color picker, palette generator, gradient maker, contrast checker, and more. No registration required.',
  keywords: ['color picker', 'color palette generator', 'gradient generator', 'contrast checker', 'tailwind colors', 'css colors', 'web colors'],
  authors: [{ name: 'exdreamcolors' }],
  creator: 'exdreamcolors',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arescolors.com',
    siteName: 'exdreamcolors',
    title: 'exdreamcolors - Free Online Color Tools',
    description: 'Free color tools for developers and designers. Color picker, palette generator, gradient maker, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'exdreamcolors - Free Online Color Tools',
    description: 'Free color tools for developers and designers.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
