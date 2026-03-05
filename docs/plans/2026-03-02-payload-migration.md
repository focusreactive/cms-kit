# Payload CMS Migration Into cms-kit — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate the standalone Payload CMS project into cms-kit as `apps/payload` (third CMS option), and upgrade the entire monorepo from Tailwind CSS v3 to v4, React 18 to 19, TypeScript 5.4 to 5.7.

**Architecture:** Parallel streams — move Payload first (foundation), then upgrade shared packages in parallel (stream 1), then upgrade all three apps in parallel (stream 2), finally wire everything together. Each phase is independently committable.

**Tech Stack:** Turborepo, pnpm workspaces, Next.js 15, React 19, Tailwind CSS 4, TypeScript 5.7, Payload CMS 3, PostgreSQL.

**Source repos (local):**
- cms-kit: `/Users/maksim/Documents/code/cms-kit/`
- payload project: `/Users/maksim/Documents/code/payload-cms-ideal-cms/`

---

## Dependency Graph

```
T0 (move payload)
  ├── T1a (packages/tailwind-config → v4)   ← parallel after T0
  └── T1b (packages/ts-config + eslint-config)  ← parallel after T0

T1a + T1b done →
  ├── T2a (packages/ui → React 19 + Tailwind v4)   ← parallel
  ├── T2b (apps/sanity → Tailwind v4)               ← parallel
  └── T2c (apps/storyblok → Tailwind v4)            ← parallel

T2a + T2b + T2c done →
  └── T3 (integrate apps/payload with shared packages + README)
```

---

## Task T0: Move apps/payload into the monorepo

**Files:**
- Create: `apps/payload/` (copy from `payload-cms-ideal-cms/`)
- Modify: `turbo.json`

### Step 1: Copy the Payload project into apps/payload

```bash
rsync -av \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='pnpm-lock.yaml' \
  --exclude='package-lock.json' \
  --exclude='.git' \
  /Users/maksim/Documents/code/payload-cms-ideal-cms/ \
  /Users/maksim/Documents/code/cms-kit/apps/payload/
```

Expected: all source files copied, no node_modules or lock files.

### Step 2: Update package name in apps/payload/package.json

Change the `"name"` field from `"payload-cms-ideal-cms"` to `"payload"`. No other changes to package.json yet (shared package integration is Phase 3).

```json
{
  "name": "payload",
  ...
}
```

### Step 3: Add Payload env vars to turbo.json

Modify `/Users/maksim/Documents/code/cms-kit/turbo.json`:

**globalEnv** — add these to the existing array:
```
"DATABASE_URI",
"PAYLOAD_SECRET",
"AUTH0_SECRET",
"AUTH0_BASE_URL",
"AUTH0_ISSUER_BASE_URL",
"AUTH0_CLIENT_ID",
"AUTH0_CLIENT_SECRET",
"BLOB_READ_WRITE_TOKEN",
"EDGE_CONFIG"
```

**tasks** — add these new task definitions alongside existing ones:
```json
"generate:types": {
  "cache": false
},
"generate:importmap": {
  "cache": false
},
"devsafe": {
  "cache": false,
  "persistent": true
}
```

### Step 4: Install dependencies from monorepo root

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
```

Expected: pnpm resolves all three apps' dependencies. No errors.

### Step 5: Verify the Payload app starts

```bash
cd /Users/maksim/Documents/code/cms-kit
pnpm --filter payload dev
```

Expected: Next.js dev server starts on default port. May show DB connection errors (normal without local Postgres running) but the Next.js server itself should boot.

To verify without DB: check that `http://localhost:3000` returns a Next.js response (even an error page is fine at this stage).

Stop the server with Ctrl+C.

