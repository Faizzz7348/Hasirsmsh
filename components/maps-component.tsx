"use client"

import { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Marker {
  id: number
  lat: number
  lng: number
  title: string
}

export function MapsComponent() {
  const [markers, setMarkers] = useState<Marker[]>([
    { id: 1, lat: 40.7128, lng: -74.0060, title: "New York" },
    { id: 2, lat: 34.0522, lng: -118.2437, title: "Los Angeles" },
    { id: 3, lat: 41.8781, lng: -87.6298, title: "Chicago" },
  ])
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [newMarkerTitle, setNewMarkerTitle] = useState("")
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 })
  const [zoom, setZoom] = useState(4)

  const addMarker = useCallback(() => {
    if (newMarkerTitle.trim()) {
      const newMarker: Marker = {
        id: Date.now(),
        lat: mapCenter.lat + (Math.random() - 0.5) * 10,
        lng: mapCenter.lng + (Math.random() - 0.5) * 10,
        title: newMarkerTitle,
      }
      setMarkers(prev => [...prev, newMarker])
      setNewMarkerTitle("")
    }
  }, [newMarkerTitle, mapCenter])

  const removeMarker = useCallback((id: number) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id))
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
      <div className="grid gap-4 md:grid-cols-3">
        {/* Map Display Area */}
        <Card className="md:col-span-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Interactive Map</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(zoom + 1, 18))}
                >
                  Zoom In
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(zoom - 1, 1))}
                >
                  Zoom Out
                </Button>
              </div>
            </div>
            
            {/* OpenStreetMap with Leaflet */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-background">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 10},${mapCenter.lat - 5},${mapCenter.lng + 10},${mapCenter.lat + 5}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`}
                className="rounded-lg"
              />
              <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-xs border">
                Center: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)} | Zoom: {zoom}
              </div>
            </div>
          </div>
        </Card>

        {/* Marker Controls */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Marker Controls</h3>
              <p className="text-sm text-muted-foreground">
                Add and manage map markers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marker-title">New Marker Title</Label>
              <Input
                id="marker-title"
                placeholder="Enter marker name..."
                value={newMarkerTitle}
                onChange={(e) => setNewMarkerTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMarker()}
              />
              <Button onClick={addMarker} className="w-full">
                Add Marker
              </Button>
            </div>

            <div className="space-y-2">
              <Button
                onClick={clearMarkers}
                variant="destructive"
                className="w-full"
              >
                Clear All Markers
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Active Markers ({markers.length})</Label>
              <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border p-3">
                {markers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No markers added
                  </p>
                ) : (
                  markers.map((marker) => (
                    <div
                      key={marker.id}
                      className={`flex items-center justify-between rounded p-2 transition-colors ${
                        selectedMarker?.id === marker.id
                          ? 'bg-primary/10'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <button
                        onClick={() => centerOnMarker(marker)}
                        className="flex-1 text-left text-sm"
                      >
                        <div className="font-medium">{marker.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                        </div>
                      </button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeMarker(marker.id)}
                        className="h-8 w-8 p-0"
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
                  ))
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Map Information */}
      <Card className="p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Map Information</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label className="text-muted-foreground">Total Markers</Label>
              <p className="text-2xl font-bold">{markers.length}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Current Zoom Level</Label>
              <p className="text-2xl font-bold">{zoom}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Selected Marker</Label>
              <p className="text-2xl font-bold">
                {selectedMarker ? selectedMarker.title : 'None'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-muted/50">
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
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
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Click on markers in the list to center the map on that location</li>
            <li>Use the "Add Marker" button to create new markers at random locations</li>
            <li>Click the X button next to a marker to remove it</li>
            <li>Use zoom controls to adjust the map view</li>
            <li>Click "Clear All Markers" to remove all markers at once</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Note: Using OpenStreetMap for map display. Map is embedded via iframe. 
            For advanced features with interactive markers directly on the map, consider integrating 
            Leaflet, Google Maps API, or Mapbox.
          </p>
        </div>
      </Card>
    </div>
  )
}
