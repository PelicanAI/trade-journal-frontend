import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || '30d'

  const [correlations, assets, regime] = await Promise.all([
    supabase
      .from('correlation_cache')
      .select('*')
      .eq('period', period)
      .order('asset_a'),
    supabase
      .from('correlation_assets')
      .select('*')
      .eq('is_active', true)
      .order('sort_order'),
    supabase
      .from('market_regimes')
      .select('*')
      .order('regime_date', { ascending: false })
      .limit(1)
      .single(),
  ])

  if (correlations.error || assets.error) {
    return NextResponse.json(
      { error: correlations.error?.message || assets.error?.message },
      { status: 500 },
    )
  }

  return NextResponse.json({
    correlations: correlations.data || [],
    assets: assets.data || [],
    regime: regime.data || null,
    period,
  })
}
