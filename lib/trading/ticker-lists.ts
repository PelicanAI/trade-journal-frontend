/**
 * Static ticker lists for client-side filtering.
 * Used by Morning Brief movers, watchlist, and other features.
 */

import { SP500_CONSTITUENTS } from '@/lib/data/sp500-constituents'

// --- Stocks ---

export const MAG7 = new Set([
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA',
])

export const SP500_TICKERS = new Set(
  SP500_CONSTITUENTS.map(c => c.ticker)
)

export const NASDAQ_100 = new Set([
  'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA',
  'AVGO', 'COST', 'NFLX', 'AMD', 'ADBE', 'PEP', 'CSCO', 'TMUS',
  'INTC', 'INTU', 'CMCSA', 'QCOM', 'TXN', 'AMAT', 'AMGN', 'ISRG',
  'HON', 'BKNG', 'LRCX', 'VRTX', 'MU', 'REGN', 'ADI', 'KLAC',
  'PANW', 'SNPS', 'MDLZ', 'CDNS', 'MELI', 'CRWD', 'ABNB', 'NXPI',
  'MAR', 'PYPL', 'FTNT', 'CTAS', 'ORLY', 'CEG', 'WDAY', 'CSX',
  'DASH', 'ADSK', 'MRVL', 'ROP', 'PCAR', 'DDOG', 'AEP', 'MNST',
  'TTD', 'FANG', 'ROST', 'KDP', 'ODFL', 'FAST', 'PAYX', 'BKR',
  'CPRT', 'EA', 'CTSH', 'DXCM', 'VRSK', 'LULU', 'GEHC', 'EXC',
  'XEL', 'ZS', 'IDXX', 'CCEP', 'TEAM', 'CSGP', 'ANSS', 'KHC',
  'TTWO', 'CDW', 'ON', 'GFS', 'BIIB', 'WBD', 'ILMN', 'MDB',
  'DLTR', 'WBA', 'MRNA', 'ENPH', 'LCID', 'SIRI', 'RIVN', 'PARA',
])

// --- Crypto ---

export const CRYPTO_TOP_20 = new Set([
  'BTC', 'ETH', 'BNB', 'XRP', 'SOL', 'ADA', 'DOGE', 'AVAX',
  'DOT', 'MATIC', 'LINK', 'SHIB', 'TRX', 'UNI', 'ATOM', 'LTC',
  'XLM', 'NEAR', 'APT', 'OP',
])

export const CRYPTO_TOP_100 = new Set([
  // Top 20
  'BTC', 'ETH', 'BNB', 'XRP', 'SOL', 'ADA', 'DOGE', 'AVAX',
  'DOT', 'MATIC', 'LINK', 'SHIB', 'TRX', 'UNI', 'ATOM', 'LTC',
  'XLM', 'NEAR', 'APT', 'OP',
  // 21-100
  'ICP', 'FIL', 'ARB', 'IMX', 'HBAR', 'VET', 'MKR', 'GRT',
  'INJ', 'THETA', 'RUNE', 'FTM', 'ALGO', 'AAVE', 'SAND', 'AXS',
  'MANA', 'SNX', 'LDO', 'CRV', 'RPL', 'COMP', 'ENS', 'CHZ',
  'GALA', 'APE', 'DYDX', 'SUSHI', 'BAT', '1INCH', 'CELO', 'ZRX',
  'MASK', 'AUDIO', 'ENJ', 'REN', 'YFI', 'BAL', 'ANKR', 'SKL',
  'ICX', 'IOTA', 'KAVA', 'ZIL', 'ONE', 'ROSE', 'FLOW', 'EGLD',
  'KSM', 'MINA', 'SUI', 'SEI', 'TIA', 'JUP', 'WLD', 'PYTH',
  'JTO', 'BONK', 'WIF', 'PEPE', 'FLOKI', 'ORDI', 'STX', 'KAS',
  'TAO', 'FET', 'RNDR', 'AGIX', 'OCEAN', 'AR', 'HNT', 'QNT',
  'XMR', 'ZEC', 'DASH', 'EOS', 'NEO', 'XTZ', 'WAVES', 'CAKE',
])
