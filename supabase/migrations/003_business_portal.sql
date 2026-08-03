-- Portail opérationnel ABA : projets, agenda, notes, cartes et messagerie.
alter table public.profiles alter column role drop default;
update public.profiles set role = 'personnel' where role::text in ('editor','user');
alter table public.profiles alter column role set default 'personnel'::public.app_role;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  status text not null default 'planifie' check (status in ('planifie','en_cours','bloque','termine')),
  priority text not null default 'normale' check (priority in ('basse','normale','haute','critique')),
  progress integer not null default 0 check (progress between 0 and 100),
  owner_id uuid references public.profiles(id) on delete set null,
  due_date date,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  status text not null default 'a_faire' check (status in ('a_faire','en_cours','termine')),
  assignee_id uuid references public.profiles(id) on delete set null,
  due_date date,
  created_at timestamptz not null default now()
);

create table public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text not null default '',
  event_type text not null default 'reunion',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.staff_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  visibility text not null default 'equipe' check (visibility in ('privee','equipe','direction')),
  author_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.print_cards (
  id uuid primary key default gen_random_uuid(),
  card_number text not null unique,
  holder_name text not null,
  holder_role text not null default '',
  department text not null default '',
  service_name text not null,
  valid_until date,
  photo_url text,
  status text not null default 'active' check (status in ('active','expiree','suspendue')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.mail_messages (
  id uuid primary key default gen_random_uuid(),
  direction text not null default 'outbound' check (direction in ('inbound','outbound')),
  sender text not null,
  recipient text not null,
  subject text not null,
  body text not null default '',
  status text not null default 'draft' check (status in ('draft','queued','sent','received','failed')),
  external_id text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid()); $$;

create or replace function public.is_manager()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin','direction')); $$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

-- Le CMS public reste réservé aux fonctions de pilotage.
drop policy if exists "staff gère services" on public.service_cards;
drop policy if exists "staff gère contenus" on public.content_entries;
drop policy if exists "staff gère médias" on public.media_assets;
create policy "manager gère services" on public.service_cards for all using (public.is_manager()) with check (public.is_manager());
create policy "manager gère contenus" on public.content_entries for all using (public.is_manager()) with check (public.is_manager());
create policy "manager gère médias" on public.media_assets for all using (public.is_manager()) with check (public.is_manager());
drop policy if exists "staff ajoute médias" on storage.objects;
drop policy if exists "staff modifie médias" on storage.objects;
drop policy if exists "staff supprime médias" on storage.objects;
create policy "manager ajoute médias" on storage.objects for insert with check (bucket_id = 'site-media' and public.is_manager());
create policy "manager modifie médias" on storage.objects for update using (bucket_id = 'site-media' and public.is_manager());
create policy "manager supprime médias" on storage.objects for delete using (bucket_id = 'site-media' and public.is_manager());

alter table public.projects enable row level security;
alter table public.project_tasks enable row level security;
alter table public.calendar_events enable row level security;
alter table public.staff_notes enable row level security;
alter table public.print_cards enable row level security;
alter table public.mail_messages enable row level security;

create policy "équipe consulte projets" on public.projects for select using (public.is_staff());
create policy "équipe crée projets" on public.projects for insert with check (public.is_staff());
create policy "équipe modifie projets" on public.projects for update using (public.is_staff()) with check (public.is_staff());
create policy "manager supprime projets" on public.projects for delete using (public.is_manager());
create policy "équipe gère tâches" on public.project_tasks for all using (public.is_staff()) with check (public.is_staff());
create policy "équipe consulte agenda" on public.calendar_events for select using (public.is_staff());
create policy "équipe ajoute agenda" on public.calendar_events for insert with check (public.is_staff());
create policy "équipe modifie agenda" on public.calendar_events for update using (public.is_staff()) with check (public.is_staff());
create policy "manager supprime agenda" on public.calendar_events for delete using (public.is_manager());
create policy "notes visibles selon niveau" on public.staff_notes for select using (
  author_id = auth.uid() or visibility = 'equipe' or (visibility = 'direction' and public.is_manager())
);
create policy "équipe crée notes" on public.staff_notes for insert with check (author_id = auth.uid());
create policy "auteur modifie notes" on public.staff_notes for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "auteur supprime notes" on public.staff_notes for delete using (author_id = auth.uid() or public.is_manager());
create policy "équipe consulte cartes" on public.print_cards for select using (public.is_staff());
create policy "manager gère cartes" on public.print_cards for all using (public.is_manager()) with check (public.is_manager());
create policy "équipe consulte messages" on public.mail_messages for select using (public.is_staff());
create policy "équipe prépare messages" on public.mail_messages for insert with check (public.is_staff());
create policy "manager gère messages" on public.mail_messages for update using (public.is_manager()) with check (public.is_manager());

create index projects_status_idx on public.projects(status);
create index projects_due_date_idx on public.projects(due_date);
create index project_tasks_project_idx on public.project_tasks(project_id);
create index calendar_events_starts_idx on public.calendar_events(starts_at);
create index staff_notes_author_idx on public.staff_notes(author_id);
create index mail_messages_created_idx on public.mail_messages(created_at desc);
