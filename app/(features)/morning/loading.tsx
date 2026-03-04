export default function MorningLoading() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)]">
      <div className="animate-pulse p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="h-10 w-64 rounded-lg bg-[var(--bg-elevated)]" />
        <div className="h-5 w-48 rounded bg-[var(--bg-elevated)]" />
        <div className="space-y-4 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-[var(--bg-surface)]" />
          ))}
        </div>
      </div>
    </div>
  )
}
