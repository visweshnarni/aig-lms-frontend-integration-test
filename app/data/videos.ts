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
  {
    id: 1,
    title: "The Art of Robotic Surgery: A Deep Dive (Direct MP4)",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Direct MP4
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 2,
    title: "Innovations in Minimally Invasive Procedures (YouTube Embed)",
    speaker: "Jaideep Mishra",
    duration: "15:45",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", // Valid YouTube URL
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 3,
    title: "Navigating Complex Cases with Laparoscopy (Vimeo Embed)",
    speaker: "Dr Udit Jana",
    duration: "18:20",
    videoUrl: "https://vimeo.com/476306167", // Valid Vimeo URL
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 4,
    title: "Future of Surgical Robotics and AI Integration (Direct MP4)",
    speaker: "R.V. Sudarshan",
    duration: "22:10",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Direct MP4
    session: "Session 2: Laparoscopy & Robotics II",
    eventId: "fusicon-2026",
  },
  {
    id: 5,
    title: "Advanced Techniques in Robotic Suturing (Another YouTube Embed)",
    speaker: "Jaideep Mishra",
    duration: "19:55",
    videoUrl: "https://youtu.be/cpP-fCo8Dn4?si=cp0zVZU3rXvj59E9", // Replaced with a valid YouTube URL
    session: "Session 2: Laparoscopy & Robotics II",
    eventId: "fusicon-2026",
  },
];