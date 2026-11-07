-- CoParent : schéma Supabase. À coller dans SQL Editor > New query > Run.
-- Tables de la consigne (utilisateurs, projets) + tables propres à l'app.
-- Un « projet » = un espace famille. RLS : chacun ne voit que les familles dont il est membre.

create table public.utilisateurs (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  nom text,
  couleur text not null default 'a' check (couleur in ('a', 'b')),
  langue text not null default 'fr' check (langue in ('fr', 'en')),
  cree_a timestamptz not null default now()
);

create table public.projets (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  statut text not null default 'actif' check (statut in ('actif', 'archive')),
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'business')),
  proprietaire_id uuid not null references public.utilisateurs (id) on delete cascade,
  cree_a timestamptz not null default now()
);

create table public.membres (
  projet_id uuid not null references public.projets (id) on delete cascade,
  utilisateur_id uuid not null references public.utilisateurs (id) on delete cascade,
  role text not null default 'parent' check (role in ('parent', 'lecture')),
  primary key (projet_id, utilisateur_id)
);

create table public.enfants (
  id uuid primary key default gen_random_uuid(),
  projet_id uuid not null references public.projets (id) on delete cascade,
  prenom text not null check (char_length(prenom) <= 50),
  date_naissance date not null
);

create table public.evenements (
  id uuid primary key default gen_random_uuid(),
  projet_id uuid not null references public.projets (id) on delete cascade,
  enfant_id uuid references public.enfants (id) on delete set null,
  type text not null check (type in ('garde', 'vacances', 'achat', 'besoin', 'reunion_scolaire', 'activite')),
  categorie text check (categorie in ('sport', 'spectacle', 'sortie', 'anniversaire')),
  titre text not null check (char_length(titre) <= 200),
  date date not null,
  heure time,
  lieu text check (char_length(lieu) <= 120),
  parent_responsable_id uuid references public.utilisateurs (id),
  montant numeric(10, 2) check (montant >= 0),
  statut text not null default 'propose' check (statut in ('propose', 'valide', 'refuse', 'fait')),
  cree_par uuid not null default auth.uid() references public.utilisateurs (id),
  cree_a timestamptz not null default now()
);

create index on public.evenements (projet_id, date);

-- Profil créé automatiquement à la première connexion par lien magique.
create function public.creer_utilisateur() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.utilisateurs (id, email) values (new.id, new.email);
  return new;
end $$;
create trigger apres_inscription after insert on auth.users
  for each row execute function public.creer_utilisateur();

-- Le créateur d'un espace famille en devient membre.
create function public.ajouter_proprietaire() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.membres (projet_id, utilisateur_id) values (new.id, new.proprietaire_id);
  return new;
end $$;
create trigger apres_creation_projet after insert on public.projets
  for each row execute function public.ajouter_proprietaire();

-- security definer : évite la récursion des politiques sur la table membres.
create function public.est_membre(p uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.membres where projet_id = p and utilisateur_id = auth.uid());
$$;

alter table public.utilisateurs enable row level security;
alter table public.projets enable row level security;
alter table public.membres enable row level security;
alter table public.enfants enable row level security;
alter table public.evenements enable row level security;

create policy "mon profil" on public.utilisateurs for all using (id = auth.uid()) with check (id = auth.uid());
create policy "co-parents visibles" on public.utilisateurs for select
  using (exists (select 1 from public.membres m where m.utilisateur_id = utilisateurs.id and public.est_membre(m.projet_id)));

create policy "voir ses familles" on public.projets for select using (public.est_membre(id));
create policy "créer sa famille" on public.projets for insert with check (proprietaire_id = auth.uid());
create policy "modifier sa famille" on public.projets for update using (proprietaire_id = auth.uid());

create policy "voir les membres" on public.membres for select using (public.est_membre(projet_id));

create policy "enfants de la famille" on public.enfants for all
  using (public.est_membre(projet_id)) with check (public.est_membre(projet_id));

create policy "voir les événements" on public.evenements for select using (public.est_membre(projet_id));
create policy "proposer un événement" on public.evenements for insert
  with check (public.est_membre(projet_id) and cree_par = auth.uid());
-- Valider / refuser : seul l'autre parent peut changer le statut d'une proposition.
create policy "décider ou modifier" on public.evenements for update
  using (public.est_membre(projet_id) and (cree_par = auth.uid() or statut = 'propose'))
  with check (public.est_membre(projet_id));
create policy "supprimer ses événements" on public.evenements for delete using (cree_par = auth.uid());

-- Règle métier en base : on ne valide ni ne refuse sa propre proposition.
create function public.verifier_decision() returns trigger
language plpgsql as $$
begin
  if old.statut = 'propose' and new.statut in ('valide', 'refuse') and old.cree_par = auth.uid() then
    raise exception 'Seul l''autre parent peut valider ou refuser cette proposition.';
  end if;
  return new;
end $$;
create trigger avant_decision before update on public.evenements
  for each row execute function public.verifier_decision();

-- Invitation du second parent : à brancher plus tard (fonction serveur avec la clé service_role).
