"use client";
import { useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

// Mock comment data for display
const mockComments = [
  {
    author: "Dr Shreya Iyer",
    avatar: "/doctor.png", // Add a sample image to /public
    time: "2 hours ago",
    text: "Lorem ipsum dolor sit amet consectetur. Eu dignissim ac tristique.",
  },
  {
    author: "Dr. Ankit Sharma",
    avatar: "/profile.jpeg", // Add a sample image to /public
    time: "3 hours ago",
    text: "Excellent presentation, very insightful points on robotic suturing.",
  },
  {
    author: "Dr. Priya Desai",
    avatar: "/doctor.png",
    time: "5 hours ago",
    text: "Could the speaker elaborate on the long-term patient outcomes?",
  },
];


export default function CommentsSection() {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log("Submitting comment:", newComment);
      // Here you would typically call an API to save the comment
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{mockComments.length} Comments</h3>
      
      {/* Add Comment Input */}
      <form onSubmit={handleCommentSubmit} className="flex items-start gap-4 mb-8">
        <Image
          src="/profile.jpeg" // A profile image for the current user
          alt="Your Avatar"
          width={40}
          height={40}
          className="rounded-full mt-1"
        />
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border-b-2 border-gray-200 w-full p-2 focus:outline-none focus:border-[#FF6600] transition-colors"
        />
      </form>

      {/* Comment List */}
      <div className="space-y-6">
        {mockComments.map((comment, index) => (
          <div key={index} className="flex items-start gap-4">
            <Image
              src={comment.avatar}
              alt={comment.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                <p className="text-xs text-gray-500">{comment.time}</p>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{comment.text}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-700">
                <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}