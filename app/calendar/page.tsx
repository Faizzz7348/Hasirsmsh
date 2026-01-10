import { CalendarComponent } from "@/components/calendar-component"

export default function CalendarPage() {
  return (
    <div className="flex flex-col gap-4 p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          Manage your schedule and events. Click on dates to create new events,
          or click on existing events to delete them.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 flex-1">
        <CalendarComponent />
      </div>
    </div>
  )
}
