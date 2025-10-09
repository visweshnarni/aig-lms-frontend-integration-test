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
import Link from "next/link";

interface Props {
  entries: Event[];
}

export default function Events({ entries }: Props) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");
  const [filterType, setFilterType] = useState<"free" | "paid">("free");

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

  const filteredEntries = sortedEntries.filter((entry) => {
    
    if (filterType === "free") return (entry.price ?? 0) === 0;
    if (filterType === "paid") return (entry.price ?? 0) > 0;
    return true;
  });

  const visibleEntries = filteredEntries
    .filter((entry) =>
      entry.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, visibleCount);

  return (
    <div className="space-y-6 p-1">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-black font-francois-one mb-2 pb-2 text-start">
        All Events
      </h1>

      {/* Tabs + Sort */}
      <div className="flex justify-between items-center mb-6">
        {/* Free / Paid Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilterType("free")}
            className={`font-semibold ${
              filterType === "free"
                ? "text-[#0d47a1] border-b-2 border-[#0d47a1]"
                : "text-black"
            }`}
          >
            Free Events
          </button>
          <button
            onClick={() => setFilterType("paid")}
            className={`font-semibold ${
              filterType === "paid"
                ? "text-[#0d47a1] border-b-2 border-[#0d47a1]"
                : "text-black"
            }`}
          >
            Paid Events
          </button>
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
              onClick={() => setSortBy("popularity")}
              className={sortBy === "popularity" ? "bg-[#FF6600] text-white" : ""}
            >
              Popularity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-[#00694A] focus:outline-none mb-6"
      />

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
              <Link href={`/dashboard/events/${entry.id}`}>
  <h2 className="text-xl font-semibold text-[#0d47a1] hover:underline cursor-pointer">
    {entry.title}
  </h2>
</Link>

<Link href={`/dashboard/events/${entry.id}`}>
  <Button
    variant="outline"
    className="text-sm text-white bg-blue-600 hover:bg-blue-500 hover:text-white border-blue rounded-full"
  >
    View Now
  </Button>
</Link>

            </div>

            <div className="flex items-center text-bold text-black">
              <CalendarDays className="w-4 h-4 mr-2 text-black" />
              <span>{entry.dateRange}</span>
            </div>

            <div className="flex items-center text-bold text-black">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              <span>{entry.location}</span>
            </div>
              <div className="text-sm text-black ">
    3 Sessions · 12 Videos · 50 mins total event
  </div>
          </div>
        </div>
      ))}

      {/* Load More */}
      {visibleCount < filteredEntries.length && (
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
