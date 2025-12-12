# Session Handoff

## Project Info
- **Name**: Portfolio (Liquid Dreamscape)
- **Stack**: React 18 + TypeScript + Vite + Bun + Hono + SQLite + Chakra UI + Framer Motion
- **Quick Start**: `bun run dev` | Build: `bun run build` | Server: `bun run start`
- **Live URL**: https://portfolio.cavazosgeorge.com
- **Admin Panel**: https://portfolio.cavazosgeorge.com/admin

## Current State
- **Branch**: main
- **Active Task**: None - light/dark mode toggle implemented
- **Status**: Production-ready with persistent SQLite database, admin CMS, and light mode support

## What Was Done

### Session: 2025-12-12

**Light/Dark Mode Implementation**
Complete theme switching system with performance optimizations:

- **Blocking Script** (`index.html`) - Prevents flash of incorrect color scheme by reading localStorage before React hydrates
- **CSS Variables** (`global.css`) - Refactored to use `[data-theme]` attribute scopes for light/dark themes
- **useColorMode Hook** (`src/hooks/useColorMode.ts`) - React hook for color mode state, toggle, and localStorage persistence
- **ColorModeToggle** (`src/components/layout/ColorModeToggle.tsx`) - Animated sun/moon toggle with Framer Motion
- **Header Updates** (`src/components/layout/Header.tsx`) - Added toggle + fixed `useTransform` to use dynamic color arrays per theme
- **Semantic Variables** - Introduced `--bg-primary`, `--bg-secondary`, `--overlay-subtle`, `--overlay-medium`, `--text-on-accent`

**Files Modified:**
- `index.html` - Added blocking script, theme-color meta tag with id
- `src/styles/global.css` - `[data-theme="dark"]` and `[data-theme="light"]` scopes
- `src/hooks/useColorMode.ts` (new)
- `src/components/layout/ColorModeToggle.tsx` (new)
- `src/components/layout/Header.tsx` - Toggle + dynamic header bg colors
- `src/App.tsx` - Updated to use semantic variables
- `src/components/sections/Contact.tsx` - Replaced hardcoded RGBA
- `src/components/sections/Projects.tsx` - Replaced hardcoded RGBA
- `src/components/sections/Experience.tsx` - Replaced hardcoded RGBA
- `src/components/sections/About.tsx` - Replaced `--void-lighter` with `--bg-secondary`
- `src/admin/Login.tsx` - Updated to use semantic variables
- `src/admin/Dashboard.tsx` - Updated to use semantic variables

**Color Palette (Light Mode) - Soft & Warm:**
- `--bg-primary: #faf9f7` (warm cream)
- `--bg-secondary: #f3f2ef` (soft gray-cream)
- `--text-primary: #37373f` (soft charcoal)
- `--text-secondary: rgba(55, 55, 63, 0.6)`
- Accent colors toned down: `--glow-cyan: #00b09b`, `--warm-coral: #e06060`, `--soft-lavender: #9a8fc4`

**Note:** Accent colors were adjusted to be less harsh on light backgrounds.

---

**Mobile Performance Optimization**
Comprehensive performance overhaul to eliminate lag, flickering, and jank on mobile devices (especially iOS):

- **Created `useIsMobile` hook** - Detects mobile/touch devices via media query + touch capability
- **Optimized MorphingBlob** - Replaced expensive `filter: blur(60px)` with `radial-gradient()`, disabled morphing animation on mobile, added `React.memo`
- **Fixed Header backdrop-filter** - Removed animated `backdrop-filter` on mobile (extremely expensive on iOS), uses solid background instead
- **Throttled mouse events** - Added 16ms throttle to `useMousePosition`, skips tracking entirely on touch devices
- **Optimized useMagneticEffect** - Cached `getBoundingClientRect()` (only updates on scroll/resize), skips on touch devices
- **Simplified ParallaxBlobs** - Mobile renders 2 static gradient blobs instead of 4 animated parallax blobs, added `React.memo`
- **Optimized TiltCard** - Disables 3D tilt effect on mobile, caches rect dimensions, renders simple card without expensive shadows, added `React.memo`
- **Mobile CSS optimizations** - Removed noise texture (`feTurbulence` SVG), native scroll behavior on mobile
- **Added React.memo** - To `MorphingBlob`, `ParallaxBlobs`, `TiltCard`, `MagneticElement`
- **Font preconnect** - Added preconnect hints to `index.html` for faster Google Fonts loading

