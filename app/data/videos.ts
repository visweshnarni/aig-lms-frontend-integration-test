export interface Video {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  session?: string;
  videoUrl: string;
  eventId: string;
}

export const videos: Video[] = [
  // Videos for Dr. R.V. Sudarshan
  {
    id: 1,
    title: "The Art of Robotic Surgery: A Deep Dive (FUSICON)",
    speaker: "Dr. R.V. Sudarshan",
    duration: "12:33",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 4,
    title: "Future of Surgical Robotics and AI Integration (FUSICON)",
    speaker: "Dr. R.V. Sudarshan",
    duration: "22:10",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    session: "Session 2: Laparoscopy & Robotics II",
    eventId: "fusicon-2026",
  },
  {
    id: 6,
    title: "Minimally Invasive Techniques in Urology (URO-Complicon)",
    speaker: "Dr. R.V. Sudarshan",
    duration: "10:00",
    videoUrl: "https://www.youtube.com/watch?v=eYkP3f7i6Ww", // Example YouTube
    session: "Keynote Address",
    eventId: "uro-complicon-2025",
  },
  {
    id: 7,
    title: "Complications in Advanced Laparoscopy (URO-Complicon)",
    speaker: "Dr. R.V. Sudarshan",
    duration: "18:00",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    session: "Panel Discussion",
    eventId: "uro-complicon-2025",
  },

  // Videos for Dr. Jaideep Mishra
  {
    id: 2,
    title: "Innovations in Minimally Invasive Procedures (FUSICON)",
    speaker: "Dr. Jaideep Mishra",
    duration: "15:45",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 5,
    title: "Advanced Techniques in Robotic Suturing (FUSICON)",
    speaker: "Dr. Jaideep Mishra",
    duration: "19:55",
    videoUrl: "https://youtu.be/cpP-fCo8Dn4?si=cp0zVZU3rXvj59E9",
    session: "Session 2: Laparoscopy & Robotics II",
    eventId: "fusicon-2026",
  },
  {
    id: 8,
    title: "Robotic Surgery for Complex Renal Cases (PUSICON)",
    speaker: "Dr. Jaideep Mishra",
    duration: "25:00",
    videoUrl: "https://vimeo.com/834372995", // Example Vimeo
    session: "Special Lecture",
    eventId: "pusicon-2026",
  },
  // Videos for Dr. Udit Jana
  {
    id: 3,
    title: "Navigating Complex Cases with Laparoscopy (FUSICON)",
    speaker: "Dr. Udit Jana",
    duration: "18:20",
    videoUrl: "https://vimeo.com/476306167",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 9,
    title: "Percutaneous Nephrolithotomy Techniques (Urolithicon)",
    speaker: "Dr. Udit Jana",
    duration: "20:00",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    session: "Workshop",
    eventId: "urolithicon-2025",
  },
];