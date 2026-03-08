import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createUserRateLimiter, rateLimitResponse } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const limiter = createUserRateLimiter('trade-import', 10, '1 h')

const VALID_ASSET_TYPES = [
  'stock', 'option', 'future', 'forex', 'crypto', 'etf', 'other',
] as const

const validAssetTypes = new Set<string>(VALID_ASSET_TYPES)

interface ImportRow {
  ticker: string
  asset_type?: string
  direction: 'long' | 'short'
  quantity: number
  entry_price: number
  exit_price?: number | null
  stop_loss?: number | null
  take_profit?: number | null
  entry_date: string
  exit_date?: string | null
  notes?: string | null
  commission?: number | null
}

interface RowError {
  row: number
  message: string
}

function calculatePnl(row: ImportRow): number | null {
  if (!row.exit_price || row.exit_price <= 0) return null
  const directionMultiplier = row.direction === 'long' ? 1 : -1
  return (
    (row.exit_price - row.entry_price) *
      row.quantity *
      directionMultiplier -
    (row.commission || 0)
  )
}

function calculatePnlPercent(row: ImportRow): number | null {
  if (!row.exit_price || row.exit_price <= 0) return null
  const directionMultiplier = row.direction === 'long' ? 1 : -1
  return (
    ((row.exit_price - row.entry_price) / row.entry_price) *
    100 *
    directionMultiplier
  )
}

function validateRow(row: unknown, index: number): { valid: boolean; error?: string } {
  if (!row || typeof row !== 'object') {
    return { valid: false, error: `Row ${index}: invalid data` }
  }

  const r = row as Record<string, unknown>

  // ticker: required, string, <=20 chars
  if (!r.ticker || typeof r.ticker !== 'string' || r.ticker.trim().length === 0) {
    return { valid: false, error: `Row ${index}: ticker is required` }
  }
  if (r.ticker.trim().length > 20) {
    return { valid: false, error: `Row ${index}: ticker must be 20 characters or fewer` }
  }

  // direction: must be 'long' or 'short'
  if (r.direction !== 'long' && r.direction !== 'short') {
    return { valid: false, error: `Row ${index}: direction must be 'long' or 'short'` }
  }

  // quantity: must be number > 0
  if (typeof r.quantity !== 'number' || r.quantity <= 0) {
    return { valid: false, error: `Row ${index}: quantity must be a positive number` }
  }

  // entry_price: must be number > 0
  if (typeof r.entry_price !== 'number' || r.entry_price <= 0) {
    return { valid: false, error: `Row ${index}: entry_price must be a positive number` }
  }

  // entry_date: must be non-empty string
  if (!r.entry_date || typeof r.entry_date !== 'string' || r.entry_date.trim().length === 0) {
    return { valid: false, error: `Row ${index}: entry_date is required` }
  }

  // asset_type: if provided, must be valid
  if (
    r.asset_type !== undefined &&
    r.asset_type !== null &&
    typeof r.asset_type === 'string' &&
    r.asset_type.trim().length > 0 &&
    !validAssetTypes.has(r.asset_type)
  ) {
    return {
      valid: false,
      error: `Row ${index}: asset_type must be one of: ${VALID_ASSET_TYPES.join(', ')}`,
    }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  let importId: string | null = null
  let supabase: Awaited<ReturnType<typeof createClient>> | null = null

  try {
    supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { success: rateLimitOk } = await limiter.limit(user.id)
    if (!rateLimitOk) return rateLimitResponse()

    const body = await request.json()
    const rows = body?.rows

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { error: 'Request body must contain a "rows" array' },
        { status: 400 }
      )
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'rows array must not be empty' },
        { status: 400 }
      )
    }

    if (rows.length > 500) {
      return NextResponse.json(
        { error: 'Maximum 500 rows per import' },
        { status: 400 }
      )
    }

    // Create import record
    const { data: importRecord, error: importError } = await supabase
      .from('trade_imports')
      .insert({
        user_id: user.id,
        source_name: body.broker || 'csv_import',
        file_name: body.fileName || null,
        total_rows: rows.length,
        status: 'processing',
      })
      .select('id')
      .single()

    if (importError || !importRecord) {
      return NextResponse.json(
        { error: 'Failed to create import record' },
        { status: 500 }
      )
    }

    importId = importRecord.id

    // Validate rows
    const errors: RowError[] = []
    const validRows: ImportRow[] = []

    for (let i = 0; i < rows.length; i++) {
      const result = validateRow(rows[i], i)
      if (!result.valid) {
        errors.push({ row: i, message: result.error! })
      } else {
        validRows.push(rows[i] as ImportRow)
      }
    }

    let successCount = 0

    if (validRows.length > 0) {
      const tradesToInsert = validRows.map((row) => ({
        user_id: user.id,
        ticker: row.ticker.trim().toUpperCase(),
        asset_type: row.asset_type && validAssetTypes.has(row.asset_type)
          ? row.asset_type
          : 'stock',
        direction: row.direction,
        quantity: row.quantity,
        entry_price: row.entry_price,
        exit_price: row.exit_price || null,
        stop_loss: row.stop_loss || null,
        take_profit: row.take_profit || null,
        entry_date: row.entry_date,
        exit_date: row.exit_date || null,
        notes: row.notes || null,
        commission: row.commission || null,
        source: 'import' as const,
        import_batch_id: importId,
        position_size_usd: row.entry_price * row.quantity,
        status: row.exit_price && row.exit_price > 0
          ? 'closed' as const
          : 'open' as const,
        pnl_amount: calculatePnl(row),
        pnl_percent: calculatePnlPercent(row),
      }))

      const { data: inserted, error: insertError } = await supabase
        .from('trades')
        .insert(tradesToInsert)
        .select('id')

      if (insertError) {
        errors.push({ row: -1, message: `Bulk insert failed: ${insertError.message}` })
      } else {
        successCount = inserted?.length ?? 0
      }
    }

    // Update import record
    await supabase
      .from('trade_imports')
      .update({
        imported_rows: successCount,
        failed_rows: errors.length,
        error_log: errors.slice(0, 50),
        status: successCount > 0 ? 'completed' : 'failed',
      })
      .eq('id', importId)

    return NextResponse.json({
      import_id: importId,
      total: rows.length,
      imported: successCount,
      failed: errors.length,
      errors: errors.slice(0, 20),
    })
  } catch (err) {
    const message =
      process.env.NODE_ENV === 'development'
        ? (err instanceof Error ? err.message : 'Import failed')
        : 'Import failed'

    // Try to update import record on failure
    if (importId && supabase) {
      try {
        await supabase
          .from('trade_imports')
          .update({
            status: 'failed',
            error_log: [{ row: -1, message }],
          })
          .eq('id', importId)
      } catch {
        // Best-effort update
      }
    }

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