### Step 6: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add apps/payload turbo.json
git commit -m "feat: add apps/payload to monorepo (standalone, pre-integration)"
```

---

## Task T1a: Upgrade packages/tailwind-config to Tailwind v4

**Context:** Tailwind v4 is CSS-first — no `tailwind.config.ts`, config lives in CSS `@theme {}` blocks. The shared package changes from exporting a JS config to exporting a CSS file.

**Files:**
- Modify: `packages/tailwind-config/package.json`
- Delete: `packages/tailwind-config/index.ts`
- Delete: `packages/tailwind-config/lib/preset.ts`
- Delete: `packages/tailwind-config/lib/plugin.ts`
- Modify: `packages/tailwind-config/postcss.js`
- Create: `packages/tailwind-config/base.css`
- Modify: `packages/tailwind-config/tsconfig.json`

### Step 1: Update package.json

Replace entire contents of `packages/tailwind-config/package.json`:

```json
{
  "name": "@shared/tailwind-config",
  "version": "0.2.0",
  "license": "MIT",
  "exports": {
    "./base.css": "./base.css",
    "./postcss": "./postcss.js"
  },
  "files": ["base.css", "postcss.js"],
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@tailwindcss/typography": "^0.5.15",
    "tailwindcss": "^4.1.18",
    "tw-animate-css": "^1.2.9"
  },
  "devDependencies": {
    "@shared/ts-config": "workspace:*",
    "typescript": "5.7.3"
  }
}
```

### Step 2: Update postcss.js

Replace entire contents of `packages/tailwind-config/postcss.js`:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Step 3: Create base.css

This file replaces both `index.ts` (the shared config) and `lib/preset.ts` (the plugin config). Create `packages/tailwind-config/base.css`:

```css
/* Tailwind v4 base — imported by all apps */
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

/* Dark mode: class-based */
@variant dark (&:where(.dark, .dark *));

