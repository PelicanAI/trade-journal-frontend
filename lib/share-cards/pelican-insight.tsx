import { CardLayout, CARD_COLORS } from "./card-layout"

interface PelicanInsightProps {
  headline: string
  statPrimary: string | null
  statSecondary: string | null
  tickers: string[]
  logoBase64?: string
}

export function PelicanInsightCard({
  headline,
  statPrimary,
  statSecondary,
  tickers,
  logoBase64,
}: PelicanInsightProps) {
  return (
    <CardLayout logoBase64={logoBase64}>
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
            fontSize: 36,
            fontWeight: 700,
            color: CARD_COLORS.textPrimary,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </span>

        {statPrimary || statSecondary ? (
          <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
            {statPrimary ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(139, 92, 246, 0.12)",
                  border: "1px solid rgba(139, 92, 246, 0.25)",
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: CARD_COLORS.purple,
                    fontFamily: "Geist Mono, monospace",
                  }}
                >
                  {statPrimary}
                </span>
              </div>
            ) : null}
            {statSecondary ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(34, 211, 238, 0.08)",
                  border: "1px solid rgba(34, 211, 238, 0.18)",
                  borderRadius: 8,
                  padding: "8px 16px",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: CARD_COLORS.cyan,
                    fontFamily: "Geist Mono, monospace",
                  }}
                >
                  {statSecondary}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

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
