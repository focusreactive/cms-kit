# 🚀 Ideal CMS

A production-ready content management system built with [Payload CMS 3](https://payloadcms.com/) and [Next.js 15](https://nextjs.org/), featuring multi-tenancy, internationalization, A/B testing, and a modular block-based page builder.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CMS | Payload 3.73.0 |
| Framework | Next.js 15, React 19 |
| Database | PostgreSQL |
| Styling | Tailwind CSS 4 |
| Rich Text | Lexical Editor |
| i18n | next-intl 4 |
| Auth | JWT + OIDC/SSO (Auth0, Keycloak, Okta) |
| Storage | Vercel Blob (production), local filesystem (dev) |
| Testing | Vitest (integration), Playwright (E2E) |

## Getting Started

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` or `^10`
- PostgreSQL instance

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
| `OPENAI_API_KEY` | No | Enables AI-powered SEO meta generation |
| `OIDC_ISSUER` | No | OIDC provider URL for SSO |
| `OIDC_CLIENT_ID` | No | OIDC client ID |
| `OIDC_CLIENT_SECRET` | No | OIDC client secret |
| `OIDC_REDIRECT_URI` | No | Callback URL (defaults to `SERVER_URL/api/auth/oidc/callback`) |
| `OIDC_USE_PKCE` | No | Enable PKCE flow (recommended for Auth0) |
| `OIDC_PROVIDER_NAME` | No | Label shown on SSO login button |
| `NEXT_PUBLIC_OIDC_PROVIDER_NAME` | No | Client-side SSO provider label |

### Running the App

```bash
# Development
pnpm dev

# Development (clean .next cache first)
pnpm devsafe

# Production build
pnpm build

# Production server
pnpm start
```

The admin panel is available at `/admin`. The frontend uses locale-prefixed routes (`/en/...`, `/es/...`).

### Database Migrations

The project uses Payload's migration system with `push: false`, meaning schema changes require explicit migrations:

```bash
# Create a new migration
pnpm payload migrate:create

# Run pending migrations
pnpm payload migrate
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/             # Public-facing routes
│   │   └── [locale]/           # Locale-based dynamic routing
│   │       └── [...slug]/      # Catch-all for pages and blog
│   └── (payload)/              # Admin panel and API routes
│       ├── admin/              # Payload admin UI
│       └── api/                # REST + custom API endpoints
│           ├── experiment-events/  # A/B test event tracking
│           ├── redirect/           # Redirect resolution
│           └── revalidate/         # ISR cache invalidation
├── auth/                       # OIDC/SSO authentication config
├── blocks/                     # Page builder blocks (Hero, FAQ, etc.)
├── collections/                # Payload collection configs
├── entities/                   # Domain entity types
├── features/                   # Feature components (ExperimentTracker)
├── fields/                     # Reusable Payload field definitions
├── hooks/                      # Payload lifecycle hooks
├── i18n/                       # next-intl integration
├── messages/                   # Translation message files
├── middleware.ts               # Locale routing, tenant detection, visitor ID
├── migrations/                 # Database migration files
├── payload.config.ts           # Main Payload configuration
├── plugins/                    # Payload plugin configs
├── providers/                  # React context providers
├── shared/
│   ├── config/                 # App-wide configuration (i18n, tenant, blog)
│   ├── constants/              # Constants and default values
│   ├── lib/                    # Utility functions and helpers
│   ├── types/                  # Shared TypeScript types
│   └── ui/                     # Shared UI components
└── widgets/                    # Custom admin panel widgets
```

## Collections

| Collection | Description |
|-----------|-------------|
| **Users** | Admin users with role-based access (admin, author, user) |
| **Media** | Image/file uploads with auto-generated sizes and focal point support |
| **Page** | Website pages with nested hierarchy and block-based content |
| **Posts** | Blog articles with categories, authors, and rich text |
| **Categories** | Blog post categorization |
| **Authors** | Blog post authors |
| **Testimonials** | Customer testimonials with rating support |
| **Experiments** | A/B test definitions with weighted variants |
| **ExperimentEvents** | Raw A/B test event tracking data |
| **Tenants** | Tenant domain configurations |
| **Header** | Navigation header config per tenant |
| **Footer** | Footer config per tenant |
| **SiteSettings** | Global site configuration (name, logos, analytics) |
| **BlogPageSettings** | Blog-specific page settings |

## Page Blocks

Pages are built using composable content blocks:

| Block | Description |
|-------|-------------|
| **Hero** | Page header with background image, headline, and CTA |
| **TextSection** | Rich text content with optional image |
| **Content** | General-purpose rich text with embedded media |
| **FAQ** | Collapsible question-and-answer pairs |
| **TestimonialsList** | Testimonial display in carousel or grid layout |

All blocks support localization and can be used with the A/B testing system.

## Configuration

### Localization

**Config file:** [`src/shared/config/i18n.ts`](src/shared/config/i18n.ts)

The application supports multiple locales with URL-prefix-based routing. Every locale prefix is always visible in the URL (e.g., `/en/about`, `/es/acerca`).

```ts
// src/shared/config/i18n.ts
{
  locales: [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
  ],
  defaultLocale: 'en',
  localePrefix: 'always',
}
```

**To add a new locale:**

1. Add the locale entry in `src/shared/config/i18n.ts`
2. Add the corresponding language import in `payload.config.ts` under `i18n.supportedLanguages`
3. Add admin UI translations in `payload.config.ts` under `i18n.translations`
4. Create message files in `src/messages/` for the new locale

All collection fields marked with `localized: true` will automatically support the new locale in the admin panel.

### Multi-Tenancy

**Config file:** [`src/shared/config/tenant.ts`](src/shared/config/tenant.ts)

Multi-tenancy isolates content by tenant using subdomain-based routing. Each tenant maps to a domain (e.g., `acme.yoursite.com` resolves to the `acme` tenant).

```ts
// src/shared/config/tenant.ts
{
  enabled: true,
  defaultDomain: 'main',
}
```

| Function | Description |
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
- Access control enforces tenant isolation: users only see data belonging to their assigned tenant(s), while super-admins have cross-tenant access.

### Access Control

Role-based access is enforced across all collections:

| Role | Scope |
|------|-------|
| **Super Admin** | Full access to all tenants and collections |
| **Tenant Admin** | Full access within their assigned tenant(s) |
| **Author** | Content creation and editing within their tenant |
| **User** | Limited access within their tenant |

## A/B Testing (Experiments)

The built-in experimentation framework allows running A/B tests on page blocks.

**How it works:**

1. Create an experiment in the **Experiments** collection with two or more variants, each with a weight (must sum to 100%).
2. Each variant references a **Preset** (a saved block configuration).
3. When a visitor lands on a page, the middleware assigns a stable `ab_visitor_id` cookie (365-day lifetime).
4. The variant is deterministically selected based on the visitor ID and cached in an `exp_[slug]` cookie.
5. The `ExperimentTracker` component logs view and click events to the **ExperimentEvents** collection via `/api/experiment-events`.

Supported block types for experiments: **Hero**, **TestimonialsList**.

## Plugins

| Plugin | Description |
|--------|-------------|
| **Multi-Tenant** | Tenant field injection and data isolation across collections |
| **Nested Docs** | Hierarchical page structure with auto-generated breadcrumbs |
| **Redirects** | URL redirect management with 307/308 support |
| **SEO** | Meta tag management fields for collections |
| **AI SEO** | OpenAI-powered auto-generation of meta titles and descriptions |
| **Vercel Blob Storage** | Cloud media storage for production deployments |
| **Presets** | Reusable block configurations for experiments and content reuse |

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm devsafe` | Clear `.next` cache and start dev server |
| `pnpm build` | Create production build (8 GB memory limit) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests (integration + E2E) |
| `pnpm test:int` | Run integration tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm payload` | Access Payload CLI |
| `pnpm generate:types` | Regenerate TypeScript types from Payload config |
| `pnpm generate:importmap` | Regenerate Payload import map |

## Deployment

### Docker

A multi-stage Dockerfile is included for production deployments:

```bash
docker build -t ideal-cms .
docker run -p 3000:3000 ideal-cms
```

A `docker-compose.yml` is also provided for local development with PostgreSQL.

### Vercel

The project is optimized for Vercel deployment:

- Standalone Next.js output for minimal deployment size
- Vercel Blob integration for media storage
- ISR (Incremental Static Regeneration) with automatic cache invalidation on content changes
