import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/admin-auth";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata = { title: "Connexion administration" };

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect("/admin");
  return <AdminLogin />;
}
