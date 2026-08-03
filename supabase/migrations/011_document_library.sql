-- Banque documentaire ABA : stockage privé, publication contrôlée et versions.
create table if not exists public.document_assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'Institutionnel',
  folder text not null default 'Général',
  version text not null default '1.0',
  path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null default 0,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  visibility text not null default 'internal' check (visibility in ('public','internal')),
  uploaded_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.document_assets enable row level security;
create policy "documents publics publiés" on public.document_assets for select using ((status = 'published' and visibility = 'public') or public.is_manager());
create policy "managers gèrent documents" on public.document_assets for all using (public.is_manager()) with check (public.is_manager());

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('documents','documents',false,26214400,array[
  'application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'
]) on conflict (id) do nothing;

create policy "managers ajoutent documents" on storage.objects for insert with check (bucket_id='documents' and public.is_manager());
create policy "managers lisent documents" on storage.objects for select using (bucket_id='documents' and public.is_manager());
create policy "managers modifient documents" on storage.objects for update using (bucket_id='documents' and public.is_manager());
create policy "managers suppriment documents" on storage.objects for delete using (bucket_id='documents' and public.is_manager());
create policy "visiteurs lisent documents publiés" on storage.objects for select using (
  bucket_id='documents' and exists (
    select 1 from public.document_assets d where d.path=name and d.status='published' and d.visibility='public'
  )
);

create index if not exists document_assets_public_idx on public.document_assets(status,visibility,published_at desc);
create index if not exists document_assets_folder_idx on public.document_assets(folder,category);