**Header Cleanup**
- Removed unused hamburger menu from mobile view (nav is hidden on mobile, content is scrollable)

**Mobile Horizontal Overflow Fix**
Fixed horizontal scrollbar and white column appearing on right side of mobile viewport:
- **ParallaxBlobs** - Changed mobile blob positioning from negative (`left="-10%"`, `right="-5%"`) to positive (`left="0"`, `right="0"`), reduced sizes from 350px/300px to 250px/200px
- **global.css** - Added `overflow-x: hidden` to `html` element (was only on `body`)
- **Contact.tsx** - Added `overflow="hidden"` to section container to clip 600px background glow

**Files Modified:**
- `src/hooks/useIsMobile.ts` (new)
- `src/hooks/useMousePosition.ts`
- `src/hooks/useMagneticEffect.ts`
- `src/components/animations/MorphingBlob.tsx`
- `src/components/animations/ParallaxBlobs.tsx`
- `src/components/animations/TiltCard.tsx`
- `src/components/animations/MagneticElement.tsx`
- `src/components/layout/Header.tsx`
- `src/components/sections/Contact.tsx`
- `src/styles/global.css`
- `index.html`

### Session: 2025-12-07

**Backend & Admin Panel**
- Added Hono server with full REST API for all content types
- SQLite database with migrations system (`bun:sqlite`)
- Admin authentication with session cookies and bcrypt password hashing
- Admin dashboard with tabbed interface for managing:
  - Projects (CRUD + drag-and-drop reorder)
  - Experience (CRUD + drag-and-drop reorder)
  - Skills (CRUD + drag-and-drop reorder by category)
  - About content (rich text editor)
  - Social links (CRUD)
  - Contact messages (view, mark read, delete, reply via email)

**Drag-and-Drop Reordering**
- Integrated @dnd-kit/core and @dnd-kit/sortable for all list editors
- Server-side `/reorder` endpoints to persist sort order
- Visual drag handles and smooth animations

**Contact Form & Messages**
- Public contact form posts to `/api/messages`
- Admin messages viewer with unread count badge in sidebar
- Expandable message cards with "Reply via Email" mailto links
- Mark as read/unread functionality

**Deployment Fixes**
- Removed unused `better-sqlite3` dependency (was causing build failures - uses `bun:sqlite`)
- Updated Dockerfile from nginx static-only to Bun server for API endpoints
- Added `VOLUME ["/app/data"]` for SQLite persistence
- Created `docker-compose.yml` with named volume `portfolio_data`
- Admin seeding runs on container startup via CMD

**Bug Fixes**
- Fixed technologies input: couldn't type comma character (was splitting on every keystroke)
  - Solution: Separate `technologiesInput` string state, parse only on save
- Fixed sort order reset: editing an item reset its order to 0
  - Solution: Changed `sort_order || 0` to `sort_order ?? 0` (nullish coalescing)
- Fixed data persistence: SQLite DB was lost on redeployment
  - Solution: Docker volume mount for `/app/data`

**Environment Variables (Production)**
- `DB_PATH=/app/data/portfolio.db` - SQLite database location
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password (hashed on first seed)
- `NODE_ENV=production`
- `PORT=3000`

### Session: 2025-12-06

**Project Setup**
- Initialized Vite + React + TypeScript with Bun
- Added Chakra UI v3 and Framer Motion
- Configured Docker deployment (Dockerfile, docker-compose.yaml, nginx.conf)

**Deployment Fixes**
- Renamed `docker-compose.yml` → `docker-compose.yaml` for Coolify
- Changed `ports` to `expose` in docker-compose to avoid port conflicts
- Added `curl` to nginx:alpine for health checks (wget not available)
- Switched from Docker Compose build to Dockerfile build in Coolify settings

**Liquid Dreamscape Foundation**
- Global CSS with color palette:
  - `--void: #0a0a0f` (deep black base)
  - `--glow-cyan: #00f5d4` (primary accent)
  - `--warm-coral: #ff6b6b` (secondary)
  - `--soft-lavender: #c8b6ff` (tertiary)
- Noise texture overlay, custom scrollbar, reduced motion support
- Fonts: Space Grotesk (display), Outfit (body), JetBrains Mono (code)

