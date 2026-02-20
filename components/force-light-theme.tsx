"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

/**
 * Forces light theme on public pages (landing, auth, pricing).
 * Saves and restores the user's preference when navigating away.
 */
export function ForceLightTheme() {
  const { setTheme, resolvedTheme } = useTheme()
  const savedTheme = useRef<string | null>(null)

  useEffect(() => {
    // Save current theme so we can restore it on unmount
    if (resolvedTheme && resolvedTheme !== "light") {
      savedTheme.current = resolvedTheme
    }
    setTheme("light")

    return () => {
      // Restore user's preference when leaving public page
      if (savedTheme.current) {
        setTheme(savedTheme.current)
      } else {
        // Restore from storage or default
        const stored = localStorage.getItem("pelican-theme-v2")
        if (stored) {
          setTheme(stored)
        } else {
          setTheme("dark")
        }
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
