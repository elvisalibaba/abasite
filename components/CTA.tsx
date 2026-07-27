import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function CTA({
  eyebrow = "UN PROJET STRATÉGIQUE À STRUCTURER ?",
  title = "Construisons une solution adaptée à vos enjeux.",
  label = "Échanger avec ABA",
  href = "/contact"
}: {
  eyebrow?: string;
  title?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <Link className="button light" href={href}>
          {label} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
