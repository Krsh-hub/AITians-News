# AITian News - AI News Platform

Modern AI news aggregator built with Next.js 14, TypeScript, and Supabase.

## ✨ Features

- 🔥 **Real-time AI News** from 5+ trusted sources
- 🎨 **Modern UI** with glassmorphism and dark mode
- 🚀 **Next.js 14** with App Router and TypeScript
- 🔐 **Authentication** with JWT and Supabase
- 📱 **Fully Responsive** mobile-first design
- ⚡ **Fast** with automatic caching

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the SQL from `supabase-schema.sql`
4. Go to **Settings → API** and copy your credentials

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_random_secret_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
aitian-news/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── news/route.ts
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   └── NewsCard.tsx
├── lib/
│   ├── supabase.ts
│   ├── auth.ts
│   └── news.ts
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **News**: RSS Parser

## 📰 News Sources

- VentureBeat AI
- TechCrunch AI
- MIT Technology Review
- The Verge AI
- AI Business

Articles auto-categorize into:
- Finance, Education, Business
- Startups, Tools, Policy
- Media, General

## 🔐 Authentication

JWT-based auth with:
- User registration
- Login/logout
- Password hashing (bcrypt)
- Token-based sessions

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Build for Production

```bash
npm run build
npm start
```

## 📝 API Routes

```
GET  /api/news              - All articles
GET  /api/news?type=trending - Trending (24h)
GET  /api/news?category=X   - By category
POST /api/auth/register     - Register user
POST /api/auth/login        - Login user
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#0ea5e9',
    600: '#0284c7',
  },
}
```

### News Sources

Edit `lib/news.ts`:

```ts
const RSS_SOURCES = [
  {
    name: 'Your Source',
    url: 'https://example.com/feed.xml',
    category: 'general'
  }
]
```

## 🐛 Troubleshooting

**Port in use:**
```bash
kill -9 $(lsof -ti:3000)
```

**Supabase connection error:**
- Check credentials in `.env.local`
- Verify SQL schema is created
- Use service_role key, not anon key

**News not loading:**
- RSS feeds may be temporarily down
- Check console for errors
- Wait 30 minutes for cache refresh

## 📄 License

MIT License - Free to use for any purpose

## 🙏 Credits

Built with Next.js, TypeScript, Supabase, and Tailwind CSS

---

**Made for AI enthusiasts** 🚀
