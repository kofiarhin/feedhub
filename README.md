# FeedHub MVP

FeedHub is a multi-restaurant marketplace MVP with customer ordering and restaurant admin management.

## Stack
- Frontend: React + Vite + Redux Toolkit + TanStack Query + Clerk
- Backend: Node.js + Express + MongoDB + Clerk auth middleware

## Run locally
1. Install dependencies:
   - `npm install`
   - `npm install --prefix client`
2. Setup env files from `.env.example` and `client/.env.example`.
3. Seed data (optional): `npm run seed`
4. Start both apps: `npm run dev`

## API base
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:4000`

## Deployment
- Frontend can be deployed to Vercel.
- Backend can be deployed to Heroku/Render.
