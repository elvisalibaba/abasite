export type Expertise = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  outcomes: string[];
  services: string[];
  process: { title: string; text: string }[];
  accent: string;
  image: string;
};

export type Project = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  services: string[];
  status: string;
  accent: string;
  image: string;
  year: string;
  technology: string;
};

export type NewsItem = {
  slug: string;
  date: string;
  isoDate: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  accent: string;
};

export const expertises: Expertise[] = [
  {
    slug: "biometrie-identite-numerique",
    number: "01",
    title: "Biométrie et identité numérique",
    shortTitle: "Identité numérique",
    summary: "Des dispositifs fiables pour identifier, enrôler et vérifier les personnes dans les environnements institutionnels.",
    description:
      "ABA conçoit des architectures d’identité qui associent biométrie, données biographiques, identifiants uniques, règles métier et contrôle d’accès. L’objectif est de créer une identité vérifiable, traçable et exploitable par les systèmes autorisés.",
    outcomes: [
      "Réduction des doublons et des identités frauduleuses",
      "Vérification rapide sur le terrain ou au guichet",
      "Traçabilité des opérations sensibles",
      "Interopérabilité avec les plateformes métier"
    ],
    services: [
      "Étude de faisabilité et architecture cible",
      "Enrôlement visage, empreintes, iris et données biographiques",
      "Vérification 1:1 et identification 1:N",
      "Intégration de lecteurs, SDK et terminaux mobiles",
      "Conception des règles d’unicité et de contrôle",
      "Déploiement, formation et supervision"
    ],
    process: [
      { title: "Cadrer", text: "Définition des usages, risques, populations et contraintes réglementaires." },
      { title: "Concevoir", text: "Architecture fonctionnelle, technique, sécurité et gouvernance des identités." },
      { title: "Intégrer", text: "Connexion des équipements, logiciels, bases de données et API autorisées." },
      { title: "Déployer", text: "Pilote, montée en charge, formation, support et amélioration continue." }
    ],
    accent: "identity"
    ,image: "/images/aba/expertises/biometrie/hero.webp"
  },
  {
    slug: "audit-gouvernance-donnees",
    number: "02",
    title: "Audit et gouvernance des données",
    shortTitle: "Gouvernance des données",
    summary: "Transformer des bases fragmentées en référentiels fiables, documentés et gouvernés.",
    description:
      "Nous analysons la qualité, l’intégrité, l’unicité, l’exhaustivité et la traçabilité des données. ABA produit un diagnostic exploitable, un plan d’assainissement, des règles de gouvernance et une architecture de référentiel adaptée aux opérations.",
    outcomes: [
      "Vision claire des anomalies et risques",
      "Référentiel unique et règles de qualité",
      "Décisions fondées sur des données vérifiables",
      "Responsabilités et processus de gouvernance définis"
    ],
    services: [
      "Profilage et cartographie des données",
      "Détection des doublons et incohérences",
      "Analyse des règles métier",
      "Plan de nettoyage et de migration",
      "Dictionnaire de données et référentiel de métadonnées",
      "Tableaux de bord de qualité et contrôle continu"
    ],
    process: [
      { title: "Inventorier", text: "Sources, propriétaires, formats, volumes et flux existants." },
      { title: "Mesurer", text: "Indicateurs de qualité, anomalies, doublons et risques opérationnels." },
      { title: "Corriger", text: "Règles d’assainissement, rapprochement et migration contrôlée." },
      { title: "Gouverner", text: "Rôles, procédures, audits périodiques et tableaux de bord." }
    ],
    accent: "data"
    ,image: "/images/aba/expertises/gouvernance-donnees.webp"
  },
  {
    slug: "solutions-numeriques-integrees",
    number: "03",
    title: "Solutions numériques intégrées",
    shortTitle: "Solutions intégrées",
    summary: "Des applications web, mobiles et métier conçues autour des opérations réelles.",
    description:
      "ABA développe des solutions complètes qui relient interfaces, processus, données, API, équipements et supervision. Nous privilégions les architectures sécurisées, modulaires et maintenables, avec une attention particulière aux environnements à connectivité limitée.",
    outcomes: [
      "Processus métier simplifiés et mesurables",
      "Applications adaptées au terrain",
      "Intégration des systèmes existants",
      "Meilleure visibilité pour les décideurs"
    ],
    services: [
      "Applications web et portails institutionnels",
      "Applications mobiles online et offline-first",
      "API, intégrations et interopérabilité",
      "Tableaux de bord et centres de supervision",
      "IoT, équipements connectés et systèmes embarqués",
      "Maintenance évolutive et transfert de compétences"
    ],
    process: [
      { title: "Observer", text: "Immersion dans les procédures, rôles et contraintes des utilisateurs." },
      { title: "Prototyper", text: "Maquettes, parcours, architecture et validation rapide des hypothèses." },
      { title: "Construire", text: "Développement incrémental, tests et intégration des composants." },
      { title: "Exploiter", text: "Mise en production, supervision, support et évolution du produit." }
    ],
    accent: "digital"
    ,image: "/images/aba/expertises/plateformes-metier.webp"
  },
  {
    slug: "deploiement-securisation",
    number: "04",
    title: "Déploiement, infrastructure et sécurisation",
    shortTitle: "Déploiement sécurisé",
    summary: "Faire fonctionner la solution dans la durée, sur le terrain et à l’échelle.",
    description:
      "Une technologie utile est une technologie disponible, sécurisée et correctement exploitée. ABA prépare les environnements, les équipes, la logistique, les procédures, la supervision et le support nécessaires à un déploiement maîtrisé.",
    outcomes: [
      "Déploiement progressif et contrôlé",
      "Continuité des opérations",
      "Réduction des risques techniques et humains",
      "Équipes locales capables d’exploiter la solution"
    ],
    services: [
      "Architecture réseau et infrastructure serveur",
      "Gestion de parc, MDM et terminaux mobiles",
      "Sécurité opérationnelle et contrôle d’accès",
      "Planification logistique et déploiement multisite",
      "Formation, documentation et support",
      "Supervision, sauvegarde et reprise d’activité"
    ],
    process: [
      { title: "Préparer", text: "Prérequis, inventaire, sites, connectivité, sécurité et responsabilités." },
      { title: "Piloter", text: "Déploiement pilote avec critères de succès et retour d’expérience." },
      { title: "Étendre", text: "Vagues maîtrisées, suivi de capacité et gestion des incidents." },
      { title: "Pérenniser", text: "Support, formation continue, sauvegarde et gouvernance technique." }
    ],
    accent: "security"
    ,image: "/images/aba/expertises/infrastructure-reseaux.webp"
  },
  {
    slug: "iot-integration", number: "05", title: "IoT et intégration technologique", shortTitle: "IoT et intégration",
    summary: "Connecter équipements, capteurs et systèmes métier dans une architecture maîtrisée.",
    description: "ABA assemble les composants matériels et logiciels nécessaires pour collecter, transmettre et exploiter des données fiables depuis le terrain.",
    outcomes: ["Équipements interopérables", "Données terrain centralisées", "Alertes plus rapides", "Maintenance mieux planifiée"],
    services: ["Architecture IoT", "Intégration de capteurs", "Passerelles et API", "Télémétrie", "Supervision", "Maintenance"],
    process: [{title:"Cartographier",text:"Identifier les usages et environnements."},{title:"Prototyper",text:"Valider équipements et connectivité."},{title:"Intégrer",text:"Relier données et plateformes."},{title:"Superviser",text:"Mesurer la disponibilité et les alertes."}],
    accent: "iot", image: "/images/aba/expertises/iot-integration.webp"
  },
  {
    slug: "securite-systemes-information", number: "06", title: "Sécurité des systèmes d’information", shortTitle: "Cybersécurité",
    summary: "Réduire les risques numériques par une sécurité adaptée aux opérations et aux responsabilités.",
    description: "ABA intègre la sécurité aux architectures, aux identités, aux accès, aux procédures et à la continuité d’activité.",
    outcomes: ["Risques mieux identifiés", "Accès maîtrisés", "Incidents traçables", "Continuité renforcée"],
    services: ["Audit de sécurité", "Gestion des accès", "Journalisation", "Durcissement", "Sauvegarde et reprise", "Sensibilisation"],
    process: [{title:"Évaluer",text:"Cartographier actifs et menaces."},{title:"Prioriser",text:"Traiter les risques critiques."},{title:"Protéger",text:"Déployer contrôles et procédures."},{title:"Contrôler",text:"Auditer et améliorer en continu."}],
    accent: "cyber", image: "/images/aba/expertises/securite-si.webp"
  },
  {
    slug: "deploiement-supervision", number: "07", title: "Déploiement et supervision", shortTitle: "Supervision terrain",
    summary: "Organiser les sites, les équipes et le support pour réussir les mises en service à grande échelle.",
    description: "ABA prépare chaque vague de déploiement, ses critères de réussite, ses moyens logistiques et sa remontée d’incidents.",
    outcomes: ["Vagues de déploiement maîtrisées", "Incidents consolidés", "Équipes accompagnées", "Qualité homogène"],
    services: ["Plan de déploiement", "Préparation des sites", "Formation", "Centre de support", "Tableaux de bord", "Gestion des incidents"],
    process: [{title:"Préparer",text:"Qualifier sites et ressources."},{title:"Piloter",text:"Tester sur un périmètre réel."},{title:"Déployer",text:"Étendre par vagues contrôlées."},{title:"Soutenir",text:"Superviser et assister les équipes."}],
    accent: "field", image: "/images/aba/expertises/deploiement-supervision.webp"
  },
  {
    slug: "transformation-numerique-institutionnelle", number: "08", title: "Transformation numérique institutionnelle", shortTitle: "Transformation institutionnelle",
    summary: "Faire évoluer les services, les responsabilités et les outils comme un ensemble cohérent.",
    description: "ABA aide les décideurs à construire une feuille de route réaliste reliant gouvernance, processus, données, compétences et technologie.",
    outcomes: ["Priorités partagées", "Feuille de route réaliste", "Investissements coordonnés", "Adoption facilitée"],
    services: ["Diagnostic de maturité", "Feuille de route", "Design de services", "Architecture d’entreprise", "Conduite du changement", "Pilotage de programme"],
    process: [{title:"Diagnostiquer",text:"Évaluer la maturité actuelle."},{title:"Aligner",text:"Définir priorités et responsabilités."},{title:"Transformer",text:"Exécuter par programmes mesurables."},{title:"Ancrer",text:"Accompagner les usages et la gouvernance."}],
    accent: "transform", image: "/images/aba/expertises/transformation-institutionnelle.webp"
  }
];

