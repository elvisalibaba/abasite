# Prompt maître pour Codex — Site institutionnel ABA

Tu travailles dans le dépôt du site officiel d’Africa Business Agency (ABA), construit avec Next.js App Router, React et TypeScript, sans bibliothèque CSS externe.

## Objectif

Faire évoluer le site sans casser son identité institutionnelle moderne. Le résultat doit rester crédible pour une agence travaillant avec des institutions publiques, des entreprises et des organisations stratégiques en République Démocratique du Congo.

## Direction visuelle obligatoire

- Palette principale : rouge ABA `#cf171e`, noir `#111214`, blanc et gris neutres.
- Style : institutionnel, premium, contemporain, structuré, sobre.
- Grands titres, grilles éditoriales, lignes fines, aplats sombres, accents rouges.
- Ne pas utiliser de gradients multicolores, d’illustrations génériques de robots, de personnes flottantes, d’emojis ou d’effets “startup SaaS”.
- Conserver les blocs visuels abstraits CSS tant que les photos officielles ne sont pas fournies.
- Responsive obligatoire à 1050 px et 720 px.

## Architecture existante à respecter

- `app/` contient les routes App Router.
- `components/` contient les composants réutilisables.
- `lib/site-data.ts` centralise les contenus structurés.
- `app/globals.css` contient le design system et les styles globaux.
- L’en-tête et le pied de page sont montés dans `app/layout.tsx`.
- Les routes dynamiques utilisent `generateStaticParams` et `generateMetadata`.

## Règles de développement

1. Réutiliser les composants existants avant d’en créer de nouveaux.
2. Ne jamais dupliquer les données éditoriales dans plusieurs pages. Ajouter ou modifier les contenus dans `lib/site-data.ts`.
3. Utiliser `next/link` pour les liens internes.
4. Ajouter des métadonnées SEO à chaque nouvelle page.
5. Maintenir l’accessibilité : titres hiérarchisés, labels, attributs ARIA utiles, contrastes lisibles et navigation clavier.
6. Ne pas ajouter de dépendance sans nécessité démontrée.
7. Ne pas inventer de partenaires, contrats, statistiques, certifications ou noms de responsables.
8. Ne pas publier de données confidentielles relatives aux projets institutionnels.
9. Pour les documents, n’activer un téléchargement que lorsqu’un vrai fichier existe dans `public/documents/`.
10. Après chaque modification, exécuter :

```bash
npm run typecheck
npm run build
```

## Pages disponibles

- `/`
- `/institution`
- `/expertises`
- `/expertises/[slug]`
- `/projets`
- `/projets/[slug]`
- `/actualites`
- `/actualites/[slug]`
- `/documents`
- `/contact`
- `/mentions-legales`
- `/politique-confidentialite`

## Prochaines améliorations prioritaires

1. Remplacer le monogramme typographique ABA par le logo officiel, sans modifier les proportions de l’en-tête.
2. Ajouter les photos officielles optimisées avec `next/image` et des textes alternatifs précis.
3. Connecter le formulaire de contact à une solution d’envoi sécurisée côté serveur avec variables d’environnement.
4. Ajouter un espace d’administration ou un CMS uniquement après validation du modèle éditorial.
5. Ajouter les vrais PDF dans `public/documents/`, puis remplacer les boutons désactivés par des liens de téléchargement.
6. Créer les pages de direction, partenariats ou carrières seulement lorsque les informations officielles sont fournies.

## Format de réponse attendu de Codex

- Commencer par inspecter les fichiers concernés.
- Expliquer brièvement les changements réalisés.
- Fournir les fichiers modifiés ou appliquer directement les changements.
- Signaler clairement les contenus officiels manquants au lieu de les inventer.
- Terminer par le résultat de `npm run typecheck` et `npm run build`.
