Deployment Guide — Job Portal

Overview
- This repo contains a Vite React frontend (`frontend/`) and a serverless API under `api/` (compatible with Vercel Functions).
- The `backend/` folder is an alternative Express server for local development; the `api/` folder is used for deployment.

Quick local checks
1. Start API (local):

```powershell
cd api
npm install
npm run dev
```
- Health: http://localhost:5110/api/health

2. Start frontend (local):

```powershell
cd frontend
npm install
npm run dev
```
- Dev UI: http://localhost:5173
- Vite proxy already configured to forward `/api` → `http://localhost:5110`.

If you see "EADDRINUSE" (port in use):

```powershell
# Find node processes using port 5110
Get-NetTCPConnection -LocalPort 5110 -ErrorAction SilentlyContinue
# Or list node processes and kill by Id
Get-Process node | Format-Table Id,ProcessName,StartTime
Stop-Process -Id <PID> -Force
```

Environment variables (set locally and in Vercel):
- MONGO_URI
- JWT_SECRET_KEY
- JWT_EXPIRE (e.g. 7d)
- COOKIE_EXPIRE (days, e.g. 7)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- FRONTEND_URL (recommended, e.g. https://your-site.vercel.app)
- VITE_API_URL (optional; frontend falls back to `/api/v1`)
- NODE_ENV=production (on Vercel)

Important code/config checks
- `api/utils/jwtToken.js` sets `secure: process.env.NODE_ENV === "production"` so local cookies work.
- `api/index.js` uses `cors({ origin: process.env.FRONTEND_URL || true, credentials: true })` to allow cookies from the frontend origin.
- Frontend uses `withCredentials: true` on auth requests; ensure Vercel `FRONTEND_URL` matches the deployed origin.

Repository & Vercel setup
1. Commit and push your changes:

```bash
git add .
git commit -m "Prepare for deployment"
git push
```

2. On Vercel:
- Create a new project → import GitHub repo.
- In Project Settings → Environment Variables, add the list above (Production scope).
- Ensure Build & Output settings (default should work):
  - Build Command: `npm run vercel-build`
  - Output Directory: `frontend/dist`

3. Deploy: Vercel will run build; check the build logs and deployment URL.

Post-deploy validation
- Visit `https://<your-site>/api/health` and `https://<your-site>/api/v1/user/`.
- Test register/login flows from the frontend and confirm cookies are set (browser devtools → Application → Cookies).

Troubleshooting
- 401 Unauthorized on `GET /api/v1/user/getuser`:
  - Confirm cookie is present and not marked `Secure` for non-HTTPS local env.
  - Confirm `FRONTEND_URL` matches deployed origin so CORS allows credentials.
- Cloudinary upload errors: verify `CLOUDINARY_*` env vars and network access.
- MongoDB connection errors: verify `MONGO_URI` and that the Atlas IP whitelist is configured.

Optional cleanup
- Remove or archive the `backend/` folder if you only deploy from `api/` to avoid confusion.

Want me to:
- create a README at repo root with these steps (I just added `README_DEPLOY.md`),
- or push the changes and connect to Vercel for you (I can prepare a PR),
- or walk through the Vercel env var entries interactively?