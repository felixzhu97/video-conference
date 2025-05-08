"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MonitorSmartphone } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import ParticipantList from "@/components/participant-list"

type Participant = {
  id: string
  name: string
  stream?: MediaStream
  audioEnabled: boolean
  videoEnabled: boolean
}

export default function VideoConference() {
  const [roomId, setRoomId] = useState("")
  const [userName, setUserName] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [screenShareEnabled, setScreenShareEnabled] = useState(false)
  const localStreamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  // Initialize local media stream
  useEffect(() => {
    if (isJoined && !localStreamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: audioEnabled })
        .then((stream) => {
          localStreamRef.current = stream

          // Add local participant
          setParticipants((prev) => [
            ...prev,
            {
              id: "local",
              name: userName || "我",
              stream,
              audioEnabled,
              videoEnabled,
            },
          ])
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error)
        })
    }

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isJoined, userName, audioEnabled, videoEnabled])

  // In a real app, this would connect to a signaling server
  // and handle WebRTC peer connections
  const joinRoom = () => {
    if (!roomId || !userName) return

    setIsJoined(true)

    // Simulate other participants joining (in a real app, this would come from WebRTC connections)
    setTimeout(() => {
      setParticipants((prev) => [
        ...prev,
        {
          id: "user1",
          name: "张三",
          audioEnabled: true,
          videoEnabled: true,
        },
        {
          id: "user2",
          name: "李四",
          audioEnabled: true,
          videoEnabled: true,
        },
      ])
    }, 1000)
  }

  const leaveRoom = () => {
    setIsJoined(false)
    setParticipants([])

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop())
      localStreamRef.current = null
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
      screenStreamRef.current = null
      setScreenShareEnabled(false)
    }
  }

  const toggleAudio = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled
      })
      setAudioEnabled(!audioEnabled)

      // Update local participant
      setParticipants((prev) => prev.map((p) => (p.id === "local" ? { ...p, audioEnabled: !audioEnabled } : p)))
    }
  }

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled
      })
      setVideoEnabled(!videoEnabled)

      // Update local participant
      setParticipants((prev) => prev.map((p) => (p.id === "local" ? { ...p, videoEnabled: !videoEnabled } : p)))
    }
  }

  const toggleScreenShare = async () => {
    if (screenShareEnabled && screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop())
      screenStreamRef.current = null
      setScreenShareEnabled(false)

      // Remove screen share from participants
      setParticipants((prev) => prev.filter((p) => p.id !== "screen"))
      return
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      })

      screenStreamRef.current = stream
      setScreenShareEnabled(true)

      // Add screen share as a participant
      setParticipants((prev) => [
        ...prev,
        {
          id: "screen",
          name: "屏幕共享",
          stream,
          audioEnabled: false,
          videoEnabled: true,
        },
      ])

      // Handle when user stops screen sharing via browser UI
      stream.getVideoTracks()[0].onended = () => {
        setScreenShareEnabled(false)
        setParticipants((prev) => prev.filter((p) => p.id !== "screen"))
        screenStreamRef.current = null
      }
    } catch (error) {
      console.error("Error sharing screen:", error)
    }
  }

  if (!isJoined) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-bold text-center">加入会议</h2>
          <div className="space-y-2">
            <label htmlFor="room-id" className="text-sm font-medium">
              会议 ID
            </label>
            <Input id="room-id" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="输入会议 ID" />
          </div>
          <div className="space-y-2">
            <label htmlFor="user-name" className="text-sm font-medium">
              您的名字
            </label>
            <Input
              id="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="输入您的名字"
            />
          </div>
          <Button onClick={joinRoom} className="w-full" disabled={!roomId || !userName}>
            加入会议
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {participants.map((participant) => (
          <VideoPlayer key={participant.id} participant={participant} />
        ))}
      </div>

      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={toggleAudio} className={!audioEnabled ? "bg-red-100" : ""}>
            {audioEnabled ? <Mic /> : <MicOff className="text-red-500" />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleVideo} className={!videoEnabled ? "bg-red-100" : ""}>
            {videoEnabled ? <Video /> : <VideoOff className="text-red-500" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleScreenShare}
            className={screenShareEnabled ? "bg-blue-100" : ""}
          >
            <MonitorSmartphone className={screenShareEnabled ? "text-blue-500" : ""} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ParticipantList participants={participants} />
          <Button variant="destructive" size="icon" onClick={leaveRoom}>
            <PhoneOff />
          </Button>
        </div>
      </div>
    </div>
  )
}
