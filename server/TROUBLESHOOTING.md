# Backend 500 Error Troubleshooting Guide

## Common Causes of 500 Errors

### 1. MongoDB Connection Issues (Most Common)

#### Check MongoDB Connection String
Your connection string contains special characters that might need URL encoding:
```
mongodb+srv://aqeelabdullah654_db_user:Pakistan@125@cluster0.o5qbyqb.mongodb.net/?appName=Cluster0
```

**Issue**: The password `Pakistan@125` contains `@` which might conflict with the connection string format.

#### Solution: URL Encode the Password
The `@` in the password should be encoded as `%40`:

**In Render Environment Variables, use:**
```
mongodb+srv://aqeelabdullah654_db_user:Pakistan%40125@cluster0.o5qbyqb.mongodb.net/?appName=Cluster0
```

Or better yet, create a new MongoDB user with a simpler password without special characters.

---

### 2. MongoDB Atlas IP Whitelist

**Problem**: Render's IP addresses might not be whitelisted in MongoDB Atlas.

#### Solution:
1. Go to MongoDB Atlas Dashboard
2. Click **Network Access** (or **IP Access List**)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (adds `0.0.0.0/0`)
   - ⚠️ Less secure but works for all cloud providers
   - Or add Render's specific IP ranges if known

---

### 3. Missing Environment Variables

**Check in Render Dashboard:**
- Go to your service → **Environment** tab
- Verify these are set:
  - ✅ `MONGODB_URI` (with URL-encoded password if needed)
  - ✅ `JWT_SECRET`
  - ✅ `PORT` (optional, Render sets this automatically)

---

### 4. Check Render Logs

**Steps:**
1. Go to Render Dashboard
2. Click on your service
3. Go to **Logs** tab
4. Look for:
   - `Connected to MongoDB` ✅ (good)
   - `MongoDB connection error:` ❌ (bad - shows the actual error)
   - `MongoDB URI: Missing!` ❌ (MONGODB_URI not set)

---

### 5. Test MongoDB Connection

**Test the connection string locally:**
```bash
# In your local terminal, test the connection
node -e "require('mongoose').connect('YOUR_CONNECTION_STRING').then(() => console.log('Connected!')).catch(e => console.error(e))"
```

---

### 6. Database Name in Connection String

**Current connection string:**
```
mongodb+srv://...@cluster0.o5qbyqb.mongodb.net/?appName=Cluster0
```

**Try adding database name:**
```
mongodb+srv://...@cluster0.o5qbyqb.mongodb.net/portfolio?appName=Cluster0
```

Replace `portfolio` with your actual database name.

---

## Quick Fix Checklist

- [ ] URL encode password (`@` → `%40`)
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] `MONGODB_URI` is set in Render environment variables
- [ ] Check Render logs for actual error message
- [ ] Verify MongoDB connection string format
- [ ] Test `/health` endpoint works
- [ ] Test MongoDB connection locally

---

## Step-by-Step Fix

### Step 1: Update MongoDB Connection String in Render
1. Go to Render Dashboard → Your Service
2. Click **Environment** tab
3. Find `MONGODB_URI`
4. Update it with URL-encoded password:
   ```
   mongodb+srv://aqeelabdullah654_db_user:Pakistan%40125@cluster0.o5qbyqb.mongodb.net/portfolio?appName=Cluster0
   ```
5. Click **Save Changes**
6. Service will automatically redeploy

### Step 2: Check MongoDB Atlas
1. Go to MongoDB Atlas Dashboard
2. **Network Access** → Add `0.0.0.0/0` if not already there
3. **Database Access** → Verify user exists and has proper permissions

### Step 3: Check Render Logs
1. Wait for redeploy to complete
2. Check **Logs** tab
3. Look for: `Connected to MongoDB` ✅

### Step 4: Test API
1. Visit: `https://your-backend.onrender.com/health`
2. Should return: `{"status":"OK","message":"Server is running"}`
3. Visit: `https://your-backend.onrender.com/api/projects`
4. Should return projects array (or `[]` if empty)

---

## Still Not Working?

### Check These:
1. **Render Logs** - Look for the actual error message
2. **MongoDB Atlas Logs** - Check if connection attempts are being blocked
3. **Network Tab in Browser** - Check the actual error response from API
4. **CORS Errors** - Make sure `FRONTEND_URL` is set correctly

### Common Error Messages:

**"MongooseServerSelectionError"**
- MongoDB Atlas IP whitelist issue
- Fix: Add `0.0.0.0/0` to Network Access

**"Authentication failed"**
- Wrong username/password
- Fix: Check credentials, URL encode special characters

**"Connection timeout"**
- Network/firewall issue
- Fix: Check MongoDB Atlas Network Access

**"MongoDB URI: Missing!"**
- Environment variable not set
- Fix: Add `MONGODB_URI` in Render dashboard

---

## Need More Help?

1. Check Render logs for the exact error
2. Check MongoDB Atlas logs
3. Test connection string locally
4. Verify all environment variables are set


