import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { getGeistSans, getGeistMono } from "@/lib/share-cards/fonts"
import { TradeRecapCard } from "@/lib/share-cards/trade-recap"
import { PelicanInsightCard } from "@/lib/share-cards/pelican-insight"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type")
    const format = searchParams.get("format") || "og"

    const dimensions =
      format === "square" ? { width: 1080, height: 1080 } : { width: 1200, height: 630 }

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

      default:
        return new Response("Invalid card type", { status: 400 })
    }

    return new ImageResponse(cardContent, {
      ...dimensions,
      fonts: [
        { name: "Geist Sans", data: geistSans, weight: 600 as const, style: "normal" as const },
        { name: "Geist Mono", data: geistMono, weight: 400 as const, style: "normal" as const },
      ],
    })
  } catch (error) {
    console.error("Share card generation error:", error)
    return new Response("Failed to generate card", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, headline, tickers, format } = body

    if (type !== "pelican-insight") {
      return new Response("POST only supports pelican-insight", { status: 400 })
    }

    if (!headline) return new Response("Missing headline", { status: 400 })

    const dimensions =
      format === "square" ? { width: 1080, height: 1080 } : { width: 1200, height: 630 }

    const [geistSans, geistMono] = await Promise.all([getGeistSans(), getGeistMono()])

    return new ImageResponse(
      <PelicanInsightCard headline={headline} tickers={tickers || []} />,
      {
        ...dimensions,
        fonts: [
          { name: "Geist Sans", data: geistSans, weight: 600 as const, style: "normal" as const },
          { name: "Geist Mono", data: geistMono, weight: 400 as const, style: "normal" as const },
        ],
      }
    )
  } catch (error) {
    console.error("Share card POST error:", error)
    return new Response("Failed to generate card", { status: 500 })
  }
}
