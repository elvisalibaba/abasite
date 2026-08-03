# Site institutionnel Africa Business Agency

Site multipage moderne développé avec Next.js App Router, React et TypeScript.

## Installation

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

## Vérification

```bash
npm run lint
npm run typecheck
npm run check:assets
npm run build
npm run test:e2e
npm run test:a11y
```

Les tests Playwright couvrent les pages publiques en affichage ordinateur et mobile,
la navigation au clavier, les débordements horizontaux et les règles WCAG A/AA.

## Structure

- `app/` : pages, routes dynamiques, sitemap et robots.
- `components/` : composants partagés.
- `lib/site-data.ts` : expertises, projets, actualités et documents.
- `public/documents/` : emplacement des documents officiels téléchargeables.
- `CODEX_PROMPT.md` : consignes pour poursuivre le développement avec Codex.

## Contenus à remplacer avant publication

- Logo officiel ABA.
- Photographies institutionnelles validées.
- Documents PDF officiels.
- Coordonnées et mentions légales définitivement validées.
- Identifiants d’envoi Resend et adresse destinataire du formulaire de contact.
# Administration Supabase

Le site dispose d’un espace d’administration à l’adresse `/admin`. Il permet de gérer les textes clés de l’accueil, les images, les cartes de services et les comptes utilisateurs.

## Mise en service

1. Créez un projet sur Supabase.
2. Exécutez les migrations du dossier [`supabase/migrations`](supabase/migrations) dans leur ordre numérique, notamment `012_contact_requests.sql` pour les demandes de contact.
3. Copiez `.env.example` vers `.env.local` et renseignez les trois clés Supabase. La clé `SUPABASE_SERVICE_ROLE_KEY` doit rester exclusivement côté serveur.
4. Dans Supabase Authentication, créez le premier utilisateur.
5. Dans l’éditeur SQL, attribuez-lui le rôle administrateur :

```sql
update public.profiles
set role = 'admin'
where id = 'UUID_DU_PREMIER_UTILISATEUR';
```

6. Démarrez le site avec `npm run dev`, puis ouvrez `http://localhost:3000/admin`.

Les comptes suivants peuvent ensuite être créés directement dans l’interface. Les rôles sont : `admin` (accès complet), `editor` (contenus, services et médias) et `user` (aucun accès au tableau de bord).

## Formulaire de contact

La route serveur `/api/contact` valide les données, limite les envois abusifs et
enregistre les demandes dans Supabase. Pour recevoir aussi une notification par
email, renseignez `RESEND_API_KEY`, `ABA_CONTACT_TO` et, si nécessaire,
`ABA_FROM_EMAIL` (valeur attendue : `contact@aba.cd`). Ces variables restent
strictement côté serveur.
