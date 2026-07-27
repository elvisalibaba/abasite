import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { documents } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Centre de ressources",
  description: "Documents institutionnels, notes techniques et fiches de services d’Africa Business Agency."
};

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="CENTRE DE RESSOURCES"
        title="Les documents utiles pour comprendre notre approche."
        description="Retrouvez les présentations institutionnelles, fiches de services et notes techniques publiées par ABA."
        accent="documents"
      />
      <section className="section">
        <div className="container resources-layout">
          <aside>
            <div className="eyebrow dark">PUBLICATIONS</div>
            <h2>Des ressources structurées et directement exploitables.</h2>
            <p>Les boutons de téléchargement seront activés lorsque les documents officiels validés seront déposés dans le dossier public du site.</p>
          </aside>
          <div className="resource-cards">
            {documents.map((document, index) => (
              <article key={document.title}>
                <div className="resource-icon">PDF</div>
                <div>
                  <span>{document.type}</span>
                  <h3>{document.title}</h3>
                  <p>{document.meta}</p>
                </div>
                <button type="button" disabled title="Document en cours de publication">Bientôt disponible</button>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container publication-note">
          <div><span>PROCESSUS DE PUBLICATION</span><h2>Des documents validés avant leur mise en ligne.</h2></div>
          <p>Chaque ressource institutionnelle doit être relue, approuvée, datée et associée à une version afin d’éviter la circulation de documents obsolètes.</p>
        </div>
      </section>
      <CTA title="Vous recherchez un document ou une présentation spécifique ?" />
    </>
  );
}
