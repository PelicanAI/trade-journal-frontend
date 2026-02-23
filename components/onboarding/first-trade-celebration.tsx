"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crosshair, ChartBar, Sun, MagnifyingGlass, ArrowRight } from "@phosphor-icons/react"
import { PelicanButton } from "@/components/ui/pelican"

const CELEBRATED_KEY = "pelican-first-trade-celebrated"

interface FirstTradeCelebrationProps {
  isOpen: boolean
  onClose: () => void
  onViewPosition: () => void
  ticker?: string
}

const UNLOCKED_FEATURES = [
  {
    icon: ChartBar,
    label: "Positions",
    description: "monitor with health scores",
  },
  {
    icon: Sun,
    label: "Morning Brief",
    description: "now includes your holdings",
  },
  {
    icon: MagnifyingGlass,
    label: "Pattern detection",
    description: "activates after 5 trades",
  },
] as const

export function FirstTradeCelebration({
  isOpen,
  onClose,
  onViewPosition,
  ticker,
}: FirstTradeCelebrationProps) {
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mark as celebrated + auto-dismiss after 15s
  useEffect(() => {
    if (!isOpen) return

    if (typeof window !== "undefined") {
      localStorage.setItem(CELEBRATED_KEY, "true")
    }

    autoDismissRef.current = setTimeout(() => {
      onClose()
    }, 15000)

    return () => {
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-[min(420px,calc(100vw-2rem))] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.5),0_16px_48px_rgba(0,0,0,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle accent glow at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-[var(--accent-primary)]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-6 pt-8 pb-6">
              {/* Hero icon */}
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-primary)]/20 flex items-center justify-center">
                  <Crosshair
                    size={24}
                    weight="bold"
                    className="text-[var(--accent-primary)]"
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-[var(--text-primary)] text-center">
                Nice — your first trade is live.
              </h2>
              {ticker && (
                <p className="text-sm text-[var(--accent-primary)] font-mono tabular-nums text-center mt-1">
                  {ticker}
                </p>
              )}

              {/* Unlocked features */}
              <div className="mt-5 space-y-3">
                <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
                  Here&apos;s what just unlocked
                </p>
                {UNLOCKED_FEATURES.map(({ icon: Icon, label, description }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                  >
                    <Icon
                      size={18}
                      weight="regular"
                      className="text-[var(--text-secondary)] flex-shrink-0"
                    />
                    <div className="text-sm">
                      <span className="text-[var(--text-primary)] font-medium">
                        {label}
                      </span>
                      <span className="text-[var(--text-muted)]">
                        {" "}&mdash; {description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <PelicanButton
                  variant="secondary"
                  size="lg"
                  onClick={onClose}
                  className="flex-1"
                >
                  Keep Trading
                </PelicanButton>
                <PelicanButton
                  variant="primary"
                  size="lg"
                  onClick={onViewPosition}
                  className="flex-1 gap-1.5"
                >
                  View My Position
                  <ArrowRight size={14} weight="bold" />
                </PelicanButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Check whether the celebration has already been shown. */
export function hasSeenFirstTradeCelebration(): boolean {
  if (typeof window === "undefined") return true
  return localStorage.getItem(CELEBRATED_KEY) === "true"
}
