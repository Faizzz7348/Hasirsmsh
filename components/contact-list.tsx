"use client"

import React, { useState } from "react"
import { Edit2, MessageCircle, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Contact {
  id: number
  name: string
  phone: string
  whatsapp: string
}

const sampleContacts: Contact[] = [
  {
    id: 1,
    name: "Ahmad Rahman",
    phone: "+60123456789",
    whatsapp: "+60123456789",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    phone: "+60198765432",
    whatsapp: "+60198765432",
  },
  {
    id: 3,
    name: "Mohd Aziz",
    phone: "+60187654321",
    whatsapp: "+60187654321",
  },
  {
    id: 4,
    name: "Nurul Izzah",
    phone: "+60156789012",
    whatsapp: "+60156789012",
  },
  {
    id: 5,
    name: "Zainab Ibrahim",
    phone: "+60145678901",
    whatsapp: "+60145678901",
  },
]

interface SpeedDialPosition {
  contactId: number
  top: number
  left: number
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts)
  const [openSpeedDial, setOpenSpeedDial] = useState<number | null>(null)
  const [speedDialPos, setSpeedDialPos] = useState<SpeedDialPosition | null>(null)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editFormData, setEditFormData] = useState({ name: "", phone: "", whatsapp: "" })

  const handleSpeedDialClick = (contactId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    
    if (openSpeedDial === contactId) {
      setOpenSpeedDial(null)
    } else {
      setOpenSpeedDial(contactId)
      setSpeedDialPos({
        contactId,
        top: rect.top,
        left: rect.left,
      })
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setEditFormData({ name: contact.name, phone: contact.phone, whatsapp: contact.whatsapp })
    setShowEditDialog(true)
    setOpenSpeedDial(null)
  }

  const handleWhatsApp = (contact: Contact) => {
    const message = "Hello, I wanted to reach out to you."
    const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setOpenSpeedDial(null)
  }

  const handleCall = (contact: Contact) => {
    window.location.href = `tel:${contact.phone}`
    setOpenSpeedDial(null)
  }

  const handleSaveEdit = () => {
    if (editingContact) {
      setContacts(
        contacts.map((c) =>
          c.id === editingContact.id
            ? { ...c, ...editFormData }
            : c
        )
      )
    }
    setShowEditDialog(false)
    setEditingContact(null)
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6 space-y-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors bg-card/50 backdrop-blur-sm"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
            </div>

            {/* Speed Dial Button */}
            <div className="relative ml-4">
              <button
                onClick={(e) => handleSpeedDialClick(contact.id, e)}
                className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:shadow-xl hover:scale-110 flex-shrink-0"
                title="Speed dial menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${openSpeedDial === contact.id ? "rotate-45" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
                </svg>
              </button>

              {/* Speed Dial Menu */}
              {openSpeedDial === contact.id && (
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 flex flex-row gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(contact)}
                    className="h-10 w-10 rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title="Edit contact"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsApp(contact)}
                    className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title="Message on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>

                  {/* Call Button */}
                  <button
                    onClick={() => handleCall(contact)}
                    className="h-10 w-10 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    title="Call contact"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {contacts.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No contacts found</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Contact</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Update the contact information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <input
                type="tel"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">WhatsApp</label>
              <input
                type="tel"
                value={editFormData.whatsapp}
                onChange={(e) => setEditFormData({ ...editFormData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              onClick={() => setShowEditDialog(false)}
              variant="outline"
              className="flex-1 h-10 rounded-xl border-0 bg-muted/30 hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="flex-1 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Click outside to close speed dial */}
      {openSpeedDial !== null && (
        <div
          className="fixed inset-0 cursor-default"
          onClick={() => setOpenSpeedDial(null)}
        />
      )}
    </>
  )
}
