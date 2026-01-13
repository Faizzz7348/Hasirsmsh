"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { MapsComponent } from "@/components/maps-component"

export default function MapsPage() {
  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-3 border-b-0 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 px-4 sticky top-0 z-10 shadow-sm">
          <SidebarTrigger className="-ml-1 h-8 w-8" />
          <Separator orientation="vertical" className="mr-2 h-5 bg-border/30" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-base font-semibold tracking-tight">Maps Marker</h1>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-48px)] overflow-y-auto bg-muted/30">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interactive map with markers automatically generated from active route locations. 
              View all active delivery points with their coordinates, codes, and delivery types.
              Add custom markers or manage existing ones with the map controls.
            </p>
          </div>

          <div className="flex-1">
            <MapsComponent />
          </div>
        </div>
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}
