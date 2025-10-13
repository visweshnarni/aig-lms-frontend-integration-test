"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, MapPin, Search, ChevronDown, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EventDetails, TopicDetails } from "@/app/types/regevents"; // Adjust path
// Helper for video thumbnail. Assuming VideoThumbnail is a functional component
import VideoThumbnail from "@/app/components/dashboard/Events/VideoThumbnail";

// Helper to handle both full and relative image URLs for event posters
const getImageUrl = (path: string | undefined | null) => {
  if (!path) return '/event-logo.png'; // Fallback if path is null/empty
  if (path.startsWith("http")) return path;
  // Prepend your backend's base URL for relative paths
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
};

// Helper to format date range from ISO strings
const formatDateRange = (startDateStr: string, endDateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const startDate = new Date(startDateStr).toLocaleDateString("en-GB", options);
  const endDate = new Date(endDateStr).toLocaleDateString("en-GB", options);
  if (startDate === endDate) {
    return startDate; // If it's a single day event
  }
  return `${startDate} - ${endDate}`;
};

export default function RegisteredEventDetailsPage() {
  const { id } = useParams() as { id: string }; // Get event ID from URL
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  // State to manage which sessions are open/collapsed
  const [openSessions, setOpenSessions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const token = localStorage.getItem("token"); // Get token for protected route
        
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${backendUrl}/events/public/details/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch event details (Status: ${response.status})`);
        }

        const data = await response.json();
        if (data.success) {
          setEvent(data.data);
          // Initialize all sessions to open by default
          const initialOpenState: Record<string, boolean> = {};
          data.data.sessions.forEach((session: { _id: string; }) => {
            initialOpenState[session._id] = true;
          });
          setOpenSessions(initialOpenState);
        } else {
          throw new Error(data.error || 'Failed to fetch event details.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  const toggleSession = (sessionId: string) => {
    setOpenSessions(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d47a1]" />
        <span className="ml-4 text-lg">Loading Event Details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg">
        <p><strong>Error:</strong> {error}</p>
        <p className="mt-2">Please ensure you are logged in and have access to this event.</p>
      </div>
    );
  }

  if (!event) {
    return <div className="p-8 text-center text-gray-600">Event details not found.</div>;
  }

  // Filter topics based on search input
  const filteredTopics = event.sessions.flatMap(session =>
    session.topics.filter(topic =>
      topic.topic.toLowerCase().includes(search.toLowerCase()) ||
      topic.speakerName?.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Group filtered topics back into sessions for rendering
  const sessionsMap: Record<string, { _id: string; name: string; topics: TopicDetails[] }> = {};
  event.sessions.forEach(session => {
    const sessionTopics = session.topics.filter(topic =>
        topic.topic.toLowerCase().includes(search.toLowerCase()) ||
        topic.speakerName?.toLowerCase().includes(search.toLowerCase())
    );
    if (sessionTopics.length > 0) {
      sessionsMap[session._id] = { ...session, topics: sessionTopics };
    }
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white">

      {/* Breadcrumb Section */}
      <div className="flex items-center text-sm text-gray-500 font-francois-one">
        <a href="/dashboard/registeredevents" className="hover:underline text-[#0d47a1]">
          Registered Events
        </a>
        <span className="mx-2 text-gray-400">{'>'}</span>
        <span className="font-medium text-orange-600">{event.fullName}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 shadow-md">
            {/* Using standard img tag with fallback and getImageUrl helper */}
            <img
              src={getImageUrl(event.image)}
              alt={event.fullName}
              className="object-cover w-full h-full"
              onError={(e) => { (e.target as HTMLImageElement).src = '/event-logo.png'; }}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mt-2 mb-3 font-francois-one">
              {event.fullName}
            </h1>
            <div className="flex items-center text-black-700 mb-2 font-francois-one">
              <CalendarDays className="w-4 h-4 mr-2 text-black-400" />
              <span>{formatDateRange(event.start_date, event.end_date)}</span>
            </div>
            <div className="flex items-center text-black-700 font-francois-one">
              <MapPin className="w-4 h-4 mr-2 text-black-400" />
              <span>{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contents & Search Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 font-francois-one">Contents</h2>
        <p className="text-gray-600 mb-6 font-francois-one">
          {event.totalSessions} Sessions • {event.totalVideos} Videos • {event.duration} mins total length
        </p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Videos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Session List */}
      <div className="space-y-8">
        {Object.values(sessionsMap).length > 0 ? (
          Object.values(sessionsMap).map((session) => (
            <div key={session._id}>
              <button
                onClick={() => toggleSession(session._id)}
                className="flex items-center gap-3 mb-4 w-full text-left p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 font-francois-one">{session.name}</h3>
                <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform ${openSessions[session._id] ? 'rotate-180' : ''}`} />
              </button>

              {openSessions[session._id] && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  {session.topics.map((video, index) => (
                    // Link to individual video page
                    <a
                      key={video._id}
                      href={`/dashboard/registeredevents/${id}/video/${video._id}`}
                      className="group flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <span className="text-gray-500 font-medium w-8 text-center font-francois-one">{index + 1}</span>
                      <div className="w-32 h-20 relative rounded-md overflow-hidden shrink-0 bg-black">
                        {/* Video Thumbnail Component */}
                        <VideoThumbnail videoUrl={video.video_link} className="w-full h-full" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 leading-snug font-francois-one">{video.topic}</p>
                        <p className="text-sm text-gray-500 mt-1 font-francois-one">
                          Speaker - <span className="font-semibold text-orange-600">{video.speakerName || 'N/A'}</span>
                        </p>
                      </div>
                      <span className="text-black-500 text-sm font-mono whitespace-nowrap font-francois-one">Video - {video.video_duration}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">
            <p>No videos found for this event or matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}