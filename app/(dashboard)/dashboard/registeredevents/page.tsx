import RegEvents from "@/app/components/dashboard/RegisteredEvents/RegEvents";

export default function RegisteredEventsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4">
      <h1 className="text-xl font-semibold mb-4">Registered Events</h1>
      <RegEvents />
    </div>
  );
}
