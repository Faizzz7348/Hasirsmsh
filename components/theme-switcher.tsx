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
  { name: "Default Light", value: "light", class: "" },
  { name: "Default Dark", value: "dark", class: "" },
  { name: "Graphite", value: "graphite", class: "theme-graphite" },
  { name: "Twitter Light", value: "twitter-light", class: "theme-twitter" },
  { name: "Twitter Dark", value: "twitter-dark", class: "theme-twitter-dark" },
  { name: "Cosmic Night", value: "cosmic", class: "theme-cosmic" },
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
              className="h-9 w-9"
            >
              <Palette className="h-4 w-4" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change Theme</p>
          </TooltipContent>
        </Tooltip>
        {showThemes && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-popover p-2 shadow-lg z-50">
            <div className="text-xs font-medium mb-2 px-2">Select Theme</div>
            <div className="space-y-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setShowThemes(false)
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-accent transition-colors ${
                    theme === themeOption.value
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }`}
                >
                  {themeOption.value.includes("dark") || themeOption.value === "dark" || themeOption.value === "graphite" || themeOption.value === "cosmic" ? (
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
