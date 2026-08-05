"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import type { CompanyProfile, PersonProfile } from "@/types/identity-studio";
import {ABA_DEPARTMENTS,ABA_STAFF_EMAILS} from "@/config/identity-studio-options";
import LogoABA from "@/components/identity-studio/LogoABA";
import CardPreview from "@/components/identity-studio/cards/CardPreview";
import ServiceCardBack from "@/components/identity-studio/cards/ServiceCardBack";
import ServiceCardFront from "@/components/identity-studio/cards/ServiceCardFront";
import {
  copyRichHtml,
  downloadText,
  fetchAsDataUrl,
  readFileAsDataUrl,
  svgToPngDataUrl,
  downloadDataUrl,
} from "@/lib/identity-studio/browser";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  BUSINESS_CARD_HEIGHT,
  BUSINESS_CARD_WIDTH,
  renderCardBackSvg,
  renderCardFrontSvg,
  renderBusinessCardBackSvg,
  renderPersonalBusinessCardBackSvg,
  renderBusinessCardFrontSvg,
} from "@/lib/identity-studio/card-renderer";

type Tab = "signature" | "card" | "settings";

type Props = {
  company: CompanyProfile;
  initialPerson?: PersonProfile;
  initialCardType?: "service"|"visite";
  signatureOnly?:boolean;
};

const EMPTY_PERSON: PersonProfile = {
  firstName: "Elvis",
  middleName: "",
  lastName: "Makasi",
  jobTitle: "Consultant en transformation numérique institutionnelle",
  department: "Informatique et innovation",
  employeeId: "ABA-0001",
  phone: "+243 000 000 000",
  email: "elvis.makasi@aba.cd",
  photoDataUrl: "",
};

