import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";

const allowed=new Set(["image/jpeg","image/png","image/webp"]);
const text=(data:FormData,key:string,max:number,required=true)=>{const value=String(data.get(key)||"").trim();if((required&&!value)||value.length>max)throw new Error(`Champ invalide : ${key}`);return value};
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

export async function POST(request:Request){
  try{
    const data=await request.formData();
    if(String(data.get("website")||""))return NextResponse.json({ok:true});
    const cardType=String(data.get("cardType")||"service");
    if(!["service","visite"].includes(cardType))throw new Error("Type de carte invalide.");
    const photo=data.get("photo"),hasPhoto=photo instanceof File&&photo.size>0;
    if(cardType==="service"&&!hasPhoto)throw new Error("Ajoutez une photo pour la carte de service.");
    if(hasPhoto&&(photo.size>8*1024*1024||!allowed.has(photo.type)))throw new Error("Ajoutez une photo JPEG, PNG ou WebP de 8 Mo maximum.");
    const email=text(data,"email",254).toLowerCase();if(!/^\S+@\S+\.\S+$/.test(email))throw new Error("Adresse e-mail invalide.");
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;if(!url||!key)throw new Error("La configuration publique Supabase est absente.");
    const supabase=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}}),id=crypto.randomUUID();let photoPath="";const firstName=text(data,"firstName",80),lastName=text(data,"lastName",80),publicSlug=cardType==="visite"?`${slugify(`${firstName}-${lastName}`)||"profil"}-${id.slice(0,8)}`:null;
    if(hasPhoto){const extension=photo.type==="image/png"?"png":photo.type==="image/webp"?"webp":"jpg";photoPath=`${id}/portrait.${extension}`;const upload=await supabase.storage.from("card-request-photos").upload(photoPath,new Uint8Array(await photo.arrayBuffer()),{contentType:photo.type});if(upload.error)throw new Error(`Photo : ${upload.error.message}`)}
    const insert=await supabase.from("card_requests").insert({id,card_type:cardType,first_name:firstName,middle_name:text(data,"middleName",80,false),last_name:lastName,job_title:text(data,"jobTitle",140),department:text(data,"department",140,false),phone:text(data,"phone",30),email,photo_path:photoPath,public_slug:publicSlug,bio:cardType==="visite"?text(data,"bio",600,false):"",linkedin_url:cardType==="visite"?text(data,"linkedinUrl",300,false):"",personal_website:cardType==="visite"?text(data,"personalWebsite",300,false):""});
    if(insert.error)throw new Error(`Demande : ${insert.error.message}`);
    return NextResponse.json({ok:true,matricule:`DEMANDE-${id.slice(0,8).toUpperCase()}`,profilePath:publicSlug?`/carte/${publicSlug}`:null},{status:201});
  }catch(error){return NextResponse.json({ok:false,message:error instanceof Error?error.message:"Enregistrement impossible."},{status:400})}
}
