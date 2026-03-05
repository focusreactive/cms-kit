# Payload CMS Migration Into cms-kit — Design Doc

**Date:** 2026-03-02
**Status:** Approved

## Goal

Integrate the standalone Payload CMS project into the `focusreactive/cms-kit` monorepo as `apps/payload`, making it the third CMS option alongside Sanity and Storyblok. As part of this migration, upgrade the entire monorepo from Tailwind CSS v3 to v4, React 18 to 19, and TypeScript 5.4 to 5.7 to bring all apps to modern standards.

## Source Projects

- **cms-kit:** `/Users/maksim/Documents/code/cms-kit/` — Turborepo + pnpm monorepo with `apps/sanity`, `apps/storyblok`, shared packages
- **payload-cms-ideal-cms:** `/Users/maksim/Documents/code/payload-cms-ideal-cms/` — standalone Next.js 15 + Payload CMS 3 + PostgreSQL project

## Target Repository Structure

```
cms-kit/
├── apps/
│   ├── sanity/          # existing, upgraded to Tailwind v4
│   ├── storyblok/       # existing, upgraded to Tailwind v4
│   └── payload/         # NEW — moved from standalone repo
├── packages/
│   ├── ui/              # upgraded: React 19, Tailwind v4, TS 5.7
│   ├── tailwind-config/ # upgraded: Tailwind v4, CSS-first export
│   ├── ts-config/       # upgraded: TS 5.7, React 19 types
│   ├── eslint-config/   # upgraded: ESLint 9 + Next.js 15 compat
│   └── sanity-template-selector/  # unchanged
├── turbo.json           # + Payload env vars + Payload-specific tasks
├── pnpm-workspace.yaml  # unchanged (apps/* already covered)
└── README.md            # + Payload section
```

## Migration Approach: Parallel Streams (Approach C)

Build a clear dependency graph and use parallel agents wherever tasks are independent.

## Dependency Graph & Task Breakdown

### Phase 0 — Foundation (sequential)

**T0: Move apps/payload**
- Copy all files from `payload-cms-ideal-cms/` into `cms-kit/apps/payload/`
- Exclude: `node_modules/`, `.next/`, `pnpm-lock.yaml` (monorepo has its own)
- Update `package.json`: rename to `payload`, align pnpm/node engine fields
- Add Payload env vars to `turbo.json` `globalEnv`:
  `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `AUTH0_*`, `BLOB_READ_WRITE_TOKEN`, `EDGE_CONFIG`
- Add Payload-specific turbo tasks: `generate:types`, `generate:importmap`
- Run `pnpm install` from monorepo root, verify `turbo dev --filter=payload` works
- Keep Payload's own Tailwind v4 setup intact at this stage (it already uses v4)

### Phase 1 — Shared Package Upgrades (parallel, runs after T0)

**T1a: Upgrade packages/tailwind-config → Tailwind v4**
- Tailwind v4 is CSS-first: no `tailwind.config.ts`, config lives in CSS `@theme {}` blocks
- Replace JS config export with a CSS file export (`base.css`) containing shared theme tokens
- Update `package.json`: `tailwindcss` → `^4.x`, add `@tailwindcss/postcss` or `@tailwindcss/vite`
- Remove `tailwindcss-animate` (or find v4-compatible version), keep `@tailwindcss/typography`
- Export: `@shared/tailwind-config/base.css` — apps import this in their global CSS

**T1b: Upgrade packages/ts-config + packages/eslint-config**
- `packages/ts-config`: bump TypeScript peer to `^5.7`, update `@types/react` to `^19`, add React 19 compiler-friendly settings
- `packages/eslint-config`: upgrade to ESLint 9 flat config format, update `eslint-config-next` to `^15`, remove deprecated rules

### Phase 2 — App & UI Upgrades (parallel, runs after T1a + T1b complete)

**T2a: Upgrade packages/ui**
- Bump `react`/`react-dom` to `^19`, `@types/react` to `^19`
- Bump `typescript` to `5.7.x`
- Replace Tailwind v3 class usage and config with v4 CSS-based approach
- Import `@shared/tailwind-config/base.css` as the base
- Update Radix UI component versions if needed
- Bump `next` peer to `15.5.9`

**T2b: Upgrade apps/sanity → Tailwind v4**
- Remove `tailwind.config.ts`, update `postcss.config.js` → use `@tailwindcss/postcss`
- Update global CSS: replace `@tailwind` directives with `@import "tailwindcss"` + `@import "@shared/tailwind-config/base.css"`
- Migrate any custom theme overrides to `@theme {}` blocks in CSS
- Update `package.json` deps: `tailwindcss` → `^4.x`, `@tailwindcss/postcss`, remove `autoprefixer` (not needed in v4)

**T2c: Upgrade apps/storyblok → Tailwind v4**
- Same as T2b: remove `tailwind.config.ts`, update CSS imports, update deps

### Phase 3 — Payload Integration (sequential, after all T2 complete)

**T3: Integrate apps/payload with shared packages**
- Add `@shared/eslint-config`, `@shared/ts-config` as devDependencies
- Replace `apps/payload/eslint.config.mjs` with shared config (extend with Payload-specific overrides)
- Replace `apps/payload/tsconfig.json` with shared base + Payload overrides
- The Payload app already uses Tailwind v4 — just add `@shared/tailwind-config/base.css` import to its global CSS for shared tokens
- Identify UI components in `apps/payload/src/shared/ui/` that overlap with `@shared/ui` and migrate them (or keep Payload-specific ones as-is)
- Update `turbo.json`: add Payload tasks (`generate:types`, `generate:importmap`, `payload` CLI)
- Update `README.md`: add Payload section with setup instructions (DATABASE_URI, Docker, migrations)
- Update `pnpm gen` generators to include a "Payload" option

## Key Technical Details

### Tailwind v4 Migration Notes
- `@tailwind base/components/utilities` → `@import "tailwindcss"`
- `tailwind.config.ts` theme customizations → `@theme {}` blocks in CSS
- PostCSS: replace `tailwindcss` plugin with `@tailwindcss/postcss`
- `tailwindcss-animate` v1 is not compatible with Tailwind v4 — use CSS animations directly or `tw-animate-css` (which the Payload app already uses)
- `@tailwindcss/typography` has a v4-compatible version

### Payload-Specific Monorepo Considerations
- PostgreSQL via Docker — add `docker-compose.yml` note to README, not moved into monorepo root
- Database migrations are explicit (`push: false`) — document in README
- `pnpm generate:types` and `pnpm generate:importmap` must be added to turbo task graph
- Payload admin custom components use file paths, not imports — no change needed

## Success Criteria

1. `turbo dev --filter=payload` starts the Payload app from the monorepo root
2. `turbo dev --filter=sanity` and `turbo dev --filter=storyblok` continue to work
3. `turbo build` succeeds for all three apps
4. All Payload tests pass (`pnpm test:int`, `pnpm test:e2e`)
5. All three apps use Tailwind v4
6. Shared packages (`@shared/ui`, `@shared/tailwind-config`, etc.) are on React 19 + TS 5.7

## Rollback Strategy

Each phase is committed separately. If T2b (sanity upgrade) breaks, revert that commit without affecting T2c (storyblok) or T2a (ui package). The Payload app (T0) is committed first and can always be reverted independently.
