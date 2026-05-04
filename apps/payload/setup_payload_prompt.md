Setup Payload CMS Repository

  You are setting up a fresh clone of a cms-kit monorepo. This repo contains three
  CMS apps (payload, sanity, storyblok) but we only need Payload. Follow these steps
  exactly:

  1. Remove Sanity & Storyblok

  Delete these directories entirely:
  - apps/sanity/
  - apps/storyblok/
  - packages/sanity-template-selector/

  2. Clean root package.json

  Remove these scripts:
  - dev:sb, build:sb, start:sb, proxy:sb (Storyblok)
  - dev:sa, build:sa, start:sa, proxy:sa (Sanity)

  Keep all dev:pl, build:pl, start:pl scripts and everything else.

  3. Clean turbo.json

  - Remove SB_* and SANITY_* from the globalEnv array
  - Remove the "@focus-reactive/sanity-template-selector#build" task override
  - Remove the "sanity#build" task override

  4. Create apps/payload/.env

  Use apps/payload/.env.example as the reference. Create .env with values for every
  variable except the OIDC SSO section (skip all OIDC_* and
  NEXT_PUBLIC_OIDC_PROVIDER_NAME vars).

  For each variable:
  - DATABASE_URL — ask the user for their PostgreSQL connection string (e.g.
  postgres://user:pass@host:5432/dbname)
  - PAYLOAD_SECRET — generate with openssl rand -hex 32
  - NEXT_PUBLIC_SERVER_URL — set to http://localhost:3333
  - PREVIEW_SECRET — generate with openssl rand -hex 16
  - BLOB_READ_WRITE_TOKEN — set to vercel_blob_rw_placeholder (media uploads require
  a real token; skip for now)
  - OPENAI_API_KEY — set to sk-mock-development-key

  5. Install dependencies

  From the repo root, run:
  pnpm install

  6. Run database migrations

  From apps/payload/, run:
  pnpm migrate

  This applies all pending Payload migrations to the database.

  7. Start dev server

  From the repo root, run:
  pnpm dev:pl

  The app will be available at http://localhost:3333. The Payload admin panel is at
  http://localhost:3333/admin — on first visit it will prompt to create an admin
  user.
