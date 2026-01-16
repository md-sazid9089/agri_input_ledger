# AgriInput Ledger

A Vertical SaaS demo application supporting **SDG 2: Zero Hunger** by providing a public catalog of verified agricultural inputs (seeds, fertilizers, and pesticides) to help farmers reduce crop loss and improve yields.

## 🌾 About

AgriInput Ledger addresses critical challenges faced by farmers:
- **Counterfeit inputs**: Up to 30% of agricultural inputs in Bangladesh are fake or substandard
- **Wrong dosage**: Lack of proper information leads to misuse and reduced effectiveness
- **Price manipulation**: Opaque pricing allows exploitation by middlemen

This platform provides a transparent, verified catalog of agricultural products with complete information on dosage, safety, pricing, and certifications.

## 🎯 Supporting SDG 2: Zero Hunger

This application directly contributes to achieving UN Sustainable Development Goal 2 by:
- Increasing crop yields through access to verified, quality inputs
- Reducing crop losses with proper dosage and safety information
- Empowering smallholder farmers with transparent pricing
- Promoting sustainable agricultural practices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router (JavaScript/ReactJS)
- **Backend**: Express.js API server (JavaScript)
- **Styling**: Tailwind CSS
- **Authentication**: Mock login with cookie-based auth
- **Data Storage**: JSON file persistence
- **Middleware**: Next.js middleware for route protection

## 📂 Project Structure

```
agriinput-ledger/
├── app/                          # Next.js App Router pages
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.js                # Root layout
│   ├── page.js                  # Landing page (7 sections)
│   ├── login/
│   │   └── page.js             # Login page with mock auth
│   ├── items/
│   │   ├── page.js             # Items list (public)
│   │   └── [id]/
│   │       └── page.js         # Item details (public)
│   └── add-item/
│       └── page.js             # Add item form (protected)
├── components/
│   ├── Navbar.jsx              # Navigation with auth state
│   ├── Footer.jsx              # Footer with links
│   ├── ItemCard.jsx            # Reusable item card
│   ├── Badge.jsx               # Category/certification badges
│   └── Toast.jsx               # Toast notifications
├── server/
│   ├── index.js                # Express API server
│   ├── package.json            # Server dependencies
│   └── data/
│       └── items.json          # Auto-generated data file
├── middleware.js               # Route protection
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── .env.local                  # Environment variables
└── package.json                # Root dependencies
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd e:\programminghero\nextjs
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Install server dependencies**:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Variables**:
   
   The `.env.local` file is already created with:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

5. **Start the Express API server** (in one terminal):
   ```bash
   npm run server
   ```
   
   The API will run at `http://localhost:4000` with seed data automatically created.

6. **Start the Next.js dev server** (in another terminal):
   ```bash
   npm run dev
   ```
   
   The app will run at `http://localhost:3000`

7. **Or run both servers concurrently**:
   ```bash
   npm run dev:all
   ```

## 📍 Routes Summary

### Public Routes (No Authentication Required)

| Route | Description |
|-------|-------------|
| `/` | Landing page with 7 SDG-focused sections |
| `/items` | Browse all verified agricultural inputs |
| `/items/[id]` | View detailed information for a specific item |
| `/login` | Admin login page |

### Protected Routes (Authentication Required)

| Route | Description |
|-------|-------------|
| `/add-item` | Form to add new agricultural inputs (admin only) |

## 🔐 Authentication

### Mock Login Credentials

The application uses mock authentication for demo purposes:

- **Email**: `admin@agriinputledger.org`
- **Password**: `ledger123`

### How It Works

1. **Login Process**:
   - User submits credentials on `/login`
   - Credentials validated against hardcoded values
   - On success: Sets `agri_auth=1` cookie and redirects
   - On failure: Shows error message

2. **Route Protection**:
   - Next.js `middleware.js` intercepts requests to `/add-item`
   - Checks for `agri_auth` cookie
   - Redirects to `/login?next=/add-item` if not authenticated
   - Allows access if authenticated

3. **Logout**:
   - Clears auth cookies
   - Redirects to homepage

## 🎨 Features Implemented

### Landing Page (7 Required Sections)

