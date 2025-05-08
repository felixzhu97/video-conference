import VideoConference from "@/components/video-conference"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">视频会议应用</h1>
      </header>
      <VideoConference />
    </main>
  )
}
