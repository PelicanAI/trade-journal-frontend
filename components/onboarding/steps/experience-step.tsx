'use client'

import { SurveyOptionCard } from '@/components/onboarding/survey-option-card'
import { m } from 'framer-motion'

const EXPERIENCE_OPTIONS = [
  { value: 'brand_new', emoji: '\u{1F331}', title: 'Brand New', subtitle: "I haven't started trading yet" },
  { value: 'beginner', emoji: '\u{1F4D7}', title: 'Beginner', subtitle: 'Less than a year of experience' },
  { value: 'intermediate', emoji: '\u{1F4D8}', title: 'Intermediate', subtitle: '1 to 3 years' },
  { value: 'experienced', emoji: '\u{1F4D9}', title: 'Experienced', subtitle: '3 to 10 years' },
  { value: 'veteran', emoji: '\u{1F4D5}', title: 'Veteran', subtitle: '10+ years' },
] as const

interface ExperienceStepProps {
  value: string | null
  onChange: (value: string) => void
}

export function ExperienceStep({ value, onChange }: ExperienceStepProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Let&apos;s get to know your trading
        </h2>
        <p className="text-sm text-muted-foreground">
          This helps Pelican personalize your experience
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {EXPERIENCE_OPTIONS.map((option) => (
          <SurveyOptionCard
            key={option.value}
            emoji={option.emoji}
            title={option.title}
            subtitle={option.subtitle}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </m.div>
  )
}
