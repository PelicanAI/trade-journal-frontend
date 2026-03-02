"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, SpinnerGap } from "@phosphor-icons/react"
import { ShareButton } from "./share-button"
import { createClient } from "@/lib/supabase/client"
import type { ShareFormat, ShareCardType } from "@/types/share-cards"

interface ShareCardPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  cardType: ShareCardType
  headline: string
  tickers: string[]
}

type StatsPeriod = "Week" | "Month" | "All Time"

interface StatsData {
  total_trades: number
  win_rate: number
  total_pnl: number
  profit_factor: number
  avg_r_multiple: number
  largest_win: number
  largest_loss: number
  expectancy: number
}

export function ShareCardPreviewModal({
  isOpen,
  onClose,
  cardType,
  headline,
  tickers,
}: ShareCardPreviewModalProps) {
  const [format, setFormat] = useState<ShareFormat>("og")
  const [imageError, setImageError] = useState(false)
  const [period, setPeriod] = useState<StatsPeriod>("All Time")
  const [stats, setStats] = useState<StatsData | null>(null)
  const [statsLoading, setStatsLoading] = useState(false)

  // Fetch stats when opening stats-table card
  useEffect(() => {
    if (!isOpen || cardType !== "stats-table") {
      setStats(null)
      return
    }

    let cancelled = false
    const fetchStats = async () => {
      setStatsLoading(true)
      setImageError(false)
      try {
        const supabase = createClient()
        const { data, error } = await supabase.rpc("get_trade_stats", {
          p_is_paper: null,
        })
        if (error) throw error
        if (!cancelled) setStats(data as StatsData)
      } catch {
        if (!cancelled) setImageError(true)
      } finally {
        if (!cancelled) setStatsLoading(false)
      }
    }
    fetchStats()
    return () => {
      cancelled = true
    }
  }, [isOpen, cardType])

  const imageUrl = useMemo(() => {
    if (cardType === "pelican-insight") {
      if (!headline) return ""
      const params = new URLSearchParams({
        type: "pelican-insight",
        headline,
        format,
      })
      if (tickers.length > 0) params.set("tickers", tickers.join(","))
      return `/api/share-card?${params.toString()}`
    }

    if (cardType === "stats-table") {
      if (!stats) return ""
      // Use POST via a blob URL for stats (data too large for query params)
      return ""
    }

    return ""
  }, [cardType, headline, tickers, format, stats])

  // For stats-table, generate image via POST and use blob URL
  const [statsBlobUrl, setStatsBlobUrl] = useState<string>("")

  useEffect(() => {
    if (cardType !== "stats-table" || !stats || !isOpen) {
      if (statsBlobUrl) URL.revokeObjectURL(statsBlobUrl)
      setStatsBlobUrl("")
      return
    }

    let cancelled = false
    const generateStatsImage = async () => {
      try {
        const res = await fetch("/api/share-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "stats-table",
            period,
            stats,
            format,
          }),
        })
        if (!res.ok) throw new Error("Failed to generate stats card")
        const blob = await res.blob()
        if (!cancelled) {
          setStatsBlobUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return URL.createObjectURL(blob)
          })
          setImageError(false)
        }
      } catch {
        if (!cancelled) setImageError(true)
      }
    }
    generateStatsImage()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType, stats, period, format, isOpen])

  const effectiveImageUrl = cardType === "stats-table" ? statsBlobUrl : imageUrl

  const handleClose = useCallback(() => {
    setImageError(false)
    if (statsBlobUrl) URL.revokeObjectURL(statsBlobUrl)
    setStatsBlobUrl("")
    onClose()
  }, [onClose, statsBlobUrl])

  const filename = useMemo(() => {
    if (cardType === "stats-table") return `pelican-stats-${period.toLowerCase().replace(" ", "-")}.png`
    return `pelican-insight-${tickers[0] || "card"}.png`
  }, [cardType, period, tickers])

  const isEmpty = cardType === "stats-table" && stats && stats.total_trades === 0

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[var(--bg-elevated)] border-[var(--border-subtle)] sm:max-w-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-[var(--text-primary)]">
            {cardType === "stats-table" ? "Share Stats Card" : "Share Insight Card"}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[var(--bg-surface)] rounded-lg transition-colors"
          >
            <X size={18} className="text-[var(--text-muted)]" />
          </button>
        </DialogHeader>

        <div className="space-y-4">
          {/* Period picker for stats-table */}
          {cardType === "stats-table" ? (
            <div className="flex items-center gap-2">
              {(["Week", "Month", "All Time"] as StatsPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                    period === p
                      ? "bg-[var(--accent-muted)] text-[var(--accent-primary)] font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          ) : null}

          {/* Format toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat("og")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                format === "og"
                  ? "bg-[var(--accent-muted)] text-[var(--accent-primary)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              Twitter / LinkedIn
            </button>
            <button
              onClick={() => setFormat("square")}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                format === "square"
                  ? "bg-[var(--accent-muted)] text-[var(--accent-primary)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              Square (Instagram)
            </button>
          </div>

          {/* Image preview */}
          <div className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            {statsLoading ? (
              <div className="flex items-center justify-center py-12">
                <SpinnerGap size={24} weight="regular" className="animate-spin text-[var(--text-muted)]" />
              </div>
            ) : isEmpty ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-sm text-[var(--text-muted)]">No trades found for this period</span>
              </div>
            ) : imageError ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-sm text-[var(--data-negative)]">Failed to load card preview</span>
              </div>
            ) : effectiveImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={effectiveImageUrl}
                alt="Share card preview"
                className="w-full h-auto"
                style={{ aspectRatio: format === "square" ? "1/1" : "1200/630" }}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            ) : (
              <div className="flex items-center justify-center py-12">
                <SpinnerGap size={24} weight="regular" className="animate-spin text-[var(--text-muted)]" />
              </div>
            )}
          </div>

          {/* Share actions */}
          {effectiveImageUrl && !imageError && !isEmpty ? (
            <div className="flex items-center justify-end">
              <ShareButton imageUrl={effectiveImageUrl} filename={filename} />
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
