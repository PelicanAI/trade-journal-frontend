"use client"

import { useState } from "react"

export function LogoImg({ symbol, size = 16 }: { symbol: string; size?: number }) {
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  return (
    <img
      src={`https://api.elbstream.com/logos/symbol/${symbol}?format=png&size=50`}
      alt=""
      className="rounded-sm object-contain flex-shrink-0"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setHidden(true)}
    />
  )
}
