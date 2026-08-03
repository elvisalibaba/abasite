"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/app/admin/actions";

const clean=(data:FormData,key:string)=>String(data.get(key)||"").trim();

export async function visitorLoginAction(_previous:ActionResult,data:FormData):Promise<ActionResult>{
  const supabase=await createSupabaseServerClient();
  const {error}=await supabase.auth.signInWithPassword({email:clean(data,"email"),password:clean(data,"password")});
  if(error)return {ok:false,message:"E-mail ou mot de passe incorrect."};
  redirect("/espace");
}

export async function submitProjectAction(data:FormData):Promise<ActionResult>{
  const supabase=await createSupabaseServerClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return {ok:false,message:"Reconnectez-vous pour envoyer votre demande."};
  const record={visitor_id:user.id,organization:clean(data,"organization"),contact_name:clean(data,"contact_name"),phone:clean(data,"phone"),title:clean(data,"title"),project_type:clean(data,"project_type"),description:clean(data,"description"),budget_range:clean(data,"budget_range"),desired_date:clean(data,"desired_date")||null};
  if(!record.organization||!record.contact_name||!record.title||!record.description)return {ok:false,message:"Complétez les champs obligatoires."};
  const {error}=await supabase.from("project_submissions").insert(record);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/espace"); return {ok:true,message:"Votre projet a été transmis à ABA."};
}

export async function visitorLogoutAction(){const supabase=await createSupabaseServerClient();await supabase.auth.signOut();redirect("/")}
