"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useStreaks } from '@/hooks/use-streaks'
import { useCreditsContext } from '@/providers/credits-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// =============================================================================
// TYPES
// =============================================================================

interface TopNavProps {
  className?: string
}

interface NavTab {
  key: string
  label: string
  href: string
}

// =============================================================================
// NAV TABS
// =============================================================================

const NAV_TABS: NavTab[] = [
  { key: 'brief', label: 'Brief', href: '/morning' },
  { key: 'chat', label: 'Chat', href: '/chat' },
  { key: 'heatmap', label: 'Heatmap', href: '/heatmap' },
  { key: 'journal', label: 'Journal', href: '/journal' },
  { key: 'earnings', label: 'Earnings', href: '/earnings' },
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function TopNav({ className }: TopNavProps) {
  const pathname = usePathname()
  const { journalStreak } = useStreaks()
  const { credits } = useCreditsContext()

  // Determine active tab based on pathname
  const getActiveTab = (): string => {
    if (pathname.startsWith('/morning')) return 'brief'
    if (pathname.startsWith('/chat')) return 'chat'
    if (pathname.startsWith('/heatmap')) return 'heatmap'
    if (pathname.startsWith('/journal')) return 'journal'
    if (pathname.startsWith('/earnings')) return 'earnings'
    return 'chat' // Default
  }

  const activeTab = getActiveTab()

  return (
    <nav className={cn(
      "sticky top-0 z-40 w-full border-b border-[#1e1e2e]/60 bg-[#0a0a0f]/95 backdrop-blur-xl",
      className
    )}>
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-80 flex-shrink-0"
          >
            <Image
              src="/pelican-logo-transparent.webp"
              alt="Pelican AI"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-bold text-base text-primary hidden sm:inline">
              Pelican AI
            </span>
          </Link>

          {/* Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.key

              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className={cn(
                    "relative px-3 py-4 text-sm font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6] rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile: Dropdown menu for tabs */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9">
                {NAV_TABS.find(t => t.key === activeTab)?.label || 'Menu'}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {NAV_TABS.map((tab) => (
                <DropdownMenuItem key={tab.key} asChild>
                  <Link
                    href={tab.href}
                    className={cn(
                      "w-full cursor-pointer",
                      activeTab === tab.key && "text-primary font-medium"
                    )}
                  >
                    {tab.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Streak + Credits */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Streak */}
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <span className="text-orange-400">🔥</span>
            <span className="font-mono font-medium text-white">{journalStreak}</span>
            <span className="text-xs">days</span>
          </div>

          {/* Credits */}
          <Link
            href="/pricing"
            className="px-3 py-1 rounded-full border border-[#1e1e2e] bg-[#13131a] text-sm font-mono text-white hover:border-[#8b5cf6]/30 hover:bg-[#1a1a24] transition-all"
          >
            {(credits?.balance ?? 0).toLocaleString()} credits
          </Link>
        </div>
      </div>
    </nav>
  )
}
