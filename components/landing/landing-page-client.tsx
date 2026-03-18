'use client'

import dynamic from 'next/dynamic'
import { InfiniteGridBg } from '@/components/ui/infinite-grid-bg'
import { HeroSection } from './hero-section'
import { SocialProofBar } from './social-proof-bar'
import { ProblemSection } from './problem-section'
import { PlatformShowcase } from './platform-showcase'
import { DayWithPelican } from './day-with-pelican'

const FlywheelSection = dynamic(() => import('./flywheel-section').then(m => ({ default: m.FlywheelSection })))
const MultiAssetSection = dynamic(() => import('./multi-asset-section').then(m => ({ default: m.MultiAssetSection })))
const FeatureGrid = dynamic(() => import('./feature-grid').then(m => ({ default: m.FeatureGrid })))
const StrategyShowcase = dynamic(() => import('./strategy-showcase').then(m => ({ default: m.StrategyShowcase })))
const CreditTiersSection = dynamic(() => import('./credit-tiers-section').then(m => ({ default: m.CreditTiersSection })))
const PricingSection = dynamic(() => import('./pricing-section').then(m => ({ default: m.PricingSection })))
const TeamSection = dynamic(() => import('./team-section').then(m => ({ default: m.TeamSection })))
const FAQSection = dynamic(() => import('./faq-section').then(m => ({ default: m.FAQSection })))
const FinalCTA = dynamic(() => import('./final-cta').then(m => ({ default: m.FinalCTA })))

export default function LandingPageClient() {
  return (
    <main className="overflow-x-hidden">
      <InfiniteGridBg>
        <HeroSection />
        <SocialProofBar />
        <ProblemSection />
        <PlatformShowcase />
        <DayWithPelican />
      </InfiniteGridBg>
      <FlywheelSection />
      <MultiAssetSection />
      <FeatureGrid />
      <StrategyShowcase />
      <CreditTiersSection />
      <PricingSection />
      <TeamSection />
      <FAQSection />
      <FinalCTA />
    </main>
  )
}
