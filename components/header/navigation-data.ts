type SolutionGroup = { label:string; items:Array<[string,string]> };

export const solutionGroups:SolutionGroup[] = [
  { label:"Identité, données et sécurité", items:[
    ["Biométrie et identité numérique","/expertises/biometrie-identite-numerique"],
    ["Audit et gouvernance des données","/expertises/audit-gouvernance-donnees"],
    ["Sécurité des systèmes d’information","/expertises/securite-systemes-information"],
    ["Contrôle d’accès mobile","/expertises/controle-acces-mobile"],
  ]},
  { label:"Solutions, infrastructures et déploiement", items:[
    ["Solutions numériques intégrées","/expertises/solutions-numeriques-integrees"],
    ["GED, ECM et archivage","/expertises/ged-ecm-archivage"],
    ["Infrastructures et réseaux","/expertises/infrastructures-reseaux"],
    ["Déploiement et supervision","/expertises/deploiement-securisation"],
    ["Smart Asset Management","/expertises/smart-asset-management"],
  ]},
];

export const publicLinks = [
  ["Accueil","/"], ["À propos","/institution"], ["Expertises","/expertises"], ["Réalisations","/projets"], ["Actualités","/actualites"], ["Contact","/contact"],
] as const;
