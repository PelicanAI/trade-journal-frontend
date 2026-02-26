import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strategy Templates',
  description: 'Browse curated and community trading strategies for Pelican Trading AI.',
}

export default function StrategiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
