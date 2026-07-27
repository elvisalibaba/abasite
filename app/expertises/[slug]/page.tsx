import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { expertises } from "@/lib/site-data";
import SafeImage from "@/components/media/SafeImage";

const biometricTerms = ["Empreintes digitales", "Reconnaissance faciale", "Capture de l’iris", "Authentification 1:1", "Identification 1:N", "Preuve de présence", "Contrôle d’identité", "Enrôlement sécurisé"];
const biometricProcess = ["Analyse", "Audit", "Conception", "Préparation", "Enrôlement", "Contrôle qualité", "Détection des doublons", "Synchronisation", "Supervision", "Maintenance"];
const biometricSectors = ["Police", "Administration", "Armée", "Banques", "Entreprises", "Écoles", "Santé", "Contrôle d’accès", "Programmes sociaux", "Télécommunications"];

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return expertises.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = expertises.find((expertise) => expertise.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function ExpertiseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = expertises.find((expertise) => expertise.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHero
        eyebrow={`EXPERTISE ${item.number}`}
        title={item.title}
        description={item.summary}
        accent={item.accent}
        cta={{ label: "Échanger avec un expert", href: "/contact" }}
      />

      <section className="section">
        <div className="container detail-intro-grid">
          <div>
            <div className="detail-index">{item.number}</div>
            <div className={`detail-emblem service-symbol-${item.accent}`}>ABA</div>
          </div>
          <div className="section-copy">
            <div className="eyebrow dark">NOTRE APPROCHE</div>
            <h2>Une expertise reliée aux résultats opérationnels.</h2>
            <p className="lead">{item.description}</p>
          </div>
        </div>
      </section>

      {item.slug === "biometrie-identite-numerique" ? (
        <>
          <section className="section biometric-definition">
            <div className="container biometric-split">
              <div className="biometric-photo"><SafeImage src="/images/aba/expertises/biometrie/enrolement.webp" alt="Opération d’enrôlement biométrique ABA" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 48vw" /></div>
              <div className="section-copy"><div className="eyebrow dark">COMPRENDRE LA BIOMÉTRIE</div><h2>Relier une personne à une identité vérifiable.</h2><p className="lead">La biométrie utilise des caractéristiques physiques pour confirmer une identité ou rechercher une correspondance dans un référentiel autorisé.</p><div className="term-grid">{biometricTerms.map(term => <span key={term}>{term}</span>)}</div></div>
            </div>
          </section>
          <section className="section muted-section">
            <div className="container"><div className="section-heading split-heading"><div><div className="eyebrow dark">CHAÎNE DE CONFIANCE</div><h2>Un projet biométrique en dix étapes.</h2></div><p>Chaque phase protège la qualité des données, la continuité des opérations et les droits d’accès.</p></div><ol className="biometric-process">{biometricProcess.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,"0")}</span><strong>{step}</strong></li>)}</ol></div>
          </section>
          <section className="section">
            <div className="container"><div className="section-heading centered"><div className="eyebrow dark">SECTEURS CONCERNÉS</div><h2>Des usages adaptés à chaque responsabilité.</h2></div><div className="sector-grid">{biometricSectors.map(sector=><article key={sector}><span aria-hidden="true">●</span><h3>{sector}</h3></article>)}</div></div>
          </section>
        </>
      ) : null}

      <section className="section dark-section">
        <div className="container detail-columns">
          <div>
            <div className="eyebrow">SERVICES</div>
            <h2>Ce que nous mettons en œuvre.</h2>
          </div>
          <div className="check-list">
            {item.services.map((service, index) => (
              <div key={service}><span>{String(index + 1).padStart(2, "0")}</span><strong>{service}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <div className="eyebrow dark">RÉSULTATS ATTENDUS</div>
            <h2>Des bénéfices visibles et mesurables.</h2>
          </div>
          <div className="outcomes-grid">
            {item.outcomes.map((outcome, index) => (
              <article key={outcome}><span>{String(index + 1).padStart(2, "0")}</span><h3>{outcome}</h3></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">MÉTHODE</div><h2>Une progression maîtrisée.</h2></div>
            <p>Chaque phase produit des éléments vérifiables avant d’engager la suivante.</p>
          </div>
          <div className="process-grid">
            {item.process.map((step, index) => (
              <article key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></article>
            ))}
          </div>
          <div className="section-end-link center-link">
            <Link className="text-link" href="/expertises">Retour aux expertises <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <CTA title={`Parlons de votre besoin en ${item.shortTitle.toLowerCase()}.`} />
    </>
  );
}
