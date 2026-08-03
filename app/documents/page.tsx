import type { Metadata } from "next";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";
import { getPublicDocuments } from "@/lib/cms";
import EmptyState from "@/components/public/EmptyState";

export const metadata: Metadata = {
  title: "Centre de ressources",
  description: "Documents institutionnels, notes techniques et fiches de services d’Africa Business Agency."
};

const resourceFamilies = [
  ["01", "Institutionnel", "Présentations, références et documents officiels de l’organisation."],
  ["02", "Technique", "Notes d’approche, architectures de référence et méthodes d’intervention."],
  ["03", "Services", "Fiches synthétiques pour comprendre les offres et résultats attendus."],
  ["04", "Projets", "Documents publics associés aux programmes et retours d’expérience."],
];

const formatSize=(bytes:number)=>bytes>=1048576?`${(bytes/1048576).toFixed(1)} Mo`:`${Math.max(1,Math.round(bytes/1024))} Ko`;

export default async function DocumentsPage() {
  const publishedDocuments=await getPublicDocuments();
  return (
    <>
      <PageHero
        eyebrow="CENTRE DE RESSOURCES"
        title="Les documents utiles pour comprendre notre approche."
        description="Retrouvez les présentations institutionnelles, fiches de services et notes techniques publiées par ABA."
        accent="documents"
      />

      {publishedDocuments.length>0?<div className="container documents-facts-wrap" aria-label="Repères documentaires">
        <dl className="documents-facts">
          <div><dt>{String(publishedDocuments.length).padStart(2,"0")}</dt><dd>Documents publiés</dd></div>
          <div><dt>04</dt><dd>Familles de ressources</dd></div>
          <div><dt>V°</dt><dd>Versions contrôlées</dd></div>
          <div><dt>ABA</dt><dd>Source institutionnelle</dd></div>
        </dl>
      </div>:null}

      <section className="section documents-library-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow dark">BIBLIOTHÈQUE PUBLIQUE</div><h2>Des ressources validées et directement exploitables.</h2></div>
            <p>Chaque fichier publié est classé, daté et associé à une version afin de faciliter son identification.</p>
          </div>
          {publishedDocuments.length>0?<div className="documents-public-list">
            {publishedDocuments.map((document,index)=><article key={document.id}>
              <div className="document-file-mark">{document.mime_type.includes("pdf")?"PDF":"DOC"}</div>
              <div className="document-public-copy"><span>{document.category} · {document.folder}</span><h3>{document.title}</h3><p>{document.description||"Document institutionnel ABA."}</p><small>Version {document.version} · {formatSize(document.size_bytes)}{document.published_at?` · Publié le ${new Date(document.published_at).toLocaleDateString("fr-FR")}`:""}</small></div>
              <a href={document.download_url} target="_blank" rel="noreferrer">Télécharger <span aria-hidden="true">↓</span></a>
              <i>{String(index+1).padStart(2,"0")}</i>
            </article>)}
          </div>:<EmptyState title="Publications officielles en préparation" description="Les documents institutionnels seront disponibles ici après validation. Pour recevoir une présentation ou une fiche de service, contactez directement notre équipe." action="Demander un document"/>}
        </div>
      </section>

      {publishedDocuments.length>0?<section className="section muted-section documents-families-section">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow dark">CLASSEMENT</div><h2>Une bibliothèque organisée selon votre besoin.</h2></div><p>Quatre familles permettent de retrouver rapidement le bon niveau d’information.</p></div>
          <div className="documents-family-grid">{resourceFamilies.map(([number,title,text])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>:null}
      {publishedDocuments.length>0?<section className="section dark-section">
        <div className="container publication-note">
          <div><span>PROCESSUS DE PUBLICATION</span><h2>Des documents validés avant leur mise en ligne.</h2></div>
          <p>Chaque ressource institutionnelle est classée, relue, approuvée, datée et associée à une version afin d’éviter la circulation de documents obsolètes.</p>
        </div>
      </section>:null}
      <CTA title="Vous recherchez un document ou une présentation spécifique ?" />
    </>
  );
}
