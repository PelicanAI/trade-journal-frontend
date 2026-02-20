'use client'

import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { CaretRight, Export, Copy, FileText, XLogo } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { formatLine, applyTickerLinks } from '@/components/chat/message/format-utils'
import { SP500_TICKERS, NASDAQ_100 } from '@/lib/trading/ticker-lists'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

// Build a combined set of known tickers for detection
const KNOWN_TICKERS = new Set([...SP500_TICKERS, ...NASDAQ_100])
// Convert to array for applyTickerLinks
const TICKER_LIST = Array.from(KNOWN_TICKERS)

const BRIEF_SECTIONS = [
  { pattern: /overnight|recap/i, id: 'overnight', label: 'Overnight' },
  { pattern: /key levels/i, id: 'levels', label: 'Levels' },
  { pattern: /positions? update/i, id: 'positions', label: 'Positions' },
  { pattern: /watchlist/i, id: 'watchlist', label: 'Watchlist' },
  { pattern: /macro|catalyst/i, id: 'macro', label: 'Macro' },
  { pattern: /sector/i, id: 'sectors', label: 'Sectors' },
  { pattern: /movers/i, id: 'movers', label: 'Movers' },
  { pattern: /trade ideas/i, id: 'ideas', label: 'Ideas' },
  { pattern: /risk warning/i, id: 'risk', label: 'Risk' },
  { pattern: /game plan/i, id: 'plan', label: 'Game Plan' },
]

interface InteractiveBriefProps {
  content: string
  isStreaming: boolean
  onTickerClick: (ticker: string, prompt: string) => void
  onShare: (format: 'full' | 'summary' | 'twitter') => void
}

interface ParsedSection {
  id: string
  label: string
  title: string
  content: string
}

function parseSections(content: string): { intro: string; sections: ParsedSection[] } {
  // Split on markdown headers like "## 1. MARKET OVERNIGHT RECAP" or "**1. MARKET OVERNIGHT RECAP**"
  const headerRegex = /^(?:#{1,3}\s*)?(?:\*\*)?(\d+)\.\s*(.+?)(?:\*\*)?$/gm
  const parts: { index: number; num: string; title: string }[] = []

  let match
  while ((match = headerRegex.exec(content)) !== null) {
    parts.push({ index: match.index, num: match[1] ?? '', title: (match[2] ?? '').trim() })
  }

  if (parts.length === 0) {
    return { intro: content, sections: [] }
  }

  const intro = content.slice(0, parts[0]!.index).trim()
  const sections: ParsedSection[] = parts.map((part, i) => {
    const end = i < parts.length - 1 ? parts[i + 1]!.index : content.length
    const sectionContent = content.slice(part.index, end).trim()
    // Remove the header line from the content
    const firstNewline = sectionContent.indexOf('\n')
    const body = firstNewline >= 0 ? sectionContent.slice(firstNewline + 1).trim() : ''

    // Match to a known section
    const matched = BRIEF_SECTIONS.find(s => s.pattern.test(part.title))

    return {
      id: matched?.id || `section-${part.num}`,
      label: matched?.label || part.title.slice(0, 15),
      title: `${part.num}. ${part.title}`,
      content: body,
    }
  })

  return { intro, sections }
}

function renderMarkdown(text: string, enableTickers: boolean): string {
  const lines = text.split('\n')
  let html = lines.map(line => formatLine(line)).join('<br />')
  if (enableTickers) {
    html = applyTickerLinks(html, TICKER_LIST)
  }
  return html
}

export function InteractiveBrief({ content, isStreaming, onTickerClick, onShare }: InteractiveBriefProps) {
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleSection = (id: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Parse sections (only when not streaming and content is available)
  const parsed = useMemo(() => {
    if (isStreaming || !content) return null
    return parseSections(content)
  }, [content, isStreaming])

  // Handle ticker clicks via event delegation
  const handleClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.classList.contains('ticker-link')) return
    e.preventDefault()
    const ticker = target.getAttribute('data-ticker')
    if (ticker) {
      onTickerClick(ticker, `Deep dive on ${ticker}. What's the current setup, key levels, and any catalysts?`)
    }
  }, [onTickerClick])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('click', handleClick)
    return () => el.removeEventListener('click', handleClick)
  }, [handleClick])

  // During streaming, render raw content (no section parsing)
  if (isStreaming || !parsed || parsed.sections.length === 0) {
    const html = content
      ? content.split('\n').map(line => formatLine(line)).join('<br />')
      : ''
    return (
      <div ref={containerRef}>
        <div
          className="text-[var(--text-secondary)] leading-relaxed space-y-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      {/* Section TOC */}
      <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-[var(--border-subtle)]">
        {parsed.sections.map(s => (
          <button
            key={s.id}
            onClick={() => {
              document.getElementById(`brief-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="px-2 py-0.5 rounded-md text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            {s.label}
          </button>
        ))}

        {/* Share dropdown */}
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors">
                <Export className="h-3.5 w-3.5" weight="regular" />
                Share
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onShare('full')}>
                <Copy className="h-3.5 w-3.5 mr-2" weight="regular" />
                Copy Full Brief
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare('summary')}>
                <FileText className="h-3.5 w-3.5 mr-2" weight="regular" />
                Copy Summary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare('twitter')}>
                <XLogo className="h-3.5 w-3.5 mr-2" weight="regular" />
                Copy for X/Twitter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Intro content (before first section) */}
      {parsed.intro && (
        <div
          className="text-[var(--text-secondary)] leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(parsed.intro, true) }}
        />
      )}

      {/* Sections */}
      <div className="space-y-3">
        {parsed.sections.map(section => {
          const isCollapsed = collapsedSections.has(section.id)
          return (
            <div key={section.id} id={`brief-${section.id}`}>
              {/* Section header (clickable to collapse) */}
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center gap-2 w-full text-left py-1.5 group"
              >
                <CaretRight
                  className={cn(
                    "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-150 shrink-0",
                    !isCollapsed && "rotate-90"
                  )}
                  weight="bold"
                />
                <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {section.title}
                </span>
              </button>

              {/* Section content */}
              {!isCollapsed && (
                <div
                  className="text-[var(--text-secondary)] leading-relaxed mt-1"
                  style={{ paddingLeft: '22px' }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(section.content, true) }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
