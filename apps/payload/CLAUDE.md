# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                    # Development server
pnpm devsafe                # Clean dev (removes .next cache first)
pnpm build                  # Production build (8GB memory limit)
pnpm start                  # Production server
pnpm lint                   # ESLint
pnpm test                   # Run all tests (integration + e2e)
pnpm test:int               # Vitest integration tests only
pnpm test:e2e               # Playwright E2E tests only (Chromium)
pnpm generate:types         # Regenerate Payload TypeScript types (run after schema changes)
pnpm generate:importmap     # Regenerate Payload import map (run after adding/modifying admin components)
pnpm generate:experiments   # Generate A/B experiment manifest
pnpm payload migrate:create # Create new database migration
pnpm payload migrate        # Run pending migrations
```

Validate changes with: `tsc --noEmit && pnpm lint`

## Tech Stack

Next.js 15 + React 19 with Payload CMS 3, PostgreSQL, Tailwind CSS 4, next-intl 4 for i18n, Vitest + Playwright for testing. React Compiler is enabled — do **not** use `useMemo` or `useCallback`.

## Architecture

```
src/
├── app/(frontend)/[locale]/[domain]/  # Public routes (locale + tenant prefixed)
├── app/(payload)/admin/               # Payload admin panel
├── app/(payload)/api/                 # REST + custom API endpoints
├── blocks/                            # Page builder blocks (Hero, Content, Faq, etc.)
├── collections/                       # Payload collection configs
├── entities/                          # Domain components (BlogPostsGrid, Testimonials)
├── features/                          # Feature components (ExperimentTracker, LocaleSelector)
├── fields/                            # Reusable Payload field definitions
├── hooks/                             # Payload lifecycle hooks
├── i18n/                              # next-intl integration
├── messages/                          # Translation files (en.json, es.json)
├── middleware.ts                      # Locale routing, tenant detection, visitor ID cookies
├── migrations/                        # Database migrations
├── plugins/                           # Custom Payload plugins (aiSeo, presets, seo, multiTenant)
├── providers/                         # React context providers
├── shared/
│   ├── config/                        # App config (i18n, tenant, blog)
│   ├── constants/                     # Constants (defaults, experiments, presets)
│   ├── lib/access/                    # Access control helpers
│   ├── lib/experiment/                # A/B testing utilities
│   ├── seo/                           # SEO components & JSON-LD schemas
│   ├── types/                         # Shared TypeScript types
│   └── ui/                            # Shared UI components (shadcn-based)
└── widgets/                           # Admin panel widgets
```

**Path alias:** `@/*` maps to `./src/*`

## Key Patterns

### Collections

All tenant-aware collections must include `tenantFields()`, the `beforeChangeTenant` hook, and `createValidateSlugTenantUnique('slug')` for uniqueness validation. Labels should be localized (en/es).

### Multi-Tenancy

Configured in `src/shared/config/tenant.ts`. Middleware maps subdomains to tenants. Default tenant resolved in `onInit` hook and cached in `globalThis.__defaultTenantId`. All filtered queries use `getTenantFilter(tenantId)`.

### Localization

Locales defined in `src/shared/config/i18n.ts` (currently `en`, `es`). URLs always include locale prefix (`/en/`, `/es/`). Use `localized: true` on fields and `createLocalizedDefault(value)` for defaults.

### Blocks & Presets

Blocks live in `src/blocks/BlockName/config.ts`. They support presets (reusable saved configurations) and A/B experiment fields. Use `getBlockPreviewImage('BlockName')` for admin previews.

### A/B Testing

Experiments collection defines variants with weights (must sum to 100%). Variants reference Presets. Visitor ID cookie (`ab_visitor_id`, 365 days) ensures stable assignment. Variant cached in `exp_{slug}` cookie (90 days). `ExperimentTracker` component logs events.

### Access Control

Helpers in `src/shared/lib/access/`: `superAdmin`, `tenantAdmin`, `author`, `user`, `authenticated`, `anyone`. Combine with `or()`, `and()`. Roles: `super-admin`, `tenant-admin`, `author`, `user`.

### Custom Admin Components

Register via file paths (not imports): `'/components/MyComponent'`. Named exports: `'/components/MyComponent#Named'`. Run `pnpm generate:importmap` after changes. Default is Server Components; add `'use client'` for client components.

## MCP Tools

When Payload MCP tools (e.g. `getPageContent`, `getPostsContent`) return content, output it **verbatim** — do not reformat, paraphrase, or summarize. The response is already pre-formatted Markdown.

## Critical Rules

1. **Local API access control:** Always set `overrideAccess: false` when passing a `user` to Payload's Local API, otherwise access control is bypassed.

2. **Transaction safety in hooks:** Always pass `req` to nested Payload operations inside hooks to maintain database transaction atomicity.

3. **Hook loop prevention:** Use `context` flags (e.g., `context.skipHooks`) to prevent infinite hook recursion.

4. **Schema changes workflow:** Modify collection/field config → `pnpm generate:types` → `pnpm payload migrate:create` → `pnpm payload migrate`

5. **Database migrations:** `push: false` is set — migrations are explicit, never auto-pushed.

## Testing

- **Integration tests:** `tests/int/**/*.int.spec.ts` (Vitest, jsdom)
- **E2E tests:** `tests/e2e/` (Playwright, Chromium only)

## Additional References

See `AGENTS.md` for comprehensive Payload CMS development rules. See `.cursor/rules/` for detailed guides on collections, fields, hooks, access control, plugins, and components.
