'use client'

import { cn } from '@/lib/utils'

interface ScaleOption {
  value: string
  label: string
}

interface SurveyScaleProps {
  label: string
  value: string | null
  options: ScaleOption[]
  onChange: (value: string) => void
}

export function SurveyScale({ label, value, options, onChange }: SurveyScaleProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex rounded-lg overflow-hidden border border-border">
        {options.map((option, i) => {
          const isSelected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'flex-1 py-2 px-3 text-xs font-medium transition-all duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-10',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted',
                i > 0 && !isSelected && 'border-l border-border'
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
