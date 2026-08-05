-- Référence du dépôt de travail associé à un projet opérationnel.
alter table public.projects
  add column if not exists repository_url text;

-- Ajout idempotent d'ABA Identity Studio au portefeuille de l'administration.
insert into public.projects (name, description, status, priority, progress, repository_url)
select
  'ABA Identity Studio',
  'Plateforme de génération de signatures e-mail professionnelles et de cartes de service CR80, avec exports PNG haute définition pour imprimante Evolis Avansia.',
  'en_cours',
  'haute',
  25,
  'https://github.com/elvisalibaba/carte'
where not exists (
  select 1
  from public.projects
  where repository_url = 'https://github.com/elvisalibaba/carte'
     or lower(name) = lower('ABA Identity Studio')
);

-- Complète aussi une éventuelle fiche créée avant l'ajout de repository_url.
update public.projects
set repository_url = 'https://github.com/elvisalibaba/carte',
    updated_at = now()
where lower(name) = lower('ABA Identity Studio')
  and repository_url is distinct from 'https://github.com/elvisalibaba/carte';
