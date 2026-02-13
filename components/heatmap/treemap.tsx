"use client"

import { useMemo } from "react"
import { HeatmapStock } from "@/app/api/heatmap/route"
import { getStockColor, formatChangePercent } from "@/hooks/use-heatmap"
import { SECTOR_COLORS, type SP500Sector } from "@/lib/data/sp500-constituents"

interface TreemapNode {
  ticker: string
  name: string
  sector: string
  changePercent: number | null
  marketCap: number | null
  x: number
  y: number
  width: number
  height: number
}

interface TreemapProps {
  stocks: HeatmapStock[]
  width: number
  height: number
  onStockClick?: (ticker: string, name: string) => void
}

/**
 * Squarified treemap algorithm
 * Allocates rectangles proportionally to market cap
 */
function squarify(
  stocks: HeatmapStock[],
  x: number,
  y: number,
  width: number,
  height: number
): TreemapNode[] {
  if (stocks.length === 0) return []

  // Calculate total market cap (use fallback for null values)
  const totalMarketCap = stocks.reduce((sum, s) => {
    // Use volume as proxy if marketCap is null (rough estimate)
    const cap = s.marketCap ?? (s.volume ? s.volume * (s.price ?? 100) : 1000000000)
    return sum + cap
  }, 0)

  if (totalMarketCap === 0) return []

  const nodes: TreemapNode[] = []
  let currentX = x
  let currentY = y
  let remainingWidth = width
  let remainingHeight = height

  // Sort by market cap descending for better visual distribution
  const sortedStocks = [...stocks].sort((a, b) => {
    const capA = a.marketCap ?? (a.volume ? a.volume * (a.price ?? 100) : 1000000000)
    const capB = b.marketCap ?? (b.volume ? b.volume * (b.price ?? 100) : 1000000000)
    return capB - capA
  })

  sortedStocks.forEach((stock, index) => {
    const cap = stock.marketCap ?? (stock.volume ? stock.volume * (stock.price ?? 100) : 1000000000)
    const ratio = cap / totalMarketCap

    // Calculate dimensions based on remaining space
    let nodeWidth: number
    let nodeHeight: number

    if (remainingWidth > remainingHeight) {
      // Split horizontally
      nodeWidth = ratio * width
      nodeHeight = remainingHeight
      currentX = x + nodes.reduce((sum, n) => sum + (n.y === currentY ? n.width : 0), 0)
    } else {
      // Split vertically
      nodeWidth = remainingWidth
      nodeHeight = ratio * height
      currentY = y + nodes.reduce((sum, n) => sum + (n.x === currentX ? n.height : 0), 0)
    }

    // Ensure minimum size for readability
    nodeWidth = Math.max(nodeWidth, 60)
    nodeHeight = Math.max(nodeHeight, 40)

    nodes.push({
      ticker: stock.ticker,
      name: stock.name,
      sector: stock.sector,
      changePercent: stock.changePercent,
      marketCap: cap,
      x: currentX,
      y: currentY,
      width: nodeWidth,
      height: nodeHeight,
    })

    // Update remaining space
    if (remainingWidth > remainingHeight) {
      remainingWidth -= nodeWidth
      if (remainingWidth < 60) {
        currentY += nodeHeight
        currentX = x
        remainingWidth = width
        remainingHeight -= nodeHeight
      }
    } else {
      remainingHeight -= nodeHeight
      if (remainingHeight < 40) {
        currentX += nodeWidth
        currentY = y
        remainingHeight = height
        remainingWidth -= nodeWidth
      }
    }
  })

  return nodes
}

export function Treemap({ stocks, width, height, onStockClick }: TreemapProps) {
  const nodes = useMemo(
    () => squarify(stocks, 0, 0, width, height),
    [stocks, width, height]
  )

  if (stocks.length === 0) {
    return (
      <div
        className="flex items-center justify-center border border-border rounded-lg bg-surface-1"
        style={{ width, height }}
      >
        <p className="text-foreground/50 text-sm">No data available</p>
      </div>
    )
  }

  return (
    <svg
      width={width}
      height={height}
      className="rounded-lg border border-border"
      style={{ backgroundColor: 'oklch(0.08 0.01 280)' }}
    >
      {nodes.map((node) => {
        const colors = getStockColor(node.changePercent)
        const isPositive = (node.changePercent ?? 0) > 0
        const isNegative = (node.changePercent ?? 0) < 0

        // Get sector base color
        const sectorColor = SECTOR_COLORS[node.sector as SP500Sector] ?? 'oklch(0.50 0.15 280)'

        // Apply performance overlay
        let fillColor: string
        if (isPositive) {
          const opacity = Math.min(Math.abs(node.changePercent ?? 0) / 5, 1) * 0.4
          fillColor = `color-mix(in oklch, ${sectorColor}, oklch(0.70 0.20 140) ${opacity * 100}%)`
        } else if (isNegative) {
          const opacity = Math.min(Math.abs(node.changePercent ?? 0) / 5, 1) * 0.4
          fillColor = `color-mix(in oklch, ${sectorColor}, oklch(0.55 0.25 20) ${opacity * 100}%)`
        } else {
          fillColor = sectorColor
        }

        const showLabel = node.width > 80 && node.height > 50
        const showPercent = node.width > 100 && node.height > 65

        return (
          <g
            key={node.ticker}
            onClick={() => onStockClick?.(node.ticker, node.name)}
            className="cursor-pointer transition-opacity hover:opacity-90"
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              fill={fillColor}
              stroke="oklch(0.15 0.01 280)"
              strokeWidth={1}
              rx={4}
            />
            {showLabel && (
              <>
                <text
                  x={node.x + node.width / 2}
                  y={node.y + node.height / 2 - (showPercent ? 8 : 0)}
                  textAnchor="middle"
                  className="fill-white text-xs font-semibold font-mono select-none pointer-events-none"
                  style={{ fontSize: '12px' }}
                >
                  {node.ticker}
                </text>
                {showPercent && (
                  <text
                    x={node.x + node.width / 2}
                    y={node.y + node.height / 2 + 12}
                    textAnchor="middle"
                    className={`text-[10px] font-mono font-medium select-none pointer-events-none ${
                      isPositive ? 'fill-green-200' : isNegative ? 'fill-red-200' : 'fill-white/70'
                    }`}
                  >
                    {formatChangePercent(node.changePercent)}
                  </text>
                )}
              </>
            )}
            {!showLabel && node.width > 40 && node.height > 30 && (
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2}
                textAnchor="middle"
                className="fill-white text-[10px] font-mono font-semibold select-none pointer-events-none"
              >
                {node.ticker.substring(0, 4)}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
