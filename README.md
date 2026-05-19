# Lanka Job Italy - Modern Community Platform

A modern web platform for Sri Lankan community in Italy with jobs, forum, chat, and AI-powered content.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime (WebSockets)
- **Content Generation**: Replicate API (Flux), Unsplash, Pexels
- **Hosting**: Netlify, Cloudflare CDN

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Add your configuration values to .env.local
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the project
npm run build

# Start production server
npm start
```

## Project Structure

```
lankajobitaly/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── jobs/              # Jobs section
│   ├── forum/             # Forum section
│   ├── chat/              # Chat section
│   ├── admin/             # Admin dashboard
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Nav, Sidebar)
│   ├── jobs/              # Job-related components
│   ├── forum/             # Forum components
│   ├── chat/              # Chat components
│   └── shared/            # Shared components
│
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── supabase.ts        # Supabase client
│   ├── api-client.ts      # API client
│   └── types.ts           # TypeScript types
│
├── public/                # Static assets
├── package.json
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Phase 1: Foundation (In Progress)
- [x] Next.js setup
- [x] Tailwind CSS + shadcn/ui
- [x] Design system migration
- [ ] Component library
- [ ] Development environment setup

## Phase 2: Backend (Planned)
- Database schema
- Supabase setup
- Authentication
- API routes

## Phase 3: Content & Features (Planned)
- AI image generation
- Stock media APIs
- Forum system
- Chat/messaging

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

This is a community project. See CONTRIBUTING.md for guidelines.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
