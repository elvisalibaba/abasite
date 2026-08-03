"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setMessage(null);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const password = String(form.get("password") || "");
    if (password !== String(form.get("password_confirmation") || "")) { setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." }); setLoading(false); return; }
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({ email: String(form.get("email") || ""), password, options: { data: { full_name: String(form.get("full_name") || ""), whatsapp_phone: String(form.get("whatsapp_phone") || "") }, emailRedirectTo: `${window.location.origin}/espace` } });
      if (error) throw error;
      formElement.reset();
      setMessage({ type: "success", text: data.session ? "Votre compte a été créé." : "Compte créé. Consultez votre e-mail pour confirmer votre inscription." });
    } catch (error) { setMessage({ type: "error", text: error instanceof Error ? error.message : "Impossible de créer le compte." }); }
    finally { setLoading(false); }
  }

  return <form className="signup-form" onSubmit={handleSubmit}>
    <div><span>INSCRIPTION</span><h2>Vos informations</h2><p>Tous les champs sont obligatoires.</p></div>
    <label>Nom complet<input name="full_name" autoComplete="name" required placeholder="Votre nom complet" /></label>
    <label>Adresse e-mail<input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" /></label>
    <label>Numéro WhatsApp *<input name="whatsapp_phone" type="tel" autoComplete="tel" required placeholder="+243 812 000 000" /></label>
    <div className="signup-passwords"><label>Mot de passe<input name="password" type="password" autoComplete="new-password" minLength={8} required placeholder="8 caractères minimum" /></label><label>Confirmer<input name="password_confirmation" type="password" autoComplete="new-password" minLength={8} required placeholder="Répétez le mot de passe" /></label></div>
    {message && <div className={`signup-message ${message.type}`}>{message.text}</div>}
    <button className="button primary" disabled={loading}>{loading ? "Création…" : "Créer mon compte"}<span>→</span></button>
    <small>Vous avez déjà un compte ? <Link href="/espace/login">Se connecter</Link></small>
  </form>;
}
