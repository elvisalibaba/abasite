-- Profil public associé uniquement aux cartes de visite approuvées.
alter table public.card_requests
  add column if not exists public_slug text unique,
  add column if not exists bio text not null default '',
  add column if not exists linkedin_url text not null default '',
  add column if not exists personal_website text not null default '';

grant select on public.card_requests to anon;
drop policy if exists "profil carte visite public" on public.card_requests;
create policy "profil carte visite public" on public.card_requests
for select to anon
using(card_type='visite' and status in ('approuvee','imprimee') and public_slug is not null);

create index if not exists card_requests_public_slug_idx
on public.card_requests(public_slug)
where public_slug is not null;
