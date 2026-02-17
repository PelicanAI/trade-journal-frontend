export interface CorrelationAsset {
  ticker: string
  display_name: string
  asset_class: 'index' | 'sector_etf' | 'commodity' | 'bond_etf' | 'currency' | 'crypto' | 'volatility'
  category: 'broad_market' | 'tech' | 'safe_haven' | 'risk_appetite' | 'real_assets' | 'credit' | 'growth_proxy' | 'currency_pair' | 'volatility_gauge'
  polygon_ticker: string
  ticker_type: 'index' | 'equity' | 'forex' | 'crypto'
  description: string
  sort_order: number
  is_active: boolean
}

export interface CorrelationPair {
  id: string
  asset_a: string
  asset_b: string
  period: '30d' | '90d' | '1y'
  correlation: number
  z_score: number
  historical_mean: number
  historical_std: number
  rolling_data: { date: string; value: number }[]
  regime: 'normal' | 'elevated' | 'breakdown' | 'inversion'
  calculated_at: string
}

export interface MarketRegime {
  id: string
  regime_date: string
  overall_regime: 'risk_on' | 'risk_off' | 'correlation_breakdown' | 'rotation' | 'neutral'
  regime_score: number
  signals: { signal: string; detail: string }[]
  calculated_at: string
}

export interface CorrelationMatrixData {
  correlations: CorrelationPair[]
  assets: CorrelationAsset[]
  regime: MarketRegime | null
  period: string
}

export interface CorrelationSignalDef {
  name: string
  pair: [string, string]
  importance: 'critical' | 'important' | 'informational'
  description: string
  bullish_when: string
  bearish_when: string
  beginner_explanation: string
  historical_events: { date: string; description: string }[]
}
