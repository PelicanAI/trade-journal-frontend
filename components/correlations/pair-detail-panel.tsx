"use client"

import { useState } from 'react'
import { X, TrendUp, TrendDown, CalendarBlank } from '@phosphor-icons/react'
import { RollingChart } from './rolling-chart'
import { findSignalForPair } from '@/lib/correlation-signals'
import type { CorrelationPair, CorrelationAsset } from '@/types/correlations'

interface PairDetailPanelProps {
  assetA: string
  assetB: string
  correlations: CorrelationPair[]
  assets: CorrelationAsset[]
  beginnerMode: boolean
  onClose: () => void
}

const regimeColors: Record<string, string> = {
  normal: 'var(--data-positive)',
  elevated: 'var(--data-warning)',
  breakdown: 'var(--data-negative)',
  inversion: 'var(--data-warning)',
}

export function PairDetailPanel({
  assetA, assetB, correlations, assets, beginnerMode, onClose,
}: PairDetailPanelProps) {
  const [activePeriod, setActivePeriod] = useState<'30d' | '90d' | '1y'>('30d')

  const currentData = correlations.find(c => c.period === activePeriod)
  const found = findSignalForPair(assetA, assetB)
  const signal = found?.signal ?? null

  const nameA = assets.find(a => a.ticker === assetA)?.display_name || assetA
  const nameB = assets.find(a => a.ticker === assetB)?.display_name || assetB

  if (!currentData) return null

  return (
    <div className="pelican-card mt-4" style={{ borderTop: '2px solid var(--accent-indigo)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1 rounded transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X weight="bold" className="w-4 h-4" />
          </button>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {nameA} / {nameB}
          </h3>
        </div>

        <div className="flex gap-1 p-0.5 rounded-lg" style={{ background: 'var(--bg-base)' }}>
          {(['30d', '90d', '1y'] as const).map(period => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors"
              style={{
                background: activePeriod === period ? 'var(--accent-indigo)' : 'transparent',
                color: activePeriod === period ? 'white' : 'var(--text-secondary)',
              }}
            >
              {period === '1y' ? '1 Year' : period === '90d' ? '90 Day' : '30 Day'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Current</p>
          <p
            className="text-lg font-mono font-bold tabular-nums"
            style={{ color: currentData.correlation > 0 ? 'var(--data-positive)' : 'var(--data-negative)' }}
          >
            {currentData.correlation > 0 ? '+' : ''}{currentData.correlation.toFixed(3)}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Historical Mean</p>
          <p className="text-lg font-mono tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {currentData.historical_mean > 0 ? '+' : ''}{currentData.historical_mean.toFixed(3)}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Z-Score</p>
          <p
            className="text-lg font-mono font-bold tabular-nums"
            style={{ color: Math.abs(currentData.z_score) > 1.5 ? 'var(--data-negative)' : 'var(--text-primary)' }}
          >
            {currentData.z_score > 0 ? '+' : ''}{currentData.z_score.toFixed(1)}&sigma;
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Regime</p>
          <p
            className="text-sm font-semibold capitalize"
            style={{ color: regimeColors[currentData.regime] }}
          >
            {currentData.regime}
          </p>
        </div>
      </div>

      {/* Chart + interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <RollingChart
            data={currentData.rolling_data}
            mean={currentData.historical_mean}
            std={currentData.historical_std}
          />
        </div>

        <div className="lg:col-span-2 space-y-3">
          {signal ? (
            <>
              <div>
                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  What This Means
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {beginnerMode ? signal.beginner_explanation : signal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)' }}>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendUp weight="bold" className="w-3 h-3" style={{ color: 'var(--data-positive)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--data-positive)' }}>
                      Bullish When
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {signal.bullish_when}
                  </p>
                </div>
                <div className="p-2 rounded-lg" style={{ background: 'var(--bg-base)' }}>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendDown weight="bold" className="w-3 h-3" style={{ color: 'var(--data-negative)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--data-negative)' }}>
                      Bearish When
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {signal.bearish_when}
                  </p>
                </div>
              </div>

              {signal.historical_events.length > 0 && (
                <div>
                  <h4
                    className="text-xs font-semibold mb-1.5 flex items-center gap-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <CalendarBlank weight="bold" className="w-3 h-3" />
                    Historical Precedents
                  </h4>
                  <div className="space-y-1.5">
                    {signal.historical_events.map((event, i) => (
                      <div key={i} className="flex gap-2 text-xs">
                        <span className="font-mono shrink-0 tabular-nums" style={{ color: 'var(--text-muted)' }}>
                          {event.date}
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {event.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                Correlation Summary
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Current: {currentData.correlation.toFixed(3)}.
                Historical average: {currentData.historical_mean.toFixed(3)}.
                {Math.abs(currentData.z_score) > 1.5
                  ? ` Currently ${currentData.z_score.toFixed(1)}\u03C3 from the mean, indicating unusual behavior.`
                  : ' Within normal range.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
