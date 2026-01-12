"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />
    case "error":
      return <XCircle className="w-5 h-5 text-red-500" />
    case "warning":
      return <AlertCircle className="w-5 h-5 text-orange-500" />
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />
  }
}

const NotificationToast = ({ notification, onClose }: { notification: Notification; onClose: () => void }) => {
  const bgColors = {
    success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    warning: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
    info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  }

  return (
    <div
      className={`${bgColors[notification.type]} border-2 rounded-lg shadow-lg p-4 mb-3 animate-in slide-in-from-right duration-300 min-w-[320px] max-w-md`}
    >
      <div className="flex items-start gap-3">
        <NotificationIcon type={notification.type} />
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export function NotificationDemo() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: Notification["type"], title: string, message: string, duration = 5000) => {
    const id = Date.now().toString()
    const newNotification: Notification = { id, type, title, message, duration }
    
    setNotifications((prev) => [...prev, newNotification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <>
      {/* Notification Container - Fixed position */}
      <div className="fixed top-20 right-4 z-50 flex flex-col">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      {/* Demo Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Examples
          </CardTitle>
          <CardDescription>Click the buttons to see different notification types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={() =>
                addNotification(
                  "success",
                  "Success!",
                  "Your changes have been saved successfully."
                )
              }
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Show Success
            </Button>

            <Button
              onClick={() =>
                addNotification(
                  "error",
                  "Error!",
                  "Something went wrong. Please try again."
                )
              }
              className="bg-red-600 hover:bg-red-700"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Show Error
            </Button>

            <Button
              onClick={() =>
                addNotification(
                  "warning",
                  "Warning!",
                  "This action cannot be undone."
                )
              }
              className="bg-orange-600 hover:bg-orange-700"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Show Warning
            </Button>

            <Button
              onClick={() =>
                addNotification(
                  "info",
                  "Information",
                  "You have 3 new messages."
                )
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Info className="w-4 h-4 mr-2" />
              Show Info
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-3">Multiple Notifications</h4>
            <Button
              onClick={() => {
                addNotification("success", "Task 1", "Completed successfully", 3000)
                setTimeout(() => {
                  addNotification("info", "Task 2", "Processing...", 3000)
                }, 500)
                setTimeout(() => {
                  addNotification("success", "Task 3", "All done!", 3000)
                }, 1000)
              }}
              variant="outline"
              className="w-full"
            >
              Show Multiple
            </Button>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Auto-dismiss after 5 seconds</li>
              <li>✅ Manual close button</li>
              <li>✅ Smooth animations</li>
              <li>✅ Stack multiple notifications</li>
              <li>✅ Responsive design</li>
              <li>✅ Dark mode support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
