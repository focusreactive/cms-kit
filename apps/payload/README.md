# Ideal CMS — Open-Source Payload CMS Starter with Next.js 15

A production-ready, open-source headless CMS built on [Payload CMS 3](https://payloadcms.com/) and [Next.js 15](https://nextjs.org/) — with content presets, native A/B testing, inline comments, AI translations, scheduled publishing on serverless, locale-scoped semantic search, SSO, and a modular block-based page builder out of the box.

## About the Project

At [FocusReactive](https://focusreactive.com/) we build projects on different CMSs — Sanity, Storyblok, Strapi, and Payload. Each platform has its own unique features and limitations, and sometimes a project needs a feature one CMS has but another doesn't.

So we decided to build all of that into one open-source project — we call it **Ideal CMS**. The best features from every CMS we've worked with, available as Payload plugins. You can use the project with everything integrated, or install [individual plugins](https://github.com/focusreactive/payload-plugins) to get the features you need. This often helps our clients free up budget for things we believe should be included from day one.

Every plugin works independently in any Payload project. For new projects, we recommend starting from this repository — it combines all of the plugins with the basic setup you'll need to ship.

## Why Ideal CMS

- **Open-source and free.** MIT-licensed. Self-host on Vercel, your own infra, or anywhere Node.js runs.
- **Batteries included.** Presets, A/B testing, comments, AI translation, scheduled publishing, semantic search, and SSO — all wired up.
- **Production-grade defaults.** Type-safe everywhere, ISR with on-demand revalidation, role-based access control, and a battle-tested folder structure.
- **Modular by design.** Use Ideal CMS as a turnkey starter, or install only the [FocusReactive Payload plugins](https://github.com/focusreactive/payload-plugins) you need in your existing Payload project.
- **Designed for marketing teams.** Visual block editor, reusable presets, live preview, and inline comments — content editors stay productive without a developer in the loop.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CMS | [Payload CMS 3](https://payloadcms.com/) |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) + React 19 |
| Database | PostgreSQL |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + shadcn/ui |
| Rich Text | Lexical Editor |
| Internationalization | [next-intl 4](https://next-intl-docs.vercel.app/) + AI translations |
| Authentication | JWT + OIDC/SSO (Auth0, Keycloak, Okta) |
| Storage | Vercel Blob (production) / local filesystem (dev) |
| Deployment | Optimized for [Vercel](https://vercel.com/), Docker-ready |
| Testing | Vitest (integration), Playwright (E2E) |

## Features

### Presets

Multiple pre-configured block configurations you can use to build up your pages — like having multiple versions of default values. Because content people prefer editing over creating from scratch.

Powered by [`@focus-reactive/payload-plugin-presets`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-presets).

### A/B Testing for Payload CMS

Native experiments with a dynamic percentage of traffic going to each content variant. Control everything from the same page you're working on — no separate dashboards, no SDK glue. Visitors are deterministically bucketed by a stable cookie (`ab_visitor_id`, 365-day lifetime), variants are cached per visitor, and view/click events stream into the `ExperimentEvents` collection for downstream analytics.

Powered by [`@focus-reactive/payload-plugin-ab`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-ab).

### Comments — Collaborate Inside the CMS

A way for content teams and developers to collaborate inside the admin. Comment, mention, and annotate any field directly in the Payload UI — feedback lives next to the content it's about, not in a Slack thread.

Powered by [`@focus-reactive/payload-plugin-comments`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-comments).

### Multi-Language + AI Translation

Payload already has a localization plugin, so on top of it we built a plugin that does AI translations with one click. URL-prefixed routing for every locale (`/en/about`, `/es/acerca`) via `next-intl`. Field-level localization is supported across all collections — mark any field `localized: true` and Payload surfaces a per-locale tab in the admin; the translator fills it in for you.

Powered by [`@focus-reactive/payload-plugin-translator`](https://github.com/focusreactive/payload-plugin-translator).

### Scheduled Publishing on Serverless

Payload natively supports scheduled publishing, but not for serverless platforms like Vercel — and Vercel is where we deploy most of our projects. So we built a plugin that makes it work.

Powered by [`@focus-reactive/payload-plugin-scheduling`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-scheduling).

### Locale-Scoped Semantic Search

pgvector-backed semantic search lets visitors find content by meaning, not just keywords — and results stay scoped to the visitor's active locale, so a Spanish search never returns English-only content. Embeddings are generated automatically on content changes via Payload lifecycle hooks.

### SSO for Enterprise

For enterprise clients, SSO is a common requirement that can save weeks of integration work. Ideal CMS ships with OIDC/SSO support for Auth0, Keycloak, Okta, and any OIDC-compliant identity provider — keep the one you want, drop the rest. JWT is used for the public API. PKCE flow supported.

### Modular Block-Based Page Builder

Compose pages from reusable blocks: Hero, Content, FAQ, TextSection, CardsGrid, Carousel, Logos, LinksList, TestimonialsList. Every block ships with localization support, presets, and A/B-experiment hooks.

## Quick Start

1. Create a new repository from this template and clone it locally.
2. Provision a Postgres database — we recommend [Neon](https://console.neon.tech/app) for a free, branchable Postgres on Vercel.
3. Run Claude Code and paste [this setup prompt](./setup_payload_prompt.md) — the agent will configure environment variables, run migrations, and seed sample content.

## Getting Started Manually

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` or `^10`
- A PostgreSQL instance

### Installation

```bash
pnpm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Secret key for encrypting Payload data |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public-facing URL of the application |
| `PREVIEW_SECRET` | No | Secret for validating live preview requests |
| `BLOB_READ_WRITE_TOKEN` | Production | Vercel Blob storage token for media uploads |
| `OPENAI_API_KEY` | No | Enables AI translations and semantic search embeddings |
| `OIDC_ISSUER` | No | OIDC provider URL for SSO |
| `OIDC_CLIENT_ID` | No | OIDC client ID |
| `OIDC_CLIENT_SECRET` | No | OIDC client secret |
| `OIDC_REDIRECT_URI` | No | Callback URL (defaults to `SERVER_URL/api/auth/oidc/callback`) |
| `OIDC_USE_PKCE` | No | Enable PKCE flow (recommended for Auth0) |
| `OIDC_PROVIDER_NAME` | No | Label shown on the SSO login button |
| `NEXT_PUBLIC_OIDC_PROVIDER_NAME` | No | Client-side SSO provider label |

### Running the App

```bash
pnpm dev          # Development server (http://localhost:3333)
pnpm devsafe      # Dev with .next cache cleared first
pnpm build        # Production build
pnpm start        # Production server
```

The admin panel is available at `/admin`. The frontend uses locale-prefixed routes (`/en/...`, `/es/...`).

### Database Migrations

Schema changes are explicit (`push: false`):

```bash
pnpm payload migrate:create   # Create a new migration
pnpm payload migrate          # Apply pending migrations
pnpm payload migrate:status   # Inspect migration state
pnpm payload migrate:down     # Roll back the last migration
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/             # Public-facing routes
│   │   └── [locale]/           # Locale-based dynamic routing
│   │       └── [...slug]/      # Catch-all for pages and blog posts
│   └── (payload)/              # Admin panel and API routes
│       ├── admin/              # Payload admin UI
│       └── api/                # REST + custom API endpoints
├── auth/                       # OIDC/SSO authentication config
├── blocks/                     # Page builder blocks (Hero, FAQ, Carousel, …)
├── collections/                # Payload collection configs
├── core/
│   ├── config/                 # App-wide configuration (i18n, blog, custom pages)
│   ├── constants/              # Constants and default values
│   ├── lib/                    # Access control, A/B testing, utilities
│   ├── seo/                    # SEO components & JSON-LD schemas
│   ├── types/                  # Shared TypeScript types
│   └── ui/                     # Shared UI components (shadcn-based)
├── entities/                   # Domain components (BlogPostsGrid, Testimonials)
├── features/                   # Feature components (ExperimentTracker, LocaleSelector)
├── fields/                     # Reusable Payload field definitions
├── globals/                    # Payload globals (SiteSettings)
├── hooks/                      # Payload lifecycle hooks
├── i18n/                       # next-intl integration
├── messages/                   # Translation message files (en.json, es.json)
├── middleware.ts               # Locale routing, visitor ID cookies
├── migrations/                 # Database migration files
├── payload.config.ts           # Main Payload configuration
├── plugins/                    # Custom Payload plugins
├── providers/                  # React context providers
├── search/                     # Semantic search (pgvector embeddings)
└── widgets/                    # Custom admin panel widgets
```

**Path alias:** `@/*` maps to `./src/*`.

## Collections

| Collection | Description |
|-----------|-------------|
| **Users** | Admin users with role-based access |
| **Media** | Image/file uploads with auto-generated sizes and focal-point support |
| **Page** | Website pages with nested hierarchy and block-based content |
| **Posts** | Blog articles with categories, authors, and rich text |
| **Categories** | Blog post categorization |
| **Authors** | Blog post author profiles |
| **Testimonials** | Customer testimonials with rating support |
| **Header** | Site navigation header configuration |
| **Footer** | Site footer configuration |
| **DocumentEmbeddings** | Vector embeddings for semantic search |

## Globals

| Global | Description |
|-------|-------------|
| **SiteSettings** | Global site configuration — site name, logos, default SEO, analytics IDs |

## Page Blocks

Pages are composed from reusable, localizable blocks:

| Block | Description |
|-------|-------------|
| **Hero** | Page header with background image, headline, and CTA |
| **TextSection** | Rich text content with optional image |
| **Content** | General-purpose rich text with embedded media |
| **FAQ** | Collapsible question-and-answer pairs (with FAQPage JSON-LD) |
| **TestimonialsList** | Testimonials in carousel or grid layout |
| **CardsGrid** | Responsive grid of feature/content cards |
| **Carousel** | Image/content carousel |
| **Logos** | Client/partner logo strip |
| **LinksList** | Curated list of internal/external links |

All blocks support localization, presets, and A/B testing variants.

## Configuration

### Localization

**Config:** [`src/core/config/i18n.ts`](src/core/config/i18n.ts)

URL-prefix-based routing — every locale prefix is always visible (e.g., `/en/about`, `/es/acerca`).

```ts
// src/core/config/i18n.ts
{
  locales: [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
  ],
  defaultLocale: 'en',
  localePrefix: 'always',
}
```

**Adding a new locale:**

1. Add the locale entry in `src/core/config/i18n.ts`.
2. Add the corresponding language import in `payload.config.ts` under `i18n.supportedLanguages`.
3. Add admin UI translations in `payload.config.ts` under `i18n.translations`.
4. Create message files in `src/messages/` for the new locale.

All collection fields marked `localized: true` will automatically pick up the new locale in the admin panel.

### Access Control

Composable role-based helpers live in `src/core/lib/access/`: `superAdmin`, `admin`, `author`, `user`, `authenticated`, `anyone`, `nobody`, `onlySelf`, `createdBy` — combine with `or()` and `and()`.

## A/B Testing (Experiments)

The built-in experimentation framework lets you run A/B tests on supported page blocks.

**How it works:**

1. Create an experiment in the **Experiments** collection with two or more variants, each with a weight (must sum to 100%).
2. Each variant references a **Preset** (a saved block configuration).
3. When a visitor lands on a page, middleware assigns a stable `ab_visitor_id` cookie (365-day lifetime).
4. The variant is deterministically selected based on the visitor ID and cached in an `exp_[slug]` cookie (90-day lifetime).
5. The `ExperimentTracker` component logs view and click events to the **ExperimentEvents** collection via `/api/experiment-events`.

Supported block types for experiments: **Hero**, **TestimonialsList**.

## Plugins

Ideal CMS combines the open-source [FocusReactive Payload plugins](https://github.com/focusreactive/payload-plugins) with Payload's official plugins. Every FocusReactive plugin works standalone — drop them into any Payload project.

### FocusReactive Plugins

| Plugin | npm | GitHub | Description |
|--------|-----|--------|-------------|
| **Presets** | [`@focus-reactive/payload-plugin-presets`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-presets) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-presets) | Pre-configured block configurations — multiple versions of default values for editors who prefer editing over creating from scratch |
| **A/B Testing** | [`@focus-reactive/payload-plugin-ab`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-ab) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-ab) | Native experiments with dynamic % of traffic per variant — controlled from the same page you're working on |
| **Comments** | [`@focus-reactive/payload-plugin-comments`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-comments) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-comments) | Inline collaboration inside the CMS — feedback for content teams and devs, directly on the field |
| **AI Translation** | [`@focus-reactive/payload-plugin-translator`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-translator) | [Source](https://github.com/focusreactive/payload-plugin-translator) | One-click AI translations on top of Payload's localization plugin |
| **Scheduled Publishing** | [`@focus-reactive/payload-plugin-scheduling`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-scheduling) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-scheduling) | Scheduled publishing for serverless platforms like Vercel, where Payload's native scheduling can't run |

### Payload Official Plugins

| Plugin | Description |
|--------|-------------|
| `@payloadcms/plugin-nested-docs` | Hierarchical pages with auto-generated breadcrumbs |
| `@payloadcms/plugin-redirects` | URL redirect management with 307/308 support |
| `@payloadcms/plugin-seo` | Meta-tag fields for collections |
| `@payloadcms/storage-vercel-blob` | Cloud media storage for production deployments |
| `@payloadcms/plugin-mcp` | Model Context Protocol server for AI agents |

## Roadmap

Two more plugins we're actively working on — game changers, in our opinion:

- **Releases** — schedule the publication of multiple resources together in Payload CMS, so complex launches go out as a single coordinated release with no surprises.
- **Visual Editing** — a UI overlay over your content in preview mode, letting editors jump to the right field with one click instead of hunting through the admin.

Want to influence the roadmap? Open an issue on [`focusreactive/payload-plugins`](https://github.com/focusreactive/payload-plugins/issues) — we read everything.

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3333, Turbopack) |
| `pnpm devsafe` | Clear `.next` cache and start the dev server |
| `pnpm build` | Create a production build (8 GB memory limit) |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests (integration + E2E) |
| `pnpm test:int` | Run integration tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright, Chromium) |
| `pnpm payload` | Access the Payload CLI |
| `pnpm generate:types` | Regenerate TypeScript types from Payload config |
| `pnpm generate:importmap` | Regenerate Payload import map |

## Deployment

### Deploy to Vercel

The project is optimized for [Vercel](https://vercel.com/) deployment:

- Standalone Next.js output for minimal deployment size
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) integration for media storage
- ISR (Incremental Static Regeneration) with automatic cache invalidation on content changes
- Compatible with [Neon Postgres](https://neon.tech/) for branchable, serverless databases

### Docker

A multi-stage Dockerfile is included for self-hosted production deployments:

```bash
docker build -t ideal-cms .
docker run -p 3000:3000 ideal-cms
```

A `docker-compose.yml` is also provided for local development with PostgreSQL.

## Related Projects

- **[FocusReactive Payload plugins](https://github.com/focusreactive/payload-plugins)** — the open-source plugin monorepo this starter is built on. Use any plugin standalone in your own Payload project.
- **[CMS-Kit](https://github.com/focusreactive/cms-kit)** — the wider FocusReactive boilerplate covering Sanity, Storyblok, and Payload.

## License

MIT — free for personal and commercial use.

## About FocusReactive

[FocusReactive](https://focusreactive.com/) is a headless CMS development studio. We build production websites and platforms on Payload, Sanity, and Storyblok, and we open-source the patterns that work. Issues, discussions, and pull requests are all welcome.
