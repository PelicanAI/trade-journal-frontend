export default function FeatureLoading() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg-base)]">
      <div className="animate-pulse p-6 lg:p-8 space-y-4 max-w-[1600px] mx-auto">
        {/* Title */}
        <div className="h-8 w-48 rounded-lg bg-[var(--bg-elevated)]" />
        {/* Subtitle */}
        <div className="h-4 w-80 rounded bg-[var(--bg-elevated)]" />
        {/* Controls bar */}
        <div className="h-10 w-64 rounded-lg mt-6 bg-[var(--bg-elevated)]" />
        {/* Main content area */}
        <div className="h-[60vh] w-full rounded-xl mt-4 bg-[var(--bg-surface)]" />
      </div>
    </div>
  )
}
