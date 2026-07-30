# BuySafe Property 🏡

**Kishanganj's Buyer-Focused Property Platform** — Verified listings, BuySafe Score™, and end-to-end buyer assistance.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

---

## 🌟 Key Features

| Feature | Description |
|---|---|
| **BuySafe Score™** | Every property rated out of 110 across 6 verified parameters |
| **4-Tier Verification** | Self Listed → Docs Verified → Site Verified → Premium Verified |
| **Price on Request** | Protects seller privacy & generates qualified leads |
| **Before You Buy™** | Honest Good Things + Things to Verify — no pretending every property is perfect |
| **Site Visit Booking** | Doctor-appointment style calendar booking |
| **Compare Properties** | Side-by-side comparison of up to 3 properties |
| **PWA Offline-First** | Installable, works offline, Android app-like UX |

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Vanilla CSS + CSS Modules (no Tailwind)
- **PWA**: next-pwa (Workbox service worker)
- **State**: Zustand (Favourites + Compare)
- **Forms**: React Hook Form + Zod validation
- **Maps**: Leaflet + react-leaflet (OpenStreetMap)
- **Auth**: NextAuth.js v5 (phone OTP)
- **Security**: CSP nonce, rate limiting, security headers (via middleware)

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server (webpack mode — required for next-pwa)
npm run dev

# Type check
npm run type-check

# Build for production
npm run build

# Security audit
npm run audit
```

The dev server starts at **http://localhost:3000** (or 3001 if 3000 is busy).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout (PWA shell, nav)
│   ├── page.tsx            ← Homepage (9 sections)
│   ├── manifest.ts         ← PWA Web App Manifest
│   ├── properties/
│   │   ├── page.tsx        ← Listings with filters
│   │   └── [slug]/page.tsx ← Property detail (SSG + ISR)
│   ├── compare/page.tsx    ← Side-by-side comparison
│   ├── knowledge/page.tsx  ← Knowledge Centre
│   └── api/
│       ├── leads/route.ts  ← Lead capture (Zod validated)
│       └── visits/route.ts ← Site visit booking
├── components/
│   ├── layout/             ← TopNav, BottomNav, FloatingActions
│   ├── home/               ← Hero, WhyBuySafe, Categories, etc.
│   ├── property/           ← PropertyCard, BuySafeScore, BeforeYouBuy, etc.
│   ├── compare/            ← CompareClient
│   ├── pwa/                ← OfflineBanner, InstallPrompt
│   └── properties/         ← ListingsClient
├── lib/
│   └── stores/             ← Zustand: favourites, compare
├── middleware.ts            ← CSP, rate limiting, auth guard
└── styles/
    └── globals.css          ← Design system (CSS variables, tokens)
```

---

## 🔒 Security

- **CSP** with nonce-based script policy (middleware)
- **Security Headers**: HSTS, X-Frame-Options, Permissions-Policy
- **Rate Limiting**: per-route sliding window (leads: 10/min, visits: 5/min)
- **Input Validation**: Zod schemas on all API routes
- **Privacy**: No prices exposed in API, approximate location only

---

## 📱 PWA / Mobile

- Install on Android Chrome via "Add to Home Screen"
- Works **offline** for previously visited properties
- **Bottom navigation** (Android app-style) on mobile
- Safe area inset support (notch / navigation bar)
- Haptic feedback on save actions

---

## 🗺️ Roadmap

- [ ] Backend API integration (Supabase / custom)
- [ ] Phone OTP authentication (NextAuth)
- [ ] PDF property report (server-side generation)
- [ ] Admin dashboard (listing management)
- [ ] Hindi language support
- [ ] Google Maps / Street View integration
- [ ] 360° virtual property tours (Phase 2)

---

## 📄 License

Private — BuySafe Property. All rights reserved.

> Built with ❤️ for property buyers in Kishanganj, Bihar.
