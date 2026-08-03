import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="PROTECTION DES DONNÉES" title="Politique de confidentialité" description="Principes applicables aux informations transmises à Africa Business Agency via ce site." accent="legal" />
      <section className="section legal-page"><div className="container legal-copy">
        <h2>Données concernées</h2><p>Le formulaire de contact peut contenir votre nom, votre organisation, votre adresse électronique, votre numéro de téléphone et le message que vous préparez.</p>
        <h2>Fonctionnement du formulaire</h2><p>Dans cette version du site, le formulaire prépare un message dans votre application de messagerie. Les informations ne sont pas enregistrées dans une base de données du site.</p>
        <h2>Finalité</h2><p>Les informations transmises sont utilisées pour répondre à votre demande, organiser un échange ou analyser un besoin professionnel.</p>
        <h2>Confidentialité</h2><p>N’envoyez pas de données biométriques, d’identifiants officiels, d’informations classifiées ou de documents sensibles depuis le formulaire public.</p>
        <h2>Vos demandes</h2><p>Pour toute question relative à vos informations, contactez ABA à l’adresse contact@aba.cd.</p>
      </div></section>
    </>
  );
}
