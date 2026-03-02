"use client"

import { useState, useMemo, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "@phosphor-icons/react"
import { ShareButton } from "./share-button"
import type { ShareFormat } from "@/types/share-cards"

interface InsightPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  headline: string
  tickers: string[]
}

export function InsightPreviewModal({
  isOpen,
  onClose,
  headline,
  tickers,
}: InsightPreviewModalProps) {
  const [format, setFormat] = useState<ShareFormat>("og")
  const [imageError, setImageError] = useState(false)

  const imageUrl = useMemo(() => {
    if (!headline) return ""
    const params = new URLSearchParams({
      type: "pelican-insight",
      headline,
      format,
    })
    if (tickers.length > 0) params.set("tickers", tickers.join(","))
    return `/api/share-card?${params.toString()}`
  }, [headline, tickers, format])

  const handleClose = useCallback(() => {
    setImageError(false)
    onClose()
  }, [onClose])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="bg-[var(--bg-elevated)] border-[var(--border-subtle)] sm:max-w-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-[var(--text-primary)]">Share Insight Card</DialogTitle>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[var(--bg-surface)] rounded-lg transition-colors"
          >
            <X size={18} className="text-[var(--text-muted)]" />
          </button>
        </DialogHeader>

        <div className="space-y-4">
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
            {imageError ? (
              <div className="flex items-center justify-center py-12">
                <span className="text-sm text-[var(--data-negative)]">Failed to load card preview</span>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Insight card preview"
                className="w-full h-auto"
                style={{ aspectRatio: format === "square" ? "1/1" : "1200/630" }}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
            )}
          </div>

          {/* Share actions */}
          <div className="flex items-center justify-end">
            <ShareButton
              imageUrl={imageUrl}
              filename={`pelican-insight-${tickers[0] || "card"}.png`}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
