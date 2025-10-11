"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

type LoginData = {
  email: string;
  password: string;
};
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000/api';
console.log("Backend Base URL:", BACKEND_BASE_URL);

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("Email and password are required.");
    return;
  }

  setError(null);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // Log the token to console to verify it
    // console.log("JWT Token:", data.token);

    // Save token to localStorage (or cookies if preferred)
    localStorage.setItem("token", data.token);

    alert("Login successful!");
    router.push("/dashboard"); // redirect to homepage or dashboard as needed
  } catch (error) {
    setError("Something went wrong. Please try again.");
    console.error("Login error:", error);
  }
};


  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">
            Login
          </h1>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 test-black">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="text-placeholder w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 test-black"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="text-placeholder w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-left text-sm mt-1">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-orange-500 hover:underline font-medium cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* ReCAPTCHA */}
          <div>
            <label className="block text-label font-normal mb-2">
              reCAPTCHA
            </label>
            <ReCAPTCHA
              sitekey="your_site_key_here"
              onChange={(val) => console.log("captcha", val)}
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-button font-medium bg-orange-500 hover:bg-[#0d47a1] text-white mt-10"
          >
            Login
          </Button>

          {/* Route Switch */}
          <div className="text-left mt-2 text-paragraph font-medium">
            Don’t have an account?
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-orange-500 ml-1 hover:underline font-semibold cursor-pointer"
            >
              Signup now
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-4 bg-white">
      <Image
  src="/images/login.png"
  alt="Urological Society of India"
  width={300}
  height={300}
  className="object-cover rounded-r-2xl"
/>

      </div>
    </div>
  );
}