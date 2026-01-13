"use client"

import React, { useState } from "react"
import { useTheme } from "next-themes"
import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import { SettingsMenu } from "@/components/settings-menu"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  Smartphone,
  Mail,
  Key,
  Eye,
  EyeOff,
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("general")
  const [showPassword, setShowPassword] = useState(false)
  const [accentColor, setAccentColor] = useState("purple")
  const [customTheme, setCustomTheme] = useState<string | null>(null)
  const [selectedFont, setSelectedFont] = useState("system")
  const [fontSize, setFontSize] = useState("medium")
  
  const fonts = [
    { value: "system", label: "System Default", family: "system-ui, -apple-system, sans-serif" },
    { value: "inter", label: "Inter", family: "'Inter', sans-serif" },
    { value: "roboto", label: "Roboto", family: "'Roboto', sans-serif" },
    { value: "open-sans", label: "Open Sans", family: "'Open Sans', sans-serif" },
    { value: "lato", label: "Lato", family: "'Lato', sans-serif" },
    { value: "poppins", label: "Poppins", family: "'Poppins', sans-serif" },
    { value: "montserrat", label: "Montserrat", family: "'Montserrat', sans-serif" },
    { value: "nunito", label: "Nunito", family: "'Nunito', sans-serif" },
  ]

  const fontSizes = [
    { value: "small", label: "Small", size: "14px" },
    { value: "medium", label: "Medium", size: "16px" },
    { value: "large", label: "Large", size: "18px" },
    { value: "extra-large", label: "Extra Large", size: "20px" },
  ]

  const applyFont = (fontValue: string) => {
    setSelectedFont(fontValue)
    const font = fonts.find(f => f.value === fontValue)
    if (font) {
      document.documentElement.style.setProperty('--font-family', font.family)
    }
  }

  const applyFontSize = (sizeValue: string) => {
    setFontSize(sizeValue)
    const size = fontSizes.find(s => s.value === sizeValue)
    if (size) {
      document.documentElement.style.setProperty('--base-font-size', size.size)
    }
  }
  
  const [settings, setSettings] = useState({
    // General
    siteName: "Hasirsmsh",
    siteUrl: "https://hasirsmsh.com",
    language: "id",
    timezone: "Asia/Jakarta",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    weeklyReport: true,
    
    // Privacy
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    twoFactorAuth: false,
    
    // Security
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleAccentColorChange = (color: string) => {
    setAccentColor(color)
    document.documentElement.style.setProperty('--accent-color', color)
  }

  const applyCustomTheme = (themeName: string) => {
    setCustomTheme(themeName)
    const root = document.documentElement
    
    // Remove any existing theme classes
    root.classList.remove('theme-twitter', 'theme-twitter-dark', 'theme-cosmic-night', 'theme-ocean-breeze', 'theme-forest-green', 'theme-sunset-orange', 'theme-midnight-blue')
    
    // Add the selected theme class
    root.classList.add(`theme-${themeName}`)
    
    // Set appropriate base theme (light or dark)
    switch(themeName) {
      case 'twitter':
      case 'ocean-breeze':
      case 'sunset-orange':
        setTheme('light')
        break
      case 'cosmic-night':
      case 'forest-green':
      case 'midnight-blue':
        setTheme('dark')
        break
      default:
        break
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    alert("Settings berhasil disimpan!")
  }

  const tabs = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
  ]

  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center justify-between gap-2 flex-1">
            <h1 className="text-lg font-semibold">Settings</h1>
            <SettingsMenu 
              items={tabs}
              activeItem={activeTab}
              onItemSelect={setActiveTab}
            />
          </div>
        </header>
        <div className="flex flex-col gap-6 p-6 h-[calc(100vh-64px)] overflow-y-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* Header */}
            <div>
              <p className="text-gray-600 dark:text-gray-400">Kelola preferensi dan konfigurasi aplikasi Anda</p>
            </div>

        <div className="space-y-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-600" />
                    General Settings
                  </CardTitle>
                  <CardDescription>Pengaturan dasar aplikasi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName" className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-600" />
                        Site Name
                      </Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => handleInputChange("siteName", e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteUrl">Site URL</Label>
                      <Input
                        id="siteUrl"
                        value={settings.siteUrl}
                        onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={settings.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                        <option value="ms">Bahasa Melayu</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        value={settings.timezone}
                        onChange={(e) => handleInputChange("timezone", e.target.value)}
                        className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                        <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                        <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                        <option value="Asia/Singapore">Asia/Singapore</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>Kelola informasi akun Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                          AF
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">Ahmad Faiz</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ahmad.faiz@example.com</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                        Change Avatar
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue="Ahmad Faiz"
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="ahmad.faiz@example.com"
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-purple-600" />
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          defaultValue="+62 812-3456-7890"
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          defaultValue="@ahmadfaiz"
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Kelola preferensi notifikasi Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <Label className="font-medium">Email Notifications</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Terima notifikasi via email</p>
                      </div>
                      <Checkbox
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleInputChange("emailNotifications", checked as boolean)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-purple-600" />
                          <Label className="font-medium">Push Notifications</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Terima push notifications di browser</p>
                      </div>
                      <Checkbox
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleInputChange("pushNotifications", checked as boolean)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-purple-600" />
                          <Label className="font-medium">SMS Notifications</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Terima notifikasi via SMS</p>
                      </div>
                      <Checkbox
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleInputChange("smsNotifications", checked as boolean)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Weekly Report</Label>
                        <p className="text-sm text-muted-foreground">Terima laporan mingguan aktivitas</p>
                      </div>
                      <Checkbox
                        checked={settings.weeklyReport}
                        onCheckedChange={(checked) => handleInputChange("weeklyReport", checked as boolean)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>Kontrol privasi dan visibilitas data Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <select
                        id="profileVisibility"
                        value={settings.profileVisibility}
                        onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
                        className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="public">Public - Semua orang bisa melihat</option>
                        <option value="friends">Friends - Hanya teman</option>
                        <option value="private">Private - Hanya saya</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Show Email Address</Label>
                        <p className="text-sm text-muted-foreground">Tampilkan email di profil publik</p>
                      </div>
                      <Checkbox
                        checked={settings.showEmail}
                        onCheckedChange={(checked) => handleInputChange("showEmail", checked as boolean)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Show Phone Number</Label>
                        <p className="text-sm text-muted-foreground">Tampilkan nomor telepon di profil publik</p>
                      </div>
                      <Checkbox
                        checked={settings.showPhone}
                        onCheckedChange={(checked) => handleInputChange("showPhone", checked as boolean)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-600" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Amankan akun Anda dengan fitur keamanan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Two Factor Auth */}
                  <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-purple-600" />
                        <Label className="font-medium">Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra</p>
                    </div>
                    <Checkbox
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleInputChange("twoFactorAuth", checked as boolean)}
                    />
                  </div>

                  <Separator />

                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Change Password</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            value={settings.currentPassword}
                            onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                            className="border-purple-200 focus:border-purple-500 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={settings.newPassword}
                          onChange={(e) => handleInputChange("newPassword", e.target.value)}
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={settings.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="border-purple-200 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Sesuaikan tampilan aplikasi sesuai preferensi Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-3 block">Preset Themes</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button 
                          onClick={() => applyCustomTheme('twitter')}
                          className={`p-3 border-2 ${customTheme === 'twitter' ? 'border-blue-500' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-white to-blue-50 border rounded mb-2 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="text-xs font-medium">Twitter</p>
                        </button>
                        
                        <button 
                          onClick={() => applyCustomTheme('cosmic-night')}
                          className={`p-3 border-2 ${customTheme === 'cosmic-night' ? 'border-purple-500' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-indigo-950 to-purple-900 border rounded mb-2 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-200"></div>
                          </div>
                          <p className="text-xs font-medium">Cosmic Night</p>
                        </button>
                        
                        <button 
                          onClick={() => applyCustomTheme('ocean-breeze')}
                          className={`p-3 border-2 ${customTheme === 'ocean-breeze' ? 'border-cyan-500' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-cyan-100 to-blue-200 border rounded mb-2 flex items-center justify-center">
                            <div className="w-6 h-1 rounded-full bg-blue-600"></div>
                          </div>
                          <p className="text-xs font-medium">Ocean Breeze</p>
                        </button>
                        
                        <button 
                          onClick={() => applyCustomTheme('forest-green')}
                          className={`p-3 border-2 ${customTheme === 'forest-green' ? 'border-green-500' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-green-950 to-green-800 border rounded mb-2 flex items-center justify-center">
                            <div className="w-4 h-6 bg-green-600 rounded-t-full"></div>
                          </div>
                          <p className="text-xs font-medium">Forest Green</p>
                        </button>
                        
                        <button 
                          onClick={() => applyCustomTheme('sunset-orange')}
                          className={`p-3 border-2 ${customTheme === 'sunset-orange' ? 'border-orange-500' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-orange-100 to-red-200 border rounded mb-2 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                          </div>
                          <p className="text-xs font-medium">Sunset Orange</p>
                        </button>
                        
                        <button 
                          onClick={() => applyCustomTheme('midnight-blue')}
                          className={`p-3 border-2 ${customTheme === 'midnight-blue' ? 'border-blue-700' : 'border-gray-300'} rounded-lg hover:shadow-lg transition-all`}
                        >
                          <div className="w-full h-16 bg-gradient-to-br from-blue-950 to-slate-900 border rounded mb-2 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                          </div>
                          <p className="text-xs font-medium">Midnight Blue</p>
                        </button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="mb-3 block">Font Family</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {fonts.map((font) => (
                          <button
                            key={font.value}
                            onClick={() => applyFont(font.value)}
                            className={`p-3 border-2 ${selectedFont === font.value ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' : 'border-gray-300'} rounded-lg hover:shadow-md transition-all text-sm`}
                            style={{ fontFamily: font.family }}
                          >
                            {font.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="mb-3 block">Font Size</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {fontSizes.map((size) => (
                          <button
                            key={size.value}
                            onClick={() => applyFontSize(size.value)}
                            className={`p-3 border-2 ${fontSize === size.value ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' : 'border-gray-300'} rounded-lg hover:shadow-md transition-all`}
                          >
                            <div className="font-medium mb-1">{size.label}</div>
                            <div className="text-xs text-muted-foreground">{size.size}</div>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Preview: <span style={{ fontSize: fontSizes.find(s => s.value === fontSize)?.size }}>The quick brown fox jumps over the lazy dog</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}

