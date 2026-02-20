'use client'

import useSWR from 'swr'
import type { MarketPulseResponse } from '@/app/api/market/pulse/route'

const fetcher = (url: string) => fetch(url).then(r => {
  if (!r.ok) throw new Error('Failed to fetch market pulse')
  return r.json()
})

export function useMarketPulse() {
  const { data, error, isLoading } = useSWR<MarketPulseResponse>(
    '/api/market/pulse',
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: false,
      dedupingInterval: 15000,
    }
  )

  return { data, error, isLoading }
}
