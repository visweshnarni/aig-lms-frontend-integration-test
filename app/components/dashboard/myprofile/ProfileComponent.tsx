"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProfileData } from "@/app/data/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData: ProfileData;
}

export default function ProfileComponent({ initialData }: Props) {
  const [form, setForm] = useState(initialData);
  const [previewPhoto, setPreviewPhoto] = useState<string>(initialData.photo);

  const handleChange = (name: keyof ProfileData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", form);
    alert("Profile Update functionality not implemented yet. Check console for data.");
  };

  return (
    <div className="bg-[#F6FAFF] p-6 sm:p-8 rounded-xl ">
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Photo</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Image
            src={previewPhoto}
            alt="Profile Photo"
            width={100}
            height={100}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <Label htmlFor="photoUpload" className="text-orange-600 font-semibold cursor-pointer hover:underline text-lg">
              Select Photo
              <Input id="photoUpload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              File size: Up to 5MB<br />
              Supported file types: JPG, JPEG, PNG, GIF, WEBP
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" type="text" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input id="prefix" type="text" value={form.prefix} onChange={(e) => handleChange("prefix", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" type="text" value={form.designation} onChange={(e) => handleChange("designation", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="affiliation">Affiliation/College/Hospital</Label>
            <Input id="affiliation" type="text" value={form.affiliation} onChange={(e) => handleChange("affiliation", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile No.</Label>
            <Input id="mobile" type="tel" value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select onValueChange={(value) => handleChange("country", value)} value={form.country}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select onValueChange={(value) => handleChange("state", value)} value={form.state}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Telangana">Telangana</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select onValueChange={(value) => handleChange("city", value)} value={form.city}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bengaluru">Bengaluru</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" type="text" value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} />
          </div>
        </div>

        <div className="flex justify-start pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2.5 rounded-lg">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}