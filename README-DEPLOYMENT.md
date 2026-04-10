# Job Portal - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the `vercel.json` configuration
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `VITE_API_URL`: Your deployed backend URL
6. Click "Deploy"

### 3. Environment Variables Setup
In Vercel Dashboard → Settings → Environment Variables:
```
MONGO_URI=mongodb+srv://your-connection-string
NODE_ENV=production
VITE_API_URL=https://your-app.vercel.app
```

### 4. Post-Deployment
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.vercel.app/api/`
- Test all functionality

## 🔧 Troubleshooting

### Common Issues:
1. **Build Failures**: Check `package.json` scripts
2. **API Errors**: Verify environment variables
3. **Database Issues**: Check MongoDB connection string
4. **CORS Issues**: Ensure backend allows frontend origin

### Deployment Commands (if needed):
```bash
# Frontend build
cd frontend && npm run build

# Backend start
cd backend && npm start
```

## 📱 Supported Features
- ✅ React frontend deployment
- ✅ Node.js backend API
- ✅ MongoDB database integration
- ✅ Automatic SSL certificates
- ✅ Global CDN distribution
