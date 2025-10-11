import RegEvents from "@/app/components/dashboard/RegisteredEvents/RegEvents";
import { registeredEvents } from "@/app/data/registeredevents";

export default function RegisteredEventsPage() {
  return (
    <div>
      <RegEvents entries={registeredEvents} />
    </div>
  );
}