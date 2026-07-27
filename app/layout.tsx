import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ABALoader from "@/components/motion/ABALoader";

export const metadata: Metadata = {
  title: {
    default: "Africa Business Agency | Expertise, Intégrité, Performance",
    template: "%s | Africa Business Agency"
  },
  description:
    "Africa Business Agency accompagne les institutions et organisations dans leurs projets stratégiques, technologiques et opérationnels.",
  metadataBase: new URL("https://aba-drc.com"),
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
      "Solutions institutionnelles, transformation numérique, biométrie, audit et déploiement opérationnel.",
    url: "https://aba-drc.com",
    siteName: "Africa Business Agency",
    locale: "fr_CD",
    type: "website",
    images: [{ url: "/image.png", width: 879, height: 504, alt: "Logo Africa Business Agency" }]
  },
  robots: { index: true, follow: true }
  ,alternates: { canonical: "/" }
  ,twitter: { card: "summary_large_image", title: "Africa Business Agency", description: "Expertise, intégrité et performance au service des projets institutionnels." }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <ABALoader />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
