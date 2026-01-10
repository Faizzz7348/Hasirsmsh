"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <ThemeSwitcher />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Welcome</h2>
                <p className="text-sm text-muted-foreground">
                  This is a demo sidebar built with shadcn/ui components.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Features</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Collapsible sidebar</li>
                  <li>• Mobile responsive</li>
                  <li>• Multiple themes</li>
                </ul>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h2 className="font-semibold mb-2">Themes</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Graphite</li>
                  <li>• Twitter</li>
                  <li>• Cosmic Night</li>
                </ul>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 p-4">
              <h2 className="font-semibold mb-4">Content Area</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Try out the different features:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  • Click the sidebar toggle button to collapse/expand the sidebar
                </li>
                <li>
                  • Click the theme button (paint palette icon) in the top right to
                  switch between different themes
                </li>
                <li>
                  • Try the Graphite, Twitter, and Cosmic Night themes!
                </li>
                <li>
                  • The sidebar is fully responsive and works great on mobile devices
                </li>
              </ul>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
