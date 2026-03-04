export default function ChatLoading() {
  return (
    <div className="flex h-screen bg-[var(--bg-base)]">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        {/* New chat button */}
        <div className="p-3">
          <div className="h-9 rounded-lg bg-[var(--bg-elevated)] animate-pulse" />
        </div>
        {/* Conversation list */}
        <div className="px-3 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-[var(--bg-elevated)] animate-pulse" style={{ opacity: 1 - i * 0.12 }} />
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-[var(--border-subtle)] flex items-center px-4 gap-3">
          <div className="h-5 w-32 rounded bg-[var(--bg-elevated)] animate-pulse" />
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 space-y-6 overflow-hidden">
          {/* Assistant message skeleton */}
          <div className="flex gap-3 max-w-2xl">
            <div className="w-7 h-7 rounded-full bg-[var(--bg-elevated)] animate-pulse flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 rounded bg-[var(--bg-elevated)] animate-pulse w-3/4" />
              <div className="h-4 rounded bg-[var(--bg-elevated)] animate-pulse w-1/2" />
            </div>
          </div>
          {/* User message skeleton */}
          <div className="flex justify-end">
            <div className="h-10 w-48 rounded-2xl bg-[var(--accent-muted)] animate-pulse" />
          </div>
          {/* Assistant message skeleton */}
          <div className="flex gap-3 max-w-2xl">
            <div className="w-7 h-7 rounded-full bg-[var(--bg-elevated)] animate-pulse flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-4 rounded bg-[var(--bg-elevated)] animate-pulse w-full" />
              <div className="h-4 rounded bg-[var(--bg-elevated)] animate-pulse w-5/6" />
              <div className="h-4 rounded bg-[var(--bg-elevated)] animate-pulse w-2/3" />
            </div>
          </div>
        </div>

        {/* Input bar skeleton */}
        <div className="p-4 border-t border-[var(--border-subtle)]">
          <div className="h-12 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] animate-pulse" />
        </div>
      </div>
    </div>
  )
}