function normalizeWebsite(value: string) {
  return value.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function absoluteAssetUrl(path: string, origin: string) {
  if (/^https?:\/\//i.test(path)) return path;
  if (!origin) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

function Icon({ name }: { name: "mail" | "card" | "settings" | "copy" | "download" | "print" }) {
  const paths: Record<typeof name, ReactNode> = {
    mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
    card: <path d="M3 6h18v12H3zM3 10h18M7 14h4" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" />
      </>
    ),
    copy: <path d="M8 8h11v11H8zM5 16H4V5h11v1" />,
    download: <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" />,
    print: <path d="M7 9V4h10v5M7 18H4v-7h16v7h-3M7 15h10v5H7z" />,
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function IdentityStudio({ company, initialPerson,initialCardType="service",signatureOnly=false }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>(signatureOnly?"signature":"card");
  const [person, setPerson] = useState<PersonProfile>(() => initialPerson ?? EMPTY_PERSON);
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [logoPublicUrl, setLogoPublicUrl] = useState(company.logoPath);
  const [appOrigin, setAppOrigin] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [cardType,setCardType]=useState<"service"|"visite">(initialCardType);

  useEffect(() => {
    fetchAsDataUrl(company.logoPath)
      .then((dataUrl) => {
        setAppOrigin(window.location.origin);
        setLogoDataUrl(dataUrl);
      })
      .catch(() => setLogoDataUrl(""));
  }, [company.logoPath]);

  const notify = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 3500);
  };

  const updatePerson = (key: keyof PersonProfile, value: string) => {
    setPerson((current) => ({ ...current, [key]: value }));
  };

  const onPhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Le fichier sélectionné n'est pas une image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      notify("La photo dépasse 8 Mo.");
      return;
    }
    const dataUrl = await readFileAsDataUrl(file);
    const dimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => reject(new Error("Impossible de vérifier la résolution de la photo."));
      image.src = dataUrl;
    });
    updatePerson("photoDataUrl", dataUrl);
    if (dimensions.width < 800 || dimensions.height < 900) {
      notify("Photo appliquée, mais une image d’au moins 800 × 900 px est recommandée pour l’impression 600 dpi.");
    }
  };

  const onLogoChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Le logo doit être une image PNG, JPEG ou SVG.");
      return;
    }
    setLogoDataUrl(await readFileAsDataUrl(file));
    notify("Logo local appliqué aux aperçus et aux cartes.");
  };

  const frontSvg = useMemo(
    () => cardType==="visite"?renderBusinessCardFrontSvg(person,company,logoDataUrl):renderCardFrontSvg(person, company, logoDataUrl),
    [person, company, logoDataUrl,cardType],
  );

  const backSvg = useMemo(
    () => cardType==="visite"?renderPersonalBusinessCardBackSvg(person,company,logoDataUrl):renderCardBackSvg(person, company, logoDataUrl),
    [person, company, logoDataUrl,cardType],
  );

  const signature = useMemo(() => {
    const fullName = `${person.firstName} ${person.middleName} ${person.lastName}`.replace(/\s+/g, " ").trim() || "Nom Prénom";
    const publicLogo = absoluteAssetUrl(logoPublicUrl || company.logoPath, appOrigin);
    const website = normalizeWebsite(company.website);
    const specialties = company.specialties.slice(0, 3).join(" · ");

    const html = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#142235;max-width:680px;border-collapse:collapse;">
  <tr>
    <td style="padding:0 22px 0 0;vertical-align:middle;border-right:3px solid #e0aa2b;">
      <img src="${escapeHtml(publicLogo)}" width="150" alt="${escapeHtml(company.shortName)}" style="display:block;width:150px;max-width:150px;height:auto;border:0;outline:none;text-decoration:none;" />
    </td>
    <td style="padding:2px 0 2px 22px;vertical-align:middle;">
      <div style="font-size:20px;line-height:25px;font-weight:700;color:#071b33;">${escapeHtml(fullName)}</div>
      <div style="font-size:14px;line-height:20px;font-weight:700;color:#147c92;padding-top:2px;">${escapeHtml(person.jobTitle || "Fonction")}</div>
      ${person.department ? `<div style="font-size:12px;line-height:18px;color:#677589;">${escapeHtml(person.department)}</div>` : ""}
      <div style="font-size:13px;line-height:20px;color:#26374b;padding-top:8px;">
        ${person.phone ? `<strong>T</strong>&nbsp; <a href="tel:${escapeHtml(person.phone.replaceAll(" ", ""))}" style="color:#26374b;text-decoration:none;">${escapeHtml(person.phone)}</a>&nbsp;&nbsp;` : ""}
        ${person.email ? `<strong>E</strong>&nbsp; <a href="mailto:${escapeHtml(person.email)}" style="color:#147c92;text-decoration:none;">${escapeHtml(person.email)}</a>` : ""}
      </div>
      <div style="font-size:12px;line-height:18px;color:#526278;padding-top:3px;">${escapeHtml(company.address)} · ${escapeHtml(company.cityCountry)}</div>
      <div style="font-size:12px;line-height:18px;padding-top:2px;"><a href="${escapeHtml(company.website)}" style="color:#0a5d8b;font-weight:700;text-decoration:none;">${escapeHtml(website)}</a></div>
      <div style="font-size:10px;line-height:15px;color:#8794a5;padding-top:8px;max-width:470px;">${escapeHtml(specialties)}</div>
    </td>
  </tr>
</table>`.trim();

    const plainText = [
      fullName,
      person.jobTitle,
      person.department,
      company.legalName,
      person.phone,
      person.email,
      `${company.address}, ${company.cityCountry}`,
      company.website,
    ]
      .filter(Boolean)
      .join("\n");

    return { html, plainText };
  }, [person, company, logoPublicUrl, appOrigin]);

  const copySignature = async () => {
    try {
      await copyRichHtml(signature.html, signature.plainText);
      notify("Signature copiée. Collez-la maintenant dans l'éditeur de signatures Outlook.");
    } catch (error) {
      console.error(error);
      notify("La copie automatique a échoué. Utilisez le téléchargement HTML.");
    }
  };

  const exportSignatureHtml = () => {
    const page = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Signature ${escapeHtml(person.firstName)} ${escapeHtml(person.lastName)}</title></head><body>${signature.html}</body></html>`;
    downloadText(page, `signature-${person.firstName || "aba"}-${person.lastName || "professionnelle"}.html`, "text/html;charset=utf-8");
    notify("Fichier HTML téléchargé.");
  };

  const exportCard = async (side: "recto" | "verso") => {
    setBusy(true);
    try {
      const svg = side === "recto" ? frontSvg : backSvg;
      const png = await svgToPngDataUrl(svg, cardType==="visite"?BUSINESS_CARD_WIDTH:CARD_WIDTH, cardType==="visite"?BUSINESS_CARD_HEIGHT:CARD_HEIGHT);
      const safeName = `${person.lastName}-${person.firstName}`.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
      downloadDataUrl(png, `carte-aba-${safeName || "personnel"}-${side}-600dpi.png`);
      notify(`${side === "recto" ? "Recto" : "Verso"} exporté en PNG 600 dpi.`);
    } catch (error) {
      console.error(error);
      notify("L'export PNG a échoué.");
    } finally {
      setBusy(false);
    }
  };

  const printCards = (selection: "recto" | "verso" | "complet" = "complet") => {
    const popup = window.open("", "_blank", "width=1100,height=760");
    if (!popup) {
      notify("Le navigateur a bloqué la fenêtre d'impression.");
      return;
    }

    const selectedCards = selection === "recto"
      ? `<section class="card-page">${frontSvg}</section>`
      : selection === "verso"
        ? `<section class="card-page">${backSvg}</section>`
        : `<section class="card-page">${frontSvg}</section><section class="card-page">${backSvg}</section>`;

    popup.document.write(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Cartes ABA - ${escapeHtml(person.firstName)} ${escapeHtml(person.lastName)}</title>
  <style>
    @page { size: ${cardType==="visite"?"85.60mm 53.98mm":"53.98mm 85.60mm"}; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { margin: 0; padding: 0; background: #fff; }
    .card-page { width: ${cardType==="visite"?"85.60mm":"53.98mm"}; height: ${cardType==="visite"?"53.98mm":"85.60mm"}; overflow: hidden; page-break-after: always; break-after: page; }
    .card-page:last-child { page-break-after: auto; break-after: auto; }
    svg { display: block; width: 100%; height: 100%; }
    @media screen {
      body { padding: 24px; background: #e8edf2; display: grid; gap: 24px; justify-content: center; }
      .card-page { box-shadow: 0 14px 40px rgba(0,0,0,.25); }
    }
  </style>
</head>
<body>
  ${selectedCards}
  <script>window.onload=()=>{setTimeout(()=>window.print(),400)}<\/script>
</body>
</html>`);
    popup.document.close();
    notify(`Export PDF ${selection} ouvert au format CR80.`);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <LogoABA className="brand-logo" priority variant="surface" />
          <div>
            <strong>Identity Studio</strong>
            <span>Cartes & signatures</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Modules">
          <button className={activeTab === "signature" ? "nav-item active" : "nav-item"} onClick={() => setActiveTab("signature")}>
            <Icon name="mail" />
            <span>Signature e-mail</span>
          </button>
          {!signatureOnly&&<button className={activeTab === "card" ? "nav-item active" : "nav-item"} onClick={() => setActiveTab("card")}>
            <Icon name="card" />
            <span>Carte de service</span>
          </button>}
          {!signatureOnly&&<button className={activeTab === "settings" ? "nav-item active" : "nav-item"} onClick={() => setActiveTab("settings")}>
            <Icon name="settings" />
            <span>Paramètres ABA</span>
          </button>}
        </nav>

        <div className="sidebar-note">
          <span className="status-dot" />
          <div>
            <strong>Configuration centralisée</strong>
            <p>Les données institutionnelles sont injectées automatiquement.</p>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">{company.legalName}</p>
            <h1>
              {activeTab === "signature" && "Générateur de signature professionnelle"}
              {activeTab === "card" && (cardType==="visite"?"Générateur de carte de visite":"Générateur de carte de service")}
              {activeTab === "settings" && "Paramètres institutionnels"}
            </h1>
          </div>
          <div className="topbar-pill">CR80 {cardType==="visite"?"horizontal":"vertical"} · 600 dpi · Evolis Avansia</div>
        </header>

        {activeTab === "signature" ? (
          <div className="two-column-layout">
            <section className="panel form-panel">
              <div className="panel-heading">
                <div><span>01</span><h2>Informations du collaborateur</h2></div>
                <p>Ces données alimentent la signature en temps réel.</p>
              </div>
              <div className="form-grid">
                <Field label="Prénom"><input value={person.firstName} onChange={(e) => updatePerson("firstName", e.target.value)} /></Field>
                <Field label="Post-nom"><input value={person.middleName} onChange={(e) => updatePerson("middleName", e.target.value)} /></Field>
                <Field label="Nom"><input value={person.lastName} onChange={(e) => updatePerson("lastName", e.target.value)} /></Field>
                <Field label="Poste"><input value={person.jobTitle} onChange={(e) => updatePerson("jobTitle", e.target.value)} /></Field>
                <Field label="Département / Direction"><input list="aba-departments-studio" value={person.department} onChange={(e) => updatePerson("department", e.target.value)} /></Field>
                <Field label="Téléphone professionnel"><input value={person.phone} onChange={(e) => updatePerson("phone", e.target.value)} /></Field>
                <Field label="E-mail professionnel"><input type="email" list="aba-emails-studio" value={person.email} onChange={(e) => updatePerson("email", e.target.value)} /></Field>
                <div className="field-span-2">
                  <Field label="URL publique du logo" hint="Le logo doit être accessible en HTTPS après le déploiement pour rester visible dans Outlook.">
                    <input value={logoPublicUrl} onChange={(e) => setLogoPublicUrl(e.target.value)} placeholder="https://votre-domaine.cd/aba-logo.svg" />
                  </Field>
                </div>
              </div>
            </section>

            <section className="panel preview-panel sticky-panel">
              <div className="panel-heading compact">
                <div><span>02</span><h2>Aperçu Outlook</h2></div>
                <p>Structure HTML en tableau, plus stable dans les clients e-mail.</p>
              </div>

              <div className="email-window">
                <div className="email-toolbar"><i /><i /><i /><span>Nouveau message</span></div>
                <div className="email-meta"><b>À</b><span>destinataire@exemple.com</span></div>
                <div className="email-meta"><b>Objet</b><span>Présentation institutionnelle</span></div>
                <div className="email-body">
                  <p>Bonjour,</p>
                  <p>Veuillez trouver ci-dessous mes coordonnées professionnelles.</p>
                  <div className="signature-preview" dangerouslySetInnerHTML={{ __html: signature.html }} />
                </div>
              </div>

              <div className="action-row">
                <button className="primary-button" onClick={copySignature}><Icon name="copy" />Copier pour Outlook</button>
                <button className="secondary-button" onClick={exportSignatureHtml}><Icon name="download" />Télécharger HTML</button>
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "card" ? (
          <div className="two-column-layout card-layout">
            <section className="panel form-panel">
              <div className="panel-heading">
                <div><span>01</span><h2>Données de la carte</h2></div>
                <p>Format CR80 uniforme, prévu pour impression recto-verso.</p>
              </div>
              <div className="card-format-switch"><button className={cardType==="service"?"active":""} onClick={()=>setCardType("service")}>Carte de service verticale</button><button className={cardType==="visite"?"active":""} onClick={()=>setCardType("visite")}>Carte de visite horizontale</button></div>

              <div className="photo-uploader">
                <div className="photo-thumb">
                  {person.photoDataUrl ? <img src={person.photoDataUrl} alt="Photo du collaborateur" /> : <span>PHOTO</span>}
                </div>
                <div>
                  <strong>Photo d&apos;identité</strong>
                  <p>Portrait vertical, fond neutre, JPEG ou PNG. Maximum 8 Mo.</p>
                  <label className="upload-button">Sélectionner la photo<input type="file" accept="image/*" onChange={onPhotoChange} /></label>
                </div>
              </div>

              <div className="form-grid">
                <Field label="Prénom"><input value={person.firstName} onChange={(e) => updatePerson("firstName", e.target.value)} /></Field>
                <Field label="Post-nom"><input value={person.middleName} onChange={(e) => updatePerson("middleName", e.target.value)} /></Field>
                <Field label="Nom"><input value={person.lastName} onChange={(e) => updatePerson("lastName", e.target.value)} /></Field>
                <Field label="Poste"><input value={person.jobTitle} onChange={(e) => updatePerson("jobTitle", e.target.value)} /></Field>
                <Field label="Département / Direction"><input list="aba-departments-studio" value={person.department} onChange={(e) => updatePerson("department", e.target.value)} /></Field>
                <Field label="Matricule"><input value={person.employeeId} onChange={(e) => updatePerson("employeeId", e.target.value)} /></Field>
                <Field label="Téléphone"><input value={person.phone} onChange={(e) => updatePerson("phone", e.target.value)} /></Field>
                <div className="field-span-2"><Field label="E-mail professionnel"><input type="email" list="aba-emails-studio" value={person.email} onChange={(e) => updatePerson("email", e.target.value)} /></Field></div>
              </div>
            </section>

            <section className="panel preview-panel">
              <div className="panel-heading compact">
                <div><span>02</span><h2>Recto-verso</h2></div>
                <p>Export 1275 × 2022 px, correspondant au format vertical CR80 à 600 dpi.</p>
              </div>

              <div className={`card-stack ${cardType==="visite"?"business-format":""}`}>
                <CardPreview side="Recto" description="Identité du collaborateur">
                  <ServiceCardFront person={person} company={company} logoDataUrl={logoDataUrl} />
                </CardPreview>
                <CardPreview side="Verso" description="Coordonnées et QR officiel">
                  <ServiceCardBack person={person} company={company} logoDataUrl={logoDataUrl} />
                </CardPreview>
              </div>

              <div className="action-grid">
                <button className="secondary-button" disabled={busy} onClick={() => exportCard("recto")}><Icon name="download" />PNG recto</button>
                <button className="secondary-button" disabled={busy} onClick={() => exportCard("verso")}><Icon name="download" />PNG verso</button>
                <button className="secondary-button" onClick={() => printCards("recto")}><Icon name="print" />PDF recto</button>
                <button className="secondary-button" onClick={() => printCards("verso")}><Icon name="print" />PDF verso</button>
                <button className="primary-button action-full" onClick={() => printCards("complet")}><Icon name="print" />PDF complet recto-verso</button>
              </div>
              <div className="print-production-note">
                <strong>Prêt pour Avansia</strong>
                <span>CR80 vertical · 600 dpi · fond perdu bord à bord · zone utile protégée · PNG avec métadonnée 600 dpi.</span>
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "settings" ? (
          <div className="settings-grid">
            <section className="panel">
              <div className="panel-heading">
                <div><span>01</span><h2>Identité visuelle</h2></div>
                <p>Le logo local modifie immédiatement les aperçus des cartes.</p>
              </div>
              <div className="logo-dropzone">
                <div className="logo-preview-box">
                  {logoDataUrl ? <img src={logoDataUrl} alt="Logo ABA" /> : <strong>ABA</strong>}
                </div>
                <label className="upload-button">Importer un autre logo<input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={onLogoChange} /></label>
                <small>Pour un changement permanent, remplacez public/aba-logo.svg dans le projet.</small>
              </div>
            </section>

            <section className="panel">
              <div className="panel-heading">
                <div><span>02</span><h2>Données prédéfinies</h2></div>
                <p>Lecture seule dans l&apos;interface. Modification dans src/config/company.ts.</p>
              </div>
              <dl className="company-data">
                <div><dt>Entreprise</dt><dd>{company.legalName} ({company.shortName})</dd></div>
                <div><dt>Positionnement</dt><dd>{company.tagline}</dd></div>
                <div><dt>Adresse</dt><dd>{company.address}</dd></div>
                <div><dt>Localisation</dt><dd>{company.cityCountry}</dd></div>
                <div><dt>Téléphone</dt><dd>{company.phone}</dd></div>
                <div><dt>E-mail</dt><dd>{company.email}</dd></div>
                <div><dt>Site</dt><dd>{company.website}</dd></div>
                <div><dt>QR code</dt><dd>{company.qrCodeUrl} · correction d&apos;erreur Q</dd></div>
                <div><dt>Référence carte</dt><dd>{company.cardReference}</dd></div>
                <div><dt>Validité</dt><dd>{company.validityLabel}</dd></div>
              </dl>
            </section>

            <section className="panel settings-wide">
              <div className="panel-heading">
                <div><span>03</span><h2>Spécialisations injectées</h2></div>
                <p>Elles apparaissent automatiquement dans la signature professionnelle.</p>
              </div>
              <div className="specialty-list">
                {company.specialties.map((specialty, index) => <div key={specialty}><b>{String(index + 1).padStart(2, "0")}</b><span>{specialty}</span></div>)}
              </div>
            </section>
          </div>
        ) : null}
      </section>

      <datalist id="aba-departments-studio">{ABA_DEPARTMENTS.map(item=><option value={item} key={item}/>)}</datalist><datalist id="aba-emails-studio">{ABA_STAFF_EMAILS.map(item=><option value={item} key={item}/>)}</datalist>
      {status ? <div className="toast" role="status">{status}</div> : null}
    </main>
  );
}
