'use client'

import { cn } from '@/lib/utils'

interface PillOption {
  value: string
  label: string
}

interface SurveyPillSelectProps {
  options: PillOption[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function SurveyPillSelect({ options, selected, onChange }: SurveyPillSelectProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.value)
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              'px-4 py-2 rounded-full border text-sm transition-all duration-200 cursor-pointer',
              isSelected
                ? 'bg-primary/15 border-primary text-primary'
                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
