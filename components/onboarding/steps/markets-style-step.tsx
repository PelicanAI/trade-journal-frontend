'use client'

import { SurveyOptionCard } from '@/components/onboarding/survey-option-card'
import { m } from 'framer-motion'

const MARKET_OPTIONS = [
  { value: 'stocks', emoji: '\u{1F4C8}', title: 'Stocks' },
  { value: 'options', emoji: '\u26A1', title: 'Options' },
  { value: 'futures', emoji: '\u{1F52E}', title: 'Futures' },
  { value: 'forex', emoji: '\u{1F4B1}', title: 'Forex' },
  { value: 'crypto', emoji: '\u20BF', title: 'Crypto' },
  { value: 'etfs', emoji: '\u{1F4CA}', title: 'ETFs' },
  { value: 'bonds', emoji: '\u{1F3E6}', title: 'Bonds' },
  { value: 'not_sure', emoji: '\u{1F937}', title: 'Not sure yet' },
] as const

const BEGINNER_STYLES = [
  { value: 'scalper', emoji: '\u26A1', title: 'Very Fast Trades', subtitle: 'Seconds to minutes' },
  { value: 'day_trader', emoji: '\u{1F305}', title: 'Same-Day Trades', subtitle: 'Buy and sell within the day' },
  { value: 'swing_trader', emoji: '\u{1F30A}', title: 'Multi-Day Trades', subtitle: 'Hold for days to weeks' },
  { value: 'position_trader', emoji: '\u{26F0}\uFE0F', title: 'Longer-Term Trades', subtitle: 'Hold for weeks to months' },
  { value: 'investor', emoji: '\u{1F333}', title: 'Long-Term Investing', subtitle: 'Hold for months to years' },
  { value: 'figuring_out', emoji: '\u2753', title: 'Still figuring it out', subtitle: "That's okay \u2014 Pelican will help" },
] as const

const EXPERIENCED_STYLES = [
  { value: 'scalper', emoji: '\u26A1', title: 'Scalper' },
  { value: 'day_trader', emoji: '\u{1F305}', title: 'Day Trader' },
  { value: 'swing_trader', emoji: '\u{1F30A}', title: 'Swing Trader' },
  { value: 'position_trader', emoji: '\u{26F0}\uFE0F', title: 'Position Trader' },
  { value: 'investor', emoji: '\u{1F333}', title: 'Investor' },
  { value: 'figuring_out', emoji: '\u2753', title: 'Still figuring it out' },
] as const

interface MarketsStyleStepProps {
  marketsTraded: string[]
  onMarketsChange: (markets: string[]) => void
  primaryStyle: string | null
  onStyleChange: (style: string) => void
  experienceLevel: string | null
}

export function MarketsStyleStep({
  marketsTraded,
  onMarketsChange,
  primaryStyle,
  onStyleChange,
  experienceLevel,
}: MarketsStyleStepProps) {
  const isBeginner = experienceLevel === 'brand_new' || experienceLevel === 'beginner'
  const styleOptions = isBeginner ? BEGINNER_STYLES : EXPERIENCED_STYLES

  const toggleMarket = (value: string) => {
    if (value === 'not_sure') {
      onMarketsChange(marketsTraded.includes('not_sure') ? [] : ['not_sure'])
      return
    }
    const withoutNotSure = marketsTraded.filter((m) => m !== 'not_sure')
    if (withoutNotSure.includes(value)) {
      onMarketsChange(withoutNotSure.filter((m) => m !== value))
    } else {
      onMarketsChange([...withoutNotSure, value])
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-8"
    >
      {/* Section 1: Markets */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">What do you trade?</h2>
          <p className="text-xs text-muted-foreground">Select all that apply</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {MARKET_OPTIONS.map((option) => (
            <SurveyOptionCard
              key={option.value}
              emoji={option.emoji}
              title={option.title}
              selected={marketsTraded.includes(option.value)}
              onClick={() => toggleMarket(option.value)}
              size="compact"
            />
          ))}
        </div>
      </div>

      {/* Section 2: Trading Style */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">How do you trade?</h2>
        <div className="flex flex-col gap-3">
          {styleOptions.map((option) => (
            <SurveyOptionCard
              key={option.value}
              emoji={option.emoji}
              title={option.title}
              subtitle={'subtitle' in option ? option.subtitle : undefined}
              selected={primaryStyle === option.value}
              onClick={() => onStyleChange(option.value)}
            />
          ))}
        </div>
      </div>
    </m.div>
  )
}
