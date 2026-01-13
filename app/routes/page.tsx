"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import { detailsData, type DetailData } from "@/lib/route-data"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExternalLink, Info, Image as ImageIcon, Columns3, ListFilter, ArrowUp, ArrowDown, ArrowUpDown, GripVertical } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RouteData {
  id: number
  route: string
  warehouse: string
  shift: string
}

const routesData: RouteData[] = [
  { id: 1, route: "KL 7", warehouse: "3PVK04", shift: "PM" },
  { id: 2, route: "KL 8", warehouse: "3PVK05", shift: "AM" },
  { id: 3, route: "KL 9", warehouse: "3PVK06", shift: "PM" },
  { id: 4, route: "SG 5", warehouse: "3PVK07", shift: "AM" },
  { id: 5, route: "JB 3", warehouse: "3PVK08", shift: "PM" },
]

export default function RoutesPage() {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [infoDialogVisible, setInfoDialogVisible] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<DetailData | null>(null)
  const [columnCustomizeVisible, setColumnCustomizeVisible] = useState(false)
  const [rowCustomizeVisible, setRowCustomizeVisible] = useState(false)
  const [columnReorderVisible, setColumnReorderVisible] = useState(false)
  const [rowReorderVisible, setRowReorderVisible] = useState(false)
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    code: true,
    location: true,
    delivery: true,
    longitude: true,
    latitude: true,
    images: true,
    action: true,
  })

  // Column order state
  const [columnOrder, setColumnOrder] = useState<(keyof typeof visibleColumns)[]>(["no", "code", "location", "delivery", "longitude", "latitude", "images", "action"])

  // Row customization state
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sortBy, setSortBy] = useState("no")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  
  // Row order state
  const [rowOrder, setRowOrder] = useState<number[]>([1, 2, 3, 4, 5, 6])

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }))
  }

  const moveColumnUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...columnOrder]
      ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      setColumnOrder(newOrder)
    }
  }

  const moveColumnDown = (index: number) => {
    if (index < columnOrder.length - 1) {
      const newOrder = [...columnOrder]
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      setColumnOrder(newOrder)
    }
  }

  const moveRowUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...rowOrder]
      ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
      setRowOrder(newOrder)
    }
  }

  const moveRowDown = (index: number) => {
    if (index < rowOrder.length - 1) {
      const newOrder = [...rowOrder]
      ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
      setRowOrder(newOrder)
    }
  }

  const sortedData = [...detailsData]
    .sort((a, b) => {
      // First apply custom row order
      const aIndex = rowOrder.indexOf(a.id)
      const bIndex = rowOrder.indexOf(b.id)
      if (aIndex !== bIndex) {
        return aIndex - bIndex
      }
      // Then apply sorting
      const aValue = a[sortBy as keyof DetailData]
      const bValue = b[sortBy as keyof DetailData]
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    .slice(0, rowsPerPage)

  const toggleStatus = (id: number) => {
    // Toggle status logic here
    console.log(`Toggle status for id: ${id}`)
  }

  const showInfo = (detail: DetailData) => {
    setSelectedDetail(detail)
    setInfoDialogVisible(true)
  }

  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Routes</h1>
          </div>
        </header>
        <div className="h-[calc(100vh-64px)] overflow-y-auto bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-[calc(100vh-250px)] relative">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="text-center">Route</TableHead>
                    <TableHead className="text-center">Warehouse</TableHead>
                    <TableHead className="text-center">Shift</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routesData.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium text-center">{route.route}</TableCell>
                      <TableCell className="text-center">{route.warehouse}</TableCell>
                      <TableCell className="text-center">{route.shift}</TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDialogVisible(true)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Show
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
            <DialogContent className="max-w-[85vw] max-h-[85vh]">
              <DialogHeader>
                <DialogTitle>Flex Scroll</DialogTitle>
              </DialogHeader>
              
              {/* Customize Buttons */}
              <div className="flex gap-2 mb-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setColumnCustomizeVisible(true)}
                  className="flex items-center gap-2"
                >
                  <Columns3 className="h-4 w-4" />
                  Column Customize
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setRowCustomizeVisible(true)}
                  className="flex items-center gap-2"
                >
                  <ListFilter className="h-4 w-4" />
                  Row Customize
                </Button>
              </div>

              <div className="overflow-auto max-h-[calc(85vh-180px)] relative">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
                    <TableRow>
                      {columnOrder.map((col) => 
                        visibleColumns[col] && (
                          <TableHead key={col} className="text-center font-semibold capitalize">
                            {col}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.map((detail) => (
                      <TableRow key={detail.id}>
                        {columnOrder.map((col) => {
                          if (!visibleColumns[col]) return null
                          
                          if (col === "no") {
                            return <TableCell key={col} className="text-center font-medium">{detail.no}</TableCell>
                          }
                          if (col === "code") {
                            return <TableCell key={col} className="text-center font-semibold text-primary">{detail.code}</TableCell>
                          }
                          if (col === "location") {
                            return <TableCell key={col} className="text-center">{detail.location}</TableCell>
                          }
                          if (col === "delivery") {
                            return (
                              <TableCell key={col} className="text-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  detail.delivery === 'Express' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                  detail.delivery === 'Daily' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                  {detail.delivery}
                                </span>
                              </TableCell>
                            )
                          }
                          if (col === "longitude") {
                            return <TableCell key={col} className="text-center font-mono text-sm">{detail.longitude.toFixed(4)}</TableCell>
                          }
                          if (col === "latitude") {
                            return <TableCell key={col} className="text-center font-mono text-sm">{detail.latitude.toFixed(4)}</TableCell>
                          }
                          if (col === "images") {
                            return <TableCell key={col} className="text-center text-2xl">{detail.thumbnail}</TableCell>
                          }
                          if (col === "action") {
                            return (
                              <TableCell key={col} className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Button 
                                    variant={detail.status ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => toggleStatus(detail.id)}
                                    className="min-w-[60px]"
                                  >
                                    {detail.status ? "ON" : "OFF"}
                                  </Button>
                                  <Button 
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => showInfo(detail)}
                                    className="hover:bg-primary/10"
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            )
                          }
                          return null
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button onClick={() => setDialogVisible(false)}>
                  Ok
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* iOS-style Info Card Dialog */}
          <Dialog open={infoDialogVisible} onOpenChange={setInfoDialogVisible}>
            <DialogContent className="max-w-md max-h-[90vh] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-0 shadow-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Delivery Information</DialogTitle>
              </DialogHeader>
              {selectedDetail && (
                <div className="overflow-auto max-h-[90vh]">
                  {/* Header Section */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                      {selectedDetail.images.map((img, idx) => (
                        <div key={idx} className="text-6xl transform hover:scale-110 transition-transform animate-in zoom-in duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                          {img}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Title Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDetail.location}</h3>
                        <span className="text-3xl">{selectedDetail.thumbnail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                          Code: {selectedDetail.code}
                        </span>
                        <span className={`px-3 py-1 rounded-full font-medium ${
                          selectedDetail.delivery === 'Express' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          selectedDetail.delivery === 'Daily' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {selectedDetail.delivery}
                        </span>
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${selectedDetail.status ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">Status</span>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full font-semibold ${
                          selectedDetail.status 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {selectedDetail.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Description</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {selectedDetail.description}
                      </p>
                    </div>

                    {/* Image Gallery Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Gallery</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {selectedDetail.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-4xl hover:scale-105 transition-transform cursor-pointer shadow-sm"
                          >
                            {img}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Close Button */}
                    <Button 
                      onClick={() => setInfoDialogVisible(false)}
                      className="w-full rounded-xl h-12 font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Column Customize Modal */}
          <Dialog open={columnCustomizeVisible} onOpenChange={setColumnCustomizeVisible}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Columns3 className="h-5 w-5" />
                  Column Customize
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(visibleColumns).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={`col-${key}`}
                        checked={value}
                        onCheckedChange={() => toggleColumn(key as keyof typeof visibleColumns)}
                      />
                      <Label
                        htmlFor={`col-${key}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                      >
                        {key}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setColumnCustomizeVisible(false)
                    setColumnReorderVisible(true)
                  }}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Re-order
                </Button>
                <Button onClick={() => setColumnCustomizeVisible(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Row Customize Modal */}
          <Dialog open={rowCustomizeVisible} onOpenChange={setRowCustomizeVisible}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ListFilter className="h-5 w-5" />
                  Row Customize
                </DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="rowsPerPage" className="text-sm mb-2 block">Rows Per Page</Label>
                  <Input
                    id="rowsPerPage"
                    type="number"
                    min="1"
                    max="20"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="sortBy" className="text-sm mb-2 block">Sort By</Label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="no">No</option>
                    <option value="code">Code</option>
                    <option value="location">Location</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Sort Order</Label>
                  <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="w-full flex items-center justify-between"
                  >
                    <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
                    {sortOrder === "asc" ? (
                      <ArrowUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Showing {sortedData.length} of {detailsData.length} rows
                </p>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setRowCustomizeVisible(false)
                    setRowReorderVisible(true)
                  }}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Re-order
                </Button>
                <Button onClick={() => setRowCustomizeVisible(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Column Re-order Modal */}
          <Dialog open={columnReorderVisible} onOpenChange={setColumnReorderVisible}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Re-order Columns
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-2">
                  {columnOrder.map((col, index) => (
                    <div 
                      key={col} 
                      className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium capitalize">{col}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveColumnUp(index)}
                          disabled={index === 0}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveColumnDown(index)}
                          disabled={index === columnOrder.length - 1}
                          className="h-8 w-8 p-0"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setColumnReorderVisible(false)
                    setColumnCustomizeVisible(true)
                  }}
                >
                  Back
                </Button>
                <Button onClick={() => setColumnReorderVisible(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Row Re-order Modal */}
          <Dialog open={rowReorderVisible} onOpenChange={setRowReorderVisible}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Re-order Rows
                </DialogTitle>
              </DialogHeader>
              <div className="py-4 max-h-[400px] overflow-y-auto">
                <div className="space-y-2">
                  {rowOrder.map((rowId, index) => {
                    const detail = detailsData.find(d => d.id === rowId)
                    if (!detail) return null
                    return (
                      <div 
                        key={rowId} 
                        className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-primary">{detail.code}</span>
                            <span className="text-sm text-muted-foreground">{detail.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveRowUp(index)}
                            disabled={index === 0}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveRowDown(index)}
                            disabled={index === rowOrder.length - 1}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setRowReorderVisible(false)
                    setRowCustomizeVisible(true)
                  }}
                >
                  Back
                </Button>
                <Button onClick={() => setRowReorderVisible(false)}>
                  Done
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}