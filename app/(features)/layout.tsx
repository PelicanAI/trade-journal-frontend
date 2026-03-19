import type { Metadata } from 'next'
import FeaturesLayout from './features-layout-client'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function FeaturesServerLayout({ children }: { children: React.ReactNode }) {
  return <FeaturesLayout>{children}</FeaturesLayout>
}
