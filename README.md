# Noor & Bloom — Flower Boutique

Full-stack flower boutique: React 18 + Vite SPA ("Noor & Bloom" brand) backed by an Express 5 + MongoDB Atlas API.

## Structure

```
flower-react/
├── frontend/              React 18 + Vite 5 + react-router-dom 6 — dev port 5173
│   ├── src/               pages, components, hooks, contexts, services, styles
│   ├── public/            static assets (images, favicon)
│   ├── .env               VITE_API_URL, optional VITE_SITE_URL
│   ├── package.json
│   └── vite.config.js     dev server + build-time robots.txt / sitemap.xml generation
│
├── backend/               Express 5 + Mongoose 9 (ESM) — port 5000
│   ├── config/            MongoDB connection
│   ├── controllers/       auth, flowers, orders, contact handlers
│   ├── models/            User, Flower, Order, ContactMessage schemas
│   ├── routes/            /api route definitions
│   ├── middleware/        JWT auth + RBAC, validators, rate limiter, error handler
│   ├── utils/             seed script (admin + 8 flowers), helpers and reset email
│   ├── server.js          app entry
│   ├── .env               MONGO_URI, JWT_SECRET, CLIENT_URL, PORT
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting started

### Backend (port 5000)

```bash
cd backend
npm install
```

Create `backend/.env`:

```
MONGO_URI=<MongoDB Atlas connection string>
JWT_SECRET=<long random string>
CLIENT_URL=http://localhost:5173
PORT=5000
SMTP_HOST=<your SMTP host>
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your SMTP username>
SMTP_PASSWORD=<your SMTP password>
SMTP_FROM=Noor & Bloom <no-reply@your-domain>
```

```bash
npm run seed   # seeds the admin user + 8 flowers (credentials in utils/seed.js)
npm start      # or: npx nodemon server.js
```

Health check: `GET http://localhost:5000/api/health`

### Frontend (port 5173)

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
# Optional — used at build time for robots.txt + sitemap.xml:
# VITE_SITE_URL=https://your-real-domain
```

```bash
npm run dev     # http://localhost:5173
npm run build   # production build → dist/
```

## Notes

- Password recovery sends one-time reset links through SMTP. Configure the `SMTP_*` values above and set `CLIENT_URL` to the deployed HTTPS frontend origin; links expire after 30 minutes.
- Registration social-provider buttons remain disabled until OAuth providers and their server-side callbacks are configured.
- Auth: JWT Bearer tokens (stored under `cb-token`), roles `customer` / `admin`; admin-only routes under `/admin`.
- Orders: prices are always recomputed server-side from the DB; payment is demo / pay-on-delivery.
- CORS allowlists a single frontend origin (`CLIENT_URL`) — the dev server must run on port 5173.
- Never commit `.env` files or expose `MONGO_URI` / `JWT_SECRET` in frontend code.