export const projects: Project[] = [
  {
    slug: "identification-controle-institutionnel",
    category: "Identité numérique",
    title: "Identification et contrôle institutionnel",
    summary: "Une chaîne complète reliant audit, contrôle, enrôlement biométrique, supervision et gouvernance.",
    challenge:
      "Les organisations disposant d’effectifs importants doivent vérifier l’identité, l’affectation et la présence de chaque personne sans ralentir les opérations ni multiplier les bases parallèles.",
    solution:
      "ABA structure un dispositif composé d’une base de référence, d’outils de contrôle mobile, de stations d’enrôlement, de règles d’unicité, d’un identifiant vérifiable et d’un centre de supervision.",
    impact: [
      "Identités mieux vérifiées",
      "Historique des contrôles centralisé",
      "Réduction des dossiers incohérents",
      "Pilotage national consolidé"
    ],
    services: ["Audit", "Biométrie", "Applications mobiles", "Supervision", "Déploiement"],
    status: "Programme stratégique",
    accent: "project-one",
    image: "/images/aba/projects/controle-biometrique.webp", year: "À valider", technology: "Biométrie · Mobile"
  },
  {
    slug: "referentiel-donnees-fiable",
    category: "Données",
    title: "Référentiel institutionnel fiable",
    summary: "Une démarche d’assainissement et de gouvernance pour fiabiliser les données critiques.",
    challenge:
      "Les données peuvent être dispersées, dupliquées, incomplètes ou difficiles à tracer, ce qui fragilise les décisions, les contrôles et les services rendus.",
    solution:
      "ABA met en place une cartographie des sources, des règles de rapprochement, un plan de nettoyage, un dictionnaire de données, des contrôles automatiques et une gouvernance claire.",
    impact: [
      "Meilleure qualité des données",
      "Responsabilités clairement attribuées",
      "Réduction des doublons",
      "Décisions plus fiables"
    ],
    services: ["Profilage", "Data quality", "Migration", "Gouvernance", "Tableaux de bord"],
    status: "Transformation des données",
    accent: "project-two",
    image: "/images/aba/projects/audit-base-institutionnelle.webp", year: "À valider", technology: "Data quality"
  },
  {
    slug: "plateforme-metier-multicanal",
    category: "Transformation numérique",
    title: "Plateforme métier multicanal",
    summary: "Un écosystème web, mobile et décisionnel pour numériser une opération complexe.",
    challenge:
      "Les agents terrain, superviseurs, administrateurs et décideurs ont des besoins différents, parfois avec une connectivité faible et des contraintes de sécurité élevées.",
    solution:
      "La solution combine application mobile offline-first, portail d’administration, API sécurisées, synchronisation contrôlée, journalisation et tableaux de bord décisionnels.",
    impact: [
      "Opérations plus rapides",
      "Réduction des ressaisies",
      "Meilleure traçabilité",
      "Indicateurs disponibles en temps utile"
    ],
    services: ["UX métier", "Web", "Mobile", "API", "Analytique"],
    status: "Produit numérique",
    accent: "project-three",
    image: "/images/aba/projects/plateforme-terrain.webp", year: "À valider", technology: "Web · Mobile · API"
  },
  {
    slug: "infrastructure-supervision-nationale",
    category: "Infrastructure",
    title: "Infrastructure et supervision multisite",
    summary: "Une architecture résiliente pour exploiter des équipements et applications à grande échelle.",
    challenge:
      "Un déploiement multisite exige une visibilité centralisée, des standards techniques, une gestion du parc, des sauvegardes et une assistance réactive.",
    solution:
      "ABA définit l’architecture serveur et réseau, les politiques de gestion des terminaux, les procédures de déploiement, la supervision, le support et la continuité d’activité.",
    impact: [
      "Parc mieux maîtrisé",
      "Incidents détectés plus tôt",
      "Déploiement reproductible",
      "Continuité opérationnelle renforcée"
    ],
    services: ["Infrastructure", "Réseaux", "MDM", "Sécurité", "Support"],
    status: "Déploiement opérationnel",
    accent: "project-four",
    image: "/images/aba/projects/centre-monitoring.webp", year: "À valider", technology: "Réseaux · MDM"
  },
  {
    slug: "gestion-centralisee-terminaux", category: "Mobilité", title: "Gestion centralisée des terminaux mobiles",
    summary: "Un dispositif de configuration, de sécurisation et de suivi des terminaux déployés sur le terrain.",
    challenge: "Les parcs mobiles distribués sont difficiles à inventorier, mettre à jour et sécuriser de manière homogène.",
    solution: "ABA structure le référentiel du parc, les politiques MDM, la distribution applicative, le support et les tableaux de bord.",
    impact: ["Inventaire consolidé", "Configurations homogènes", "Applications maîtrisées", "Support accéléré"],
    services: ["MDM", "Mobilité", "Sécurité", "Support", "Supervision"], status: "Gestion de parc", accent: "project-five",
    image: "/images/aba/projects/gestion-terminaux.webp", year: "À valider", technology: "MDM · Android"
  },
  {
    slug: "plateformes-institutionnelles", category: "Développement", title: "Développement de plateformes institutionnelles",
    summary: "Des portails et outils métier évolutifs, conçus autour des processus et des responsabilités réelles.",
    challenge: "Les applications isolées multiplient les ressaisies, les ruptures de suivi et les difficultés de pilotage.",
    solution: "ABA conçoit une architecture modulaire, des interfaces accessibles, des API sécurisées et un dispositif d’exploitation documenté.",
    impact: ["Parcours simplifiés", "Traçabilité renforcée", "Systèmes interopérables", "Évolutions facilitées"],
    services: ["UX", "Web", "API", "Sécurité", "DevOps"], status: "Plateforme métier", accent: "project-six",
    image: "/images/aba/projects/plateforme-institutionnelle.webp", year: "À valider", technology: "Web · API · Cloud"
  }
];

