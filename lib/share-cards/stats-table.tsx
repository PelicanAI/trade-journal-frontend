import { CardLayout, CARD_COLORS } from "./card-layout"

interface StatsTableProps {
  period: string
  stats: {
    total_trades: number
    win_rate: number
    total_pnl: number
    profit_factor: number
    avg_r_multiple: number
    largest_win: number
    largest_loss: number
    expectancy: number
  }
}

interface StatRowData {
  label: string
  value: string
  color?: string
}

function formatCurrency(value: number): string {
  const abs = Math.abs(value)
  const prefix = value >= 0 ? "+$" : "-$"
  return `${prefix}${abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function pnlColor(value: number): string {
  return value >= 0 ? CARD_COLORS.green : CARD_COLORS.red
}

export function StatsTableCard({ period, stats }: StatsTableProps) {
  const rows: StatRowData[] = [
    {
      label: "Total Trades",
      value: stats.total_trades.toString(),
      color: CARD_COLORS.textPrimary,
    },
    {
      label: "Win Rate",
      value: `${stats.win_rate.toFixed(1)}%`,
      color: stats.win_rate >= 50 ? CARD_COLORS.green : CARD_COLORS.red,
    },
    {
      label: "Total P&L",
      value: formatCurrency(stats.total_pnl),
      color: pnlColor(stats.total_pnl),
    },
    {
      label: "Profit Factor",
      value: stats.profit_factor.toFixed(2),
      color:
        stats.profit_factor >= 1.5
          ? CARD_COLORS.green
          : stats.profit_factor >= 1
            ? CARD_COLORS.textPrimary
            : CARD_COLORS.red,
    },
    {
      label: "Avg R-Multiple",
      value: `${stats.avg_r_multiple >= 0 ? "+" : ""}${stats.avg_r_multiple.toFixed(2)}R`,
      color: pnlColor(stats.avg_r_multiple),
    },
    {
      label: "Expectancy",
      value: formatCurrency(stats.expectancy),
      color: pnlColor(stats.expectancy),
    },
    {
      label: "Largest Win",
      value: formatCurrency(stats.largest_win),
      color: CARD_COLORS.green,
    },
    {
      label: "Largest Loss",
      value: formatCurrency(stats.largest_loss),
      color: CARD_COLORS.red,
    },
  ]

  return (
    <CardLayout>
      {/* Period header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: CARD_COLORS.textPrimary,
            letterSpacing: "-0.02em",
          }}
        >
          Trading Performance
        </span>
        <span
          style={{
            display: "flex",
            fontSize: 14,
            fontWeight: 600,
            color: CARD_COLORS.purpleLight,
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            padding: "4px 12px",
            borderRadius: 6,
          }}
        >
          {period}
        </span>
      </div>

      {/* Stats grid — 2 columns of 4 rows */}
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: 16,
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
          {rows.slice(0, 4).map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: CARD_COLORS.textMuted,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: row.color,
                  fontFamily: "Geist Mono, monospace",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
          {rows.slice(4, 8).map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: CARD_COLORS.textMuted,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: row.color,
                  fontFamily: "Geist Mono, monospace",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CardLayout>
  )
}
