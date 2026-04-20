# Run Report (2026-04-20)

Attempted to run both projects end-to-end.

## Commands executed

### Backend
1. `cd winzx-api && npm install`
2. `cd winzx-api && npm run start:dev`

### Frontend
1. `cd winzx-web && npm install`
2. `cd winzx-web && npm run dev`

## Result

Both backend and frontend are currently blocked at dependency installation (`npm install`) in this environment due `403 Forbidden` responses from `registry.npmjs.org`, so servers cannot be started here.

### Backend install error excerpt

- `npm ERR! 403 Forbidden - GET https://registry.npmjs.org/@nestjs%2fcli`

### Frontend install error excerpt

- `npm ERR! 403 Forbidden - GET https://registry.npmjs.org/@types%2fnode`

## What to run locally (expected happy path)

```bash
# Terminal 1
cd winzx-api
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev

# Terminal 2
cd winzx-web
cp .env.example .env.local
npm install
npm run dev
```

Then open `http://localhost:3000` and verify:
- Landing page loads.
- `/profile/{username}` fetches creator + services.
- `/book/{serviceId}` creates booking (with duplicate slot protection handled in backend).
