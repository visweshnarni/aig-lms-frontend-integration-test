import ProfileComponent from "@/app/components/dashboard/myprofile/profile";

export default function MyProfilePage() {
  return (
    <div className="p-8 bg-[#f9fbff] min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>
      <ProfileComponent />
    </div>
  );
}
