"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { CalendarComponent } from "@/components/calendar-component"

export default function CalendarPage() {
  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Calendar</h1>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-4 md:p-6 h-[calc(100vh-64px)] overflow-hidden">
          <div className="flex flex-col gap-2 flex-shrink-0">
            <p className="text-muted-foreground">
              Manage your schedule and events. Click on dates to create new events,
              or click on existing events to delete them.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4 md:p-6 flex-1 overflow-auto min-h-0">
            <CalendarComponent />
          </div>
        </div>
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}
