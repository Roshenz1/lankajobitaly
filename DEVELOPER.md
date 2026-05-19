# Developer Guide - Lanka Job Italy

Quick reference for developers working on this project.

## Project Structure

```
lankajobitaly/
├── app/
│   ├── api/
│   │   ├── jobs/
│   │   │   ├── route.ts          # GET/POST jobs
│   │   │   └── [id]/route.ts     # GET/PUT/DELETE single job
│   │   └── restaurants/
│   │       ├── route.ts          # GET/POST restaurants
│   │       ├── [id]/route.ts     # GET/PUT/DELETE single restaurant
│   │       └── [id]/reviews/route.ts  # GET/POST reviews
│   ├── admin/
│   │   ├── login/page.tsx        # Admin login
│   │   └── page.tsx              # Admin dashboard
│   ├── entertainment/page.tsx    # TV, Karaoke, News
│   ├── forum/page.tsx            # Forum home
│   ├── jobs/page.tsx             # Jobs listing with filters
│   ├── restaurants/page.tsx      # Restaurants listing
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── tabs.tsx
│   ├── layout/
│   │   └── navbar.tsx
│   ├── jobs/
│   │   ├── job-card.tsx
│   │   └── job-filters.tsx
│   └── shared/               # Other components
│
├── lib/
│   ├── supabase.ts           # Supabase clients
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Utility functions
│   └── database.sql          # Schema (run in Supabase)
│
├── SETUP_GUIDE.md            # Step-by-step setup
├── DEVELOPER.md              # This file
└── README.md                 # Project overview
```

## Development Workflow

### 1. Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

### 2. Add New Features

**Example: Add a new API endpoint**

```typescript
// app/api/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
    
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

**Example: Add a new UI component**

```typescript
// components/my-component.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

### 3. Test API Routes

Using curl:
```bash
# Get jobs
curl http://localhost:3000/api/jobs?type=elder

# Create job
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Job","company":"Corp","type":"elder","description":"Desc"}'

# Update job
curl -X PUT http://localhost:3000/api/jobs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete job
curl -X DELETE http://localhost:3000/api/jobs/1
```

## Database Operations

### Connect to Supabase

```typescript
import { supabase } from '@/lib/supabase'

// Fetch data
const { data, error } = await supabase
  .from('jobs')
  .select('*')
  .eq('city', 'Rome')
```

### Query Examples

```typescript
// Select with filtering
const { data } = await supabase
  .from('jobs')
  .select('*')
  .eq('type', 'elder')
  .gt('salary', 1000)
  .order('created_at', { ascending: false })
  .limit(10)

// Insert
const { data } = await supabase
  .from('jobs')
  .insert({ title: 'New Job', company: 'Corp', type: 'elder' })
  .select()

// Update
const { data } = await supabase
  .from('jobs')
  .update({ title: 'Updated' })
  .eq('id', 1)
  .select()

// Delete
const { data } = await supabase
  .from('jobs')
  .delete()
  .eq('id', 1)
```

## Environment Setup

`.env.local` required keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Styling with Tailwind

Colors (from design system):

```typescript
// Text
text-ink           // Primary text (#0a0f1e)
text-ink-2         // Secondary text (#3d4461)
text-ink-3         // Tertiary text (#8892a4)

// Backgrounds
bg-bg              // Light background (#f6f7fb)

// Brand colors
bg-red-primary, bg-green-primary, bg-blue-primary, bg-yellow-primary
bg-red-light, bg-green-light, bg-blue-light, bg-yellow-light
```

## Commit Message Format

```
Feature: Brief description

- Bullet point of change
- Another change
- Another change

https://claude.ai/code/session_ID
```

## TypeScript Types

Located in `/lib/types.ts`:

- `Job`, `JobType`
- `Restaurant`, `Review`
- `ForumThread`, `ForumReply`
- `ChatRoom`, `Message`
- `UserProfile`

Use these in your components:

```typescript
import { type Job } from '@/lib/types'

interface MyProps {
  job: Job
}
```

## Performance Tips

1. **Use Next.js Image** for images:
   ```tsx
   import Image from 'next/image'
   <Image src="/url" alt="desc" width={100} height={100} />
   ```

2. **Use TanStack Query** for data fetching (when ready):
   ```tsx
   import { useQuery } from '@tanstack/react-query'
   
   const { data } = useQuery({
     queryKey: ['jobs'],
     queryFn: () => fetch('/api/jobs').then(r => r.json())
   })
   ```

3. **Use dynamic imports** for large components:
   ```tsx
   const HeavyComponent = dynamic(() => import('./heavy'))
   ```

## Debugging

### Enable Debug Logs

```typescript
// In supabase.ts
const supabase = createClient(url, key, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})
```

### Check Console

```bash
# Watch for errors in browser console
# Server logs available in terminal running npm run dev
```

## Phase Roadmap

- ✅ **Phase 1**: Frontend framework + UI components
- ✅ **Phase 1 Extensions**: Admin dashboard + Restaurants
- ✅ **Phase 2**: Supabase + API routes
- 🔜 **Phase 2.5**: Authentication (Supabase Auth)
- 🔜 **Phase 3**: AI image generation + graphics
- 🔜 **Phase 4**: Real-time forum
- 🔜 **Phase 5**: Chat features

## Common Issues

### "Cannot find module '@/lib/supabase'"
- Check tsconfig.json has correct paths
- Run `npm run build` to verify

### API returns 500 error
- Check `.env.local` has all required keys
- Check database table names match API queries
- Check Supabase RLS policies allow access

### Styles not applying
- Check component imports are correct
- Clear `.next` folder: `rm -rf .next`
- Run `npm run build`

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

## Getting Help

1. Check this document
2. Check SETUP_GUIDE.md
3. Check relevant documentation above
4. Create GitHub issue with details

---

Happy coding! 🚀
