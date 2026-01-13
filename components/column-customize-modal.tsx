"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Column {
  id: string
  label: string
  visible: boolean
  locked?: boolean
}

interface ColumnCustomizeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  columns: Column[]
  onColumnsChange: (columns: Column[]) => void
}

export function ColumnCustomizeModal({
  open,
  onOpenChange,
  columns,
  onColumnsChange,
}: ColumnCustomizeModalProps) {
  const [localColumns, setLocalColumns] = React.useState<Column[]>(columns)
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null)

  React.useEffect(() => {
    setLocalColumns(columns)
  }, [columns])

  const handleToggle = (id: string) => {
    setLocalColumns((prev) =>
      prev.map((col) =>
        col.id === id && !col.locked ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const handleDragStart = (index: number) => {
    if (!localColumns[index].locked) {
      setDraggedItem(index)
    }
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === index) return
    if (localColumns[index].locked) return

    const newColumns = [...localColumns]
    const draggedColumn = newColumns[draggedItem]
    newColumns.splice(draggedItem, 1)
    newColumns.splice(index, 0, draggedColumn)

    setLocalColumns(newColumns)
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleApply = () => {
    onColumnsChange(localColumns)
    onOpenChange(false)
  }

  const handleClearAll = () => {
    setLocalColumns((prev) =>
      prev.map((col) =>
        col.locked ? col : { ...col, visible: false }
      )
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Customize Columns</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Select columns to display and drag to reorder them.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 pt-4 max-h-[400px] overflow-y-auto">
          {localColumns.map((column, index) => {
            const isSelected = column.visible
            return (
              <button
                key={column.id}
                draggable={!column.locked}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => handleToggle(column.id)}
                disabled={column.locked}
                className={cn(
                  "w-full h-12 rounded-xl flex items-center px-4 transition-all",
                  isSelected
                    ? "bg-blue-500/10 border-2 border-blue-500/50 hover:bg-blue-500/20"
                    : "border-2 border-transparent bg-muted/20 hover:bg-muted/40",
                  draggedItem === index && "opacity-50 scale-95",
                  column.locked && "cursor-not-allowed opacity-60"
                )}
              >
                {/* Drag Handle */}
                <div
                  className={cn(
                    "mr-3 touch-none",
                    column.locked
                      ? "text-muted-foreground/30"
                      : "text-muted-foreground/50 cursor-grab active:cursor-grabbing"
                  )}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* Checkbox */}
                <div
                  className={cn(
                    "h-5 w-5 border-2 flex items-center justify-center mr-3 shrink-0",
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "border-muted-foreground/30"
                  )}
                >
                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {/* Label */}
                <span className="flex-1 text-left font-medium">
                  {column.label}
                  {column.locked && (
                    <span className="text-xs ml-2 opacity-70">(Required)</span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex gap-2 pt-4 border-t">
          <Button
            onClick={handleClearAll}
            variant="outline"
            className="flex-1 h-10 rounded-xl"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 h-10 rounded-xl bg-blue-500 hover:bg-blue-600"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
