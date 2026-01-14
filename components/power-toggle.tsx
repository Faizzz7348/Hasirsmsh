"use client"

import React, { useState } from "react"
import { Power } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface PowerToggleProps {
  id?: string | number
  defaultState?: boolean
  powerMode?: string
  onToggle?: (isOn: boolean) => void
  onPowerModeChange?: (mode: string) => void
  rowClassName?: string
}

const POWER_MODES = [
  { value: "Daily", label: "Daily", description: "Active every day" },
  { value: "Alt 1", label: "Alternative 1", description: "Active on odd days" },
  { value: "Alt 2", label: "Alternative 2", description: "Active on even days" },
  { value: "Weekday", label: "Weekday", description: "Off Friday and Saturday" },
  { value: "Weekend", label: "Weekend", description: "Off Saturday and Sunday" },
  { value: "Custom", label: "Custom", description: "Custom schedule" },
]

// Helper function to check if Alternative mode is active today
const isAlternativeActive = (altNumber: number): boolean => {
  const today = new Date().getDate()
  if (altNumber === 1) {
    return today % 2 !== 0 // Odd days
  } else if (altNumber === 2) {
    return today % 2 === 0 // Even days
  }
  return false
}

// Helper function to check if Weekday mode is active today
const isWeekdayActive = (): boolean => {
  const today = new Date().getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // OFF on Friday (5) and Saturday (6), ON on other days
  return today !== 5 && today !== 6
}

// Helper function to check if Weekend mode is active today
const isWeekendActive = (): boolean => {
  const today = new Date().getDay()
  // OFF on Saturday (6) and Sunday (0), ON on other days
  return today !== 0 && today !== 6
}

// Helper function to get status based on mode
const getModeStatus = (mode: string, customDate?: Date): boolean => {
  switch (mode) {
    case "Daily":
      return true // Always ON
    case "Alt 1":
      return isAlternativeActive(1)
    case "Alt 2":
      return isAlternativeActive(2)
    case "Weekday":
      return isWeekdayActive()
    case "Weekend":
      return isWeekendActive()
    case "Custom":
      // For custom, compare with selected date
      if (customDate) {
        const today = new Date()
        return today.toDateString() === customDate.toDateString()
      }
      return true // Default to ON if no date selected
    default:
      return true
  }
}

// Helper function to get mode label with status
const getModeLabel = (mode: { value: string; label: string }): string => {
  if (mode.value === "Alt 1") {
    const status = isAlternativeActive(1) ? "ON" : "OFF"
    return `${mode.label} (${status})`
  } else if (mode.value === "Alt 2") {
    const status = isAlternativeActive(2) ? "ON" : "OFF"
    return `${mode.label} (${status})`
  }
  return mode.label
}

export function PowerToggle({ 
  id, 
  defaultState = true,
  powerMode = "Daily",
  onToggle,
  onPowerModeChange,
  rowClassName = ""
}: PowerToggleProps) {
  const [isOn, setIsOn] = useState(defaultState)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState(powerMode)
  const [customDate, setCustomDate] = useState<Date | null>(null)

  const handleToggle = () => {
    const newState = !isOn
    setIsOn(newState)
    onToggle?.(newState)
  }

  const handleSavePowerMode = () => {
    // Update power mode
    onPowerModeChange?.(selectedMode)
    
    // Auto-update status based on mode
    const newStatus = getModeStatus(selectedMode, customDate || undefined)
    setIsOn(newStatus)
    onToggle?.(newStatus)
    
    setModalOpen(false)
  }

  return (
    <>
      <div
        className={`transition-opacity duration-300 ${
          isOn ? "opacity-100" : "opacity-50 cursor-not-allowed"
        } ${rowClassName}`}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center p-2 rounded-lg transition-all hover:bg-opacity-80"
          title={`Power Mode: ${powerMode}`}
        >
          <Power
            size={20}
            className={`transition-colors duration-300 ${
              isOn
                ? "text-green-500 hover:text-green-600"
                : "text-red-500 hover:text-red-600"
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Power className={isOn ? "text-green-500" : "text-red-500"} size={24} />
              Power Mode Settings
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Power Mode Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Power Mode</Label>
              <div className="grid gap-2">
                {POWER_MODES.map((mode) => {
                  const isAlt1 = mode.value === "Alt 1"
                  const isAlt2 = mode.value === "Alt 2"
                  const isWeekday = mode.value === "Weekday"
                  const isWeekend = mode.value === "Weekend"
                  const isCustom = mode.value === "Custom"
                  const isDaily = mode.value === "Daily"
                  
                  let statusBadge = null
                  if (isAlt1) {
                    const altActive = isAlternativeActive(1)
                    statusBadge = (
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        altActive 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {altActive ? "ON" : "OFF"}
                      </span>
                    )
                  } else if (isAlt2) {
                    const altActive = isAlternativeActive(2)
                    statusBadge = (
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        altActive 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {altActive ? "ON" : "OFF"}
                      </span>
                    )
                  } else if (isWeekday) {
                    const active = isWeekdayActive()
                    statusBadge = (
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        active 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {active ? "ON" : "OFF"}
                      </span>
                    )
                  } else if (isWeekend) {
                    const active = isWeekendActive()
                    statusBadge = (
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        active 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {active ? "ON" : "OFF"}
                      </span>
                    )
                  } else if (isDaily) {
                    statusBadge = (
                      <span className="text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        ON
                      </span>
                    )
                  }
                  
                  const isSelected = selectedMode === mode.value
                  
                  return (
                    <div key={mode.value}>
                      <div
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mode.label}</span>
                            {statusBadge}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {mode.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedMode(mode.value)}
                          className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
                            isSelected ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                              isSelected ? "translate-x-11" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      
                      {/* Custom Date Picker */}
                      {isCustom && isSelected && (
                        <div className="mt-2 p-4 rounded-lg border bg-muted/30">
                          <Label className="text-sm font-medium mb-2 block">Select Active Date</Label>
                          <input
                            type="date"
                            value={customDate ? customDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => setCustomDate(e.target.value ? new Date(e.target.value) : null)}
                            className="w-full h-10 px-3 border rounded-md bg-background text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            Device will be ON only on the selected date
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePowerMode}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