/* Custom utility from the old customPlugin */
@utility mask-shadow-y {
  mask-image: linear-gradient(90deg, transparent, #fff 10%, #fff 90%, transparent);
}

/* Shared design tokens */
@theme {
  /* Font families (from old customPlugin) */
  --font-family-body: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-sans: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

  /* Primary color scale (from old customPlugin) */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Typography prose heading colors (from old customPlugin) */
  --tw-prose-headings: var(--text);
  --tw-prose-invert-headings: var(--text);
}
```

### Step 4: Delete old files

```bash
rm /Users/maksim/Documents/code/cms-kit/packages/tailwind-config/index.ts
rm /Users/maksim/Documents/code/cms-kit/packages/tailwind-config/lib/preset.ts
rm /Users/maksim/Documents/code/cms-kit/packages/tailwind-config/lib/plugin.ts
rmdir /Users/maksim/Documents/code/cms-kit/packages/tailwind-config/lib
```

### Step 5: Update tsconfig.json in the package

Replace `packages/tailwind-config/tsconfig.json` — now it only needs to compile `postcss.js` (which is plain JS), so simplify:

```json
{
  "extends": "@shared/ts-config/base.json",
  "include": ["postcss.js"],
  "exclude": ["node_modules"]
}
```

### Step 6: From monorepo root, reinstall

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
```

Expected: no errors. The `@tailwindcss/postcss` and `tw-animate-css` packages are now installed.

### Step 7: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add packages/tailwind-config
git commit -m "feat(tailwind-config): upgrade to Tailwind CSS v4 CSS-first config"
```

---

## Task T1b: Upgrade packages/ts-config and packages/eslint-config

**Files:**
- Modify: `packages/ts-config/package.json`
- Modify: `packages/ts-config/base.json`
- Modify: `packages/ts-config/nextjs.json`
- Modify: `packages/ts-config/react-library.json`
- Modify: `packages/eslint-config/package.json`
- Modify: `packages/eslint-config/index.js`

### Step 1: Read current packages/ts-config/base.json

```bash
cat /Users/maksim/Documents/code/cms-kit/packages/ts-config/base.json
```

### Step 2: Update packages/ts-config/package.json

```json
{
  "name": "@shared/ts-config",
  "version": "0.2.0",
  "license": "MIT",
  "devDependencies": {
    "typescript": "5.7.3",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

### Step 3: Update packages/ts-config/base.json

Replace with:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "bundler",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022"]
  },
  "exclude": ["node_modules"]
}
```

### Step 4: Update packages/ts-config/react-library.json

Replace with:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "React Library",
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2022", "dom", "dom.iterable"],
    "module": "ESNext",
    "target": "ES2022"
  }
}
```

### Step 5: Update packages/eslint-config/package.json

Read the current file first:
```bash
cat /Users/maksim/Documents/code/cms-kit/packages/eslint-config/package.json
```

Then replace with ESLint 9 compatible version:

```json
{
  "name": "@shared/eslint-config",
  "version": "0.2.0",
  "license": "MIT",
  "main": "index.js",
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-config-turbo": "^2.3.3"
  },
  "devDependencies": {
    "typescript": "5.7.3"
  },
  "peerDependencies": {
    "eslint": "^9"
  }
}
```

### Step 6: Update packages/eslint-config/index.js to ESLint 9 flat config

Replace entire file:

```js
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "react/jsx-key": "off",
    },
    reportUnusedDisableDirectives: true,
  },
];
```

Also update `packages/eslint-config/package.json` to add `"type": "module"` so ESM exports work.

### Step 7: Reinstall from monorepo root

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
```

Expected: no errors.

### Step 8: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add packages/ts-config packages/eslint-config
git commit -m "feat(ts-config,eslint-config): upgrade to TS 5.7, React 19 types, ESLint 9 flat config"
```

---

## Task T2a: Upgrade packages/ui to React 19 + Tailwind v4

**Prerequisite:** T1a and T1b must be complete.

**Context:** packages/ui is a shared component library. In Tailwind v4, it no longer needs its own tailwind.config.ts — consuming apps scan it for class names. We remove the standalone Tailwind build from the package and keep it as a pure class-name component library.

**Files:**
- Modify: `packages/ui/package.json`
- Delete: `packages/ui/tailwind.config.ts`
- Delete: `packages/ui/postcss.config.js`
- Modify: `packages/ui/tsconfig.json`
- Modify: `packages/ui/styles/` (if any base styles exist — check first)
- Modify: `packages/ui/utils.ts` (tailwind-merge v2 → v3)
- Modify: `packages/ui/components/**` (any `tailwindcss-animate` class names)

### Step 1: Read current UI package styles

```bash
ls /Users/maksim/Documents/code/cms-kit/packages/ui/styles/
cat /Users/maksim/Documents/code/cms-kit/packages/ui/utils.ts
cat /Users/maksim/Documents/code/cms-kit/packages/ui/index.tsx
```

### Step 2: Update packages/ui/package.json

Replace:
- `"react": "^18"` → `"^19"`, `"react-dom": "^18"` → `"^19"` in devDependencies
- `"@types/react": "^18"` → `"^19"`, `"@types/react-dom": "^18"` → `"^19"` in devDependencies
- `"tailwindcss": "^3.4.3"` → `"^4.1.18"` in devDependencies
- `"tailwind-merge": "^2.3.0"` → `"^3.4.0"` in dependencies
- `"tailwindcss-animate": "^1.0.7"` → remove from dependencies
- `"typescript": "5.4.5"` → `"5.7.3"` in devDependencies
- Add `"@shared/ts-config": "workspace:*"` to devDependencies
- Add `"@shared/eslint-config": "workspace:*"` to devDependencies
- `"next": "15.5.9"` → `"15.5.9"` (keep, or align with latest)

### Step 3: Delete standalone Tailwind build files

```bash
rm /Users/maksim/Documents/code/cms-kit/packages/ui/tailwind.config.ts
rm /Users/maksim/Documents/code/cms-kit/packages/ui/postcss.config.js
```

### Step 4: Update packages/ui/tsconfig.json

Check what it extends and update to use shared ts-config:

```json
{
  "extends": "@shared/ts-config/react-library.json",
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}
```

### Step 5: Scan for tailwindcss-animate class names in components

```bash
grep -r "animate-accordion\|animate-collapsible\|animate-in\|animate-out\|fade-in\|fade-out\|zoom-in\|zoom-out\|slide-in\|slide-out" /Users/maksim/Documents/code/cms-kit/packages/ui/components/
```

`tw-animate-css` provides the same animation class names as `tailwindcss-animate`. If the consuming apps import `tw-animate-css` in their global CSS (which they will after T2b/T2c), these classes will continue to work. No component code changes needed for animation classes.

### Step 6: Check styles/ directory

```bash
cat /Users/maksim/Documents/code/cms-kit/packages/ui/styles/*.css 2>/dev/null || echo "No CSS files"
```

If styles/ contains any `@tailwind` directives, replace them with `@import "tailwindcss"`. If there are no CSS files, skip.

### Step 7: Update utils.ts for tailwind-merge v3 compatibility

Read `packages/ui/utils.ts`. In tailwind-merge v3, the API is unchanged (`cn`, `twMerge`), but if there are any `extendTailwindMerge` calls with v3-incompatible config (like `classGroups` for v3 Tailwind), update them. For most simple `cn` usage, no changes are needed.

### Step 8: Reinstall from monorepo root

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
```

Expected: React 19, TS 5.7, tailwind-merge v3 installed for packages/ui.

### Step 9: Verify package builds (type check)

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm --filter @shared/ui exec tsc --noEmit
```

Fix any TypeScript errors related to React 19 type changes. Common issue: React 19 removes `PropsWithChildren` implicit injection — children must be explicitly typed. Search for components that use `children` without declaring it in props:

```bash
grep -r "FC\b\|FunctionComponent\b\|ReactNode\b" /Users/maksim/Documents/code/cms-kit/packages/ui/components/
```

For each component that uses `React.FC` or similar without explicit children, add `children?: React.ReactNode` to the props interface if needed.

### Step 10: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add packages/ui
git commit -m "feat(ui): upgrade to React 19, Tailwind v4, TypeScript 5.7"
```

---

## Task T2b: Upgrade apps/sanity to Tailwind v4

**Prerequisite:** T1a and T1b must be complete.

**Files:**
- Delete: `apps/sanity/tailwind.config.ts`
- Modify: `apps/sanity/postcss.config.js`
- Modify: `apps/sanity/src/app/globals.css` (or equivalent global CSS file)
- Modify: `apps/sanity/package.json`

### Step 1: Find the global CSS entry point

```bash
find /Users/maksim/Documents/code/cms-kit/apps/sanity/src -name "globals.css" -o -name "global.css" -o -name "app.css" | head -5
```

Note the path — it will be modified in Step 4.

### Step 2: Update apps/sanity/package.json dependencies

Changes:
- `"tailwindcss": "3.4.3"` → `"^4.1.18"` in devDependencies
- `"autoprefixer": "10.0.1"` → remove (Tailwind v4 doesn't need autoprefixer)
- `"postcss": "8"` → keep (still needed for `@tailwindcss/postcss` plugin)
- Add `"@tailwindcss/postcss": "^4.1.18"` to devDependencies
- Update `"@shared/tailwind-config": "workspace:*"` (already there, no version change needed)

### Step 3: Update postcss.config.js

Read the current postcss config:
```bash
cat /Users/maksim/Documents/code/cms-kit/apps/sanity/postcss.config.js
```

Replace with (now delegates to shared config):
```js
module.exports = require("@shared/tailwind-config/postcss");
```

### Step 4: Delete tailwind.config.ts

```bash
rm /Users/maksim/Documents/code/cms-kit/apps/sanity/tailwind.config.ts
```

### Step 5: Update global CSS

Read the current globals.css (found in Step 1). Replace the top section from:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

To:
```css
@import "@shared/tailwind-config/base.css";
```

Then, after the import, add the app-specific theme overrides (replacing the old `tailwind.config.ts` theme extensions):

```css
@import "@shared/tailwind-config/base.css";

/* App-specific theme tokens (was in tailwind.config.ts theme.extend) */
@theme {
  --color-bgColor: var(--bg);
  --color-textColor: var(--text);
  --color-textSecondaryColor: var(--text-secondary);
  --color-primaryColor: var(--primary);
  --color-primaryLightColor: var(--primary-light);
  --spacing-sectionBase: var(--section-margin-base);
  --spacing-sectionLarge: var(--section-margin-large);
}

/* Keep the existing CSS variables and theme classes below unchanged */
:root {
  --section-margin-base: 24px;
  ...etc (existing content, unchanged)
}
```

The `--color-*` and `--spacing-*` CSS variables in `@theme {}` replace the old JavaScript config in `tailwind.config.ts`. Tailwind v4 will generate `bg-bgColor`, `text-textColor`, `m-sectionBase`, `p-sectionBase` etc. from these.

### Step 6: Reinstall and verify build

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
pnpm --filter sanity build
```

Expected: build succeeds. If there are Tailwind class errors (e.g., a custom class name from the old config that no longer resolves), they'll appear as CSS output issues. Search for any usages of the custom class names to verify they still work:

```bash
grep -r "bg-bgColor\|text-textColor\|m-sectionBase\|p-sectionBase\|m-sectionLarge\|p-sectionLarge" /Users/maksim/Documents/code/cms-kit/apps/sanity/src/
```

These should all continue to work via the `@theme {}` definitions added in Step 5.

### Step 7: Verify dev server starts

```bash
cd /Users/maksim/Documents/code/cms-kit
pnpm --filter sanity dev
```

Expected: Next.js starts, styles load correctly. Do a visual spot-check if possible.

### Step 8: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add apps/sanity
git commit -m "feat(sanity): upgrade to Tailwind CSS v4"
```

---

## Task T2c: Upgrade apps/storyblok to Tailwind v4

**Prerequisite:** T1a and T1b must be complete.

Identical process to T2b — storyblok has the same Tailwind setup as sanity.

**Files:**
- Delete: `apps/storyblok/tailwind.config.ts`
- Modify: `apps/storyblok/postcss.config.js`
- Modify: global CSS file (find with `find apps/storyblok/src -name "globals.css"`)
- Modify: `apps/storyblok/package.json`

### Step 1: Find global CSS

```bash
find /Users/maksim/Documents/code/cms-kit/apps/storyblok/src -name "globals.css" -o -name "global.css" | head -3
```

### Step 2: Update package.json

Same changes as T2b Step 2: remove `autoprefixer`, update `tailwindcss` to `^4.1.18`, add `@tailwindcss/postcss`.

### Step 3: Update postcss.config.js

Same as T2b Step 3:
```js
module.exports = require("@shared/tailwind-config/postcss");
```

### Step 4: Delete tailwind.config.ts

```bash
rm /Users/maksim/Documents/code/cms-kit/apps/storyblok/tailwind.config.ts
```

### Step 5: Update global CSS

Read the storyblok globals.css. The storyblok tailwind.config.ts has an extra color vs sanity (`primary2Color` and `primary2LightColor`). Update the global CSS:

```css
@import "@shared/tailwind-config/base.css";

@theme {
  --color-bgColor: var(--bg);
  --color-textColor: var(--text);
  --color-textSecondaryColor: var(--text-secondary);
  --color-primaryColor: var(--primary);
  --color-primaryLightColor: var(--primary-light);
  --color-primary2Color: var(--primary-2);
  --color-primary2LightColor: var(--primary-2-light);
  --spacing-sectionBase: var(--section-margin-base);
  --spacing-sectionLarge: var(--section-margin-large);
}

/* Keep existing :root, .light, .dark etc. CSS variables unchanged */
```

### Step 6: Verify build

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
pnpm --filter storyblok build
```

Expected: build succeeds.

### Step 7: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add apps/storyblok
git commit -m "feat(storyblok): upgrade to Tailwind CSS v4"
```

---

## Task T3: Integrate apps/payload with shared packages + finalize monorepo

**Prerequisite:** T2a, T2b, and T2c must all be complete.

**Goal:** Wire `apps/payload` into the shared monorepo packages (eslint, ts-config, tailwind tokens), update `turbo.json` for Payload-specific tasks, update `README.md`, and update the `pnpm gen` generators.

**Files:**
- Modify: `apps/payload/package.json`
- Modify: `apps/payload/eslint.config.mjs`
- Modify: `apps/payload/tsconfig.json`
- Modify: `apps/payload/src/app/(frontend)/[locale]/[domain]/globals.css` (or equivalent global CSS — find with grep)
- Modify: `turbo.json` (already updated in T0, verify completeness)
- Modify: `README.md`
- Possibly modify: `turbo/generators/` (if adding Payload generator option)

### Step 1: Find Payload's global CSS file

```bash
find /Users/maksim/Documents/code/cms-kit/apps/payload/src -name "*.css" | head -10
```

Note the path to the main global CSS entry point.

### Step 2: Update apps/payload/package.json — add shared package deps

Add to `devDependencies`:
```json
"@shared/eslint-config": "workspace:*",
"@shared/ts-config": "workspace:*"
```

No changes to Tailwind deps — apps/payload already has Tailwind v4. We only need to add the shared CSS tokens via CSS import (Step 5).

### Step 3: Update apps/payload/eslint.config.mjs

Read the current file:
```bash
cat /Users/maksim/Documents/code/cms-kit/apps/payload/eslint.config.mjs
```

Wrap it to extend the shared config. The Payload project has a custom ESLint setup — keep its Payload-specific rules but add the shared base. Typical pattern:

```js
import sharedConfig from "@shared/eslint-config";
import nextPlugin from "eslint-config-next";
// ... existing imports

export default [
  ...sharedConfig,
  // existing Payload-specific config objects below
  ...
];
```

Preserve all existing Payload-specific rules (Next.js, TypeScript strict settings, etc.). The shared config provides the base TypeScript rules.

### Step 4: Update apps/payload/tsconfig.json

Read the current file:
```bash
cat /Users/maksim/Documents/code/cms-kit/apps/payload/tsconfig.json
```

Change `"extends"` to use the shared config:
```json
{
  "extends": "@shared/ts-config/nextjs.json",
  "compilerOptions": {
    // keep any Payload-specific overrides here
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Remove options that are already set in `@shared/ts-config/nextjs.json` to avoid duplication. Keep anything Payload-specific (like `paths`).

### Step 5: Import shared Tailwind tokens in Payload's global CSS

Read the current global CSS file found in Step 1. Add the shared base import at the top.

apps/payload already has `@import "tailwindcss"` since it uses Tailwind v4. Replace that line (or add before it) the shared import:

```css
@import "@shared/tailwind-config/base.css";
/* NOTE: Do NOT also add @import "tailwindcss" — base.css already includes it */

/* Payload's existing CSS continues below unchanged */
```

This gives apps/payload access to shared typography plugin, primary color tokens, and font families, while keeping all Payload-specific styles.

### Step 6: Reinstall and run type check

```bash
cd /Users/maksim/Documents/code/cms-kit && pnpm install
pnpm --filter payload exec tsc --noEmit
```

Fix any TypeScript errors from the shared tsconfig changes.

### Step 7: Run Payload lint

```bash
pnpm --filter payload lint
```

Fix any ESLint errors from the shared config integration.

### Step 8: Verify Payload app builds

```bash
pnpm --filter payload build
```

Expected: build succeeds.

### Step 9: Run Payload tests (requires Postgres running)

If PostgreSQL is running locally (via docker-compose):
```bash
cd /Users/maksim/Documents/code/cms-kit/apps/payload
docker-compose up -d  # start postgres
pnpm --filter payload test:int
```

Expected: integration tests pass. E2E tests can be skipped at this stage unless full stack is running.

### Step 10: Update turbo.json — verify all Payload tasks are present

Read `turbo.json` and verify these are present (added in T0):
- `generate:types` task
- `generate:importmap` task
- All Payload env vars in `globalEnv`

Add `"generate:experiments"` task if not present:
```json
"generate:experiments": {
  "cache": false
}
```

### Step 11: Update README.md

Read the current `README.md`:
```bash
cat /Users/maksim/Documents/code/cms-kit/README.md
```

Add a Payload section following the pattern of the Sanity and Storyblok sections. Key things to include:
- Prerequisites: Docker, PostgreSQL, Payload env vars (`DATABASE_URI`, `PAYLOAD_SECRET`, `AUTH0_*` if applicable)
- Setup: `docker-compose up -d` in `apps/payload/`, copy `.env.local.example` to `.env.local`, fill in vars
- Run: `pnpm --filter payload dev` or `turbo dev --filter=payload`
- Migrations: `pnpm --filter payload payload migrate`
- Note in the "Repo structure" section: add `apps/payload: CMS app`
- Update demos list to note Payload as the third option

### Step 12: Update turbo generators (optional but recommended)

Read the generator config:
```bash
ls /Users/maksim/Documents/code/cms-kit/turbo/generators/
```

If there's a `config.ts` with CMS-specific generators (currently Storyblok and Sanity), add a Payload option. If the generator structure is complex, this can be a follow-up task.

### Step 13: Final full monorepo build

```bash
cd /Users/maksim/Documents/code/cms-kit
pnpm install
turbo build
```

Expected: all three apps build successfully. Fix any remaining issues.

### Step 14: Commit

```bash
cd /Users/maksim/Documents/code/cms-kit
git add apps/payload turbo.json README.md turbo/
git commit -m "feat: integrate apps/payload with shared monorepo packages"
```

---

## Verification Checklist

After T3 is complete, verify all success criteria:

```bash
cd /Users/maksim/Documents/code/cms-kit

# 1. All apps build
turbo build

# 2. Payload dev works
pnpm --filter payload dev   # starts on :3000

# 3. Sanity dev still works
pnpm --filter sanity dev    # starts on :3000

# 4. Storyblok dev still works
pnpm --filter storyblok dev  # starts on :4050 (its default)

# 5. Payload tests pass (needs DB)
cd apps/payload && docker-compose up -d && cd ../..
pnpm --filter payload test:int

# 6. Lint passes for all
turbo lint
```

---

## Parallel Execution Notes

For subagent-driven development, these tasks can run in parallel:

- **T1a and T1b** — fully independent, launch simultaneously after T0 commits
- **T2a, T2b, and T2c** — fully independent, launch simultaneously after T1a+T1b both commit
- **T3** — must wait for all T2 tasks to be committed before starting

Each task should be verified with its own build/type-check step before committing.
