"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { ReactNode } from "react"

interface TermInfo {
  term: string
  fullName: string
  shortDef: string
  category: string
}

interface LearningModeContextValue {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  selectedTerm: TermInfo | null
  selectTerm: (term: TermInfo) => void
  clearTerm: () => void
  learnTabActive: boolean
  setLearnTabActive: (active: boolean) => void
}

const LearningModeContext = createContext<LearningModeContextValue | null>(null)

const STORAGE_KEY = "pelican-learning-mode"
const LEARN_TAB_KEY = "pelican-learn-tab-active"

export function LearningModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState<TermInfo | null>(null)
  const [learnTabActive, setLearnTabActiveState] = useState(false)

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "true") setEnabledState(true)
      const learnTab = localStorage.getItem(LEARN_TAB_KEY)
      if (learnTab === "true") setLearnTabActiveState(true)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value)
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // localStorage unavailable
    }
    // When toggled off, clear selected term
    if (!value) {
      setSelectedTerm(null)
    }
  }, [])

  const setLearnTabActive = useCallback((active: boolean) => {
    setLearnTabActiveState(active)
    try {
      localStorage.setItem(LEARN_TAB_KEY, String(active))
    } catch {
      // localStorage unavailable
    }
  }, [])

  const selectTerm = useCallback((term: TermInfo) => {
    setSelectedTerm(term)
    setLearnTabActive(true)
  }, [setLearnTabActive])

  const clearTerm = useCallback(() => {
    setSelectedTerm(null)
    // Keep learnTabActive true — user might want to stay on the learn tab
  }, [])

  return (
    <LearningModeContext.Provider
      value={{ enabled, setEnabled, selectedTerm, selectTerm, clearTerm, learnTabActive, setLearnTabActive }}
    >
      {children}
    </LearningModeContext.Provider>
  )
}

const NOOP = () => {}
const DEFAULT_CONTEXT: LearningModeContextValue = {
  enabled: false,
  setEnabled: NOOP,
  selectedTerm: null,
  selectTerm: NOOP,
  clearTerm: NOOP,
  learnTabActive: false,
  setLearnTabActive: NOOP,
}

/**
 * Returns learning mode context. Safe to call outside LearningModeProvider — returns no-op defaults.
 */
export function useLearningMode(): LearningModeContextValue {
  const ctx = useContext(LearningModeContext)
  return ctx ?? DEFAULT_CONTEXT
}
