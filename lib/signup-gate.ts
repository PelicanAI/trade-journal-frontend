export function isSignupClosed(): boolean {
  return process.env.NEXT_PUBLIC_SIGNUP_CLOSED === 'true'
}

export function getSignupCutoff(): Date | null {
  const raw = process.env.SIGNUP_CUTOFF_TIMESTAMP
  if (!raw) return null
  const d = new Date(raw)
  return isNaN(d.getTime()) ? null : d
}

export function isUserPostCutoff(userCreatedAt: string): boolean {
  const cutoff = getSignupCutoff()
  if (!cutoff) return false
  return new Date(userCreatedAt) > cutoff
}
