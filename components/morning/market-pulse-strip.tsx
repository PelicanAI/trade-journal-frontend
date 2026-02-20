'use client'

import { useMarketPulse } from '@/hooks/use-market-pulse'
import { getMarketStatus } from '@/hooks/use-market-data'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
  'open': { label: 'Market Open', dotClass: 'bg-[var(--data-positive)] animate-pulse', badgeClass: 'bg-[var(--data-positive)]/10 text-[var(--data-positive)]' },
  'pre-market': { label: 'Pre-Market', dotClass: 'bg-[var(--data-warning)]', badgeClass: 'bg-[var(--data-warning)]/10 text-[var(--data-warning)]' },
  'after-hours': { label: 'After Hours', dotClass: 'bg-blue-500', badgeClass: 'bg-blue-500/10 text-blue-500' },
  'closed': { label: 'Closed', dotClass: 'bg-[var(--text-muted)]', badgeClass: 'bg-[var(--bg-elevated)] text-[var(--text-muted)]' },
} as const

interface MarketPulseStripProps {
  onIndexClick?: (symbol: string, label: string) => void
}

export function MarketPulseStrip({ onIndexClick }: MarketPulseStripProps) {
  const { data, isLoading } = useMarketPulse()
  const marketStatus = getMarketStatus()
  const config = STATUS_CONFIG[marketStatus]

  if (isLoading) {
    return (
      <div className="flex items-center gap-6 px-4 py-2.5 bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] rounded-xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 animate-pulse">
            <div className="h-3 w-10 bg-[var(--bg-elevated)] rounded" />
            <div className="h-4 w-16 bg-[var(--bg-elevated)] rounded" />
            <div className="h-3 w-12 bg-[var(--bg-elevated)] rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface)]/50 border border-[var(--border-subtle)] rounded-xl overflow-x-auto">
      {/* Index items */}
      <div className="flex items-center gap-6">
        {data?.items.map((item) => (
          <button
            key={item.symbol}
            onClick={() => onIndexClick?.(item.symbol, item.label)}
            className="flex items-center gap-2 shrink-0 rounded-md px-1.5 py-0.5 transition-colors hover:bg-[var(--bg-elevated)]"
          >
            <span className="text-xs text-[var(--text-muted)] font-medium">{item.label}</span>
            <span className="text-sm font-mono tabular-nums font-medium text-[var(--text-primary)]">
              {item.price != null
                ? item.symbol === 'VIX'
                  ? item.price.toFixed(2)
                  : item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : '---'}
            </span>
            {item.changePercent != null && (
              <span className={cn(
                "text-xs font-mono tabular-nums",
                item.changePercent >= 0 ? 'text-[var(--data-positive)]' : 'text-[var(--data-negative)]'
              )}>
                {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Market status badge */}
      <div className="flex items-center gap-2 shrink-0 ml-4">
        <span className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium",
          config.badgeClass,
        )}>
          <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClass)} />
          {config.label}
        </span>
      </div>
    </div>
  )
}
