import { createClient } from "@supabase/supabase-js";

export type CmsService = { id: string; title: string; slug: string; summary: string; image_url: string | null; icon: string; link: string; position: number };
export type PublicDocument = { id:string; title:string; description:string; category:string; folder:string; version:string; mime_type:string; size_bytes:number; published_at:string|null; download_url:string };

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

export async function getHomeCms() {
  const client = publicClient();
  if (!client) return { content: {} as Record<string, string>, services: [] as CmsService[] };
  const [contentResult, serviceResult] = await Promise.all([
    client.from("content_entries").select("content_key,value").eq("page", "accueil"),
    client.from("service_cards").select("id,title,slug,summary,image_url,icon,link,position").eq("published", true).order("position")
  ]);
  const content = Object.fromEntries((contentResult.data || []).map((entry) => [entry.content_key, entry.value]));
  return { content, services: (serviceResult.data || []) as CmsService[] };
}

export async function getPublicDocuments():Promise<PublicDocument[]> {
  const client=publicClient();
  if(!client)return [];
  const {data,error}=await client.from("document_assets").select("id,title,description,category,folder,version,mime_type,size_bytes,published_at,path").eq("status","published").eq("visibility","public").order("published_at",{ascending:false});
  if(error||!data)return [];
  const signed=await Promise.all(data.map(async item=>{
    const {data:urlData}=await client.storage.from("documents").createSignedUrl(item.path,3600);
    return {...item,download_url:urlData?.signedUrl||""};
  }));
  return signed.filter(item=>item.download_url) as PublicDocument[];
}