export const news: NewsItem[] = [
  {
    slug: "moderniser-identification-institutionnelle",
    date: "20 juillet 2026",
    isoDate: "2026-07-20",
    category: "Identité numérique",
    title: "Moderniser l’identification institutionnelle sans fragiliser les opérations",
    excerpt: "Une identité numérique utile doit relier la personne, ses données, ses droits et chaque contrôle effectué.",
    content: [
      "La modernisation d’un système d’identification ne consiste pas à ajouter un lecteur biométrique devant une base ancienne. Elle exige une réflexion sur l’unicité, la qualité des données, les règles de contrôle, la sécurité et la responsabilité des acteurs.",
      "ABA privilégie une approche progressive : audit du référentiel, définition de l’identité de référence, expérimentation sur un périmètre pilote, puis montée en charge contrôlée.",
      "Cette méthode réduit les risques de rupture opérationnelle et permet aux équipes de s’approprier les nouveaux outils avant leur extension."
    ],
    accent: "news-one"
  },
  {
    slug: "preparer-deploiement-multisite",
    date: "12 juillet 2026",
    isoDate: "2026-07-12",
    category: "Déploiement",
    title: "Les cinq fondations d’un déploiement technologique multisite",
    excerpt: "Matériel, connectivité, procédures, support et supervision doivent être préparés comme un seul système.",
    content: [
      "Les projets multisites échouent rarement à cause d’une seule ligne de code. Ils échouent lorsque les prérequis, les responsabilités, les stocks, la connectivité ou l’assistance n’ont pas été traités ensemble.",
      "Un pilote réaliste permet de mesurer la capacité des équipes, le comportement des équipements et les incidents réellement rencontrés.",
      "La généralisation doit ensuite suivre des vagues documentées, chacune avec des critères d’entrée, des indicateurs et un mécanisme de retour d’expérience."
    ],
    accent: "news-two"
  },
  {
    slug: "gouvernance-donnees-decision",
    date: "28 juin 2026",
    isoDate: "2026-06-28",
    category: "Données",
    title: "La gouvernance des données commence avant le tableau de bord",
    excerpt: "Un indicateur élégant reste faux lorsque les données sources sont incomplètes ou mal définies.",
    content: [
      "Les tableaux de bord ne corrigent pas les données. Ils rendent seulement leurs défauts plus visibles, parfois avec des graphiques très convaincants, ce qui est une manière coûteuse de se tromper.",
      "La gouvernance commence par la définition des propriétaires, des règles de qualité, des sources officielles et des procédures de correction.",
      "ABA accompagne cette transformation avec des diagnostics mesurables et des mécanismes de contrôle intégrés aux opérations quotidiennes."
    ],
    accent: "news-three"
  }
];

export const documents = [
  {
    type: "BROCHURE",
    title: "Présentation institutionnelle ABA",
    meta: "PDF · Document de référence",
    href: "#"
  },
  {
    type: "NOTE TECHNIQUE",
    title: "Approche ABA pour l’identité numérique",
    meta: "PDF · Publication technique",
    href: "#"
  },
  {
    type: "FICHE SERVICE",
    title: "Audit et gouvernance des données",
    meta: "PDF · Offre de service",
    href: "#"
  },
  {
    type: "FICHE SERVICE",
    title: "Déploiement et supervision multisite",
    meta: "PDF · Offre de service",
    href: "#"
  }
];

export const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Institution", href: "/institution" },
  { label: "Expertises", href: "/expertises" },
  { label: "Projets", href: "/projets" },
  { label: "Actualités", href: "/actualites" },
  { label: "Documents", href: "/documents" },
  { label: "Contact", href: "/contact" }
];
