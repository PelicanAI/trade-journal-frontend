"use client"

import { useMemo } from "react"
import { useEarnings } from "@/hooks/use-earnings"
import { useTrades } from "@/hooks/use-trades"
import { useWatchlist } from "@/hooks/use-watchlist"
import { getConstituent } from "@/lib/data/sp500-constituents"
import { SP500_TICKERS, MAG7 } from "@/lib/trading/ticker-lists"
import type {
  EarningsEvent,
  EnrichedEarningsEvent,
  EarningsFilters,
  EarningsStats,
} from "@/types/earnings"

interface UseEnrichedEarningsParams {
  from?: string
  to?: string
}

interface UseEnrichedEarningsReturn {
  events: EnrichedEarningsEvent[]
  stats: EarningsStats
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Combines raw earnings data with portfolio overlap, watchlist,
 * and S&P 500 / Mag7 enrichment for the earnings calendar.
 */
export function useEnrichedEarnings({
  from,
  to,
}: UseEnrichedEarningsParams = {}): UseEnrichedEarningsReturn {
  const {
    events: rawEvents,
    isLoading: earningsLoading,
    error: earningsError,
    refetch,
  } = useEarnings({ from, to })

  const { openTrades } = useTrades({})
  const { items: watchlistItems } = useWatchlist()

  // Build lookup sets once per render cycle
  const portfolioTickers = useMemo(
    () => new Set(openTrades.map((t) => t.ticker.toUpperCase())),
    [openTrades]
  )

  const watchlistTickers = useMemo(
    () => new Set(watchlistItems.map((w) => w.ticker.toUpperCase())),
    [watchlistItems]
  )

  // Enrich each event with portfolio/index metadata + impact score
  const events = useMemo<EnrichedEarningsEvent[]>(() => {
    return rawEvents.map((event: EarningsEvent) => {
      const symbol = event.symbol.toUpperCase()
      const constituent = getConstituent(symbol)
      const inPortfolio = portfolioTickers.has(symbol)
      const inWatchlist = watchlistTickers.has(symbol)
      const isSP500 = SP500_TICKERS.has(symbol)
      const isMag7 = MAG7.has(symbol)

      // Compute impact score
      let impactScore = 0
      const rev = event.revenueEstimate ?? 0
      if (rev >= 50e9) impactScore += 50
      else if (rev >= 10e9) impactScore += 35
      else if (rev >= 1e9) impactScore += 20
      else impactScore += 5
      if (inPortfolio) impactScore += 40
      if (inWatchlist) impactScore += 20
      if (isMag7) impactScore += 30
      if (isSP500) impactScore += 10

      return {
        ...event,
        name: constituent?.name ?? null,
        sector: constituent?.sector ?? null,
        inPortfolio,
        inWatchlist,
        isSP500,
        isMag7,
        impactScore,
      }
    })
  }, [rawEvents, portfolioTickers, watchlistTickers])

  // Compute aggregate stats
  const stats = useMemo<EarningsStats>(() => {
    const total = events.length
    const reported = events.filter((e) => e.epsActual !== null).length
    const beats = events.filter(
      (e) =>
        e.epsActual !== null &&
        e.epsEstimate !== null &&
        e.epsActual > e.epsEstimate
    ).length
    const beatRate = reported > 0 ? beats / reported : 0
    const portfolioOverlap = events.filter(
      (e) => e.inPortfolio || e.inWatchlist
    ).length

    return { total, reported, beatRate, portfolioOverlap }
  }, [events])

  return {
    events,
    stats,
    isLoading: earningsLoading,
    error: earningsError,
    refetch,
  }
}

/**
 * Apply client-side filters + search to enriched earnings events.
 */
export function applyEarningsFilters(
  events: EnrichedEarningsEvent[],
  filters: EarningsFilters,
  search: string
): EnrichedEarningsEvent[] {
  return events.filter((event) => {
    if (
      search &&
      !event.symbol.toUpperCase().includes(search.toUpperCase())
    )
      return false
    if (filters.myPortfolio && !event.inPortfolio && !event.inWatchlist)
      return false
    if (filters.sp500 && !event.isSP500) return false
    if (filters.mag7 && !event.isMag7) return false
    if (filters.bmo && event.hour !== "bmo") return false
    if (
      filters.amc &&
      event.hour !== "amc" &&
      event.hour !== "dmh" &&
      event.hour !== null
    )
      return false
    if (filters.reported && event.epsActual === null) return false
    return true
  })
}
