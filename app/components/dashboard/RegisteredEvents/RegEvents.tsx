"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Import the TYPE, not the data itself
import type { RegisteredEvent } from "@/app/data/registeredevents";

// Define the props interface
interface Props {
  entries: RegisteredEvent[];
}

export default function RegEvents({ entries }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "name">("newest");

  // Use the 'entries' prop instead of the imported data
  const sortedEvents = [...entries].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const filteredEvents = sortedEvents.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-1">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 pb-2 text-start">
        Registered Events
      </h1>

      {/* Controls: Sort and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search your events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center gap-2 w-full sm:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Alphabetical (A-Z)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row gap-4"
          >
            {/* Image */}
            <div className="w-full sm:w-[144px] h-[144px] relative rounded-md overflow-hidden shrink-0">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 640px) 100vw, 144px"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/dashboard/registeredevents/${event.id}`}>
                  <h2 className="text-xl font-semibold text-[#0d47a1] hover:underline cursor-pointer">
                    {event.name}
                  </h2>
                </Link>
                <div className="flex flex-col items-end gap-2 text-right flex-shrink-0 ml-4">
                  <p className="text-xs text-gray-500 whitespace-nowrap">Registered on {event.registeredOn}</p>
                   <Link href={`/dashboard/registeredevents/${event.id}`}>
                    <Button
                      variant="outline"
                      className="text-sm text-white bg-blue-600 hover:bg-blue-500 border-none rounded-full px-5"
                    >
                      View Now
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
                <span>{event.startDate} - {event.endDate}</span>
              </div>

              <div className="flex items-center text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span>{event.location}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <span>{event.sessions}</span>
                <span className="mx-1.5">•</span>
                <span>{event.videos}</span>
                <span className="mx-1.5">•</span>
                <span>{event.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}