import Link from "next/link";

export type BreadcrumbItem = { label:string; href?:string };

export default function Breadcrumb({ items }: { items:BreadcrumbItem[] }) {
  return <nav className="breadcrumb" aria-label="Fil d’Ariane"><ol><li><Link href="/">Accueil</Link></li>{items.map(item=><li key={item.label}>{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;
}
