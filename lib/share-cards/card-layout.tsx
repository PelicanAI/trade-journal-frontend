import type { ReactNode } from "react"
import { PELICAN_LOGO_B64 } from "./logo-base64"

export const CARD_COLORS = {
  bg: "#0a0a0f",
  cardBg: "#13131a",
  border: "#1e1e2e",
  purple: "#8b5cf6",
  purpleLight: "#a78bfa",
  cyan: "#22d3ee",
  green: "#22c55e",
  red: "#ef4444",
  textPrimary: "#e8e8ed",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
} as const

interface CardLayoutProps {
  children: ReactNode
}

export function CardLayout({ children }: CardLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: CARD_COLORS.bg,
        padding: 48,
        fontFamily: "Geist Sans, sans-serif",
      }}
    >
      {/* Top bar: Logo + brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PELICAN_LOGO_B64}
          alt=""
          width={32}
          height={32}
          style={{ width: 32, height: 32, borderRadius: 4 }}
        />
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: CARD_COLORS.purple,
            letterSpacing: "-0.02em",
          }}
        >
          PELICAN AI
        </span>
      </div>

      {/* Card content */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>{children}</div>

      {/* Bottom watermark */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "auto",
          paddingTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 15,
            color: CARD_COLORS.textMuted,
            letterSpacing: "0.05em",
          }}
        >
          pelicantrading.ai
        </span>
      </div>
    </div>
  )
}
