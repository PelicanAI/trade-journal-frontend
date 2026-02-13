import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createUserRateLimiter, rateLimitResponse } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const tickerSearchLimiter = createUserRateLimiter('ticker-search', 60, '1 m')

const POLYGON_API_KEY = process.env.POLYGON_API_KEY

// Static fallback for common tickers when Polygon API is unavailable
const COMMON_TICKERS: TickerSearchResult[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'MSFT', name: 'Microsoft Corporation', type: 'CS', market: 'stocks', active: true },
  { ticker: 'GOOGL', name: 'Alphabet Inc. Class A', type: 'CS', market: 'stocks', active: true },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', type: 'CS', market: 'stocks', active: true },
  { ticker: 'META', name: 'Meta Platforms Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'TSLA', name: 'Tesla Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'AMD', name: 'Advanced Micro Devices Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'NFLX', name: 'Netflix Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'ETF', market: 'stocks', active: true },
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', market: 'stocks', active: true },
  { ticker: 'DIA', name: 'SPDR Dow Jones Industrial Average ETF', type: 'ETF', market: 'stocks', active: true },
  { ticker: 'IWM', name: 'iShares Russell 2000 ETF', type: 'ETF', market: 'stocks', active: true },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market ETF', type: 'ETF', market: 'stocks', active: true },
  { ticker: 'GOOG', name: 'Alphabet Inc. Class C', type: 'CS', market: 'stocks', active: true },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway Inc. Class B', type: 'CS', market: 'stocks', active: true },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'V', name: 'Visa Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'JNJ', name: 'Johnson & Johnson', type: 'CS', market: 'stocks', active: true },
  { ticker: 'WMT', name: 'Walmart Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'PG', name: 'Procter & Gamble Co.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'MA', name: 'Mastercard Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'UNH', name: 'UnitedHealth Group Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'HD', name: 'The Home Depot Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'BAC', name: 'Bank of America Corp.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'DIS', name: 'The Walt Disney Company', type: 'CS', market: 'stocks', active: true },
  { ticker: 'INTC', name: 'Intel Corporation', type: 'CS', market: 'stocks', active: true },
  { ticker: 'CSCO', name: 'Cisco Systems Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'PYPL', name: 'PayPal Holdings Inc.', type: 'CS', market: 'stocks', active: true },
  { ticker: 'ORCL', name: 'Oracle Corporation', type: 'CS', market: 'stocks', active: true },
]

export interface TickerSearchResult {
  ticker: string
  name: string
  type: string
  market: string
  active: boolean
}

export interface TickerSearchResponse {
  results: TickerSearchResult[]
  count: number
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { success } = await tickerSearchLimiter.limit(user.id)
    if (!success) return rateLimitResponse()

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

    if (!query || query.length < 1) {
      return NextResponse.json({
        results: [],
        count: 0,
      })
    }

    // No Polygon API key - use static fallback
    if (!POLYGON_API_KEY) {
      const upperQuery = query.toUpperCase()
      const filtered = COMMON_TICKERS.filter(
        t => t.ticker.includes(upperQuery) || t.name.toUpperCase().includes(upperQuery)
      ).slice(0, limit)

      // Allow any 1-5 character uppercase string as a valid ticker
      if (filtered.length === 0 && /^[A-Z]{1,5}$/.test(upperQuery)) {
        filtered.push({
          ticker: upperQuery,
          name: `${upperQuery} (Custom)`,
          type: 'CS',
          market: 'stocks',
          active: true,
        })
      }

      return NextResponse.json({
        results: filtered,
        count: filtered.length,
      })
    }

    // Search using Polygon.io reference tickers endpoint
    const url = `https://api.polygon.io/v3/reference/tickers?search=${encodeURIComponent(query)}&active=true&market=stocks&limit=${limit}&apiKey=${POLYGON_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error("Polygon.io ticker search error:", response.status)
      // Fallback to static list on API failure
      const upperQuery = query.toUpperCase()
      const filtered = COMMON_TICKERS.filter(
        t => t.ticker.includes(upperQuery) || t.name.toUpperCase().includes(upperQuery)
      ).slice(0, limit)

      // Allow any 1-5 character uppercase string as a valid ticker
      if (filtered.length === 0 && /^[A-Z]{1,5}$/.test(upperQuery)) {
        filtered.push({
          ticker: upperQuery,
          name: `${upperQuery} (Custom)`,
          type: 'CS',
          market: 'stocks',
          active: true,
        })
      }

      return NextResponse.json({
        results: filtered,
        count: filtered.length,
      })
    }

    interface PolygonTickerResult {
      ticker: string
      name: string
      type: string
      market: string
      active: boolean
    }

    interface PolygonTickersResponse {
      results?: PolygonTickerResult[]
      count?: number
      status?: string
    }

    const data: PolygonTickersResponse = await response.json()

    const results: TickerSearchResult[] = (data.results || []).map((ticker) => ({
      ticker: ticker.ticker,
      name: ticker.name,
      type: ticker.type,
      market: ticker.market,
      active: ticker.active,
    }))

    return NextResponse.json(
      {
        results,
        count: data.count || results.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    )
  } catch (error) {
    console.error("Ticker search API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
