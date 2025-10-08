"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B5D9FF] to-[#D6E7FF] shadow-md flex items-center justify-between px-8 z-50">
      {/* Left Section: Logo + Text */}
      <div className="flex items-center gap-3">
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
        <Image
          src="/profile.jpeg"
          alt="Profile"
          width={45}
          height={45}
          className="rounded-full object-cover border-2  shadow-sm"
        />
        <button
          onClick={() => router.push("/logout")}
          className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
