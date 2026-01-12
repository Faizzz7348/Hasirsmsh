"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DeviceInfo } from "@/components/device-info"
import { NotificationDemo } from "@/components/notification-demo"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { FloatingDockWrapper } from "@/components/floating-dock-wrapper"

export default function Home() {
  return (
    <TooltipProvider>
      <ResponsiveSidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Welcome</h2>
                <p className="text-sm text-muted-foreground">
                  This is a responsive dashboard with auto device detection.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Features</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Auto responsive layout</li>
                  <li>• Device detection</li>
                  <li>• Multiple themes</li>
                </ul>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Themes</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Twitter (Light/Dark)</li>
                  <li>• Graphite</li>
                  <li>• Cosmic Night</li>
                </ul>
              </div>
            </div>
            
            <DeviceInfo />
            
            <NotificationDemo />
            
            <div className="flex-1 rounded-xl bg-muted/50 p-4">
              <h2 className="font-semibold mb-4">Responsive Design</h2>
              <p className="text-sm text-muted-foreground mb-4">
                This dashboard automatically adapts to your screen size:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • <strong>Mobile (&lt;768px):</strong> Compact layout with collapsible sidebar
                </li>
                <li>
                  • <strong>Tablet (768px-1024px):</strong> Medium layout optimized for touch
                </li>
                <li>
                  • <strong>Desktop (1024px-1280px):</strong> Full layout with expanded sidebar
                </li>
                <li>
                  • <strong>Large Desktop (≥1280px):</strong> Wide layout with maximum content
                </li>
                <li>
                  • Sidebar automatically collapses on mobile and tablet for better space
                </li>
                <li>
                  • Touch gestures enabled on touch devices
                </li>
              </ul>
            </div>
          </div>
          <FloatingDockWrapper />
        </SidebarInset>
      </ResponsiveSidebarProvider>
    </TooltipProvider>
  )
}