1. **Hero Section**: CTA buttons for browsing inputs and admin login
2. **The Problem**: Highlights counterfeit inputs, wrong dosage, and price manipulation
3. **How Verification Works**: 3-step process (Submit → Verify → Publish)
4. **Featured Inputs**: Displays 6 items fetched from API
5. **Dosage & Safety First**: PPE requirements, storage warnings
6. **Browse by Crop**: Quick filter UI for Rice, Wheat, Maize, Vegetables
7. **SDG 2 Impact**: How the platform supports Zero Hunger

### Item Management

- **Browse Items**: Grid layout with filtering options
- **View Details**: Complete product information with dosage and safety notes
- **Add Items**: Protected form with validation and API integration

### Components

- **Navbar**: Responsive navigation with auth state detection
- **Footer**: Links and SDG information
- **ItemCard**: Reusable card with badges, price, and CTA
- **Badge**: Color-coded category and certification badges
- **Toast**: Success/error notifications

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Fetch all items |
| GET | `/api/items/:id` | Fetch single item |
| POST | `/api/items` | Create new item |

### Data Model

Each item contains:
- `id`: Unique identifier
- `name`: Product name
- `description`: Detailed description
- `price`: Price in Taka (BDT)
- `imageUrl`: Product image URL
- `category`: Seed / Fertilizer / Pesticide
- `certification`: Govt Approved / NGO Verified / Company Certified
- `vendor`: Manufacturer/distributor name
- `cropTags`: Comma-separated list of suitable crops
- `dosage`: Application instructions
- `safetyNotes`: Safety and storage information

## 📊 Seeded Data

The Express server automatically creates 12 realistic agricultural input items on first run:

- **Seeds**: Basmati rice, wheat, maize, tomato
- **Fertilizers**: Urea, NPK complex, SSP, vermicompost
- **Pesticides**: Chlorpyrifos, glyphosate, lambda-cyhalothrin, neem oil

## 🧪 Testing the Application

1. **Browse Public Pages**:
   - Visit homepage and explore all 7 sections
   - Click "Browse Inputs" to see all items
   - Click any item card to view details

2. **Test Authentication**:
   - Try accessing `/add-item` without login (should redirect)
   - Login with demo credentials
   - Access `/add-item` (should work)
   - Logout and verify redirect

3. **Add New Item**:
   - Login as admin
   - Navigate to "Add Item"
   - Fill out form with required fields
   - Submit and verify creation
   - Check `/items` page for new item

## 🔧 npm Scripts

### Root Package Scripts

```json
{
  "dev": "next dev",              // Start Next.js dev server
  "build": "next build",          // Build Next.js for production
  "start": "next start",          // Start Next.js production server
  "server": "node server/index.js", // Start Express API server
  "dev:all": "concurrently \"npm run dev\" \"npm run server\"" // Run both
}
```

### Server Package Scripts

```json
{
  "start": "node index.js",       // Start Express server
  "dev": "node index.js"          // Start Express server (dev mode)
}
```

## 🎯 Key Design Decisions

1. **No TypeScript**: Using JavaScript throughout as specified
2. **App Router**: Next.js 15 App Router for modern routing
3. **Server Components**: Default server components for better performance
4. **Mock Auth**: Simple cookie-based authentication for demo
5. **JSON Storage**: File-based persistence for simplicity
6. **Tailwind CSS**: Utility-first styling for rapid development
7. **Accessibility**: Labels, alt text, semantic HTML

## 🌱 SDG 2 Integration

Every aspect of the application is designed to support Zero Hunger:

- **Transparency**: Public catalog accessible to all
- **Verification**: Clear certification badges
- **Safety First**: Prominent dosage and safety information
- **Education**: Problem statements and impact metrics
- **Empowerment**: Price transparency and vendor information

## 🚀 Deployment to Vercel

### Prerequisites for Deployment

