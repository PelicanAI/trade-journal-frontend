import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createIpRateLimiter, getClientIp, rateLimitResponse } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const limiter = createIpRateLimiter('waitlist', 10, '1 h')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const { success } = await limiter.limit(getClientIp(req))
    if (!success) return rateLimitResponse()

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const source = typeof body.source === 'string' ? body.source : 'signup_closed'
    const referral_code =
      typeof body.referral_code === 'string' &&
      body.referral_code.length > 0 &&
      body.referral_code.length <= 100
        ? body.referral_code
        : null

    if (!name || name.length > 100) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email) || email.length > 255) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('waitlist')
      .upsert(
        { email, name, source, referral_code },
        { onConflict: 'email', ignoreDuplicates: false }
      )

    if (error) {
      console.error('[waitlist] insert failed', error)
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] unexpected', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
