import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import { expertises, projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projets stratégiques",
  description: "Découvrez les domaines de projets structurés par Africa Business Agency pour les institutions et organisations."
};

const lifecycle = [
  ["01", "Qualifier", "Objectifs, parties prenantes, contraintes, risques et données disponibles."],
  ["02", "Démontrer", "Prototype ou pilote sur un périmètre réel avec des critères de réussite définis."],
  ["03", "Industrialiser", "Architecture, sécurité, procédures, support et préparation de la montée en charge."],
  ["04", "Déployer", "Mise en service progressive, formation, supervision et traitement des incidents."],
  ["05", "Mesurer", "Indicateurs d’usage, de qualité, de disponibilité et amélioration continue."],
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="PROJETS STRATÉGIQUES"
        title="Des programmes conçus pour passer à l’échelle."
        description="ABA transforme des enjeux institutionnels en architectures, produits, dispositifs de contrôle et plans de déploiement cohérents."
        accent="projects"
        cta={{ label: "Présenter un projet", href: "/contact" }}
      />

      <div className="container projects-facts-wrap" aria-label="Repères du portefeuille">
        <dl className="projects-facts">
          <div><dt>{String(projects.length).padStart(2, "0")}</dt><dd>Programmes présentés</dd></div>
          <div><dt>{String(expertises.length).padStart(2, "0")}</dt><dd>Expertises mobilisables</dd></div>
          <div><dt>360°</dt><dd>Du cadrage au support</dd></div>
          <div><dt>RDC</dt><dd>Conception et terrain</dd></div>
        </dl>
      </div>

      <section className="section flagship-project-section">
        <div className="container">
          <div className="flagship-project-label"><span>PROJET PHARE</span><small>TRANSFORMATION INSTITUTIONNELLE · RDC</small></div>
          <div className="flagship-project-intro">
            <div><div className="eyebrow dark">PROGRAMME STRUCTURANT</div><h2>Transformation numérique des forces de défense et de sécurité.</h2></div>
            <p>Un parcours construit dans la durée, de la modernisation documentaire à l’identification biométrique et au contrôle des effectifs.</p>
          </div>
          <div className="flagship-project-timeline">
            <article>
              <div className="flagship-period"><strong>2013 — 2017</strong><span>VOLET 01</span></div>
              <div><h3>Transformation numérique des Forces Armées</h3><p>Déploiement de solutions de Gestion Électronique des Documents et d’archivage électronique afin de sécuriser et moderniser les processus administratifs.</p></div>
            </article>
            <article>
              <div className="flagship-period"><strong>2022</strong><span>VOLET 02</span></div>
              <div><h3>Recensement biométrique des personnels militaires</h3><p>Développement et déploiement d’un système de recensement, d’enrôlement et de contrôle biométrique.</p></div>
            </article>
            <article>
              <div className="flagship-period"><strong>2026</strong><span>VOLET 03</span></div>
              <div><h3>Extension à la Police Nationale Congolaise</h3><p>Mise en œuvre de solutions d’identification et de contrôle des effectifs, avec production de cartes biométriques de contrôle.</p></div>
            </article>
          </div>
          <div className="flagship-project-footer"><span>GESTION DOCUMENTAIRE</span><span>BIOMÉTRIE</span><span>IDENTIFICATION</span><span>CONTRÔLE DES EFFECTIFS</span></div>
        </div>
      </section>

      <section className="section projects-portfolio-section">
        <div className="container">
          <div className="section-heading split-heading projects-portfolio-heading">
            <div><div className="eyebrow dark">FICHES DÉTAILLÉES</div><h2>Trois réalisations, documentées par périmètre.</h2></div>
            <p>Chaque fiche précise le contexte publié, les capacités mobilisées et le cadre d’intervention communiqué par ABA.</p>
          </div>
          <aside className="projects-disclosure">
            <strong>PÉRIMÈTRE DE PUBLICATION</strong>
            <p>Pour respecter les obligations de confidentialité, les fiches publiques présentent les principes et capacités sans exposer les données sensibles, architectures détaillées ni informations opérationnelles des organisations accompagnées.</p>
          </aside>
          <div className="project-list">
            {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
          </div>
        </div>
      </section>

      <section className="section muted-section projects-lifecycle-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">CYCLE DE RÉALISATION</div><h2>Passer de l’ambition à une capacité réellement exploitable.</h2></div>
            <p>La montée en charge intervient après validation progressive des usages, des risques et des conditions d’exploitation.</p>
          </div>
          <div className="projects-lifecycle">
            {lifecycle.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-section projects-principles-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow">PRINCIPES NON NÉGOCIABLES</div><h2>La crédibilité se construit dans l’exécution.</h2></div>
            <p>Quatre exigences structurent la conduite des projets ABA, quelle que soit leur taille.</p>
          </div>
          <div className="project-principles-grid">
            <div><span>01</span><h3>Confidentialité</h3><p>Les informations sensibles sont traitées selon le besoin d’en connaître et les exigences de l’organisation.</p></div>
            <div><span>02</span><h3>Interopérabilité</h3><p>Les solutions sont pensées pour dialoguer avec les systèmes autorisés et éviter les silos inutiles.</p></div>
            <div><span>03</span><h3>Transfert</h3><p>La documentation et la montée en compétence des équipes font partie intégrante de la mission.</p></div>
            <div><span>04</span><h3>Mesure</h3><p>Chaque projet s’appuie sur des indicateurs de qualité, d’avancement, de disponibilité et d’impact.</p></div>
          </div>
        </div>
      </section>

      <CTA title="Structurons ensemble votre prochain programme stratégique." />
    </>
  );
}
