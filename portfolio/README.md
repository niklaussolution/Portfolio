# Harish Ganesan — Cybersecurity Portfolio

A premium, red/white/near-black personal cybersecurity portfolio and command-center site for
Harish Ganesan (Director @ Niklaus Solutions), built with Next.js App Router, TypeScript,
Tailwind CSS, GSAP and Prisma.

## Status

This is phase 1 of the build: design system, homepage, the featured case-study detail page,
API routes for contact/incident intake, a Prisma schema covering the full content model, and a
minimal authenticated admin shell with an overview dashboard. Remaining phases (full CMS CRUD
screens for every model, file/media storage, RBAC enforcement in every admin route, audit-log UI,
testimonials moderation, SEO admin editor, and E2E test coverage) are tracked as follow-up work.

All public copy currently reads from `src/lib/site-content.ts`. Its shape mirrors the Prisma
models 1:1, so wiring the admin CMS later means swapping these reads for DB queries without
touching component code.

**Nothing is hardcoded that shouldn't be:** OSCP is seeded as `VERIFIED`, experience/impact
stats that aren't confirmed are marked `draft`, and no unverified achievements or numbers were
invented.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP (hero reveal, preloader) + Lenis (smooth scroll)
- Prisma + PostgreSQL
- NextAuth (Credentials provider) for admin auth
- react-hook-form + zod for form validation

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, NEXTAUTH_SECRET, SEED_ADMIN_PASSWORD
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Admin login: `/admin/login`, using the email/password set via `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` at seed time. Never commit real credentials — `.env` is gitignored.

## Security notes

- Contact and incident-report routes are zod-validated and rate-limited (in-memory; swap for a
  distributed limiter such as Upstash before scaling past a single server instance).
- Passwords are hashed with bcrypt; admin auth uses server-side session checks in
  `src/app/admin/layout.tsx`, never client-only gating.
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
  are set in `next.config.mjs`.
- `robots.ts` disallows `/admin` and `/api` from indexing.

## Content safety

The featured case study (`suspicious-echallan-apk-investigation`) documents technical malware
behavior only — no individual is named or accused, and no victim-identifying information is
published. See the disclaimer on the case-file page.
