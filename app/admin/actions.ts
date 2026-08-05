"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type ActionResult = { ok: boolean; message: string };

const clean = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const slugify = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function loginAction(_previous: ActionResult, formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email: clean(formData, "email"), password: clean(formData, "password") });
    if (error) return { ok: false, message: "E-mail ou mot de passe incorrect." };
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id ?? "").single();
    if (!profile || !["admin", "direction", "personnel", "garde", "chef_projet", "externe", "editor"].includes(profile.role)) {
      await supabase.auth.signOut();
      return { ok: false, message: "Ce compte n’a pas accès à l’administration." };
    }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Connexion impossible." };
  }
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveContentAction(formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const record = {
    id: clean(formData, "id") || undefined,
    page: clean(formData, "page"), section: clean(formData, "section"),
    content_key: clean(formData, "content_key"), label: clean(formData, "label"),
    value: clean(formData, "value"), content_type: clean(formData, "content_type") || "text",
    updated_at: new Date().toISOString()
  };
  if (!record.page || !record.section || !record.content_key || !record.label) return { ok: false, message: "Complétez tous les champs obligatoires." };
  const { error } = await supabase.from("content_entries").upsert(record, { onConflict: "page,section,content_key" });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/"); revalidatePath("/admin");
  return { ok: true, message: "Contenu enregistré." };
}

export async function deleteContentAction(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("content_entries").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Contenu supprimé." };
}

export async function saveServiceAction(formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const title = clean(formData, "title");
  const record = {
    id: clean(formData, "id") || undefined, title,
    slug: clean(formData, "slug") || slugify(title), summary: clean(formData, "summary"),
    image_url: clean(formData, "image_url") || null, icon: clean(formData, "icon") || "↗",
    link: clean(formData, "link") || "/contact", position: Number(clean(formData, "position") || 0),
    published: formData.get("published") === "on", updated_at: new Date().toISOString()
  };
  if (!record.title || !record.slug) return { ok: false, message: "Le titre est obligatoire." };
  const { error } = await supabase.from("service_cards").upsert(record);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/"); revalidatePath("/admin");
  return { ok: true, message: "Carte de service enregistrée." };
}

export async function deleteServiceAction(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("service_cards").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/"); revalidatePath("/admin"); return { ok: true, message: "Service supprimé." };
}

