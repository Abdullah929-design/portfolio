# Backend Deployment Guide for Render

## ✅ Pre-Deployment Checklist

Your backend is now ready for deployment! Here's what has been updated:
- ✅ CORS configured for production
- ✅ Health check endpoint added (`/health`)
- ✅ Environment variables properly configured
- ✅ MongoDB Atlas connection string ready

---

## 🚀 Step-by-Step Deployment on Render

### Step 1: Prepare Your Repository
1. **Commit all changes** to your repository:
   ```bash
   git add .
   git commit -m "Prepare backend for Render deployment"
   git push origin main
   ```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up or log in (you can use GitHub to sign in)

### Step 3: Create a New Web Service
1. Click **"New +"** button in the dashboard
2. Select **"Web Service"**
3. Connect your GitHub repository (or use public Git repository)
4. Select your repository: `mern-portfolio-main`

### Step 4: Configure the Web Service

#### Basic Settings:
- **Name**: `mern-portfolio-backend` (or any name you prefer)
- **Region**: Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server` ⚠️ **IMPORTANT: Set this to `server`**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### Environment Variables:
Click **"Add Environment Variable"** and add these:

1. **MONGODB_URI**
   ```
   mongodb+srv://aqeelabdullah654_db_user:Pakistan@125@cluster0.o5qbyqb.mongodb.net/?appName=Cluster0
   ```

2. **JWT_SECRET**
   ```
   your-super-secret-jwt-key-here-make-it-long-and-random
   ```
   ⚠️ **Generate a strong random string** (you can use: `openssl rand -base64 32`)

3. **PORT** (Optional - Render sets this automatically)
   ```
   10000
   ```

4. **FRONTEND_URL** (Optional - for CORS, add your frontend URL when deployed)
   ```
   https://your-frontend-domain.com
   ```
   Or leave it as `*` to allow all origins (less secure but works for development)

#### Advanced Settings:
- **Health Check Path**: `/health` (this will help Render monitor your service)
- **Auto-Deploy**: `Yes` (deploys automatically on git push)

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait for the build to complete (usually 2-5 minutes)
4. Once deployed, you'll get a URL like: `https://mern-portfolio-backend.onrender.com`

### Step 6: Test Your Deployment
1. Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. Test an API endpoint:
   - `https://your-backend-url.onrender.com/api/projects`
   - Should return your projects (or empty array if no projects)

---

## 🔧 Post-Deployment Steps

### Update Frontend Environment Variables
Once your backend is deployed, update your frontend `.env` file:

1. Create/update `client/.env`:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```

2. Rebuild and redeploy your frontend with the new API URL

---

## 📝 Important Notes

### Render Free Tier Limitations:
- ⚠️ **Spins down after 15 minutes of inactivity**
- First request after spin-down takes ~30-50 seconds (cold start)
- Consider upgrading to paid plan for always-on service

### MongoDB Atlas:
- ✅ Already connected to your Atlas cluster
- Make sure your Atlas IP whitelist includes `0.0.0.0/0` (all IPs) or Render's IPs

### Environment Variables:
- Never commit `.env` files to Git (already in `.gitignore`)
- Always add sensitive variables in Render dashboard

### Monitoring:
- Check Render logs if deployment fails
- Use `/health` endpoint to verify service is running
- Monitor MongoDB Atlas dashboard for connection issues

---

## 🐛 Troubleshooting

### Build Fails:
- Check that **Root Directory** is set to `server`
- Verify `package.json` exists in the `server` folder
- Check build logs in Render dashboard

### Service Won't Start:
- Verify all environment variables are set correctly
- Check MongoDB connection string format
- Review server logs in Render dashboard

### CORS Errors:
- Add your frontend URL to `FRONTEND_URL` environment variable
- Or temporarily set CORS to `*` for testing

### 502 Bad Gateway:
- Service might be spinning up (wait 30-50 seconds)
- Check if MongoDB connection is successful
- Verify health check endpoint works

---

## ✅ Success Checklist

- [ ] Backend deployed on Render
- [ ] Health check endpoint works (`/health`)
- [ ] API endpoints accessible
- [ ] MongoDB Atlas connected
- [ ] Environment variables set
- [ ] Frontend updated with new API URL

---

## 🎉 You're Done!

Your backend is now live on Render! Update your frontend to use the new API URL and you're ready to go.

**Need Help?** Check Render's documentation: https://render.com/docs

