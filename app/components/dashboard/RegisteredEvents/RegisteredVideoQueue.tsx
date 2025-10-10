"use client";
import Link from "next/link";
import Image from "next/image";
import { Video } from "@/app/data/videos";
import VideoThumbnail from "@/app/components/dashboard/Events/VideoThumbnail";
import { Play } from "lucide-react";

interface VideoQueueProps {
  videos: Video[];
  currentVideoId: number;
  eventId: string;
}

// Helper to check for YouTube/Vimeo URLs
function isEmbeddableUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
}

export default function RegisteredVideoQueue({ videos, currentVideoId, eventId }: VideoQueueProps) {
  const queueVideos = videos.filter((v) => v.id !== currentVideoId);

  return (
    <div className="w-full lg:w-96 flex-shrink-0">
      <div className="border rounded-lg shadow-sm bg-white sticky top-24">
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Next in Queue</h3>
        </div>

        {/* Video List */}
        <div className="space-y-2 p-2 max-h-[450px] overflow-y-auto">
          {queueVideos.map((video) => (
            <Link
              key={video.id}
              href={`/dashboard/registeredevents/${eventId}/video/${video.id}`} // <-- IMPORTANT: Corrected path
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors group"
            >
              <div className="w-28 h-16 relative rounded-md overflow-hidden shrink-0 bg-black flex items-center justify-center">
                {isEmbeddableUrl(video.videoUrl) ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                     <Play className="w-8 h-8 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                ) : (
                  <VideoThumbnail videoUrl={video.videoUrl} />
                )}
                 <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-white" />
                 </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight truncate">{video.title}</p>
                <p className="text-xs text-gray-500 mt-1">Speaker - <span className="font-semibold text-[#FF6600]">{video.speaker}</span></p>
              </div>
            </Link>
          ))}
        </div>

        {/* Sponsor Card */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">EDUCATIONAL GRANT BY</p>
          <div className="flex justify-center">
            <Image src="/sun_pharma.png" alt="Sun Pharma Logo" width={100} height={40} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}