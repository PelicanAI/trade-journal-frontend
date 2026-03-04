export default function StrategyDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-[var(--bg-base)] min-h-screen">
      <div className="h-6 w-32 rounded-lg animate-pulse mb-6 bg-[var(--bg-surface)]" />
      <div className="h-10 w-96 rounded-lg animate-pulse mb-2 bg-[var(--bg-surface)]" />
      <div className="h-5 w-full rounded-lg animate-pulse mb-8 bg-[var(--bg-surface)]" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl animate-pulse bg-[var(--bg-surface)] border border-[var(--border-subtle)]" />
        ))}
      </div>
      <div className="h-64 rounded-xl animate-pulse bg-[var(--bg-surface)] border border-[var(--border-subtle)]" />
    </div>
  )
}
