import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdmin() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    const { data: profile } = await supabase.from("profiles").select("id, full_name, role").eq("id", user.id).single();
    if (!profile || !["admin", "direction", "personnel", "garde", "chef_projet", "externe", "editor"].includes(profile.role)) return null;
    return { user, profile, supabase };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
