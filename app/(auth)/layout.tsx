import type { Metadata } from "next";
import Header from "@/app/components/auth/commonheader";
import Footer from "@/app/components/auth/footer"; 

export const metadata: Metadata = {
  description: "Login or Signup to Urological Society of India",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#d0ebff] to-[#a9d6fb]">
      {/* Header */}
      <div className="w-full bg-white shadow-md z-10">
        <Header />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="flex w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left: Form */}
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
