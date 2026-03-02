import { readFile } from "node:fs/promises"
import { join } from "node:path"

let geistSansData: ArrayBuffer | null = null
let geistMonoData: ArrayBuffer | null = null

export async function getGeistSans(): Promise<ArrayBuffer> {
  if (geistSansData) return geistSansData
  const fontPath = join(process.cwd(), "node_modules", "geist", "dist", "fonts", "geist-sans", "Geist-SemiBold.ttf")
  const buf = await readFile(fontPath)
  geistSansData = new Uint8Array(buf).buffer as ArrayBuffer
  return geistSansData
}

export async function getGeistMono(): Promise<ArrayBuffer> {
  if (geistMonoData) return geistMonoData
  const fontPath = join(process.cwd(), "node_modules", "geist", "dist", "fonts", "geist-mono", "GeistMono-Regular.ttf")
  const buf = await readFile(fontPath)
  geistMonoData = new Uint8Array(buf).buffer as ArrayBuffer
  return geistMonoData
}
