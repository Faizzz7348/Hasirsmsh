"use client"

import * as React from "react"
import {
  Home,
  Search,
  Settings,
  User,
  FileText,
  MessageSquare,
  Bell,
  BarChart,
  Inbox,
  Calendar,
  LogOut,
  MapPin,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: Users,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
]

const workspaceItems = [
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Maps Marker",
    url: "/maps",
    icon: MapPin,
  },
  {
    title: "Routes",
    url: "/routes",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
]

const settingsItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false)

  const handleLogout = () => {
    // Clear any auth tokens/session
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Close dialog
    setShowLogoutDialog(false)
    
    // Redirect to sign in page
    router.push('/signin')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  return (
    <Sidebar className="border-r-0 backdrop-blur-xl bg-sidebar-background/80 flex flex-col">
      <SidebarHeader className="border-b-0 bg-transparent backdrop-blur-xl px-4 py-3 flex-shrink-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" asChild className="hover:bg-sidebar-accent/50 rounded-2xl">
              <Link href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
                  <Home className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base text-sidebar-foreground">My App</span>
                  <span className="text-[11px] text-muted-foreground font-medium">Version 1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-transparent backdrop-blur-xl flex-1 overflow-y-auto">
        {/* Search Field */}
        <div className="px-4 py-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full pl-10 pr-3 text-sm bg-muted/10 backdrop-blur-xl border border-border/30 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:bg-muted/20"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
          </form>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide px-4 py-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-md hover:bg-sidebar-accent transition-colors h-7">
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-3.5 w-3.5 text-sidebar-foreground" />
                      <span className="font-medium text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-transparent my-2" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wide px-4 py-2">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {workspaceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-md hover:bg-sidebar-accent transition-colors h-7">
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-3.5 w-3.5 text-sidebar-foreground" />
                      <span className="font-medium text-xs">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar-accent/50 backdrop-blur-xl p-3 flex-shrink-0 mt-auto">
        <div className="space-y-2">
          {settingsItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sidebar-accent transition-all text-sidebar-foreground"
            >
              <item.icon className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          ))}
          
          <Button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full h-11 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-medium border border-red-500/20 transition-all mt-2"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className="text-sm">Log Out</span>
          </Button>
        </div>
        
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Confirm Logout</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Are you sure you want to log out? You will need to sign in again to access your account.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                onClick={() => setShowLogoutDialog(false)}
                variant="outline"
                className="flex-1 h-10 rounded-xl border-0 bg-muted/30 hover:bg-muted/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}
