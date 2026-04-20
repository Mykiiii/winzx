# Winzx MVP

Winzx is a Topmate-like creator monetization platform MVP.

## Repos in this monorepo

- `winzx-api`: NestJS + Prisma + PostgreSQL backend
- `winzx-web`: Next.js (App Router) frontend

## Backend quickstart

```bash
cd winzx-api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

Backend runs at `http://localhost:4000` and serves API under `/api`.

### API routes (MVP)

- `POST /api/users`
- `GET /api/users/username/:username`
- `POST /api/services`
- `GET /api/services/user/:userId`
- `GET /api/services/:id`
- `POST /api/bookings`
- `GET /api/bookings/service/:serviceId`
- `PATCH /api/bookings/:id/cancel`

## Frontend quickstart

```bash
cd winzx-web
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## MVP flow

1. Create creator/buyer users via API.
2. Create service for a creator.
3. Open `/profile/{username}` to see creator storefront.
4. Open `/book/{serviceId}` to create a booking.

Booking creation prevents double booking for the same service and slot when booking is pending/confirmed.
