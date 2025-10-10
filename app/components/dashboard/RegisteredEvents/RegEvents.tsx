"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Video,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { registeredEvents } from "@/app/data/registeredevents";

export interface RegisteredEvent {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  videos?: string | null;
  sessions?: string | null;
  duration?: string | null;
  registeredOn: string;
  image: string;
}

export default function RegEvents() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "name">("newest");
  const [visibleCount, setVisibleCount] = useState(10);

  const sortedEvents = [...registeredEvents].sort((a, b) => {
    if (sortBy === "newest") {
      // Sort by end date
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const filteredEvents = sortedEvents
    .filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(registeredEvents.length);

  return (
    <div className="space-y-6 p-1">
      {/* Sort & Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full border border-gray-500 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#00694A] focus:outline-none"
          />
        </div>

        {/* Sort By Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => setSortBy("newest")}
              className={sortBy === "newest" ? "bg-[#FF6600] text-white" : ""}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("name")}
              className={sortBy === "name" ? "bg-[#FF6600] text-white" : ""}
            >
              Popularity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Event Cards */}
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row justify-between gap-4"
        >
          {/* Left */}
          <div className="flex gap-4">
            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                width={100}
                height={100}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-blue-700">
                {event.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-black">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {event.startDate} - {event.endDate}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-black">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              {event.videos && (
                <div className="flex items-center gap-2 mt-1 text-black">
                  <Video className="h-4 w-4" />
                  <span>{event.videos}</span>
                </div>
              )}
              {event.sessions && (
                <div className="flex flex-wrap gap-3 mt-1 text-black">
                  <span>{event.sessions}</span>
                  <span>• {event.videos}</span>
                  <span>• {event.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end text-sm text-gray-500">
            <span>Registered on {event.registeredOn}</span>

            {/* ✅ View Now Button navigates to /dashboard/events/[id] */}
            <Link href={`/dashboard/events/${event.id}`}>
              <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                View Now
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Load More */}
      {visibleCount < registeredEvents.length && (
        <div className="text-center pt-4">
          <Button
            onClick={handleLoadMore}
            className="text-white bg-[#00694A] hover:bg-[#004d36]"
          >
            Load More . . .
          </Button>
        </div>
      )}
    </div>
  );
}
