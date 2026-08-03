create or replace function public.is_project_member(target_project uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.project_members where project_id=target_project and user_id=auth.uid()) or exists(select 1 from public.projects where id=target_project and owner_id=auth.uid()); $$;

create or replace function public.is_project_lead(target_project uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.projects where id=target_project and owner_id=auth.uid()) or public.is_manager(); $$;

drop policy if exists "équipe consulte projets" on public.projects;
drop policy if exists "équipe crée projets" on public.projects;
drop policy if exists "équipe modifie projets" on public.projects;
create policy "accès projets affectés" on public.projects for select using (public.is_staff() or public.is_project_member(id));
create policy "interne crée projets" on public.projects for insert with check (public.is_staff());
create policy "responsable modifie projets" on public.projects for update using (public.is_staff() or owner_id=auth.uid()) with check (public.is_staff() or owner_id=auth.uid());

drop policy if exists "équipe gère tâches" on public.project_tasks;
create policy "membres consultent tâches" on public.project_tasks for select using (public.is_staff() or public.is_project_member(project_id));
create policy "membres créent tâches" on public.project_tasks for insert with check (public.is_staff() or public.is_project_member(project_id));
create policy "membres modifient tâches" on public.project_tasks for update using (public.is_staff() or public.is_project_member(project_id)) with check (public.is_staff() or public.is_project_member(project_id));
create policy "responsable supprime tâches" on public.project_tasks for delete using (public.is_project_lead(project_id));

drop policy if exists "équipe gère membres projet" on public.project_members;
create policy "membres voient équipe" on public.project_members for select using (public.is_staff() or public.is_project_member(project_id));
create policy "responsable ajoute équipe" on public.project_members for insert with check (public.is_project_lead(project_id));
create policy "responsable modifie équipe" on public.project_members for update using (public.is_project_lead(project_id)) with check (public.is_project_lead(project_id));
create policy "responsable retire équipe" on public.project_members for delete using (public.is_project_lead(project_id));

drop policy if exists "équipe gère commentaires" on public.project_comments;
create policy "membres consultent commentaires" on public.project_comments for select using (public.is_staff() or public.is_project_member(project_id));
create policy "membres commentent" on public.project_comments for insert with check ((public.is_staff() or public.is_project_member(project_id)) and author_id=auth.uid());

drop policy if exists "équipe gère checklist" on public.task_checklist_items;
create policy "membres consultent checklist" on public.task_checklist_items for select using (exists(select 1 from public.project_tasks t where t.id=task_id and (public.is_staff() or public.is_project_member(t.project_id))));
create policy "membres gèrent checklist" on public.task_checklist_items for all using (exists(select 1 from public.project_tasks t where t.id=task_id and (public.is_staff() or public.is_project_member(t.project_id)))) with check (exists(select 1 from public.project_tasks t where t.id=task_id and (public.is_staff() or public.is_project_member(t.project_id))));

drop policy if exists "profile personnel visible" on public.profiles;
create policy "profils équipe projet visibles" on public.profiles for select using (id=auth.uid() or public.is_admin() or public.is_manager() or exists(select 1 from public.project_members mine join public.project_members theirs on theirs.project_id=mine.project_id where mine.user_id=auth.uid() and theirs.user_id=profiles.id));

create index if not exists projects_owner_idx on public.projects(owner_id);
