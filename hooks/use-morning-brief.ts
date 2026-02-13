"use client"

import useSWR from "swr"
import { Trade } from "./use-trades"

export interface Mover {
  ticker: string
  name: string
  price: number
  changePercent: number
  volume: number
}

export interface MoversData {
  gainers: Mover[]
  losers: Mover[]
  active: Mover[]
}

export interface UseMorningBriefReturn {
  movers: MoversData
  openPositions: Trade[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook for fetching morning brief data
 * Combines market movers and user's open positions
 */
export function useMorningBrief(): UseMorningBriefReturn {
  const { data: movers, error: moversError, isLoading: moversLoading, mutate: mutateMovers } = useSWR<MoversData>(
    '/api/brief/movers',
    async (url) => {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch movers')
      return response.json()
    },
    {
      refreshInterval: 300000, // 5 minutes
      revalidateOnFocus: false,
    }
  )

  // For open positions, we'll fetch from trades directly in the component
  // since we already have the useTrades hook

  return {
    movers: movers || { gainers: [], losers: [], active: [] },
    openPositions: [], // Populated by parent component
    isLoading: moversLoading,
    error: moversError ?? null,
    refetch: mutateMovers,
  }
}
