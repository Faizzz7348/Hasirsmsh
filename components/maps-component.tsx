"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getActiveLocations, getRoutes, getLocationsByRoute } from "@/lib/route-data"

interface Marker {
  id: number
  lat: number
  lng: number
  title: string
  code?: string
  delivery?: string
  route?: string
  isFromRoute?: boolean
}

export function MapsComponent() {
  // Initialize markers from active route locations
  const activeLocations = getActiveLocations()
  const availableRoutes = getRoutes()
  const initialMarkers: Marker[] = activeLocations.map(location => ({
    id: location.id,
    lat: location.latitude,
    lng: location.longitude,
    title: location.location,
    code: location.code,
    delivery: location.delivery,
    route: location.route,
    isFromRoute: true,
  }))

  const [markers, setMarkers] = useState<Marker[]>(initialMarkers)
  const [allMarkers, setAllMarkers] = useState<Marker[]>(initialMarkers)
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [newMarkerTitle, setNewMarkerTitle] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRouteFilterOpen, setIsRouteFilterOpen] = useState(false)
  
  // Calculate center from active markers
  const calculateCenter = () => {
    if (initialMarkers.length === 0) {
      return { lat: 3.1390, lng: 101.6869 }
    }
    const avgLat = initialMarkers.reduce((sum, m) => sum + m.lat, 0) / initialMarkers.length
    const avgLng = initialMarkers.reduce((sum, m) => sum + m.lng, 0) / initialMarkers.length
    return { lat: avgLat, lng: avgLng }
  }
  
  const [mapCenter, setMapCenter] = useState(calculateCenter())
  const [zoom, setZoom] = useState(10)

  const toggleRoute = useCallback((route: string) => {
    setSelectedRoutes(prev => {
      if (prev.includes(route)) {
        return prev.filter(r => r !== route)
      } else {
        return [...prev, route]
      }
    })
  }, [])

  const applyRouteFilter = useCallback(() => {
    if (selectedRoutes.length === 0) {
      setMarkers(allMarkers)
    } else {
      const filteredMarkers = allMarkers.filter(marker => 
        !marker.isFromRoute || selectedRoutes.includes(marker.route || "")
      )
      setMarkers(filteredMarkers)
    }
    setIsRouteFilterOpen(false)
  }, [selectedRoutes, allMarkers])

  const clearRouteFilter = useCallback(() => {
    setSelectedRoutes([])
    setMarkers(allMarkers)
    setIsRouteFilterOpen(false)
  }, [allMarkers])

  const addMarker = useCallback(() => {
    if (newMarkerTitle.trim()) {
      const newMarker: Marker = {
        id: Date.now(),
        lat: mapCenter.lat + (Math.random() - 0.5) * 10,
        lng: mapCenter.lng + (Math.random() - 0.5) * 10,
        title: newMarkerTitle,
        isFromRoute: false,
      }
      setMarkers(prev => [...prev, newMarker])
      setAllMarkers(prev => [...prev, newMarker])
      setNewMarkerTitle("")
      setIsModalOpen(false)
    }
  }, [newMarkerTitle, mapCenter])

  const removeMarker = useCallback((id: number) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id))
    setAllMarkers(prev => prev.filter(marker => marker.id !== id))
    if (selectedMarker?.id === id) {
      setSelectedMarker(null)
    }
  }, [selectedMarker])

  const clearMarkers = useCallback(() => {
    setMarkers([])
    setSelectedMarker(null)
  }, [])

  const centerOnMarker = useCallback((marker: Marker) => {
    setMapCenter({ lat: marker.lat, lng: marker.lng })
    setSelectedMarker(marker)
    setZoom(12)
  }, [])

  return (
    <div className="space-y-4">
      {/* Merged Map and Controls */}
      <Card className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border-0 shadow-xl">
        <div className="space-y-6">
          {/* Map Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold tracking-tight">Interactive Map</h3>
              <div className="flex gap-2">
                <Dialog open={isRouteFilterOpen} onOpenChange={setIsRouteFilterOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-9 px-4 rounded-xl border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950 font-medium text-sm">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Show {selectedRoutes.length > 0 ? `(${selectedRoutes.length})` : "All"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">Filter by Routes</DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">
                        Select one or more routes to filter markers. Default shows all routes.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 pt-4 max-h-[400px] overflow-y-auto">
                      {availableRoutes.map((route) => {
                        const routeMarkersCount = allMarkers.filter(m => m.route === route && m.isFromRoute).length
                        const isSelected = selectedRoutes.includes(route)
                        return (
                          <button
                            key={route}
                            onClick={() => toggleRoute(route)}
                            className={`w-full h-12 rounded-xl flex items-center px-4 transition-all ${
                              isSelected
                                ? 'bg-blue-500/10 border-2 border-blue-500/50 hover:bg-blue-500/20'
                                : 'border-2 border-transparent bg-muted/20 hover:bg-muted/40'
                            }`}
                          >
                            <div className={`h-5 w-5 rounded border-2 flex items-center justify-center mr-3 ${
                              isSelected
                                ? 'bg-blue-500 border-blue-500'
                                : 'border-muted-foreground/30'
                            }`}>
                              {isSelected && (
                                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className="flex-1 text-left font-medium">
                              {route}
                              <span className="text-xs ml-2 opacity-70">({routeMarkersCount} markers)</span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button
                        onClick={clearRouteFilter}
                        variant="outline"
                        className="flex-1 h-10 rounded-xl"
                      >
                        Clear All
                      </Button>
                      <Button
                        onClick={applyRouteFilter}
                        className="flex-1 h-10 rounded-xl bg-blue-500 hover:bg-blue-600"
                      >
                        Apply Filter
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-9 px-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm">
                      Add Marker
                    </Button>
                  </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Add New Marker</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Enter a name for your new marker. It will be placed at a random location near the map center.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-marker-title" className="text-sm font-medium">Marker Title</Label>
                      <Input
                        id="modal-marker-title"
                        placeholder="Enter marker name..."
                        value={newMarkerTitle}
                        onChange={(e) => setNewMarkerTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addMarker()}
                        className="h-10 rounded-xl border-0 bg-muted/30 backdrop-blur-xl focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => setIsModalOpen(false)}
                        variant="outline"
                        className="flex-1 h-10 rounded-xl border-0 bg-muted/30 hover:bg-muted/50"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={addMarker}
                        className="flex-1 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        disabled={!newMarkerTitle.trim()}
                      >
                        Add Marker
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              </div>
            </div>
            
            {/* OpenStreetMap */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-0 bg-background shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 10},${mapCenter.lat - 5},${mapCenter.lng + 10},${mapCenter.lat + 5}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`}
                className="rounded-2xl"
              />
              <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-medium border-0 shadow-lg">
                <span style={{ WebkitTextSizeAdjust: 'none', textSizeAdjust: 'none' }}>
                  Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)} | Zoom: {zoom}
                </span>
              </div>
            </div>
          </div>

          {/* Marker Controls - Below Map */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Active Markers ({markers.length})</Label>
            <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl bg-muted/20 backdrop-blur-xl border-0 p-3">
              {markers.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No markers added
                </p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2">
                  {markers.map((marker) => (
                    <div
                      key={marker.id}
                      className={`flex items-center justify-between rounded-xl p-3 transition-all ${
                        selectedMarker?.id === marker.id
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : 'hover:bg-muted/40'
                      }`}
                    >
                      <button
                        onClick={() => centerOnMarker(marker)}
                        className="flex-1 text-left space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm">{marker.title}</div>
                          {marker.isFromRoute && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {marker.route}
                            </span>
                          )}
                        </div>
                        {marker.code && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-primary font-semibold">Code: {marker.code}</span>
                            {marker.delivery && (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                marker.delivery === 'Express' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                marker.delivery === 'Daily' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                              }`}>
                                {marker.delivery}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground" style={{ WebkitTextSizeAdjust: 'none', textSizeAdjust: 'none' }}>
                          {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                        </div>
                      </button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeMarker(marker.id)}
                        className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 hover:text-red-600"
                        disabled={marker.isFromRoute}
                        title={marker.isFromRoute ? "Cannot remove route markers" : "Remove marker"}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Map Information */}
      <Card className="p-6 rounded-2xl bg-card/80 backdrop-blur-xl border-0 shadow-lg">
        <div className="space-y-4">
          <h3 className="text-base font-semibold tracking-tight">Map Information</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <Label className="text-sm text-muted-foreground font-medium">Total Markers</Label>
              <p className="text-3xl font-bold mt-2">{markers.length}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-500/10">
              <Label className="text-sm text-green-700 dark:text-green-400 font-medium">Active Routes</Label>
              <p className="text-3xl font-bold mt-2 text-green-700 dark:text-green-400">
                {markers.filter(m => m.isFromRoute).length}
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <Label className="text-sm text-muted-foreground font-medium">Current Zoom Level</Label>
              <p className="text-3xl font-bold mt-2">{zoom}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <Label className="text-sm text-muted-foreground font-medium">Selected Marker</Label>
              <p className="text-xl font-bold mt-2 truncate" title={selectedMarker ? selectedMarker.title : 'None'}>
                {selectedMarker ? selectedMarker.title : 'None'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 rounded-2xl bg-blue-500/5 backdrop-blur-xl border border-blue-500/10 shadow-lg">
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            How to Use
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed list-disc list-inside">
            <li>Active route markers are automatically loaded from the Routes page (status: ON)</li>
            <li>Green "Active Route" badges indicate markers generated from route data</li>
            <li>Click on markers in the list to center the map on that location</li>
            <li>Use the "Add Marker" button to create custom markers at random locations</li>
            <li>Route markers cannot be deleted, only custom markers can be removed</li>
            <li>View marker details including location code and delivery type</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4 italic leading-relaxed">
            Note: Using OpenStreetMap for map display. Active route markers are synced from the Routes page. 
            Only locations with active status (ON) are displayed on the map.
            For advanced features with interactive markers directly on the map, consider integrating 
            Leaflet, Google Maps API, or Mapbox.
          </p>
        </div>
      </Card>
    </div>
  )
}
