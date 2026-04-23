# OrgaFlow — Plateforme enterprise de structuration interne

Application Next.js + Supabase pour piloter un diagnostic organisationnel, le manuel de procédures et la roadmap de digitalisation d'EDOLE AFRICA.

## Stack
- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Supabase (PostgreSQL, Auth, Storage, RLS)
- Déploiement Vercel

## Arborescence
- `app/` routes publiques/privées + API
- `components/` UI et composants métiers
- `lib/` utilitaires et clients Supabase
- `actions/` server actions auth
- `services/` services de données
- `supabase/migrations/` schéma SQL + RLS
- `supabase/seed/` seed SQL de démonstration

## Installation locale
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Initialisation Supabase
```bash
supabase login
supabase link --project-ref $SUPABASE_PROJECT_REF
supabase db push
psql "$SUPABASE_DB_URL" -f supabase/seed/seed.sql
```

> Créer aussi le bucket Storage `orgaflow-documents` (privé) dans Supabase.

## Variables d'environnement
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_PROJECT_REF`

## Déploiement Vercel
1. Push du repo sur GitHub.
2. Import du projet dans Vercel.
3. Configurer les variables d'environnement ci-dessus.
4. Déployer avec la commande de build par défaut Next.js.

## Scripts
- `npm run dev` : développement
- `npm run build` : build production
- `npm run start` : run production
- `npm run lint` : lint
- `npm run type-check` : validation TypeScript
- `npm run db:push` : applique les migrations Supabase

## Commandes exactes (GitHub + Supabase + Vercel)
```bash
# Initialiser localement
npm install
cp .env.example .env.local

# Lier GitHub
git init
git add .
git commit -m "feat: bootstrap orgaflow enterprise app"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/orgaflow.git
git push -u origin main

# Connecter Supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
psql "$SUPABASE_DB_URL" -f supabase/seed/seed.sql

# Lancer en local
npm run dev

# Déployer sur Vercel
npm i -g vercel
vercel login
vercel link
vercel --prod
```

## Convention de commits recommandée
- `feat:` nouvelle fonctionnalité
- `fix:` correction
- `refactor:` amélioration structurelle
- `docs:` documentation
- `chore:` maintenance
