"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  onRegister: () => void; // add this for registration flow
}

export default function RegisterModal({
  isOpen,
  onClose,
  eventTitle,
  onRegister,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!name || !email || !captchaValue) {
    //   alert("Please fill all fields and complete reCAPTCHA");
    //   return;
    if (!name || !email) { // only check for name and email during local dev
    alert("Please fill all fields.");
    return;
    }
    onRegister(); // trigger registration
    alert(`Registered successfully for ${eventTitle}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] sm:w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-[#0d47a1] mb-1">
          Register for FREE
        </h2>
        <p className="text-sm text-[#0d47a1] font-semibold mb-4">{eventTitle}</p>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">
              Full Name (as on certificate)*
            </label>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email ID*</label>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md w-full px-3 py-2 focus:ring-2 focus:ring-[#FF6600] focus:outline-none"
            />
          </div>

          <div className="my-2">
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY_HERE" // replace with your actual site key
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          <Button
            type="submit"
            className="bg-[#00A651] hover:bg-green-700 text-white w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
