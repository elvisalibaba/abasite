import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Créer un compte", description: "Créez votre compte utilisateur Africa Business Agency." };

export default function SignupPage() {
  return <section className="signup-page">
    <div className="signup-decoration" aria-hidden="true"><span>ABA</span></div>
    <div className="container signup-layout">
      <div className="signup-intro"><span className="signup-kicker">ESPACE PROJET</span><h1>Présentez votre initiative à ABA.</h1><p>Créez un compte visiteur sécurisé pour soumettre une demande et suivre son étude par nos équipes.</p><ul><li>Dépôt structuré de votre projet</li><li>Suivi de son état d’avancement</li><li>Accès strictement séparé de l’administration</li></ul></div>
      <SignupForm />
    </div>
  </section>;
}
