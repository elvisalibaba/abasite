"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoABA from "./LogoABA";

export default function Footer(){
  const pathname=usePathname(); if(pathname.startsWith("/admin")||pathname.startsWith("/identity-studio")||pathname.startsWith("/demande-carte")||pathname.startsWith("/signature-professionnelle"))return null;
  return <footer className="footer sovereign-footer"><div className="container footer-grid"><div><LogoABA variant="light" size="sm"/><h3>Africa Business Agency</h3><p>Bâtisseur de souveraineté numérique et technologique.</p><div className="footer-values">CONÇU · DÉVELOPPÉ · DÉPLOYÉ EN RDC</div></div><div><h4>Navigation</h4><Link href="/institution">À propos</Link><Link href="/expertises">Expertises</Link><Link href="/#solutions">Solutions</Link><Link href="/projets">Réalisations</Link></div><div><h4>Informations</h4><Link href="/actualites">Actualités</Link><Link href="/contact">Contact</Link><Link href="/mentions-legales">Mentions légales</Link><Link href="/politique-confidentialite">Politique de confidentialité</Link></div><div><h4>Réseaux professionnels</h4><p>Liens officiels à renseigner après validation.</p>{/* TODO(ABA): ajouter uniquement les profils sociaux officiels validés. */}<Link className="footer-cta" href="/contact">Parler à un expert</Link></div></div><div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} Africa Business Agency. Tous droits réservés.</span><span>Made in DRC</span></div></div></footer>;
}
