"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
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
import type { Speaker } from "@/app/data/speakers";

// Define props to include the calculated video count
interface SpeakerWithCount extends Speaker {
  videos: number;
}
interface Props {
  entries: SpeakerWithCount[];
}

export default function SpeakersList({ entries }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"alphabetical" | "videos">(
    "alphabetical"
  );
  const [visibleCount, setVisibleCount] = useState(12);

  const sortedSpeakers = [...entries].sort((a, b) => {
    if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
    if (sortBy === "videos") return b.videos - a.videos;
    return 0;
  });

  const filteredSpeakers = sortedSpeakers
    .filter((sp) => sp.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(entries.length);

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800">Speakers</h1>

      {/* Search + Sort Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Speakers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 w-full border border-gray-300 rounded-md py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Sort By Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center gap-2 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
              Alphabetical (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("videos")}>
              Most Videos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Speaker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpeakers.map((speaker) => (
          <Link
            key={speaker.id}
            href={`/dashboard/speakers/${speaker.id}`}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex gap-4 items-center hover:shadow-lg hover:border-orange-500 transition-all duration-300"
          >
            <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={speaker.image}
                alt={speaker.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-orange-600 font-bold text-base">
                {speaker.name}
              </h2>
              <div className="flex items-center text-sm text-black-600 mt-1">
                <Building className="w-4 h-4 mr-2 text-black-400" />
                <span>{speaker.institute}</span>
              </div>
              <div className="flex items-center text-sm text-black-600 mt-1">
                <MapPin className="w-4 h-4 mr-2 text-black-400" />
                <span>{speaker.location}</span>
              </div>
              <div className="flex items-center text-sm text-black-600 mt-1">
                <Video className="w-4 h-4 mr-2 text-black-400" />
                <span>{speaker.videos} Videos</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < sortedSpeakers.length && (
        <div className="text-center pt-4">
          <Button
            onClick={handleLoadMore}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            Load More . . .
          </Button>
        </div>
      )}
    </div>
  );
}
