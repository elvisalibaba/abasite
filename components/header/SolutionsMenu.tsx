import Link from "next/link";
import { solutionGroups } from "./navigation-data";

export function SolutionsMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  if (mobile) return <div className="mobile-solutions-list">{solutionGroups.flatMap(group=>group.items).map(([title,href])=><Link href={href} onClick={onNavigate} key={href}>{title}</Link>)}</div>;
  return <div className="solutions-panel" role="region" aria-label="Expertises ABA"><div className="solutions-panel-grid">{solutionGroups.map(group=><section key={group.label}><h2>{group.label}</h2>{group.items.map(([title,href])=><Link href={href} key={href}><strong>{title}</strong><small>Découvrir cette expertise</small></Link>)}</section>)}</div><Link href="/expertises"><strong>Voir les 13 expertises →</strong></Link></div>;
}
