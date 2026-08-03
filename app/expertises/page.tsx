import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";
import ExpertiseCard from "@/components/ExpertiseCard";
import PageHero from "@/components/PageHero";
import { expertises } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Expertises",
  description: "Biométrie, gouvernance des données, solutions numériques, infrastructure et déploiement sécurisé par Africa Business Agency."
};

const priorities = [
  ["Fiabiliser l’identité", "Enrôlement, biométrie, contrôle et référentiel unique.", "/expertises/biometrie-identite-numerique"],
  ["Maîtriser les données", "Audit, assainissement, gouvernance et aide à la décision.", "/expertises/audit-gouvernance-donnees"],
  ["Moderniser les services", "Applications métier, portails, interopérabilité et conduite du changement.", "/expertises/solutions-numeriques-integrees"],
  ["Sécuriser les opérations", "Infrastructure, cybersécurité, supervision et continuité.", "/expertises/securite-systemes-information"],
];

const deliveryModes = [
  ["01", "Mission ciblée", "Un audit, une étude, un prototype ou une intégration sur un périmètre clairement défini."],
  ["02", "Projet de bout en bout", "Une responsabilité coordonnée de la conception jusqu’au déploiement et à la formation."],
  ["03", "Programme évolutif", "Une transformation par étapes, avec pilotes, indicateurs, gouvernance et montée en charge."],
];

const expertiseFamilies = [
  { title:"Transformation et gouvernance", slugs:["transformation-numerique-institutionnelle","audit-gouvernance-donnees","ged-ecm-archivage"] },
  { title:"Identité, données et sécurité", slugs:["biometrie-identite-numerique","securite-systemes-information","controle-acces-mobile"] },
  { title:"Solutions, infrastructures et déploiement", slugs:["solutions-numeriques-integrees","deploiement-securisation","iot-integration","deploiement-supervision","transport-public-billettique","gestion-stationnement","smart-asset-management"] },
];

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

      <div className="container expertise-facts-wrap" aria-label="Capacités ABA">
        <dl className="expertise-facts">
          <div><dt>{String(expertises.length).padStart(2,"0")}</dt><dd>Expertises complémentaires</dd></div>
          <div><dt>360°</dt><dd>Conseil, technologie et terrain</dd></div>
          <div><dt>01</dt><dd>Responsabilité coordonnée</dd></div>
          <div><dt>RDC</dt><dd>Ingénierie et déploiement local</dd></div>
        </dl>
      </div>

      <section className="section expertise-orientation">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">VOTRE PRIORITÉ</div><h2>Partir du problème institutionnel, pas de la technologie.</h2></div>
            <p>Identifiez votre enjeu principal. ABA compose ensuite les expertises nécessaires autour de vos usages, de vos risques et de votre réalité opérationnelle.</p>
          </div>
          <div className="expertise-priority-grid">
            {priorities.map(([title, text, href], index) => (
              <Link href={href} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{text}</p><strong>Voir l’approche <i aria-hidden="true">→</i></strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section expertise-domain-section" id="domaines">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">NOS DOMAINES D’INTERVENTION</div>
              <h2>Treize expertises, une seule chaîne de valeur.</h2>
            </div>
            <p>Chaque expertise peut être mobilisée séparément ou intégrée dans un programme complet de transformation.</p>
          </div>
          <nav className="expertise-mobile-index" aria-label="Accès rapide aux expertises">
            {expertises.map(item => <a href={`#expertise-${item.slug}`} key={item.slug}><span>{item.number}</span>{item.shortTitle}</a>)}
          </nav>
          <div className="expertise-family-list">{expertiseFamilies.map((family,index)=><section className="expertise-family" key={family.title}><header><span>0{index+1}</span><h3>{family.title}</h3></header><div className="expertise-grid expertise-grid-page">{family.slugs.map(slug=>expertises.find(item=>item.slug===slug)).filter((item):item is (typeof expertises)[number]=>Boolean(item)).map(item=><ExpertiseCard item={item} key={item.slug}/>)}</div></section>)}</div>
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

      <section className="section expertise-delivery-section">
        <div className="container expertise-delivery-layout">
          <div className="section-copy">
            <div className="eyebrow dark">MODES D’INTERVENTION</div>
            <h2>Le bon niveau d’engagement pour chaque ambition.</h2>
            <p className="lead">Une mission peut commencer petit, démontrer sa valeur, puis évoluer sans perdre sa cohérence.</p>
            <p>Le périmètre, les responsabilités, les livrables et les critères de réussite sont définis avant l’exécution.</p>
          </div>
          <div className="expertise-delivery-list">
            {deliveryModes.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>
            ))}
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
            <article><strong>04</strong><h3>Une autonomie durable</h3><p>Documentation, transfert de compétences et responsabilités locales organisés pour la continuité.</p></article>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
