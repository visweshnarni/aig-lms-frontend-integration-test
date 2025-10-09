"use client";

import Image from "next/image";
import { useState } from "react";
import { profileData } from "@/app/data/profile";

export default function ProfileComponent() {
  const [form, setForm] = useState(profileData);
  const [photo] = useState(form.photo);

  // Handle input updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#eef6ff] p-10 rounded-2xl shadow-md max-w-6xl mx-auto mt-10">
      {/* Profile Photo Section */}
      <div className="flex items-center gap-8 mb-8">
        <Image
          src={photo}
          alt="Profile Photo"
          width={100}
          height={100}
          className="rounded-full object-cover border-2 border-orange-400"
        />
        <div>
          <label className="text-orange-500 font-semibold cursor-pointer hover:underline">
            Select Photo
            <input type="file" accept="image/*" className="hidden" />
          </label>
          <p className="text-sm text-black mt-1">
            File size: Up to 5MB<br />
            Supported file types: JPG, JPEG, PNG, GIF, WEBP
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Prefix</label>
          <input
            type="text"
            name="prefix"
            value={form.prefix}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Designation</label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Affiliation/College/Hospital</label>
          <input
            type="text"
            name="affiliation"
            value={form.affiliation}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mobile No.</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          >
            <option>-Select-</option>
            <option>India</option>
            <option>USA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          >
            <option>-Select-</option>
            <option>Telangana</option>
            <option>Maharashtra</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          >
            <option>-Select-</option>
            <option>Hyderabad</option>
            <option>Mumbai</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border rounded-md p-3 mt-1 bg-white"
          />
        </div>
      </div>

      <div className="flex justify-start mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          Update
        </button>
      </div>
    </div>
  );
}
