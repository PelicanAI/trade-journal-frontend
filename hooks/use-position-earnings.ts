"use client"

import useSWR from "swr"
import { useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/lib/providers/auth-provider"

// ============================================================================
// Types
// ============================================================================

export interface PositionEarningsWarning {
  ticker: string
  direction: string
  entry_price: number
  position_size_usd: number | null
  days_until_earnings: number
  earnings_date: string
  earnings_hour: string
  eps_estimate: number | null
  revenue_estimate: number | null
}

export interface PositionEarningsData {
  warnings: PositionEarningsWarning[]
  count: number
}

// ============================================================================
// Hook
// ============================================================================

export function usePositionEarnings(): {
  warnings: PositionEarningsWarning[]
  count: number
  isLoading: boolean
  error: Error | null
} {
  const supabase = useMemo(() => createClient(), [])
  const { user } = useAuth()

  const { data, error, isLoading } = useSWR<PositionEarningsData>(
    user ? ["position-earnings-warnings", user.id] : null,
    async () => {
      const { data, error } = await supabase.rpc(
        "get_position_earnings_warnings",
        { p_user_id: user!.id }
      )

      if (error) throw error
      if (!data) return { warnings: [], count: 0 }
      return data as PositionEarningsData
    },
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
      dedupingInterval: 120000,
      shouldRetryOnError: false,
    }
  )

  return {
    warnings: data?.warnings ?? [],
    count: data?.count ?? 0,
    isLoading,
    error: error ?? null,
  }
}
