import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { projects } from "@/lib/site-data";
import { projectDetails } from "@/data/project-details";
import SafeImage from "@/components/media/SafeImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const detail = projectDetails[project.slug];
  if (!detail) notFound();
  const similar = projects.filter(item => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={project.category.toUpperCase()}
        title={project.title}
        description={project.summary}
        accent={project.accent}
        cta={{ label: "Discuter d’un projet similaire", href: "/contact" }}
      />

      <section className="section">
        <div className="container case-study-grid">
          <aside>
            <span>TYPE DE PROGRAMME</span>
            <strong>{project.status}</strong>
            <span>DOMAINES MOBILISÉS</span>
            <div className="project-tags light-tags">{project.services.map((service) => <em key={service}>{service}</em>)}</div>
            <span>ANNÉE</span><strong>{project.year}</strong>
            <span>TECHNOLOGIES</span><strong>{project.technology}</strong>
          </aside>
          <div className="case-study-copy">
            <div className="case-block"><span>01</span><div><h2>Le contexte</h2><p>{detail.context}</p></div></div>
            <div className="case-block"><span>02</span><div><h2>La problématique</h2><p>{project.challenge}</p></div></div>
            <div className="case-block"><span>03</span><div><h2>La réponse ABA</h2><p>{project.solution}</p></div></div>
          </div>
        </div>
      </section>

      <section className="project-wide-media">
        <SafeImage src={project.image} alt={`Vue principale du projet ${project.title}`} width={1800} height={1050} sizes="100vw" priority />
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow dark">OBJECTIFS</div><h2>Les résultats qui orientent le programme.</h2></div><p>Les objectifs servent de critères d’arbitrage pendant la conception, le pilote et la généralisation.</p></div>
          <div className="project-objectives">{detail.objectives.map((objective,index)=><article key={objective}><span>{String(index+1).padStart(2,"0")}</span><h3>{objective}</h3></article>)}</div>
        </div>
      </section>

      <section className="section project-architecture-section">
        <div className="container">
          <div className="section-heading centered"><div className="eyebrow dark">ARCHITECTURE</div><h2>Un système organisé en couches complémentaires.</h2></div>
          <div className="architecture-flow">{detail.architecture.map((layer,index)=><article key={layer.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{layer.title}</h3><p>{layer.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container project-method-layout">
          <div><div className="eyebrow">MÉTHODE ET DÉPLOIEMENT</div><h2>Avancer par preuves, puis passer à l’échelle.</h2><p>{detail.deployment}</p></div>
          <ol>{detail.stages.map((stage,index)=><li key={stage.title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow dark">GALERIE DU PROJET</div><h2>Le dispositif dans son environnement opérationnel.</h2></div><p>Les visuels officiels pourront être ajoutés progressivement dans les emplacements préparés.</p></div>
          <div className="project-gallery">{detail.gallery.map((image,index)=><div className={index===0?"gallery-feature":""} key={image}><SafeImage src={`/images/aba/projects/${project.slug}/${image}`} alt={`${project.title} — vue ${index+1}`} width={index===0?1600:1200} height={index===0?1000:800} sizes={index===0?"(max-width: 900px) 100vw, 66vw":"(max-width: 900px) 100vw, 33vw"}/></div>)}</div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading centered"><div className="eyebrow dark">DIFFICULTÉS ET RÉPONSES</div><h2>Concevoir pour les contraintes réelles.</h2></div>
          <div className="challenge-response">{detail.difficulties.map((item,index)=><article key={item.challenge}><div><span>DÉFI {String(index+1).padStart(2,"0")}</span><h3>{item.challenge}</h3></div><div><span>RÉPONSE ABA</span><p>{item.response}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow">IMPACTS RECHERCHÉS</div>
            <h2>Ce que le programme doit améliorer.</h2>
          </div>
          <div className="impact-grid">
            {detail.results.map((impact, index) => <article key={impact}><span>{String(index + 1).padStart(2, "0")}</span><h3>{impact}</h3></article>)}
          </div>
          <div className="section-end-link center-link">
            <Link className="text-link light-link" href="/projets">Retour aux projets <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="section similar-projects-section">
        <div className="container"><div className="section-heading split-heading"><div><div className="eyebrow dark">PROJETS SIMILAIRES</div><h2>Explorer d’autres dispositifs ABA.</h2></div><Link className="text-link" href="/projets">Tous les projets <ArrowRight /></Link></div><div className="similar-projects">{similar.map(item=><Link href={`/projets/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><strong>Découvrir <ArrowRight /></strong></Link>)}</div></div>
      </section>

      <CTA title="Votre organisation fait face à un défi comparable ?" />
    </>
  );
}
