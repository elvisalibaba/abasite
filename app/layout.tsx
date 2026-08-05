import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "@/styles/tokens.css";
import "@/styles/public-system.css";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/lib/site-config";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-aba", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Africa Business Agency | Souveraineté numérique et technologique",
    template: "%s | Africa Business Agency"
  },
  description:
    "Africa Business Agency conçoit et déploie des systèmes d’information, des solutions biométriques et des technologies sécurisées pour les institutions publiques, les forces de défense et de sécurité ainsi que les grandes organisations africaines.",
  metadataBase: new URL(siteConfig.url),
  applicationName: "Africa Business Agency",
  icons: {
    icon: [{ url: "/image.png", type: "image/png" }],
    shortcut: "/image.png",
    apple: [{ url: "/image.png", type: "image/png" }]
  },
  keywords: [
    "Africa Business Agency",
    "ABA RDC",
    "transformation numérique",
    "biométrie",
    "identité numérique",
    "audit de données",
    "Kinshasa"
  ],
  openGraph: {
    title: "Africa Business Agency",
    description:
      "Systèmes d’information, solutions biométriques et technologies sécurisées pour les institutions africaines.",
    url: "https://aba.cd",
    siteName: "Africa Business Agency",
    locale: "fr_CD",
    type: "website",
    images: [{ url: "/image.png", width: 879, height: 504, alt: "Logo Africa Business Agency" }]
  },
  robots: { index: true, follow: true }
  ,alternates: { canonical: "/" }
  ,twitter: { card: "summary_large_image", title: "Africa Business Agency | Souveraineté numérique", description: "Bâtisseur de souveraineté numérique et technologique pour les institutions africaines." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context":"https://schema.org", "@type":"Organization", name:siteConfig.name, url:siteConfig.url, email:siteConfig.email, telephone:siteConfig.phone, address:{"@type":"PostalAddress",addressLocality:"Kinshasa",addressCountry:"CD"} };
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={manrope.variable}>
        <a className="skip-link" href="#contenu-principal">Aller au contenu</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}} />
        <ScrollProgress />
        <Header />
        <main id="contenu-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
