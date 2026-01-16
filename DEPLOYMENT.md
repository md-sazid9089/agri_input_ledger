# 🚀 Vercel Deployment Guide

## Quick Start (5 Minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/agriinput-ledger.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Click **"Deploy"** (all settings auto-configured)

### 3. Configure Environment Variable
After deployment:
1. Copy your Vercel URL (e.g., `https://agriinput-ledger.vercel.app`)
2. Go to **Project Settings** → **Environment Variables**
3. Add variable:
   - Name: `NEXT_PUBLIC_API_BASE_URL`
   - Value: `https://your-actual-domain.vercel.app`
4. Go to **Deployments** → Click **"..."** → **"Redeploy"**

### 4. Done! ✅
Your app is live at: `https://your-project-name.vercel.app`

---

## Architecture Overview

### What's Deployed

```
Vercel Platform
├── Next.js Frontend (SSR + Static)
│   ├── Landing page
│   ├── Items catalog
│   ├── Item details
│   ├── Login page
│   └── Add item form
└── Serverless API Functions
    ├── GET /api/items
    └── GET /api/items/[id]
```

### What Changed from Local Development

**Local Setup**:
- Express.js server on `localhost:4000`
- File-based JSON storage with write access
- CORS between `localhost:3000` and `localhost:4000`

**Vercel Deployment**:
- Serverless API functions in `/api` folder
- Static JSON data (read-only)
- Same origin (no CORS needed)
- API available at same domain: `/api/items`

---

## File Structure for Vercel

```
nextjs/
├── api/                         # ✅ NEW: Serverless API functions
│   └── items/
│       ├── index.js            # GET /api/items
│       └── [id].js             # GET /api/items/:id
├── app/                         # Next.js pages
├── components/                  # React components
├── server/                      # ⚠️ Not used in Vercel
│   ├── index.js                # (Local dev only)
│   └── data/
│       └── items.json          # ✅ Used as static data source
├── middleware.js               # Route protection
├── next.config.js              # Next.js config
├── vercel.json                 # ✅ NEW: Vercel config
└── package.json                # Dependencies
```

---

## Environment Variables

### Required

| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Your Vercel URL | API endpoint base URL |

### How to Set

**Via Vercel Dashboard**:
1. Project Settings → Environment Variables
2. Add variable for Production, Preview, and Development
3. Redeploy for changes to take effect

**Via Vercel CLI**:
```bash
vercel env add NEXT_PUBLIC_API_BASE_URL production
vercel env add NEXT_PUBLIC_API_BASE_URL preview
```

---

## Important Limitations

### ⚠️ Data Persistence

**The Problem**:
- Serverless functions are stateless
- Cannot write to file system
- New items won't persist across deployments

**What Happens When You Add an Item**:
1. Form submits data to `/api/items`
2. API returns success (201)
3. Item appears in the UI
4. **BUT**: After page refresh or redeploy, item is gone

**Solutions**:

1. **Use a Database** (Recommended for Production):
   ```bash
   # Options:
   - MongoDB Atlas (free tier)
   - Supabase (PostgreSQL, free tier)
   - PlanetScale (MySQL, free tier)
   - Vercel Postgres
   ```

2. **Use Vercel KV Storage**:
   ```bash
   npm install @vercel/kv
   # Then use it in API routes
   ```

3. **Deploy Backend Separately**:
   ```bash
   # Deploy Express server to:
   - Railway.app
   - Render.com
   - Heroku
   # Update NEXT_PUBLIC_API_BASE_URL to backend URL
   ```

---

## Testing Your Deployment

### Automated Checks

```bash
# Install
npm install -g vercel

# Test production build locally
npm run build
npm run start

# Visit http://localhost:3000
```

### Manual Testing Checklist

