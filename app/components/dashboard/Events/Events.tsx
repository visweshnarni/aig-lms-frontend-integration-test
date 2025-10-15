"use client";

import { useState, useEffect } from "react";
// import Image from "next/image"; // Removed to fix build error
// import Link from "next/link"; // Removed to fix build error
import { CalendarDays, MapPin, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Event } from "@/app/data/events"; // Ensure this path is correct

// Helper function to format date range from ISO strings
const formatDateRange = (startDateStr: string, endDateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const startDate = new Date(startDateStr).toLocaleDateString("en-GB", options);
  const endDate = new Date(endDateStr).toLocaleDateString("en-GB", options);
  return `${startDate} - ${endDate}`;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");
  const [filterType, setFilterType] = useState<"free" | "paid">("free");

  // Fetch data when filter or sort option changes
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await fetch(`${baseUrl}/events/public/${filterType}?sort=${sortBy}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
          setEvents(data.events);
        } else {
          throw new Error(data.error || 'Failed to fetch events.');
        }
      } catch (err: any) {
        setError(err.message);
        setEvents([]); // Clear events on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterType, sortBy]);

  const handleLoadMore = () => setVisibleCount(events.length);

  // Client-side search on the fetched events
  const filteredBySearch = events.filter((entry) =>
    entry.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const visibleEntries = filteredBySearch.slice(0, visibleCount);

  return (
    <div className="space-y-6 p-1">
      <h1 className="text-2xl font-semibold text-black font-francois-one mb-2 pb-2 text-start">
        All Events
      </h1>

      {/* Tabs + Sort */}
      <div className="flex justify-between items-center mb-6">
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

      <div className="relative w-full sm:w-1/2">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="   Search for an event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-8 py-2 w-full focus:ring-2 focus:ring-[#FF6600] focus:outline-none"
        />
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-[#0d47a1]" />
          <span className="ml-4 text-lg">Loading Events...</span>
        </div>
      )}

      {error && !loading && (
        <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {!loading && !error && visibleEntries.length === 0 && (
          <div className="text-center p-10 text-gray-500 bg-gray-50 rounded-lg">
              <p>No events found. Try adjusting your filters.</p>
          </div>
      )}
      
      {/* Event Cards */}
      {!loading && !error && visibleEntries.map((entry) => (
        <div
          key={entry._id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row gap-4"
        >
          <div className="w-full sm:w-[144px] h-[144px] relative rounded-md overflow-hidden shrink-0">
            {/* Replaced next/image with standard img tag */}
            <img
              src={entry.image}
              alt={entry.fullName}
              className="object-cover rounded-md w-full h-full"
              onError={(e) => { (e.target as HTMLImageElement).src = '/event-logo.png'; }} // Fallback image
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-start mb-2">
              {/* Replaced next/link with standard anchor tag */}
              <a href={`/dashboard/events/${entry._id}`} className="text-xl font-semibold text-[#0d47a1] hover:underline cursor-pointer">
                {entry.fullName}
              </a>
              <a href={`/dashboard/events/${entry._id}`}>
                <Button
                  variant="outline"
                  className="text-sm text-white bg-blue-600 hover:bg-blue-500 hover:text-white border-blue rounded-full"
                >
                  View Now
                </Button>
              </a>
            </div>
            <div className="flex items-center text-bold text-black">
              <CalendarDays className="w-4 h-4 mr-2 text-black" />
              <span>{formatDateRange(entry.start_date, entry.end_date)}</span>
            </div>
            <div className="flex items-center text-bold text-black">
              <MapPin className="w-4 h-4 mr-2 text-black" />
              <span>{entry.venue}</span>
            </div>
            {/* --- CHANGE 2: USE DYNAMIC DATA HERE --- */}
            <div className="text-sm text-black ">
                {entry.totalSessions || 0} Sessions · {entry.totalTopics || 0} Videos · {entry.duration || 0} mins total event
            </div>
          </div>
        </div>
      ))}

      {/* Load More */}
      {!loading && visibleCount < filteredBySearch.length && (
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