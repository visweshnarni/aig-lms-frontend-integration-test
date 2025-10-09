"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { CalendarDays, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/app/data/events";
import { videos as videoData } from "@/app/data/videos";
import RegisterModal from "@/app/components/dashboard/Events/RegisterModal";

// Mock hook, replace with real one if needed
function useRegisteredEvents() {
  const [registered, setRegistered] = useState<string[]>([]);
  const register = (id: string) => setRegistered(rs => [...rs, id]);
  const isRegistered = (id: string) => registered.includes(id);
  return { isRegistered, register };
}

export default function EventDetailsPage() {
  const { id } = useParams() as { id: string };
  const event = events.find((e) => e.id === id);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isRegistered, register } = useRegisteredEvents();

  if (!event) return <div className="p-8 text-center">Event not found</div>;

  // Show only event videos, grouped by session
  const filteredVideos = videoData.filter(
    (v) =>
      v.eventId === id && v.title.toLowerCase().includes(search.toLowerCase())
  );
  const sessions: Record<string, typeof filteredVideos> = {};
  filteredVideos.forEach((v) => {
    const session = v.session || "Session 1";
    if (!sessions[session]) sessions[session] = [];
    sessions[session].push(v);
  });

  function handleRegister() {
    register(id);
    setIsModalOpen(false);
  }

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
            <div className="flex items-center text-gray-700 mb-2">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
              <span>{event.dateRange}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
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

      {/* Contents */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-[#0d47a1]">Contents</h2>
        <p className="text-gray-700 text-sm sm:text-base">
          {Object.keys(sessions).length} Sessions • {filteredVideos.length} Videos •{" "}
          {filteredVideos.reduce(
            (sum, v) =>
              sum +
              parseInt(v.duration.split(":")[0]) * 60 +
              parseInt(v.duration.split(":")[1]),
            0
          )}{" "}
          mins total length
        </p>
      </div>

      {/* Search & Session List */}
      <div className="space-y-8">
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

        {Object.keys(sessions).map((session) => (
          <div key={session} className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#0d47a1]">
              {session}
              <ChevronDown className="w-4 h-4 text-[#FF6600]" />
            </div>
            <div className="space-y-4">
              {sessions[session].map((video) =>
                isRegistered(id) ? (
                  <div
                    key={video.id}
                    className="flex flex-col gap-3 border-b pb-4 hover:bg-gray-50 rounded-md transition p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-600 font-semibold w-6">
                        {video.id}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 font-medium mb-1">
                          {video.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Speaker –{" "}
                          <span className="text-[#FF6600] font-semibold">
                            {video.speaker}
                          </span>
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 whitespace-nowrap">
                        {video.duration}
                      </div>
                    </div>
                    {/* Inline Video Player */}
                    <div className="w-full h-64 sm:h-80 rounded-md overflow-hidden">
                      <iframe
                        src={video.videoUrl}
                        title={video.title}
                        className="w-full h-full rounded-md"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <div
                    key={video.id}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-start gap-4 border-b pb-4 rounded-md transition cursor-pointer opacity-60"
                  >
                    <div className="text-gray-600 font-semibold w-6">{video.id}</div>
                    <div className="w-32 h-20 relative rounded-md overflow-hidden shrink-0 bg-gray-200"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 font-medium mb-1">{video.title}</p>
                      <p className="text-sm text-gray-600">
                        Speaker –{" "}
                        <span className="text-[#FF6600] font-semibold">{video.speaker}</span>
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      Register to access
                    </div>
                  </div>
                )
              )}
            </div>
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
