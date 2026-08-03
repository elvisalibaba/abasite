-- Tout nouveau compte public enregistre son WhatsApp dès la création.
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public
as $$ begin
  insert into public.profiles(id,full_name,whatsapp_phone,whatsapp_opt_in,whatsapp_opt_in_at)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),nullif(new.raw_user_meta_data->>'whatsapp_phone',''),true,now());
  return new;
end; $$;
