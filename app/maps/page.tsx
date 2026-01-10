import { MapsComponent } from "@/components/maps-component"

export default function MapsPage() {
  return (
    <div className="flex flex-col gap-4 p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Maps Marker</h1>
        <p className="text-muted-foreground">
          Interactive map with markers. Add, remove, and manage location markers on the map.
          Click on markers to see details and interact with the map controls.
        </p>
      </div>

      <div className="flex-1">
        <MapsComponent />
      </div>
    </div>
  )
}
