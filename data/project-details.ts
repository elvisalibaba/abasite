export type ProjectDetail = {
  context: string;
  objectives: string[];
  architecture: { title: string; text: string }[];
  stages: { title: string; text: string }[];
  deployment: string;
  results: string[];
  difficulties: { challenge: string; response: string }[];
  gallery: string[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "identification-controle-institutionnel": {
    context: "Les grandes organisations ont besoin d’un référentiel d’identité cohérent pour relier chaque personne à son dossier, son affectation et aux contrôles réalisés sur le terrain. Le programme est conçu pour fonctionner dans des environnements multisites, avec des niveaux de connectivité variables.",
    objectives: ["Établir une identité de référence vérifiable", "Réduire les doublons et dossiers incohérents", "Tracer les opérations de contrôle", "Donner aux superviseurs une vision consolidée", "Préparer une exploitation durable"],
    architecture: [{title:"Enrôlement",text:"Stations de capture biométrique et biographique avec contrôle qualité."},{title:"Référentiel",text:"Base centrale, règles d’unicité et historique des modifications."},{title:"Contrôle terrain",text:"Application mobile sécurisée, utilisable avec une connectivité limitée."},{title:"Supervision",text:"Tableaux de bord, alertes et journalisation des opérations sensibles."}],
    stages: [{title:"Audit initial",text:"Analyse des bases, procédures et responsabilités."},{title:"Pilote",text:"Validation des parcours sur un périmètre représentatif."},{title:"Déploiement",text:"Montée en charge par vagues et préparation des sites."},{title:"Exploitation",text:"Support, supervision et amélioration continue."}],
    deployment: "Le déploiement suit des vagues contrôlées. Chaque site est qualifié avant activation, les opérateurs sont formés, les équipements sont inventoriés et les indicateurs sont suivis depuis un centre de supervision.",
    results: ["Identités mieux documentées", "Contrôles plus rapides", "Historique centralisé", "Anomalies détectées plus tôt"],
    difficulties: [{challenge:"Connectivité irrégulière",response:"Mode hors connexion, files de synchronisation et reprise contrôlée."},{challenge:"Qualité variable des dossiers",response:"Règles de validation, rapprochement et contrôle qualité avant consolidation."},{challenge:"Adoption terrain",response:"Formation pratique, pilote encadré et assistance de proximité."}],
    gallery: ["controle-terrain.webp","station-enrolement.webp","supervision-biometrie.webp"]
  },
  "referentiel-donnees-fiable": {
    context: "Les données institutionnelles se constituent souvent au fil de plusieurs applications, fichiers et procédures. Cette fragmentation rend les rapprochements difficiles et fragilise les décisions qui reposent sur ces informations.",
    objectives: ["Cartographier toutes les sources autorisées", "Mesurer la qualité des données", "Définir les règles du référentiel", "Assainir sans perdre la traçabilité", "Installer une gouvernance durable"],
    architecture: [{title:"Sources",text:"Inventaire documenté des bases, fichiers et flux existants."},{title:"Qualité",text:"Moteur de profilage, contrôles et règles de rapprochement."},{title:"Référentiel",text:"Modèle de données commun et identifiants de référence."},{title:"Pilotage",text:"Indicateurs de qualité, rejets et corrections suivies."}],
    stages: [{title:"Inventaire",text:"Qualification des sources et propriétaires."},{title:"Profilage",text:"Mesure des anomalies, lacunes et doublons."},{title:"Assainissement",text:"Correction et migration par lots vérifiables."},{title:"Gouvernance",text:"Rôles, procédures et contrôle continu."}],
    deployment: "La migration est découpée en lots réversibles, assortis de rapports de contrôle. Aucun remplacement de source n’est réalisé avant validation fonctionnelle et technique par les responsables désignés.",
    results: ["Sources mieux maîtrisées", "Doublons réduits", "Corrections traçables", "Indicateurs plus fiables"],
    difficulties: [{challenge:"Définitions contradictoires",response:"Dictionnaire partagé et arbitrage des règles métier."},{challenge:"Historique incomplet",response:"Conservation de la provenance et niveaux de confiance."},{challenge:"Volumes importants",response:"Traitement par lots, échantillonnage et contrôles automatisés."}],
    gallery: ["audit-donnees.webp","atelier-gouvernance.webp","tableau-qualite.webp"]
  },
  "plateforme-metier-multicanal": {
    context: "Les opérations complexes mobilisent des agents terrain, superviseurs, administrateurs et décideurs. Une plateforme unique doit servir ces profils sans imposer le même outil ni le même niveau d’information à chacun.",
    objectives: ["Numériser le parcours de bout en bout", "Éliminer les ressaisies", "Fonctionner avec une connectivité limitée", "Sécuriser les responsabilités", "Produire des indicateurs exploitables"],
    architecture: [{title:"Application mobile",text:"Saisie guidée, fonctionnement offline-first et synchronisation."},{title:"Portail métier",text:"Gestion des dossiers, contrôles et habilitations."},{title:"API",text:"Services sécurisés et interopérabilité avec les systèmes autorisés."},{title:"Décisionnel",text:"Agrégats, indicateurs et exports contrôlés."}],
    stages: [{title:"Immersion",text:"Observation des usages et contraintes."},{title:"Prototype",text:"Validation rapide des parcours prioritaires."},{title:"Construction",text:"Livraisons incrémentales et tests métier."},{title:"Généralisation",text:"Formation, déploiement et support."}],
    deployment: "Les versions sont introduites progressivement auprès de groupes pilotes. Les retours sont qualifiés, priorisés et intégrés avant chaque élargissement du périmètre.",
    results: ["Parcours homogènes", "Moins de ressaisies", "Meilleure visibilité opérationnelle", "Responsabilités mieux tracées"],
    difficulties: [{challenge:"Profils très différents",response:"Interfaces et droits adaptés à chaque rôle."},{challenge:"Faible connectivité",response:"Stockage local chiffré et synchronisation résiliente."},{challenge:"Évolution des procédures",response:"Architecture modulaire et règles configurables."}],
    gallery: ["application-terrain.webp","portail-metier.webp","dashboard-operations.webp"]
  },
  "infrastructure-supervision-nationale": {
    context: "L’exploitation de services distribués exige des standards techniques communs, une visibilité sur les équipements et des procédures cohérentes pour prévenir et traiter les incidents.",
    objectives: ["Standardiser les environnements", "Superviser les services critiques", "Centraliser les alertes", "Organiser le support", "Préparer la continuité d’activité"],
    architecture: [{title:"Sites",text:"Réseaux locaux, équipements et prérequis documentés."},{title:"Plateforme",text:"Serveurs, services applicatifs et sauvegardes."},{title:"Observabilité",text:"Métriques, journaux, disponibilité et alertes."},{title:"Support",text:"Centre de services, escalade et base de connaissances."}],
    stages: [{title:"Diagnostic",text:"Inventaire des sites et dépendances."},{title:"Architecture",text:"Standards, capacité et sécurité."},{title:"Installation",text:"Déploiement pilote puis extension."},{title:"Exploitation",text:"Supervision et maintenance préventive."}],
    deployment: "Chaque site passe par une fiche de préparation, un contrôle des prérequis et une recette. Les équipements et configurations sont intégrés à l’inventaire central avant la mise en service.",
    results: ["Disponibilité mieux suivie", "Incidents centralisés", "Déploiements reproductibles", "Reprise mieux préparée"],
    difficulties: [{challenge:"Hétérogénéité des sites",response:"Standards par profil de site et kits de déploiement."},{challenge:"Alertes trop nombreuses",response:"Seuils, priorités et procédures d’escalade."},{challenge:"Compétences distribuées",response:"Documentation et transfert progressif aux équipes."}],
    gallery: ["salle-serveurs.webp","centre-monitoring.webp","deploiement-reseau.webp"]
  },
  "gestion-centralisee-terminaux": {
    context: "Un parc mobile distribué doit rester inventorié, sécurisé et maintenu malgré les déplacements, les changements d’utilisateurs et les contraintes de connectivité.",
    objectives: ["Connaître l’état du parc", "Appliquer des politiques homogènes", "Maîtriser les applications", "Accélérer le support", "Protéger les données professionnelles"],
    architecture: [{title:"Terminaux",text:"Profils, chiffrement et restrictions adaptés aux usages."},{title:"MDM",text:"Enrôlement, politiques et distribution applicative."},{title:"Catalogue",text:"Applications validées et versions maîtrisées."},{title:"Support",text:"Diagnostic distant, incidents et cycle de vie."}],
    stages: [{title:"Inventaire",text:"Identification des appareils et usages."},{title:"Politiques",text:"Définition des règles de sécurité."},{title:"Pilote",text:"Test sur plusieurs profils terrain."},{title:"Extension",text:"Enrôlement par vagues et support."}],
    deployment: "Les terminaux sont préparés par lots, associés à un responsable et vérifiés avant remise. Les politiques critiques sont testées sur un groupe pilote avant application générale.",
    results: ["Parc consolidé", "Configurations homogènes", "Mises à jour contrôlées", "Support plus réactif"],
    difficulties: [{challenge:"Appareils déjà en circulation",response:"Campagnes d’enrôlement progressives et contrôle d’inventaire."},{challenge:"Usages hors connexion",response:"Politiques persistantes et synchronisation différée."},{challenge:"Perte ou vol",response:"Verrouillage, révocation et procédures d’incident."}],
    gallery: ["parc-mobile.webp","console-mdm.webp","support-terminaux.webp"]
  },
  "plateformes-institutionnelles": {
    context: "Les services institutionnels ont besoin de plateformes durables qui reflètent leurs procédures, s’intègrent à l’existant et peuvent évoluer sans reconstruction permanente.",
    objectives: ["Simplifier les services métier", "Unifier l’expérience utilisateur", "Ouvrir des intégrations sécurisées", "Documenter l’exploitation", "Faciliter les évolutions"],
    architecture: [{title:"Expérience",text:"Interfaces accessibles et parcours adaptés aux rôles."},{title:"Services",text:"Modules métier indépendants et règles documentées."},{title:"Données",text:"Modèles cohérents, audit et contrôle d’accès."},{title:"Exploitation",text:"Déploiement automatisé, suivi et sauvegarde."}],
    stages: [{title:"Cadrage",text:"Priorités, utilisateurs et résultats attendus."},{title:"Design",text:"Parcours, prototypes et tests rapides."},{title:"Développement",text:"Modules livrés et vérifiés par itérations."},{title:"Transfert",text:"Documentation, formation et maintenance."}],
    deployment: "La mise en service suit une stratégie progressive avec environnements séparés, recette métier, plan de retour arrière et accompagnement des utilisateurs.",
    results: ["Services plus lisibles", "Données mieux tracées", "Intégrations simplifiées", "Évolutions moins risquées"],
    difficulties: [{challenge:"Procédures implicites",response:"Ateliers métier et formalisation avant développement."},{challenge:"Systèmes existants",response:"API, adaptateurs et migrations contrôlées."},{challenge:"Maintenabilité",response:"Architecture modulaire, tests et documentation."}],
    gallery: ["atelier-produit.webp","interface-plateforme.webp","mise-en-production.webp"]
  }
};
