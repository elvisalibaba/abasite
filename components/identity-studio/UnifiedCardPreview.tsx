"use client";
import {useEffect,useMemo,useState} from "react";
import {companyConfig} from "@/config/identity-studio-company";
import {fetchAsDataUrl} from "@/lib/identity-studio/browser";
import {renderCardBackSvg,renderCardFrontSvg,renderBusinessCardFrontSvg,renderPersonalBusinessCardBackSvg} from "@/lib/identity-studio/card-renderer";
import type {PersonProfile} from "@/types/identity-studio";

type Values={firstName:string;middleName:string;lastName:string;jobTitle:string;department:string;phone:string;email:string;cardType:string};
export default function UnifiedCardPreview({values,photo,profilePath}:{values:Values;photo:string;profilePath:string}){
  const [logo,setLogo]=useState("");
  useEffect(()=>{fetchAsDataUrl(companyConfig.logoPath).then(setLogo).catch(()=>setLogo(""))},[]);
  const person:PersonProfile=useMemo(()=>({firstName:values.firstName,middleName:values.middleName,lastName:values.lastName,jobTitle:values.jobTitle,department:values.department,employeeId:"ABA-APERÇU",phone:values.phone,email:values.email,photoDataUrl:photo,publicProfileUrl:profilePath&&typeof window!=="undefined"?`${window.location.origin}${profilePath}`:"https://aba.cd/carte/votre-profil"}),[values,photo,profilePath]);
  const business=values.cardType==="visite";
  const front=useMemo(()=>business?renderBusinessCardFrontSvg(person,companyConfig,logo):renderCardFrontSvg(person,companyConfig,logo),[business,person,logo]);
  const back=useMemo(()=>business?renderPersonalBusinessCardBackSvg(person,companyConfig,logo):renderCardBackSvg(person,companyConfig,logo),[business,person,logo]);
  return <aside className={`unified-card-preview ${business?"business":"service"}`}><header><span>APERÇU EXACT · RECTO-VERSO</span><small>Même rendu que dans ABA Identity Studio</small></header><div><section><b>RECTO</b><figure dangerouslySetInnerHTML={{__html:front}}/></section><section><b>VERSO</b><figure dangerouslySetInnerHTML={{__html:back}}/></section></div><p>Ce rendu sera repris à l’identique par l’administration pour l’impression et l’export.</p></aside>;
}
