create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','closed','spam')),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.contact_requests enable row level security;
revoke all on public.contact_requests from anon, authenticated;
create index if not exists contact_requests_created_at_idx on public.contact_requests(created_at desc);
