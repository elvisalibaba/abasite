import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Institution",
  description: "Fondée en 2013, Africa Business Agency bâtit des solutions congolaises de souveraineté numérique, de biométrie et de sécurité."
};

const steps = [
  ["01", "Comprendre", "Analyser l’organisation, ses objectifs, ses contraintes et ses risques réels."],
  ["02", "Auditer", "Évaluer les données, processus, applications, équipements et responsabilités existants."],
  ["03", "Concevoir", "Définir une architecture cible réaliste, sécurisée, interopérable et évolutive."],
  ["04", "Construire", "Développer, intégrer, tester et documenter les composants de la solution."],
  ["05", "Déployer", "Préparer les sites, les équipes, la logistique, la formation et la supervision."],
  ["06", "Pérenniser", "Assurer le support, la gouvernance, l’amélioration continue et le transfert de compétences."]
];

const domains = [
  "Conception, intégration et modernisation des systèmes d’information numériques et digitaux",
  "Gestion, administration et audit des bases de données",
  "Audits financiers et fiabilisation des données de gestion",
  "Fichiers biométriques de recensement des effectifs",
  "Logiciels sur mesure d’enrôlement, d’identification et de contrôle biométrique",
  "Fourniture et intégration de systèmes biométriques et technologiques",
  "Formation, assistance technique et maintenance des solutions déployées"
];

const history = [
  { period: "2013", title: "Création de Africa Business Agency", text: "Fondation de l’entreprise congolaise par Claude KIKOKA, Président, et Christian KIKOKA, Directeur Général." },
  { period: "2013 — 2017", title: "Transformation numérique des Forces Armées", text: "Déploiement de solutions de Gestion Électronique des Documents et d’archivage électronique afin de sécuriser et moderniser les processus administratifs." },
  { period: "2022", title: "Recensement biométrique des personnels militaires", text: "Développement et déploiement d’un système de recensement, d’enrôlement et de contrôle biométrique." },
  { period: "2026", title: "Extension à la Police Nationale Congolaise", text: "Mise en œuvre de solutions d’identification et de contrôle des effectifs, avec production de cartes biométriques de contrôle." }
];

export default function InstitutionPage() {
  return (
    <>
      <PageHero
        eyebrow="NOTRE INSTITUTION"
        title="Bâtisseur de souveraineté numérique et technologique."
        description="Entreprise congolaise fondée en 2013, ABA conçoit des systèmes numériques, biométriques et de sécurité adaptés aux enjeux stratégiques des institutions africaines."
        accent="institution"
        cta={{ label: "Découvrir nos expertises", href: "/expertises" }}
      />

      <section className="section" id="mission">
        <div className="container institution-intro-grid">
          <div className="section-copy">
            <div className="eyebrow dark">QUI SOMMES-NOUS ?</div>
            <h2>Une expertise congolaise au service des institutions stratégiques.</h2>
          </div>
          <div className="rich-copy">
            <p className="lead">
              Fondée en 2013, Africa Business Agency accompagne les institutions publiques, les forces de défense et de sécurité ainsi que les grandes organisations dans leur transformation numérique.
            </p>
            <p>
              ABA intervient dans les systèmes d’information numériques et digitaux, la gestion des données stratégiques, les solutions biométriques ainsi que les technologies de sécurité et de défense.
            </p>
            <p>
              Nos solutions sont conçues, intégrées et déployées en République Démocratique du Congo par des développeurs et ingénieurs congolais, avec une priorité donnée à la sécurité, la fiabilité et la souveraineté.
            </p>
          </div>
        </div>
      </section>

      <section className="section institution-leadership">
        <div className="container leadership-intro">
          <div><div className="eyebrow dark">DIRECTION</div><h2>Une vision portée depuis 2013.</h2></div>
          <div className="leader-cards">
            <article><span>PRÉSIDENT · COFONDATEUR</span><h3>Claude KIKOKA</h3><p>Garant de la vision institutionnelle et du positionnement stratégique de Africa Business Agency.</p></article>
            <article><span>DIRECTEUR GÉNÉRAL · COFONDATEUR</span><h3>Christian KIKOKA</h3><p>Responsable de la conduite opérationnelle, technologique et du déploiement des programmes ABA.</p></article>
          </div>
        </div>
      </section>

      <section className="section dark-section institution-domains">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow">UNE EXPERTISE RECONNUE</div><h2>Une chaîne de compétences complète.</h2></div><p>De l’audit initial à la maintenance, ABA garde la maîtrise des dépendances techniques, opérationnelles et humaines.</p></div>
          <div className="institution-domain-list">{domains.map((domain,index)=><article key={domain}><span>{String(index+1).padStart(2,"0")}</span><h3>{domain}</h3></article>)}</div>
        </div>
      </section>

      <section className="section institution-history">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow dark">NOTRE PARCOURS</div><h2>Des réalisations structurantes depuis 2013.</h2></div><p>Une progression construite autour de la modernisation administrative, de la biométrie et de la sécurisation des données institutionnelles.</p></div>
          <div className="institution-timeline">{history.map((item,index)=><article key={item.period}><div><span>{item.period}</span><i aria-hidden="true" /></div><div><small>ÉTAPE {String(index+1).padStart(2,"0")}</small><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container mission-grid">
          <article>
            <span>NOTRE MISSION</span>
            <h2>Mettre l’innovation au service de la souveraineté.</h2>
            <p>Concevoir, intégrer et maintenir des dispositifs numériques fiables qui renforcent durablement les capacités des institutions.</p>
          </article>
          <article>
            <span>NOTRE VISION</span>
            <h2>Faire rayonner une technologie « made in DRC ».</h2>
            <p>Positionner les développeurs et ingénieurs congolais comme acteurs de référence des transformations technologiques africaines.</p>
          </article>
        </div>
      </section>

      <section className="section" id="valeurs">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow dark">NOS VALEURS</div>
            <h2>Trois principes pour guider chaque intervention.</h2>
          </div>
          <div className="value-cards">
            <article><span>01</span><h3>Expertise</h3><p>Comprendre le métier, maîtriser la technologie et mesurer les conséquences opérationnelles de chaque choix.</p></article>
            <article><span>02</span><h3>Intégrité</h3><p>Protéger les données, documenter les décisions, respecter les responsabilités et communiquer avec transparence.</p></article>
            <article><span>03</span><h3>Performance</h3><p>Rechercher des résultats mesurables, une exploitation simple et une amélioration continue des dispositifs.</p></article>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">NOTRE MÉTHODE</div><h2>Une chaîne d’intervention complète.</h2></div>
            <p>Chaque étape réduit l’incertitude avant la suivante et maintient la solution alignée sur les usages réels.</p>
          </div>
          <div className="method-grid">
            {steps.map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section governance-section">
        <div className="container governance-grid">
          <div className="governance-visual"><strong>ABA</strong><span>GOUVERNANCE • TECHNOLOGIE • OPÉRATIONS</span></div>
          <div className="section-copy">
            <div className="eyebrow dark">NOTRE ENGAGEMENT</div>
            <h2>Construire avec les équipes, pas à leur place.</h2>
            <p className="lead">La pérennité repose sur l’appropriation locale, la documentation et le transfert de compétences.</p>
            <p>ABA associe les parties prenantes aux choix importants, organise la formation et prépare les responsabilités d’exploitation dès la conception.</p>
          </div>
        </div>
      </section>

      <CTA title="Faisons de votre ambition un système opérationnel." />
    </>
  );
}
