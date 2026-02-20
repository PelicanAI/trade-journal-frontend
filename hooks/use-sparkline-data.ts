import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useSparklineData(tickers: string[]) {
  const key =
    tickers.length > 0
      ? `/api/market/sparklines?tickers=${tickers.join(',')}`
      : null

  const { data, error, isLoading } = useSWR(key, fetcher, {
    refreshInterval: 300000, // 5 min refresh
    dedupingInterval: 60000, // 1 min dedup
  })

  return {
    sparklines: (data?.sparklines || {}) as Record<string, number[]>,
    isLoading,
    error,
  }
}
