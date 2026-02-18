'use client'

import { PelicanCard } from '@/components/ui/pelican'
import { ExposureBreakdown, formatDollar } from '@/lib/positions/dashboard-utils'

interface ExposureBarProps {
  exposure: ExposureBreakdown
}

export function ExposureBar({ exposure }: ExposureBarProps) {
  const total = exposure.longExposure + exposure.shortExposure
  const longPct = total > 0 ? (exposure.longExposure / total) * 100 : 0
  const shortPct = total > 0 ? (exposure.shortExposure / total) * 100 : 0

  const netColor =
    exposure.netDirection === 'long'
      ? 'var(--data-positive)'
      : exposure.netDirection === 'short'
        ? 'var(--data-negative)'
        : 'var(--text-muted)'

  const netLabel =
    exposure.netDirection === 'neutral'
      ? 'Flat'
      : `${formatDollar(exposure.netExposure)} ${exposure.netDirection === 'long' ? 'Long' : 'Short'}`

  return (
    <PelicanCard>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
        Long vs Short Exposure
      </h3>

      {/* Labels above bar */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--data-positive)' }}>
          {formatDollar(exposure.longExposure)} Long
        </span>
        <span className="text-xs font-mono tabular-nums" style={{ color: 'var(--data-negative)' }}>
          {formatDollar(exposure.shortExposure)} Short
        </span>
      </div>

      {/* Bar */}
      <div className="flex h-8 rounded-lg overflow-hidden bg-[var(--bg-elevated)]">
        {longPct > 0 && (
          <div
            className="transition-all duration-300"
            style={{
              width: `${longPct}%`,
              background: 'var(--data-positive)',
              opacity: 0.85,
            }}
          />
        )}
        {shortPct > 0 && (
          <div
            className="transition-all duration-300"
            style={{
              width: `${shortPct}%`,
              background: 'var(--data-negative)',
              opacity: 0.85,
            }}
          />
        )}
      </div>

      {/* Net exposure */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="text-xs text-[var(--text-muted)]">Net:</span>
        <span
          className="text-sm font-mono tabular-nums font-semibold"
          style={{ color: netColor }}
        >
          {netLabel}
        </span>
      </div>
    </PelicanCard>
  )
}
