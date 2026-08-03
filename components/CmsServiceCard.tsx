import Link from "next/link";
import SafeImage from "./media/SafeImage";
import type { CmsService } from "@/lib/cms";

export default function CmsServiceCard({ item, index }: { item: CmsService; index: number }) {
  return <article className="expertise-card cms-service-card">
    {item.image_url && <div className="card-media"><SafeImage src={item.image_url} alt={item.title} width={900} height={650} sizes="(max-width: 768px) 100vw, 25vw" /></div>}
    <div className="card-top"><span className="service-symbol">{item.icon || String(index + 1).padStart(2, "0")}</span><span className="card-number">{String(index + 1).padStart(2, "0")}</span></div>
    <h3>{item.title}</h3><p>{item.summary}</p><Link className="expertise-card-link" href={item.link || "/contact"}><span>Découvrir le service</span><span>↗</span></Link>
  </article>;
}
