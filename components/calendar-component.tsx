"use client"

import React, { useState, useRef, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg, DateSelectArg, EventInput } from "@fullcalendar/core"
import { Calendar, CalendarDays, CalendarRange, List, Plus, X, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  backgroundColor?: string
  borderColor?: string
  description?: string
}

type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek"

interface ViewOption {
  value: ViewMode
  label: string
  icon: React.ReactNode
  color: string
}

export function CalendarComponent() {
  const calendarRef = useRef<any>(null)
  const [currentView, setCurrentView] = useState<ViewMode>("dayGridMonth")
  const containerRef = useRef<HTMLDivElement>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    color: "#3b82f6"
  })
  
  // Force calendar to resize when window/container changes
  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi()
        // Use setTimeout to ensure DOM has updated
        setTimeout(() => {
          calendarApi.updateSize()
        }, 50)
      }
    }

    // Listen for window resize
    window.addEventListener('resize', handleResize)
    
    // Listen for sidebar state changes using MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          // Delay to let transition complete
          setTimeout(handleResize, 300)
        }
      })
    })
    
    const sidebarElement = document.querySelector('[data-sidebar]')
    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true, attributeFilter: ['data-state'] })
    }

    // Also observe container size changes
    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Initial resize after mount
    const timer = setTimeout(handleResize, 200)

    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      resizeObserver.disconnect()
      clearTimeout(timer)
    }
  }, [])
  
  const viewOptions: ViewOption[] = [
    {
      value: "dayGridMonth",
      label: "Month",
      icon: <Calendar className="w-4 h-4" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      value: "timeGridWeek",
      label: "Week",
      icon: <CalendarRange className="w-4 h-4" />,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      value: "timeGridDay",
      label: "Day",
      icon: <CalendarDays className="w-4 h-4" />,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      value: "listWeek",
      label: "List",
      icon: <List className="w-4 h-4" />,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  const cycleView = () => {
    const currentIndex = viewOptions.findIndex(opt => opt.value === currentView)
    const nextIndex = (currentIndex + 1) % viewOptions.length
    const nextView = viewOptions[nextIndex].value
    
    setCurrentView(nextView)
    
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      calendarApi.changeView(nextView)
    }
  }

  const getCurrentViewOption = () => {
    return viewOptions.find(opt => opt.value === currentView) || viewOptions[0]
  }

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: new Date().toISOString().split("T")[0] + "T10:00:00",
      end: new Date().toISOString().split("T")[0] + "T11:00:00",
      backgroundColor: "#3b82f6",
      borderColor: "#3b82f6",
      description: "Weekly team sync meeting"
    },
    {
      id: "2",
      title: "Project Deadline",
      start: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      allDay: true,
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
      description: "Final submission deadline"
    },
    {
      id: "3",
      title: "Lunch Break",
      start: new Date().toISOString().split("T")[0] + "T12:00:00",
      end: new Date().toISOString().split("T")[0] + "T13:00:00",
      backgroundColor: "#22c55e",
      borderColor: "#22c55e",
      description: "Daily lunch break"
    },
  ])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo)
    setSelectedEvent(null)
    setEventForm({
      title: "",
      description: "",
      startTime: selectInfo.allDay ? "" : selectInfo.startStr.split("T")[1]?.slice(0, 5) || "09:00",
      endTime: selectInfo.allDay ? "" : selectInfo.endStr.split("T")[1]?.slice(0, 5) || "10:00",
      color: "#3b82f6"
    })
    setShowEventModal(true)
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    const eventData = events.find(e => e.id === clickInfo.event.id)
    if (eventData) {
      setSelectedEvent(eventData)
      setShowEventModal(true)
    }
  }

  const handleSaveEvent = () => {
    if (!eventForm.title.trim()) return

    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id
          ? {
              ...event,
              title: eventForm.title,
              description: eventForm.description,
              backgroundColor: eventForm.color,
              borderColor: eventForm.color,
            }
          : event
      )
      setEvents(updatedEvents)
    } else if (selectedDate) {
      // Create new event
      const calendarApi = selectedDate.view.calendar
      const startDate = selectedDate.startStr.split("T")[0]
      const endDate = selectedDate.endStr.split("T")[0]
      
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title: eventForm.title,
        description: eventForm.description,
        start: selectedDate.allDay ? startDate : `${startDate}T${eventForm.startTime}:00`,
        end: selectedDate.allDay ? endDate : `${startDate}T${eventForm.endTime}:00`,
        allDay: selectedDate.allDay,
        backgroundColor: eventForm.color,
        borderColor: eventForm.color,
      }

      setEvents([...events, newEvent])
      calendarApi.addEvent(newEvent)
      calendarApi.unselect()
    }

    setShowEventModal(false)
    setSelectedDate(null)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id))
      
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi()
        const event = calendarApi.getEventById(selectedEvent.id)
        if (event) event.remove()
      }
    }
    setShowEventModal(false)
    setSelectedEvent(null)
  }

  const currentViewOption = getCurrentViewOption()

  return (
    <>
      <div ref={containerRef} className="calendar-wrapper w-full h-full min-h-[600px]">
        {/* Calendar with integrated view selector */}
        <div className="relative w-full">
          {/* Custom View Button positioned at top-right */}
          <div className="absolute top-[1px] right-0 z-[1]">
            <button
              onClick={cycleView}
              className={`
                ${currentViewOption.color}
                text-white px-4 py-2 rounded-lg
                flex items-center gap-2
                transition-all duration-200
                shadow-sm hover:shadow-md
                active:scale-95
                text-sm
              `}
            >
              {currentViewOption.icon}
              <span className="font-medium">{currentViewOption.label}</span>
              <svg 
                className="w-4 h-4 ml-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
          </div>
      <style jsx global>{`
        .calendar-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          transition: all 0.3s ease;
        }
        
        .fc {
          width: 100% !important;
          max-width: 100% !important;
          transition: width 0.3s ease;
          --fc-border-color: hsl(var(--border));
          --fc-button-bg-color: hsl(var(--primary));
          --fc-button-border-color: hsl(var(--primary));
          --fc-button-hover-bg-color: hsl(var(--primary) / 0.9);
          --fc-button-hover-border-color: hsl(var(--primary) / 0.9);
          --fc-button-active-bg-color: hsl(var(--primary) / 0.8);
          --fc-button-active-border-color: hsl(var(--primary) / 0.8);
          --fc-today-bg-color: hsl(var(--accent));
        }
        
        .fc .fc-view-harness {
          width: 100% !important;
          transition: width 0.3s ease;
        }

        .fc-header-toolbar {
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .fc-header-toolbar {
            font-size: 0.875rem;
          }
          
          .fc-toolbar-title {
            font-size: 1.25rem !important;
          }
          
          .fc-button {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
          }
        }

        /* Force calendar to use full width */
        .fc-view-harness-active > .fc-view {
          width: 100% !important;
        }
        
        /* Ensure table uses full width */
        .fc-scrollgrid {
          width: 100% !important;
        }
        
        /* Ensure all child tables expand */
        .fc-scrollgrid table {
          width: 100% !important;
        }
        
        /* Fix column widths */
        .fc-col-header {
          width: 100% !important;
        }
        
        .fc-daygrid-body {
          width: 100% !important;
        }

        .fc .fc-button {
          text-transform: capitalize;
          font-weight: 500;
          padding: 0.5rem 1rem;
        }

        /* Redesigned buttons for today, next, prev - similar to multiple button */
        .fc .fc-today-button,
        .fc .fc-next-button,
        .fc .fc-prev-button {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
          border: none !important;
          color: #ffffff !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 1rem !important;
          font-weight: 500 !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
          transition: all 0.2s ease !important;
        }

        /* Merge prev and next buttons */
        .fc .fc-prev-button {
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          margin-right: 0 !important;
        }

        .fc .fc-next-button {
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          margin-left: -1px !important;
        }

        .fc .fc-today-button {
          margin-left: 0.5rem !important;
        }

        .fc .fc-today-button:hover,
        .fc .fc-next-button:hover,
        .fc .fc-prev-button:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
          transform: translateY(-1px) !important;
        }

        .fc .fc-today-button:active,
        .fc .fc-next-button:active,
        .fc .fc-prev-button:active {
          transform: scale(0.95) !important;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
        }

        .fc .fc-today-button:disabled,
        .fc .fc-next-button:disabled,
        .fc .fc-prev-button:disabled {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
          opacity: 0.5 !important;
          cursor: not-allowed !important;
          transform: none !important;
        }

        /* Keep dark ocean for view buttons and day headers */
        .fc .fc-timeGridDay-button,
        .fc .fc-timeGridWeek-button,
        .fc .fc-dayGridMonth-button {
          background-color: #0c4a6e !important;
          border-color: #0c4a6e !important;
          color: #ffffff !important;
        }

        .fc .fc-timeGridDay-button:hover,
        .fc .fc-timeGridWeek-button:hover,
        .fc .fc-dayGridMonth-button:hover {
          background-color: #075985 !important;
          border-color: #075985 !important;
        }

        .fc .fc-timeGridDay-button:active,
        .fc .fc-timeGridWeek-button:active,
        .fc .fc-dayGridMonth-button:active,
        .fc .fc-timeGridDay-button.fc-button-active,
        .fc .fc-timeGridWeek-button.fc-button-active,
        .fc .fc-dayGridMonth-button.fc-button-active {
          background-color: #0a3a56 !important;
          border-color: #0a3a56 !important;
        }

        .fc .fc-timeGridDay-button:disabled,
        .fc .fc-timeGridWeek-button:disabled,
        .fc .fc-dayGridMonth-button:disabled {
          background-color: #0c4a6e !important;
          border-color: #0c4a6e !important;
          opacity: 0.5;
        }

        /* Dark Ocean for day column headers (Mon-Sun) */
        .fc .fc-col-header-cell {
          background-color: #0c4a6e !important;
          text-align: center !important;
        }

        .fc .fc-col-header-cell-cushion {
          color: #ffffff !important;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fc .fc-button:focus {
          box-shadow: 0 0 0 2px hsl(var(--ring));
        }

        .fc .fc-toolbar-title {
          color: hsl(var(--foreground));
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: hsl(var(--border));
        }

        .fc-theme-standard .fc-scrollgrid {
          border-color: hsl(var(--border));
        }

        .fc .fc-daygrid-day-number,
        .fc .fc-col-header-cell-cushion {
          color: hsl(var(--foreground));
          text-decoration: none;
        }

        .fc .fc-daygrid-day-number:hover,
        .fc .fc-col-header-cell-cushion:hover {
          color: hsl(var(--primary));
        }

        .fc .fc-daygrid-day.fc-day-today {
          background-color: hsl(var(--accent) / 0.3);
        }

        .fc-event {
          cursor: pointer;
          border-radius: 0.25rem;
        }

        .fc-event:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .fc-daygrid-event {
          padding: 2px 4px;
          transition: transform 0.2s ease;
        }

        .fc .fc-daygrid-event-dot {
          border-color: currentColor;
        }

        /* Dark mode adjustments */
        .dark .fc-theme-standard td,
        .dark .fc-theme-standard th {
          border-color: hsl(var(--border));
        }

        /* List View - Dark mode date headers */
        .dark .fc-list-day-cushion {
          background-color: #000000 !important;
        }

        .dark .fc-list-day-text,
        .dark .fc-list-day-side-text {
          color: #ffffff !important;
        }

        .dark .fc-list-event:hover td {
          background-color: hsl(var(--accent) / 0.3);
        }

        /* Center event titles in list view */
        .fc-list-event-title {
          text-align: center !important;
        }

        /* Center all list view content */
        .fc-list-event-time,
        .fc-list-event-title {
          text-align: center !important;
        }
      `}</style>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.8}
        handleWindowResize={true}
        windowResizeDelay={100}
      />
      </div>
    </div>

    {/* Event Modal */}
    {showEventModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
        <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {selectedEvent ? (
                <>
                  <CalendarDays className="w-5 h-5" />
                  Edit Event
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  New Event
                </>
              )}
            </h2>
            <button
              onClick={() => {
                setShowEventModal(false)
                setSelectedDate(null)
                setSelectedEvent(null)
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Event Title
              </Label>
              <Input
                id="title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                placeholder="Enter event title"
                disabled={!!selectedEvent}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Add description (optional)"
              />
            </div>

            {!selectedDate?.allDay && !selectedEvent && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Start Time
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventForm.startTime}
                    onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    End Time
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventForm.endTime}
                    onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="color">Event Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  id="color"
                  type="color"
                  value={eventForm.color}
                  onChange={(e) => setEventForm({ ...eventForm, color: e.target.value })}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
                <div className="flex gap-2 flex-wrap">
                  {["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"].map((color) => (
                    <button
                      key={color}
                      onClick={() => setEventForm({ ...eventForm, color })}
                      className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                      style={{ 
                        backgroundColor: color,
                        borderColor: eventForm.color === color ? "hsl(var(--foreground))" : "transparent"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {selectedEvent && selectedEvent.description && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            {selectedEvent ? (
              <>
                <Button onClick={handleDeleteEvent} variant="destructive" className="flex-1">
                  Delete
                </Button>
                <Button onClick={handleSaveEvent} className="flex-1">
                  Update
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setShowEventModal(false)
                    setSelectedDate(null)
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEvent} className="flex-1">
                  Create Event
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  )
}