export async function uploadMediaAction(formData: FormData): Promise<ActionResult> {
  const { user, supabase } = await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || !file.size) return { ok: false, message: "Sélectionnez une image." };
  if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) return { ok: false, message: "Image invalide ou supérieure à 10 Mo." };
  const safeName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}`;
  const { error: uploadError } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) return { ok: false, message: uploadError.message };
  const { data } = supabase.storage.from("site-media").getPublicUrl(path);
  const { error } = await supabase.from("media_assets").insert({ name: file.name, path, public_url: data.publicUrl, mime_type: file.type, size_bytes: file.size, alt_text: clean(formData, "alt_text"), uploaded_by: user.id });
  if (error) { await supabase.storage.from("site-media").remove([path]); return { ok: false, message: error.message }; }
  revalidatePath("/admin"); return { ok: true, message: "Image ajoutée à la médiathèque." };
}

export async function deleteMediaAction(id: string, path: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error: storageError } = await supabase.storage.from("site-media").remove([path]);
  if (storageError) return { ok: false, message: storageError.message };
  const { error } = await supabase.from("media_assets").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Image supprimée." };
}

export async function uploadDocumentAction(formData:FormData):Promise<ActionResult>{
  const {user,profile,supabase}=await requireAdmin();
  if(!["admin","direction"].includes(profile.role))return {ok:false,message:"Action réservée à l’administration et à la direction."};
  const file=formData.get("file") as File|null;
  const title=clean(formData,"title");
  const allowed=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation"];
  if(!file?.size||!title)return {ok:false,message:"Le titre et le fichier sont obligatoires."};
  if(!allowed.includes(file.type)||file.size>25*1024*1024)return {ok:false,message:"Format non autorisé ou fichier supérieur à 25 Mo."};
  const safeName=file.name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9._-]/g,"-");
  const folder=clean(formData,"folder")||"Général";
  const path=`${slugify(folder)||"general"}/${new Date().getFullYear()}/${crypto.randomUUID()}-${safeName}`;
  const {error:uploadError}=await supabase.storage.from("documents").upload(path,file,{contentType:file.type,upsert:false});
  if(uploadError)return {ok:false,message:uploadError.message};
  const status=clean(formData,"status")||"draft",visibility=clean(formData,"visibility")||"internal";
  const {error}=await supabase.from("document_assets").insert({title,description:clean(formData,"description"),category:clean(formData,"category")||"Institutionnel",folder,version:clean(formData,"version")||"1.0",path,original_name:file.name,mime_type:file.type,size_bytes:file.size,status,visibility,uploaded_by:user.id,published_at:status==="published"?new Date().toISOString():null});
  if(error){await supabase.storage.from("documents").remove([path]);return {ok:false,message:error.message}}
  revalidatePath("/documents");revalidatePath("/admin/documents");
  return {ok:true,message:status==="published"?"Document ajouté et publié.":"Document ajouté à la banque."};
}

export async function updateDocumentStateAction(id:string,status:string,visibility:string):Promise<ActionResult>{
  const {profile,supabase}=await requireAdmin();
  if(!["admin","direction"].includes(profile.role))return {ok:false,message:"Action non autorisée."};
  if(!["draft","published","archived"].includes(status)||!["public","internal"].includes(visibility))return {ok:false,message:"État invalide."};
  const {error}=await supabase.from("document_assets").update({status,visibility,published_at:status==="published"?new Date().toISOString():null,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/documents");revalidatePath("/admin/documents");return {ok:true,message:"Publication mise à jour."};
}

export async function deleteDocumentAction(id:string,path:string):Promise<ActionResult>{
  const {profile,supabase}=await requireAdmin();
  if(!["admin","direction"].includes(profile.role))return {ok:false,message:"Action non autorisée."};
  const {error:storageError}=await supabase.storage.from("documents").remove([path]);
  if(storageError)return {ok:false,message:storageError.message};
  const {error}=await supabase.from("document_assets").delete().eq("id",id);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/documents");revalidatePath("/admin/documents");return {ok:true,message:"Document supprimé."};
}

export async function createUserAction(formData: FormData): Promise<ActionResult> {
  const { profile } = await requireAdmin();
  if (profile.role !== "admin") return { ok: false, message: "Action réservée aux administrateurs." };
  try {
    const admin = createSupabaseAdminClient();
    const role = clean(formData, "role") as "admin" | "direction" | "personnel" | "garde" | "chef_projet" | "externe";
    if(!["admin","direction","personnel","garde","chef_projet","externe"].includes(role))return {ok:false,message:"Rôle invalide."};
    const email=clean(formData,"email").toLowerCase(),fullName=clean(formData,"full_name");
    const whatsappPhone=clean(formData,"whatsapp_phone").replace(/[^0-9+]/g,"");
    if(!email||!fullName||!whatsappPhone)return {ok:false,message:"Nom, e-mail et WhatsApp sont obligatoires."};
    const temporaryPassword=`Aba-${crypto.randomUUID().slice(0,8)}!`;
    const { data, error } = await admin.auth.admin.createUser({ email, password: temporaryPassword, email_confirm: true, user_metadata: { full_name: fullName,whatsapp_phone:whatsappPhone } });
    if (error) return { ok: false, message: error.message };
    const { error: profileError } = await admin.from("profiles").update({ full_name: fullName, role,whatsapp_phone:whatsappPhone,whatsapp_opt_in:true,whatsapp_opt_in_at:new Date().toISOString() }).eq("id", data.user.id);
    if (profileError) return { ok: false, message: profileError.message };
    const loginUrl=`${process.env.NEXT_PUBLIC_SITE_URL||"https://aba.cd"}/admin/login`;
    if(process.env.RESEND_API_KEY){
      const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:`Africa Business Agency <${process.env.ABA_FROM_EMAIL||"contact@aba.cd"}>`,to:[email],subject:"Votre accès sécurisé ABA",text:`Bonjour ${fullName},\n\nUn administrateur ABA vous a créé un accès avec le rôle « ${role} ».\n\nLien de connexion : ${loginUrl}\nAdresse e-mail : ${email}\nMot de passe temporaire : ${temporaryPassword}\n\nConnectez-vous puis conservez vos accès de manière confidentielle.`})});
      if(!response.ok)return {ok:false,message:"Compte créé, mais l’e-mail d’invitation n’a pas pu être envoyé."};
    }
    revalidatePath("/admin");
    return { ok: true, message: process.env.RESEND_API_KEY?"Compte créé et invitation envoyée par e-mail.":`Compte créé. À transmettre : ${loginUrl} — ${email} — ${temporaryPassword}` };
  } catch (error) { return { ok: false, message: error instanceof Error ? error.message : "Création impossible." }; }
}

export async function updateUserRoleAction(id: string, role: string): Promise<ActionResult> {
  const { user, profile } = await requireAdmin();
  if (profile.role !== "admin") return { ok: false, message: "Action réservée aux administrateurs." };
  if (!["admin", "direction", "personnel", "garde", "chef_projet", "externe", "visiteur"].includes(role)) return { ok: false, message: "Rôle invalide." };
  if (user.id === id && role !== "admin") return { ok: false, message: "Vous ne pouvez pas retirer votre propre rôle administrateur." };
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("profiles").update({ role, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Rôle mis à jour." };
}

export async function saveProjectAction(formData: FormData): Promise<ActionResult> {
  const { user, supabase } = await requireAdmin();
  const name = clean(formData, "name");
  if (!name) return { ok: false, message: "Le nom du projet est obligatoire." };
  const { error } = await supabase.from("projects").insert({
    name, description: clean(formData, "description"), status: clean(formData, "status") || "planifie",
    priority: clean(formData, "priority") || "normale", progress: Number(clean(formData, "progress") || 0),
    due_date: clean(formData, "due_date") || null, repository_url: clean(formData, "repository_url") || null,
    owner_id: clean(formData,"owner_id")||user.id, created_by: user.id
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Projet créé." };
}

export async function createProjectMemberAction(formData:FormData):Promise<ActionResult>{
  const {user,profile,supabase}=await requireAdmin();
  const projectId=clean(formData,"project_id"),email=clean(formData,"email").toLowerCase(),fullName=clean(formData,"full_name");
  const whatsappPhone=clean(formData,"whatsapp_phone").replace(/[^0-9+]/g,"");
  if(!projectId||!email||!fullName||!whatsappPhone)return {ok:false,message:"Projet, nom, e-mail et WhatsApp sont obligatoires."};
  if(!["admin","direction","chef_projet"].includes(profile.role))return {ok:false,message:"Seul un responsable de projet peut créer cet accès."};
  if(profile.role==="chef_projet"){
    const {data:project}=await supabase.from("projects").select("id").eq("id",projectId).eq("owner_id",user.id).maybeSingle();
    if(!project)return {ok:false,message:"Vous n’êtes pas responsable de ce projet."};
  }
  const admin=createSupabaseAdminClient();
  const {data:list}=await admin.auth.admin.listUsers({perPage:1000});
  let member=list.users.find(item=>item.email?.toLowerCase()===email);
  const temporaryPassword=clean(formData,"password")||`Aba-${crypto.randomUUID().slice(0,8)}!`;
  if(!member){const created=await admin.auth.admin.createUser({email,password:temporaryPassword,email_confirm:true,user_metadata:{full_name:fullName,whatsapp_phone:whatsappPhone}});if(created.error)return {ok:false,message:created.error.message};member=created.data.user;const {error:profileError}=await admin.from("profiles").update({full_name:fullName,role:"externe",whatsapp_phone:whatsappPhone,whatsapp_opt_in:true,whatsapp_opt_in_at:new Date().toISOString()}).eq("id",member.id);if(profileError)return {ok:false,message:profileError.message}}else{await admin.from("profiles").update({whatsapp_phone:whatsappPhone,whatsapp_opt_in:true,whatsapp_opt_in_at:new Date().toISOString()}).eq("id",member.id)}
  const {error}=await admin.from("project_members").upsert({project_id:projectId,user_id:member.id,project_role:"externe"});
  if(error)return {ok:false,message:error.message};
  const loginUrl=`${process.env.NEXT_PUBLIC_SITE_URL||"https://aba.cd"}/admin/login`;
  if(process.env.RESEND_API_KEY){await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:`Africa Business Agency <${process.env.ABA_FROM_EMAIL||"contact@aba.cd"}>`,to:[email],subject:"Votre accès au projet ABA",text:`Bonjour ${fullName},\n\nUn accès projet ABA vous a été créé.\nConnexion : ${loginUrl}\nE-mail : ${email}\nMot de passe temporaire : ${temporaryPassword}\n\nVeuillez conserver ces informations de manière confidentielle.`})})}
  revalidatePath("/admin/projects");
  return {ok:true,message:process.env.RESEND_API_KEY?"Membre ajouté et accès envoyé par e-mail.":`Membre ajouté. Identifiants à transmettre : ${email} / ${temporaryPassword}`};
}

export async function updateProjectProgressAction(id: string, progress: number): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const value = Math.max(0, Math.min(100, progress));
  const { error } = await supabase.from("projects").update({ progress: value, status: value === 100 ? "termine" : "en_cours", updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Avancement mis à jour." };
}

export async function saveEventAction(formData: FormData): Promise<ActionResult> {
  const { user, supabase } = await requireAdmin();
  const title = clean(formData, "title");
  const startsAt = clean(formData, "starts_at");
  if (!title || !startsAt) return { ok: false, message: "Le titre et la date sont obligatoires." };
  const { error } = await supabase.from("calendar_events").insert({ title, starts_at: startsAt, ends_at: clean(formData, "ends_at") || null, location: clean(formData, "location"), description: clean(formData, "description"), event_type: clean(formData, "event_type") || "reunion", created_by: user.id });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Événement ajouté au calendrier." };
}

export async function saveNoteAction(formData: FormData): Promise<ActionResult> {
  const { user, supabase } = await requireAdmin();
  const title = clean(formData, "title");
  if (!title) return { ok: false, message: "Le titre de la note est obligatoire." };
  const { error } = await supabase.from("staff_notes").insert({ title, body: clean(formData, "body"), visibility: clean(formData, "visibility") || "equipe", author_id: user.id });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Note enregistrée." };
}

export async function savePrintCardAction(formData: FormData): Promise<ActionResult> {
  const { user, profile, supabase } = await requireAdmin();
  if (!["admin", "direction"].includes(profile.role)) return { ok: false, message: "Action réservée à l’administration et à la direction." };
  const holderName = clean(formData, "holder_name");
  if (!holderName || !clean(formData, "service_name")) return { ok: false, message: "Le titulaire et le service sont obligatoires." };
  const { error } = await supabase.from("print_cards").insert({
    card_number: clean(formData, "card_number") || `ABA-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`,
    holder_name: holderName, holder_role: clean(formData, "holder_role"), department: clean(formData, "department"),
    service_name: clean(formData, "service_name"), valid_until: clean(formData, "valid_until") || null,
    photo_url: clean(formData, "photo_url") || null, created_by: user.id
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin"); return { ok: true, message: "Carte prête pour impression." };
}

export async function sendEmailAction(formData: FormData): Promise<ActionResult> {
  const { user, supabase } = await requireAdmin();
  const recipient = clean(formData, "recipient");
  const subject = clean(formData, "subject");
  const body = clean(formData, "body");
  if (!recipient || !subject || !body) return { ok: false, message: "Destinataire, objet et message sont obligatoires." };
  const sender = process.env.ABA_FROM_EMAIL || "contact@aba.cd";
  let status = "queued";
  let externalId: string | null = null;
  let deliveryError = "";
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: `Africa Business Agency <${sender}>`, to: [recipient], subject, text: body }) });
    const result = await response.json().catch(() => ({})) as { id?: string; message?: string };
    status = response.ok ? "sent" : "failed"; externalId = result.id || null; deliveryError = result.message || "";
  }
  const { error } = await supabase.from("mail_messages").insert({ direction: "outbound", sender, recipient, subject, body, status, external_id: externalId, created_by: user.id });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  if (status === "failed") return { ok: false, message: `Échec d’envoi : ${deliveryError}` };
  return { ok: true, message: status === "sent" ? "E-mail envoyé." : "E-mail enregistré. Ajoutez RESEND_API_KEY pour activer l’envoi réel." };
}

export async function updateSubmissionStatusAction(id:string,status:string):Promise<ActionResult>{
  const {supabase}=await requireAdmin();
  if(!["soumis","en_etude","rendez_vous","accepte","refuse"].includes(status))return {ok:false,message:"Statut invalide."};
  const {error}=await supabase.from("project_submissions").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/admin");return {ok:true,message:"Demande mise à jour."};
}

export async function saveTaskAction(formData:FormData):Promise<ActionResult>{
  const {supabase}=await requireAdmin();
  const title=clean(formData,"title");
  const projectId=clean(formData,"project_id");
  if(!title||!projectId)return {ok:false,message:"Projet et tâche obligatoires."};
  const {error}=await supabase.from("project_tasks").insert({project_id:projectId,title,description:clean(formData,"description"),priority:clean(formData,"priority")||"normale",status:"a_faire",due_date:clean(formData,"due_date")||null});
  if(error)return {ok:false,message:error.message};
  revalidatePath("/admin");return {ok:true,message:"Tâche ajoutée au tableau."};
}

export async function updateTaskStatusAction(id:string,status:string):Promise<ActionResult>{
  const {supabase}=await requireAdmin();
  if(!["a_faire","en_cours","termine"].includes(status))return {ok:false,message:"Statut invalide."};
  const {error}=await supabase.from("project_tasks").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/admin");return {ok:true,message:"Tâche déplacée."};
}

export async function deleteOperationalItemAction(kind:"project"|"task"|"event"|"note"|"card",id:string):Promise<ActionResult>{
  const {profile,supabase}=await requireAdmin();
  const tables={project:"projects",task:"project_tasks",event:"calendar_events",note:"staff_notes",card:"print_cards"} as const;
  if(["project","card"].includes(kind)&&!["admin","direction"].includes(profile.role))return {ok:false,message:"Suppression réservée à la direction."};
  const {error}=await supabase.from(tables[kind]).delete().eq("id",id);
  if(error)return {ok:false,message:error.message};
  revalidatePath("/admin");return {ok:true,message:"Élément supprimé."};
}

export async function saveCommentAction(formData:FormData):Promise<ActionResult>{
  const {user,supabase}=await requireAdmin();
  const projectId=clean(formData,"project_id"),body=clean(formData,"body");
  if(!projectId||!body)return {ok:false,message:"Le commentaire est vide."};
  const {error}=await supabase.from("project_comments").insert({project_id:projectId,task_id:clean(formData,"task_id")||null,author_id:user.id,body});
  if(error)return {ok:false,message:error.message};
  await supabase.from("activity_log").insert({actor_id:user.id,entity_type:"project",entity_id:projectId,action:"commentaire_ajoute",details:{excerpt:body.slice(0,120)}});
  revalidatePath("/admin");return {ok:true,message:"Commentaire ajouté."};
}

export async function saveChecklistItemAction(formData:FormData):Promise<ActionResult>{
  const {supabase}=await requireAdmin();const taskId=clean(formData,"task_id"),label=clean(formData,"label");
  if(!taskId||!label)return {ok:false,message:"Libellé obligatoire."};
  const {error}=await supabase.from("task_checklist_items").insert({task_id:taskId,label});
  if(error)return {ok:false,message:error.message};revalidatePath("/admin");return {ok:true,message:"Sous-tâche ajoutée."};
}

export async function toggleChecklistItemAction(id:string,completed:boolean):Promise<ActionResult>{
  const {supabase}=await requireAdmin();const {error}=await supabase.from("task_checklist_items").update({completed}).eq("id",id);
  if(error)return {ok:false,message:error.message};revalidatePath("/admin");return {ok:true,message:"Checklist mise à jour."};
}

export async function createConversationAction(formData:FormData):Promise<ActionResult>{
  const {user,supabase}=await requireAdmin();
  const type=clean(formData,"conversation_type") as "project"|"direct"|"group";
  const projectId=clean(formData,"project_id")||null;const title=clean(formData,"title");
  const memberIds=formData.getAll("member_ids").map(String).filter(Boolean);
  if(!["project","direct","group"].includes(type))return {ok:false,message:"Type de conversation invalide."};
  if(type==="project"&&!projectId)return {ok:false,message:"Sélectionnez un projet."};
  if(type==="direct"&&memberIds.length!==1)return {ok:false,message:"Sélectionnez une personne."};
  if(type==="group"&&(!title||memberIds.length<1))return {ok:false,message:"Nom du groupe et participants obligatoires."};
  if(projectId){const {data:allowed}=await supabase.from("projects").select("id").eq("id",projectId).maybeSingle();if(!allowed)return {ok:false,message:"Accès au projet refusé."}}
  const admin=createSupabaseAdminClient();
  const {data:conversation,error}=await admin.from("conversations").insert({conversation_type:type,title:type==="project"?(title||"Discussion du projet"):title,project_id:projectId,created_by:user.id}).select("id").single();
  if(error)return {ok:false,message:error.message};
  let automaticMembers:string[]=[];
  if(type==="project"&&projectId){const {data:team}=await admin.from("project_members").select("user_id").eq("project_id",projectId);automaticMembers=(team||[]).map(item=>item.user_id)}
  const unique=[...new Set([user.id,...automaticMembers,...memberIds])];
  const {error:memberError}=await admin.from("conversation_members").insert(unique.map(id=>({conversation_id:conversation.id,user_id:id,member_role:id===user.id?"owner":"member"})));
  if(memberError){await admin.from("conversations").delete().eq("id",conversation.id);return {ok:false,message:memberError.message}}
  revalidatePath("/admin/mail");return {ok:true,message:"Conversation créée."};
}

async function sendWhatsAppTemplate(phone:string,variables:string[]){
  const token=process.env.WHATSAPP_ACCESS_TOKEN,phoneId=process.env.WHATSAPP_PHONE_NUMBER_ID,template=process.env.WHATSAPP_NOTIFICATION_TEMPLATE;
  if(!token||!phoneId||!template)return false;
  const version=process.env.WHATSAPP_GRAPH_VERSION||"v23.0";
  const response=await fetch(`https://graph.facebook.com/${version}/${phoneId}/messages`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({messaging_product:"whatsapp",to:phone,type:"template",template:{name:template,language:{code:process.env.WHATSAPP_TEMPLATE_LANGUAGE||"fr"},components:[{type:"body",parameters:variables.map(text=>({type:"text",text}))}]}})});
  return response.ok;
}

