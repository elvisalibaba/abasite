import {requireAdmin} from "@/lib/admin-auth";
import CardRequestsManager from "@/components/admin/CardRequestsManager";
import type {CardRequest} from "@/types/identity-studio-card-request";
import "./requests.css";
export const dynamic="force-dynamic";export const metadata={title:"Demandes de cartes | ABA"};
export default async function CardRequestsPage(){const {supabase}=await requireAdmin();const {data}=await supabase.from("card_requests").select("*").order("created_at",{ascending:false});return <CardRequestsManager requests={(data||[]).map(item=>({...item,photo_signed_url:""})) as CardRequest[]}/>}
