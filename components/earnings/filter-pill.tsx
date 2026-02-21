"use client"

import { cn } from '@/lib/utils'

interface FilterPillProps {
  active: boolean
  onClick: () => void
  label: string
  icon?: React.ReactNode
  count?: number
}

export function FilterPill({ active, onClick, label, icon, count }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 cursor-pointer',
        active
          ? 'bg-[var(--accent-muted)] border border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
          : 'bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-default)] hover:text-[var(--text-secondary)]'
      )}
    >
      {icon}
      {label}
      {count !== undefined && count > 0 && (
        <span
          className={cn(
            'ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono tabular-nums',
            active ? 'bg-[var(--accent-primary)]/20' : 'bg-white/[0.06]'
          )}
        >
          {count}
        </span>
      )}
    </button>
  )
}
