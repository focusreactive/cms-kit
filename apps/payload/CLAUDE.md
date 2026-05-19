# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this Payload + Next.js app.

## Commands

```bash
pnpm dev                    # Dev server (Turbopack, port 3333)
pnpm devsafe                # Dev with .next cache cleared
pnpm build                  # Production build (8GB memory limit)
pnpm lint                   # ESLint
pnpm test:int               # Vitest integration tests
pnpm test:e2e               # Playwright E2E tests (Chromium)
pnpm generate:types         # Regenerate Payload TypeScript types — run after schema changes
pnpm generate:importmap     # Regenerate Payload import map — run after adding/editing admin components
pnpm payload migrate:create # Create a new database migration
pnpm payload migrate        # Apply pending migrations
```

Validate changes with: `tsc --noEmit && pnpm lint`.

## Tech Stack

Next.js 15 + React 19 with Payload CMS 3, PostgreSQL, Tailwind CSS 4, next-intl 4. **React Compiler is enabled — do not use `useMemo` or `useCallback`.**

## Architecture

```
src/
├── app/(frontend)/[locale]/   # Public, locale-prefixed routes
├── app/(payload)/             # Admin panel + REST/custom API
├── auth/                      # OIDC SSO
├── blocks/                    # Page builder blocks (Hero, Content, Faq, …)
├── collections/               # Payload collection configs
├── core/
│   ├── config/                # i18n, blog, customPages
│   ├── lib/access/            # Access control helpers
│   ├── lib/abTesting/         # A/B middleware adapter, cookies, variant data
│   └── seo/                   # SEO components & JSON-LD schemas
├── globals/                   # Payload globals (SiteSettings)
├── hooks/                     # Payload lifecycle hooks
├── i18n/                      # next-intl integration
├── middleware.ts              # Locale routing + A/B rewrite resolution
├── plugins/                   # Plugin wiring (`plugins/index.ts`, MCP, custom SEO)
└── search/                    # pgvector semantic search
```

**Path alias:** `@/*` → `./src/*`.

## Wired Plugins

`src/plugins/index.ts` is the single source of truth for plugin wiring. Currently active:

- `vercelBlobStorage` — production media uploads
- `redirectsPlugin` — 307/308 redirects, custom field overrides
- Custom `seoPlugin` — meta + JSON-LD
- `nestedDocsPlugin` — nested page hierarchy + breadcrumbs
- `@focus-reactive/payload-plugin-presets` — reusable block configurations
- `@focus-reactive/payload-plugin-comments` — inline field comments
- `@focus-reactive/payload-plugin-scheduling` — scheduled publishing on serverless
- `@focus-reactive/payload-plugin-translator` — AI translation (OpenAI provider)
- `@focus-reactive/payload-plugin-ab` — A/B testing with middleware-driven variant rewrites
- MCP plugin — exposes content tools to AI agents

## Key Patterns

### Localization

Locales live in `src/core/config/i18n.ts` (`en`, `es`). URLs always include the locale prefix (`/en/`, `/es/`). Mark fields `localized: true` and use `createLocalizedDefault({ en: '…', es: '…' })` for defaults.

### Blocks & Presets

Each block lives in `src/blocks/<BlockName>/config.ts`, supports presets and A/B-experiment fields, and uses `getBlockPreviewImage('BlockName')` for the admin preview thumbnail.

### A/B Testing

The plugin owns the experiment/variant data model. Middleware (`src/middleware.ts`) calls `resolveAbRewrite` to pick a variant and rewrite the request. Visitor identity is cookie-based (`ab_visitor_id`); variant choice is cached per slug.

### Access Control

Composable helpers exported from `src/core/lib/access/`: `superAdmin`, `admin`, `author`, `user`, `authenticated`, `anyone`, `nobody`, `onlySelf`, `createdBy`. Combine with `or()` and `and()`.

### Custom Admin Components

Register by **file path string**, not import: `'/components/MyComponent'`. Named exports use `'#'`: `'/components/MyComponent#Named'`. Default is a Server Component — add `'use client'` for client components. Run `pnpm generate:importmap` after adding or moving any registered component.

## Critical Rules

1. **Local API access control:** When passing `user` to Payload's Local API, always set `overrideAccess: false`. Otherwise access control is bypassed.
2. **Hook transactions:** Always pass `req` to nested Payload operations inside hooks so they share the surrounding transaction.
3. **Hook recursion:** Use a `context` flag (e.g., `context.skipHooks`) to break infinite hook loops.
4. **Schema workflow:** Edit collection/field config → `pnpm generate:types` → `pnpm payload migrate:create` → `pnpm payload migrate`.
5. **Migrations are explicit:** `push: false` is set — never rely on auto-push.

## MCP Output

When Payload MCP tools (`getPageContent`, `getPostsContent`, etc.) return content, output it **verbatim** — do not reformat, paraphrase, or summarize. The response is already pre-formatted Markdown.

## Tests

- Integration: `tests/int/**/*.int.spec.ts` (Vitest, jsdom)
- E2E: `tests/e2e/` (Playwright, Chromium only)

## See Also

`AGENTS.md` for comprehensive Payload conventions. `.cursor/rules/` for detailed guides on collections, fields, hooks, access control, plugins, and components.
