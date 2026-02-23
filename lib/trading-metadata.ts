/**
 * Trading Metadata Extraction Utilities
 * Extracts tickers, prices, quantities, and trading actions from messages
 */

import { TICKER_BLOCKLIST } from './ticker-blocklist'
import { extractTickerStrings } from './ticker-normalizer'

export interface TradingMetadata {
  tickers?: string[]
  economicTerms?: string[]
  prices?: number[]
  action?: 'buy' | 'sell' | 'hold'
  quantities?: string[]
  hasPosition?: boolean
  hasStopLoss?: boolean
  hasTarget?: boolean
}

/** Economic event terms — blocked as tickers but highlighted separately */
export const ECONOMIC_EVENT_TERMS = new Set([
  'CPI', 'NFP', 'FOMC', 'PPI', 'GDP', 'PMI', 'ISM', 'JOLTS',
])

/**
 * Common trading/finance acronyms that should NOT be highlighted as tickers.
 * Now delegates to the shared TICKER_BLOCKLIST for consistency.
 */
export const TRADING_ACRONYMS = TICKER_BLOCKLIST

/**
 * Extract trading metadata from message content.
 * Uses the shared ticker normalizer for consistent blocklist/pair handling.
 */
export function extractTradingMetadata(content: string): TradingMetadata {
  const metadata: TradingMetadata = {}

  // Use the centralised normalizer for ticker extraction
  const normalizedTickers = extractTickerStrings(content)

  if (normalizedTickers.length > 0) {
    metadata.tickers = normalizedTickers
  }

  // Still extract raw uppercase matches for economic term detection
  const tickerMatches = content.match(/\b[A-Z]{2,5}\b/g)

  // Extract economic event terms from the uppercase matches we already have
  if (tickerMatches) {
    const econ = tickerMatches.filter(t => ECONOMIC_EVENT_TERMS.has(t))
    if (econ.length > 0) {
      metadata.economicTerms = [...new Set(econ)]
    }
  }

  // Extract prices ($XXX.XX format or XXX.XX preceded by price/at/entry)
  const pricePatterns = [
    /\$\s*(\d+\.?\d*)/g,  // $890 or $890.50
    /(?:price|at|entry|stop|target|sold|bought|buy|sell)\s+(\d+\.?\d*)/gi, // "at 890" or "entry 890.50"
  ]

  const prices: number[] = []
  for (const pattern of pricePatterns) {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      const priceString = match[1]
      if (priceString) {
        const price = parseFloat(priceString)
        if (!isNaN(price) && price > 0) {
          prices.push(price)
        }
      }
    }
  }

  if (prices.length > 0) {
    metadata.prices = [...new Set(prices)]
  }

  // Extract trading actions
  if (/\b(bought|buy|buying|long|entered|opening)\b/i.test(content)) {
    metadata.action = 'buy'
  } else if (/\b(sold|sell|selling|short|exited|closing)\b/i.test(content)) {
    metadata.action = 'sell'
  } else if (/\b(hold|holding|keeping)\b/i.test(content)) {
    metadata.action = 'hold'
  }

  // Extract quantities
  const quantityMatches = content.match(/(\d+)\s*(shares?|contracts?|lots?|units?)/gi)
  if (quantityMatches) {
    metadata.quantities = quantityMatches
  }

  // Detect position mentions
  metadata.hasPosition = /\b(position|entry|entries)\b/i.test(content)

  // Detect stop loss mentions
  metadata.hasStopLoss = /\b(stop|stop loss|stop-loss|sl)\b/i.test(content)

  // Detect target mentions
  metadata.hasTarget = /\b(target|tp|take profit|take-profit)\b/i.test(content)

  return metadata
}

/**
 * Generate a trading session ID for the current day
 * Format: {userId}_trading_{YYYY-MM-DD}
 */
export function getTradingSessionId(userId: string): string {
  const today = new Date().toISOString().split('T')[0]
  return `${userId}_trading_${today}`
}

/**
 * Check if a message contains trading-related content
 */
export function isTradingMessage(content: string): boolean {
  const tradingKeywords = [
    'buy', 'sell', 'stock', 'share', 'trade', 'trading',
    'position', 'entry', 'exit', 'stop', 'target', 'profit',
    'loss', 'long', 'short', 'ticker', 'market', 'price'
  ]

  const lowerContent = content.toLowerCase()
  return tradingKeywords.some(keyword => lowerContent.includes(keyword))
}
