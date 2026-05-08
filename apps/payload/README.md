# Ideal CMS — Open-Source Payload CMS Starter with Next.js 15

A production-ready, open-source headless CMS built on [Payload CMS 3](https://payloadcms.com/) and [Next.js 15](https://nextjs.org/) — with multi-tenancy, internationalization (i18n), AI translations, native A/B testing, scheduled publishing on serverless, locale-scoped semantic search, inline comments, AI-assisted SEO, SSO, and a modular block-based page builder out of the box.

## About the Project

At [FocusReactive](https://focusreactive.com/) we build projects on different CMSs — Sanity, Storyblok, Strapi, and Payload. Each platform has its own unique features and limitations, and sometimes a project needs a feature one CMS has but another doesn't.

So we decided to build all of that into one open-source project — we call it **Ideal CMS**. The best features from every CMS we've worked with, available as Payload plugins. You can use the project with everything integrated, or install [individual plugins](https://github.com/focusreactive/payload-plugins) to get the features you need. This often helps our clients free up budget for things we believe should be included from day one.

Every plugin works independently in any Payload project. For new projects, we recommend starting from this repository — it combines all of the plugins with the basic setup you'll need to ship.

## Why Ideal CMS

- **Open-source and free.** MIT-licensed. Self-host on Vercel, your own infra, or anywhere Node.js runs.
- **Batteries included.** A/B testing, presets, inline comments, AI translation, scheduled publishing, semantic search, AI SEO, multi-tenancy, and SSO — all wired up.
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

### A/B Testing for Payload CMS

Run experiments on any supported page block — Hero, TestimonialsList, and more — directly inside the Payload admin. Visitors are deterministically bucketed by a stable cookie (`ab_visitor_id`, 365-day lifetime), variants are cached per visitor, and view/click events stream into the `ExperimentEvents` collection for downstream analytics.

Powered by [`@focus-reactive/payload-plugin-ab`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-ab).

### Multi-Tenancy

Run multiple brands, regions, or white-label sites from a single Payload instance. Tenants are resolved from the request subdomain, all collections are automatically tenant-scoped, and access control enforces strict isolation between tenants — with super-admins retaining cross-tenant access.

### Internationalization (i18n) + AI Translation

URL-prefixed routing for every locale (`/en/about`, `/es/acerca`) via `next-intl`. Field-level localization is supported across all collections — mark any field `localized: true` and Payload will surface a per-locale tab in the admin.

Payload already has a localization plugin, so on top of it we built an **AI Translation** plugin that fills in localized fields with one click. Powered by [`@focus-reactive/payload-plugin-translator`](https://github.com/focusreactive/payload-plugin-translator).

### Modular Block-Based Page Builder

Compose pages from reusable blocks: Hero, Content, FAQ, TextSection, CardsGrid, Carousel, Logos, LinksList, TestimonialsList. Every block ships with localization support, presets, and A/B-experiment hooks.

### Content Presets

Save block configurations as named presets and reuse them across pages — a "default values" system that turns content creation into editing. Powered by [`@focus-reactive/payload-plugin-presets`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-presets).

### Inline Comments & Collaboration

Comment, mention, and annotate fields directly inside the Payload admin so editors and developers can collaborate in place — no more screenshot-and-Slack feedback loops. Powered by [`@focus-reactive/payload-plugin-comments`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-comments).

### Scheduled Publishing on Serverless

Schedule documents to publish on Vercel and other serverless platforms — Payload's native scheduling assumes a long-running process, so we built a serverless-friendly alternative. Powered by [`@focus-reactive/payload-plugin-scheduling`](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-scheduling).

### AI-Powered SEO

Auto-generate meta titles, descriptions, and structured-data hints with OpenAI. JSON-LD schemas are emitted per content type for rich-result eligibility on Google, Bing, and other crawlers.

### Locale-Scoped Semantic Search

pgvector-backed semantic search lets visitors find content by meaning, not just keywords — and results stay scoped to the visitor's active locale, so a Spanish search never returns English-only content. Embeddings are generated automatically on content changes via Payload lifecycle hooks.

### Enterprise SSO

For enterprise clients, SSO is a common requirement that can save weeks of integration work. Ideal CMS ships with OIDC/SSO support for Auth0, Keycloak, Okta, and any OIDC-compliant identity provider — keep the one you want, drop the rest. JWT is used for the public API. PKCE flow supported.

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
| `OPENAI_API_KEY` | No | Enables AI-powered SEO meta generation and semantic search embeddings |
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
├── middleware.ts               # Locale routing, tenant detection, visitor ID
├── migrations/                 # Database migration files
├── payload.config.ts           # Main Payload configuration
├── plugins/                    # Custom Payload plugins (mcp, seoPlugin)
├── providers/                  # React context providers
├── search/                     # Semantic search (pgvector embeddings)
└── widgets/                    # Custom admin panel widgets
```

**Path alias:** `@/*` maps to `./src/*`.

## Collections

| Collection | Description |
|-----------|-------------|
| **Users** | Admin users with role-based access (super-admin, admin, author, user) |
| **Media** | Image/file uploads with auto-generated sizes and focal-point support |
| **Page** | Website pages with nested hierarchy and block-based content |
| **Posts** | Blog articles with categories, authors, and rich text |
| **Categories** | Blog post categorization |
| **Authors** | Blog post author profiles |
| **Testimonials** | Customer testimonials with rating support |
| **Header** | Per-tenant navigation header configuration |
| **Footer** | Per-tenant footer configuration |
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

### Multi-Tenancy

**Config:** [`src/core/config/tenant.ts`](src/core/config/tenant.ts)

Multi-tenancy isolates content by tenant using subdomain-based routing — `acme.yoursite.com` resolves to the `acme` tenant.

| Helper | Description |
|----------|-------------|
| `isTenantEnabled()` | Check if multi-tenancy is active |
| `getDefaultDomain()` | Get the default tenant domain name |
| `getDefaultTenantId()` | Get the resolved default tenant ID (set during `onInit`) |
| `getTenantFilter()` | Generate a Payload query filter for tenant-scoped data |

**How it works:**

- On application init ([`src/hooks/onInit.ts`](src/hooks/onInit.ts)), the default tenant is resolved (or created) and its ID is cached globally.
- Middleware ([`src/middleware.ts`](src/middleware.ts)) extracts the tenant from the request subdomain and rewrites URLs internally.
- In single-tenant mode, the default `main` domain is used transparently without exposing it in URLs.
- All collections are automatically filtered by tenant via the `@payloadcms/plugin-multi-tenant` plugin.
- Access control enforces tenant isolation: users only see data belonging to their assigned tenant(s); super-admins have cross-tenant access.

### Access Control

Role-based access is enforced across all collections:

| Role | Scope |
|------|-------|
| **Super Admin** | Full access to all tenants and collections |
| **Tenant Admin** | Full access within their assigned tenant(s) |
| **Author** | Content creation and editing within their tenant |
| **User** | Limited access within their tenant |

Composable helpers live in `src/core/lib/access/`: `superAdmin`, `admin`, `author`, `user`, `authenticated`, `anyone`, `nobody`, `onlySelf`, `createdBy` — combine with `or()` and `and()`.

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
| **A/B Testing** | [`@focus-reactive/payload-plugin-ab`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-ab) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-ab) | Native experiments with dynamic % of traffic per variant — controlled from the same page you're working on |
| **Presets** | [`@focus-reactive/payload-plugin-presets`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-presets) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-presets) | Pre-configured block configurations — multiple versions of default values for editors who prefer editing over creating from scratch |
| **Comments** | [`@focus-reactive/payload-plugin-comments`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-comments) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-comments) | Inline collaboration inside the CMS — feedback for content teams and devs, directly on the field |
| **AI Translation** | [`@focus-reactive/payload-plugin-translator`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-translator) | [Source](https://github.com/focusreactive/payload-plugin-translator) | One-click AI translations on top of Payload's localization plugin |
| **Scheduled Publishing** | [`@focus-reactive/payload-plugin-scheduling`](https://www.npmjs.com/package/@focus-reactive/payload-plugin-scheduling) | [Source](https://github.com/focusreactive/payload-plugins/tree/main/packages/payload-plugin-scheduling) | Scheduled publishing for serverless platforms like Vercel, where Payload's native scheduling can't run |

### Payload Official Plugins

| Plugin | Description |
|--------|-------------|
| `@payloadcms/plugin-multi-tenant` | Tenant field injection and data isolation across collections |
| `@payloadcms/plugin-nested-docs` | Hierarchical pages with auto-generated breadcrumbs |
| `@payloadcms/plugin-redirects` | URL redirect management with 307/308 support |
| `@payloadcms/plugin-seo` | Meta-tag fields for collections |
| `@payloadcms/storage-vercel-blob` | Cloud media storage for production deployments |
| `@payloadcms/plugin-mcp` | Model Context Protocol server for AI agents |
| **AI SEO** (custom) | OpenAI-powered auto-generation of meta titles and descriptions |

## Roadmap

Two more plugins we're actively working on — game changers, in our opinion:

- **Releases** — schedule the publication of multiple resources together, so complex launches go out as a single coordinated release, no surprises.
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
