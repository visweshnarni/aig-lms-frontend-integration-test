// app/(auth)/layout.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/app/components/auth/commonheader";
import Footer from "@/app/components/auth/navbar";

export const metadata: Metadata = {
  description: "Login or Signup to Urological Society of India",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-[#d0ebff] to-[#a9d6fb]">
      <div className="flex w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] overflow-y-auto">
          {children}
        </div>

        {/* Right: Image */}
        <div className="hidden md:block w-1/2 relative">
          <Image
            src="/images/login.png"
            alt="Urological Society of India"
            fill
            className="object-cover rounded-r-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
