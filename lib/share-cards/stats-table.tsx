import { CardLayout, CARD_COLORS, PELICAN_LOGO_B64 } from "./card-layout"

interface StatsTableProps {
  period: string
  stats: {
    total_trades?: number | null
    win_rate?: number | null
    total_pnl?: number | null
    profit_factor?: number | null
    avg_r_multiple?: number | null
    largest_win?: number | null
    largest_loss?: number | null
    expectancy?: number | null
  }
}

interface StatRowData {
  label: string
  value: string
  color: string
}

function n(v: number | null | undefined): number {
  return v ?? 0
}

function formatCurrency(value: number): string {
  const abs = Math.abs(value)
  const prefix = value >= 0 ? "+$" : "-$"
  const formatted =
    abs >= 1000
      ? abs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : abs.toFixed(2)
  return `${prefix}${formatted}`
}

function pnlColor(value: number): string {
  return value >= 0 ? CARD_COLORS.green : CARD_COLORS.red
}

export function StatsTableCard({ period, stats }: StatsTableProps) {
  const totalTrades = n(stats.total_trades)
  const winRate = n(stats.win_rate)
  const totalPnl = n(stats.total_pnl)
  const profitFactor = n(stats.profit_factor)
  const avgR = n(stats.avg_r_multiple)
  const expectancy = n(stats.expectancy)
  const largestWin = n(stats.largest_win)
  const largestLoss = n(stats.largest_loss)

  const rows: StatRowData[] = [
    {
      label: "Win Rate",
      value: `${winRate.toFixed(1)}%`,
      color: winRate >= 50 ? CARD_COLORS.green : CARD_COLORS.red,
    },
    {
      label: "Total P&L",
      value: formatCurrency(totalPnl),
      color: pnlColor(totalPnl),
    },
    {
      label: "Profit Factor",
      value: profitFactor.toFixed(2),
      color:
        profitFactor >= 1.5
          ? CARD_COLORS.green
          : profitFactor >= 1
            ? CARD_COLORS.textPrimary
            : CARD_COLORS.red,
    },
    {
      label: "Avg R-Multiple",
      value: `${avgR >= 0 ? "+" : ""}${avgR.toFixed(2)}R`,
      color: pnlColor(avgR),
    },
    {
      label: "Expectancy",
      value: formatCurrency(expectancy),
      color: pnlColor(expectancy),
    },
    {
      label: "Largest Win",
      value: formatCurrency(largestWin),
      color: CARD_COLORS.green,
    },
    {
      label: "Largest Loss",
      value: formatCurrency(largestLoss),
      color: CARD_COLORS.red,
    },
  ]

  const contextLine =
    period === "All Time"
      ? "Trading Performance"
      : `Trading Performance \u2014 ${period}`

  return (
    <CardLayout hideHeader hideFooter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        {/* ===== Centered header: logo + brand + context ===== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PELICAN_LOGO_B64}
            alt=""
            width={44}
            height={44}
            style={{ width: 44, height: 44, borderRadius: 8, marginBottom: 10 }}
          />
          <span
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.15em",
            }}
          >
            PELICAN
          </span>
        </div>

        {/* Context line */}
        <span
          style={{
            display: "flex",
            fontSize: 15,
            color: "rgba(255, 255, 255, 0.5)",
            marginBottom: 20,
          }}
        >
          {contextLine}
        </span>

        {/* ===== Data table ===== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          {/* Column headers */}
          <div
            style={{
              display: "flex",
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                display: "flex",
                flex: 3,
                fontSize: 11,
                color: "rgba(255, 255, 255, 0.35)",
                fontWeight: 600,
                letterSpacing: "0.12em",
              }}
            >
              METRIC
            </span>
            <span
              style={{
                display: "flex",
                flex: 2,
                fontSize: 11,
                color: "rgba(255, 255, 255, 0.35)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                justifyContent: "flex-end",
              }}
            >
              VALUE
            </span>
          </div>

          {/* Data rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            {rows.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom:
                    i < rows.length - 1
                      ? "1px solid rgba(255, 255, 255, 0.06)"
                      : "none",
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    flex: 3,
                    fontSize: 15,
                    color: "rgba(255, 255, 255, 0.55)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    display: "flex",
                    flex: 2,
                    fontSize: 17,
                    fontWeight: 700,
                    color: row.color,
                    fontFamily: "Geist Mono, monospace",
                    justifyContent: "flex-end",
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total trades count — small, bottom-left */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: 12,
              color: "rgba(255, 255, 255, 0.25)",
              fontFamily: "Geist Mono, monospace",
            }}
          >
            {`${totalTrades} trades`}
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.18)",
              letterSpacing: "0.08em",
            }}
          >
            pelicantrading.ai
          </span>
        </div>
      </div>
    </CardLayout>
  )
}
