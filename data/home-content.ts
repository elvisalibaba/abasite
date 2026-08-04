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
  image: "/images/aba/home/aba-operations-hero.png",
  imageAlt:
    "Centre technologique ABA dédié à l’identité numérique et aux opérations sécurisées",
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
