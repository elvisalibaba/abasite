"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status,setStatus]=useState<FormStatus>("idle"); const [message,setMessage]=useState(""); const startedAt=useRef(0);
  useEffect(()=>{startedAt.current=Date.now()},[]);
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;setStatus("loading");setMessage("");const payload=Object.fromEntries(new FormData(form));
    try{const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...payload,startedAt:startedAt.current})});const result=await response.json();if(!response.ok)throw new Error(result.error||"Envoi impossible");setStatus("success");setMessage("Votre demande a bien été transmise à ABA. Notre équipe vous répondra à l’adresse indiquée.");form.reset();startedAt.current=Date.now()}catch(error){setStatus("error");setMessage(error instanceof Error?error.message:"Une erreur est survenue. Vous pouvez écrire à contact@aba.cd.")}}
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-grid"><label><span>Nom complet *</span><input required minLength={2} name="name" type="text" autoComplete="name" /></label><label><span>Organisation</span><input name="organization" type="text" autoComplete="organization" /></label><label><span>Adresse e-mail *</span><input required name="email" type="email" inputMode="email" autoComplete="email" /></label><label><span>Téléphone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label></div>
    <label><span>Objet *</span><select required name="subject" defaultValue=""><option value="" disabled>Sélectionner un sujet</option><option>Demande de présentation</option><option>Projet de transformation numérique</option><option>Biométrie et identité numérique</option><option>Audit et gouvernance des données</option><option>Infrastructure et déploiement</option><option>Partenariat institutionnel</option><option>Autre demande</option></select></label>
    <label><span>Votre message *</span><textarea required minLength={20} maxLength={5000} name="message" rows={7}/></label><label className="contact-honeypot" aria-hidden="true"><span>Site web</span><input name="website" type="text" tabIndex={-1} autoComplete="off"/></label>
    <div className="form-footer"><p>Les champs marqués d’un astérisque sont obligatoires. Aucune donnée sensible ou classifiée ne doit être transmise ici.</p><button className="button primary" type="submit" disabled={status==="loading"}>{status==="loading"?"Envoi en cours…":"Envoyer la demande"}</button></div>
    <div className={`form-notice form-notice-${status}`} aria-live="polite" role={status==="error"?"alert":"status"}>{message}</div>
    {status==="error"?<p><a href="mailto:contact@aba.cd">Écrire directement à contact@aba.cd</a></p>:null}
  </form>;
}
