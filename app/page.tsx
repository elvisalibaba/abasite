import Link from "next/link";
import CTA from "@/components/CTA";
import ExpertiseCard from "@/components/ExpertiseCard";
import NewsCard from "@/components/NewsCard";
import { ArrowRight } from "@/components/Icons";
import { documents, expertises, news, projects } from "@/lib/site-data";
import SafeImage from "@/components/media/SafeImage";
import AnimatedSection from "@/components/motion/AnimatedSection";
import ParallaxImage from "@/components/motion/ParallaxImage";

export default function Home() {
  return (
    <>
      <section className="hero premium-hero">
        <div className="hero-grid-pattern" />
        <div className="container hero-content">
          <AnimatedSection className="hero-copy">
            <div className="eyebrow">PARTENAIRE TECHNOLOGIQUE INSTITUTIONNEL</div>
            <h1>Nous concevons les infrastructures numériques de demain.</h1>
            <p>
              ABA accompagne les institutions et les organisations stratégiques dans la transformation numérique,
              la biométrie, la gouvernance des données, le développement logiciel et l’intégration technologique.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/institution">Découvrir ABA <ArrowRight /></Link>
              <Link className="button secondary" href="/projets">Voir nos projets</Link>
            </div>
          </AnimatedSection>

          <ParallaxImage className="hero-media" >
            <SafeImage src="/images/aba/home/representation-user-experience-interface-design.jpg" alt="Interface numérique et visualisation de données illustrant l’expertise technologique ABA" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            <div className="floating-panel"><span>DE LA STRATÉGIE AU TERRAIN</span><strong>Concevoir · intégrer · déployer</strong></div>
            <div className="hero-trust">Expertise <i /> Intégrité <i /> Performance</div>
          </ParallaxImage>
        </div>
      </section>

      <section className="about-aba section">
        <div className="container">
          <div className="about-aba-heading">
            <div><div className="eyebrow dark">À PROPOS DE ABA</div><span className="about-index">01 / INSTITUTION</span></div>
            <h2>Bâtisseur de souveraineté numérique et technologique.</h2>
          </div>
          <div className="about-aba-grid">
            <AnimatedSection className="about-aba-visual">
              <SafeImage src="/images/aba/home/presentation-aba.webp" alt="Présentation des activités ABA" fill sizes="(max-width: 900px) 100vw, 48vw" />
              <div className="about-visual-panel"><small>NOTRE POSITIONNEMENT</small><strong>Stratégie × Technologie × Terrain</strong></div>
              <span className="about-visual-mark" aria-hidden="true">ABA</span>
            </AnimatedSection>
            <div className="about-aba-copy">
              <p className="lead">Fondée en 2013 par Claude KIKOKA et Christian KIKOKA, Africa Business Agency est une entreprise congolaise spécialisée dans les systèmes numériques, la biométrie et les technologies de sécurité.</p>
              <p>ABA accompagne les institutions publiques, les forces de défense et de sécurité ainsi que les grandes organisations avec des solutions conçues et réalisées par des ingénieurs congolais.</p>
              <div className="about-values">
                <article><span>01</span><div><strong>Expertise</strong><small>Maîtriser le métier et la technologie.</small></div></article>
                <article><span>02</span><div><strong>Intégrité</strong><small>Protéger les données et les responsabilités.</small></div></article>
                <article><span>03</span><div><strong>Performance</strong><small>Produire des résultats mesurables.</small></div></article>
              </div>
              <Link className="about-aba-link" href="/institution"><span>Découvrir notre institution</span><ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="expertise section dark-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">NOS DOMAINES D’INTERVENTION</div>
              <h2>Des compétences réunies autour d’un même objectif.</h2>
            </div>
            <p>
              Concevoir des solutions capables de fonctionner dans la réalité institutionnelle, de la décision initiale jusqu’à l’exploitation quotidienne.
            </p>
          </div>
          <div className="expertise-grid">
            {expertises.map((item) => <ExpertiseCard item={item} key={item.slug} />)}
          </div>
          <div className="section-end-link">
            <Link className="text-link light-link" href="/expertises">Voir toutes nos expertises <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="projects section">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow dark">PROJETS STRATÉGIQUES</div>
            <h2>De l’analyse à la mise en service.</h2>
            <p>ABA structure ses interventions autour de résultats mesurables et de solutions pérennes.</p>
          </div>

          <div className="project-feature">
            <div className="project-image project-image-one"><SafeImage src={projects[0].image} alt={projects[0].title} width={1200} height={900} sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="project-content">
              <span className="project-label">{projects[0].status}</span>
              <h3>{projects[0].title}</h3>
              <p>{projects[0].summary}</p>
              <div className="project-tags">
                {projects[0].services.map((service) => <span key={service}>{service}</span>)}
              </div>
              <Link className="text-link" href={`/projets/${projects[0].slug}`}>Découvrir ce programme <ArrowRight /></Link>
            </div>
          </div>

          <div className="project-mini-grid">
            {projects.slice(1).map((project, index) => (
              <article key={project.slug}>
                <Link className="project-mini-media" href={`/projets/${project.slug}`} aria-label={`Découvrir ${project.title}`}>
                  <SafeImage src={project.image} alt={`Projet ABA — ${project.title}`} width={800} height={600} sizes="(max-width: 767px) 50vw, 33vw" />
                  <span>{String(index + 2).padStart(2, "0")}</span>
                </Link>
                <div className="project-mini-content">
                  <small>{project.category}</small>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-mini-footer"><em>{project.technology}</em><Link href={`/projets/${project.slug}`} aria-label={`Ouvrir l’étude de cas ${project.title}`}><ArrowRight /></Link></div>
                </div>
              </article>
            ))}
          </div>
          <div className="section-end-link center-link">
            <Link className="text-link" href="/projets">Explorer tous les projets <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="news section muted-section">
        <div className="container">
          <div className="section-heading split-heading news-heading">
            <div>
              <div className="eyebrow dark">ACTUALITÉS</div>
              <h2>Nos activités et publications.</h2>
            </div>
            <Link className="text-link" href="/actualites">Toutes les actualités <ArrowRight /></Link>
          </div>
          <div className="news-grid">
            {news.map((item) => <NewsCard item={item} key={item.slug} />)}
          </div>
        </div>
      </section>

      <section className="documents section">
        <div className="container documents-grid">
          <div>
            <div className="eyebrow dark">CENTRE DE RESSOURCES</div>
            <h2>Documents et publications institutionnelles.</h2>
            <p>Rapports, notes techniques, présentations de projets et documents de référence publiés par ABA.</p>
            <Link className="text-link" href="/documents">Accéder au centre de ressources <ArrowRight /></Link>
          </div>
          <div className="document-list">
            {documents.slice(0, 3).map((document) => (
              <Link href="/documents" key={document.title}>
                <span><small>{document.type}</small>{document.title}</span>
                <strong>PDF</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
