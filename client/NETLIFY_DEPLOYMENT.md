# Frontend Deployment Guide for Netlify

## ✅ Pre-Deployment Checklist

Your frontend is now ready for Netlify deployment! Here's what has been configured:
- ✅ `netlify.toml` created with proper build settings
- ✅ `_redirects` file created for React Router SPA routing
- ✅ Environment variables properly configured
- ✅ Build script ready (`npm run build`)

---

## 🚀 Step-by-Step Deployment on Netlify

### Step 1: Prepare Your Repository
1. **Commit all changes** to your repository:
   ```bash
   git add .
   git commit -m "Prepare frontend for Netlify deployment"
   git push origin main
   ```

### Step 2: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in (you can use GitHub to sign in)

### Step 3: Deploy from Git
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"** (or GitLab/Bitbucket)
3. Authorize Netlify to access your repositories
4. Select your repository: `Abdullah929-design/portfolio`

### Step 4: Configure Build Settings

Netlify should auto-detect these settings from `netlify.toml`, but verify:

#### Build Settings:
- **Base directory**: `client` ⚠️ **IMPORTANT: Set this to `client`**
- **Build command**: `npm run build`
- **Publish directory**: `client/dist` (or just `dist` if base is `client`)

#### Environment Variables:
Click **"Show advanced"** → **"New variable"** and add:

1. **VITE_API_BASE_URL**
   ```
   https://your-backend-url.onrender.com
   ```
   ⚠️ **Replace with your actual Render backend URL** (e.g., `https://mern-portfolio-backend.onrender.com`)

   **Note**: If your backend isn't deployed yet, you can:
   - Use `http://localhost:5000` for testing (won't work in production)
   - Deploy backend first, then update this variable
   - Or set it later in Netlify dashboard → Site settings → Environment variables

### Step 5: Deploy
1. Click **"Deploy site"**
2. Netlify will start building your site (usually 1-3 minutes)
3. Once deployed, you'll get a URL like: `https://random-name-123456.netlify.app`

### Step 6: Customize Your Domain (Optional)
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to configure your domain

---

## 🔧 Post-Deployment Steps

### Update Environment Variables
If you need to update `VITE_API_BASE_URL` after deployment:

1. Go to **Site settings** → **Environment variables**
2. Edit `VITE_API_BASE_URL` with your backend URL
3. Click **"Save"**
4. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### Enable Automatic Deploys
- ✅ Already enabled by default when connected to Git
- Every push to `main` branch will trigger a new deployment

---

## 📝 Important Notes

### React Router (SPA) Routing:
- ✅ `_redirects` file ensures all routes work correctly
- All routes redirect to `index.html` for client-side routing

### Environment Variables:
- Variables prefixed with `VITE_` are exposed to your frontend code
- Never commit `.env` files with sensitive data
- Always set environment variables in Netlify dashboard

### Build Output:
- Vite builds to `dist` folder by default
- Netlify will automatically detect and serve this folder

### API Calls:
- Make sure your backend CORS allows your Netlify domain
- Update `FRONTEND_URL` in Render backend with your Netlify URL

---

## 🐛 Troubleshooting

### Build Fails:
- Check that **Base directory** is set to `client`
- Verify `package.json` exists in the `client` folder
- Check build logs in Netlify dashboard
- Ensure Node version is compatible (Netlify uses Node 18 by default)

### 404 Errors on Routes:
- Verify `_redirects` file exists in `client/public/` folder
- Check that `netlify.toml` has redirect rules
- Clear Netlify cache and redeploy

### API Calls Fail:
- Verify `VITE_API_BASE_URL` is set correctly in Netlify
- Check browser console for CORS errors
- Ensure backend CORS allows your Netlify domain
- Test backend URL directly: `https://your-backend.onrender.com/health`

### Environment Variables Not Working:
- Variables must be prefixed with `VITE_` for Vite projects
- Redeploy after adding/updating environment variables
- Check build logs to verify variables are being used

### Build Takes Too Long:
- Check for large dependencies
- Consider optimizing images
- Review bundle size in build logs

---

## ✅ Success Checklist

- [ ] Frontend deployed on Netlify
- [ ] Site is accessible at Netlify URL
- [ ] All routes work correctly (no 404s)
- [ ] API calls working (check browser console)
- [ ] Environment variables set correctly
- [ ] Backend CORS configured for Netlify domain
- [ ] Custom domain configured (optional)

---

## 🔗 Connecting Frontend and Backend

### Update Backend CORS:
In your Render backend, update `FRONTEND_URL` environment variable:
```
https://your-netlify-site.netlify.app
```

Or if using custom domain:
```
https://yourdomain.com
```

### Test the Connection:
1. Open your Netlify site
2. Open browser DevTools → Network tab
3. Try to load projects or contact form
4. Verify API calls are going to your Render backend

---

## 🎉 You're Done!

Your frontend is now live on Netlify! Your portfolio should be fully functional with:
- ✅ Beautiful glassmorphic design
- ✅ Dark/Light mode toggle
- ✅ Responsive layout
- ✅ Connected to your backend API

**Need Help?** Check Netlify's documentation: https://docs.netlify.com

