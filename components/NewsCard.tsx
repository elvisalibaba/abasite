import Link from "next/link";
import { ArrowRight } from "./Icons";
import type { NewsItem } from "@/lib/site-data";
import SafeImage from "./media/SafeImage";

export default function NewsCard({ item }: { item: NewsItem }) {
  const readingMinutes=Math.max(2,Math.ceil(item.content.join(" ").split(/\s+/).length/180));
  return (
    <article className="news-card">
      <div className={`news-visual ${item.accent}`}><SafeImage src={`/images/aba/news/${item.slug}.webp`} alt={`Actualité ABA — ${item.title}`} width={1600} height={1000} sizes="(max-width: 768px) 100vw, 33vw" /></div>
      <div className="news-content">
        <time dateTime={item.isoDate}>{item.date} · {readingMinutes} min de lecture</time>
        <small className="news-category">{item.category}</small>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <Link href={`/actualites/${item.slug}`}>Lire la suite <ArrowRight size={17} /></Link>
      </div>
    </article>
  );
}
