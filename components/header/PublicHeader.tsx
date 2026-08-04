"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import LogoABA from "../LogoABA";
import { MobileDrawer } from "./MobileDrawer";
import { publicLinks } from "./navigation-data";
import { SolutionsMenu } from "./SolutionsMenu";

export default function PublicHeader(){
  const pathname=usePathname(); const [mobileOpen,setMobileOpen]=useState(false); const [solutionsOpen,setSolutionsOpen]=useState(false); const trigger=useRef<HTMLButtonElement>(null);
  if(pathname.startsWith("/admin"))return null;
  const active=(href:string)=>href==="/"?pathname===href:pathname.startsWith(href);
  const beforeSolutions=publicLinks.slice(0,2),afterSolutions=publicLinks.slice(2);
  return <header className="public-header"><div className="public-topbar"><div className="container"><span>Entreprise technologique congolaise · Kinshasa</span><a href="mailto:contact@aba.cd">contact@aba.cd</a></div></div><div className="container public-navbar"><LogoABA href="/" variant="dark" size="sm" priority/><nav className="desktop-navigation" aria-label="Navigation principale">{beforeSolutions.map(([label,href])=><Link className={active(href)?"active":""} aria-current={active(href)?"page":undefined} href={href} key={href}>{label}</Link>)}<div className="desktop-solutions"><button className="desktop-solutions-trigger" aria-expanded={solutionsOpen} aria-controls="desktop-solutions" onClick={()=>setSolutionsOpen(value=>!value)}>Solutions <span aria-hidden="true">⌄</span></button>{solutionsOpen?<div id="desktop-solutions"><SolutionsMenu/></div>:null}</div>{afterSolutions.map(([label,href])=><Link className={active(href)?"active":""} aria-current={active(href)?"page":undefined} href={href} key={href}>{label}</Link>)}</nav><Link className="public-header-action" href="/admin/login">Connexion <span aria-hidden="true">→</span></Link><button ref={trigger} className="mobile-menu-button" onClick={()=>setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="mobile-navigation"><span>Menu</span><i aria-hidden="true"/></button></div><div id="mobile-navigation"><MobileDrawer open={mobileOpen} onClose={()=>setMobileOpen(false)} trigger={trigger}/></div></header>;
}
