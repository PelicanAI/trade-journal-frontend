'use client'

import { SurveyOptionCard } from '@/components/onboarding/survey-option-card'
import { SurveyScale } from '@/components/onboarding/survey-scale'
import { motion } from 'framer-motion'

const GOAL_OPTIONS = [
  { value: 'learn_basics', emoji: '\u{1F393}', title: 'Learn the basics' },
  { value: 'supplement_income', emoji: '\u{1F4B0}', title: 'Supplement my income' },
  { value: 'replace_income', emoji: '\u{1F680}', title: 'Replace my job income' },
  { value: 'grow_wealth', emoji: '\u{1F4C8}', title: 'Grow long-term wealth' },
  { value: 'improve_performance', emoji: '\u{1F9E0}', title: 'Improve my trading performance' },
  { value: 'manage_portfolio', emoji: '\u{1F4CB}', title: 'Better manage my portfolio' },
  { value: 'entertainment', emoji: '\u{1F3AE}', title: 'Trading is a hobby' },
] as const

const KNOWLEDGE_LEVELS = [
  { value: 'none', label: 'None' },
  { value: 'basic', label: 'Basic' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const

interface GoalsStepProps {
  primaryGoal: string | null
  onGoalChange: (goal: string) => void
  technicalLevel: string | null
  onTechnicalChange: (level: string) => void
  fundamentalLevel: string | null
  onFundamentalChange: (level: string) => void
  optionsKnowledge: string | null
  onOptionsChange: (level: string) => void
}

export function GoalsStep({
  primaryGoal,
  onGoalChange,
  technicalLevel,
  onTechnicalChange,
  fundamentalLevel,
  onFundamentalChange,
  optionsKnowledge,
  onOptionsChange,
}: GoalsStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-8"
    >
      {/* Section 1: Primary Goal */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          What&apos;s your primary goal?
        </h2>
        <div className="flex flex-col gap-3">
          {GOAL_OPTIONS.map((option) => (
            <SurveyOptionCard
              key={option.value}
              emoji={option.emoji}
              title={option.title}
              selected={primaryGoal === option.value}
              onClick={() => onGoalChange(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Section 2: Knowledge Levels */}
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-foreground">
          Rate your knowledge
        </h2>
        <SurveyScale
          label="Technical Analysis"
          value={technicalLevel}
          options={[...KNOWLEDGE_LEVELS]}
          onChange={onTechnicalChange}
        />
        <SurveyScale
          label="Fundamental Analysis"
          value={fundamentalLevel}
          options={[...KNOWLEDGE_LEVELS]}
          onChange={onFundamentalChange}
        />
        <SurveyScale
          label="Options"
          value={optionsKnowledge}
          options={[...KNOWLEDGE_LEVELS]}
          onChange={onOptionsChange}
        />
      </div>
    </motion.div>
  )
}
