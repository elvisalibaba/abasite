"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { createUserAction, deleteContentAction, deleteDocumentAction, deleteMediaAction, deleteServiceAction, saveContentAction, saveServiceAction, updateDocumentStateAction, updateUserRoleAction, uploadDocumentAction, uploadMediaAction, type ActionResult } from "@/app/admin/actions";
import AdminOperations from "./AdminOperations";

type Service = { id: string; title: string; slug: string; summary: string; image_url: string | null; icon: string; link: string; position: number; published: boolean };
type Content = { id: string; page: string; section: string; content_key: string; label: string; value: string; content_type: string; updated_at: string };
type Media = { id: string; name: string; path: string; public_url: string; alt_text: string; size_bytes: number; created_at: string };
type DocumentAsset = { id:string; title:string; description:string; category:string; folder:string; version:string; path:string; original_name:string; mime_type:string; size_bytes:number; status:string; visibility:string; created_at:string };
type User = { id: string; full_name: string; role: string; email: string; created_at: string };
type Modal = { type: "service"; item?: Service } | { type: "content"; item?: Content } | { type: "media" } | { type:"document" } | { type: "user" } | null;

export default function AdminDashboard({ view="overview",currentUserId,services, contents, media, documents, users, members, conversations,chatMessages,isAdmin, role, projects, tasks, submissions, comments, checklist, activity, events, notes, cards, mails, setupError }: { view?:string;currentUserId:string;services: Service[]; contents: Content[]; media: Media[]; documents:DocumentAsset[]; users: User[]; members:any[];conversations:any[];chatMessages:any[]; isAdmin: boolean; role: string; projects: any[]; tasks:any[]; submissions:any[]; comments:any[]; checklist:any[]; activity:any[]; events: any[]; notes: any[]; cards: any[]; mails: any[]; setupError: string }) {
  const [modal, setModal] = useState<Modal>(null);
  const [notice, setNotice] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();
  const pages = useMemo(() => new Set(contents.map((item) => item.page)).size, [contents]);

  function run(action: () => Promise<ActionResult>, close = false) {
    startTransition(async () => {
      const result = await action(); setNotice(result);
      if (result.ok && close) setModal(null);
      if (result.ok) setTimeout(() => window.location.reload(), 550);
    });
  }
  function submit(form: HTMLFormElement, action: (data: FormData) => Promise<ActionResult>) { run(() => action(new FormData(form)), true); }
  function confirmDelete(label: string, action: () => Promise<ActionResult>) { if (window.confirm(`Supprimer ${label} ? Cette action est définitive.`)) run(action); }

  return (
    <>
      <header className="admin-topbar"><div><small>ESPACE DE GESTION</small><h1>{view==="overview"?"Vue d’ensemble":({projects:"Projets",tasks:"Tâches",submissions:"Demandes",activity:"Activité",calendar:"Calendrier",notes:"Notes",cards:"Cartes",mail:"Messagerie",contents:"Contenus",services:"Services",media:"Médiathèque",documents:"Banque de documents",users:"Utilisateurs"} as Record<string,string>)[view]||"Administration"}</h1></div><button className="admin-avatar">AD</button></header>
      <div className="admin-content admin-module-page" data-module={view}>
        {notice && <div className={`admin-toast ${notice.ok ? "success" : "error"}`}>{notice.message}<button onClick={() => setNotice(null)}>×</button></div>}
        {setupError && <div className="admin-setup-warning"><strong>Configuration Supabase requise</strong><span>{setupError}. Exécutez la migration SQL fournie dans <code>supabase/migrations/001_admin_cms.sql</code>.</span></div>}

        <section id="overview" className="admin-welcome">
          <div><span>VENDREDI · ADMINISTRATION ABA</span><h2>Gardez votre site à jour.</h2><p>Gérez vos contenus, services, médias et accès depuis un espace unique et sécurisé.</p></div>
          <button onClick={() => setModal({ type: "content" })}>+ Ajouter un contenu</button>
        </section>
        <section className="admin-stats">
          <article><span className="red">▦</span><div><strong>{projects.filter(item=>item.status!=="termine").length}</strong><small>Projets actifs</small></div></article>
          <article><span className="dark">✓</span><div><strong>{tasks.filter(item=>item.status!=="termine").length}</strong><small>Tâches ouvertes</small></div></article>
          <article><span className="gold">⇩</span><div><strong>{submissions.filter(item=>item.status==="soumis").length}</strong><small>Nouvelles demandes</small></div></article>
          <article><span className="blue">□</span><div><strong>{events.length}</strong><small>Événements à venir</small></div></article>
        </section>
        <section className="admin-overview-grid">
          {[['projects','▦','Projets','Planification, priorités et progression'],['tasks','✓','Tâches','Tableau Kanban et échéances'],['submissions','⇩','Demandes','Dossiers reçus des visiteurs'],['calendar','□','Calendrier','Réunions et événements'],['mail','✉','Messagerie','Communications ABA'],['contents','✎','Site public','Contenus et publications']].map(item=><Link href={`/admin/${item[0]}`} key={item[0]}><i>{item[1]}</i><div><strong>{item[2]}</strong><small>{item[3]}</small></div><span>→</span></Link>)}
        </section>

        <AdminOperations view={view} currentUserId={currentUserId} role={role} users={users} members={members} conversations={conversations} chatMessages={chatMessages} projects={projects} tasks={tasks} submissions={submissions} comments={comments} checklist={checklist} activity={activity} events={events} notes={notes} cards={cards} mails={mails} canManage={["admin", "direction"].includes(role)} />

        <AdminSection id="contents" title="Contenus du site" subtitle={`${pages} page${pages > 1 ? "s" : ""} configurée${pages > 1 ? "s" : ""}`} actionLabel="Nouveau contenu" onAction={() => setModal({ type: "content" })}>
          <div className="admin-table-wrap"><table><thead><tr><th>Libellé</th><th>Page / section</th><th>Type</th><th>Valeur</th><th /></tr></thead><tbody>
            {contents.map(item => <tr key={item.id}><td><strong>{item.label}</strong><small>{item.content_key}</small></td><td><span className="admin-pill">{item.page}</span> {item.section}</td><td>{item.content_type}</td><td className="admin-truncate">{item.value}</td><td><div className="admin-row-actions"><button onClick={() => setModal({ type: "content", item })}>Modifier</button><button className="danger" onClick={() => confirmDelete(`« ${item.label} »`, () => deleteContentAction(item.id))}>×</button></div></td></tr>)}
            {!contents.length && <EmptyRow text="Aucun contenu dynamique. Ajoutez votre premier bloc." />}
          </tbody></table></div>
        </AdminSection>

        <AdminSection id="services" title="Cartes de services" subtitle="Créez et publiez les offres affichées sur le site" actionLabel="Créer une carte" onAction={() => setModal({ type: "service" })}>
          <div className="admin-card-grid">
            {services.map(item => <article className="admin-service-card" key={item.id}>{item.image_url ? <img src={item.image_url} alt="" /> : <div className="admin-service-placeholder">ABA</div>}<div><span className={item.published ? "status live" : "status draft"}>{item.published ? "Publié" : "Brouillon"}</span><h3>{item.title}</h3><p>{item.summary || "Aucune description"}</p><footer><button onClick={() => setModal({ type: "service", item })}>Modifier</button><button className="danger" onClick={() => confirmDelete(`« ${item.title} »`, () => deleteServiceAction(item.id))}>Supprimer</button></footer></div></article>)}
            {!services.length && <div className="admin-empty-card"><strong>Aucune carte de service</strong><p>Créez votre première offre en quelques secondes.</p></div>}
          </div>
        </AdminSection>

        <AdminSection id="media" title="Médiathèque" subtitle="Images JPG, PNG, WebP, GIF ou SVG · 10 Mo maximum" actionLabel="Importer une image" onAction={() => setModal({ type: "media" })}>
          <div className="admin-media-grid">
            {media.map(item => <figure key={item.id}><img src={item.public_url} alt={item.alt_text || item.name} /><figcaption><strong title={item.name}>{item.name}</strong><small>{(item.size_bytes / 1024).toFixed(0)} Ko</small><div><button onClick={() => { navigator.clipboard.writeText(item.public_url); setNotice({ ok: true, message: "Lien copié." }); }}>Copier le lien</button><button className="danger" onClick={() => confirmDelete(`l’image « ${item.name} »`, () => deleteMediaAction(item.id, item.path))}>×</button></div></figcaption></figure>)}
            {!media.length && <div className="admin-empty-card"><strong>Médiathèque vide</strong><p>Importez des images pour les réutiliser dans vos contenus.</p></div>}
          </div>
        </AdminSection>

        <AdminSection id="documents" title="Banque de documents" subtitle={`${documents.length} fichier${documents.length>1?"s":""} · dossiers, versions et publication contrôlée`} actionLabel={isAdmin||role==="direction"?"Ajouter un document":undefined} onAction={() => setModal({type:"document"})}>
          <div className="admin-document-summary"><div><strong>{documents.filter(item=>item.status==="published").length}</strong><span>Publiés</span></div><div><strong>{documents.filter(item=>item.status==="draft").length}</strong><span>Brouillons</span></div><div><strong>{new Set(documents.map(item=>item.folder)).size}</strong><span>Dossiers</span></div><a href="/documents" target="_blank">Voir la bibliothèque publique ↗</a></div>
          <div className="admin-document-list">{documents.map(item=><article key={item.id}><div className="admin-document-icon">{item.mime_type.includes("pdf")?"PDF":"DOC"}</div><div className="admin-document-copy"><span>{item.folder} / {item.category}</span><h3>{item.title}</h3><small>{item.original_name} · v{item.version} · {(item.size_bytes/1048576).toFixed(1)} Mo</small></div><div className="admin-document-controls"><select value={item.status} onChange={event=>run(()=>updateDocumentStateAction(item.id,event.target.value,item.visibility))}><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select><select value={item.visibility} onChange={event=>run(()=>updateDocumentStateAction(item.id,item.status,event.target.value))}><option value="internal">Interne</option><option value="public">Public</option></select><button className="danger" onClick={()=>confirmDelete(`le document « ${item.title} »`,()=>deleteDocumentAction(item.id,item.path))}>Supprimer</button></div></article>)}{!documents.length&&<div className="admin-empty-card"><strong>Banque documentaire vide</strong><p>Créez un dossier logique et importez le premier document validé.</p></div>}</div>
        </AdminSection>

        <AdminSection id="users" title="Comptes utilisateurs" subtitle={isAdmin ? "Invitez les utilisateurs et attribuez leurs rôles" : "Section réservée aux administrateurs"} actionLabel={isAdmin ? "Inviter un utilisateur" : undefined} onAction={() => setModal({ type: "user" })}>
          {isAdmin ? <div className="admin-table-wrap"><table><thead><tr><th>Utilisateur</th><th>E-mail</th><th>Rôle</th><th>Créé le</th></tr></thead><tbody>{users.map(item => <tr key={item.id}><td><strong>{item.full_name || "Sans nom"}</strong></td><td>{item.email}</td><td><select value={item.role} onChange={event => run(() => updateUserRoleAction(item.id, event.target.value))}><option value="admin">Administrateur</option><option value="direction">Direction</option><option value="chef_projet">Chef de projet</option><option value="personnel">Personnel</option><option value="garde">Garde</option><option value="externe">Externe</option><option value="visiteur">Visiteur</option></select></td><td>{new Date(item.created_at).toLocaleDateString("fr-FR")}</td></tr>)}</tbody></table></div> : <div className="admin-empty-card"><strong>Accès limité</strong><p>Votre rôle permet d’accéder aux outils opérationnels autorisés.</p></div>}
        </AdminSection>
      </div>

      {modal && <div className="admin-modal-backdrop" onMouseDown={() => setModal(null)}><div className="admin-modal" onMouseDown={event => event.stopPropagation()}><button className="admin-modal-close" onClick={() => setModal(null)}>×</button>
        {modal.type === "service" && <EntityForm title={modal.item ? "Modifier le service" : "Nouveau service"} subtitle="Configurez la carte et son état de publication." onSubmit={form => submit(form, saveServiceAction)} pending={pending}>
          <input type="hidden" name="id" defaultValue={modal.item?.id} /><Field label="Titre *"><input name="title" defaultValue={modal.item?.title} required /></Field><div className="admin-form-row"><Field label="Slug"><input name="slug" defaultValue={modal.item?.slug} placeholder="généré automatiquement" /></Field><Field label="Ordre"><input name="position" type="number" defaultValue={modal.item?.position ?? services.length} /></Field></div><Field label="Résumé"><textarea name="summary" rows={4} defaultValue={modal.item?.summary} /></Field><Field label="URL de l’image"><input name="image_url" type="url" defaultValue={modal.item?.image_url || ""} placeholder="Collez un lien de la médiathèque" /></Field><div className="admin-form-row"><Field label="Lien"><input name="link" defaultValue={modal.item?.link || "/contact"} /></Field><Field label="Icône"><input name="icon" defaultValue={modal.item?.icon || "↗"} /></Field></div><label className="admin-check"><input name="published" type="checkbox" defaultChecked={modal.item?.published} /> Publier cette carte</label>
        </EntityForm>}
        {modal.type === "content" && <EntityForm title={modal.item ? "Modifier le contenu" : "Nouveau contenu"} subtitle="Ajoutez une valeur éditable à une page du site." onSubmit={form => submit(form, saveContentAction)} pending={pending}>
          <input type="hidden" name="id" defaultValue={modal.item?.id} /><div className="admin-form-row"><Field label="Page *"><input name="page" defaultValue={modal.item?.page || "accueil"} required /></Field><Field label="Section *"><input name="section" defaultValue={modal.item?.section || "hero"} required /></Field></div><Field label="Libellé dans l’admin *"><input name="label" defaultValue={modal.item?.label} placeholder="Titre principal" required /></Field><div className="admin-form-row"><Field label="Clé unique *"><input name="content_key" defaultValue={modal.item?.content_key} placeholder="titre_principal" required /></Field><Field label="Type"><select name="content_type" defaultValue={modal.item?.content_type || "text"}><option value="text">Texte court</option><option value="textarea">Texte long</option><option value="image">Image</option><option value="link">Lien</option></select></Field></div><Field label="Valeur"><textarea name="value" rows={6} defaultValue={modal.item?.value} /></Field>
        </EntityForm>}
        {modal.type === "media" && <EntityForm title="Importer une image" subtitle="L’image sera stockée de façon sécurisée dans Supabase Storage." onSubmit={form => submit(form, uploadMediaAction)} pending={pending} multipart><Field label="Fichier image *"><input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" required /></Field><Field label="Texte alternatif"><input name="alt_text" placeholder="Décrivez l’image pour l’accessibilité" /></Field></EntityForm>}
        {modal.type === "document" && <EntityForm title="Ajouter à la banque documentaire" subtitle="Classez, versionnez et choisissez précisément la visibilité du fichier." onSubmit={form=>submit(form,uploadDocumentAction)} pending={pending} multipart><Field label="Fichier *"><input name="file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" required/></Field><Field label="Titre du document *"><input name="title" required/></Field><Field label="Description"><textarea name="description" rows={3}/></Field><div className="admin-form-row"><Field label="Dossier"><input name="folder" placeholder="Ex. Institutionnel" defaultValue="Général"/></Field><Field label="Catégorie"><select name="category"><option>Institutionnel</option><option>Technique</option><option>Services</option><option>Projets</option><option>Administration</option></select></Field></div><div className="admin-form-row"><Field label="Version"><input name="version" defaultValue="1.0"/></Field><Field label="État"><select name="status"><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select></Field></div><Field label="Visibilité"><select name="visibility"><option value="internal">Interne uniquement</option><option value="public">Public sur aba.cd/documents</option></select></Field></EntityForm>}
        {modal.type === "user" && <EntityForm title="Inviter un utilisateur" subtitle="ABA crée un accès sécurisé et envoie le lien de connexion avec un mot de passe temporaire." onSubmit={form => submit(form, createUserAction)} pending={pending}><Field label="Nom complet *"><input name="full_name" required /></Field><div className="admin-form-row"><Field label="Adresse e-mail *"><input name="email" type="email" required /></Field><Field label="WhatsApp *"><input name="whatsapp_phone" type="tel" placeholder="+243…" required /></Field></div><Field label="Rôle à attribuer"><select name="role" defaultValue="personnel"><option value="personnel">Agent / Personnel</option><option value="chef_projet">Chef de projet</option><option value="garde">Garde</option><option value="externe">Collaborateur externe</option><option value="direction">Direction</option><option value="admin">Administrateur</option></select></Field></EntityForm>}
      </div></div>}
    </>
  );
}

function AdminSection({ id, title, subtitle, actionLabel, onAction, children }: { id: string; title: string; subtitle: string; actionLabel?: string; onAction: () => void; children: React.ReactNode }) { return <section id={id} className="admin-panel"><header><div><h2>{title}</h2><p>{subtitle}</p></div>{actionLabel && <button onClick={onAction}>+ {actionLabel}</button>}</header>{children}</section>; }
function EmptyRow({ text }: { text: string }) { return <tr><td colSpan={5} className="admin-empty-row">{text}</td></tr>; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="admin-field"><span>{label}</span>{children}</label>; }
function EntityForm({ title, subtitle, onSubmit, pending, children, multipart }: { title: string; subtitle: string; onSubmit: (form: HTMLFormElement) => void; pending: boolean; children: React.ReactNode; multipart?: boolean }) { return <form encType={multipart ? "multipart/form-data" : undefined} onSubmit={event => { event.preventDefault(); onSubmit(event.currentTarget); }}><header><span>ABA · ADMIN</span><h2>{title}</h2><p>{subtitle}</p></header><div className="admin-form-body">{children}</div><footer><button type="submit" className="admin-primary-button" disabled={pending}>{pending ? "Enregistrement…" : "Enregistrer"}</button></footer></form>; }
