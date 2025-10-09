export interface Video {
  id: number;
  title: string;
  speaker: string;
  duration: string;
  thumbnail?: string;
  session?: string;
  videoUrl?: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    videoUrl: "/videos/video1.mp4",
    thumbnail: "/video-placeholder.png",
    session: "Session 1: Laparoscopy & Robotics I",
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Jaideep Mishra",
    duration: "12:33",
    thumbnail: "/video-placeholder.png",
    videoUrl: "/videos/video2.mp4",
    session: "Session 1: Laparoscopy & Robotics I",
  },
  {
    id: 3,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Dr Udit Jana",
    duration: "12:33",
    thumbnail: "/video-placeholder.png",
    videoUrl: "/videos/video3.mp4",
    session: "Session 1: Laparoscopy & Robotics I",
  },
  {
    id: 4,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    thumbnail: "/video-placeholder.png",
    session: "Session 1: Laparoscopy & Robotics I",
  },
   {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "R.V. Sudarshan",
    duration: "12:33",
    thumbnail: "/video-placeholder.png",
    session: "Session 2: Robotics I",
  },
  {
    id: 2,
    title:
      "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
    speaker: "Jaideep Mishra",
    duration: "12:33",
    thumbnail: "/video-placeholder.png",
    session: "Session 2: Robotics I",
  },
];
