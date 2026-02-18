'use client'

import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { PelicanCard } from '@/components/ui/pelican'
import {
  PositionPnlBar,
  formatDollarSigned,
  formatPercent,
  formatCompactDollar,
} from '@/lib/positions/dashboard-utils'

interface PnlBarsProps {
  bars: PositionPnlBar[]
  onSelectTrade?: (tradeId: string) => void
}

function CustomLabel(props: Record<string, unknown>) {
  const { x, y, width, value, index } = props as {
    x: number
    y: number
    width: number
    value: number
    index: number
  }
  const bar = (props as { bars: PositionPnlBar[] }).bars?.[index]
  if (!bar) return null

  const isPositive = value >= 0
  const labelX = isPositive ? x + width + 6 : x - 6
  const textAnchor = isPositive ? 'start' : 'end'

  return (
    <text
      x={labelX}
      y={(y as number) + 14}
      textAnchor={textAnchor}
      fill={bar.color}
      fontSize={11}
      fontFamily="var(--font-mono)"
    >
      {formatDollarSigned(bar.pnlAmount)} ({formatPercent(bar.pnlPercent)})
    </text>
  )
}

export function PnlBars({ bars, onSelectTrade }: PnlBarsProps) {
  const chartHeight = useMemo(
    () => Math.max(bars.length * 44, 120),
    [bars.length],
  )

  if (bars.length === 0) return null

  return (
    <PelicanCard>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
        P&L by Position
      </h3>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={bars}
          layout="vertical"
          margin={{ top: 0, right: 120, bottom: 0, left: 8 }}
        >
          <XAxis
            type="number"
            tick={{
              fill: 'var(--text-muted)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
            }}
            tickFormatter={(v: number) => formatCompactDollar(v)}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="ticker"
            tick={{
              fill: 'var(--text-secondary)',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
            }}
            width={56}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null
              const d = payload[0].payload as PositionPnlBar
              return (
                <div
                  className="rounded-xl px-3 py-2 text-xs shadow-lg"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <p className="font-medium">
                    {d.ticker} <span className="text-[var(--text-muted)]">{d.direction}</span>
                  </p>
                  <p className="font-mono tabular-nums mt-0.5" style={{ color: d.color }}>
                    {formatDollarSigned(d.pnlAmount, true)} ({formatPercent(d.pnlPercent)})
                  </p>
                </div>
              )
            }}
          />
          <Bar
            dataKey="pnlAmount"
            radius={[4, 4, 4, 4]}
            barSize={20}
            onClick={(data) => {
              const payload = data as unknown as PositionPnlBar | undefined
              if (onSelectTrade && payload?.tradeId) {
                onSelectTrade(payload.tradeId)
              }
            }}
            style={onSelectTrade ? { cursor: 'pointer' } : undefined}
          >
            {bars.map((bar) => (
              <Cell key={bar.tradeId} fill={bar.color} fillOpacity={0.8} />
            ))}
            <LabelList
              content={(props) => <CustomLabel {...props} bars={bars} />}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </PelicanCard>
  )
}
