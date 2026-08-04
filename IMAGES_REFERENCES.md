# Références des images du site ABA

Ce registre permet d’identifier chaque visuel par page et par numéro. Les chemins commencent dans le dossier `public/`.

## Identité générale

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Logo — image 1 | Header, footer, favicon et partage social | `/image.png` |

## Accueil

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Accueil — image 1 | Grande image du hero | `/images/images news/data-center-it-experts-using-artificial-intelligence-neural-networks-technology.jpg` |
| Accueil — image 2 | Logo du partenaire institutionnel | `/images/partners/partner-institutionnel.png` |
| Accueil — image 3 | Logo Coppernic | `/images/partners/coppernic.png` |
| Accueil — image 4 | Logo de l’écosystème national | `/images/partners/lg.webp` |

L’image et tous les textes du hero d’accueil se modifient directement dans `data/home-content.ts`.

## À propos / Institution

| Référence simple | Utilisation | Fichier |
|---|---|---|
| À propos — image 1 | Hero de la page Institution | `/images/aba/institution/hero.webp` |

## Expertises

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Expertise — image 1 | Biométrie et identité numérique | `/images/aba/expertises/biometrie/hero.webp` |
| Expertise — image 2 | Opération d’enrôlement biométrique | `/images/aba/expertises/biometrie/enrolement.webp` |
| Expertise — image 3 | Gouvernance des données | `/images/aba/expertises/gouvernance-donnees.webp` |
| Expertise — image 4 | Plateformes métier | `/images/aba/expertises/plateformes-metier.webp` |
| Expertise — image 5 | Infrastructure et réseaux | `/images/aba/expertises/infrastructure-reseaux.webp` |
| Expertise — image 6 | IoT et intégration | `/images/aba/expertises/iot-integration.webp` |
| Expertise — image 7 | Sécurité des systèmes | `/images/aba/expertises/securite-si.webp` |
| Expertise — image 8 | Déploiement et supervision | `/images/aba/expertises/deploiement-supervision.webp` |
| Expertise — image 9 | Transformation institutionnelle | `/images/aba/expertises/transformation-institutionnelle.webp` |

Les quatre cartes Expertises de l’accueil utilisent les images 1, 3, 4 et 8. Leurs chemins se modifient dans `data/home-content.ts`, tableau `homeExpertiseImages`.

## Projets

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Projets — image 1 | Hero de la liste des projets | `/images/aba/projects/hero.webp` |
| Projet — image 1 | Contrôle biométrique | `/images/aba/projects/controle-biometrique.webp` |
| Projet — image 2 | Audit de base institutionnelle | `/images/aba/projects/audit-base-institutionnelle.webp` |
| Projet — image 3 | Plateforme terrain | `/images/aba/projects/plateforme-terrain.webp` |
| Projet — image 4 | Centre de monitoring | `/images/aba/projects/centre-monitoring.webp` |
| Projet — image 5 | Gestion des terminaux | `/images/aba/projects/gestion-terminaux.webp` |
| Projet — image 6 | Plateforme institutionnelle | `/images/aba/projects/plateforme-institutionnelle.webp` |

Les galeries détaillées utilisent la convention suivante :

`/images/aba/projects/[slug-du-projet]/[nom-de-l-image].webp`

Exemple : `Projet identification — image 1` correspond à `controle-terrain.webp` dans le dossier du projet.

## Actualités

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Actualités — image 1 | Hero de la page Actualités | `/images/aba/news/hero.webp` |
| Actualité — image 1 | Moderniser l’identification institutionnelle | `/images/aba/news/moderniser-identification-institutionnelle.webp` |
| Actualité — image 2 | Préparer un déploiement multisite | `/images/aba/news/preparer-deploiement-multisite.webp` |
| Actualité — image 3 | Gouvernance des données et décision | `/images/aba/news/gouvernance-donnees-decision.webp` |

## Pages pratiques

| Référence simple | Utilisation | Fichier |
|---|---|---|
| Contact — image 1 | Hero de la page Contact | `/images/aba/contact/hero.webp` |
| Documents — image 1 | Hero de la bibliothèque, même si elle n’est plus dans le header | `/images/aba/documents/hero.webp` |

## Règle recommandée pour les prochains fichiers

Nommer les nouveaux fichiers en minuscules, sans espaces ni accents :

`page-emplacement-numero.webp`

Exemples :

- `accueil-hero-01.webp`
- `projet-controle-biometrique-01.webp`
- `actualite-gouvernance-donnees-01.webp`
- `expertise-securite-hero.webp`

Utiliser de préférence WebP, une largeur de 1600 à 2000 px pour les heros et de 1000 à 1400 px pour les cartes.
