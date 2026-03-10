import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { LandingNav } from '@/components/landing/landing-nav';
import { LandingFooter } from '@/components/landing/landing-footer';

const HelpChat = dynamic(() => import('@/components/marketing/HelpChat'), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pelicantrading.ai'),
  title: 'Pelican AI | Ask the Market. Get the Receipts.',
  description:
    'Research tool for traders and investors. Real-time market analysis, trade journaling, AI coaching, and institutional-grade intelligence. Available in 30+ languages.',
  icons: {
    icon: '/pelican-logo-transparent.webp',
  },
  openGraph: {
    title: 'Pelican AI — Ask the Market. Get the Receipts.',
    description:
      'Research tool for traders and investors. Real-time analysis on 10,000+ tickers.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Pelican AI' },
    ],
    type: 'website',
    siteName: 'Pelican AI',
    url: 'https://pelicantrading.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pelican AI',
    description:
      'Ask the market. Get the receipts. Research tool for traders and investors.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-theme bg-white text-slate-900 min-h-screen antialiased scroll-smooth">
      <LandingNav />
      {children}
      <LandingFooter />
      <HelpChat />
    </div>
  );
}
