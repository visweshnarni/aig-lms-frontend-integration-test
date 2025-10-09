// app/data/events.ts

export interface Event {
  id: string;  // Must be string for clean routing
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
  popularity?: number;
  price?: number;
}

export const events: Event[] = [
  {
    id: "fusicon-2026",
    title: "FUSICON 2026",
    dateRange: "17 Apr 2026 - 18 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",
    popularity: 120,
    price: 0,
  },
  {
    id: "pusicon-2026",
    title: "PUSICON 2026",
    dateRange: "23 Apr 2026 - 25 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",
    popularity: 110,
    price: 0,
  },
  {
    id: "androcon-2026",
    title: "ANDROCON 2026",
    dateRange: "2 May 2026 - 3 May 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",
    popularity: 85,
    price: 0,
  },
];
