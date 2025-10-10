"use client";
import { useParams } from "next/navigation";
import { videos } from "@/app/data/videos";
import { events } from "@/app/data/events";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import RegisterModal from "@/app/components/dashboard/Events/RegisterModal";
import { MoreVertical, Play } from "lucide-react";

// Local registration state
function useRegisteredEvents() {
  const [registered, setRegistered] = useState<string[]>([]);
  const register = (id: string) => setRegistered((rs) => [...rs, id]);
  const isRegistered = (id: string) => registered.includes(id);
  return { isRegistered, register };
}

// Convert raw URL to embed URL
function getEmbedUrl(url: string | undefined) {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("vimeo.com/")) {
    const videoId = url.split("vimeo.com/")[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

export default function VideoPlayerPage() {
  const { id, videoID } = useParams() as { id: string; videoID: string };
  const { register } = useRegisteredEvents();
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const event = events.find((e) => e.id === id);
  const video = videos.find(
    (v) => String(v.id) === String(videoID) && v.eventId === id
  );

  if (!video) {
    return <div className="p-8 text-center text-gray-600">Video not found</div>;
  }

  const embedUrl = getEmbedUrl(video.videoUrl);
  const sessionVideos = videos.filter(
    (v) => v.eventId === id && v.session === video.session
  );

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-8">
      {/* Main Video Section */}
      <div className="flex-1">
        <div className="w-full h-[450px] bg-black rounded-lg overflow-hidden mb-4">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>

        <h2 className="mt-4 text-2xl text-black">{video.title}</h2>
        <p className="text-black">
          Speaker –{" "}
          <span className="text-[#FF6600]">{video.speaker}</span>
        </p>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-lg mb-4">20 Comments</h3>

          {/* Add comment input */}
          <div className="flex items-start gap-3 mb-6">
            <Image
              src="/profile.jpeg"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-b border-gray-300 w-full p-2 focus:outline-none focus:border-[#FF6600]"
            />
          </div>

          {/* Comment List */}
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex gap-3 mb-5">
              <Image
                src="/comment.png"
                alt="Dr"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "auto" }}
                className="rounded-full object-contain w-10 h-10"
              />

              <div className="flex-1">
                {/* Speaker name + time + 3-dot menu */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-[#FF6600]">Dr Shreya Iyer</p>
                    <p className="text-black">2 hours ago</p>
                  </div>
                  <MoreVertical className="w-5 h-5 text-black cursor-pointer hover:text-gray-700" />
                </div>

                <p className="text-black mt-1">
                  Lorem ipsum dolor sit amet consectetur. Eu dignissim ac tristique.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar – Next in Queue */}
      <div className="w-full lg:w-96">
        <h3 className="text-2xl mb-4 text-black">Next in Queue</h3>

        {/* Scrollable Section */}
        <div className="max-h-[550px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#FF6600] scrollbar-track-gray-200 hover:scrollbar-thumb-[#e65c00] rounded-lg">
          {sessionVideos
            .filter((v) => String(v.id) !== String(videoID))
            .map((v) => (
              <Link
                key={v.id}
                href={`/dashboard/events/${id}/video/${v.id}`}
                className="flex items-start gap-4 mb-5 group"
              >
                {/* Video Thumbnail */}
                <div className="w-40 h-24 bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                  {v.thumbnail ? (
                    <Image
                      src={v.thumbnail}
                      alt={v.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(v.videoUrl)}
                      title={v.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}

                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <p className="text-base text-black leading-snug line-clamp-2">
                    {v.title}
                  </p>
                  <p className="mt-1 text-black">
                    Speaker –{" "}
                    <span className="text-[#FF6600]">{v.speaker}</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>

        {/* Sponsor */}
        <div className="mt-6 border rounded-lg p-4 text-center shadow-sm">
          <p className="text-xs text-gray-500 mb-2">EDUCATIONAL GRANT BY</p>
          <Image
            src="/sun_pharma.png"
            alt="Sun Pharma"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Register Modal */}
      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        eventTitle={event?.title ?? ""}
        onRegister={() => {
          register(id);
          setShowModal(false);
        }}
      />
    </div>
  );
}
