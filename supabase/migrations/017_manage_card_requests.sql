-- Suppression contrôlée des demandes et photos par la direction.
drop policy if exists "direction supprime demandes cartes" on public.card_requests;
create policy "direction supprime demandes cartes" on public.card_requests
for delete to authenticated using(public.is_manager());

drop policy if exists "direction supprime photos cartes" on storage.objects;
create policy "direction supprime photos cartes" on storage.objects
for delete to authenticated
using(bucket_id='card-request-photos' and public.is_manager());
