export default function ProfileLoading() {
  return (
    <div className="min-h-screen p-6 bg-[var(--bg-base)]">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Avatar + name skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full animate-pulse bg-[var(--bg-elevated)]" />
          <div className="space-y-2">
            <div className="h-6 w-40 rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
            <div className="h-4 w-56 rounded animate-pulse bg-[var(--bg-elevated)]" />
          </div>
        </div>

        {/* Form fields skeleton */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 rounded animate-pulse bg-[var(--bg-elevated)]" />
            <div className="h-10 w-full rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
          </div>
        ))}

        <div className="h-10 w-32 rounded-lg animate-pulse bg-[var(--bg-elevated)]" />
      </div>
    </div>
  )
}
