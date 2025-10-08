"use client";
// tdc/app/(dashboard)/dashboard/events/page.tsx
import Events from "@/app/components/dashboard/Events/Events";
import { events } from "@/app/data/events";
// import EventDetails from "@/app/components/dashboard/Events/freeevent";

export default function EventsPage() {
  return (
    <div >
      <Events entries={events} />
    </div>
  );
}
