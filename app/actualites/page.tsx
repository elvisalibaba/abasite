import type { Metadata } from "next";
import CTA from "@/components/CTA";
import NewsCard from "@/components/NewsCard";
import PageHero from "@/components/PageHero";
import { news } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Analyses, activités et publications d’Africa Business Agency sur la transformation institutionnelle."
};

const editorialPillars = [
  ["01", "Décrypter", "Expliquer les enjeux numériques et opérationnels dans un langage utile aux décideurs."],
  ["02", "Documenter", "Partager des méthodes, critères de réussite et retours d’expérience applicables."],
  ["03", "Éclairer", "Relier technologie, gouvernance, sécurité et réalités du terrain."],
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="NOTES ABA"
        title="Comprendre les transformations qui renforcent les organisations."
        description="Des notes institutionnelles concises sur les données, l’identité numérique, les infrastructures et le déploiement."
        accent="news"
      />

      <div className="container news-facts-wrap" aria-label="Repères éditoriaux">
        <dl className="news-facts">
          <div><dt>{String(news.length).padStart(2, "0")}</dt><dd>Publications disponibles</dd></div>
          <div><dt>03</dt><dd>Thématiques stratégiques</dd></div>
          <div><dt>FR</dt><dd>Publication en français</dd></div>
          <div><dt>ABA</dt><dd>Analyses institutionnelles</dd></div>
        </dl>
      </div>

      <section className="section muted-section news-publications-section">
        <div className="container">
          <div className="section-heading split-heading news-page-heading">
            <div><div className="eyebrow dark">DERNIÈRES PUBLICATIONS</div><h2>Analyses, méthodes et retours d’expérience.</h2></div>
            <p>Des contenus conçus pour aider les institutions à mieux cadrer leurs décisions technologiques et opérationnelles.</p>
          </div>
          <nav className="news-topic-index" aria-label="Thématiques des publications">
            {[...new Set(news.map((item) => item.category))].map((category) => <span key={category}>{category}</span>)}
          </nav>
          <div className="news-grid news-grid-page">
            {news.map((item) => <NewsCard item={item} key={item.slug} />)}
          </div>
        </div>
      </section>

      <section className="section news-editorial-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">LIGNE ÉDITORIALE</div><h2>Publier pour renforcer la capacité de décision.</h2></div>
            <p>Les publications ABA privilégient la clarté, l’utilité opérationnelle et le respect de la confidentialité.</p>
          </div>
          <div className="news-editorial-grid">
            {editorialPillars.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
          <aside className="news-editorial-note">
            <strong>RESPONSABILITÉ ÉDITORIALE</strong>
            <p>Les analyses publiées présentent des principes généraux et ne dévoilent aucune donnée confidentielle, information personnelle ou configuration de sécurité appartenant à une organisation.</p>
          </aside>
        </div>
      </section>

      <CTA eyebrow="UNE QUESTION SUR NOS PUBLICATIONS ?" title="Échangeons autour de vos enjeux institutionnels." />
    </>
  );
}
