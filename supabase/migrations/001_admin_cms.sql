-- À exécuter dans l’éditeur SQL Supabase.
create extension if not exists "pgcrypto";

create type public.app_role as enum ('admin', 'editor', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  image_url text,
  icon text not null default '↗',
  link text not null default '/contact',
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_entries (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section text not null,
  content_key text not null,
  label text not null,
  value text not null default '',
  content_type text not null default 'text' check (content_type in ('text','textarea','image','link')),
  updated_at timestamptz not null default now(),
  unique(page, section, content_key)
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  public_url text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text not null default '',
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin','editor')); $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.profiles enable row level security;
alter table public.service_cards enable row level security;
alter table public.content_entries enable row level security;
alter table public.media_assets enable row level security;

create policy "profile personnel visible" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "services publics publiés" on public.service_cards for select using (published or public.is_staff());
create policy "staff gère services" on public.service_cards for all using (public.is_staff()) with check (public.is_staff());
create policy "contenus publics" on public.content_entries for select using (true);
create policy "staff gère contenus" on public.content_entries for all using (public.is_staff()) with check (public.is_staff());
create policy "médias publics" on public.media_assets for select using (true);
create policy "staff gère médias" on public.media_assets for all using (public.is_staff()) with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do nothing;
create policy "lecture publique médias" on storage.objects for select using (bucket_id = 'site-media');
create policy "staff ajoute médias" on storage.objects for insert with check (bucket_id = 'site-media' and public.is_staff());
create policy "staff modifie médias" on storage.objects for update using (bucket_id = 'site-media' and public.is_staff());
create policy "staff supprime médias" on storage.objects for delete using (bucket_id = 'site-media' and public.is_staff());

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name','')); return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

insert into public.content_entries (page, section, content_key, label, value, content_type) values
('accueil','hero','hero_title','Titre principal','Nous concevons les infrastructures numériques de demain.','text'),
('accueil','hero','hero_description','Description principale','ABA accompagne les institutions et les organisations stratégiques dans la transformation numérique, la biométrie, la gouvernance des données, le développement logiciel et l’intégration technologique.','textarea'),
('accueil','hero','hero_image','Image principale','/images/aba/home/representation-user-experience-interface-design.jpg','image'),
('accueil','a-propos','about_intro','Introduction à propos','Fondée en 2013 par Claude KIKOKA et Christian KIKOKA, Africa Business Agency est une entreprise congolaise spécialisée dans les systèmes numériques, la biométrie et les technologies de sécurité.','textarea')
on conflict (page, section, content_key) do nothing;

-- Après avoir créé le tout premier utilisateur dans Authentication, rendez-le administrateur :
-- update public.profiles set role = 'admin' where id = 'UUID_DU_PREMIER_UTILISATEUR';
