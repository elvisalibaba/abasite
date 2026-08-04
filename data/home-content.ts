/**
 * Contenu principal de la page d’accueil.
 * Modifie directement les valeurs ci-dessous pour mettre à jour le hero.
 * Les images locales doivent être placées dans public/ et leur chemin commence par `/`.
 */
export const homeHero = {
  eyebrow: "Expertise technologique congolaise",
  title: "Nous concevons les infrastructures numériques de demain.",
  description:
    "ABA accompagne les institutions et les organisations stratégiques dans la transformation numérique, la biométrie, la gouvernance des données, le développement logiciel et l’intégration technologique.",
  image: "/images/images news/data-center-ai-hero.webp",
  imageAlt:
    "Experts informatiques travaillant avec des technologies d’intelligence artificielle dans un centre de données",
  primaryAction: {
    label: "Démarrer un projet",
    href: "/contact"
  },
  secondaryAction: {
    label: "Explorer nos solutions",
    href: "/expertises"
  },
  facts: [
    { value: "2013", label: "Création à Kinshasa" },
    { value: "360°", label: "Stratégie au déploiement" },
    { value: "RDC", label: "Expertise locale" }
  ]
} as const;

/** Images des quatre cartes de la section Expertises, dans leur ordre d’affichage. */
export const homeExpertiseImages = [
  {
    image: "/images/aba/expertises/biometrie/hero.webp",
    imageAlt: "Dispositif biométrique d’identification et d’enrôlement ABA"
  },
  {
    image: "/images/aba/expertises/gouvernance-donnees.webp",
    imageAlt: "Gouvernance et analyse sécurisée des données"
  },
  {
    image: "/images/aba/expertises/plateformes-metier.webp",
    imageAlt: "Plateforme numérique et applications métier intégrées"
  },
  {
    image: "/images/aba/expertises/deploiement-supervision.webp",
    imageAlt: "Déploiement, infrastructure et supervision technologique"
  }
] as const;
