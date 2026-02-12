import { Bebas_Neue, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import '@/app/(marketing)/styles/marketing.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Metadata is defined in page.tsx — not duplicated here

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`marketing-page ${bebasNeue.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable}`}>
      <div className="grid-bg"></div>
      {children}
    </div>
  );
}
