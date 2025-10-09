"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/app/data/events";

export default function EventDetailsPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) return <div className="p-8 text-center">Event not found</div>;

  return (
    <div className="p-6 space-y-6">
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

          <div className="flex items-center text-gray-700 mb-4">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{event.location}</span>
          </div>

          <Button className="bg-[#00A651] hover:bg-green-700 text-white">
            {event.price === 0 ? "Register Free" : "Buy Ticket"}
          </Button>
        </div>
      </div>

      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-semibold mb-3 text-[#0d47a1]">Contents</h2>
        <p className="text-gray-700">3 Sessions • 12 Videos • 50 mins total length</p>
      </div>
    </div>
  );
}
