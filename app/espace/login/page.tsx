import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import VisitorLogin from "@/components/auth/VisitorLogin";
export const metadata={title:"Connexion espace projet"};
export default async function Page(){const supabase=await createSupabaseServerClient();const {data:{user}}=await supabase.auth.getUser();if(user)redirect("/espace");return <section className="visitor-page"><VisitorLogin/></section>}
