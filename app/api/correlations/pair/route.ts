import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const assetA = searchParams.get('a')
  const assetB = searchParams.get('b')

  if (!assetA || !assetB) {
    return NextResponse.json({ error: 'Missing a or b param' }, { status: 400 })
  }

  const [pairData, assetDetails] = await Promise.all([
    supabase
      .from('correlation_cache')
      .select('*')
      .or(
        `and(asset_a.eq.${assetA},asset_b.eq.${assetB}),and(asset_a.eq.${assetB},asset_b.eq.${assetA})`,
      ),
    supabase
      .from('correlation_assets')
      .select('*')
      .in('ticker', [assetA, assetB]),
  ])

  if (pairData.error) {
    return NextResponse.json({ error: pairData.error.message }, { status: 500 })
  }

  return NextResponse.json({
    pair: pairData.data || [],
    assets: assetDetails.data || [],
  })
}
