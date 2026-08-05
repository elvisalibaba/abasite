-- Demandes publiques de cartes, traitées dans ABA Identity Studio.
create sequence if not exists public.aba_card_matricule_seq start 1;

create or replace function public.next_aba_matricule()
returns text language sql security definer set search_path=''
as $$ select 'ABA-' || to_char(current_date,'YYYY') || '-' || lpad(nextval('public.aba_card_matricule_seq')::text,6,'0') $$;

create table if not exists public.card_requests (
  id uuid primary key default gen_random_uuid(),
  matricule text not null unique default public.next_aba_matricule(),
  card_type text not null default 'service' check(card_type in ('service','visite')),
  first_name text not null check(char_length(first_name) between 2 and 80),
  middle_name text not null default '',
  last_name text not null check(char_length(last_name) between 2 and 80),
  job_title text not null,
  department text not null default '',
  phone text not null,
  email text not null,
  photo_path text not null default '',
  status text not null default 'soumise' check(status in ('soumise','en_verification','approuvee','rejetee','imprimee')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists card_requests_status_created_idx on public.card_requests(status,created_at desc);
alter table public.card_requests enable row level security;
grant usage,select on sequence public.aba_card_matricule_seq to anon,authenticated;
grant execute on function public.next_aba_matricule() to anon,authenticated;
grant insert on public.card_requests to anon;
grant select,update on public.card_requests to authenticated;
create policy "public dépose demande carte" on public.card_requests for insert to anon with check(true);
create policy "équipe consulte demandes cartes" on public.card_requests for select using(public.is_staff());
create policy "direction traite demandes cartes" on public.card_requests for update using(public.is_manager()) with check(public.is_manager());

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('card-request-photos','card-request-photos',false,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=false,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

create policy "public dépose photo carte" on storage.objects for insert to anon
with check(bucket_id='card-request-photos');
create policy "équipe consulte photos cartes" on storage.objects for select to authenticated
using(bucket_id='card-request-photos' and public.is_staff());
