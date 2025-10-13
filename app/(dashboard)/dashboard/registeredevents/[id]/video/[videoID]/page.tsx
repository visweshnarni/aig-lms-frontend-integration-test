"use client";

import { useParams } from "next/navigation";
import Link from "next/link"; // Keep Link for navigation
import { useState, useEffect } from "react";
import { Loader2, Play } from "lucide-react"; // Import Loader2 for loading state

import RegisteredVideoQueue from "@/app/components/dashboard/RegisteredEvents/RegisteredVideoQueue";
import CommentsSection from "@/app/components/dashboard/Events/CommentsSection"; // Assuming this component is generic
import { Topic, VideoPlayerPageData } from "@/app/types"; // Import the new types

// Helper function to get an embeddable URL
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

// Video Player Component (no changes needed here)
const VideoPlayer: React.FC<{ videoUrl: string; title: string }> = ({ videoUrl, title }) => {
  const embedUrl = getEmbedUrl(videoUrl);

  if (embedUrl.includes("youtube.com/embed") || embedUrl.includes("player.vimeo.com/video")) {
    return <iframe src={embedUrl} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full" />;
  } else {
    return <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />;
  }
};

export default function RegisteredVideoPlayerPage() {
  const { id: eventId, videoID: topicId } = useParams() as { id: string; videoID: string };
  const [videoData, setVideoData] = useState<VideoPlayerPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch data for the current topic and its session playlist
        const response = await fetch(`${backendUrl}/topics/video-player/${topicId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch video details (Status: ${response.status})`);
        }

        const data = await response.json();
        if (data.success) {
          setVideoData(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch video details.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchVideoDetails();
    }
  }, [topicId]); // Re-fetch if the topic ID changes

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d47a1]" />
        <span className="ml-4 text-lg">Loading Video...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg">
        <p><strong>Error:</strong> {error}</p>
        <p className="mt-2">Please ensure you are logged in and have access to this content.</p>
      </div>
    );
  }

  if (!videoData || !videoData.currentTopic) {
    return <div className="p-8 text-center text-xl font-semibold">Video or Event Not Found</div>;
  }

  const { eventName, sessionName, currentTopic, sessionPlaylist } = videoData;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       <div className="flex items-center text-sm font-normal tracking-wide text-[#FF7A1B] mb-4">
        <Link href="/dashboard/registeredevents" className="hover:underline">Registered Events</Link>
        <span className="mx-1.5">{'>'}</span>
        {/* Link to event details page, using eventId from URL params */}
        <Link href={`/dashboard/registeredevents/${eventId}`} className="hover:underline">{eventName}</Link>
        <span className="mx-1.5">{'>'}</span>
        <span className="font-medium text-[#FF7A1B] truncate max-w-xs px-2 py-0.5 rounded-md">{currentTopic.topic}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
            <VideoPlayer videoUrl={currentTopic.video_link} title={currentTopic.topic} />
          </div>
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-800">{currentTopic.topic}</h1>
            <p className="text-base text-gray-600 mt-1">
              Speaker – <span className="font-semibold text-[#FF6600]">{currentTopic.speakerName || 'N/A'}</span>
            </p>
          </div>
          {/* Comments section can remain as is, assuming it handles its own data */}
          <CommentsSection />
        </div>
        {/* Pass sessionPlaylist and currentTopic ID to the queue component */}
        <RegisteredVideoQueue
          sessionName={sessionName}
          playlist={sessionPlaylist}
          currentTopicId={currentTopic._id}
          eventId={eventId} // Ensure eventId is passed for correct queue links
        />
      </div>
    </div>
  );
}