async function sendNotificationEmail(recipient:string,conversationTitle:string,preview:string){
  if(!process.env.RESEND_API_KEY)return false;
  const sender=process.env.ABA_FROM_EMAIL||"contact@aba.cd";
  const siteUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://aba.cd";
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:`Africa Business Agency <${sender}>`,to:[recipient],subject:`Nouveau message ABA — ${conversationTitle}`,text:`Vous avez reçu un nouveau message sur la plateforme ABA.\n\nDiscussion : ${conversationTitle}\nAperçu : ${preview}\n\nConsulter la conversation : ${siteUrl}/admin/mail\n\nCe message automatique a été envoyé par ${sender}.`})});
  return response.ok;
}

export async function sendChatMessageAction(formData:FormData):Promise<ActionResult>{
  const {user,supabase}=await requireAdmin();const conversationId=clean(formData,"conversation_id"),body=clean(formData,"body");
  if(!conversationId||!body)return {ok:false,message:"Le message est vide."};
  const {data:conversation}=await supabase.from("conversations").select("id,title").eq("id",conversationId).maybeSingle();
  if(!conversation)return {ok:false,message:"Conversation inaccessible."};
  if(!process.env.WHATSAPP_ACCESS_TOKEN||!process.env.WHATSAPP_PHONE_NUMBER_ID||!process.env.WHATSAPP_NOTIFICATION_TEMPLATE)return {ok:false,message:"WhatsApp est obligatoire mais son API n’est pas encore configurée."};
  if(!process.env.RESEND_API_KEY)return {ok:false,message:"L’envoi e-mail obligatoire n’est pas encore configuré."};
  const admin=createSupabaseAdminClient();
  const {data:recipients}=await admin.from("conversation_members").select("user_id,muted").eq("conversation_id",conversationId).neq("user_id",user.id).eq("muted",false);
  const ids=(recipients||[]).map(item=>item.user_id);
  const [{data:profiles},{data:authUsers}]=ids.length?await Promise.all([admin.from("profiles").select("id,full_name,whatsapp_phone,whatsapp_opt_in").in("id",ids),admin.auth.admin.listUsers({perPage:1000})]):[{data:[]},{data:{users:[]}}];
  const missingWhatsApp=(profiles||[]).filter(item=>!item.whatsapp_phone||!item.whatsapp_opt_in);
  const emailById=new Map((authUsers?.users||[]).map(item=>[item.id,item.email||""]));
  const missingEmail=ids.filter(id=>!emailById.get(id));
  if(missingWhatsApp.length||missingEmail.length)return {ok:false,message:"Envoi bloqué : chaque destinataire doit avoir un numéro WhatsApp actif et une adresse e-mail."};
  const {error}=await supabase.from("chat_messages").insert({conversation_id:conversationId,sender_id:user.id,body});
  if(error)return {ok:false,message:error.message};
  if(recipients?.length){
    const ids=recipients.map(item=>item.user_id),conversationTitle=conversation.title||"Conversation ABA",preview=body.slice(0,180);
    await admin.from("notifications").insert(ids.map(id=>({user_id:id,title:`Nouveau message — ${conversationTitle}`,body:preview,link:"/admin/mail"})));
    await Promise.all((profiles||[]).flatMap(item=>{
      const deliveries:Promise<boolean>[]=[];
      const email=emailById.get(item.id);if(email)deliveries.push(sendNotificationEmail(email,conversationTitle,preview));
      if(item.whatsapp_phone)deliveries.push(sendWhatsAppTemplate(item.whatsapp_phone,[conversationTitle,preview]));
      return deliveries;
    }));
  }
  revalidatePath("/admin/mail");return {ok:true,message:"Message envoyé."};
}

export async function updateWhatsAppPreferenceAction(formData:FormData):Promise<ActionResult>{
  const {user,supabase}=await requireAdmin();const phone=clean(formData,"whatsapp_phone").replace(/[^0-9+]/g,"");
  if(!phone)return {ok:false,message:"Le numéro WhatsApp est obligatoire."};
  const {error}=await supabase.from("profiles").update({whatsapp_phone:phone,whatsapp_opt_in:true,whatsapp_opt_in_at:new Date().toISOString()}).eq("id",user.id);
  if(error)return {ok:false,message:error.message};revalidatePath("/admin/mail");return {ok:true,message:"Préférences WhatsApp enregistrées."};
}
