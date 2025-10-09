import ProfileComponent from "@/app/components/dashboard/myprofile/profile";

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      <ProfileComponent />
    </div>
  );
}
