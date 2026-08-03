import type { MetadataRoute } from "next";
import { expertises, news, projects } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/institution", "/expertises", "/projets", "/actualites", "/documents", "/contact", "/mentions-legales", "/politique-confidentialite"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date("2026-07-20") })),
    ...expertises.map((item) => ({ url: `${base}/expertises/${item.slug}`, lastModified: new Date("2026-07-20") })),
    ...projects.map((item) => ({ url: `${base}/projets/${item.slug}`, lastModified: new Date("2026-07-20") })),
    ...news.map((item) => ({ url: `${base}/actualites/${item.slug}`, lastModified: new Date(item.isoDate) }))
  ];
}
