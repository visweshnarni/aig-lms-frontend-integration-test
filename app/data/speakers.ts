export interface Speaker {
  id: number;
  name: string;
  institute: string;
  location: string;
  videos: number;
  image: string;
}

export const speakers: Speaker[] = [
  {
    id: 1,
    name: "Dr. R.V. Sudarsrhan",
    institute: "AIIMS Delhi",
    location: "Tamil Nadu, India",
    videos: 4,
    image: "/speakers.png",
  },
  {
    id: 2,
    name: "Dr. Kavitha N",
    institute: "CMC Vellore",
    location: "Chennai, India",
    videos: 6,
    image: "/speakers.png",
  },
  {
    id: 3,
    name: "Dr. Arjun Mehta",
    institute: "Apollo Hospitals",
    location: "Bengaluru, India",
    videos: 2,
    image: "/speakers.png",
  },
];
