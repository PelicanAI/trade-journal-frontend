'use client'

import { cn } from '@/lib/utils'

interface SurveyProgressProps {
  currentStep: number
  totalSteps: number
}

export function SurveyProgress({ currentStep, totalSteps }: SurveyProgressProps) {
  return (
    <div className="flex gap-1.5 w-full" role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-all duration-500 ease-out',
            i < currentStep ? 'bg-primary' : 'bg-muted'
          )}
        />
      ))}
    </div>
  )
}
