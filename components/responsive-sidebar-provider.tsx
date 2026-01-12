"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

interface ResponsiveSidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ResponsiveSidebarProvider({
  children,
  defaultOpen,
  open,
  onOpenChange,
}: ResponsiveSidebarProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [computedDefaultOpen, setComputedDefaultOpen] = React.useState(defaultOpen ?? true)

  React.useEffect(() => {
    setMounted(true)
    // Only compute on client after mount
    if (defaultOpen === undefined) {
      setComputedDefaultOpen(window.innerWidth >= 1024)
    }
  }, [defaultOpen])

  // During SSR and first render, use safe default
  if (!mounted) {
    return (
      <SidebarProvider open={open} onOpenChange={onOpenChange}>
        {children}
      </SidebarProvider>
    )
  }

  // After mount, use computed value
  return (
    <SidebarProvider
      defaultOpen={computedDefaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      {children}
    </SidebarProvider>
  )
}
