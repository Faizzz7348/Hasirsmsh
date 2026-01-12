"use client"

import * as React from "react"
import { useScreenSize, useDeviceDetection } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Smartphone, Tablet, Laptop } from "lucide-react"

export function DeviceInfo() {
  const [mounted, setMounted] = React.useState(false)
  const screenInfo = useScreenSize()
  const deviceInfo = useDeviceDetection()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const getDeviceIcon = () => {
    if (screenInfo.isMobile) return <Smartphone className="h-5 w-5" />
    if (screenInfo.isTablet) return <Tablet className="h-5 w-5" />
    if (screenInfo.isLargeDesktop) return <Monitor className="h-5 w-5" />
    return <Laptop className="h-5 w-5" />
  }

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            Device Information
          </CardTitle>
          <CardDescription>Auto-detected screen and device details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Device Type</p>
              <p className="text-lg font-semibold">Loading...</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Orientation</p>
              <p className="text-lg font-semibold">Loading...</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Screen Width</p>
              <p className="text-lg font-semibold">Loading...</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Screen Height</p>
              <p className="text-lg font-semibold">Loading...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getDeviceIcon()}
          Device Information
        </CardTitle>
        <CardDescription>Auto-detected screen and device details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Device Type</p>
            <p className="text-lg font-semibold capitalize">{screenInfo.deviceType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Orientation</p>
            <p className="text-lg font-semibold capitalize">{screenInfo.orientation}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Screen Width</p>
            <p className="text-lg font-semibold">{screenInfo.width}px</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Screen Height</p>
            <p className="text-lg font-semibold">{screenInfo.height}px</p>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <p className="text-sm font-medium">Platform Details</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isTouchDevice ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Touch Device</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isIOS ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>iOS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isAndroid ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Android</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isWindows ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Windows</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isMac ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Mac</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${deviceInfo.isLinux ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Linux</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <p className="text-sm font-medium">Responsive Breakpoints</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${screenInfo.isMobile ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <span>Mobile: &lt; 768px</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${screenInfo.isTablet ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <span>Tablet: 768px - 1024px</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${screenInfo.isDesktop && !screenInfo.isLargeDesktop ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <span>Desktop: 1024px - 1280px</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${screenInfo.isLargeDesktop ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <span>Large Desktop: ≥ 1280px</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