- [ ] Landing page loads with all 7 sections
- [ ] Navigation works between pages
- [ ] Items list displays all products
- [ ] Item detail pages load correctly
- [ ] Images display properly
- [ ] Filters work on items page
- [ ] Login form accepts credentials
- [ ] Protected route redirects to login
- [ ] Add item form displays after login
- [ ] Form validation works
- [ ] API endpoints respond: `/api/items`, `/api/items/1`

### API Testing

```bash
# Test with curl
curl https://your-project.vercel.app/api/items

# Should return JSON array of items
```

---

## Continuous Deployment

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
  ```bash
  git push origin main
  # → Deploys to your-project.vercel.app
  ```

- **Preview**: Pull requests and other branches
  ```bash
  git checkout -b feature/new-feature
  git push origin feature/new-feature
  # → Creates preview deployment
  ```

### Deployment Status

Monitor deployments:
1. Vercel Dashboard → Deployments
2. GitHub PR checks (if integrated)
3. Email notifications (configure in settings)

---

## Custom Domain

### Add Custom Domain

1. **Purchase a domain** (Namecheap, GoDaddy, etc.)

2. **Add to Vercel**:
   - Project Settings → Domains
   - Enter domain name
   - Follow DNS configuration instructions

3. **Configure DNS** (example for Cloudflare):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for verification** (up to 48 hours)

5. **Update environment variable**:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
   ```

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Solution: Ensure dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: Build timeout**
```bash
# Solution: Optimize build
# 1. Remove large dependencies
# 2. Use dynamic imports
# 3. Upgrade Vercel plan for longer build time
```

### API Not Working

**Error: 500 Internal Server Error**
```bash
# Check Vercel logs:
# Dashboard → Deployments → [Latest] → Functions
```

**Error: Cannot find module 'items.json'**
```bash
# Solution: Remove items.json from .gitignore
# Commit and push
```

### Images Not Loading

**Error: Invalid src prop**
```bash
# Solution: Update next.config.js
# Ensure remotePatterns allows all hostnames
```

### Authentication Issues

**Cookies not persisting**
```bash
# Solution: Check middleware.js
# Ensure cookies have correct domain
```

---

## Performance Optimization

### 1. Enable Analytics
```bash
# Vercel Dashboard
# Project Settings → Analytics → Enable
```

### 2. Optimize Images
All images are already optimized via Next.js Image component.

### 3. Enable Caching
API responses are automatically cached by Vercel Edge Network.

### 4. Monitor Performance
- Vercel Analytics dashboard
- Web Vitals scores
- Function execution times

---

## Security Best Practices

### Before Going Live

- [ ] Remove hardcoded credentials from code
- [ ] Implement real authentication (OAuth, JWT)
- [ ] Add rate limiting to API endpoints
- [ ] Validate all user inputs
- [ ] Sanitize data before display
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Add Content Security Policy headers
- [ ] Review CORS settings

---

## Cost Estimation

### Vercel Free Tier (Hobby)
- ✅ Unlimited projects
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours serverless function execution
- ✅ Automatic HTTPS
- ✅ Preview deployments

**This project usage**: ~2 GB/month (well within free tier)

### When to Upgrade
- Traffic > 100 GB/month
- Need team collaboration
- Require advanced analytics
- Need priority support

---

## Next Steps After Deployment

1. **Add a Database**:
   - Set up MongoDB Atlas or Supabase
   - Update API routes to use database
   - Add environment variables for DB connection

2. **Implement Real Auth**:
   - Use NextAuth.js
   - Add OAuth providers (Google, GitHub)
   - Store sessions in database

3. **Add Features**:
   - Search functionality
   - User reviews and ratings
   - Admin dashboard
   - Email notifications

4. **Monitor & Optimize**:
   - Set up error tracking (Sentry)
   - Monitor performance (Vercel Analytics)
   - Optimize bundle size
   - Improve SEO

---

## Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Discord**: [vercel.com/discord](https://vercel.com/discord)
- **GitHub Issues**: Report bugs in your repository

---

**Your AgriInput Ledger is ready to help farmers! 🌾**
