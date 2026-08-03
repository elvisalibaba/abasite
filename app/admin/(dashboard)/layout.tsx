import { requireAdmin } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await requireAdmin();
  return <AdminShell name={profile.full_name || user.email || "Administrateur"} email={user.email || ""} role={profile.role}>{children}</AdminShell>;
}
