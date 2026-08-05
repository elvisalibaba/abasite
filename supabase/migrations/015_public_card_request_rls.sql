-- Correctif RLS pour le formulaire public /demande-carte.
-- Idempotent : peut être exécuté même si la migration 014 a déjà été appliquée.
grant usage, select on sequence public.aba_card_matricule_seq to anon, authenticated;
grant execute on function public.next_aba_matricule() to anon, authenticated;
grant insert on public.card_requests to anon;
grant select, update on public.card_requests to authenticated;

drop policy if exists "public dépose demande carte" on public.card_requests;
create policy "public dépose demande carte"
on public.card_requests
for insert
to anon
with check (true);

drop policy if exists "équipe consulte demandes cartes" on public.card_requests;
create policy "équipe consulte demandes cartes"
on public.card_requests
for select
to authenticated
using (public.is_staff());

drop policy if exists "direction traite demandes cartes" on public.card_requests;
create policy "direction traite demandes cartes"
on public.card_requests
for update
to authenticated
using (public.is_manager())
with check (public.is_manager());

drop policy if exists "public dépose photo carte" on storage.objects;
create policy "public dépose photo carte"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'card-request-photos'
  and (storage.foldername(name))[1] is not null
);

drop policy if exists "équipe consulte photos cartes" on storage.objects;
create policy "équipe consulte photos cartes"
on storage.objects
for select
to authenticated
using (bucket_id = 'card-request-photos' and public.is_staff());
