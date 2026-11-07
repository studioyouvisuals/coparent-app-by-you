# CoParent

**Shared custody. Finally simple.**

**[Open the live app](https://coparent-app-by-you.vercel.app)** (demo mode, no account needed) · [Version française](README.md)

A shared planner for separated parents: custody days, holidays, purchases, needs, school meetings and activities (sports, shows, outings, birthday parties). Every suggestion made by one parent waits for the other parent's approval.

Bilingual French / English, designed mobile first.

> Built as part of a "mega-prompt" quest: generated with Lovable, exported to GitHub, then finished in code (Next.js).

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Supabase**: magic-link authentication, PostgreSQL database with row-level security (RLS)
- **Stripe Checkout**: 3 plans (free Starter, Pro, Business)

## Pages

| Page | What's on it |
|---|---|
| `/` | Hero, features, pricing, FAQ, footer |
| `/tableau-de-bord` | Sidebar, calendar colored by parent, upcoming events, Approve / Decline |
| `/parametres` | Profile, Billing, Team |
| `/connexion` | Magic-link sign-in |

## Run it locally

```sh
bun install        # or npm install
bun run dev        # http://localhost:3000
```

**Without any keys, the app runs in demo mode** with sample data, so you can try it without creating an account. Use the "Viewing as" switch on the dashboard to jump between parents and test the approval flow.

## Connect Supabase and Stripe

1. Copy `.env.example` to `.env.local` and fill in the keys.
2. **Supabase**: paste `supabase/schema.sql` into the SQL Editor and run it. Add `http://localhost:3000/auth/callback` under Authentication > URL Configuration.
3. **Stripe (test mode)**: create two recurring prices (Pro at €6.99/month, Business at €39/month) and add their IDs.

Never commit `.env.local`.

## Project status

**Done**: full FR / EN interface, approval rule between parents, database schema with RLS, magic-link sign-in, Stripe Checkout payment, tests for the business rules.

**Still to do**:
- Replace the demo data with Supabase reads and writes
- Stripe webhook to record the chosen plan
- Actually send the invitation to the second parent
- Recurring events (e.g. practice every Wednesday)
- PDF export for the Pro plan

## Tests

```sh
bun run test
```
