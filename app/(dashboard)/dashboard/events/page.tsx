"use client";

import Events from "@/app/components/dashboard/Events/Events";

export default function EventsPage() {
  return (
    <div>
      {/* The Events component now fetches its own data */}
      <Events />
    </div>
  );
}

