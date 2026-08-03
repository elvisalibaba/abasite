-- Valeurs ajoutées séparément pour respecter la validation transactionnelle PostgreSQL.
alter type public.app_role add value if not exists 'chef_projet';
alter type public.app_role add value if not exists 'externe';
