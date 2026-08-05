"use client";
import {useState} from "react";
import {AbaQrCode} from "@/components/identity-studio/cards/AbaQrCode";
import UnifiedCardPreview from "@/components/identity-studio/UnifiedCardPreview";
import {ABA_DEPARTMENTS,ABA_STAFF_EMAILS} from "@/config/identity-studio-options";

const initial={firstName:"",middleName:"",lastName:"",jobTitle:"",department:"",phone:"",email:"",cardType:"service",bio:"",linkedinUrl:"",personalWebsite:""};
export default function PublicCardRequest(){
  const [values,setValues]=useState(initial),[photo,setPhoto]=useState(""),[state,setState]=useState<"idle"|"sending"|"success"|"error">("idle"),[message,setMessage]=useState(""),[profilePath,setProfilePath]=useState("");
  const change=(key:keyof typeof initial,value:string)=>setValues(current=>({...current,[key]:value}));
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setState("sending");const response=await fetch("/api/card-requests",{method:"POST",body:new FormData(event.currentTarget)}),result=await response.json().catch(()=>({message:"Réponse invalide."}));if(!response.ok){setMessage(result.message);setState("error");return}setMessage(`Votre demande ${result.matricule} a été transmise à ABA.`);setProfilePath(result.profilePath||"");setState("success")}
  const fullName=`${values.firstName} ${values.middleName} ${values.lastName}`.replace(/\s+/g," ").trim()||"VOTRE NOM";
  return <main className="public-card-page">
    <header className="public-card-head"><img src="/image.png" alt="Africa Business Agency"/><div><span>ABA IDENTITY STUDIO</span><h1>Créez votre demande de carte</h1><p>Remplissez vos informations et contrôlez l’aperçu avant de l’envoyer à l’administration.</p></div></header>
    <div className="public-card-layout">
      <form className="public-card-form" onSubmit={submit}>
        <div className="public-card-type"><label><input type="radio" name="cardType" value="service" checked={values.cardType==="service"} onChange={e=>change("cardType",e.target.value)}/> Carte de service</label><label><input type="radio" name="cardType" value="visite" checked={values.cardType==="visite"} onChange={e=>change("cardType",e.target.value)}/> Carte de visite</label></div>
        <div className="public-form-grid">
          <label>Prénom *<input name="firstName" required maxLength={80} value={values.firstName} onChange={e=>change("firstName",e.target.value)}/></label>
          <label>Post-nom<input name="middleName" maxLength={80} value={values.middleName} onChange={e=>change("middleName",e.target.value)}/></label>
          <label>Nom *<input name="lastName" required maxLength={80} value={values.lastName} onChange={e=>change("lastName",e.target.value)}/></label>
          <label>Fonction *<input name="jobTitle" required maxLength={140} value={values.jobTitle} onChange={e=>change("jobTitle",e.target.value)}/></label>
          <label>Direction / département<input name="department" list="aba-departments-public" maxLength={140} value={values.department} onChange={e=>change("department",e.target.value)} placeholder="Sélectionnez ou recherchez"/></label>
          <label>Téléphone *<input name="phone" required maxLength={30} value={values.phone} onChange={e=>change("phone",e.target.value)}/></label>
          <label className="span-2">E-mail professionnel *<input name="email" type="email" list="aba-emails-public" required maxLength={254} value={values.email} onChange={e=>change("email",e.target.value)} placeholder="Sélectionnez une adresse @aba.cd"/></label>
          <label className="span-2">Photo d’identité {values.cardType==="service"?"*":"(inutile pour une carte de visite)"}<input name="photo" type="file" required={values.cardType==="service"} disabled={values.cardType==="visite"} accept="image/jpeg,image/png,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file){if(photo)URL.revokeObjectURL(photo);setPhoto(URL.createObjectURL(file))}}}/><small>{values.cardType==="service"?"Portrait récent, fond neutre, 8 Mo maximum.":"La carte de visite professionnelle ABA est conçue sans portrait."}</small></label>
          {values.cardType==="visite"&&<><label className="span-2">Présentation professionnelle<textarea name="bio" maxLength={600} rows={4} value={values.bio} onChange={e=>change("bio",e.target.value)} placeholder="Présentez brièvement votre expertise et vos missions."/></label><label>LinkedIn<input name="linkedinUrl" type="url" maxLength={300} value={values.linkedinUrl} onChange={e=>change("linkedinUrl",e.target.value)} placeholder="https://linkedin.com/in/…"/></label><label>Site personnel<input name="personalWebsite" type="url" maxLength={300} value={values.personalWebsite} onChange={e=>change("personalWebsite",e.target.value)} placeholder="https://…"/></label></>}
          <label className="card-honeypot">Site<input name="website" tabIndex={-1}/></label>
          <datalist id="aba-departments-public">{ABA_DEPARTMENTS.map(item=><option value={item} key={item}/>)}</datalist><datalist id="aba-emails-public">{ABA_STAFF_EMAILS.map(item=><option value={item} key={item}/>)}</datalist>
        </div>
        {state==="error"&&<p className="public-card-error">{message}</p>}{state==="success"&&<p className="public-card-success">✓ {message}{profilePath&&<> Votre portfolio sera accessible après validation : <b>{profilePath}</b></>}</p>}
        <button disabled={state==="sending"||state==="success"}>{state==="sending"?"Transmission…":state==="success"?"Demande envoyée":"Envoyer à l’administration ABA"}</button>
        <small className="public-card-privacy">Vos données servent uniquement à vérifier et produire votre carte.</small>
      </form>
      <aside className="public-card-preview"><span>APERÇU INDICATIF · RECTO-VERSO</span><div className="public-card-sides"><section><small>RECTO</small><div className={`public-card-face ${values.cardType}`}><div className="preview-brand"><img src="/image.png" alt=""/><b>{values.cardType==="visite"?"AFRICA BUSINESS AGENCY":"CARTE DE SERVICE"}</b></div>{values.cardType==="service"&&<div className="preview-photo">{photo?<img src={photo} alt="Votre portrait"/>:<i>PHOTO</i>}</div>}<div className="business-identity"><h2>{fullName}</h2><strong>{values.jobTitle||"Votre fonction"}</strong><p>{values.department||"Votre direction"}</p></div><footer><span>{values.phone||"+243 …"}</span><span>{values.email||"vous@aba.cd"}</span><span className="business-site">aba.cd · Kinshasa, RDC</span></footer></div></section><section><small>VERSO</small><div className={`public-card-face card-back ${values.cardType}`}><div className="back-brand"><img src="/image.png" alt="Logo ABA"/><strong>TRANSFORMATION NUMÉRIQUE<br/>INSTITUTIONNELLE</strong><i/></div>{values.cardType==="visite"&&<div className="personal-qr"><AbaQrCode value={profilePath&&typeof window!=="undefined"?`${window.location.origin}${profilePath}`:"https://aba.cd/carte/votre-profil"}/><b>SCANNEZ MON PROFIL</b></div>}<div className="back-contact"><b>aba.cd</b><span>contact@aba.cd</span><span>Kinshasa · RDC</span></div></div></section></div><p>Pour une carte de visite, le QR code ouvrira le portfolio personnel après validation.</p></aside>
      <UnifiedCardPreview values={values} photo={photo} profilePath={profilePath}/>
    </div>
  </main>
}
