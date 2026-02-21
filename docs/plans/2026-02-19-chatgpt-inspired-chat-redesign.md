# ChatGPT-Inspired Chat Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the Pelican chat page with ChatGPT-inspired design — cleaner spacing, pill-shaped composer, minimal welcome state, simplified sidebar, capped action buttons — while preserving all Pelican-specific features.

**Architecture:** Component-level restyle across ~8-10 files. No structural changes to hooks, streaming, data flow, or component hierarchy. All changes are CSS/JSX visual tweaks.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, Phosphor Icons, TypeScript

---

### Task 1: Restyle Welcome Screen

**Files:**
- Modify: `components/chat/welcome-screen.tsx`

**Step 1: Restyle the welcome screen**

Replace the entire return JSX. Changes:
- Logo: 60px (down from 128px), slight opacity
- Heading: cleaner, no subtitle paragraph
- Move the guide link below SuggestedPrompts
- More vertical centering, less min-height constraint

```tsx
return (
  <div className="flex-1 flex items-center justify-center p-4 pb-8 sm:p-8 bg-transparent">
    <div className="max-w-2xl mx-auto text-center space-y-5 px-2">
      <div className="flex justify-center">
        <Image
          src="/pelican-logo-transparent.webp"
          alt={t.common.appName}
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain opacity-85 pelican-logo-glow"
          width={64}
          height={64}
          priority
        />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
        {t.chat.welcomeTitle}
      </h1>

      <SuggestedPrompts onSelect={onQuickStart} disabled={disabled} />

      <Link
        href="/guide"
        className="inline-block text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      >
        See how to get the most from Pelican →
      </Link>
    </div>
  </div>
)
```

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS, no type errors

**Step 3: Commit**

```bash
git add components/chat/welcome-screen.tsx
git commit -m "style: restyle welcome screen — smaller logo, cleaner layout"
```

---

### Task 2: Restyle Suggested Prompts as Pill Chips

**Files:**
- Modify: `components/chat/SuggestedPrompts.tsx`

**Step 1: Replace card grid with inline pill chips**

Change from grid of bordered cards to flex-wrap row of rounded pill chips:

```tsx
export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {SUGGESTED_PROMPTS.map((prompt, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 + index * 0.04 }}
          onClick={() => !disabled && onSelect(prompt)}
          whileHover={disabled ? undefined : { scale: 1.02 }}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-full text-sm border transition-all duration-150",
            disabled
              ? "border-border/30 text-muted-foreground/50 cursor-not-allowed"
              : "border-border/40 text-foreground/70 hover:border-border/60 hover:text-foreground hover:bg-accent/5 cursor-pointer"
          )}
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  )
}
```

Add `import { cn } from "@/lib/utils"` at the top.

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/chat/SuggestedPrompts.tsx
git commit -m "style: replace suggestion cards with pill chips"
```

---

### Task 3: Restyle Composer to Pill Shape

**Files:**
- Modify: `components/chat/chat-input.tsx`

**Step 1: Update composer container styling**

Change the inner `<div>` (line 148-162) from `rounded-2xl` to pill shape:

Old:
```tsx
"rounded-2xl",
"border border-white/[0.08]",
"shadow-[0_0_20px_rgba(255,255,255,0.03),0_0_4px_rgba(255,255,255,0.02)]",
"ring-1 ring-white/[0.06]",
```

New:
```tsx
"rounded-[28px]",
"border border-border/40",
"shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
```

Change background from:
```tsx
"bg-[color-mix(in_oklch,var(--card),white_8%)]",
```
To:
```tsx
"bg-card/80",
```

Change focus state from:
```tsx
isFocused && [
  "border-[rgba(59,130,246,0.40)]",
  "shadow-[0_0_25px_rgba(255,255,255,0.05),0_0_6px_rgba(255,255,255,0.03)]",
],
```
To:
```tsx
isFocused && "border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.2)]",
```

**Step 2: Remove the "Enter to send" hint text**

Delete the entire block at line 212-216:
```tsx
<div className="hidden sm:flex items-center justify-between px-3 pb-1 pt-0.5">
  <span className="text-[11px] text-muted-foreground/50">
    <kbd ...>Enter</kbd> to send · <kbd ...>Shift+Enter</kbd> for new line
  </span>
</div>
```

**Step 3: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 4: Commit**

```bash
git add components/chat/chat-input.tsx
git commit -m "style: pill-shaped composer with cleaner shadow"
```

---

### Task 4: Restyle Send Button

**Files:**
- Modify: `components/chat/input/SendButton.tsx`

**Step 1: Update send button styling**

Change the disabled state from `bg-muted` to `bg-muted/50` for subtler empty state.
The button is already `rounded-full` and properly sized — just lighten the disabled look:

Old:
```tsx
: isSendDisabled
  ? "bg-muted text-muted-foreground cursor-not-allowed"
  : "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-md shadow-[var(--accent-primary)]/20",
```

New:
```tsx
: isSendDisabled
  ? "bg-muted/40 text-muted-foreground/40 cursor-not-allowed"
  : "bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white shadow-md shadow-[var(--accent-primary)]/20",
