"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { ReactNode } from "react"

type PanelMode = "overview" | "chart" | "calendar"

const SIDEBAR_TAB_KEY = "pelican-sidebar-tab"
const VALID_PERSISTED_MODES: PanelMode[] = ["overview", "calendar"]

interface ChartContextValue {
  mode: PanelMode
  selectedTicker: string | null
  showChart: (ticker: string) => void
  showCalendar: () => void
  closeChart: () => void
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function ChartProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PanelMode>("overview")
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null)

  // Hydrate persisted tab on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_TAB_KEY)
      if (stored && VALID_PERSISTED_MODES.includes(stored as PanelMode)) {
        setMode(stored as PanelMode)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const persistMode = (m: PanelMode) => {
    try {
      // Only persist overview/calendar — chart mode requires a ticker
      if (VALID_PERSISTED_MODES.includes(m)) {
        localStorage.setItem(SIDEBAR_TAB_KEY, m)
      } else {
        localStorage.setItem(SIDEBAR_TAB_KEY, "overview")
      }
    } catch {
      // localStorage unavailable
    }
  }

  const showChart = useCallback((ticker: string) => {
    // Strip hyphens/slashes for TradingView (BTC-USD → BTCUSD, EUR/USD → EURUSD)
    setSelectedTicker(ticker.replace(/[-/]/g, "").toUpperCase())
    setMode("chart")
    // Don't persist chart mode — it requires a specific ticker
  }, [])

  const showCalendar = useCallback(() => {
    setMode("calendar")
    persistMode("calendar")
  }, [])

  const closeChart = useCallback(() => {
    setMode("overview")
    setSelectedTicker(null)
    persistMode("overview")
  }, [])

  return (
    <ChartContext.Provider value={{ mode, selectedTicker, showChart, showCalendar, closeChart }}>
      {children}
    </ChartContext.Provider>
  )
}

const NOOP = () => {}
const DEFAULT_CHART_CONTEXT: ChartContextValue = {
  mode: "overview",
  selectedTicker: null,
  showChart: NOOP,
  showCalendar: NOOP,
  closeChart: NOOP,
}

/**
 * Returns chart context. Safe to call outside ChartProvider — returns no-op defaults.
 */
export function useChart(): ChartContextValue {
  const ctx = useContext(ChartContext)
  return ctx ?? DEFAULT_CHART_CONTEXT
}
