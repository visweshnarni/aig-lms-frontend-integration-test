"use client";
import Link from "next/link";
// Using standard img tag, so Image is not strictly needed
// import Image from "next/image";
import { Play } from "lucide-react";
import { Topic } from "@/app/types"; // Import the Topic interface
import VideoThumbnail from "@/app/components/dashboard/Events/VideoThumbnail"; // Assuming this is for generic video thumbnail generation

// Props for the RegisteredVideoQueue
interface VideoQueueProps {
  sessionName: string; // To display at the top of the queue
  playlist: Topic[]; // Now an array of Topic objects
  currentTopicId: string; // The ID of the currently playing topic
  eventId: string; // Needed to construct correct links for other videos in the queue
}

// Helper to check for YouTube/Vimeo URLs
function isEmbeddableUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
}

// Helper to handle full and relative image URLs for thumbnails
const getThumbnailUrl = (path: string | undefined | null) => {
    if (!path) return '/event-logo.png'; // Fallback if path is null/empty
    if (path.startsWith("http")) return path;
    // Prepend your backend's base URL for relative paths
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
};


export default function RegisteredVideoQueue({ sessionName, playlist, currentTopicId, eventId }: VideoQueueProps) {
  // Filter out the currently playing video from the playlist to form the queue
  const queueTopics = playlist.filter((topic) => topic._id !== currentTopicId);

  return (
    <div className="w-full lg:w-96 flex-shrink-0">
      <div className="border rounded-lg shadow-sm bg-white sticky top-24">
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">{sessionName || "Session Playlist"}</h3>
        </div>

        {/* Video List */}
        <div className="space-y-2 p-2 max-h-[450px] overflow-y-auto">
          {queueTopics.length > 0 ? (
            queueTopics.map((topic) => (
              <Link
                key={topic._id}
                // Construct the link to the video player page for the next topic
                href={`/dashboard/registeredevents/${eventId}/video/${topic._id}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors group"
              >
                <div className="w-28 h-16 relative rounded-md overflow-hidden shrink-0 bg-black flex items-center justify-center">
                  {topic.thumbnail ? (
                    // Use the thumbnail from the topic data
                    <img
                        src={getThumbnailUrl(topic.thumbnail)}
                        alt={topic.topic}
                        className="object-cover w-full h-full"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/event-logo.png'; }} // Fallback image
                    />
                  ) : (
                    // Fallback to a play icon if no thumbnail provided
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white opacity-70" />
                    </div>
                  )}
                  {/* Overlay play icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-tight truncate">{topic.topic}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Speaker - <span className="font-semibold text-[#FF6600]">{topic.speakerName || 'N/A'}</span>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No more videos in this session.</div>
          )}
        </div>

        {/* Sponsor Card (no changes needed here) */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">EDUCATIONAL GRANT BY</p>
          <div className="flex justify-center">
            {/* Using standard img tag with fallback for static assets */}
            <img src="/sun_pharma.png" alt="Sun Pharma Logo" width={100} height={40} className="object-contain" onError={(e) => { (e.target as HTMLImageElement).src = '/logo-fallback.png'; }}/>
          </div>
        </div>
      </div>
    </div>
  );
}