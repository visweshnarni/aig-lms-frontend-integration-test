"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, MapPin, Search, ChevronDown, Play } from "lucide-react";
import { events } from "@/app/data/events";
import { videos as videoData } from "@/app/data/videos";
import VideoThumbnail from "@/app/components/dashboard/Events/VideoThumbnail";

export default function RegisteredEventDetailsPage() {
  const { id } = useParams() as { id: string };
  const event = events.find((e) => e.id === id);
  const [search, setSearch] = useState("");

  if (!event) {
    return <div className="p-8 text-center text-gray-600">Event not found.</div>;
  }

  const filteredVideos = videoData.filter(
    (v) => v.eventId === id && v.title.toLowerCase().includes(search.toLowerCase())
  );

  const sessions: Record<string, typeof filteredVideos> = filteredVideos.reduce(
    (acc, video) => {
      const sessionName = video.session || "General Session";
      if (!acc[sessionName]) acc[sessionName] = [];
      acc[sessionName].push(video);
      return acc;
    },
    {} as Record<string, typeof filteredVideos>
  );

  const totalDurationMinutes = filteredVideos.reduce((sum, v) => {
    const parts = v.duration.split(":");
    return sum + parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white">
      
      {/* Breadcrumb Section (Moved to the top) */}
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/dashboard/registeredevents" className="hover:underline">
          Registered Events
        </Link>
        <span className="mx-2 text-gray-400">{'>'}</span>
        <span className="font-medium text-orange-600">{event.title}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 shadow-md">
            <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
          </div>
          <div>
            {/* The old breadcrumb <p> tag is now removed from here */}
            <h1 className="text-3xl font-bold text-blue-900 mt-2 mb-3">{event.title}</h1>
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
      </div>

      {/* Contents & Search Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Contents</h2>
        <p className="text-gray-600 mb-6">
          {Object.keys(sessions).length} Sessions • {filteredVideos.length} Videos • {Math.floor(totalDurationMinutes / 60)} mins total length
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

      {/* Session List - All videos are accessible */}
      <div className="space-y-8">
        {Object.keys(sessions).map((session) => (
          <div key={session}>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{session}</h3>
              <ChevronDown className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-4">
              {sessions[session].map((video, index) => (
                <Link
                  key={video.id}
                  href={`/dashboard/registeredevents/${id}/video/${video.id}`}
                  className="group flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <span className="text-gray-500 font-medium w-8 text-center">{index + 1}</span>
                  <div className="w-32 h-20 relative rounded-md overflow-hidden shrink-0 bg-black">
                     <VideoThumbnail videoUrl={video.videoUrl} className="w-full h-full" />
                     <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play className="w-8 h-8 text-white fill-white" />
                     </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 leading-snug">{video.title}</p>
                    <p className="text-sm text-gray-500 mt-1">Speaker - <span className="font-semibold text-orange-600">{video.speaker}</span></p>
                  </div>
                  <span className="text-gray-500 text-sm font-mono whitespace-nowrap">Video - {video.duration}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}