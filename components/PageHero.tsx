import Link from "next/link";
import { ArrowRight } from "./Icons";
import LogoABA from "./LogoABA";
import SafeImage from "./media/SafeImage";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  cta?: { label: string; href: string };
};

export default function PageHero({ eyebrow, title, description, accent = "default", cta }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${accent}`}>
      <div className="page-hero-grid" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
          {cta ? (
            <Link className="button primary" href={cta.href}>
              {cta.label} <ArrowRight />
            </Link>
          ) : null}
        </div>
        <div className="page-hero-monogram">
          <SafeImage src={`/images/aba/${accent}/hero.webp`} alt={`Illustration de la page ${eyebrow}`} fill sizes="(max-width: 1050px) 100vw, 45vw" />
          <div className="page-hero-signature"><LogoABA variant="light" size="sm" /><small>EXPERTISE • INTÉGRITÉ • PERFORMANCE</small></div>
        </div>
      </div>
    </section>
  );
}
