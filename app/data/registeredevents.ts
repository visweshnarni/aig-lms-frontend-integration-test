export interface RegisteredEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  videos: string;
  sessions: string;
  duration: string;
  registeredOn: string;
  image: string;
  popularity: number;
}

// export const registeredEvents: RegisteredEvent[] = [
//   {
//     id: "fusicon-2026", // This event is free and registered
//     name: "FUSICON 2026",
//     startDate: "17 Apr 2026",
//     endDate: "18 Apr 2026",
//     location: "The Lalit, IT Park, Chandigarh",
//     videos: "12 recorded videos",
//     sessions: "2 Sessions",
//     duration: "45 mins total event",
//     registeredOn: "2 May 2025",
//     image: "/event-logo.png",
//   },
//   {
//     id: "pusicon-2026", // This event is paid but also registered
//     name: "PUSICON 2026",
//     startDate: "23 Apr 2026",
//     endDate: "25 Apr 2026",
//     location: "The Lalit, IT Park, Chandigarh",
//     videos: "12 Videos",
//     sessions: "3 Sessions",
//     duration: "50 mins total event",
//     registeredOn: "2 May 2025",
//     image: "/event-logo.png",
//   },
//   {
//     id: "uro-complicon-2025", // This event is also registered for testing
//     name: "URO-Complicon 2025",
//     startDate: "10 Oct 2025",
//     endDate: "11 Oct 2025",
//     location: "Virtual Event",
//     videos: "4 Videos",
//     sessions: "1 Session",
//     duration: "30 mins total event",
//     registeredOn: "1 Oct 2025",
//     image: "/event-logo.png",
//   },
// ];