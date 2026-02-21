/** Base earnings event from Finnhub API */
export interface EarningsEvent {
  date: string
  symbol: string
  epsActual: number | null
  epsEstimate: number | null
  revenueActual: number | null
  revenueEstimate: number | null
  hour: 'bmo' | 'amc' | 'dmh' | null
  quarter: number
  year: number
}

/** Enriched with client-side portfolio + index data */
export interface EnrichedEarningsEvent extends EarningsEvent {
  name: string | null
  sector: string | null
  inPortfolio: boolean
  inWatchlist: boolean
  isSP500: boolean
  isMag7: boolean
  impactScore: number
}

/** Filter state for earnings page */
export interface EarningsFilters {
  myPortfolio: boolean
  sp500: boolean
  mag7: boolean
  bmo: boolean
  amc: boolean
  reported: boolean
}

/** Stats computed from enriched earnings */
export interface EarningsStats {
  total: number
  reported: number
  beatRate: number
  portfolioOverlap: number
}
