"use client"

import { SECTOR_COLORS, getSectors, type SP500Sector } from "@/lib/data/sp500-constituents"
import { HeatmapStock } from "@/app/api/heatmap/route"

interface SectorLegendProps {
  stocks: HeatmapStock[]
  selectedSectors: SP500Sector[]
  onToggleSector: (sector: SP500Sector) => void
}

export function SectorLegend({ stocks, selectedSectors, onToggleSector }: SectorLegendProps) {
  const sectors = getSectors()

  // Calculate sector performance
  const sectorStats = sectors.map((sector) => {
    const sectorStocks = stocks.filter((s) => s.sector === sector)
    const avgChange =
      sectorStocks.length > 0
        ? sectorStocks.reduce((sum, s) => sum + (s.changePercent ?? 0), 0) / sectorStocks.length
        : 0

    return {
      sector,
      avgChange,
      count: sectorStocks.length,
    }
  })

  // Sort by average change descending
  const sortedSectors = sectorStats.sort((a, b) => b.avgChange - a.avgChange)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground">Sectors</h3>
        {selectedSectors.length < sectors.length && (
          <button
            onClick={() => {
              // Select all
              sectors.forEach((s) => {
                if (!selectedSectors.includes(s)) {
                  onToggleSector(s)
                }
              })
            }}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Select All
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        {sortedSectors.map(({ sector, avgChange, count }) => {
          const isSelected = selectedSectors.includes(sector)
          const color = SECTOR_COLORS[sector]
          const isPositive = avgChange > 0
          const sign = avgChange >= 0 ? "+" : ""

          return (
            <button
              key={sector}
              onClick={() => onToggleSector(sector)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 rounded-lg
                border transition-all
                ${
                  isSelected
                    ? 'bg-white/[0.06] border-border hover:bg-white/[0.08]'
                    : 'bg-transparent border-transparent hover:bg-white/[0.03]'
                }
              `}
            >
              {/* Color indicator */}
              <div
                className={`w-3 h-3 rounded-sm flex-shrink-0 ${isSelected ? 'opacity-100' : 'opacity-40'}`}
                style={{ backgroundColor: color }}
              />

              {/* Sector name */}
              <div className="flex-1 text-left">
                <div className={`text-xs font-medium ${isSelected ? 'text-foreground' : 'text-foreground/50'}`}>
                  {sector}
                </div>
                <div className="text-[10px] text-foreground/40">{count} stocks</div>
              </div>

              {/* Average change */}
              <div
                className={`text-xs font-mono font-medium tabular-nums ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {sign}
                {avgChange.toFixed(2)}%
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
