"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoABA from "./LogoABA";
import SafeImage from "./media/SafeImage";
import { navItems } from "@/lib/site-data";

const solutionGroups=[
  {label:"IDENTITÉ ET OPÉRATIONS SÉCURISÉES",items:[
    ["Solutions biométriques mobiles","Enrôlement, identification et vérification","/expertises/biometrie-identite-numerique","/images/aba/expertises/biometrie/hero.webp"],
    ["Contrôle d’accès mobile","Sites sensibles, visiteurs et contrôles terrain","/expertises/controle-acces-mobile","/images/aba/expertises/securite-si.webp"],
    ["Transport public","Billettique, validation et supervision","/expertises/transport-public-billettique","/images/aba/expertises/deploiement-supervision.webp"],
  ]},
  {label:"INFORMATION ET ACTIFS STRATÉGIQUES",items:[
    ["GED, ECM et archivage","Documents, workflows et conservation","/expertises/ged-ecm-archivage","/images/aba/expertises/gouvernance-donnees.webp"],
    ["Gestion du stationnement","Contrôle, paiement et pilotage urbain","/expertises/gestion-stationnement","/images/aba/expertises/iot-integration.webp"],
    ["Smart Asset Management","RFID, IoT et traçabilité des équipements","/expertises/smart-asset-management","/images/aba/expertises/iot-integration.webp"],
    ["Développement sur mesure","Plateformes métier, web, mobile et API","/expertises/solutions-numeriques-integrees","/images/aba/expertises/plateformes-metier.webp"],
  ]},
];

function NavIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4.5 4-7 8-7s6.8 2.5 8 7"/></>,
    <><path d="M4 19h16M6 16l4-4 3 3 5-7"/><circle cx="18" cy="8" r="2"/></>,
    <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 16l3-3 2 2 3-4"/></>,
    <><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    <><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
    <><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></>
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen,setSolutionsOpen]=useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {setOpen(false);setSolutionsOpen(false)}, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [open]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span className="header-location"><i aria-hidden="true" /><strong>ABA</strong> Solutions numériques souveraines</span>
          <div className="top-links">
            <span>Kinshasa · République Démocratique du Congo</span>
            <a href="mailto:contact@aba.cd">contact@aba.cd <i aria-hidden="true">↗</i></a>
          </div>
        </div>
      </div>

      <div className="container navbar">
        <div className="header-brand">
          <LogoABA href="/" variant="dark" size="sm" />
          <span><strong>Africa Business Agency</strong><small>Institution · Technologie · Terrain</small></span>
        </div>

        <nav id="primary-navigation" className={open ? "nav-links open" : "nav-links"} aria-label="Navigation principale">
          <div className="mobile-nav-head"><span>MENU PRINCIPAL</span><button onClick={() => setOpen(false)} aria-label="Fermer le menu">×</button></div>
          <div className="nav-items">
            {navItems.filter((item)=>item.href!=="/institution").map((item, index) => item.href==="/expertises"?(
              <button type="button" className={`nav-solutions-button${isActive(item.href)?" active":""}`} key={item.href} onClick={()=>setSolutionsOpen(value=>!value)} aria-expanded={solutionsOpen}>
                <small>{String(index + 1).padStart(2, "0")}</small><b className="nav-icon"><NavIcon index={index} /></b><span>Solutions</span><i aria-hidden="true">{solutionsOpen?"−":"+"}</i>
              </button>
            ):(
              <Link className={isActive(item.href) ? "active" : ""} key={item.href} href={item.href}>
                <small>{String(index + 1).padStart(2, "0")}</small><b className="nav-icon"><NavIcon index={index} /></b><span>{item.label}</span><i aria-hidden="true">›</i>
              </Link>
            ))}
          </div>
          <div className={`aba-solutions-mega${solutionsOpen?" open":""}`}>
            <div className="solutions-mega-head"><div><span>LES SOLUTIONS ABA</span><strong>Du besoin métier au système opérationnel.</strong></div><Link href="/expertises">Voir toutes les expertises <i>→</i></Link></div>
            <div className="solutions-mega-groups">{solutionGroups.map(group=><section key={group.label}><h2>{group.label}</h2><div>{group.items.map(([title,description,href,image])=><Link href={href} key={href}><span className="solution-menu-media"><SafeImage src={image} alt="" width={240} height={150} sizes="120px"/></span><span><strong>{title}</strong><small>{description}</small></span><i>→</i></Link>)}</div></section>)}</div>
          </div>
          <div className="mobile-nav-actions"><Link href="/admin/login">Se connecter</Link><Link href="/inscription">Créer un compte <span>→</span></Link></div>
          <div className="mobile-nav-meta"><span>contact@aba.cd</span><span>Kinshasa · RDC</span></div>
        </nav>

        <div className="header-account-actions">
          <Link className="header-login" href="/admin/login">Se connecter</Link>
          <Link className="header-cta" href="/inscription">Créer un compte <span aria-hidden="true">↗</span></Link>
        </div>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} aria-controls="primary-navigation">
          <span className="menu-label">Menu</span><span className="menu-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <button className={`nav-backdrop${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-label="Fermer le menu" tabIndex={open ? 0 : -1} />
    </header>
  );
}
