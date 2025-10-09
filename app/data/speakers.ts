export interface VideoItem {
  id: number;
  title: string;
  event: string;
  duration: string;
}

export interface Speaker {
  id: number;
  name: string;
  institute: string;
  location: string;
  videos: number;
  image: string;
  videoList: VideoItem[];
}

export const speakers: Speaker[] = [
  {
    id: 1,
    name: "Dr. R.V. Sudarsrhan",
    institute: "AIIMS Delhi",
    location: "Tamil Nadu, India",
    videos: 4,
    image: "/speakers.png",
    videoList: [
      {
        id: 1,
        title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
        event: "URO-Complicon 2025",
        duration: "12:33",
      },
      {
        id: 2,
        title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
        event: "URO-Complicon 2025",
        duration: "12:33",
      },
      {
        id: 3,
        title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
        event: "URO-Complicon 2025",
        duration: "12:33",
      },
      {
        id: 4,
        title: "Lorem ipsum dolor sit amet consectetur. Est tincidunt cras dis vitae arcu pellentesque dui.",
        event: "Urolithicon 2025",
        duration: "12:33",
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Kavitha N",
    institute: "CMC Vellore",
    location: "Chennai, India",
    videos: 6,
    image: "/speakers.png",
    videoList: [
      {
        id: 1,
        title: "Advanced techniques in minimally invasive surgery",
        event: "SurgiCon 2025",
        duration: "10:45",
      },
      {
        id: 2,
        title: "Post-operative care and recovery strategies",
        event: "MedSummit 2025",
        duration: "14:10",
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Arjun Mehta",
    institute: "Apollo Hospitals",
    location: "Bengaluru, India",
    videos: 2,
    image: "/speakers.png",
    videoList: [
      {
        id: 1,
        title: "Emerging approaches in robotic surgery",
        event: "Robotic MedConf 2025",
        duration: "11:20",
      },
      {
        id: 2,
        title: "Patient data management for surgical planning",
        event: "AI Health Expo 2025",
        duration: "09:40",
      },
    ],
  },
];
