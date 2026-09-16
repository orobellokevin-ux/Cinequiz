# 🎬 CineQuiz

Quiz cinéma privé à jouer entre amis. MVP simple, local et extensible.

## Prérequis
- Node.js 20+
- npm

## Installation locale

```bash
cp .env.example .env
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

Ouvre http://localhost:3000

## TMDB (optionnel)

Crée une clé API TMDB, renseigne `TMDB_API_KEY` dans `.env`, puis :

```bash
npm run tmdb:sync
```

Les images TMDB sont ensuite stockées sous forme de chemins dans la base. Vérifie les conditions de licence et d'attribution de TMDB avant toute publication publique.

## Docker

```bash
docker compose up --build
```

Puis http://localhost:3000

## GitHub

```bash
git init
git add .
git commit -m "Initial CineQuiz"
git branch -M main
git remote add origin https://github.com/orobellokevin-ux/Cinequiz.git
git push -u origin main
```

## Important
Le MVP utilise SQLite pour rester simple. Pour un déploiement plus sérieux, passer PostgreSQL en changeant le provider Prisma et `DATABASE_URL`.
