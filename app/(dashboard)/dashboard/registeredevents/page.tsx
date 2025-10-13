"use client";

import { useState, useEffect } from "react";
import RegEvents from "@/app/components/dashboard/RegisteredEvents/RegEvents";
import type { RegisteredEvent } from "@/app/data/registeredevents"; // Adjust path if needed
import { Skeleton } from "@/components/ui/skeleton"; // For loading UI

// Define the possible sort types to match the backend
export type SortByType = "newest" | "popularity" | "alphabetical";

export default function RegisteredEventsPage() {
  const [events, setEvents] = useState<RegisteredEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortByType>("newest"); // Default sort

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      setIsLoading(true); // Set loading state for each fetch
      try {
       const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await fetch(`${backendUrl}/events/registered?sort=${sortBy}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch registered events.");
        }

        const data = await response.json();
        setEvents(data.events);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [sortBy]); // Re-fetch data whenever 'sortBy' changes

  if (isLoading) {
    return (
      <div className="space-y-6 p-1">
        <h1 className="text-2xl font-semibold">Registered Events</h1>
        <div className="space-y-4">
          <Skeleton className="h-[160px] w-full rounded-lg" />
          <Skeleton className="h-[160px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      {/* Pass the state and the setter function to the child component */}
      <RegEvents
        entries={events}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}