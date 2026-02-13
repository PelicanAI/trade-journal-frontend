"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { TickerSearchResult } from "@/app/api/tickers/search/route"

interface TickerAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect?: (ticker: TickerSearchResult) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function TickerAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Search ticker...",
  className = "",
  autoFocus = false,
}: TickerAutocompleteProps) {
  const [results, setResults] = useState<TickerSearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Debounced search
  useEffect(() => {
    if (!value || value.length < 1) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/tickers/search?q=${encodeURIComponent(value)}&limit=10`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results || [])
          setIsOpen(data.results?.length > 0)
          setSelectedIndex(0)
        }
      } catch (error) {
        console.error('Ticker search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        resultsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (result: TickerSearchResult) => {
    onChange(result.ticker)
    onSelect?.(result)
    setIsOpen(false)
    setResults([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full pl-10 pr-4 py-2 rounded-lg
            bg-white/[0.06] border border-border
            text-foreground placeholder:text-foreground/40
            focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
            transition-all
            ${className}
          `}
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 rounded-lg border border-border bg-surface-1 shadow-lg max-h-64 overflow-y-auto"
        >
          {results.map((result, index) => (
            <button
              key={result.ticker}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`
                w-full px-4 py-2.5 text-left
                flex items-center justify-between gap-2
                transition-colors
                ${
                  index === selectedIndex
                    ? 'bg-purple-600/20 text-purple-300'
                    : 'hover:bg-white/[0.06] text-foreground'
                }
              `}
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono font-semibold text-sm">{result.ticker}</div>
                <div className="text-xs text-foreground/60 truncate">{result.name}</div>
              </div>
              <div className="text-[10px] text-foreground/40 uppercase">{result.type}</div>
            </button>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
