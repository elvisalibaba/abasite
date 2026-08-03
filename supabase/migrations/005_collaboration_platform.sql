alter table public.profiles alter column role set default 'visiteur'::public.app_role;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role in ('admin','direction','personnel','garde')); $$;

alter table public.project_tasks add column if not exists description text not null default '';
alter table public.project_tasks add column if not exists priority text not null default 'normale';
alter table public.project_tasks add column if not exists position integer not null default 0;
alter table public.project_tasks add column if not exists updated_at timestamptz not null default now();

create table public.project_comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  task_id uuid references public.project_tasks(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references auth.users(id) on delete cascade,
  organization text not null,
  contact_name text not null,
  phone text not null default '',
  title text not null,
  project_type text not null default 'transformation_numerique',
  description text not null,
  budget_range text not null default 'a_definir',
  desired_date date,
  status text not null default 'soumis' check (status in ('soumis','en_etude','rendez_vous','accepte','refuse')),
  internal_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_comments enable row level security;
alter table public.project_submissions enable row level security;
create policy "équipe gère commentaires" on public.project_comments for all using (public.is_staff()) with check (public.is_staff() and author_id = auth.uid());
create policy "visiteur crée demande" on public.project_submissions for insert with check (visitor_id = auth.uid());
create policy "visiteur consulte demandes" on public.project_submissions for select using (visitor_id = auth.uid() or public.is_staff());
create policy "équipe traite demandes" on public.project_submissions for update using (public.is_staff()) with check (public.is_staff());
create policy "manager supprime demandes" on public.project_submissions for delete using (public.is_manager());
create index project_comments_project_idx on public.project_comments(project_id, created_at);
create index project_submissions_visitor_idx on public.project_submissions(visitor_id, created_at desc);
