"use client"

import useSWR from "swr"
import { createClient } from "@/lib/supabase/client"
import { useMemo } from "react"

export interface Trade {
  id: string
  user_id: string
  ticker: string
  asset_type: string
  direction: 'long' | 'short'
  quantity: number
  entry_price: number
  exit_price: number | null
  stop_loss: number | null
  take_profit: number | null
  status: 'open' | 'closed' | 'cancelled'
  pnl_amount: number | null
  pnl_percent: number | null
  r_multiple: number | null
  entry_date: string
  exit_date: string | null
  thesis: string | null
  notes: string | null
  setup_tags: string[] | null
  conviction: number | null
  ai_grade: Record<string, unknown> | null
  is_paper: boolean
  created_at: string
  updated_at: string
}

export interface TradeFormData {
  ticker: string
  asset_type?: string
  direction: 'long' | 'short'
  quantity: number
  entry_price: number
  stop_loss?: number | null
  take_profit?: number | null
  entry_date: string
  thesis?: string | null
  notes?: string | null
  setup_tags?: string[]
  conviction?: number | null
  is_paper?: boolean
}

export interface CloseTradeData {
  exit_price: number
  exit_date: string
  notes?: string | null
}

export interface UseTradesReturn {
  trades: Trade[]
  openTrades: Trade[]
  closedTrades: Trade[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  logTrade: (data: TradeFormData) => Promise<Trade | null>
  closeTrade: (tradeId: string, data: CloseTradeData) => Promise<boolean>
  updateTrade: (tradeId: string, updates: Partial<Trade>) => Promise<boolean>
  deleteTrade: (tradeId: string) => Promise<boolean>
}

/**
 * Hook for managing trades
 *
 * Provides CRUD operations for trades and real-time updates via SWR
 */
export function useTrades({
  status,
  isPaper,
}: {
  status?: 'open' | 'closed' | 'cancelled'
  isPaper?: boolean
} = {}): UseTradesReturn {
  const supabase = useMemo(() => createClient(), [])

  const { data, error, isLoading, mutate } = useSWR<Trade[]>(
    ['trades', status, isPaper],
    async () => {
      let query = supabase
        .from('trades')
        .select('*')
        .order('entry_date', { ascending: false })

      if (status) {
        query = query.eq('status', status)
      }

      if (isPaper !== undefined) {
        query = query.eq('is_paper', isPaper)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Trade[]
    },
    {
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  )

  const trades = data || []
  const openTrades = trades.filter((t) => t.status === 'open')
  const closedTrades = trades.filter((t) => t.status === 'closed')

  const logTrade = async (tradeData: TradeFormData): Promise<Trade | null> => {
    try {
      const { data, error } = await supabase
        .from('trades')
        .insert({
          ticker: tradeData.ticker.toUpperCase(),
          asset_type: tradeData.asset_type || 'stock',
          direction: tradeData.direction,
          quantity: tradeData.quantity,
          entry_price: tradeData.entry_price,
          stop_loss: tradeData.stop_loss,
          take_profit: tradeData.take_profit,
          entry_date: tradeData.entry_date,
          thesis: tradeData.thesis,
          notes: tradeData.notes,
          setup_tags: tradeData.setup_tags || [],
          conviction: tradeData.conviction,
          is_paper: tradeData.is_paper ?? false,
          status: 'open',
        })
        .select()
        .single()

      if (error) throw error

      // Revalidate trades
      mutate()

      return data as Trade
    } catch (error) {
      console.error('Error logging trade:', error)
      return null
    }
  }

  const closeTrade = async (tradeId: string, closeData: CloseTradeData): Promise<boolean> => {
    try {
      // Call the close_trade RPC function
      const { data, error } = await supabase.rpc('close_trade', {
        p_trade_id: tradeId,
        p_exit_price: closeData.exit_price,
        p_exit_date: closeData.exit_date,
        p_notes: closeData.notes || null,
      })

      if (error) throw error

      // Revalidate trades
      mutate()

      return true
    } catch (error) {
      console.error('Error closing trade:', error)
      return false
    }
  }

  const updateTrade = async (tradeId: string, updates: Partial<Trade>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('trades')
        .update(updates)
        .eq('id', tradeId)

      if (error) throw error

      // Revalidate trades
      mutate()

      return true
    } catch (error) {
      console.error('Error updating trade:', error)
      return false
    }
  }

  const deleteTrade = async (tradeId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', tradeId)

      if (error) throw error

      // Revalidate trades
      mutate()

      return true
    } catch (error) {
      console.error('Error deleting trade:', error)
      return false
    }
  }

  return {
    trades,
    openTrades,
    closedTrades,
    isLoading,
    error: error ?? null,
    refetch: mutate,
    logTrade,
    closeTrade,
    updateTrade,
    deleteTrade,
  }
}
