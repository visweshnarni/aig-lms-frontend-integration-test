"use client"; // <-- Make it a Client Component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SpeakerDetails from "@/app/components/dashboard/Speakers/SpeakerDetails";
import { speakers, Speaker } from "@/app/data/speakers";
import { videos, Video } from "@/app/data/videos";
import { events } from "@/app/data/events";

// Define the enriched video type again for client-side use
interface EnrichedVideo extends Video {
  eventTitle: string;
  eventPrice: number;
}

export default function SpeakerDetailsPage() {
  const params = useParams(); // Use the hook to get params
  const id = params.id as string;

  // Use state to hold the data
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [speakerVideos, setSpeakerVideos] = useState<EnrichedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundSpeaker = speakers.find(sp => sp.id.toString() === id);
      
      if (foundSpeaker) {
        setSpeaker(foundSpeaker);
        
        const foundVideos = videos
          .filter(video => video.speaker === foundSpeaker.name)
          .map(video => {
            const event = events.find(e => e.id === video.eventId);
            return { 
              ...video, 
              eventTitle: event?.title || 'Unknown Event', 
              eventPrice: event?.price ?? 0 
            };
          });
        setSpeakerVideos(foundVideos);
      }
      setLoading(false);
    }
  }, [id]); // Re-run when the id changes

  if (loading) {
    return <div className="p-8 text-center">Loading speaker details...</div>;
  }

  if (!speaker) {
    return <div className="p-8 text-center text-gray-600">Speaker not found.</div>;
  }
  
  return (
    <div >
      <SpeakerDetails 
        speaker={speaker} 
        videos={speakerVideos}
      />
    </div>
  );
}