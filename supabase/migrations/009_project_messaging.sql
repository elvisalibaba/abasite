-- Conversations projet, privées, groupes et préférences WhatsApp.
alter table public.profiles add column if not exists whatsapp_phone text;
alter table public.profiles add column if not exists whatsapp_opt_in boolean not null default false;
alter table public.profiles add column if not exists whatsapp_opt_in_at timestamptz;

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  conversation_type text not null check(conversation_type in ('project','direct','group')),
  title text not null default '',
  project_id uuid references public.projects(id) on delete cascade,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check((conversation_type='project' and project_id is not null) or conversation_type<>'project')
);
create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  member_role text not null default 'member' check(member_role in ('owner','admin','member')),
  joined_at timestamptz not null default now(),
  last_read_at timestamptz,
  muted boolean not null default false,
  primary key(conversation_id,user_id)
);
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  message_type text not null default 'text' check(message_type in ('text','system','file')),
  attachment_url text,
  reply_to uuid references public.chat_messages(id) on delete set null,
  edited_at timestamptz,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.is_conversation_member(target uuid)
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.conversation_members where conversation_id=target and user_id=auth.uid()); $$;

alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.chat_messages enable row level security;
create policy "membres voient conversations" on public.conversations for select using (public.is_conversation_member(id));
create policy "utilisateurs créent conversations" on public.conversations for insert with check (created_by=auth.uid() and (project_id is null or public.is_staff() or public.is_project_member(project_id)));
create policy "responsables modifient conversations" on public.conversations for update using (created_by=auth.uid() or exists(select 1 from public.conversation_members where conversation_id=id and user_id=auth.uid() and member_role in ('owner','admin')));
create policy "membres voient participants" on public.conversation_members for select using (public.is_conversation_member(conversation_id));
create policy "créateur ajoute participants" on public.conversation_members for insert with check (user_id=auth.uid() or exists(select 1 from public.conversations where id=conversation_id and created_by=auth.uid()));
create policy "membre quitte conversation" on public.conversation_members for delete using (user_id=auth.uid() or exists(select 1 from public.conversations where id=conversation_id and created_by=auth.uid()));
create policy "membres lisent messages" on public.chat_messages for select using (public.is_conversation_member(conversation_id));
create policy "membres envoient messages" on public.chat_messages for insert with check (sender_id=auth.uid() and public.is_conversation_member(conversation_id));
create policy "auteur modifie message" on public.chat_messages for update using (sender_id=auth.uid()) with check(sender_id=auth.uid());
create index conversations_project_idx on public.conversations(project_id);
create index conversation_members_user_idx on public.conversation_members(user_id);
create index chat_messages_conversation_idx on public.chat_messages(conversation_id,created_at desc);
