import type { Metadata } from "next";
import CTA from "@/components/CTA";
import ExpertiseCard from "@/components/ExpertiseCard";
import PageHero from "@/components/PageHero";
import { expertises } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Expertises",
  description: "Biométrie, gouvernance des données, solutions numériques, infrastructure et déploiement sécurisé par Africa Business Agency."
};

export default function ExpertisesPage() {
  return (
    <>
      <PageHero
        eyebrow="NOS EXPERTISES"
        title="Une capacité d’intervention de bout en bout."
        description="ABA réunit les compétences nécessaires pour auditer, concevoir, intégrer, sécuriser et déployer des solutions institutionnelles complexes."
        accent="expertise"
        cta={{ label: "Présenter votre besoin", href: "/contact" }}
      />

      <section className="section dark-section expertise-domain-section" id="domaines">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">NOS DOMAINES D’INTERVENTION</div>
              <h2>Huit expertises, une seule chaîne de valeur.</h2>
            </div>
            <p>Chaque expertise peut être mobilisée séparément ou intégrée dans un programme complet de transformation.</p>
          </div>
          <nav className="expertise-mobile-index" aria-label="Accès rapide aux expertises">
            {expertises.map(item => <a href={`#expertise-${item.slug}`} key={item.slug}><span>{item.number}</span>{item.shortTitle}</a>)}
          </nav>
          <div className="expertise-grid expertise-grid-page">
            {expertises.map((item) => <ExpertiseCard item={item} key={item.slug} />)}
          </div>
        </div>
      </section>

      <section className="expertise-journey" aria-label="Parcours d’intervention ABA">
        <div className="container">
          <div><span>01</span><strong>Comprendre</strong><small>Besoin et contexte</small></div>
          <i aria-hidden="true" />
          <div><span>02</span><strong>Concevoir</strong><small>Solution et architecture</small></div>
          <i aria-hidden="true" />
          <div><span>03</span><strong>Déployer</strong><small>Terrain et adoption</small></div>
          <i aria-hidden="true" />
          <div><span>04</span><strong>Pérenniser</strong><small>Support et gouvernance</small></div>
        </div>
      </section>

      <section className="section">
        <div className="container capability-grid">
          <div className="section-copy">
            <div className="eyebrow dark">CAPACITÉ TRANSVERSALE</div>
            <h2>Relier les décisions, les données, les outils et le terrain.</h2>
            <p className="lead">Les grands projets ne sont jamais uniquement logiciels, matériels ou organisationnels.</p>
            <p>ABA traite les dépendances entre les dimensions techniques et opérationnelles afin d’éviter les solutions isolées, difficiles à maintenir ou impossibles à généraliser.</p>
          </div>
          <div className="capability-map">
            <div><span>01</span><strong>Stratégie</strong><small>Objectifs, gouvernance, risques</small></div>
            <div><span>02</span><strong>Données</strong><small>Qualité, unicité, traçabilité</small></div>
            <div><span>03</span><strong>Technologie</strong><small>Logiciels, API, équipements</small></div>
            <div><span>04</span><strong>Opérations</strong><small>Déploiement, support, pilotage</small></div>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow dark">NOS ENGAGEMENTS</div>
            <h2>Ce que chaque mission doit produire.</h2>
          </div>
          <div className="commitment-grid">
            <article><strong>01</strong><h3>Une vision documentée</h3><p>Architecture, responsabilités, risques, calendrier et critères de réussite clairement définis.</p></article>
            <article><strong>02</strong><h3>Une solution vérifiable</h3><p>Tests, indicateurs, journalisation et mécanismes de contrôle intégrés dès la conception.</p></article>
            <article><strong>03</strong><h3>Une exploitation réaliste</h3><p>Procédures, formation, support, sauvegarde et gouvernance prévus avant la mise en service.</p></article>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
