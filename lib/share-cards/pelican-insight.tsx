import { CardLayout, CARD_COLORS } from "./card-layout"

interface PelicanInsightProps {
  headline: string
  tickers: string[]
}

function getFontSize(len: number): number {
  if (len < 100) return 36
  if (len < 200) return 28
  if (len < 400) return 22
  return 18
}

export function PelicanInsightCard({ headline, tickers }: PelicanInsightProps) {
  const fontSize = getFontSize(headline.length)

  return (
    <CardLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: 24,
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight: 700,
            color: CARD_COLORS.textPrimary,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </span>

        {tickers.length > 0 ? (
          <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
            {tickers.map((ticker, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  fontSize: 16,
                  fontWeight: 600,
                  color: CARD_COLORS.textSecondary,
                  backgroundColor: CARD_COLORS.cardBg,
                  border: `1px solid ${CARD_COLORS.border}`,
                  borderRadius: 6,
                  padding: "4px 12px",
                  fontFamily: "Geist Mono, monospace",
                }}
              >
                {`$${ticker}`}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
        <span style={{ fontSize: 14, color: CARD_COLORS.textMuted }}>
          Analysis by Pelican AI
        </span>
      </div>
    </CardLayout>
  )
}
