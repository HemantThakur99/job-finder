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

### Prerequisites
- GitHub repository with this code
- MongoDB Atlas account (free tier works)
- Cloudinary account (for image uploads, free tier works)

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Vercel will automatically detect the `vercel.json` configuration

3. **Configure Environment Variables**
   
   In Vercel project settings → **Environment Variables**, add these:

   | Variable | Description | Example |
   |----------|-------------|---------|
   | `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/job-portal` |
   | `JWT_SECRET_KEY` | Long random string for JWT signing | `your-super-secret-random-key-here` |
   | `JWT_EXPIRE` | JWT token expiration time | `7d` |
   | `COOKIE_EXPIRE` | Cookie expiration in days | `7` |
   | `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard | `your-cloud-name` |
   | `CLOUDINARY_API_KEY` | From Cloudinary dashboard | `123456789` |
   | `CLOUDINARY_API_SECRET` | From Cloudinary dashboard | `your-api-secret` |
   | `FRONTEND_URL` | Your Vercel app URL (add after first deploy) | `https://your-app.vercel.app` |
   | `NODE_ENV` | Environment | `production` |

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (2-3 minutes)
   - Vercel will automatically:
     - Install dependencies for both frontend and API
     - Build the React frontend
     - Deploy API as serverless functions

5. **Post-Deployment Setup**
   - After first deploy, copy your Vercel URL (e.g., `https://job-portal.vercel.app`)
   - Update `FRONTEND_URL` environment variable with your actual Vercel URL
   - Redeploy to apply the change

### Verification

After deployment, test these endpoints:
- Frontend: `https://your-app.vercel.app`
- API Health: `https://your-app.vercel.app/api/health`
- API Health with DB: `https://your-app.vercel.app/api/v1/health`

### Troubleshooting

**Build fails:**
- Check that all environment variables are set
- Ensure MongoDB URI is accessible from Vercel (whitelist Vercel IPs in MongoDB Atlas)
- Verify Cloudinary credentials are correct

**API routes not working:**
- Check Vercel function logs in dashboard
- Ensure `MONGO_URI` is correctly set
- Verify MongoDB Atlas network access allows Vercel IPs

**Images not uploading:**
- Verify Cloudinary API credentials
- Check that unsigned upload is enabled in Cloudinary settings

## Project layout

- `frontend/` — React (Vite) frontend application
- `api/` — Express API (deployed as Vercel serverless functions)
- `backend/` — legacy copy for local use only (not deployed)
- `vercel.json` — Vercel deployment configuration
- `package.json` — Root package with build scripts

## Environment Variables Reference

### Frontend (.env)
- `VITE_API_URL` — API base URL (default: `/api/v1`)

### API (.env)
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET_KEY` — Secret for JWT token signing
- `JWT_EXPIRE` — JWT token expiration (default: `7d`)
- `COOKIE_EXPIRE` — Cookie expiration in days (default: `7`)
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `FRONTEND_URL` — Frontend URL for CORS
- `PORT` — API port (default: `4000`)
- `NODE_ENV` — Environment (`development` or `production`)

## Author

Hemant Thakur
