"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react"

interface Column {
  id: string
  label: string
  visible: boolean
  order: number
}

interface RouteData {
  id: number
  routeName: string
  method: string
  path: string
  controller: string
  middleware: string
  status: string
}

const initialData: RouteData[] = [
  { id: 1, routeName: "Home", method: "GET", path: "/", controller: "HomeController", middleware: "auth", status: "Active" },
  { id: 2, routeName: "Dashboard", method: "GET", path: "/dashboard", controller: "DashboardController", middleware: "auth", status: "Active" },
  { id: 3, routeName: "Profile", method: "GET", path: "/profile", controller: "ProfileController", middleware: "auth", status: "Active" },
  { id: 4, routeName: "Settings", method: "GET", path: "/settings", controller: "SettingsController", middleware: "auth", status: "Active" },
  { id: 5, routeName: "Users List", method: "GET", path: "/users", controller: "UserController", middleware: "auth,admin", status: "Active" },
  { id: 6, routeName: "Create User", method: "POST", path: "/users", controller: "UserController", middleware: "auth,admin", status: "Active" },
  { id: 7, routeName: "Update User", method: "PUT", path: "/users/:id", controller: "UserController", middleware: "auth,admin", status: "Active" },
  { id: 8, routeName: "Delete User", method: "DELETE", path: "/users/:id", controller: "UserController", middleware: "auth,admin", status: "Active" },
  { id: 9, routeName: "Calendar", method: "GET", path: "/calendar", controller: "CalendarController", middleware: "auth", status: "Active" },
  { id: 10, routeName: "Maps", method: "GET", path: "/maps", controller: "MapsController", middleware: "auth", status: "Active" },
  { id: 11, routeName: "Documents", method: "GET", path: "/documents", controller: "DocumentController", middleware: "auth", status: "Active" },
  { id: 12, routeName: "Analytics", method: "GET", path: "/analytics", controller: "AnalyticsController", middleware: "auth", status: "Active" },
  { id: 13, routeName: "Inbox", method: "GET", path: "/inbox", controller: "InboxController", middleware: "auth", status: "Active" },
  { id: 14, routeName: "Messages", method: "GET", path: "/messages", controller: "MessageController", middleware: "auth", status: "Active" },
  { id: 15, routeName: "Notifications", method: "GET", path: "/notifications", controller: "NotificationController", middleware: "auth", status: "Active" },
  { id: 16, routeName: "Sign In", method: "POST", path: "/signin", controller: "AuthController", middleware: "guest", status: "Active" },
  { id: 17, routeName: "Sign Up", method: "POST", path: "/signup", controller: "AuthController", middleware: "guest", status: "Active" },
  { id: 18, routeName: "Logout", method: "POST", path: "/logout", controller: "AuthController", middleware: "auth", status: "Active" },
  { id: 19, routeName: "API Health", method: "GET", path: "/api/health", controller: "HealthController", middleware: "none", status: "Active" },
  { id: 20, routeName: "API Status", method: "GET", path: "/api/status", controller: "StatusController", middleware: "none", status: "Active" },
]

const initialColumns: Column[] = [
  { id: "routeName", label: "Route Name", visible: true, order: 1 },
  { id: "method", label: "Method", visible: true, order: 2 },
  { id: "path", label: "Path", visible: true, order: 3 },
  { id: "controller", label: "Controller", visible: true, order: 4 },
  { id: "middleware", label: "Middleware", visible: true, order: 5 },
  { id: "status", label: "Status", visible: true, order: 6 },
]

