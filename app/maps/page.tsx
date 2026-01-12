"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { MapsComponent } from "@/components/maps-component"
import { FloatingDockWrapper } from "@/components/floating-dock-wrapper"

export default function MapsPage() {
  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Maps Marker</h1>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-6 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">
              Interactive map with markers. Add, remove, and manage location markers on the map.
              Click on markers to see details and interact with the map controls.
            </p>
          </div>

          <div className="flex-1">
            <MapsComponent />
          </div>
        </div>
        <FloatingDockWrapper />
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}
