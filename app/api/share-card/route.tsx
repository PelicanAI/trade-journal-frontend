import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { getGeistSans, getGeistMono } from "@/lib/share-cards/fonts"
import { TradeRecapCard } from "@/lib/share-cards/trade-recap"
import { PelicanInsightCard } from "@/lib/share-cards/pelican-insight"
import { StatsTableCard } from "@/lib/share-cards/stats-table"
import { createClient } from "@/lib/supabase/server"

function getFonts(geistSans: ArrayBuffer, geistMono: ArrayBuffer) {
  return [
    { name: "Geist Sans", data: geistSans, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: geistMono, weight: 400 as const, style: "normal" as const },
  ]
}

function getDimensions(format: string) {
  return format === "square" ? { width: 1080, height: 1080 } : { width: 1200, height: 630 }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const format = searchParams.get("format") || "og"

    const dimensions = getDimensions(format)
    const [geistSans, geistMono] = await Promise.all([getGeistSans(), getGeistMono()])

    let cardContent: React.ReactElement

    switch (type) {
      case "trade-recap": {
        const tradeId = searchParams.get("tradeId")
        if (!tradeId) return new Response("Missing tradeId", { status: 400 })

        const supabase = await createClient()
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()
        if (authError || !user) {
          return new Response("Unauthorized", { status: 401 })
        }

        const { data: trade, error: tradeError } = await supabase
          .from("trades")
          .select("*")
          .eq("id", tradeId)
          .eq("user_id", user.id)
          .single()

        if (tradeError || !trade) {
          return new Response("Trade not found", { status: 404 })
        }

        cardContent = <TradeRecapCard trade={trade} />
        break
      }

      case "pelican-insight": {
        const headline = searchParams.get("headline")
        const tickers = searchParams.get("tickers")?.split(",").filter(Boolean) || []

        if (!headline) return new Response("Missing headline", { status: 400 })

        cardContent = <PelicanInsightCard headline={headline} tickers={tickers} />
        break
      }

      case "stats-table": {
        const supabase = await createClient()
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()
        if (authError || !user) {
          return new Response("Unauthorized", { status: 401 })
        }

        const period = searchParams.get("period") || "All Time"

        const { data: stats, error: statsError } = await supabase.rpc("get_trade_stats", {
          p_is_paper: null,
        })

        if (statsError || !stats) {
          return new Response("Failed to load stats", { status: 500 })
        }

        cardContent = (
          <StatsTableCard period={period} stats={stats} />
        )
        break
      }

      default:
        return new Response("Invalid card type", { status: 400 })
    }

    return new ImageResponse(cardContent, {
      ...dimensions,
      fonts: getFonts(geistSans, geistMono),
    })
  } catch (error) {
    console.error("Share card generation error:", error)
    return new Response("Failed to generate card", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, format } = body

    const dimensions = getDimensions(format || "og")
    const [geistSans, geistMono] = await Promise.all([getGeistSans(), getGeistMono()])

    let cardContent: React.ReactElement

    switch (type) {
      case "pelican-insight": {
        const { headline, tickers } = body
        if (!headline) return new Response("Missing headline", { status: 400 })
        cardContent = <PelicanInsightCard headline={headline} tickers={tickers || []} />
        break
      }

      case "stats-table": {
        const { period, stats } = body
        if (!stats) return new Response("Missing stats", { status: 400 })
        cardContent = (
          <StatsTableCard period={period || "All Time"} stats={stats} />
        )
        break
      }

      default:
        return new Response("POST supports pelican-insight and stats-table", { status: 400 })
    }

    return new ImageResponse(cardContent, {
      ...dimensions,
      fonts: getFonts(geistSans, geistMono),
    })
  } catch (error) {
    console.error("Share card POST error:", error)
    return new Response("Failed to generate card", { status: 500 })
  }
}
