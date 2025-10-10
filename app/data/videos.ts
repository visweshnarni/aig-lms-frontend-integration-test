export interface Video {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  thumbnail?: string;
  session?: string;
  videoUrl?: string;
  eventId: string;      // Add this property!
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    thumbnail: "/thumbnails/my own.jpg",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Jaideep Mishra",
    duration: "12:33",
    thumbnail: "/my own.jpg",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Dr Udit Jana",
    duration: "12:33",
    thumbnail: "/my own.jpg",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    thumbnail: "/my own.jpg",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    session: "Session 1: Laparoscopy & Robotics I",
    eventId: "fusicon-2026",
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    thumbnail: "/my own.jpg",
    session: "Session 2: Robotics I",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    eventId: "fusicon-2026",
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Jaideep Mishra",
    duration: "12:33",
    thumbnail: "/my own.jpg",
    videoUrl: "https://www.youtube.com/embed/FbXOsVByKmk?si=g6O1kqs7ChCXSmBP",
    session: "Session 2: Robotics I",
    eventId: "fusicon-2026",
  },
  // Add more videos for other events by changing eventId (e.g., "pusicon-2026") as needed.
];
