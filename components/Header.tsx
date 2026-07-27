"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoABA from "./LogoABA";
import { navItems } from "@/lib/site-data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>République Démocratique du Congo</span>
          <div className="top-links">
            <a href="mailto:contact@aba-drc.com">contact@aba-drc.com</a>
            <span>Kinshasa, RDC</span>
          </div>
        </div>
      </div>

      <div className="container navbar">
        <div className="header-brand">
          <LogoABA href="/" variant="dark" size="sm" />
          <span><strong>Africa Business Agency</strong><small>Institution · Technologie · Terrain</small></span>
        </div>

        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <span className="menu-lines" aria-hidden="true"><i /><i /></span>
        </button>

        <nav className={open ? "nav-links open" : "nav-links"} aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link className={isActive(item.href) ? "active" : ""} key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Parler à un expert <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
