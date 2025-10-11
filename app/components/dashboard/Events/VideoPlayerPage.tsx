// "use client";

// import { useParams } from "next/navigation";
// import { videos } from "@/app/data/videos";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// export default function VideoPlayerPage() {
//   const params = useParams();
//   // Existing code to safely get the string ID
// const idString =
//   typeof params.id === "string"
//     ? params.id
//     : Array.isArray(params.id)
//     ? params.id[0]
//     : "";

// // *** NEW: Convert the string ID to a number ***
// const id = parseInt(idString, 10); 
// // parseInt will return a number, or NaN if the conversion fails.
// // If your v.id is a number, this is the best approach.
//   const video = videos.find((v) => v.id === id);
//   const [comment, setComment] = useState("");

//   if (!video) return <div className="p-8 text-center">Video not found</div>;

//   return (
//     <div className="p-6 flex flex-col lg:flex-row gap-8">
//       {/* 🎬 Main Video Section */}
//       <div className="flex-1">
//         <div className="w-full h-[450px] bg-black rounded-lg overflow-hidden">
//           <video
//             src={video.videoUrl}
//             controls
//             poster={video.thumbnail}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* 🧾 Video Info */}
//         <h2 className="mt-4 text-2xl font-semibold text-gray-800">
//           {video.title}
//         </h2>
//         <p className="text-gray-600">
//           Speaker –{" "}
//           <span className="text-[#FF6600] font-semibold">{video.speaker}</span>
//         </p>

//         {/* 💬 Comments Section */}
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-4">20 Comments</h3>

//           {/* Add Comment */}
//           <div className="flex items-start gap-3 mb-6">
//             <Image
//               src="/user-avatar.png"
//               alt="User"
//               width={40}
//               height={40}
//               className="rounded-full"
//             />
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Add a comment"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="border-b border-gray-300 w-full p-2 focus:outline-none focus:border-[#FF6600]"
//               />
//             </div>
//           </div>

//           {/* Example Comments */}
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="flex gap-3 mb-5">
//               <Image
//                 src="/avatar-female.png"
//                 alt="Dr Shreya Iyer"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//               <div>
//                 <p className="font-semibold text-[#FF6600]">Dr Shreya Iyer</p>
//                 <p className="text-sm text-gray-500">2 hours ago</p>
//                 <p className="text-gray-800 mt-1">
//                   Lorem ipsum dolor sit amet consectetur. Eu dignissim ac
//                   tristique.
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🎞 Sidebar — Next in Queue */}
//       <div className="w-full lg:w-80">
//         <h3 className="font-semibold mb-3 text-[#0d47a1]">Next in Queue</h3>

//         <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
//           {videos
//             .filter((v) => v.id !== id) // ✅ Fixed — id always string
//             .slice(0, 5)
//             .map((v) => (
//               <Link
//                 key={v.id}
//                 href={`/events/uro-complicon/video/${v.id}`}
//                 className="flex gap-3 border-b pb-2 hover:bg-gray-50 transition rounded-md"
//               >
//                 <div className="w-24 h-16 bg-gray-200 rounded-md overflow-hidden">
//                   <video
//                     src={v.videoUrl}
//                     className="w-full h-full object-cover"
//                     poster={v.thumbnail}
//                   />
//                 </div>
//                 <div className="text-sm flex-1">
//                   <p className="font-medium text-gray-800 truncate">
//                     {v.title}
//                   </p>
//                   <p className="text-xs text-[#FF6600]">{v.speaker}</p>
//                 </div>
//               </Link>
//             ))}
//         </div>

//         {/* 🎓 Sponsor Card */}
//         <div className="mt-6 border rounded-lg p-4 text-center shadow-sm">
//           <p className="text-xs text-gray-500 mb-2">EDUCATIONAL GRANT BY</p>
//           <Image
//             src="/sun-pharma-logo.png"
//             alt="Sun Pharma"
//             width={80}
//             height={80}
//             className="mx-auto"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
