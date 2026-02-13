import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createUserRateLimiter, rateLimitResponse } from "@/lib/rate-limit"
import { getAllTickers } from "@/lib/data/sp500-constituents"

export const dynamic = "force-dynamic"

const heatmapLimiter = createUserRateLimiter('heatmap', 30, '1 m')

const POLYGON_API_KEY = process.env.POLYGON_API_KEY

export interface HeatmapStock {
  ticker: string
  name: string
  sector: string
  price: number | null
  changePercent: number | null
  volume: number | null
  marketCap: number | null
}

export interface HeatmapResponse {
  stocks: HeatmapStock[]
  lastUpdated: string
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { success } = await heatmapLimiter.limit(user.id)
    if (!success) return rateLimitResponse()

    // Check cached data first (from cached_market_data table)
    const { data: cachedData } = await supabase
      .from('cached_market_data')
      .select('data, fetched_at')
      .eq('data_type', 'sp500_prices')
      .is('user_id', null) // Global cache, not user-specific
      .single()

    // If cache is less than 60 seconds old, return it
    if (cachedData?.fetched_at) {
      const cacheAge = Date.now() - new Date(cachedData.fetched_at).getTime()
      if (cacheAge < 60_000) {
        return NextResponse.json(cachedData.data, {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          },
        })
      }
    }

    // No Polygon API key - return empty/null data
    if (!POLYGON_API_KEY) {
      const emptyResponse: HeatmapResponse = {
        stocks: [],
        lastUpdated: new Date().toISOString(),
      }
      return NextResponse.json(emptyResponse)
    }

    // Fetch from Polygon.io
    const tickers = getAllTickers()

    // Polygon.io grouped daily endpoint (more efficient than individual calls)
    // This gets previous day's data for all tickers
    const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers.join(',')}&apiKey=${POLYGON_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error("Polygon.io API error:", response.status)

      // Return stale cache if available
      if (cachedData?.data) {
        return NextResponse.json(cachedData.data, {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            "X-Cache-Status": "stale",
          },
        })
      }

      return NextResponse.json(
        { error: "Failed to fetch heatmap data" },
        { status: 502 }
      )
    }

    interface PolygonTickerSnapshot {
      ticker: string
      lastTrade?: { p?: number }
      day?: { c?: number; v?: number }
      todaysChangePerc?: number
      marketCap?: number
    }

    interface PolygonSnapshotResponse {
      tickers?: PolygonTickerSnapshot[]
      status?: string
    }

    const data: PolygonSnapshotResponse = await response.json()

    // Transform Polygon response to our format
    const stocks: HeatmapStock[] = []

    if (data.tickers && Array.isArray(data.tickers)) {
      // Import constituents to get name and sector
      const { SP500_CONSTITUENTS } = await import('@/lib/data/sp500-constituents')

      data.tickers.forEach((ticker: PolygonTickerSnapshot) => {
        const constituent = SP500_CONSTITUENTS.find((c) => c.ticker === ticker.ticker)
        if (!constituent) return

        stocks.push({
          ticker: ticker.ticker,
          name: constituent.name,
          sector: constituent.sector,
          price: ticker.lastTrade?.p ?? ticker.day?.c ?? null,
          changePercent: ticker.todaysChangePerc ?? null,
          volume: ticker.day?.v ?? null,
          marketCap: ticker.marketCap ?? null,
        })
      })
    }

    const responseData: HeatmapResponse = {
      stocks,
      lastUpdated: new Date().toISOString(),
    }

    // Cache the response in Supabase
    await supabase
      .from('cached_market_data')
      .upsert({
        data_type: 'sp500_prices',
        data: responseData,
        fetched_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 300_000).toISOString(), // 5 minutes
        user_id: null, // Global cache
        cache_key: 'sp500_heatmap',
      }, {
        onConflict: 'data_type,cache_key',
      })

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    })
  } catch (error) {
    console.error("Heatmap API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
