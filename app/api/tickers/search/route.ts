import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createUserRateLimiter, rateLimitResponse } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const tickerSearchLimiter = createUserRateLimiter('ticker-search', 60, '1 m')

const POLYGON_API_KEY = process.env.POLYGON_API_KEY

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

    // No Polygon API key - return empty results
    if (!POLYGON_API_KEY) {
      return NextResponse.json({
        results: [],
        count: 0,
      })
    }

    // Search using Polygon.io reference tickers endpoint
    const url = `https://api.polygon.io/v3/reference/tickers?search=${encodeURIComponent(query)}&active=true&market=stocks&limit=${limit}&apiKey=${POLYGON_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error("Polygon.io ticker search error:", response.status)
      return NextResponse.json(
        { error: "Failed to search tickers" },
        { status: 502 }
      )
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
