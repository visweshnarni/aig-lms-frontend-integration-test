"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/app/data/events";
import { videos as videoData } from "@/app/data/videos"; // ✅ Imported here
import RegisterModal from "@/app/components/dashboard/Events/RegisterModal";

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event) return <div className="p-8 text-center">Event not found</div>;

  // 🔍 Filter videos based on search
  const filteredVideos = videoData.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📂 Group videos by session
  const sessions: Record<string, typeof filteredVideos> = {};
  filteredVideos.forEach((v) => {
    const session = v.session || "Session 1";
    if (!sessions[session]) sessions[session] = [];
    sessions[session].push(v);
  });

  return (
    <div className="p-6 space-y-6 relative">
      {/* 🏁 Top Section */}
      <div className="flex justify-between items-start">
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
            <h1 className="text-3xl font-bold text-[#0d47a1] mb-2">
              {event.title}
            </h1>
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

        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00A651] hover:bg-green-700 text-white px-5 py-2 rounded-md"
        >
          {event.price === 0 ? "Register Free" : "Buy Ticket"}
        </Button>
      </div>

      <hr className="my-6" />

      {/* 📘 Contents section */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-[#0d47a1]">Contents</h2>
        <p className="text-gray-700">
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

      {/* 🔎 Search + Video Listing */}
      <div className="space-y-4 mt-8">
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

        {/* 💡 Render videos grouped by session */}
        {Object.keys(sessions).map((session) => (
          <div key={session} className="mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#0d47a1] mb-3">
              {session}
              <ChevronDown className="w-4 h-4 text-[#FF6600]" />
            </div>

            <div className="space-y-3">
              {sessions[session].map((video) => (
                <Link
                  key={video.id}
                  href={`/events/${event.id}/video/${video.id}`}
                  className="flex items-start gap-4 border-b pb-3 hover:bg-gray-50 transition"
                >
                  <div className="text-gray-600 font-semibold w-6">
                    {video.id}
                  </div>

                  <div className="w-32 h-20 relative rounded-md overflow-hidden shrink-0 bg-gray-200">
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover rounded-md"
                      poster={video.thumbnail || "/video-placeholder.png"}
                    />
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
                    Video – {video.duration}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🪟 Register Modal */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
}
