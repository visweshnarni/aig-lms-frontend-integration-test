"use client";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  onRegister: (name: string, email: string) => Promise<void>;
}

export default function RegisterModal({
  isOpen,
  onClose,
  eventTitle,
  onRegister,
}: RegisterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State is present but not used for validation yet
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setName("");
    setEmail("");
    setError(null);
    setCaptchaValue(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Logic still only checks for name and email
    if (!name || !email) {
      setError("Please fill in all required fields.");
      return;
    }

    // The captchaValue is set but not validated here yet.
    // You would add `!captchaValue` to the condition above when ready.

    setIsSubmitting(true);
    try {
      await onRegister(name, email);
      toast.success(`Registered successfully for ${eventTitle}!`);
      handleClose(); 
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
      toast.error(err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[90%] sm:w-[400px] shadow-lg relative">
        <button
          onClick={handleClose}
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
              required
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
              required
            />
          </div>
          
          {/* --- ReCAPTCHA PLACEHOLDER --- */}
          <div className="my-2">
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY_HERE" // Replace with your actual site key from Google
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            className="bg-[#00A651] hover:bg-green-700 text-white w-full flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}