```

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/chat/input/SendButton.tsx
git commit -m "style: softer disabled state for send button"
```

---

### Task 5: Restyle Conversation Sidebar — Items & Bottom Section

**Files:**
- Modify: `components/chat/conversation-sidebar.tsx`

This is the largest single change. Three sub-changes:

**Step 1: Restyle the `+ New` button (line 417-423)**

Old:
```tsx
className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-[var(--accent-indigo-muted)] text-[var(--accent-indigo-hover)] text-xs font-medium hover:bg-[rgba(59,130,246,0.22)] border border-[rgba(59,130,246,0.15)] hover:border-[rgba(59,130,246,0.30)] transition-all duration-200"
```

New:
```tsx
className="flex items-center gap-1.5 h-7 px-3 rounded-md text-muted-foreground text-xs font-medium hover:text-foreground hover:bg-accent/10 border border-border/30 hover:border-border/50 transition-all duration-150"
```

**Step 2: Restyle conversation items — hide timestamps, cleaner hover**

In `ConversationItem` (line 122-173), change:

The item button className (line 125-129):
Old:
```tsx
isActive && "bg-[var(--surface-hover)] border-l-2 border-l-primary border-y border-r border-y-transparent border-r-transparent",
!isActive && "hover:bg-[var(--surface-hover)] border border-transparent",
```

New:
```tsx
isActive && "bg-accent/8 text-foreground",
!isActive && "hover:bg-accent/5 text-muted-foreground hover:text-foreground",
```

Change the timestamp div (line 141-143) to show on hover only:
Old:
```tsx
<div className="text-[10px] text-muted-foreground mt-0.5">
  {getRelativeTime(conversation.updated_at)}
</div>
```

New:
```tsx
<div className="text-[10px] text-muted-foreground/50 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
  {getRelativeTime(conversation.updated_at)}
</div>
```

**Step 3: Simplify the Saved Insights badge (line 469-477)**

Old (badge with background):
```tsx
<span
  className="px-1.5 py-0.5 rounded-full text-[10px]"
  style={{
    background: 'rgba(59,130,246,0.1)',
    color: 'var(--accent-indigo, #3B82F6)',
  }}
>
  {savedInsights.length}
</span>
```

New (simple count):
```tsx
<span className="text-[10px] text-muted-foreground">
  {savedInsights.length}
</span>
```

**Step 4: Simplify footer section (lines 774-811)**

Replace the current footer with a collapsed profile dropdown. Replace the entire `{/* Footer */}` div with:

```tsx
{/* Footer */}
<div className="shrink-0 px-3 py-3 border-t border-sidebar-border/30">
  <div className="relative" ref={profileMenuRef}>
    <button
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg hover:bg-accent/5 transition-colors group"
    >
      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-foreground/70">
        <User size={14} weight="regular" />
      </div>
      <span className="flex-1 text-left text-xs font-medium text-foreground/80 truncate">
        {t.common.account}
      </span>
      <CaretUp
        size={12}
        className={cn(
          "text-muted-foreground transition-transform duration-150",
          showProfileMenu && "rotate-180"
        )}
      />
    </button>

    {showProfileMenu && (
      <div className="absolute bottom-full left-0 right-0 mb-1 rounded-lg border border-border/30 bg-popover shadow-lg py-1 z-50">
        <ThemeRow />
        {isAdmin && (
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-foreground/70 hover:bg-accent/5 transition-colors"
            onClick={() => setShowProfileMenu(false)}
          >
            <Shield size={14} weight="regular" />
            Admin Panel
          </Link>
        )}
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-foreground/70 hover:bg-accent/5 transition-colors"
          onClick={() => setShowProfileMenu(false)}
        >
          <Gear size={14} weight="regular" />
          Settings
        </Link>
        <button
          onClick={() => {
            setShowProfileMenu(false)
            setShowSignOutDialog(true)
          }}
          className="flex items-center gap-2.5 w-full px-3 py-1.5 text-xs text-foreground/70 hover:bg-accent/5 transition-colors"
        >
          <SignOut size={14} weight="regular" />
          Sign out
        </button>
      </div>
    )}
  </div>
</div>
```

Add the new state and ref near the top of `ConversationSidebar`:
```tsx
const [showProfileMenu, setShowProfileMenu] = useState(false)
const profileMenuRef = useRef<HTMLDivElement>(null)
```

Add a click-outside handler effect:
```tsx
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
      setShowProfileMenu(false)
    }
  }
  if (showProfileMenu) {
    document.addEventListener('mousedown', handleClickOutside)
  }
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [showProfileMenu])
```

**Step 5: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 6: Commit**

```bash
git add components/chat/conversation-sidebar.tsx
git commit -m "style: simplify sidebar — ghost new button, hover timestamps, profile dropdown"
```

---

### Task 6: Restyle Message Bubbles

**Files:**
- Modify: `components/chat/message-bubble.tsx`

**Step 1: Lighten user message bubble background**

At line 184, change user message bubble background:

Old:
```tsx
<div className="rounded-2xl bg-[var(--accent-muted)] px-4 py-3">
```

