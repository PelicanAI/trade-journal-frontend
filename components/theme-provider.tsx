"use client"
import { ThemeProvider as NextThemesProvider, useTheme, type ThemeProviderProps } from "next-themes"
import { useEffect } from "react"
import { THEME_BACKUP_KEY } from "@/components/force-light-theme"

/**
 * Restores the user's real theme preference if it was backed up by
 * ForceLightTheme (e.g. after a full-page reload during auth redirect).
 */
function ThemeRestorer() {
  const { setTheme } = useTheme()

  useEffect(() => {
    const saved = localStorage.getItem(THEME_BACKUP_KEY)
    if (saved) {
      setTheme(saved)
      localStorage.removeItem(THEME_BACKUP_KEY)
    }
  }, [setTheme])

  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeRestorer />
      {children}
    </NextThemesProvider>
  )
}

export type { ThemeProviderProps }
