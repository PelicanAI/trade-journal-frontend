"use client"

import { m } from 'framer-motion'
import { staggerContainer } from '@/components/ui/pelican/motion-variants'
import { SpotlightCard } from '@/components/earnings/spotlight-card'
import type { EnrichedEarningsEvent } from '@/types/earnings'

interface EarningsSpotlightProps {
  events: EnrichedEarningsEvent[]
  onClick: (event: EnrichedEarningsEvent) => void
}

export function EarningsSpotlight({ events, onClick }: EarningsSpotlightProps) {
  const topEvents = [...events]
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 8)

  if (topEvents.length < 2) return null

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          This Week&apos;s Spotlight
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Highest-impact earnings based on market influence and your portfolio
        </p>
      </div>

      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
      >
        {topEvents.map((event) => (
          <SpotlightCard
            key={`${event.symbol}-${event.date}`}
            event={event}
            onClick={onClick}
          />
        ))}
      </m.div>
    </div>
  )
}
