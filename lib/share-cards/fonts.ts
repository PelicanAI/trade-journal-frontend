let geistSansData: ArrayBuffer | null = null
let geistMonoData: ArrayBuffer | null = null

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  return "http://localhost:3000"
}

export async function getGeistSans(): Promise<ArrayBuffer> {
  if (geistSansData) return geistSansData
  const res = await fetch(`${getBaseUrl()}/fonts/Geist-SemiBold.ttf`)
  if (!res.ok) throw new Error(`Failed to load Geist Sans: ${res.status}`)
  geistSansData = await res.arrayBuffer()
  return geistSansData
}

export async function getGeistMono(): Promise<ArrayBuffer> {
  if (geistMonoData) return geistMonoData
  const res = await fetch(`${getBaseUrl()}/fonts/GeistMono-Regular.ttf`)
  if (!res.ok) throw new Error(`Failed to load Geist Mono: ${res.status}`)
  geistMonoData = await res.arrayBuffer()
  return geistMonoData
}
