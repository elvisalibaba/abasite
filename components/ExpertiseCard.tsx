import Link from "next/link";
import { ArrowRight } from "./Icons";
import type { Expertise } from "@/lib/site-data";
import SafeImage from "./media/SafeImage";

export default function ExpertiseCard({ item }: { item: Expertise }) {
  return (
    <article className="expertise-card" id={`expertise-${item.slug}`}>
      <div className="card-media"><SafeImage src={item.image} alt={`Illustration — ${item.title}`} width={1200} height={900} sizes="(max-width: 768px) 100vw, 33vw" /></div>
      <div className="card-top">
        <span className={`service-symbol service-symbol-${item.accent}`}>{item.number}</span>
        <span className="card-number">{item.number}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <Link className="expertise-card-link" href={`/expertises/${item.slug}`} aria-label={`Découvrir ${item.title}`}>
        <span>Explorer l’expertise</span><ArrowRight />
      </Link>
    </article>
  );
}
