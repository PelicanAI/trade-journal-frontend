"use client"

import { cn } from "@/lib/utils"

export function PelicanCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)]",
        "bg-[var(--bg-surface)] backdrop-blur-md transition-all duration-300",
        hover && "hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </div>
  )
}
