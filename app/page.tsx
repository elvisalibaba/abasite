import Link from "next/link";
import { ArrowRight, Database, Fingerprint, Network, Shield } from "@/components/Icons";
import SafeImage from "@/components/media/SafeImage";
import AnimatedSection from "@/components/motion/AnimatedSection";
import StaggerContainer from "@/components/motion/StaggerContainer";
import StaggerItem from "@/components/motion/StaggerItem";
import CTA from "@/components/CTA";
import { expertises, news, projects } from "@/lib/site-data";
import { getHomeCms } from "@/lib/cms";

const serviceIcons = [Fingerprint, Database, Network, Shield];

export default async function Home() {
  const cms = await getHomeCms();
  const services = [...expertises.slice(0, 4), ...cms.services].slice(0, 4);

  return (
    <div className="home-app">
      <section className="home-hero">
        <SafeImage
          className="home-hero-image"
          src={cms.content.hero_image || "/images/aba/home/aba-operations-hero.png"}
          alt="Centre technologique ABA dédié à l’identité numérique et aux opérations sécurisées"
          fill
          priority
          sizes="100vw"
        />
        <div className="home-hero-shade" />
        <div className="home-grid-lines" />
        <div className="container home-hero-layout">
          <AnimatedSection className="home-hero-copy">
            <div className="home-status"><i /> Expertise technologique congolaise</div>
            <h1>{cms.content.hero_title || "La technologie qui renforce les institutions."}</h1>
            <p>{cms.content.hero_description || "ABA conçoit, intègre et déploie des infrastructures numériques critiques — identité, données, applications et sécurité — pensées pour le terrain."}</p>
            <div className="home-hero-actions">
              <Link className="home-button home-button-primary" href="/contact">Démarrer un projet <ArrowRight size={18} /></Link>
              <Link className="home-button home-button-glass" href="/expertises">Explorer nos solutions</Link>
            </div>
            <div className="home-proof-row">
              <div><strong>2013</strong><span>Création à Kinshasa</span></div>
              <div><strong>360°</strong><span>Stratégie au déploiement</span></div>
              <div><strong>RDC</strong><span>Expertise locale</span></div>
            </div>
          </AnimatedSection>

        </div>
        <a className="home-scroll" href="#solutions"><span /> Découvrir</a>
      </section>

      <section className="home-trust" aria-labelledby="trust-title">
        <div className="container">
          <div className="home-trust-head">
            <div><span>RÉFÉRENCES & ÉCOSYSTÈME</span><h2 id="trust-title">Des relations institutionnelles et technologiques.</h2></div>
            <p>Les références présentées illustrent l’environnement dans lequel ABA développe, intègre et déploie ses solutions.</p>
          </div>
          <div className="home-logo-rail">
            <a className="home-partner dark" href="https://ancienscombattants.gouv.cd/" target="_blank" rel="noreferrer">
              <SafeImage src="/images/partners/partner-institutionnel.png" alt="Ministère de la Défense Nationale, Cabinet du Ministre Délégué" width={1320} height={300} sizes="(max-width: 700px) 78vw, 440px" />
              <span>Partenaire institutionnel <b>↗</b></span>
            </a>
            <a className="home-partner" href="https://www.coppernic.fr/" target="_blank" rel="noreferrer">
              <SafeImage src="/images/partners/coppernic.png" alt="Coppernic" width={251} height={47} sizes="(max-width: 700px) 65vw, 250px" />
              <span>Partenaire technologique <b>↗</b></span>
            </a>
            <div className="home-partner">
              <SafeImage src="/images/partners/lg.webp" alt="Institution de la République Démocratique du Congo" width={240} height={80} sizes="(max-width: 700px) 65vw, 250px" />
              <span>Écosystème national</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-institution" aria-labelledby="institution-title">
        <div className="container home-institution-layout">
          <div className="home-institution-intro">
            <span className="home-label">ENTREPRISE CONGOLAISE</span>
            <h2 id="institution-title">Un partenaire technologique au service des institutions.</h2>
            <p>Depuis Kinshasa, Africa Business Agency accompagne les organisations publiques et privées dans la conception de systèmes numériques fiables, sécurisés et adaptés aux réalités du terrain.</p>
            <dl>
              <div><dt>2013</dt><dd>Année de création</dd></div>
              <div><dt>Kinshasa</dt><dd>Siège opérationnel</dd></div>
              <div><dt>RDC</dt><dd>Ancrage national</dd></div>
            </dl>
          </div>
          <div className="home-institution-access" aria-label="Accès institutionnels rapides">
            <Link href="/institution"><span>01</span><div><strong>Découvrir l’institution</strong><small>Histoire, mission, gouvernance et valeurs</small></div><ArrowRight size={19}/></Link>
            <Link href="/projets"><span>02</span><div><strong>Consulter nos réalisations</strong><small>Programmes, dispositifs et résultats terrain</small></div><ArrowRight size={19}/></Link>
            <Link href="/documents"><span>03</span><div><strong>Accéder aux documents</strong><small>Présentations et ressources institutionnelles</small></div><ArrowRight size={19}/></Link>
            <Link href="/contact"><span>04</span><div><strong>Présenter un projet</strong><small>Échanger avec notre équipe de direction</small></div><ArrowRight size={19}/></Link>
          </div>
        </div>
      </section>

      <section className="home-solutions" id="solutions">
        <div className="container">
          <div className="home-section-head">
            <div><span className="home-label">01 / EXPERTISES</span><h2>Des expertises coordonnées.<br />Une chaîne technologique maîtrisée.</h2></div>
            <div><p>Nous réunissons conseil, ingénierie, intégration et opérations pour transformer une ambition institutionnelle en système fiable.</p><Link href="/expertises">Toutes nos expertises <ArrowRight size={17} /></Link></div>
          </div>
          <StaggerContainer className="home-bento">
            {services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <StaggerItem className={`home-service service-${index + 1}`} key={service.slug}>
                  <Link href={"number" in service ? `/expertises/${service.slug}` : service.link || "/expertises"}>
                    <div className="service-top"><span>0{index + 1}</span><i><Icon size={24} /></i></div>
                    <div className="service-copy"><small>{index === 0 ? "IDENTIFIER" : index === 1 ? "GOUVERNER" : index === 2 ? "CONNECTER" : "PROTÉGER"}</small><h3>{service.title}</h3><p>{service.summary}</p></div>
                    <div className="service-link">Découvrir <ArrowRight size={17} /></div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="home-projects">
        <div className="container">
          <div className="home-section-head light">
            <div><span className="home-label">02 / RÉALISATIONS</span><h2>Des solutions pensées pour l’échelle.</h2></div>
            <div><p>Une sélection de programmes qui relient enjeux institutionnels, technologie et résultats terrain.</p><Link href="/projets">Tous les projets <ArrowRight size={17} /></Link></div>
          </div>
          <div className="home-project-showcase">
            <Link className="home-project-feature" href={`/projets/${projects[0].slug}`}>
              <SafeImage src={projects[0].image} alt={projects[0].title} fill sizes="(max-width: 900px) 100vw, 66vw" />
              <div className="project-overlay" />
              <div className="project-number">01</div>
              <div className="project-caption"><small>{projects[0].category}</small><h3>{projects[0].title}</h3><p>{projects[0].summary}</p><span>Voir le projet <ArrowRight size={17} /></span></div>
            </Link>
            <div className="home-project-stack">
              {projects.slice(1, 3).map((project, index) => (
                <Link href={`/projets/${project.slug}`} key={project.slug}>
                  <span>0{index + 2}</span><div><small>{project.category}</small><h3>{project.title}</h3></div><ArrowRight size={20} />
                </Link>
              ))}
              <Link className="project-all" href="/projets"><div><small>PORTFOLIO ABA</small><strong>Explorer tous nos projets</strong></div><ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-insights">
        <div className="container">
          <div className="home-section-head compact"><div><span className="home-label">03 / ACTUALITÉS</span><h2>À la une chez ABA.</h2></div><Link href="/actualites">Toutes les actualités <ArrowRight size={17} /></Link></div>
          <div className="home-news-grid">
            {news.slice(0, 3).map((item, index) => (
              <Link href={`/actualites/${item.slug}`} key={item.slug} className={index === 0 ? "featured" : ""}>
                <div className="home-news-meta"><span>{item.category}</span><time dateTime={item.isoDate}>{item.date}</time></div>
                <h3>{item.title}</h3><p>{item.excerpt}</p><i><ArrowRight size={18} /></i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-method" aria-labelledby="home-method-title">
        <div className="container"><div className="home-section-head compact"><div><span className="home-label">04 / MÉTHODE</span><h2 id="home-method-title">Une conduite claire, du besoin au terrain.</h2></div><p>Chaque étape produit une décision, un livrable et des critères de validation partagés.</p></div><div className="home-method-grid">{[["01","Cadrer","Objectifs, responsabilités et risques."],["02","Concevoir","Architecture, usages et sécurité."],["03","Déployer","Intégration, formation et mise en service."],["04","Pérenniser","Support, mesure et transfert de compétences."]].map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <CTA />

    </div>
  );
}
