"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    } else if (enableSystem) {
      setTheme(getSystemTheme())
    }
  }, [enableSystem])

  useEffect(() => {
    if (attribute === "class") {
      document.documentElement.classList.remove("light", "dark")
      if (theme !== "system") {
        document.documentElement.classList.add(theme)
      } else if (enableSystem) {
        document.documentElement.classList.add(getSystemTheme())
      }
    } else {
      document.documentElement.setAttribute("data-theme", theme === "system" ? getSystemTheme() : theme)
    }
    if (theme !== "system") {
      localStorage.setItem("theme", theme)
    } else {
      localStorage.removeItem("theme")
    }
  }, [theme, attribute, enableSystem])

  const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
