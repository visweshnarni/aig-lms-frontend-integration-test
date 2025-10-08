import DashboardHeader from "@/app/components/common/DashboardHeader";
import Sidebar from "@/app/components/common/Sidebar";
import Footor from "@/app/components/common/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex font-poppins">
      <Sidebar />
      <Footor />
      <div className="flex-1 ml-64">
        <DashboardHeader />
        <main className="mt-20 p-6 min-h-[calc(100vh-5rem)] bg-[#FAFAFA]">
          {children}
        </main>
      </div>
    </div>
  );
}
