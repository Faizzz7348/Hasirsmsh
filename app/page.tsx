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

export default function Home() {
  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-3 border-b-0 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 px-4 sticky top-0 z-10 shadow-sm">
          <SidebarTrigger className="-ml-1 h-8 w-8" />
          <Separator orientation="vertical" className="mr-2 h-5 bg-border/30" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-base font-semibold tracking-tight">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-48px)] overflow-y-auto bg-muted/30">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-2xl bg-card backdrop-blur-xl border-0 shadow-lg p-4">
                <h2 className="text-base font-semibold mb-2 tracking-tight">Welcome</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is a responsive dashboard with auto device detection.
                </p>
              </div>
              <div className="aspect-video rounded-2xl bg-card backdrop-blur-xl border-0 shadow-lg p-4">
                <h2 className="text-base font-semibold mb-2 tracking-tight">Features</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>• Auto responsive layout</li>
                  <li>• Device detection</li>
                  <li>• Multiple themes</li>
                </ul>
              </div>
              <div className="aspect-video rounded-2xl bg-card backdrop-blur-xl border-0 shadow-lg p-4">
                <h2 className="text-base font-semibold mb-2 tracking-tight">Themes</h2>
                <ul className="text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                  <li>• Twitter (Light/Dark)</li>
                  <li>• Graphite</li>
                  <li>• Cosmic Night</li>
                </ul>
              </div>
            </div>
            
            <DeviceInfo />
            
            <NotificationDemo />
            
            <div className="flex-1 rounded-2xl bg-card backdrop-blur-xl border-0 shadow-lg p-4">
              <h2 className="text-base font-semibold mb-3 tracking-tight">Responsive Design</h2>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                This dashboard automatically adapts to your screen size:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
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
        </SidebarInset>
      </ResponsiveSidebarProvider>
  )
}
