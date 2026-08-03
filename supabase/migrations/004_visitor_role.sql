-- Rôle public isolé des équipes internes.
alter type public.app_role add value if not exists 'visiteur';
