"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoABA from "./LogoABA";
import { Mail, MapPin, Phone } from "./Icons";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <LogoABA variant="light" size="sm" />
          <h3>Africa Business Agency</h3>
          <p>
            Entreprise congolaise fondée en 2013, spécialisée dans la conception, l’intégration et le
            déploiement de solutions numériques, biométriques et de sécurité.
          </p>
          <div className="footer-values">EXPERTISE • INTÉGRITÉ • PERFORMANCE</div>
        </div>

        <div>
          <h4>Institution</h4>
          <Link href="/institution">À propos</Link>
          <Link href="/institution#mission">Mission et vision</Link>
          <Link href="/institution#valeurs">Nos valeurs</Link>
          <Link href="/projets">Projets publiés</Link>
          <Link href="/documents">Centre de ressources</Link>
          <Link href="/contact">Nous contacter</Link>
        </div>

        <div>
          <h4>Expertises</h4>
          <Link href="/expertises/biometrie-identite-numerique">Identité numérique</Link>
          <Link href="/expertises/audit-gouvernance-donnees">Gouvernance des données</Link>
          <Link href="/expertises/solutions-numeriques-integrees">Solutions numériques</Link>
          <Link href="/expertises/deploiement-securisation">Déploiement sécurisé</Link>
        </div>

        <div>
          <h4>Nous contacter</h4>
          <p className="contact-line"><MapPin /> Kinshasa, République Démocratique du Congo</p>
          <p className="contact-line"><Mail /> contact@aba.cd</p>
          <p className="contact-line"><Phone /> +243 812 130 324</p>
          <Link className="footer-cta" href="/contact">Écrire à ABA</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} Africa Business Agency. Tous droits réservés.</span>
          <div className="footer-legal">
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
