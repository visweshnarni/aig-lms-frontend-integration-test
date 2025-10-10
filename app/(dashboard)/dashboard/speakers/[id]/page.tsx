"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { speakers } from "@/app/data/speakers";

export default function SpeakerDetailsPage() {
  const { id } = useParams();
  const speaker = speakers.find((sp) => sp.id.toString() === id);

  if (!speaker) {
    return <div className="p-6 text-gray-600">Speaker not found.</div>;
  }

  return (
    <div className="max-w-5xl px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-[#FF6600] font-medium">
        <Link href="/events" className="hover:underline text-black">
          Events
        </Link>{" "}
        › <span>{speaker.videoList[0]?.event || "Event"}</span>
      </div>

      {/* Speaker Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={speaker.image}
            alt={speaker.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#FF6600]">{speaker.name}</h1>
          <p className="text-black flex items-center font-semibold gap-2 mt-1">
            <CalendarDays className="w-4 h-4" />
            <span>{speaker.institute}</span>
          </p>
          <p className="text-black font-semibold flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-black" />
            <span>{speaker.location}</span>
          </p>
          <div className="flex items-center gap-2 mt-1 font-semibold text-sm text-black">
            <Video className="w-4 h-4" /> {speaker.videos} videos
          </div>
        </div>
      </div>

      {/* Videos Section */}
      <div>
        <h2 className="text-lg font-semibold text-blue-500 mb-2">Videos</h2>
        <p className="text-black mb-4">
          {speaker.videos} Videos • 50 mins total length
        </p>

        <div className="space-y-4">
          {speaker.videoList.map((video, index) => (
            <div
              key={video.id}
              className="flex flex-col sm:flex-row items-start sm:items-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              {/* Index */}
              <div className="text-l  text-black mr-4 w-8 flex-shrink-0">
                {index + 1}
              </div>

              {/* Video Thumbnail */}
              <div className="w-32 h-20 bg-black text-white flex items-center justify-center rounded-md mr-4 flex-shrink-0">
                <Video className="w-6 h-6" />
              </div>

              {/* Title and Event */}
              <div className="flex-1">
                <p className="text-black">{video.title}</p>
                <p className="text-[#FF6600] mt-1 text-sm">{video.event}</p>
              </div>

              {/* Duration & Button */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-3 sm:mt-0 gap-4">
                <span className="text-black text-sm">Video – {video.duration}</span>
                <Button className="bg-[#FF6600] hover:bg-[#e65c00] text-white px-5 py-2 rounded-md">
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
