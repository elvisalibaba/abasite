import IdentityStudio from "@/components/identity-studio/IdentityStudio";
import { companyConfig } from "@/config/identity-studio-company";
import { requireAdmin } from "@/lib/admin-auth";
import type {PersonProfile} from "@/types/identity-studio";
import "./identity-studio.css";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "ABA Identity Studio",
  robots: { index: false, follow: false },
};

export default async function IdentityStudioPage({searchParams}:{searchParams:Promise<{request?:string;type?:string}>}) {
  const {supabase}=await requireAdmin();
  const {request,type}=await searchParams;let person:PersonProfile|undefined;let cardType:"service"|"visite"=type==="visite"?"visite":"service";
  if(request){const {data}=await supabase.from("card_requests").select("*").eq("id",request).maybeSingle();if(data){cardType=data.card_type==="visite"?"visite":"service";const {data:signed}=data.photo_path?await supabase.storage.from("card-request-photos").createSignedUrl(data.photo_path,3600):{data:null};const origin=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";person={firstName:data.first_name,middleName:data.middle_name,lastName:data.last_name,jobTitle:data.job_title,department:data.department,employeeId:data.matricule,phone:data.phone,email:data.email,photoDataUrl:signed?.signedUrl||"",publicProfileUrl:data.public_slug?`${origin}/carte/${data.public_slug}`:undefined}}}
  return <IdentityStudio company={companyConfig} initialPerson={person} initialCardType={cardType}/>;
}
