import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; const recent=new Map<string,number>();
function text(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):""}

export async function POST(request:NextRequest){
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";const now=Date.now();const last=recent.get(ip)||0;if(now-last<15000)return NextResponse.json({error:"Veuillez patienter avant un nouvel envoi."},{status:429});
  let body:Record<string,unknown>;try{body=await request.json()}catch{return NextResponse.json({error:"Requête invalide."},{status:400})}
  if(text(body.website,200))return NextResponse.json({received:true});const startedAt=Number(body.startedAt||0);if(!startedAt||now-startedAt<1500)return NextResponse.json({error:"Envoi trop rapide. Veuillez réessayer."},{status:400});
  const name=text(body.name,120),organization=text(body.organization,160),email=text(body.email,180),phone=text(body.phone,60),subject=text(body.subject,180),message=text(body.message,5000);
  if(name.length<2||!emailPattern.test(email)||!subject||message.length<20)return NextResponse.json({error:"Vérifiez les champs obligatoires et votre adresse e-mail."},{status:400});
  try{const admin=createSupabaseAdminClient();const {error}=await admin.from("contact_requests").insert({name,organization:organization||null,email,phone:phone||null,subject,message,status:"new",source:"website"});if(error)throw error;
    const apiKey=process.env.RESEND_API_KEY;const from=process.env.ABA_FROM_EMAIL||"contact@aba.cd";if(apiKey){const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:`Bearer ${apiKey}`,"content-type":"application/json"},body:JSON.stringify({from:`Site ABA <${from}>`,to:["contact@aba.cd"],reply_to:email,subject:`[Site ABA] ${subject}`,text:`Nom : ${name}\nOrganisation : ${organization||"Non précisée"}\nTéléphone : ${phone||"Non précisé"}\nE-mail : ${email}\n\n${message}`})});if(!response.ok)console.error("Notification de contact non envoyée",response.status)}
    recent.set(ip,now);return NextResponse.json({received:true});
  }catch(error){console.error("Contact API",error);return NextResponse.json({error:"Le service est momentanément indisponible. Écrivez à contact@aba.cd."},{status:503})}
}
