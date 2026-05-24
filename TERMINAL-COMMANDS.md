# 💻 Terminal Commands for Vercel Deployment

## Copy & Paste These Commands

### Step 1: Navigate to Your Project
```bash
cd c:\Users\Hemant\OneDrive\Desktop\job-portal
```

### Step 2: Commit All Changes
```bash
git add .
```

### Step 3: Commit with Message
```bash
git commit -m "Fix Vercel 404 deployment error - serverless handler and routing fixed"
```

### Step 4: Push to GitHub
```bash
git push origin main
```

### Optional: Verify Changes Pushed
```bash
git log --oneline -5
```
Should show your latest commit at the top.

---

## ✅ After Pushing - What to Do in Browser

### 1. Go to Vercel
```
https://vercel.com/dashboard
```

### 2. Create New Project
- Click "New Project"
- Select "Import Git Repository"
- Choose `job-portal` repository
- Click "Import"

### 3. Add Environment Variables
**Click Settings → Environment Variables → Add**

| Variable | Value | 
|----------|-------|
| MONGO_URI | `mongodb+srv://username:password@cluster.mongodb.net/job-portal?retryWrites=true&w=majority` |
| NODE_ENV | `production` |
| FRONTEND_URL | `https://your-app-name.vercel.app` |
| CLOUDINARY_CLOUD_NAME | Your Cloudinary cloud name |
| CLOUDINARY_API_KEY | Your Cloudinary API key |
| CLOUDINARY_API_SECRET | Your Cloudinary API secret |
| JWT_SECRET | Any random string (e.g., `your-secret-key-12345`) |
| JWT_EXPIRE | `7d` |

### 4. Deploy
- Click "Deploy" button
- Wait 2-3 minutes
- ✅ Done!

---

## Testing Commands (After Deployment)

### Test API Health
```bash
curl https://your-app-name.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Serverless function is working",
  "env": "production",
  "timestamp": "2026-05-24T..."
}
```

### Test Frontend
```bash
# Just open in browser:
# https://your-app-name.vercel.app
```

---

## Local Testing (Before Deploying)

### Build Frontend Locally
```bash
cd frontend
npm run build
cd ..
```

### Start Backend Locally
```bash
cd api
npm install
npm start
cd ..
```

### Install Dependencies (if needed)
```bash
# In frontend folder
cd frontend
npm install
cd ..

# In api folder
cd api
npm install
cd ..
```

---

## Redeploy (If Needed)

### From Terminal
```bash
git add .
git commit -m "Additional fixes"
git push origin main
# Then go to Vercel Dashboard and click "Redeploy"
```

### From Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Deployments" tab
4. Click "..." on latest deployment
5. Click "Redeploy"

---

## View Deployment Logs

```bash
# Open this in browser:
# https://vercel.com/dashboard/your-project/deployments
# Click latest deployment → View Logs
```

Or use Vercel CLI:
```bash
npm install -g vercel
vercel logs
```

---

## Useful Vercel CLI Commands

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy from Terminal
```bash
vercel --prod
```

### Check Deployment Status
```bash
vercel list
```

### Pull Environment Variables
```bash
vercel env pull
```

---

## Git Commands Reference

### Check Status
```bash
git status
```

### View Recent Commits
```bash
git log --oneline -10
```

### Undo Last Commit (Before Push)
```bash
git reset HEAD~1
```

### View Branches
```bash
git branch -a
```

---

## 🎯 TL;DR - Just Run These 4 Commands

```bash
cd c:\Users\Hemant\OneDrive\Desktop\job-portal
git add .
git commit -m "Fix Vercel 404 deployment error"
git push origin main
```

Then:
1. Go to [vercel.com](https://vercel.com/dashboard)
2. Import repository
3. Add 8 environment variables
4. Click Deploy
5. ✅ Done!

---

## Common Issues & Fixes

### Git Not Found
```bash
# Install Git from: https://git-scm.com
# Then restart terminal
```

### Permission Denied
```bash
# Windows: Run Terminal as Administrator
# Or use PowerShell instead of CMD
```

### MONGO_URI Connection Error
```bash
# Make sure MongoDB Atlas IP whitelist includes Vercel IPs
# Or use: Allow access from anywhere (0.0.0.0/0)
```

### Still Getting 404?
```bash
# 1. Verify all env vars in Vercel Dashboard
# 2. Click Redeploy
# 3. Check Vercel Logs for errors
# 4. Check vercel.json is correct
```

---

## Need Help?

1. Check deployment status: Open Vercel Dashboard
2. View logs: Click latest deployment → Logs
3. Read guides: Open files in project:
   - `QUICK-START-DEPLOYMENT.md`
   - `VERCEL-DEPLOYMENT-FIXED.md`
   - `ENV-VARIABLES-GUIDE.md`

---

**Version:** Final Fix
**Date:** May 24, 2026
**Status:** ✅ Ready to Deploy
