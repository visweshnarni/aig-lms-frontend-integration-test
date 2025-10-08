// app/data/events.ts

export interface Event {
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
   popularity?: number;

}

export const events: Event[] = [
  {
    title: "FUSICON 2026",
    dateRange: "17 Apr 2026 - 18 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",

  },
  {
    title: "PUSICON 2026",
    dateRange: "23 Apr 2026 - 25 Apr 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",

  },
  {
    title: "ANDROCON 2026",
    dateRange: "2 May 2026 - 3 May 2026",
    location: "The Lalit, IT Park, Chandigarh",
    imageUrl: "/event-logo.png",

  },
];
