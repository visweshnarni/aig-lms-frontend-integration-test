"use client";
import { Play } from "lucide-react";
import type { Topic } from "@/app/types"; // Import Topic interface

interface VideoQueueProps {
  sessionPlaylist: Topic[];
  currentTopicId: string;
  eventName: string; // Added to help construct breadcrumbs for links
  sessionName: string; // Added to help construct breadcrumbs for links
}

export default function VideoQueue({ sessionPlaylist, currentTopicId, eventName, sessionName }: VideoQueueProps) {
  const queueVideos = sessionPlaylist.filter((topic) => topic._id !== currentTopicId);

  // Derive eventId from the first topic's event_id if available.
  // This is a fallback/extra check, as the breadcrumbs already handle navigation.
  const eventIdForLinks = sessionPlaylist.length > 0 ? sessionPlaylist[0].event_id : '';

  return (
    <div className="w-full lg:w-96 flex-shrink-0">
      <div className="border rounded-lg shadow-sm bg-white sticky top-24">
        {/* Header */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Next in Queue ({sessionName})</h3>
        </div>

        {/* Video List */}
        <div className="space-y-2 p-2 max-h-[450px] overflow-y-auto">
          {queueVideos.map((topic) => (
            // Using plain <a> tag as Link from next/link causes compilation issues in some environments
            <a
              key={topic._id}
              href={`/dashboard/events/${eventIdForLinks}/video/${topic._id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors group"
            >
              <div className="w-28 h-16 relative rounded-md overflow-hidden shrink-0 bg-black flex items-center justify-center">
                {/* Use topic.thumbnail directly */}
                <img src={topic.thumbnail} alt={topic.topic} className="w-full h-full object-cover" />
                {/* Play Icon Overlay for all thumbnails */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 leading-tight truncate">
                  {topic.topic}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Speaker - <span className="font-semibold text-[#FF6600]">{topic.speakerName || 'N/A'}</span>
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Sponsor Card */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-xs font-semibold text-gray-500 mb-2 tracking-wider">
            EDUCATIONAL GRANT BY
          </p>
          <div className="flex justify-center">
            {/* Using plain <img> tag */}
            <img
                src="/sun_pharma.png" // Make sure you have this image in your /public folder
                alt="Sun Pharma Logo"
                width={100}
                height={40}
                className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
