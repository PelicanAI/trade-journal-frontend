'use client'

import { m } from 'framer-motion'
import {
  ChartLineUp,
  MagnifyingGlass,
  Brain,
  Target,
  Check,
  Plus,
  ChatCircleDots,
} from '@phosphor-icons/react'
import { PelicanButton, staggerContainer, staggerItem } from '@/components/ui/pelican'

interface JournalEmptyStateProps {
  onLogTrade: () => void
  onAskPelican: () => void
}

const features = [
  { icon: ChartLineUp, text: 'Performance analytics — win rate, P&L, profit factor' },
  { icon: MagnifyingGlass, text: 'Pattern detection — Pelican finds what you can\'t see' },
  { icon: Brain, text: 'AI trade grading — get each trade scored and reviewed' },
  { icon: Target, text: 'Playbook tracking — see which strategies actually work' },
]

export function JournalEmptyState({
  onLogTrade,
  onAskPelican,
}: JournalEmptyStateProps) {
  return (
    <m.div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <m.div variants={staggerItem}>
        <ChartLineUp
          size={48}
          weight="thin"
          className="text-[var(--text-muted)] mb-5"
        />
      </m.div>

      <m.h2
        variants={staggerItem}
        className="text-lg font-semibold text-[var(--text-primary)] mb-2"
      >
        Start Your Trading Journal
      </m.h2>

      <m.p
        variants={staggerItem}
        className="text-sm text-[var(--text-muted)] mb-8 max-w-sm"
      >
        Log your trades to unlock AI-powered insights
      </m.p>

      <m.ul
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3 mb-8 text-left max-w-xs w-full"
      >
        {features.map((feature) => (
          <m.li
            key={feature.text}
            variants={staggerItem}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 flex-shrink-0 rounded-full p-1 bg-[var(--accent-muted)]">
              <Check
                size={12}
                weight="bold"
                className="text-[var(--accent-primary)]"
              />
            </div>
            <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {feature.text}
            </span>
          </m.li>
        ))}
      </m.ul>

      <m.p
        variants={staggerItem}
        className="text-xs text-[var(--text-muted)] mb-8 max-w-sm"
      >
        Every trade you log makes Pelican smarter about your strengths and weaknesses.
      </m.p>

      <m.div
        variants={staggerItem}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <PelicanButton onClick={onLogTrade}>
          <Plus size={16} weight="bold" />
          Log Your First Trade
        </PelicanButton>
        <PelicanButton variant="secondary" onClick={onAskPelican}>
          <ChatCircleDots size={16} weight="regular" />
          Get a Trade Idea
        </PelicanButton>
      </m.div>
    </m.div>
  )
}
