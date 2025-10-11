"use client";

import { useState, useEffect } from "react";
import { Loader2, Play, ChevronRight } from "lucide-react";
import VideoQueue from "@/app/components/dashboard/Events/VideoQueue";
import CommentsSection from "@/app/components/dashboard/Events/CommentsSection";
import type { Topic } from "@/app/types"; // Import Topic interface

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
  return url; // For raw video files, return as is
}

// Helper component to render the appropriate video player
const VideoPlayer: React.FC<{ videoUrl: string; title: string }> = ({ videoUrl, title }) => {
  const embedUrl = getEmbedUrl(videoUrl);

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
    return (
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full h-full object-contain"
      />
    );
  }
};


export default function VideoPlayerPage() {
  const [currentTopicId, setCurrentTopicId] = useState<string | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [sessionPlaylist, setSessionPlaylist] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Extract videoID from URL path on component mount
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    // Assuming the structure is /events/:eventId/video/:videoID
    // The videoID is the last segment, and we want a MongoDB ObjectId format
    const videoIdFromUrl = pathSegments.at(-1);
    if (videoIdFromUrl && /^[0-9a-fA-F]{24}$/.test(videoIdFromUrl)) {
      setCurrentTopicId(videoIdFromUrl);
    } else {
      setLoading(false);
      setError("Invalid Video ID in URL.");
    }
  }, []);

  // 2. Fetch video details and session playlist
  useEffect(() => {
    if (!currentTopicId) return;

    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Authentication token missing. Please log in.");
        }

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${baseUrl}/topics/video-player/${currentTopicId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to load video. Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success && result.data) {
          setEventName(result.data.eventName);
          setSessionName(result.data.sessionName);
          setCurrentTopic(result.data.currentTopic);
          setSessionPlaylist(result.data.sessionPlaylist);
        } else {
          throw new Error(result.error || 'Failed to load video details.');
        }

      } catch (err: any) {
        console.error("Video Player Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [currentTopicId]);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
        <span className="ml-4 text-xl">Loading Video...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-2xl mx-auto mt-10">
        <p><strong>Error:</strong> {error}</p>
        <p className="mt-2">Please ensure you are logged in and enrolled in the event.</p>
        <a href="/dashboard/events" className="mt-4 inline-block text-blue-600 hover:underline">Go to Events</a>
      </div>
    );
  }

  // Render "not found" state
  if (!currentTopic) {
    return (
      <div className="p-8 text-center text-xl font-semibold text-gray-600">
        Video Not Found
      </div>
    );
  }

  // Find the eventId from currentTopic or derive from URL if needed for breadcrumbs.
  // Assuming the eventId is the segment before 'video' in the URL path.
  const pathSegments = window.location.pathname.split('/');
  const eventIdFromUrl = pathSegments[pathSegments.indexOf('events') + 1];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm font-normal tracking-wide text-[#FF7A1B]">
        <a href="/dashboard/events" className="hover:underline">All Events</a>
        <span className="mx-1.5"><ChevronRight className="h-3 w-3" /></span> {/* Using ChevronRight */}
        
        {eventName && (
          <>
            <a href={`/dashboard/events/${eventIdFromUrl}`} className="hover:underline">
              {eventName}
            </a>
            <span className="mx-1.5"><ChevronRight className="h-3 w-3" /></span>
          </>
        )}
        
        {sessionName && (
          <>
            <span className="font-normal text-gray-600 truncate max-w-xs">{sessionName}</span>
            <span className="mx-1.5"><ChevronRight className="h-3 w-3" /></span>
          </>
        )}

        <span className="font-medium text-[#FF7A1B] truncate max-w-xs px-2 py-0.5 rounded-md">
          {currentTopic.topic}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Main Content: Player and Comments */}
        <div className="flex-1 min-w-0">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <VideoPlayer videoUrl={currentTopic.video_link} title={currentTopic.topic} />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {currentTopic.topic}
            </h1>
            <p className="text-base text-gray-600 mt-1">
              Speaker – <span className="font-semibold text-[#FF6600]">{currentTopic.speakerName || 'N/A'}</span>
            </p>
          </div>
          <CommentsSection />
        </div>

        {/* Sidebar: Video Queue */}
        <VideoQueue
          sessionPlaylist={sessionPlaylist}
          currentTopicId={currentTopic._id}
          eventName={eventName || ''} // Pass eventName for context
          sessionName={sessionName || ''} // Pass sessionName for context
        />
      </div>
    </div>
  );
}
