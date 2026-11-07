# CoParent

**La garde partagée. Enfin simple.**

Un planning commun pour les parents séparés : jours de garde, vacances, achats, besoins, réunions scolaires et activités (sport, spectacles, sorties, anniversaires). Chaque proposition d'un parent attend la validation de l'autre.

Application bilingue français / anglais, pensée d'abord pour le mobile.

> Projet réalisé dans le cadre d'une quête « méga-prompt » : génération avec Lovable, puis export sur GitHub et finalisation dans le code (Next.js).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Supabase** : authentification par lien magique, base PostgreSQL avec sécurité par ligne (RLS)
- **Stripe Checkout** : 3 offres (Starter gratuit, Pro, Business)

## Pages

| Page | Contenu |
|---|---|
| `/` | Héros, fonctionnalités, prix, FAQ, pied de page |
| `/tableau-de-bord` | Barre latérale, calendrier coloré par parent, événements à venir, Valider / Refuser |
| `/parametres` | Profil, Facturation, Équipe |
| `/connexion` | Connexion par lien magique |

## Lancer le projet

```sh
bun install        # ou npm install
bun run dev        # http://localhost:3000
```

**Sans clés, l'app tourne en mode démo** avec des données fictives : aucun compte n'est nécessaire pour la tester. Le sélecteur « Vue de » du tableau de bord permet de passer d'un parent à l'autre pour essayer la validation.

## Brancher Supabase et Stripe

1. Copier `.env.example` en `.env.local` et remplir les clés.
2. **Supabase** : coller `supabase/schema.sql` dans SQL Editor puis exécuter. Ajouter `http://localhost:3000/auth/callback` dans Authentication > URL Configuration.
3. **Stripe (mode test)** : créer deux prix récurrents (Pro 6,99 €/mois, Business 39 €/mois) et renseigner leurs identifiants.

Ne jamais committer `.env.local`.

## État du projet

**Fait** : interface complète FR / EN, règle de validation entre parents, schéma de base de données avec RLS, connexion par lien magique, paiement Stripe Checkout, tests des règles métier.

**Reste à faire** :
- Remplacer les données de démonstration par les lectures et écritures Supabase
- Webhook Stripe pour enregistrer l'offre souscrite
- Envoi réel de l'invitation au second parent
- Événements récurrents (entraînement chaque mercredi, par exemple)
- Export PDF de l'offre Pro

## Tests

```sh
bun run test
```
