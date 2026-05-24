# ⚙️ Environment Variables for Vercel

## Required Variables for Deployment

Copy these variables to **Vercel Dashboard → Settings → Environment Variables**

### **Database**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-portal?retryWrites=true&w=majority
```

### **Node Environment**
```
NODE_ENV=production
```

### **Frontend URL** (Replace with your Vercel domain)
```
FRONTEND_URL=https://your-project-name.vercel.app
```

### **Cloudinary** (Image Upload Service)
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### **JWT Authentication**
```
JWT_SECRET=your-super-secret-key-12345
JWT_EXPIRE=7d
```

---

## 📖 How to Get Each Variable

### **MongoDB (MONGO_URI)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Select your cluster
3. Click **"Connect"** → **"Drivers"**
4. Copy connection string: `mongodb+srv://user:password@cluster/dbname?retryWrites=true&w=majority`

### **Cloudinary Credentials**
1. Login to [Cloudinary](https://cloudinary.com)
2. Dashboard → API Environment variable
3. Copy: `Cloud Name`, `API Key`, `API Secret`

### **JWT Secret**
Generate a random secure string (e.g., using [randomkeygen.com](https://randomkeygen.com))

---

## ⚠️ Important Notes

- ✅ **Do NOT** commit `.env` files to GitHub
- ✅ Add all these variables in **Vercel Dashboard**, not in code
- ✅ Use different values for development (local) vs production (Vercel)
- ✅ Keep `JWT_SECRET` very secure and unique

---

## 🚀 After Adding Variables

1. In Vercel Dashboard, click **"Redeploy"** on your latest build
2. Wait for deployment to complete
3. Test the health endpoint: `https://your-app.vercel.app/api/health`
4. If successful, you'll see:
```json
{
  "status": "OK",
  "message": "Serverless function is working",
  "env": "production"
}
```

---

## ❌ Troubleshooting

If you get 404 errors after deployment:
1. Verify **all environment variables** are set in Vercel
2. Check **MongoDB connection string** format is correct
3. Redeploy from Vercel Dashboard
4. Check Vercel **Logs** for error messages