**Animation Components Created**
- `useMousePosition` hook - global cursor tracking
- `useMagneticEffect` hook - attraction physics based on cursor proximity
- `MorphingBlob` - CSS keyframe animated organic background shapes
- `SplitText` - staggered letter reveal with optional magnetic effect
- `MagneticElement` - wrapper component pulled toward cursor
- `RevealOnScroll` - Framer Motion viewport-triggered animations
- `TiltCard` - 3D perspective transform following cursor

**Sections Completed**
- **Hero** - Magnetic name text, morphing blob background, scroll indicator
- **About** - Skills tags with hover effects, radial gradient background
- **Projects** - TiltCard gallery with featured badges, technology tags
- **Experience** - Timeline with animated dots and connecting lines
- **Contact** - Form with magnetic button, social links
- **Header** - Fixed nav with scroll-based transparency, magnetic links

**Bug Fixes & Refinements**
- Fixed esbuild EPIPE error by clean reinstall (`rm -rf node_modules bun.lock && bun install`)
- Fixed TypeScript errors with Chakra UI v3 polymorphic `as` prop - used native HTML elements
- Removed unused imports (Box from SplitText, Link from Projects)
- Updated `index.html` - changed title to "George Cavazos | Software Developer" and added wave emoji favicon
- Added container centering fix in global.css for Chakra UI
- Added `textAlign="center"` to section headers for proper alignment
- Removed GC logo from Header, centered navigation
- Fixed scroll indicator overlap - changed from absolute positioning to margin-based flow

### File Structure
```
src/
├── styles/global.css              # Colors, fonts, noise, scrollbar
├── hooks/
│   ├── useMousePosition.ts        # Cursor tracking
│   ├── useMagneticEffect.ts       # Magnetic attraction
│   └── useContent.ts              # API data fetching hooks
├── components/
│   ├── animations/
│   │   ├── MorphingBlob.tsx
│   │   ├── SplitText.tsx
│   │   ├── MagneticElement.tsx
│   │   ├── RevealOnScroll.tsx
│   │   └── TiltCard.tsx
│   ├── layout/
│   │   └── Header.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       └── Contact.tsx
├── admin/
│   ├── AdminApp.tsx               # Admin router wrapper
│   ├── AuthContext.tsx            # Auth state management
│   ├── Login.tsx                  # Login page
│   ├── Dashboard.tsx              # Main admin dashboard
│   └── components/
│       ├── ProjectsEditor.tsx     # CRUD + reorder
│       ├── ExperienceEditor.tsx   # CRUD + reorder
│       ├── SkillsEditor.tsx       # CRUD + reorder by category
│       ├── AboutEditor.tsx        # Rich text editing
│       ├── LinksEditor.tsx        # Social links CRUD
│       └── MessagesViewer.tsx     # Contact messages
├── App.tsx
└── main.tsx

server/
├── index.ts                       # Hono server entry point
├── db/
│   ├── index.ts                   # SQLite connection + migrations
│   ├── seed-admin.ts              # Admin user seeding script
│   └── migrations/
│       └── 001_initial.sql        # Schema: projects, experience, skills, etc.
└── routes/
    ├── projects.ts                # /api/admin/projects
    ├── experience.ts              # /api/admin/experience
    ├── skills.ts                  # /api/admin/skills
    ├── about.ts                   # /api/admin/about
    ├── links.ts                   # /api/admin/links
    ├── messages.ts                # /api/admin/messages
    └── auth.ts                    # /api/admin/login, /logout, /me
```

## What's Next
1. **Add real content** - Use admin panel to add projects, experience, skills
2. **Code splitting** - Reduce bundle size (currently 807KB)
3. **SEO** - Add meta tags to index.html
4. **Image uploads** - Add file upload for project images (currently URL-based)

## Don't Break
- `docker-compose.yml` with named volume `portfolio_data` for SQLite persistence
- Coolify volume mount: `portfolio-data` → `/app/data`
- Environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `DB_PATH`
- Use `??` (nullish coalescing) not `||` for sort_order (0 is valid)
- Technologies input uses separate string state, parsed only on save
- Run `bun install` after dependency changes to sync bun.lock
- **Light Mode**: Blocking script in `index.html` must run before React to prevent flash
- **Light Mode**: `[data-theme]` attribute on `<html>` controls theme (not class)
- **Light Mode**: Header's `useTransform` needs color arrays per theme (can't use CSS vars)

## Blockers
- None

---
*Last updated: 2025-12-12*
