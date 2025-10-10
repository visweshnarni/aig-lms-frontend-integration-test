"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/app/data/events";
import { videos as videoData } from "@/app/data/videos";
import RegisterModal from "@/app/components/dashboard/Events/RegisterModal";

// Mock registration hook
function useRegisteredEvents() {
  const [registered, setRegistered] = useState<string[]>([]);
  const register = (id: string) => setRegistered((rs) => [...rs, id]);
  const isRegistered = (id: string) => registered.includes(id);
  return { isRegistered, register };
}

// Convert raw YouTube/Vimeo URLs to embed
function getEmbedUrl(url: string | undefined) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

export default function EventDetailsPage() {
  const { id } = useParams() as { id: string };
  const event = events.find((e) => e.id === id);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSessions, setOpenSessions] = useState<Record<string, boolean>>({});
  const { isRegistered, register } = useRegisteredEvents();

  if (!event) return <div className="p-8 text-center">Event not found</div>;

  // Filter & group videos by session
  const filteredVideos = videoData.filter(
    (v) => v.eventId === id && v.title.toLowerCase().includes(search.toLowerCase())
  );
  const sessions: Record<string, typeof filteredVideos> = {};
  filteredVideos.forEach((v) => {
    const session = v.session || "Session 1";
    if (!sessions[session]) sessions[session] = [];
    sessions[session].push(v);
  });

  const toggleSession = (session: string) => {
    setOpenSessions((prev) => ({
      ...prev,
      [session]: !prev[session],
    }));
  };

  const handleRegister = () => {
    register(id);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-36 h-36 relative rounded-md overflow-hidden shrink-0">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-2">{event.title}</h1>
            <div className="flex items-center text-black mb-2">
              <CalendarDays className="w-4 h-4 mr-2 text-black" />
              <span>{event.dateRange}</span>
            </div>
            <div className="flex items-center text-black">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        {!isRegistered(id) && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00A651] hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
          >
            {event.price === 0 ? "Register Free" : "Buy Ticket"}
          </Button>
        )}
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Search */}
      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search videos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-8 py-2 w-full focus:ring-2 focus:ring-[#FF6600] focus:outline-none"
        />
      </div>

      {/* Sessions */}
      <div className="space-y-8">
        {Object.keys(sessions).map((session) => (
          <div key={session} className="space-y-4 border-b pb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#0d47a1]">{session}</h3>
              <button
                onClick={() => toggleSession(session)}
                className="p-1 text-[#FF6600] hover:text-[#cc5200]"
              >
                {openSessions[session] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {openSessions[session] && (
              <div className="space-y-4 mt-3">
                {sessions[session].map((video) =>
                  isRegistered(id) ? (
                    <Link
                      key={video.id}
                      href={`/dashboard/events/${id}/video/${video.id}`}
                      className="flex items-center gap-4 border-b pb-4 hover:bg-gray-50 rounded-md transition p-3"
                    >
                      {/* Left: Video Thumbnail */}
                      <div className="w-40 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <iframe
                          src={getEmbedUrl(video.videoUrl)}
                          title={video.title}
                          className="w-full h-full rounded-md"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>

                      {/* Center: Video Info */}
                      <div className="flex-1">
                        <p className="text-sm text-black font-semibold mb-1">{video.title}</p>
                        <p className="text-sm text-gray-700">
                          Speaker –{" "}
                          <span className="text-[#FF6600] font-bold">
                            {video.speaker}
                          </span>
                        </p>
                      </div>

                      {/* Right: Duration */}
                      <div className="text-sm text-gray-700 font-medium whitespace-nowrap">
                        {video.duration}
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={video.id}
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-4 border-b pb-4 rounded-md transition cursor-pointer opacity-60"
                    >
                      <div className="w-40 h-24 bg-gray-200 rounded-md flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium mb-1">{video.title}</p>
                        <p className="text-sm text-gray-600">
                          Speaker –{" "}
                          <span className="text-[#FF6600] font-semibold">
                            {video.speaker}
                          </span>
                        </p>
                      </div>
                      <div className="text-sm text-black whitespace-nowrap">
                        Register to access
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Register Modal */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
        onRegister={handleRegister}
      />
    </div>
  );
}
