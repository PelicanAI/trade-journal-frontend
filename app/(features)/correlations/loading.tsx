export default function CorrelationsLoading() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)]">
      <div className="animate-pulse p-6 lg:p-8 max-w-[1600px] mx-auto space-y-4">
        <div className="h-8 w-40 rounded-lg bg-[var(--bg-elevated)]" />
        <div className="h-[60vh] rounded-xl mt-4 bg-[var(--bg-surface)]" />
      </div>
    </div>
  )
}
