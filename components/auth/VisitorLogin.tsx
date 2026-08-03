"use client";
import { useActionState } from "react";
import Link from "next/link";
import { visitorLoginAction } from "@/app/espace/actions";
const initial={ok:false,message:""};
export default function VisitorLogin(){const [state,action,pending]=useActionState(visitorLoginAction,initial);return <form className="visitor-login" action={action}><span>ESPACE PROJET ABA</span><h1>Suivre votre demande</h1><p>Connectez-vous à votre espace visiteur sécurisé.</p><label>Adresse e-mail<input name="email" type="email" required autoComplete="email"/></label><label>Mot de passe<input name="password" type="password" required autoComplete="current-password"/></label>{state.message&&<div className="visitor-message">{state.message}</div>}<button disabled={pending}>{pending?"Connexion…":"Se connecter"}</button><small>Pas encore de compte ? <Link href="/inscription">Créer un compte</Link></small></form>}
