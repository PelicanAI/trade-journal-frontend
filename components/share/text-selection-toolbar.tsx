"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ShareNetwork } from "@phosphor-icons/react"
import { InsightPreviewModal } from "./insight-preview-modal"
import { extractTickers } from "@/lib/chat/detect-actions"

export function TextSelectionToolbar() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedText, setSelectedText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{ headline: string; tickers: string[] } | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  const hideToolbar = useCallback(() => {
    setPosition(null)
    setSelectedText("")
  }, [])

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed || !selection.toString().trim()) {
        const timeout = setTimeout(hideToolbar, 200)
        return () => clearTimeout(timeout)
      }

      const text = selection.toString().trim()
      if (text.length < 20) return

      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const messageEl =
        container instanceof Element
          ? container.closest('[data-message-role="assistant"]')
          : container.parentElement?.closest('[data-message-role="assistant"]')

      if (!messageEl) {
        hideToolbar()
        return
      }

      const rect = range.getBoundingClientRect()
      setPosition({ x: rect.left + rect.width / 2, y: rect.top - 8 })
      setSelectedText(text)
    }

    document.addEventListener("selectionchange", handleSelectionChange)
    return () => document.removeEventListener("selectionchange", handleSelectionChange)
  }, [hideToolbar])

  useEffect(() => {
    const handleScroll = () => {
      if (position) hideToolbar()
    }
    window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [position, hideToolbar])

  const handleShareAsCard = useCallback(() => {
    if (!selectedText) return
    const tickers = extractTickers(selectedText).slice(0, 5)
    setModalData({ headline: selectedText, tickers })
    setIsModalOpen(true)
    hideToolbar()
    window.getSelection()?.removeAllRanges()
  }, [selectedText, hideToolbar])

  return (
    <>
      {position && selectedText ? (
        <div
          ref={toolbarRef}
          className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ left: position.x, top: position.y, transform: "translate(-50%, -100%)" }}
        >
          <button
            onClick={handleShareAsCard}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg shadow-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)]/30 transition-all active:scale-[0.97]"
          >
            <ShareNetwork size={14} weight="regular" />
            Share as Card
          </button>
        </div>
      ) : null}

      <InsightPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        headline={modalData?.headline ?? ""}
        tickers={modalData?.tickers ?? []}
      />
    </>
  )
}
