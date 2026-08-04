import Link from "next/link";
import { ArrowRight } from "./Icons";
import LogoABA from "./LogoABA";
import SafeImage from "./media/SafeImage";
import Breadcrumb, { type BreadcrumbItem } from "./public/Breadcrumb";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  cta?: { label: string; href: string };
  image?: string;
  alt?: string;
  breadcrumb?: BreadcrumbItem[];
  variant?: "light" | "dark";
};

export default function PageHero({ eyebrow, title, description, accent = "default", cta, image, alt, breadcrumb, variant="dark" }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${accent} page-hero-${variant}`}>
      <div className="page-hero-grid" />
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          {breadcrumb?.length ? <Breadcrumb items={breadcrumb}/> : null}
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
          <SafeImage src={image || `/images/aba/${accent}/hero.webp`} alt={alt || `Illustration institutionnelle — ${eyebrow}`} fill priority sizes="(max-width: 1023px) 100vw, 45vw" />
          <div className="page-hero-signature"><LogoABA variant="light" size="sm" priority /><small>EXPERTISE • INTÉGRITÉ • PERFORMANCE</small></div>
        </div>
      </div>
    </section>
  );
}
