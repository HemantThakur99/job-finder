# ✅ DEPLOYMENT CHECKLIST - Before Uploading to Vercel

## Pre-Deployment Checks

- [ ] All code is committed to GitHub (`git push origin main`)
- [ ] No errors in terminal when running locally
- [ ] Frontend builds successfully (`npm run build` in frontend folder)
- [ ] All dependencies installed (`npm install` in api and frontend folders)

## Vercel Setup Checklist

- [ ] GitHub account is connected to Vercel
- [ ] New Project created in Vercel Dashboard
- [ ] Repository imported successfully
- [ ] `vercel.json` is present (for proper routing)

## Environment Variables Setup (CRITICAL!)

**In Vercel Dashboard → Settings → Environment Variables:**

- [ ] `MONGO_URI` = Your MongoDB connection string
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = Your Vercel domain (e.g., `https://my-app.vercel.app`)
- [ ] `CLOUDINARY_CLOUD_NAME` = Your Cloudinary name
- [ ] `CLOUDINARY_API_KEY` = Your API key
- [ ] `CLOUDINARY_API_SECRET` = Your API secret
- [ ] `JWT_SECRET` = A secure random string
- [ ] `JWT_EXPIRE` = `7d`

## Deployment Steps

1. [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. [ ] Click "New Project"
3. [ ] Select your `job-portal` repository from GitHub
4. [ ] Click "Import"
5. [ ] **DON'T deploy yet** - Add all environment variables first
6. [ ] Add environment variables (see checklist above)
7. [ ] Click "Deploy"
8. [ ] Wait 2-3 minutes for build to complete

## Post-Deployment Verification

- [ ] Deployment shows **"Ready"** (green checkmark)
- [ ] Visit `https://your-app.vercel.app` (frontend loads)
- [ ] Visit `https://your-app.vercel.app/api/health` (API responds with OK)
- [ ] Try logging in or creating an account
- [ ] Upload a resume (tests file upload to Cloudinary)
- [ ] Create/apply for a job (tests database)

## Troubleshooting If 404 Error Occurs

1. [ ] Check all environment variables are set in Vercel
2. [ ] Verify MongoDB connection string format is correct
3. [ ] Go to Deployments → click latest → view **Logs**
4. [ ] Look for error messages in logs
5. [ ] Click **"Redeploy"** button in Vercel
6. [ ] Wait for redeploy to complete (should fix 404)

## If Still Getting 404

Contact Support with these details:
- Vercel Project URL
- Error message from Logs
- MongoDB connection status
- Environment variables are set (yes/no)

---

## 🎉 Success Indicators

✅ Frontend loads at `https://your-app.vercel.app`
✅ `/api/health` returns `{"status": "OK"}`
✅ Can login/register
✅ Can view and apply for jobs
✅ Can upload CV files

---

**Your deployment URL:** `https://your-project-name.vercel.app`

Replace with your actual Vercel domain from dashboard!
