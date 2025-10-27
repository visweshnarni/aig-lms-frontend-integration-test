import { ResetPasswordForm } from "@/app/components/auth/ResetPasswordForm";

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Pass the token from the URL to the form component */}
      <ResetPasswordForm token={params.token} />
    </div>
  );
}