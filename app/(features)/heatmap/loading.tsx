export default function HeatmapLoading() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)]">
      <div className="animate-pulse p-6 lg:p-8 max-w-[1600px] mx-auto space-y-4">
        <div className="h-8 w-44 rounded-lg bg-[var(--bg-elevated)]" />
        <div className="h-10 w-72 rounded-lg mt-4 bg-[var(--bg-elevated)]" />
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-1 mt-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="aspect-square rounded bg-[var(--bg-surface)]" />
          ))}
        </div>
      </div>
    </div>
  )
}
