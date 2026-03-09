# FeedHub Backend

FeedHub backend is a production-ready MVP foundation for a multi-restaurant food ordering platform.

## Features
- Express + MongoDB + Mongoose setup
- JWT auth with bcrypt hashing
- Role-based access (`customer`, `admin`)
- Multi-store management
- Menu management with strict ownership
- Guest and authenticated order creation
- Order status transitions guardrails
- Validation with `express-validator`
- Centralized error handling and consistent responses
- Seed script with realistic demo data

## Project Structure

```bash
server/
  src/
    config/
    constants/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    validators/
    app.js
    server.js
  seed/
    seed.js
  .env.example
  .gitignore
```

## Setup
1. Install dependencies from project root:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp server/.env.example server/.env
   ```
3. Fill required environment values in `server/.env`.

## Environment Variables
- `PORT=5000`
- `NODE_ENV=development`
- `MONGO_URI=<your mongodb uri>`
- `JWT_SECRET=<strong secret>`
- `JWT_EXPIRES_IN=7d`
- `CLIENT_URL=http://localhost:5173`

## Run
From root:
```bash
npm run server
```

Production start:
```bash
npm start
```

## Seed Data
```bash
npm run seed
```
This creates:
- 3 admin users
- 1 demo customer
- 3 stores
- realistic menu items
- sample orders in `Pending`, `Preparing`, `Ready`, and `Completed`

## API Overview
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Stores
- `GET /api/stores`
- `GET /api/stores/:id`
- `POST /api/stores`
- `PUT /api/stores/:id`
- `GET /api/stores/:id/menu`

### Menu
- `POST /api/menu`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`
- `PATCH /api/menu/:id/toggle-availability`

### Orders
- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders/store/:storeId`
- `PATCH /api/orders/:id/status`

### Helpers
- `GET /api/tags`
- `GET /api/health`
