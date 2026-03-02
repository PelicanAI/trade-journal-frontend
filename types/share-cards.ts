import type { Trade } from "@/hooks/use-trades"

export type ShareCardTrade = Pick<
  Trade,
  | "id"
  | "ticker"
  | "direction"
  | "asset_type"
  | "entry_price"
  | "exit_price"
  | "pnl_amount"
  | "pnl_percent"
  | "r_multiple"
  | "entry_date"
  | "exit_date"
  | "ai_grade"
  | "setup_tags"
>

export interface InsightCardData {
  headline: string
  tickers: string[]
}

export interface StatsTableData {
  period: string
  stats: {
    total_trades: number
    win_rate: number
    total_pnl: number
    profit_factor: number
    avg_r_multiple: number
    largest_win: number
    largest_loss: number
    expectancy: number
  }
}

export type ShareFormat = "og" | "square"
export type ShareCardType = "trade-recap" | "pelican-insight" | "stats-table"
