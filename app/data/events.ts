// export interface Event {
//   id: string;
//   title: string;
//   dateRange: string;
//   location: string;
//   imageUrl: string;
//   popularity?: number;
//   price?: number; // Price added to demonstrate 'Buy Now'
// }

// export const events: Event[] = [
//   {
//     id: "fusicon-2026",
//     title: "FUSICON 2026",
//     dateRange: "17 Apr 2026 - 18 Apr 2026",
//     location: "The Lalit, IT Park, Chandigarh",
//     imageUrl: "/event-logo.png",
//     popularity: 120,
//     price: 0, // Free event
//   },
//   {
//     id: "pusicon-2026",
//     title: "PUSICON 2026",
//     dateRange: "23 Apr 2026 - 25 Apr 2026",
//     location: "The Lalit, IT Park, Chandigarh",
//     imageUrl: "/event-logo.png",
//     popularity: 110,
//     price: 2500, // Paid event
//   },
//   {
//     id: "androcon-2026",
//     title: "ANDROCON 2026",
//     dateRange: "2 May 2026 - 3 May 2026",
//     location: "The Lalit, IT Park, Chandigarh",
//     imageUrl: "/event-logo.png",
//     popularity: 85,
//     price: 5000, // Paid event
//   },
//   {
//     id: "uro-complicon-2025",
//     title: "URO-Complicon 2025", // Added for speaker details
//     dateRange: "10 Oct 2025 - 11 Oct 2025",
//     location: "Virtual Event",
//     imageUrl: "/event-logo.png",
//     popularity: 150,
//     price: 0, // Free event
//   },
//   {
//     id: "urolithicon-2025",
//     title: "Urolithicon 2025", // Added for speaker details
//     dateRange: "1 Dec 2025 - 2 Dec 2025",
//     location: "Mumbai",
//     imageUrl: "/event-logo.png",
//     popularity: 90,
//     price: 1500, // Paid event
//   },
// ];

// app/data/events.ts

// The updated Event interface to match the backend response
export interface Event {
  _id: string;          // Changed from 'id'
  fullName: string;     // Changed from 'title'
  start_date: string;   // New field
  end_date: string;     // New field
  venue: string;        // Changed from 'location'
  image: string;        // Changed from 'imageUrl'
  regType: 'PAID' | 'FREE'; // New field
  amount: number;       // Changed from 'price'
  duration: number;     // New field (in minutes)
  popularity?: number;  // Kept for frontend sorting logic
}

export const events: Event[] = [
  {
    _id: "68e6aabb09f1972e8fa21524",
    fullName: "LMS Testing Conference 2026",
    start_date: "2026-03-15T00:00:00.000Z",
    end_date: "2026-03-17T00:00:00.000Z",
    venue: "Virtual",
    image: "/event-logo.png",
    regType: "PAID",
    amount: 5000,
    duration: 62,
    popularity: 110,
  },
  {
    _id: "669b32e01f114e9123456785",
    fullName: "Annual Cardiology Summit 2025",
    start_date: "2025-11-10T00:00:00.000Z",
    end_date: "2025-11-12T00:00:00.000Z",
    venue: "AIG Convention Center",
    image: "/event-logo.png", // Using a local image for example
    regType: "PAID",
    amount: 2500,
    duration: 120,
    popularity: 95,
  },
  {
    _id: "uro-complicon-2025-id",
    fullName: "URO-Complicon 2025",
    start_date: "2025-10-10T00:00:00.000Z",
    end_date: "2025-10-11T00:00:00.000Z",
    venue: "Virtual Event",
    image: "/event-logo.png",
    regType: "FREE",
    amount: 0,
    duration: 45,
    popularity: 150,
  },
  {
    _id: "fusicon-2026-id",
    fullName: "FUSICON 2026",
    start_date: "2026-04-17T00:00:00.000Z",
    end_date: "2026-04-18T00:00:00.000Z",
    venue: "The Lalit, IT Park, Chandigarh",
    image: "/event-logo.png",
    regType: "FREE",
    amount: 0,
    duration: 0, // This event has no topics yet
    popularity: 120,
  },
];