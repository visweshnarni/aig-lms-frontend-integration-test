"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

type FormData = {
  prefix: string;
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000';


export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    prefix: "",
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
  });

  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let filteredValue = value;

    if (id === "fullName") {
      filteredValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (id === "mobile") {
      filteredValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    } else if (id === "prefix") {
      filteredValue = value.replace(/[^A-Za-z]/g, "");
    }

    setForm((prev) => ({ ...prev, [id]: filteredValue }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.prefix.trim()) newErrors.prefix = "Prefix is required.";
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (!/^[A-Za-z\s]{2,}$/.test(form.fullName))
      newErrors.fullName = "Enter a valid name.";

    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email))
      newErrors.email = "Invalid email format.";

    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";

    if (!form.country.trim()) newErrors.country = "Country is required.";

    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,64}$/.test(form.password)
    )
      newErrors.password =
        "Must include uppercase, lowercase, number & special character.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  if (!agree) {
    alert("Please accept Terms & Conditions before signing up.");
    return;
  }

  setErrors({});
  
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/auth/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(form),
});


    const data = await response.json();

    if (response.ok) {
      // Store token and user data in localStorage or context
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert("Signup successful!");
      router.push("/login");
    } else {
      // Handle error responses
      if (response.status === 400) {
        alert(`Validation error: ${data.error}`);
      } else if (response.status === 409) {
        alert(`Signup failed: ${data.error}`);
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert("Network error. Please check your connection and try again.");
  }
};


  return (
    <div className="flex flex-col md:flex-row w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
      {/* Left: Signup Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-[#f0faff] flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4 px-2 font-poppins"
        >
          <h1 className="text-2xl font-bold text-[#0d47a1] mb-6">Sign Up</h1>

          {/* Prefix */}
          <div>
            <label htmlFor="prefix" className="mb-1 text-black">
              Prefix <span className="text-red-500">*</span>
            </label>
            <Input
              id="prefix"
              placeholder="Eg: Dr, Mr, Ms"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.prefix}
              onChange={handleChange}
            />
            {errors.prefix && (
              <p className="text-sm text-red-600 mt-1">{errors.prefix}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="mb-1 text-black">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 text-black">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="mb-1 text-black">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="mobile"
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <p className="text-sm text-red-600 mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="mb-1 text-black">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={form.country}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-72 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white text-gray-600"
            >
              <option value="">-select-</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Brazil">Brazil</option>
            </select>
            {errors.country && (
              <p className="text-sm text-red-600 mt-1">{errors.country}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 text-black">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div>
            <label className="block text-label mb-2">reCAPTCHA</label>
            <ReCAPTCHA
              sitekey="your_site_key_here"
              onChange={(val) => console.log("captcha", val)}
            />
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1"
            />
            <label
              htmlFor="agree"
              className="text-paragraph font-normal leading-snug text-sm"
            >
              I agree to all{" "}
              <span className="text-orange-500 hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full font-medium bg-orange-500 hover:bg-[#0d47a1] text-white mt-4"
          >
            Sign Up
          </Button>

          {/* Switch to Login */}
          <div className="text-left mt-2 text-paragraph font-medium">
            Already have an account?
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-500 font-semibold hover:underline ml-1"
            >
              Login now
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-4 bg-white">
        <Image
          src="/signup.png"
          alt="Urological Society of India"
          width={400}
          height={400}
          className="object-cover rounded-r-2xl"
        />
      </div>
    </div>
  );
}
