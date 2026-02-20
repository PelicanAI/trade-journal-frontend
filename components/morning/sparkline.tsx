'use client'

interface SparklineProps {
  data: number[]
  positive: boolean
  width?: number
  height?: number
  className?: string
}

export function Sparkline({
  data,
  positive,
  width = 60,
  height = 20,
  className,
}: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const padding = 1

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((value - min) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(' ')

  const color = positive ? 'var(--data-positive)' : 'var(--data-negative)'

  // Build fill polygon (line path + bottom edge)
  const fillPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
    >
      <polygon points={fillPoints} fill={color} opacity={0.1} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