export default function RoutesPage() {
  const [data] = useState<RouteData[]>(initialData)
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [showColumnCustomizer, setShowColumnCustomizer] = useState(false)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())

  const visibleColumns = useMemo(() => {
    return columns
      .filter((col) => col.visible)
      .sort((a, b) => a.order - b.order)
  }, [columns])

  const handleColumnVisibilityToggle = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    )
  }

  const handleColumnOrderChange = (columnId: string, newOrder: string) => {
    const order = parseInt(newOrder)
    if (isNaN(order) || order < 1) return

    setColumns((prev) => {
      const updated = prev.map((col) =>
        col.id === columnId ? { ...col, order } : col
      )
      return updated
    })
  }

  const moveColumnUp = (columnId: string) => {
    setColumns((prev) => {
      const colIndex = prev.findIndex((col) => col.id === columnId)
      if (colIndex <= 0) return prev

      const newColumns = [...prev]
      const currentOrder = newColumns[colIndex].order
      const prevCol = newColumns.find((col) => col.order === currentOrder - 1)

      if (prevCol) {
        prevCol.order = currentOrder
        newColumns[colIndex].order = currentOrder - 1
      }

      return newColumns
    })
  }

  const moveColumnDown = (columnId: string) => {
    setColumns((prev) => {
      const colIndex = prev.findIndex((col) => col.id === columnId)
      if (colIndex === -1 || colIndex >= prev.length - 1) return prev

      const newColumns = [...prev]
      const currentOrder = newColumns[colIndex].order
      const nextCol = newColumns.find((col) => col.order === currentOrder + 1)

      if (nextCol) {
        nextCol.order = currentOrder
        newColumns[colIndex].order = currentOrder + 1
      }

      return newColumns
    })
  }

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(data.map((row) => row.id)))
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400"
      case "POST":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "PUT":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-400">Routes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view all application routes
          </p>
        </div>
        <Button
          onClick={() => setShowColumnCustomizer(!showColumnCustomizer)}
          variant="outline"
          className="gap-2"
        >
          <Settings2 className="h-4 w-4" />
          Customize Columns
        </Button>
      </div>

      {showColumnCustomizer && (
        <Card className="border-sky-200 dark:border-sky-900">
          <CardHeader className="bg-sky-50 dark:bg-sky-950/30">
            <CardTitle className="text-sky-700 dark:text-sky-400">Column Customization</CardTitle>
            <CardDescription>
              Show/hide columns and reorder them using the input fields or arrow buttons
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {columns
                .sort((a, b) => a.order - b.order)
                .map((column) => (
                  <div
                    key={column.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-sky-100 dark:border-sky-900/50 bg-white dark:bg-gray-950"
                  >
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <Checkbox
                        checked={column.visible}
                        onCheckedChange={() => handleColumnVisibilityToggle(column.id)}
                      />
                      <span className="font-medium text-sm">{column.label}</span>
                      {column.visible ? (
                        <Eye className="h-4 w-4 text-sky-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">Order:</label>
                      <Input
                        type="number"
                        min="1"
                        value={column.order}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleColumnOrderChange(column.id, e.target.value)
                        }
                        className="w-20 h-8 text-center"
                      />
                    </div>
                    <div className="flex gap-1 ml-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveColumnUp(column.id)}
                        disabled={column.order === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveColumnDown(column.id)}
                        disabled={column.order === columns.length}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-sky-200 dark:border-sky-900">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30">
          <CardTitle className="text-sky-700 dark:text-sky-400">
            Routes Table
          </CardTitle>
          <CardDescription>
            {selectedRows.size > 0 && (
              <span className="text-sky-600 dark:text-sky-400 font-medium">
                {selectedRows.size} row(s) selected
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-300px)] min-h-[400px] max-h-[700px] border-t">
            <table className="w-full">
              <thead className="sticky top-0 bg-sky-100 dark:bg-sky-950/50 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <Checkbox
                      checked={selectedRows.size === data.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  {visibleColumns.map((column) => (
                    <th
                      key={column.id}
                      className="px-4 py-3 text-left text-sm font-semibold text-sky-900 dark:text-sky-300"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`
                      border-b border-sky-100 dark:border-sky-900/30
                      hover:bg-sky-50 dark:hover:bg-sky-950/20
                      transition-colors
                      ${selectedRows.has(row.id) ? "bg-sky-50 dark:bg-sky-950/30" : ""}
                      ${index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50/50 dark:bg-gray-900/20"}
                    `}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={() => handleRowSelect(row.id)}
                      />
                    </td>
                    {visibleColumns.map((column) => (
                      <td key={column.id} className="px-4 py-3 text-sm">
                        {column.id === "method" ? (
                          <span
                            className={`px-2 py-1 rounded-md text-xs font-semibold ${getMethodColor(
                              row[column.id as keyof RouteData] as string
                            )}`}
                          >
                            {row[column.id as keyof RouteData]}
                          </span>
                        ) : column.id === "status" ? (
                          <span className="px-2 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {row[column.id as keyof RouteData]}
                          </span>
                        ) : column.id === "path" ? (
                          <code className="text-sky-700 dark:text-sky-400 font-mono text-xs">
                            {row[column.id as keyof RouteData]}
                          </code>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">
                            {row[column.id as keyof RouteData]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedRows.size > 0 && (
        <Card className="border-sky-200 dark:border-sky-900 bg-sky-50 dark:bg-sky-950/20">
          <CardHeader>
            <CardTitle className="text-sky-700 dark:text-sky-400">
              Selected Routes Order
            </CardTitle>
            <CardDescription>
              View the order of selected routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(selectedRows)
                .sort((a, b) => a - b)
                .map((id, index) => {
                  const route = data.find((r) => r.id === id)
                  if (!route) return null
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-950 border border-sky-200 dark:border-sky-900"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sky-900 dark:text-sky-300">
                          {route.routeName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <code className="text-sky-600 dark:text-sky-400">
                            {route.method} {route.path}
                          </code>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
