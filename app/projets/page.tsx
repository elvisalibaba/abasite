import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Projets stratégiques",
  description: "Découvrez les domaines de projets structurés par Africa Business Agency pour les institutions et organisations."
};

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

      <section className="section">
        <div className="container project-list">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}
        </div>
      </section>

      <section className="section dark-section">
        <div className="container project-principles-grid">
          <div><span>01</span><h3>Confidentialité</h3><p>Les informations sensibles sont traitées selon le besoin d’en connaître et les exigences de l’organisation.</p></div>
          <div><span>02</span><h3>Interopérabilité</h3><p>Les solutions sont pensées pour dialoguer avec les systèmes autorisés et éviter les silos inutiles.</p></div>
          <div><span>03</span><h3>Transfert</h3><p>La documentation et la montée en compétence des équipes font partie intégrante de la mission.</p></div>
          <div><span>04</span><h3>Mesure</h3><p>Chaque projet s’appuie sur des indicateurs de qualité, d’avancement, de disponibilité et d’impact.</p></div>
        </div>
      </section>

      <CTA title="Structurons ensemble votre prochain programme stratégique." />
    </>
  );
}
