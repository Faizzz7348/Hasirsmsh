"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const themes = [
  { name: "Default Light", value: "light", class: "", isDark: false },
  { name: "Default Dark", value: "dark", class: "", isDark: true },
  { name: "Graphite", value: "theme-graphite", class: "theme-graphite", isDark: true },
  { name: "Twitter Light", value: "theme-twitter", class: "theme-twitter", isDark: false },
  { name: "Twitter Dark", value: "theme-twitter-dark", class: "theme-twitter-dark", isDark: true },
  { name: "Cosmic Night", value: "theme-cosmic-night", class: "theme-cosmic-night", isDark: true },
  { name: "Ocean Breeze", value: "theme-ocean-breeze", class: "theme-ocean-breeze", isDark: false },
  { name: "Forest Green", value: "theme-forest-green", class: "theme-forest-green", isDark: true },
  { name: "Sunset Orange", value: "theme-sunset-orange", class: "theme-sunset-orange", isDark: false },
  { name: "Midnight Blue", value: "theme-midnight-blue", class: "theme-midnight-blue", isDark: true },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [showThemes, setShowThemes] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowThemes(!showThemes)}
              className="h-9 w-9 rounded-xl border-0 bg-muted/30 backdrop-blur-xl hover:bg-muted/50"
            >
              <Palette className="h-5 w-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change Theme</p>
          </TooltipContent>
        </Tooltip>
        {showThemes && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-card/95 backdrop-blur-xl p-2 shadow-2xl z-50">
            <div className="text-xs font-semibold mb-2 px-3 py-1 text-muted-foreground">Select Theme</div>
            <div className="space-y-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setShowThemes(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/50 transition-all ${
                    theme === themeOption.value
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-2 border-blue-500/50"
                      : ""
                  }`}
                >
                  {themeOption.isDark ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                  <span>{themeOption.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
