# Lanka Job Italy - Setup Guide

This guide will walk you through setting up the modern platform with all features.

## Prerequisites

- Node.js 18+
- npm or yarn
- Netlify account
- Supabase account (free)
- Git

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Fill in:
   - **Project name**: `lanka-job-italy`
   - **Database password**: Create a strong password
   - **Region**: Europe (recommended for your audience)
5. Click "Create new project"

Wait 3-5 minutes for the project to initialize.

### 2.2 Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### 2.3 Set Up Database Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy the entire content from `/lib/database.sql`
4. Paste it into the SQL editor
5. Click **Run** (or Cmd+Enter)

Wait for the schema to be created successfully.

### 2.4 Create Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 3: Test the Setup

```bash
npm run dev
```

Visit `http://localhost:3000`:
- ✅ Homepage loads
- ✅ Jobs page shows data
- ✅ Restaurants page displays
- ✅ Admin login page accessible at `/admin/login`

## Step 4: Authentication Setup (Optional - Phase 2+)

To enable user authentication:

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable "Email" provider:
   - Toggle "Enable email sign up"
   - Click "Save"
3. Configure email templates if needed

## Step 5: Deploy to Netlify

### 5.1 Push to GitHub

```bash
git push origin claude/add-project-tools-4V5Uw
```

### 5.2 Connect Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Authorize → Choose repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Set environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Add `SUPABASE_SERVICE_ROLE_KEY`
6. Click "Deploy site"

### 5.3 Update CNAME

Your current CNAME already points to Netlify, so no DNS changes needed!

## Step 6: Manage Content

### Adding Jobs

**Via Admin Dashboard** (Coming in Phase 2.5):
1. Go to `/admin/login`
2. Use Supabase auth credentials
3. Click "Add Job" button
4. Fill form and submit

**Via API** (Manual):
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Care Worker",
    "company": "Care Plus",
    "city": "Rome",
    "type": "elder",
    "salary": "€1,200/month",
    "description": "24/7 home care for elderly client",
    "is_permanent": true,
    "is_urgent": false,
    "is_featured": false
  }'
```

### Adding Restaurants

```bash
curl -X POST http://localhost:3000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sri Lanka Kitchen",
    "description": "Authentic Sri Lankan cuisine",
    "city": "Rome",
    "image_url": "https://example.com/image.jpg"
  }'
```

## Step 7: Next Features (Phase 3+)

### AI Image Generation Setup

1. Sign up at [Replicate.com](https://replicate.com)
2. Create API token
3. Add to `.env.local`:
   ```env
   REPLICATE_API_TOKEN=your-token
   ```

### Stock Photos API

1. Sign up at [Unsplash Developers](https://unsplash.com/developers)
2. Create application
3. Copy Access Key
4. Add to `.env.local`:
   ```env
   UNSPLASH_ACCESS_KEY=your-key
   ```

### Email Notifications (Phase 3+)

1. Sign up at [SendGrid.com](https://sendgrid.com)
2. Create API key
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=your-key
   ```

## Troubleshooting

### Database Connection Error

**Error**: `Missing Supabase URL or anon key`

**Fix**: Check `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### API Routes Not Working

**Error**: `Service role key missing`

**Fix**: Make sure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`

### Netlify Deployment Fails

**Error**: `npm run build` fails

**Fix**:
1. Check Node version matches locally and in Netlify settings
2. Clear Netlify cache and redeploy
3. Check environment variables are set correctly

### Database Schema Not Created

**Error**: SQL queries fail in Supabase

**Fix**:
1. Make sure you're using the latest SQL from `/lib/database.sql`
2. Check for syntax errors in SQL
3. Copy-paste exact SQL without modifications
4. Run in SQL editor, not directly in query tool

## API Documentation

### Jobs Endpoints

**GET** `/api/jobs`
- Query params: `type`, `city`, `limit`, `offset`
- Returns: List of jobs with pagination

**POST** `/api/jobs`
- Body: `{ title, company, city, type, salary, description, is_permanent, is_urgent, is_featured }`
- Returns: Created job

**GET** `/api/jobs/[id]`
- Returns: Single job by ID

**PUT** `/api/jobs/[id]`
- Body: Updated job fields
- Returns: Updated job

**DELETE** `/api/jobs/[id]`
- Returns: Success message

### Restaurants Endpoints

**GET** `/api/restaurants`
- Query params: `city`, `limit`, `offset`
- Returns: List of restaurants

**POST** `/api/restaurants`
- Body: `{ name, description, city, image_url }`
- Returns: Created restaurant

**GET** `/api/restaurants/[id]`
- Returns: Single restaurant

**PUT** `/api/restaurants/[id]`
- Body: Updated fields
- Returns: Updated restaurant

**DELETE** `/api/restaurants/[id]`
- Returns: Success message

### Reviews Endpoints

**GET** `/api/restaurants/[id]/reviews`
- Query params: `limit`, `offset`
- Returns: Reviews for restaurant

**POST** `/api/restaurants/[id]/reviews`
- Body: `{ author_name, rating (1-5), text }`
- Returns: Created review

## Support & Issues

For issues or questions:

1. Check this guide first
2. Check [Supabase docs](https://supabase.com/docs)
3. Check [Next.js docs](https://nextjs.org/docs)
4. Create an issue on GitHub

## Next Steps

After basic setup:

1. **Phase 2.5**: Implement authentication
2. **Phase 3**: Add AI image generation
3. **Phase 4**: Enable real-time forum
4. **Phase 5**: Launch chat features

See README.md for full roadmap.
