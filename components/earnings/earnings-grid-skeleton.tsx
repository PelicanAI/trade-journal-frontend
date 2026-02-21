"use client"

export function EarningsGridSkeleton() {
  return (
    <div className="hidden md:grid grid-cols-5 gap-px bg-[var(--border-subtle)] mx-4 sm:mx-6 rounded-xl overflow-hidden border border-[var(--border-subtle)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-[var(--bg-surface)] flex flex-col min-h-[400px]">
          {/* Day header skeleton */}
          <div className="p-3 text-center border-b border-[var(--border-subtle)]">
            <div className="h-3 w-10 bg-white/5 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-5 w-14 bg-white/5 rounded mx-auto mb-1 animate-pulse" />
            <div className="h-3 w-8 bg-white/5 rounded mx-auto animate-pulse" />
          </div>
          {/* Section skeletons */}
          <div className="px-2 pt-3 space-y-3">
            <div>
              <div className="h-3 w-20 bg-white/5 rounded animate-pulse mb-2" />
              <div className="space-y-1.5">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="h-7 w-full bg-white/5 rounded-md animate-pulse" />
                ))}
              </div>
            </div>
            <div>
              <div className="h-3 w-20 bg-white/5 rounded animate-pulse mb-2" />
              <div className="space-y-1.5">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="h-7 w-full bg-white/5 rounded-md animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