New:
```tsx
<div className="rounded-2xl bg-accent/8 px-4 py-3">
```

This makes the user message background more subtle and consistent with the overall lighter feel.

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/chat/message-bubble.tsx
git commit -m "style: lighten user message bubble background"
```

---

### Task 7: Cap Action Buttons with "More" Dropdown

**Files:**
- Modify: `components/chat/message-action-bar.tsx`

**Step 1: Increase MAX_VISIBLE and add dropdown**

Change `MAX_VISIBLE` from 3 to 5.

Replace the overflow button and add a popover dropdown. Replace the return JSX (lines 212-238):

```tsx
const [showMore, setShowMore] = useState(false)
const moreRef = useRef<HTMLDivElement>(null)
```

Add to imports: `import { DotsThree } from "@phosphor-icons/react"`
Add to imports: `import { useRef } from 'react'` (already has useState)

Add click-outside effect:
```tsx
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
      setShowMore(false)
    }
  }
  if (showMore) {
    document.addEventListener('mousedown', handleClickOutside)
  }
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [showMore])
```

Add `useEffect` to imports.

Replace the return JSX:

```tsx
const MAX_VISIBLE = 5
// ... existing code ...

const visible = actions.slice(0, MAX_VISIBLE)
const overflow = actions.slice(MAX_VISIBLE)

return (
  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/20">
    {visible.map((action, i) => (
      <div
        key={action.id}
        className="action-button-enter"
        style={{ animationDelay: `${i * 40}ms` }}
      >
        <ActionButton
          action={action}
          onClick={handleAction}
          loading={loadingId === action.id}
        />
      </div>
    ))}

    {overflow.length > 0 && (
      <div className="relative" ref={moreRef}>
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs transition-all duration-150 active:scale-95 bg-transparent border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/50"
        >
          <DotsThree size={16} weight="bold" />
          <span>More</span>
        </button>

        {showMore && (
          <div className="absolute bottom-full left-0 mb-1 min-w-[180px] rounded-lg border border-border/30 bg-popover shadow-lg py-1 z-50">
            {overflow.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  handleAction(action)
                  setShowMore(false)
                }}
                disabled={loadingId === action.id}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground/70 hover:bg-accent/5 transition-colors disabled:opacity-50"
              >
                <ActionButton
                  action={action}
                  onClick={() => {}}
                  loading={loadingId === action.id}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
)
```

Wait — the dropdown items shouldn't wrap ActionButton inside another button. Let's use the icon directly:

```tsx
{showMore && (
  <div className="absolute bottom-full left-0 mb-1 min-w-[180px] rounded-lg border border-border/30 bg-popover shadow-lg py-1 z-50">
    {overflow.map((action) => (
      <ActionButton
        key={action.id}
        action={action}
        onClick={(a) => {
          handleAction(a)
          setShowMore(false)
        }}
        loading={loadingId === action.id}
      />
    ))}
  </div>
)}
```

Actually, let's keep ActionButton as-is (they're already styled as pills). The dropdown just wraps them in a vertical column:

```tsx
{showMore && (
  <div className="absolute bottom-full left-0 mb-1 rounded-lg border border-border/30 bg-popover shadow-lg p-2 z-50 flex flex-col gap-1">
    {overflow.map((action) => (
      <ActionButton
        key={action.id}
        action={action}
        onClick={(a) => {
          handleAction(a)
          setShowMore(false)
        }}
        loading={loadingId === action.id}
      />
    ))}
  </div>
)}
```

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/chat/message-action-bar.tsx
git commit -m "style: cap action buttons at 5 visible, overflow in dropdown"
```

---

### Task 8: Restyle Right Sidebar Tabs (Minimal)

**Files:**
- Modify: `components/chat/trading-context-panel.tsx`

**Step 1: Identify current tab styling and make minimal**

Find the tab bar section and:
- Remove icon-heavy tab labels if present
- Use text-only tabs with an underline indicator for the active tab
- Keep the collapse chevron subtle

This is a light touch — find the tab buttons and change their active/inactive styles to use `border-b-2 border-primary` for active and `text-muted-foreground` for inactive.

**Step 2: Run build to verify**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

```bash
git add components/chat/trading-context-panel.tsx
git commit -m "style: minimal tab styling on right sidebar"
```

---

### Task 9: Final Build Verification & Visual Check

**Step 1: Full build**

Run: `npm run build`
Expected: PASS with 0 errors

**Step 2: Visual verification checklist**

- [ ] Welcome screen: smaller logo, pill chips, subtle guide link
- [ ] Composer: pill shape, cleaner shadow, no hint text
- [ ] Left sidebar: ghost New button, hover-only timestamps, profile dropdown
- [ ] User messages: lighter bubble background
- [ ] Action buttons: max 5 visible, "More" dropdown for overflow
- [ ] Right sidebar: cleaner tabs
- [ ] Mobile: all features still accessible
- [ ] Learning mode: still toggleable, still works
- [ ] Market sidebar: still shows data

**Step 3: Final commit**

```bash
git add -A
git commit -m "style: ChatGPT-inspired chat page redesign — complete"
```
