"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext"; // <-- IMPORT THE HOOK
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// Helper to get a valid image URL or a fallback
const getImageUrl = (path: string | null | undefined): string => {
    if (path) {
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL || ""}${path}`;
    }
    return '/profile.jpeg'; // Fallback if no photo is set
};

export default function DashboardHeader() {
  const router = useRouter();
  const { user, loading } = useUser(); // <-- GET USER DATA FROM CONTEXT

  const handleLogout = () => {
      localStorage.removeItem("authToken"); // Clear the token on logout
      router.push("/login"); // Redirect to login page
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B5D9FF] to-[#D6E7FF] shadow-md flex items-center justify-between px-8 z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/dashboard/events")}>
        <Image
          src="/urological.png"
          alt="Urological Society of India"
          width={190}
          height={190}
          className="object-contain"
        />
      </div>

      {/* Right Section: Profile + Logout */}
      <div className="flex items-center gap-6">
        {/* Profile Icon */}
        <button
          onClick={() => router.push("/dashboard/myprofile")}
          className="focus:outline-none"
        >
          {loading ? (
            // Show a skeleton while the user data is loading
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
          ) : (
            // Display the user's profile photo once loaded
            <img
              src={getImageUrl(user?.profilePhoto)}
              alt="Profile"
              width={45}
              height={45}
              className="rounded-full object-cover border-2 border-white shadow-sm hover:opacity-90 transition w-[45px] h-[45px]"
              onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
            />
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