- GitHub/GitLab/Bitbucket account
- Vercel account (free tier available at [vercel.com](https://vercel.com))
- Git installed locally

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done)**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AgriInput Ledger"
   ```

2. **Create a new repository** on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name: `agriinput-ledger`
   - Keep it public or private
   - Don't initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/agriinput-ledger.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)** and sign in

2. **Click "Add New Project"**

3. **Import your Git repository**:
   - Select your GitHub account
   - Choose the `agriinput-ledger` repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Environment Variables**:
   - Click "Environment Variables"
   - Add the following variable:
     ```
     Name: NEXT_PUBLIC_API_BASE_URL
     Value: https://YOUR-PROJECT-NAME.vercel.app
     ```
   - Note: You'll update this after deployment with your actual domain

6. **Click "Deploy"**

7. **Wait for deployment** (usually 2-3 minutes)

8. **Update Environment Variable**:
   - After successful deployment, copy your Vercel URL
   - Go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_BASE_URL` with your actual URL
   - Redeploy by going to Deployments → Click the three dots → Redeploy

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   cd e:\programminghero\nextjs
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - What's your project name? `agriinput-ledger`
   - In which directory is your code located? `./`
   - Want to override settings? **No**

5. **Set environment variable**:
   ```bash
   vercel env add NEXT_PUBLIC_API_BASE_URL
   ```
   - Enter the value: Your Vercel deployment URL
   - Select environment: Production

6. **Redeploy with environment variable**:
   ```bash
   vercel --prod
   ```

### Step 3: Verify Deployment

1. **Visit your deployed site**: `https://your-project-name.vercel.app`

2. **Test all routes**:
   - ✅ Landing page loads
   - ✅ Browse items page works
   - ✅ Individual item details load
   - ✅ Login functionality works
   - ✅ Add item form accessible after login
   - ✅ Images display correctly

3. **Test API endpoints**:
   - ✅ `https://your-project-name.vercel.app/api/items`
   - ✅ `https://your-project-name.vercel.app/api/items/1`

### Important Notes About Serverless API

⚠️ **Data Persistence Limitation**: 
- The serverless API functions in `/api` folder read from the static `items.json` file
- New items added via the form **will not persist** across deployments
- This is a limitation of serverless functions (no file system write access)

**Solutions for Production**:
1. Use a database (MongoDB, PostgreSQL, Supabase)
2. Use a separate backend API hosted on Railway, Render, or Heroku
3. Use Vercel's Edge Config or KV storage

### Step 4: Custom Domain (Optional)

1. **Go to Project Settings** → Domains

2. **Add your custom domain**:
   - Enter your domain name
   - Follow DNS configuration instructions
   - Wait for DNS propagation (up to 48 hours)

3. **Update environment variable**:
   - Update `NEXT_PUBLIC_API_BASE_URL` to your custom domain
   - Redeploy

### Continuous Deployment

Once connected to GitHub, Vercel automatically:
- ✅ Deploys every push to `main` branch (production)
- ✅ Creates preview deployments for pull requests
- ✅ Runs builds on every commit
- ✅ Shows build logs and errors

### Troubleshooting

**Build fails**:
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

**Images not loading**:
- Check `next.config.js` has correct image domains
- Verify image URLs are accessible

**API not working**:
- Check environment variable is set correctly
- Verify API routes are in `/api` folder (not `/pages/api`)
- Check browser console for CORS errors

**Authentication not working**:
- Clear cookies and try again
- Check middleware.js is in root directory
- Verify cookies are set with correct domain

### Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and imported
- [ ] Environment variable `NEXT_PUBLIC_API_BASE_URL` set
- [ ] Initial deployment successful
- [ ] Environment variable updated with actual URL
- [ ] Redeployed after updating environment variable
- [ ] All pages load correctly
- [ ] API endpoints responding
- [ ] Authentication flow works
- [ ] Images display properly
- [ ] Forms submit successfully

### Production URLs

After deployment, your app will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **API Endpoint**: `https://your-project-name.vercel.app/api/items`
- **Admin Login**: `https://your-project-name.vercel.app/login`

---

## 🚀 Production Considerations

For production deployment, consider:

1. **Real Authentication**: Implement OAuth, JWT, or session-based auth
2. **Database**: Use PostgreSQL, MongoDB, or similar
3. **Image Storage**: Use cloud storage (AWS S3, Cloudinary)
4. **API Security**: Add rate limiting, CORS configuration
5. **Input Validation**: Server-side validation and sanitization
6. **Error Handling**: Proper error boundaries and logging
7. **Testing**: Unit tests, integration tests, E2E tests
8. **Monitoring**: Application performance monitoring
9. **Deployment**: Use Vercel (Next.js) + Railway/Heroku (Express)

## 📝 License

This is a demo application for educational purposes.

## 🤝 Contributing

This is a demo project showcasing AgriInput Ledger concept. Feel free to use it as a template for similar SDG-focused applications.

---

**Built with ❤️ to support SDG 2: Zero Hunger**
