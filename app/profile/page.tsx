"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ResponsiveSidebarProvider } from "@/components/responsive-sidebar-provider"
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Ahmad Faiz",
    email: "ahmad.faiz@example.com",
    phone: "+62 812-3456-7890",
    location: "Jakarta, Indonesia",
    position: "Full Stack Developer",
    department: "Engineering",
    joinDate: "January 15, 2024",
    bio: "Passionate developer with expertise in React, Next.js, and TypeScript. Love building modern web applications.",
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to API
    console.log("Saving profile:", profile)
  }

  return (
    <ResponsiveSidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
        </header>
        <div className="h-[calc(100vh-64px)] overflow-y-auto bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
              </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-sky-600 hover:bg-sky-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <Card className="border-sky-200 dark:border-sky-800">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30">
                <User className="w-12 h-12" />
              </div>
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-sky-100">{profile.position}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 text-sky-600" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-sky-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-sky-600" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Briefcase className="w-4 h-4 text-sky-600" />
                  Position
                </Label>
                <Input
                  id="position"
                  value={profile.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Briefcase className="w-4 h-4 text-sky-600" />
                  Department
                </Label>
                <Input
                  id="department"
                  value={profile.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  disabled={!isEditing}
                  className="border-sky-200 focus:border-sky-500 disabled:opacity-100"
                />
              </div>

              {/* Join Date */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="joinDate" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  Join Date
                </Label>
                <Input
                  id="joinDate"
                  value={profile.joinDate}
                  disabled={true}
                  className="border-sky-200 disabled:opacity-100"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-gray-50 disabled:opacity-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-sky-600">24</div>
              <p className="text-xs text-gray-500 mt-1">Active projects</p>
            </CardContent>
          </Card>

          <Card className="border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">156</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <p className="text-xs text-gray-500 mt-1">Team members</p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
      </SidebarInset>
    </ResponsiveSidebarProvider>
  )
}

