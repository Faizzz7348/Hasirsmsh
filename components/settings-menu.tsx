"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface SettingsMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface SettingsMenuProps {
  items: SettingsMenuItem[]
  activeItem: string
  onItemSelect: (id: string) => void
}

export function SettingsMenu({ items, activeItem, onItemSelect }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleItemClick = (id: string) => {
    onItemSelect(id)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Hamburger Button with Animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5",
          "bg-muted/50 hover:bg-muted transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
        aria-label="Settings menu"
      >
        <span
          className={cn(
            "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
            isOpen && "rotate-45 translate-y-2"
          )}
        />
        <span
          className={cn(
            "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300",
            isOpen && "opacity-0 scale-0"
          )}
        />
        <span
          className={cn(
            "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center",
            isOpen && "-rotate-45 -translate-y-2"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div
            className={cn(
              "absolute top-12 right-0 z-50 min-w-[200px]",
              "bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
              "overflow-hidden"
            )}
          >
            <div className="py-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left flex items-center gap-3",
                    "transition-all duration-200",
                    activeItem === item.id
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium"
                      : "text-foreground hover:bg-muted/50",
                    index !== items.length - 1 && "border-b border-border/50"
                  )}
                >
                  {item.icon && (
                    <span className="text-muted-foreground">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
