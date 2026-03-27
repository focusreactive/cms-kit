# Collection Table Columns Enhancement — Design Spec

**Date:** 2026-03-25
**Branch:** feat/collection-table-columns

## Overview

Enhance the admin list views for four collections (redirects, categories, pages, posts) to surface more useful information at a glance. Pages and posts get a shared custom `UrlCell` component that renders the live frontend URL as a clickable blue link.

## Scope

| Collection | Change type | What's added |
|---|---|---|
| Redirects | `defaultColumns` update | `redirectType`, `isActive` |
| Categories | `defaultColumns` update | `slug`, `updatedAt` |
| Pages | `defaultColumns` update + custom cell | `UrlCell` on slug column |
| Posts | `defaultColumns` update + custom cell | `UrlCell` on slug; `excerpt`, `heroImage`, `categories`, `authors` |

## 1. Redirects

**File:** `apps/payload/src/plugins/index.ts`

Merge `defaultColumns` into the existing `admin` object inside the redirects plugin `overrides` (do not replace the existing `group` key):

```ts
overrides: {
  admin: {
    group: 'Settings',
    defaultColumns: ['from', 'to', 'redirectType', 'isActive'],
  },
  // ...rest of overrides unchanged
}
```

No new components. `redirectType` and `isActive` are already defined fields on the collection.

## 2. Categories

**File:** `apps/payload/src/collections/Categories.ts`

Update `admin.defaultColumns`:

```ts
admin: {
  defaultColumns: ['title', 'slug', 'updatedAt'],
}
```

## 3. Shared `UrlCell` Component

**File:** `apps/payload/src/components/admin/cells/UrlCell.tsx`

A single `'use client'` React component used on the slug field of both pages and posts.

### Props (from Payload v3 cell component API)
- `cellData` — the slug string for the current row
- `rowData` — the full document object

### Locale
- Use `useLocale()` from `@payloadcms/ui` — returns a `Locale` object
- Extract `locale.code` (a `string`) before passing to `shouldIncludeLocalePrefix`
- Import `shouldIncludeLocalePrefix` from `@/core/lib/localePrefix`

### URL construction logic

```
const { code } = useLocale()

if rowData.breadcrumbs exists and has items:
  // Page: use nested-docs generated URL
  path = breadcrumbs[last].url        // e.g. "/about/team"
  if path === '/home': path = ''
  url = shouldIncludeLocalePrefix(code) ? `/${code}${path}` : path || '/'
else:
  // Post: use blog base path
  path = `/blog/${cellData}`
  url = shouldIncludeLocalePrefix(code) ? `/${code}${path}` : path
```

This mirrors the existing logic in `plugins/index.ts` (the abTestingPlugin `generatePath` for pages).

### Rendering
```tsx
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  style={{ color: '#2563eb' }}
  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
>
  {url}
</a>
```

Using inline styles avoids needing a CSS module or Tailwind class in the admin bundle.

### Registration
After creating the file, run `pnpm generate:importmap`. Reference it in field configs via:
`'/components/admin/cells/UrlCell#UrlCell'`

## 4. Slug Field Factory — `cellComponent` option

**File:** `apps/payload/src/fields/slugField.ts`

Extend `createSharedSlugField` to accept an optional second argument so call sites can inject a custom `Cell` component onto the inner slug text input without duplicating the cross-collection uniqueness logic:

```ts
export const createSharedSlugField = (
  currentCollection: 'page' | 'posts',
  options?: { cellComponent?: string },
) => {
  // ...existing code...
  return payloadSlugField({
    useAsSlug: 'title',
    required: true,
    overrides: (field) => {
      const slugInput = field.fields?.[1] as { ... } | undefined

      if (slugInput) {
        slugInput.unique = true
        slugInput.validate = ...existing validate logic...

        if (options?.cellComponent) {
          ;(slugInput as Record<string, unknown>).admin = {
            ...(slugInput as { admin?: Record<string, unknown> }).admin,
            components: { Cell: options.cellComponent },
          }
        }
      }

      return field
    },
  })
}
```

## 5. Pages Collection

**File:** `apps/payload/src/collections/Page/Page.ts`

- `defaultColumns` stays as `['title', 'slug', 'updatedAt']` (already correct)
- Pass the `cellComponent` option when calling `createSharedSlugField`:

```ts
createSharedSlugField('page', {
  cellComponent: '/components/admin/cells/UrlCell#UrlCell',
})
```

## 6. Posts Collection

**File:** `apps/payload/src/collections/Posts/index.ts`

- Update `defaultColumns`:

```ts
admin: {
  defaultColumns: ['title', 'slug', 'excerpt', 'heroImage', 'categories', 'authors', 'updatedAt'],
}
```

Seven columns is intentionally wide; the admin table scrolls horizontally if needed.

- Pass the `cellComponent` option when calling `createSharedSlugField`:

```ts
createSharedSlugField('posts', {
  cellComponent: '/components/admin/cells/UrlCell#UrlCell',
})
```

The `heroImage` column uses Payload's built-in upload thumbnail cell. The `categories` and `authors` columns are relationship fields rendered as comma-separated labels by default.

## Component File Structure

```
apps/payload/src/
└── components/
    └── admin/
        └── cells/
            └── UrlCell.tsx        ← new shared component
```

## After Implementation

Run in order:
1. `pnpm generate:importmap` (required after adding new admin component)
2. `tsc --noEmit && pnpm lint` (validate)

## Out of Scope

- No database schema changes — no migrations needed
- No changes to the redirects `from`/`to` display
- Authors and categories collections themselves are not modified
