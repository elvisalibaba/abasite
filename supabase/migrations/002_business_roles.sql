-- Les valeurs enum sont ajoutées dans une migration séparée afin d'être validées
-- avant leur utilisation par la migration du portail opérationnel.
alter type public.app_role add value if not exists 'direction';
alter type public.app_role add value if not exists 'personnel';
alter type public.app_role add value if not exists 'garde';
