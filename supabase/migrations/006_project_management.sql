-- Fonctions avancées de pilotage inspirées des outils Jira/Monday.
create table public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_role text not null default 'membre',
  created_at timestamptz not null default now(),
  primary key(project_id,user_id)
);
create table public.task_checklist_items (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.project_tasks(id) on delete cascade,
  label text not null,
  completed boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null default '',
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.project_members enable row level security;
alter table public.task_checklist_items enable row level security;
alter table public.activity_log enable row level security;
alter table public.notifications enable row level security;
create policy "équipe gère membres projet" on public.project_members for all using (public.is_staff()) with check (public.is_staff());
create policy "équipe gère checklist" on public.task_checklist_items for all using (public.is_staff()) with check (public.is_staff());
create policy "équipe consulte activité" on public.activity_log for select using (public.is_staff());
create policy "équipe ajoute activité" on public.activity_log for insert with check (public.is_staff());
create policy "utilisateur consulte notifications" on public.notifications for select using (user_id=auth.uid());
create policy "utilisateur lit notifications" on public.notifications for update using (user_id=auth.uid()) with check (user_id=auth.uid());
create index activity_log_created_idx on public.activity_log(created_at desc);
create index notifications_user_idx on public.notifications(user_id,created_at desc);
