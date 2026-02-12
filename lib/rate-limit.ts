import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

/**
 * Rate limiter for authenticated routes — keyed by user ID.
 */
export function createUserRateLimiter(prefix: string, requests: number, window: `${number} ${"ms" | "s" | "m" | "h" | "d"}` | `${number}${"ms" | "s" | "m" | "h" | "d"}`) {
  return new Ratelimit({
    redis,
    prefix: `ratelimit:${prefix}`,
    limiter: Ratelimit.slidingWindow(requests, window),
  })
}

/**
 * Rate limiter for unauthenticated routes — keyed by IP.
 */
export function createIpRateLimiter(prefix: string, requests: number, window: `${number} ${"ms" | "s" | "m" | "h" | "d"}` | `${number}${"ms" | "s" | "m" | "h" | "d"}`) {
  return new Ratelimit({
    redis,
    prefix: `ratelimit:${prefix}`,
    limiter: Ratelimit.slidingWindow(requests, window),
  })
}

/**
 * Extract client IP from request headers (works on Vercel)
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

/**
 * Standard rate limit exceeded response
 */
export function rateLimitResponse() {
  return new Response(
    JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  )
}
