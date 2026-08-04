import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "À propos",
  description: "Fondée en 2013, Africa Business Agency conçoit et intègre des solutions numériques, biométriques et de sécurité en République Démocratique du Congo."
};

const history = [
  { period: "2013", title: "Création de Africa Business Agency", text: "Fondation de l’entreprise congolaise par Claude KIKOKA, Président, et Christian KIKOKA, Directeur Général." },
  { period: "2013 — 2017", title: "Modernisation des processus administratifs", text: "Déploiement de solutions de gestion électronique des documents et d’archivage pour sécuriser les opérations." },
  { period: "2022", title: "Recensement biométrique", text: "Développement et déploiement d’un système d’enrôlement, d’identification et de contrôle biométrique." },
  { period: "2026", title: "Extension des capacités de contrôle", text: "Mise en œuvre de solutions d’identification des effectifs et de production de cartes biométriques sécurisées." }
];

const domains = [
  "Systèmes d’information et plateformes métier",
  "Gouvernance, administration et audit des données",
  "Biométrie, enrôlement et identité numérique",
  "Sécurité des systèmes et contrôle d’accès",
  "Infrastructures, réseaux et équipements",
  "Déploiement, formation et maintenance"
];

const method = [
  ["01", "Comprendre", "Clarifier les objectifs, les responsabilités et les contraintes du terrain."],
  ["02", "Concevoir", "Définir une architecture réaliste, sécurisée et durable."],
  ["03", "Déployer", "Préparer les sites, les équipes, les tests et la mise en service."],
  ["04", "Pérenniser", "Documenter, transférer les compétences et accompagner l’exploitation."]
];

export default function InstitutionPage() {
  return <>
    <PageHero
      eyebrow="À PROPOS D’ABA"
      title="Une expertise congolaise pour les systèmes qui comptent."
      description="Depuis Kinshasa, ABA conçoit, intègre et déploie des infrastructures numériques, biométriques et de sécurité adaptées aux réalités des institutions africaines."
      accent="institution"
      cta={{label:"Parler à notre équipe",href:"/contact"}}
    />

    <div className="container about-facts-wrap">
      <dl className="about-facts">
        <div><dt>2013</dt><dd>Année de création</dd></div>
        <div><dt>Kinshasa</dt><dd>Siège opérationnel</dd></div>
        <div><dt>360°</dt><dd>Du cadrage au support</dd></div>
        <div><dt>RDC</dt><dd>Expertise et déploiement local</dd></div>
      </dl>
    </div>

    <section className="section about-intro" id="mission">
      <div className="container about-intro-grid">
        <div className="about-sticky-title">
          <span className="about-index">01 · NOTRE IDENTITÉ</span>
          <h2>La technologie devient utile lorsqu’elle renforce réellement l’institution.</h2>
        </div>
        <div className="about-intro-copy">
          <p className="about-lead">Africa Business Agency est une entreprise technologique congolaise fondée pour aider les organisations stratégiques à maîtriser leurs outils, leurs données et leurs opérations.</p>
          <p>Nous réunissons conseil, ingénierie, développement, intégration et déploiement. Cette continuité nous permet de traduire un enjeu institutionnel en un système utilisable, sécurisé et maintenable.</p>
          <p>Nos équipes travaillent au plus près du terrain, avec une attention particulière portée à la souveraineté des données, à la continuité des services et au transfert de compétences.</p>
          <blockquote>Donner aux organisations africaines la maîtrise durable de leur transformation numérique.</blockquote>
        </div>
      </div>
    </section>

    <section className="section about-purpose">
      <div className="container">
        <header className="about-section-head"><span>02 · NOTRE CAP</span><h2>Une mission claire.<br/>Une vision de long terme.</h2></header>
        <div className="about-purpose-grid">
          <article><span>MISSION</span><h3>Renforcer durablement les capacités numériques.</h3><p>Concevoir, intégrer et maintenir des dispositifs fiables qui améliorent la qualité, la sécurité et la continuité des opérations.</p></article>
          <article><span>VISION</span><h3>Faire progresser une technologie conçue en RDC.</h3><p>Accroître la contribution des ingénieurs congolais aux transformations technologiques menées sur le continent africain.</p></article>
        </div>
      </div>
    </section>

    <section className="section about-leadership">
      <div className="container about-leadership-layout">
        <header className="about-section-head"><span>03 · GOUVERNANCE</span><h2>Une direction engagée depuis l’origine.</h2><p>La vision institutionnelle et la conduite opérationnelle restent portées au plus haut niveau.</p></header>
        <div className="about-leaders">
          <article><span>PRÉSIDENT · COFONDATEUR</span><h3>Claude KIKOKA</h3><p>Vision institutionnelle, relations stratégiques et orientation de long terme.</p></article>
          <article><span>DIRECTEUR GÉNÉRAL · COFONDATEUR</span><h3>Christian KIKOKA</h3><p>Conduite opérationnelle, ingénierie technologique et déploiement des programmes.</p></article>
        </div>
      </div>
    </section>

    <section className="section about-history">
      <div className="container">
        <header className="about-section-head light"><span>04 · NOTRE PARCOURS</span><h2>Plus d’une décennie de construction.</h2><p>Une progression guidée par des besoins institutionnels concrets.</p></header>
        <div className="about-timeline">{history.map((item,index)=><article key={item.period}><div className="about-timeline-mark"><span>{String(index+1).padStart(2,"0")}</span></div><time>{item.period}</time><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="section about-expertise">
      <div className="container about-expertise-layout">
        <header className="about-section-head"><span>05 · NOS CAPACITÉS</span><h2>Une chaîne technologique intégrée.</h2><p>Un interlocuteur unique pour coordonner les dimensions métier, techniques et opérationnelles.</p><Link href="/expertises">Explorer toutes nos expertises <span aria-hidden="true">→</span></Link></header>
        <div className="about-domain-list">{domains.map((domain,index)=><article key={domain}><span>{String(index+1).padStart(2,"0")}</span><h3>{domain}</h3></article>)}</div>
      </div>
    </section>

    <section className="section about-values" id="valeurs">
      <div className="container">
        <header className="about-section-head centered"><span>06 · NOS PRINCIPES</span><h2>Trois exigences dans chaque intervention.</h2></header>
        <div className="about-values-grid">
          <article><span>01</span><h3>Expertise</h3><p>Comprendre le métier, maîtriser la technologie et mesurer les conséquences de chaque choix.</p></article>
          <article><span>02</span><h3>Intégrité</h3><p>Protéger les données, documenter les décisions et respecter les responsabilités établies.</p></article>
          <article><span>03</span><h3>Performance</h3><p>Livrer des résultats mesurables, une exploitation claire et des solutions capables d’évoluer.</p></article>
        </div>
      </div>
    </section>

    <section className="section about-method">
      <div className="container">
        <header className="about-section-head"><span>07 · NOTRE MÉTHODE</span><h2>Du besoin au terrain, sans rupture.</h2></header>
        <div className="about-method-grid">{method.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="about-next">
      <div className="container about-next-layout"><div><span>ALLER PLUS LOIN</span><h2>Découvrir ABA à travers ses réalisations.</h2></div><nav aria-label="Découvrir ABA"><Link href="/projets">Voir nos projets <span>→</span></Link><Link href="/expertises">Explorer nos expertises <span>→</span></Link><Link href="/contact">Contacter notre équipe <span>→</span></Link></nav></div>
    </section>

    <CTA title="Construisons un système adapté à votre réalité." />
  </>;
}
