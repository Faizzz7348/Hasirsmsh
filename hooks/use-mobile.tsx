"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-desktop'

export interface ScreenInfo {
  width: number
  height: number
  deviceType: DeviceType
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  orientation: 'portrait' | 'landscape'
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useScreenSize(): ScreenInfo {
  const [screenInfo, setScreenInfo] = React.useState<ScreenInfo>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    deviceType: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLargeDesktop: false,
    orientation: 'landscape'
  })

  React.useEffect(() => {
    const getDeviceType = (width: number): DeviceType => {
      if (width < MOBILE_BREAKPOINT) return 'mobile'
      if (width < TABLET_BREAKPOINT) return 'tablet'
      if (width < DESKTOP_BREAKPOINT) return 'desktop'
      return 'large-desktop'
    }

    const updateScreenInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const deviceType = getDeviceType(width)

      setScreenInfo({
        width,
        height,
        deviceType,
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop' || deviceType === 'large-desktop',
        isLargeDesktop: deviceType === 'large-desktop',
        orientation: width > height ? 'landscape' : 'portrait'
      })
    }

    updateScreenInfo()

    const handleResize = () => {
      updateScreenInfo()
    }

    const handleOrientationChange = () => {
      updateScreenInfo()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return screenInfo
}

export function useDeviceDetection() {
  const [deviceInfo, setDeviceInfo] = React.useState({
    userAgent: '',
    platform: '',
    isIOS: false,
    isAndroid: false,
    isWindows: false,
    isMac: false,
    isLinux: false,
    isTouchDevice: false,
  })

  React.useEffect(() => {
    const ua = navigator.userAgent
    const platform = navigator.platform

    setDeviceInfo({
      userAgent: ua,
      platform: platform,
      isIOS: /iPad|iPhone|iPod/.test(ua),
      isAndroid: /Android/.test(ua),
      isWindows: /Win/.test(platform),
      isMac: /Mac/.test(platform),
      isLinux: /Linux/.test(platform),
      isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    })
  }, [])

  return deviceInfo
}
