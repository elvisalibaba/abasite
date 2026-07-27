import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { Mail, MapPin, Phone } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Africa Business Agency pour présenter un projet, demander une réunion ou obtenir une information."
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACTER ABA"
        title="Présentez-nous votre enjeu."
        description="Notre équipe étudie les demandes liées aux projets institutionnels, à la transformation numérique, aux données, à la biométrie et au déploiement."
        accent="contact"
      />
      <section className="section">
        <div className="container contact-layout">
          <aside className="contact-panel">
            <div className="eyebrow dark">COORDONNÉES</div>
            <h2>Échangeons de manière claire et confidentielle.</h2>
            <p>Précisez le contexte, l’objectif recherché, les principales contraintes et le calendrier souhaité.</p>
            <div className="contact-detail"><MapPin /><div><span>Adresse</span><strong>Kinshasa, République Démocratique du Congo</strong></div></div>
            <div className="contact-detail"><Mail /><div><span>E-mail</span><a href="mailto:contact@aba-drc.com">contact@aba-drc.com</a></div></div>
            <div className="contact-detail"><Phone /><div><span>Téléphone</span><a href="tel:+243812130324">+243 812 130 324</a></div></div>
            <div className="confidential-note"><strong>Confidentialité</strong><p>Évitez d’envoyer des données personnelles sensibles ou des documents classifiés depuis ce formulaire public.</p></div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
