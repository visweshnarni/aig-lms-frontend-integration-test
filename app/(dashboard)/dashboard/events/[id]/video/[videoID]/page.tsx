"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { videos, Video } from "@/app/data/videos"; // Import Video interface
import { events } from "@/app/data/events";
import VideoQueue from "@/app/components/dashboard/Events/VideoQueue";
import CommentsSection from "@/app/components/dashboard/Events/CommentsSection";
import { ChevronRight } from "lucide-react";

// Helper function to get the embed URL for various video platforms
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
  // For raw video files (like .mp4, .webm, or AWS/Cloudinary direct links), return as is
  return url;
}

// Helper component to render the appropriate video player
const VideoPlayer: React.FC<{ videoUrl: string; title: string }> = ({ videoUrl, title }) => {
  const embedUrl = getEmbedUrl(videoUrl);

  // Check if it's an embeddable URL (YouTube, Vimeo)
  if (embedUrl.includes("youtube.com/embed") || embedUrl.includes("player.vimeo.com/video")) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    );
  } else {
    // Assume it's a direct video URL (e.g., .mp4, AWS S3, Cloudinary direct link)
    return (
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain"
        // You might add a poster attribute here if your video data includes a static thumbnail for direct videos
      />
    );
  }
};


export default function VideoPlayerPage() {
  const { id, videoID } = useParams() as { id: string; videoID: string };

  const event = events.find((e) => e.id === id);
  const currentVideo = videos.find((v) => v.id.toString() === videoID);

  if (!event || !currentVideo) {
    return (
      <div className="p-8 text-center text-xl font-semibold text-gray-600">
        Video or Event Not Found
      </div>
    );
  }

  // Get all videos from the same session for the queue
  const sessionVideos = videos.filter(
    (v) => v.eventId === id && v.session === currentVideo.session
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
<div className="flex items-center text-sm font-normal tracking-wide text-[#FF7A1B]">
    <Link 
        href="/dashboard/events" 
        className="hover:underline"
    >
        All Events
    </Link>
    
    <span className="mx-1.5">{'>'}</span>
    
    <Link 
        href={`/dashboard/events/${event.id}`} 
        className="hover:underline"
    >
        {event.title}
    </Link>
    
    <span className="mx-1.5">{'>'}</span>

    <span className="font-medium text-[#FF7A1B] truncate max-w-xs  px-2 py-0.5 rounded-md">
        {currentVideo.title}
    </span>
</div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content: Player and Comments */}
        <div className="flex-1 min-w-0">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <VideoPlayer videoUrl={currentVideo.videoUrl} title={currentVideo.title} />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentVideo.title}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              Speaker – <span className="font-semibold text-[#FF6600]">{currentVideo.speaker}</span>
            </p>
          </div>
          <CommentsSection />
        </div>

        {/* Sidebar: Video Queue */}
        <VideoQueue
          videos={sessionVideos}
          currentVideoId={currentVideo.id}
          eventId={event.id}
        />
      </div>
    </div>
  );
}