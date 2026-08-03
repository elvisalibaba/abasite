import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalPage() {
  return (
    <>
      <PageHero eyebrow="INFORMATIONS LÉGALES" title="Mentions légales" description="Informations relatives à l’éditeur et à l’utilisation du site aba.cd." accent="legal" />
      <section className="section legal-page"><div className="container legal-copy">
        <h2>Éditeur du site</h2><p>Le site aba.cd est édité par Africa Business Agency, établie à Kinshasa, République Démocratique du Congo.</p>
        <h2>Contact</h2><p>Adresse électronique : contact@aba.cd. Téléphone : +243 812 130 324.</p>
        <h2>Contenus</h2><p>Les informations publiées sont fournies à titre institutionnel. ABA peut les mettre à jour, les corriger ou les retirer sans préavis.</p>
        <h2>Propriété intellectuelle</h2><p>Les textes, éléments graphiques, marques et documents du site sont protégés. Toute reproduction doit faire l’objet d’une autorisation préalable.</p>
        <h2>Responsabilité</h2><p>ABA met en œuvre des efforts raisonnables pour assurer l’exactitude et la disponibilité du site, sans garantir l’absence totale d’erreurs ou d’interruptions.</p>
      </div></section>
    </>
  );
}
