import ProfileComponent from "@/app/components/dashboard/myprofile/ProfileComponent";
import { profileData } from "@/app/data/profile";

export default function MyProfilePage() {
  return (
    <div >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h1>
      <ProfileComponent initialData={profileData} />
    </div>
  );
}