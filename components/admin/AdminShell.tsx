"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

export default function AdminShell({ children, name, email, role }: { children: React.ReactNode; name: string; email: string; role: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const pathname=usePathname();
  useEffect(() => {
    setActive(pathname==="/admin"?"overview":pathname.split("/").pop()||"overview");
    setOpen(false);
  }, [pathname]);
  const links = [
    ["overview","⌂","Vue d’ensemble","Pilotage"],["projects","▦","Projets","Pilotage"],["tasks","✓","Tâches","Pilotage"],["submissions","⇩","Demandes","Pilotage"],["activity","↻","Activité","Pilotage"],
    ["calendar","□","Calendrier","Collaboration"],["notes","≡","Notes","Collaboration"],["cards","▤","Cartes","Collaboration"],["card-requests","⇩","Demandes cartes","Collaboration"],["identity-studio","◆","Studio cartes","Collaboration"],["mail","✉","Messagerie","Collaboration"],
    ["contents","✎","Contenus","Site public"],["services","◇","Services","Site public"],["media","▧","Médiathèque","Site public"],["documents","▥","Banque de documents","Site public"],["users","♙","Utilisateurs","Administration"]
  ];
  const visibleLinks=["externe","chef_projet"].includes(role)?links.filter(item=>["overview","projects","tasks","activity"].includes(item[0])):links.filter(item=>item[0]!=="users"||role==="admin");
  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-logo"><strong>ABA</strong><span>ADMINISTRATION</span></div>
        <nav>{visibleLinks.map((item,index)=><div className="admin-nav-item" key={item[0]}>{index===0||visibleLinks[index-1][3]!==item[3]?<small>{item[3]}</small>:null}<Link className={active===item[0]?"active":""} href={item[0]==="overview"?"/admin":`/admin/${item[0]}`}><i>{item[1]}</i><span>{item[2]}</span></Link></div>)}</nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank">Voir le site public ↗</Link>
          <form action={logoutAction}><button>Se déconnecter</button></form>
          <div className="admin-user-mini"><span>{name.slice(0, 2).toUpperCase()}</span><div><strong>{name}</strong><small>{email} · {role}</small></div></div>
        </div>
      </aside>
      <button className="admin-mobile-menu" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">☰</button>
      {open && <button className="admin-scrim" onClick={() => setOpen(false)} aria-label="Fermer le menu" />}
      <main className="admin-main">{children}</main>
    </div>
  );
}
