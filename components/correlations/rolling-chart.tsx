"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts'

interface RollingChartProps {
  data: { date: string; value: number }[]
  mean: number
  std: number
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`
}

export function RollingChart({ data, mean, std }: RollingChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[280px] text-sm" style={{ color: 'var(--text-muted)' }}>
        No rolling data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="corrGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
            <stop offset="50%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.05} />
            <stop offset="51%" stopColor="hsl(0, 70%, 45%)" stopOpacity={0.05} />
            <stop offset="100%" stopColor="hsl(0, 70%, 45%)" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border-subtle)"
          vertical={false}
        />

        <ReferenceArea
          y1={Math.max(mean - std, -1)}
          y2={Math.min(mean + std, 1)}
          fill="var(--text-muted)"
          fillOpacity={0.08}
        />

        <ReferenceLine
          y={0}
          stroke="var(--text-muted)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
        />

        <ReferenceLine
          y={mean}
          stroke="var(--accent-indigo)"
          strokeDasharray="2 2"
          strokeWidth={1}
        />

        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          tickLine={{ stroke: 'var(--border-subtle)' }}
          axisLine={{ stroke: 'var(--border-subtle)' }}
          interval="preserveStartEnd"
          minTickGap={60}
        />

        <YAxis
          domain={[-1, 1]}
          ticks={[-1, -0.5, 0, 0.5, 1]}
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          tickLine={{ stroke: 'var(--border-subtle)' }}
          axisLine={{ stroke: 'var(--border-subtle)' }}
          tickFormatter={(v: number) => v.toFixed(1)}
        />

        <Tooltip
          contentStyle={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '12px',
          }}
          formatter={(value) => [typeof value === 'number' ? value.toFixed(3) : String(value ?? ''), 'Correlation']}
          labelFormatter={(label) => formatDate(String(label))}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--accent-indigo)"
          strokeWidth={2}
          fill="url(#corrGradient)"
          dot={false}
          activeDot={{
            r: 4,
            fill: 'var(--accent-indigo)',
            stroke: 'var(--bg-surface)',
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
