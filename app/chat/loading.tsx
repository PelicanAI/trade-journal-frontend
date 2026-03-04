export default function ChatLoading() {
  return (
    <div className="flex h-screen bg-[var(--bg-base)]">
      <div className="hidden md:block w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]" />
      <div className="flex-1" />
    </div>
  )
}
