"use client"

import useSWR from "swr"
import type { CorrelationMatrixData, CorrelationPair, CorrelationAsset } from "@/types/correlations"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export function useCorrelationMatrix(period: '30d' | '90d' | '1y' = '30d') {
  const { data, error, isLoading, mutate } = useSWR<CorrelationMatrixData>(
    `/api/correlations/matrix?period=${period}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  )

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
    refetch: mutate,
  }
}

export function useCorrelationPair(assetA: string, assetB: string) {
  const shouldFetch = assetA && assetB
  const { data, error, isLoading } = useSWR<{ pair: CorrelationPair[]; assets: CorrelationAsset[] }>(
    shouldFetch ? `/api/correlations/pair?a=${assetA}&b=${assetB}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  return {
    data: data ?? null,
    isLoading,
    error: error ?? null,
  }
}
