export default function SettingsLoading() {
  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-64 border-r border-[var(--border-subtle)] p-6 space-y-4">
        <div className="h-8 w-32 rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-6 space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div className="h-8 w-40 rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
          <div className="h-10 w-32 rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl p-6 space-y-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
          >
            <div className="h-6 w-48 rounded animate-pulse bg-[var(--bg-elevated)]" />
            <div className="h-4 w-full rounded animate-pulse bg-[var(--bg-elevated)]" />
            <div className="h-4 w-3/4 rounded animate-pulse bg-[var(--bg-elevated)]" />
            <div className="h-10 w-full rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
          </div>
        ))}
      </div>
    </div>
  )
}
