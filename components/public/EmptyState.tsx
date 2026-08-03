import Link from "next/link";

export default function EmptyState({ title, description, href="/contact", action="Contacter ABA" }: {title:string;description:string;href?:string;action?:string}) {
  return <div className="public-empty-state"><span aria-hidden="true">□</span><h2>{title}</h2><p>{description}</p><Link className="button primary" href={href}>{action}</Link></div>;
}
