"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Event } from "@/app/data/events";

interface Props {
  entries: Event[];
}

export default function Events({ entries }: Props) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");

  const handleLoadMore = () => setVisibleCount(entries.length);

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.dateRange).getTime() - new Date(a.dateRange).getTime();
    }
    if (sortBy === "popularity") {
      return (b.popularity ?? 0) - (a.popularity ?? 0);
    }
    return 0;
  });

  const visibleEntries = sortedEntries
    .filter((entry) =>
      entry.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, visibleCount);

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-start">
        Events
      </h1>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-3">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-[#00694A] focus:outline-none"
        />

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
              onClick={() => setSortBy("popularity")}
              className={sortBy === "popularity" ? "bg-[#FF6600] text-white" : ""}
            >
              Popularity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Event Cards */}
      {visibleEntries.map((entry, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row gap-4"
        >
          {/* Image */}
          <div className="w-full sm:w-[144px] h-[144px] relative rounded-md overflow-hidden shrink-0">
            <Image
              src={entry.imageUrl}
              alt={entry.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 100vw, 144px"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-[#00694A]">
                {entry.title}
              </h2>

              {/* View Now Button */}
              <Button
                variant="outline"
                className="text-sm text-[#00694A] hover:bg-blue-500 hover:text-white border-[#00694A] rounded-full"
              >
                View Now
              </Button>
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
              <span>{entry.dateRange}</span>
            </div>

            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{entry.location}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {visibleCount < entries.length && (
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
