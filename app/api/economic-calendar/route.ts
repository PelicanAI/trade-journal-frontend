import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createUserRateLimiter, rateLimitResponse } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const calendarLimiter = createUserRateLimiter('economic_calendar', 20, '1 m')

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

export interface EconomicEvent {
  event: string
  country: string
  date: string       // "2026-02-13"
  time: string       // "08:30" or ""
  impact: "low" | "medium" | "high"
  actual: number | null
  estimate: number | null
  prior: number | null
  unit: string       // "%" or ""
}

export interface EconomicCalendarResponse {
  events: EconomicEvent[]
  lastUpdated: string
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { success } = await calendarLimiter.limit(user.id)
    if (!success) return rateLimitResponse()

    const searchParams = request.nextUrl.searchParams
    const from = searchParams.get('from') || new Date().toISOString().split('T')[0]
    const to = searchParams.get('to') || (() => {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      return d.toISOString().split('T')[0]
    })()

    // Check cache
    const cacheKey = `economic_${from}_${to}`
    const { data: cachedData } = await supabase
      .from('cached_market_data')
      .select('data, fetched_at')
      .eq('data_type', 'economic_calendar')
      .eq('cache_key', cacheKey)
      .is('user_id', null)
      .single()

    if (cachedData?.fetched_at) {
      const cacheAge = Date.now() - new Date(cachedData.fetched_at).getTime()
      if (cacheAge < 3600_000) {
        return NextResponse.json(cachedData.data, {
          headers: { "Cache-Control": "public, s-maxage=3600" },
        })
      }
    }

    if (!FINNHUB_API_KEY) {
      return NextResponse.json({ events: [], lastUpdated: new Date().toISOString() })
    }

    const url = `https://finnhub.io/api/v1/calendar/economic?from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      if (cachedData?.data) return NextResponse.json(cachedData.data)
      return NextResponse.json({ error: "Failed to fetch economic calendar" }, { status: 502 })
    }

    interface FinnhubEconomicEvent {
      event?: string
      country?: string
      date?: string
      time?: string
      impact?: number
      actual?: number | null
      estimate?: number | null
      prior?: number | null
      unit?: string
    }

    interface FinnhubEconomicResponse {
      economicCalendar?: FinnhubEconomicEvent[]
    }

    const data: FinnhubEconomicResponse = await response.json()

    const events: EconomicEvent[] = (data.economicCalendar || [])
      .filter((e) => e.country === 'US')  // US events only
      .map((e) => ({
        event: e.event || '',
        country: e.country || 'US',
        date: e.date || '',
        time: e.time || '',
        impact: (e.impact === 3 ? 'high' : e.impact === 2 ? 'medium' : 'low') as 'low' | 'medium' | 'high',
        actual: e.actual ?? null,
        estimate: e.estimate ?? null,
        prior: e.prior ?? null,
        unit: e.unit || '',
      }))

    const responseData: EconomicCalendarResponse = {
      events,
      lastUpdated: new Date().toISOString(),
    }

    // Cache
    await supabase
      .from('cached_market_data')
      .upsert({
        data_type: 'economic_calendar',
        data: responseData,
        fetched_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600_000).toISOString(),
        user_id: null,
        cache_key: cacheKey,
      }, { onConflict: 'data_type,cache_key' })

    return NextResponse.json(responseData, {
      headers: { "Cache-Control": "public, s-maxage=3600" },
    })
  } catch (error) {
    console.error("Economic calendar error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
