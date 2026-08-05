import AdminIdentityStudioWorkspace from "@/components/admin/AdminIdentityStudioWorkspace";
import {requireAdmin} from "@/lib/admin-auth";
import type {CardRequest} from "@/types/identity-studio-card-request";
export const metadata = { title: "Studio cartes | Administration ABA" };
export const dynamic="force-dynamic";

export default async function AdminIdentityStudioPage({searchParams}:{searchParams:Promise<{request?:string}>}) {
  const {supabase}=await requireAdmin();let requests:CardRequest[]=[];
  const {data}=await supabase.from("card_requests").select("*").order("created_at",{ascending:false});requests=await Promise.all((data||[]).map(async item=>{const {data:signed}=item.photo_path?await supabase.storage.from("card-request-photos").createSignedUrl(item.photo_path,3600):{data:null};return {...item,photo_signed_url:signed?.signedUrl||""} as CardRequest}));
  const {request}=await searchParams;return <AdminIdentityStudioWorkspace requests={requests} initialSelected={request}/>;
}
