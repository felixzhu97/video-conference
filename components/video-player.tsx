"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MicOff, VideoOff } from "lucide-react"

type Participant = {
  id: string
  name: string
  stream?: MediaStream
  audioEnabled: boolean
  videoEnabled: boolean
}

interface VideoPlayerProps {
  participant: Participant
}

export default function VideoPlayer({ participant }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream
    }
  }, [participant.stream])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="relative bg-muted rounded-lg overflow-hidden flex items-center justify-center aspect-video">
      {participant.stream && participant.videoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={participant.id === "local"}
          className="w-full h-full object-cover"
        />
      ) : (
        <Avatar className="w-24 h-24">
          <AvatarFallback className="text-3xl">{getInitials(participant.name)}</AvatarFallback>
        </Avatar>
      )}

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="bg-black/50 text-white px-2 py-1 rounded text-sm">
          {participant.name}
          {participant.id === "local" && " (您)"}
        </div>

        <div className="flex gap-1">
          {!participant.audioEnabled && (
            <div className="bg-red-500 p-1 rounded-full">
              <MicOff className="w-3 h-3 text-white" />
            </div>
          )}
          {!participant.videoEnabled && (
            <div className="bg-red-500 p-1 rounded-full">
              <VideoOff className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
