# Job Portal (MERN)

Job listings, applications, and auth — React frontend + Express API on MongoDB.

## Local development

1. Install dependencies:

```bash
npm run install:all
```

2. Copy env files and fill in your values:

```bash
copy api\.env.example api\.env
copy frontend\.env.example frontend\.env
```

3. Run API and frontend (two terminals):

```bash
npm run dev:api
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173)

## Deploy on Vercel

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel reads `vercel.json` automatically (no extra settings needed).
4. Add **Environment Variables** in the project settings:

| Variable | Example |
|----------|---------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET_KEY` | A long random secret |
| `JWT_EXPIRE` | `7d` |
| `COOKIE_EXPIRE` | `7` |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
| `FRONTEND_URL` | `https://your-app.vercel.app` |
| `NODE_ENV` | `production` |

5. Click **Deploy**.

After deploy:

- App: `https://your-app.vercel.app`
- Health check: `https://your-app.vercel.app/api/health`

## Project layout

- `frontend/` — React (Vite)
- `api/` — Express API (used on Vercel and for local dev)
- `backend/` — legacy copy for local use only (not deployed)

## Author

Hemant Thakur
