"use client"

import * as React from "react"
import { ColumnCustomizeModal } from "@/components/column-customize-modal"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Settings2 } from "lucide-react"
import { PowerToggle } from "@/components/power-toggle"

interface Column {
  id: string
  label: string
  visible: boolean
  locked?: boolean
}

const initialColumns: Column[] = [
  { id: "id", label: "ID", visible: true, locked: true },
  { id: "name", label: "Name", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "role", label: "Role", visible: true },
  { id: "department", label: "Department", visible: false },
  { id: "status", label: "Status", visible: true },
  { id: "joinDate", label: "Join Date", visible: false },
  { id: "lastActive", label: "Last Active", visible: false },
  { id: "action", label: "Action", visible: true, locked: true },
]

const sampleData = [
  {
    id: "001",
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    department: "Engineering",
    status: "Active",
    joinDate: "2023-01-15",
    lastActive: "2 hours ago",
    isActive: true,
  },
  {
    id: "002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    department: "Design",
    status: "Active",
    joinDate: "2023-03-20",
    lastActive: "1 day ago",
    isActive: true,
  },
  {
    id: "003",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    department: "Operations",
    status: "Away",
    joinDate: "2022-11-10",
    lastActive: "3 days ago",
    isActive: false,
  },
]

export default function ColumnDemoPage() {
  const [columns, setColumns] = React.useState<Column[]>(initialColumns)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [tableData, setTableData] = React.useState(sampleData)

  const visibleColumns = columns.filter((col) => col.visible)

  const handlePowerToggle = (id: string, isOn: boolean) => {
    setTableData(
      tableData.map((item) =>
        item.id === id ? { ...item, isActive: isOn } : item
      )
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Column Customization Demo</h1>
          <p className="text-muted-foreground mt-1">
            iOS-inspired column customize modal with drag & drop
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
          variant="outline"
        >
          <Settings2 className="w-4 h-4" />
          Customize Columns
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                className={row.isActive ? "" : "opacity-50"}
              >
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "action" ? (
                      <PowerToggle
                        id={row.id}
                        defaultState={row.isActive}
                        onToggle={(isOn) => handlePowerToggle(row.id, isOn)}
                      />
                    ) : (
                      row[column.id as keyof typeof row]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-semibold mb-2">Current Column Order:</h3>
        <div className="flex flex-wrap gap-2">
          {columns.map((col) => (
            <span
              key={col.id}
              className={`px-3 py-1 rounded-full text-sm ${
                col.visible
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground line-through"
              }`}
            >
              {col.label}
            </span>
          ))}
        </div>
      </div>

      <ColumnCustomizeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        columns={columns}
        onColumnsChange={setColumns}
      />
    </div>
  )
}
