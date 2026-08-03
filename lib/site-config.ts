const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Africa Business Agency",
  shortName: "ABA",
  url: (configuredUrl || "https://aba.cd").replace(/\/$/, ""),
  email: "contact@aba.cd",
  phone: "+243812130324",
  location: "Kinshasa, République Démocratique du Congo",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}
