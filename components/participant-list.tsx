"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MicOff, VideoOff } from "lucide-react"

type Participant = {
  id: string
  name: string
  stream?: MediaStream
  audioEnabled: boolean
  videoEnabled: boolean
}

interface ParticipantListProps {
  participants: Participant[]
}

export default function ParticipantList({ participants }: ParticipantListProps) {
  const [open, setOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Users className="w-4 h-4" />
          <span>{participants.length}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>参会者 ({participants.length})</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{getInitials(participant.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">
                  {participant.name}
                  {participant.id === "local" && " (您)"}
                </p>
              </div>
              <div className="flex gap-2">
                {!participant.audioEnabled && <MicOff className="w-4 h-4 text-red-500" />}
                {!participant.videoEnabled && <VideoOff className="w-4 h-4 text-red-500" />}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
