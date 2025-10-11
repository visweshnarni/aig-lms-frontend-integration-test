"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { videos } from "@/app/data/videos";
import { events } from "@/app/data/events";
// 👇 IMPORT THE NEW QUEUE COMPONENT
import RegisteredVideoQueue from "@/app/components/dashboard/RegisteredEvents/RegisteredVideoQueue";
import CommentsSection from "@/app/components/dashboard/Events/CommentsSection";

// Helper functions (getEmbedUrl, VideoPlayer) remain the same...
function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

const VideoPlayer: React.FC<{ videoUrl: string; title: string }> = ({ videoUrl, title }) => {
  const embedUrl = getEmbedUrl(videoUrl);

  if (embedUrl.includes("youtube.com/embed") || embedUrl.includes("player.vimeo.com/video")) {
    return <iframe src={embedUrl} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full" />;
  } else {
    return <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />;
  }
};

export default function RegisteredVideoPlayerPage() {
  const { id, videoID } = useParams() as { id: string; videoID: string };
  const event = events.find((e) => e.id === id);
  const currentVideo = videos.find((v) => v.id.toString() === videoID);

  if (!event || !currentVideo) {
    return <div className="p-8 text-center text-xl font-semibold">Video or Event Not Found</div>;
  }

  const sessionVideos = videos.filter(
    (v) => v.eventId === id && v.session === currentVideo.session
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       <div className="flex items-center text-sm font-normal tracking-wide text-[#FF7A1B] mb-4">
        <Link href="/dashboard/registeredevents" className="hover:underline">Registered Events</Link>
        <span className="mx-1.5">{'>'}</span>
        <Link href={`/dashboard/registeredevents/${event.id}`} className="hover:underline">{event.title}</Link>
        <span className="mx-1.5">{'>'}</span>
        <span className="font-medium text-[#FF7A1B] truncate max-w-xs  px-2 py-0.5 rounded-md">{currentVideo.title}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <VideoPlayer videoUrl={currentVideo.videoUrl} title={currentVideo.title} />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800">{currentVideo.title}</h1>
            <p className="text-base text-gray-600 mt-1">Speaker – <span className="font-semibold text-[#FF6600]">{currentVideo.speaker}</span></p>
          </div>
          <CommentsSection />
        </div>
        {/* 👇 USE THE NEW QUEUE COMPONENT */}
        <RegisteredVideoQueue
          videos={sessionVideos}
          currentVideoId={currentVideo.id}
          eventId={event.id}
        />
      </div>
    </div>
  );
}