"use client";

import { useState } from "react";
// Using standard a and img tags, so Link and Image are not needed
// import Image from "next/image";
// import Link from "next/link";
import { CalendarDays, MapPin, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RegisteredEvent } from "@/app/data/registeredevents"; // Adjust path if needed
import type { SortByType } from "@/app/(dashboard)/dashboard/registeredevents/page";

interface Props {
  entries: RegisteredEvent[];
  sortBy: SortByType;
  setSortBy: (value: SortByType) => void;
}

// Helper to handle both full and relative image URLs
const getImageUrl = (path: string) => {
  if (!path) return '/event-logo.png'; // Return fallback if path is null/empty
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${path}`;
};

export default function RegEvents({ entries, sortBy, setSortBy }: Props) {
  const [search, setSearch] = useState("");

  const filteredEvents = entries.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-1">
      {/* Title with matched font and style */}
      <h1 className="text-2xl font-semibold text-black font-francois-one mb-2 pb-2 text-start">
        Registered Events
      </h1>

      {/* Controls: Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          {/* Matched search input style */}
          <input
            type="text"
            placeholder="   Search your events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-8 py-2 w-full focus:ring-2 focus:ring-[#FF6600] focus:outline-none"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Matched sort button style */}
            <Button
              variant="outline"
              className="border border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white flex items-center gap-2 w-full sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => setSortBy("newest")}
              className={sortBy === "newest" ? "bg-[#FF6600] text-white" : ""}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("popularity")}
              className={sortBy === "popularity" ? "bg-[#FF6600] text-white" : ""}
            >
              Popularity
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSortBy("alphabetical")}
              className={sortBy === "alphabetical" ? "bg-[#FF6600] text-white" : ""}
            >
              Alphabetical (A-Z)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-[144px] h-[144px] relative rounded-md overflow-hidden shrink-0">
                {/* Replaced next/image with standard img tag + fallback */}
                <img
                  src={getImageUrl(event.image)}
                  alt={event.name}
                  className="object-cover rounded-md w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/event-logo.png'; }}
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-start mb-2">
                  {/* Replaced next/link with standard anchor tag */}
                  <a href={`/dashboard/registeredevents/${event.id}`} className="text-xl font-semibold text-[#0d47a1] hover:underline cursor-pointer">
                    {event.name}
                  </a>
                  <div className="flex flex-col items-end gap-2 text-right flex-shrink-0 ml-4">
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      Registered on {event.registeredOn}
                    </p>
                    <a href={`/dashboard/registeredevents/${event.id}`}>
                      <Button className="text-sm text-white bg-blue-600 hover:bg-blue-500 border-none rounded-full px-5">
                        View Now
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Matched text style (bold and black) */}
                <div className="flex items-center text-bold text-black">
                  <CalendarDays className="w-4 h-4 mr-2 text-black" />
                  <span>
                    {event.startDate} - {event.endDate}
                  </span>
                </div>

                {/* Matched text style (bold and black) */}
                <div className="flex items-center text-bold text-black">
                  <MapPin className="w-4 h-4 mr-2 text-black" />
                  <span>{event.location}</span>
                </div>

                {/* Details without popularity */}
                <div className="text-sm text-black">
                  <span>{event.sessions}</span>
                  <span className="mx-1.5">·</span>
                  <span>{event.videos}</span>
                  <span className="mx-1.5">·</span>
                  <span>{event.duration}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">
            <p>
              {entries.length === 0 ? "You haven't registered for any events yet." : "No events match your search."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}