import type { CompanyProfile } from "@/types/identity-studio";

/**
 * Paramètres institutionnels uniques.
 * Remplacez uniquement les valeurs ci-dessous pour mettre à jour
 * automatiquement les cartes et les signatures de toute l'entreprise.
 */
export const companyConfig: CompanyProfile = {
  name: "Africa Business Agency",
  legalName: "Africa Business Agency",
  shortName: "ABA",
  tagline: "Transformation numérique institutionnelle",
  specialties: [
    "Biométrie et identité numérique",
    "Gouvernance et valorisation des données",
    "Architecture et intégration de solutions",
    "Déploiement de systèmes institutionnels sécurisés",
  ],
  address: "62 Avenue de la Gombe, croisement Batetela",
  cityCountry: "Kinshasa, République démocratique du Congo",
  phone: "+243 XXX XXX XXX",
  email: "contact@aba.cd",
  website: "https://aba.cd",
  qrCodeUrl: "https://aba.cd",
  cardReference: "ABA-SERVICE",
  validityLabel: "Selon statut professionnel",
  logoPath: "/image.png",
};

// Alias conservé pour les imports existants de l'application.
export const COMPANY = companyConfig;
