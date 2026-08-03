"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type ActionResult } from "@/app/admin/actions";

const initialState: ActionResult = { ok: false, message: "" };

export default function AdminLogin() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return (
    <div className="admin-login-page">
      <div className="admin-login-brand"><span>ABA</span><small>ESPACE ADMINISTRATION</small></div>
      <form action={action} className="admin-login-card">
        <div className="admin-login-kicker">Accès sécurisé</div>
        <h1>Bienvenue.</h1>
        <p>Connectez-vous pour gérer le site institutionnel.</p>
        <label>Adresse e-mail<input name="email" type="email" autoComplete="email" placeholder="admin@aba.cd" required /></label>
        <label>Mot de passe<input name="password" type="password" autoComplete="current-password" placeholder="••••••••" required /></label>
        {state.message && <div className="admin-alert error">{state.message}</div>}
        <button className="admin-primary-button" disabled={pending}>{pending ? "Connexion…" : "Se connecter"}<span>→</span></button>
        <div className="admin-login-signup">Pas encore de compte ? <Link href="/inscription">Créer un compte</Link></div>
        <Link href="/">← Retour au site public</Link>
      </form>
    </div>
  );
}
