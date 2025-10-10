export interface RegisteredEvent {
  id: string; // Use string IDs to match the event data (e.g., "fusicon-2026")
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  videos: string;
  sessions: string;
  duration: string;
  registeredOn: string;
  image: string;
}

export const registeredEvents: RegisteredEvent[] = [
  {
    id: "pusicon-2026",
    name: "PUSICON 2026",
    startDate: "23 Apr 2026",
    endDate: "25 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    videos: "12 Videos",
    sessions: "3 Sessions",
    duration: "50 mins total event",
    registeredOn: "2 May 2025",
    image: "/event-logo.png", // Add your event logos to the /public/event-logos folder
  },
  {
    id: "fusicon-2026",
    name: "FUSICON 2026",
    startDate: "17 Apr 2026",
    endDate: "18 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    videos: "12 recorded videos",
    sessions: "2 Sessions",
    duration: "45 mins total event",
    registeredOn: "2 May 2025",
    image: "/event-logo.png",
  },
];