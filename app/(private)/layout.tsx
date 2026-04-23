import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { requireSession } from "@/lib/auth";

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen">
        <Header />
        <div className="p-6 space-y-4">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </div>
  );
}
