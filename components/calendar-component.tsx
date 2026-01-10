"use client"

import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventClickArg, DateSelectArg } from "@fullcalendar/core"

interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
  allDay?: boolean
  backgroundColor?: string
  borderColor?: string
}

export function CalendarComponent() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      start: new Date().toISOString().split("T")[0] + "T10:00:00",
      end: new Date().toISOString().split("T")[0] + "T11:00:00",
      backgroundColor: "hsl(var(--primary))",
      borderColor: "hsl(var(--primary))",
    },
    {
      id: "2",
      title: "Project Deadline",
      start: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      allDay: true,
      backgroundColor: "hsl(var(--destructive))",
      borderColor: "hsl(var(--destructive))",
    },
    {
      id: "3",
      title: "Lunch Break",
      start: new Date().toISOString().split("T")[0] + "T12:00:00",
      end: new Date().toISOString().split("T")[0] + "T13:00:00",
      backgroundColor: "hsl(var(--accent))",
      borderColor: "hsl(var(--accent))",
    },
  ])

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event")
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    if (title) {
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: "hsl(var(--primary))",
        borderColor: "hsl(var(--primary))",
      }

      setEvents([...events, newEvent])
      calendarApi.addEvent(newEvent)
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove()
      setEvents(events.filter((event) => event.id !== clickInfo.event.id))
    }
  }

  return (
    <div className="calendar-wrapper w-full h-full">
      <style jsx global>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-button-bg-color: hsl(var(--primary));
          --fc-button-border-color: hsl(var(--primary));
          --fc-button-hover-bg-color: hsl(var(--primary) / 0.9);
          --fc-button-hover-border-color: hsl(var(--primary) / 0.9);
          --fc-button-active-bg-color: hsl(var(--primary) / 0.8);
          --fc-button-active-border-color: hsl(var(--primary) / 0.8);
          --fc-today-bg-color: hsl(var(--accent));
        }

        .fc .fc-button {
          text-transform: capitalize;
          font-weight: 500;
          padding: 0.5rem 1rem;
        }

        /* Dark Ocean buttons for today, next, prev, day, week, and month view */
        .fc .fc-today-button,
        .fc .fc-next-button,
        .fc .fc-prev-button,
        .fc .fc-timeGridDay-button,
        .fc .fc-timeGridWeek-button,
        .fc .fc-dayGridMonth-button {
          background-color: #0c4a6e !important;
          border-color: #0c4a6e !important;
          color: #ffffff !important;
        }

        .fc .fc-today-button:hover,
        .fc .fc-next-button:hover,
        .fc .fc-prev-button:hover,
        .fc .fc-timeGridDay-button:hover,
        .fc .fc-timeGridWeek-button:hover,
        .fc .fc-dayGridMonth-button:hover {
          background-color: #075985 !important;
          border-color: #075985 !important;
        }

        .fc .fc-today-button:active,
        .fc .fc-next-button:active,
        .fc .fc-prev-button:active,
        .fc .fc-timeGridDay-button:active,
        .fc .fc-timeGridWeek-button:active,
        .fc .fc-dayGridMonth-button:active,
        .fc .fc-today-button.fc-button-active,
        .fc .fc-next-button.fc-button-active,
        .fc .fc-prev-button.fc-button-active,
        .fc .fc-timeGridDay-button.fc-button-active,
        .fc .fc-timeGridWeek-button.fc-button-active,
        .fc .fc-dayGridMonth-button.fc-button-active {
          background-color: #0a3a56 !important;
          border-color: #0a3a56 !important;
        }

        .fc .fc-today-button:disabled,
        .fc .fc-next-button:disabled,
        .fc .fc-prev-button:disabled,
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
        }

        .fc .fc-col-header-cell-cushion {
          color: #ffffff !important;
          font-weight: 600;
        }

        .fc .fc-button:focus {
          box-shadow: 0 0 0 2px hsl(var(--ring));
        }

        .fc .fc-toolbar-title {
          color: hsl(var(--foreground));
          font-size: 1.5rem;
          font-weight: 600;
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
        }

        .fc-daygrid-event {
          padding: 2px 4px;
        }

        .fc .fc-daygrid-event-dot {
          border-color: currentColor;
        }

        /* Dark mode adjustments */
        .dark .fc-theme-standard td,
        .dark .fc-theme-standard th {
          border-color: hsl(var(--border));
        }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
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
      />
    </div>
  )
}
