"use client";

import Image from "next/image";
import Link from "next/link";
import { Building, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoThumbnail from "../Events/VideoThumbnail";
import type { Speaker } from "@/app/data/speakers";
import type { Video as VideoType } from "@/app/data/videos";
import { registeredEvents } from "@/app/data/registeredevents";

// Mock hook for registration status
function useRegisteredEventsMock() {
  const registeredIds = new Set(registeredEvents.map(e => e.id));
  return { isRegistered: (eventId: string) => registeredIds.has(eventId) };
}

interface EnrichedVideo extends VideoType {
  eventTitle: string;
  eventPrice: number;
}
interface Props {
  speaker: Speaker;
  videos: EnrichedVideo[];
}

export default function SpeakerDetails({ speaker, videos }: Props) {
  const { isRegistered } = useRegisteredEventsMock();

  const totalDurationMinutes = videos.reduce((sum, v) => {
    const parts = v.duration.split(":");
    return sum + parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }, 0);

  // 👇 The classes causing the centered layout have been removed from this div
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 font-medium">
        <Link href="/dashboard/speakers" className="hover:underline">Speakers</Link>
        <span className="mx-2">{'>'}</span>
        <span className="text-orange-600">{speaker.name}</span>
      </div>

      {/* Speaker Header */}
      <div className="flex items-center gap-6 border-b border-gray-200 pb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image src={speaker.image} alt={speaker.name} width={96} height={96} className="object-cover w-full h-full" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-orange-600">{speaker.name}</h1>
          <p className="text-gray-700 flex items-center gap-2 mt-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span className="font-semibold">{speaker.institute}</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-semibold">{speaker.location}</span>
          </p>
          <div className="flex items-center gap-2 mt-1 font-semibold text-sm text-gray-600">
            <Video className="w-4 h-4" /> {videos.length} videos
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <h2 className="text-xl font-semibold text-blue-900 mb-1">Videos</h2>
        <p className="text-gray-600 mb-6">
          {videos.length} Videos • {Math.floor(totalDurationMinutes / 60)} mins total length
        </p>
        <div className="space-y-4">
          {videos.map((video, index) => {
            const isEventRegistered = isRegistered(video.eventId);
            return (
              <div
                key={video.id}
                className="flex flex-col sm:flex-row items-start gap-4 border-b border-gray-200 pb-4 last:border-b-0"
              >
                <span className="text-gray-500 font-medium w-8 text-center pt-2">{index + 1}</span>
                <div className="w-40 h-24 relative rounded-md overflow-hidden shrink-0 bg-black">
                  <VideoThumbnail videoUrl={video.videoUrl} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 leading-snug">{video.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Event - <Link href={`/dashboard/events/${video.eventId}`} className="font-semibold text-orange-600 hover:underline">{video.eventTitle}</Link>
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-sm text-gray-500 font-mono whitespace-nowrap">Video - {video.duration}</span>
                  {isEventRegistered ? (
                    <Link href={`/dashboard/registeredevents/${video.eventId}/video/${video.id}`}>
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">Watch Now</Button>
                    </Link>
                  ) : (
                    <Link href={`/dashboard/events/${video.eventId}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5">
                        {video.eventPrice === 0 ? 'Register Now' : 'Buy Now'}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}