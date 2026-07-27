import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTA from "@/components/CTA";
import { ArrowRight } from "@/components/Icons";
import { news } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((article) => article.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((article) => article.slug === slug);
  if (!item) notFound();

  return (
    <>
      <article>
        <header className={`article-hero ${item.accent}`}>
          <div className="article-hero-grid" />
          <div className="container article-hero-inner">
            <div>
              <span className="article-category">{item.category}</span>
              <h1>{item.title}</h1>
              <p>{item.excerpt}</p>
              <time dateTime={item.isoDate}>{item.date}</time>
            </div>
            <strong aria-hidden="true">ABA</strong>
          </div>
        </header>

        <section className="section article-section">
          <div className="container article-layout">
            <aside>
              <span>PUBLICATION ABA</span>
              <strong>{item.category}</strong>
              <Link className="text-link" href="/actualites">Toutes les actualités <ArrowRight /></Link>
            </aside>
            <div className="article-body">
              {item.content.map((paragraph, index) => (
                <p className={index === 0 ? "article-lead" : ""} key={paragraph}>{paragraph}</p>
              ))}
              <div className="article-callout">
                <span>POINT DE VUE ABA</span>
                <h2>Une transformation réussie relie toujours gouvernance, technologie et opérations.</h2>
              </div>
            </div>
          </div>
        </section>
      </article>
      <CTA title="Besoin d’approfondir ce sujet dans votre organisation ?" />
    </>
  );
}
