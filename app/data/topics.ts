// app/data/topics.ts

export interface Topic {
  _id: string; // Corresponds to topic._id
  session_id: string; // Corresponds to session._id (or can be a unique session name for grouping)
  topic: string; // Corresponds to topic.topic (the video title)
  speaker_id: string; // Mock speaker ID, could be used to fetch speaker details
  speakerName: string; // Added for frontend display
  video_link: string; // The URL of the video
  thumbnail: string; // The direct URL for the video thumbnail
  video_duration: string; // "HH:MM:SS" format
  event_id: string; // To link topics to events
}

// Mock topic data for different events
export const topics: Topic[] = [
  // Topics for LMS Testing Conference 2026 (id: "68e6aabb09f1972e8fa21524")
  {
    _id: "topic1_conf2026",
    session_id: "session1_conf2026",
    topic: "Opening Keynote: Future of LMS Platforms",
    speaker_id: "speaker1_id",
    speakerName: "Dr. Elena Rodriguez",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg", // Example thumbnail
    video_duration: "00:15:30",
    event_id: "68e6aabb09f1972e8fa21524",
  },
  {
    _id: "topic2_conf2026",
    session_id: "session1_conf2026",
    topic: "Building Scalable Microservices for Education",
    speaker_id: "speaker2_id",
    speakerName: "Prof. David Chen",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://i.ytimg.com/vi/2N70E0r6k58/hqdefault.jpg",
    video_duration: "00:20:00",
    event_id: "68e6aabb09f1972e8fa21524",
  },
  {
    _id: "topic3_conf2026",
    session_id: "session2_conf2026",
    topic: "AI-Powered Learning Analytics",
    speaker_id: "speaker3_id",
    speakerName: "Dr. Sophia Lee",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail: "https://i.ytimg.com/vi/WbB3_C71RzE/hqdefault.jpg",
    video_duration: "00:26:30",
    event_id: "68e6aabb09f1972e8fa21524",
  },
  // Topics for Annual Cardiology Summit 2025 (id: "669b32e01f114e9123456785")
  {
    _id: "topic1_cardio2025",
    session_id: "session1_cardio2025",
    topic: "Advances in Interventional Cardiology",
    speaker_id: "speaker4_id",
    speakerName: "Dr. Arjun Sharma",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnail: "https://i.ytimg.com/vi/sW9_f6X4rW4/hqdefault.jpg",
    video_duration: "00:30:00",
    event_id: "669b32e01f114e9123456785",
  },
  {
    _id: "topic2_cardio2025",
    session_id: "session1_cardio2025",
    topic: "Heart Failure Management: New Guidelines",
    speaker_id: "speaker5_id",
    speakerName: "Dr. Priya Singh",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnail: "https://i.ytimg.com/vi/RgaGvjC7b2A/hqdefault.jpg",
    video_duration: "00:25:00",
    event_id: "669b32e01f114e9123456785",
  },
  // Topics for URO-Complicon 2025 (id: "uro-complicon-2025-id")
  {
    _id: "topic1_uro2025",
    session_id: "session1_uro2025",
    topic: "Minimally Invasive Techniques in Urology",
    speaker_id: "speaker1_id",
    speakerName: "Dr. R.V. Sudarshan",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnail: "https://i.ytimg.com/vi/g-m6p1Y3M70/hqdefault.jpg",
    video_duration: "00:10:00",
    event_id: "uro-complicon-2025-id",
  },
  {
    _id: "topic2_uro2025",
    session_id: "session1_uro2025",
    topic: "Complications in Advanced Laparoscopy",
    speaker_id: "speaker1_id",
    speakerName: "Dr. R.V. Sudarshan",
    video_link: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail: "https://i.ytimg.com/vi/YE7VzlLtp-4/hqdefault.jpg",
    video_duration: "00:18:00",
    event_id: "uro-complicon-2025-id",
  },
];
