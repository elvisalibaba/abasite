import type { Metadata } from "next";
import CTA from "@/components/CTA";
import NewsCard from "@/components/NewsCard";
import PageHero from "@/components/PageHero";
import { news } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Analyses, activités et publications d’Africa Business Agency sur la transformation institutionnelle."
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="ACTUALITÉS ET ANALYSES"
        title="Comprendre les transformations qui renforcent les organisations."
        description="ABA partage ses méthodes, retours d’expérience et réflexions sur les données, l’identité numérique, les infrastructures et le déploiement."
        accent="news"
      />
      <section className="section muted-section">
        <div className="container">
          <div className="news-grid news-grid-page">
            {news.map((item) => <NewsCard item={item} key={item.slug} />)}
          </div>
        </div>
      </section>
      <CTA eyebrow="UNE QUESTION SUR NOS PUBLICATIONS ?" title="Échangeons autour de vos enjeux institutionnels." />
    </>
  );
}
