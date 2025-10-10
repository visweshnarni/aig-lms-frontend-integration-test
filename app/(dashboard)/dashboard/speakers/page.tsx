import SpeakersList from "@/app/components/dashboard/Speakers/SpeakersList";
import { speakers } from "@/app/data/speakers";
import { videos } from "@/app/data/videos";

export default function SpeakersPage() {
  // Calculate video counts for each speaker
  const speakersWithVideoCounts = speakers.map(speaker => {
    const videoCount = videos.filter(video => video.speaker === speaker.name).length;
    return { ...speaker, videos: videoCount };
  });

  return (
    <div >
      <SpeakersList entries={speakersWithVideoCounts} />
    </div>
  );
}