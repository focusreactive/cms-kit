# Payload Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Four refactors: merge BlogPageSettings into SiteSettings, replace in-project plugins with npm packages, move Header/Footer to Global Components group, and align page builder blocks with shared UI components.

**Architecture:** The Payload app uses a collection-as-global pattern for settings. Plugins already have `packageName` hooks for npm switchover. New blocks follow the controller pattern (adapter + @shared/ui) matching Sanity/Storyblok.

**Tech Stack:** Payload 3, Next.js 15, `@focus-reactive/payload-plugin-presets@0.2.0`, `@focus-reactive/payload-plugin-ab@1.1.2`, `@shared/ui` (monorepo).

---

## T1 — Merge BlogPageSettings into SiteSettings

**Goal:** Remove the `blog-page-settings` collection. Add a "Blog" tab to `site-settings` with the same fields. The `getBlogPageSettings` helper reads from `site-settings` going forward.

**Migration note:** This is a schema change. You'll add columns to `site_settings`, copy data from `blog_page_settings`, then drop the old table. The migration is created at the end of T1.

---

### Task T1.1 — Add Blog tab to SiteSettings config

**File:** `apps/payload/src/collections/SiteSettings/config.ts`

In the `tabs` array (after the "404 Page" tab), add a new tab. Also rename field names with a `blog` prefix to avoid conflicts with the top-level SEO tab:

```typescript
{
  name: 'blog',
  label: {
    en: 'Blog',
    es: 'Blog',
  },
  fields: [
    {
      name: 'blogTitle',
      type: 'text',
      defaultValue: createLocalizedDefault({ en: 'Blog', es: 'Blog' }),
      localized: true,
      label: { en: 'Blog Page Title', es: 'Título de la página de blog' },
      admin: {
        description: { en: 'The main title for the blog page', es: 'El título principal para la página de blog' },
      },
    },
    {
      name: 'blogDescription',
      type: 'textarea',
      localized: true,
      label: { en: 'Blog Page Description', es: 'Descripción de la página de blog' },
      defaultValue: createLocalizedDefault({
        en: 'Blog page description',
        es: 'Descripción de la página de blog',
      }),
      admin: {
        description: { en: 'Used for meta description if not overridden', es: 'Usada para la descripción meta si no se sobreescribe' },
      },
    },
    {
      name: 'blogMeta',
      type: 'group',
      label: { en: 'Blog SEO', es: 'SEO del blog' },
      fields: generateSeoFields(),
      localized: true,
    },
  ],
},
```

Add `import { generateSeoFields } from '@/shared/lib/seoFields'` at the top if not already present.

**Step 1:** Read the file, add the Blog tab, save.

**Step 2:** Verify TypeScript compiles:
```bash
cd apps/payload && pnpm exec tsc --noEmit 2>&1 | head -30
```

---

### Task T1.2 — Update getGlobals.ts

**File:** `apps/payload/src/shared/lib/getGlobals.ts`

Remove `'blog-page-settings'` from the `GlobalCollection` type:

```typescript
// Before:
type GlobalCollection = 'site-settings' | 'blog-page-settings'

// After:
type GlobalCollection = 'site-settings'
```

Also update the depth default — blog settings depth was `1`, site-settings is `2`. No change needed (site-settings default stays `2`).

---

### Task T1.3 — Update getBlogPageSettings.ts

**File:** `apps/payload/src/shared/lib/getBlogPageSettings.ts`

Replace the implementation to read from `site-settings` and return the blog tab fields:

```typescript
import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/shared/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export type BlogPageSettingsData = {
  blogTitle?: string | null
  blogDescription?: string | null
  blogMeta?: SiteSetting['blog']['blogMeta']
}

export const getBlogPageSettings = async ({
  locale,
  domain,
}: {
  locale?: Locale
  domain: string
}): Promise<BlogPageSettingsData> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  const settings = (await getCachedGlobal(
    'site-settings',
    1,
    domain,
    resolvedLocale,
    draft,
  )()) as SiteSetting

  return {
    blogTitle: settings?.blog?.blogTitle,
    blogDescription: settings?.blog?.blogDescription,
    blogMeta: settings?.blog?.blogMeta,
  }
}
```

> **Note:** After `pnpm generate:types` runs (T1.6), the `SiteSetting['blog']` type will be available. Until then, TypeScript may complain — that's fine, fix after types are generated.

---

### Task T1.4 — Remove blog-page-settings from multiTenant and afterCreateTenant

**File 1:** `apps/payload/src/plugins/multiTenant.ts`

Remove `'blog-page-settings'` from the `collections` array.

**File 2:** `apps/payload/src/collections/Tenants/hooks/afterCreateTenant.ts`

Remove the block that creates a `blog-page-settings` document:
```typescript
// Delete these lines:
await req.payload.create({
  collection: 'blog-page-settings',
  data: { tenant: doc.id },
  req,
  overrideAccess: true,
})
```

---

### Task T1.5 — Remove BlogPageSettings from payload.config.ts

**File:** `apps/payload/src/payload.config.ts`

- Remove `import { BlogPageSettings } from '@/collections/BlogPageSettings/config'`
- Remove `BlogPageSettings` from the `collections` array

---

### Task T1.6 — Delete BlogPageSettings collection directory

```bash
rm -rf apps/payload/src/collections/BlogPageSettings
```

Then regenerate types:
```bash
cd apps/payload && pnpm generate:types && pnpm generate:importmap
```

Fix any TypeScript errors in files that previously imported `BlogPageSetting` type from `@/payload-types` — update them to use the new `BlogPageSettingsData` type from `getBlogPageSettings.ts`.

---

### Task T1.7 — Create and run migration

```bash
cd apps/payload && pnpm payload migrate:create
```

This generates a migration file. Open it and edit the `up()` to:
1. Add columns `blog_title`, `blog_description`, `blog_meta_*` to `site_settings` table
2. Copy data from `blog_page_settings` to `site_settings` (matching by tenant)
3. Drop `blog_page_settings` table

And edit `down()` to reverse: recreate `blog_page_settings`, copy back, remove blog columns from `site_settings`.

> **Tip:** Payload auto-generates most of the SQL. Review it carefully before running. The migrate:create output shows the diff.

Run the migration:
```bash
pnpm payload migrate
```

**Verify:** Start dev server, confirm Settings group shows Blog tab inside Site Settings, and `blog-page-settings` collection is gone.

**Commit:**
```bash
git add apps/payload/src/
git commit -m "feat(payload): merge BlogPageSettings into SiteSettings Blog tab"
```

---

## T2a — Replace in-project presetsPlugin with @focus-reactive/payload-plugin-presets

**Goal:** The local `src/plugins/presetsPlugin/` was built with a `packageName` option for exactly this switchover. Update 3 files, delete the directory.

The npm package already installed: `@focus-reactive/payload-plugin-presets@0.2.0`

---

### Task T2a.1 — Update presetFields.ts

**File:** `apps/payload/src/fields/presetFields.ts`

```typescript
// Before:
import { createPresetActionsField } from '@/plugins/presetsPlugin'

// After:
import { createPresetActionsField } from '@focus-reactive/payload-plugin-presets'
```

---

### Task T2a.2 — Update basePageFields.ts

**File:** `apps/payload/src/collections/Page/basePageFields.ts`

```typescript
// Before:
import { getBlocksFieldWithPresetsPath } from '@/plugins/presetsPlugin'

// After:
import { getBlocksFieldWithPresetsPath } from '@focus-reactive/payload-plugin-presets'
```

---

### Task T2a.3 — Update plugins/index.ts presetsPlugin config

**File:** `apps/payload/src/plugins/index.ts`

Change the import:
```typescript
// Before:
import { presetsPlugin } from './presetsPlugin'

// After:
import { presetsPlugin } from '@focus-reactive/payload-plugin-presets'
```

Add `packageName` to the presetsPlugin call:
```typescript
presetsPlugin({
  packageName: '@focus-reactive/payload-plugin-presets',  // ← add this line
  labels: { ... },
  presetTypes: [...],
  overrides: { ... },
}),
```

---

### Task T2a.4 — Delete the local presetsPlugin directory

```bash
rm -rf apps/payload/src/plugins/presetsPlugin
```

Regenerate import map:
```bash
cd apps/payload && pnpm generate:importmap
```

**Verify:** TypeScript compiles, dev server starts, admin panel presets work.

**Commit:**
```bash
git add apps/payload/src/ apps/payload/package.json
git commit -m "feat(payload): replace in-project presetsPlugin with @focus-reactive/payload-plugin-presets"
```

---

## T2b — Replace @kiryl.pekarski/payload-plugin-ab with @focus-reactive/payload-plugin-ab

**Goal:** Same package, different maintainer name. Export paths are identical. Replace all 6 import sites.

The npm package already installed: `@focus-reactive/payload-plugin-ab@1.1.2`

---

### Task T2b.1 — Update all import sites

Run global search for `@kiryl.pekarski/payload-plugin-ab` — there are 6 files:

**1. `src/plugins/index.ts`**
```typescript
// Before:
import { abTestingPlugin } from '@kiryl.pekarski/payload-plugin-ab'
// After:
import { abTestingPlugin } from '@focus-reactive/payload-plugin-ab'
```

**2. `src/shared/lib/abTesting/abAdapter.ts`**
```typescript
// Before:
import { vercelEdgeAdapter } from '@kiryl.pekarski/payload-plugin-ab/adapters/vercel-edge'
// After:
import { vercelEdgeAdapter } from '@focus-reactive/payload-plugin-ab/adapters/vercel-edge'
```

**3. `src/shared/lib/abTesting/abCookies.ts`**
```typescript
// Before:
import { AbCookieConfig } from '@kiryl.pekarski/payload-plugin-ab'
// After:
import { AbCookieConfig } from '@focus-reactive/payload-plugin-ab'
```

**4. `src/shared/lib/abTesting/analyticsAdapter.ts`**
```typescript
// Before:
import { googleAnalyticsAdapter } from '@kiryl.pekarski/payload-plugin-ab/analytics/adapters/google-analytics'
// After:
import { googleAnalyticsAdapter } from '@focus-reactive/payload-plugin-ab/analytics/adapters/google-analytics'
```

**5. `src/middleware.ts`**
```typescript
// Before:
import { createResolveAbRewrite } from '@kiryl.pekarski/payload-plugin-ab/middleware'
// After:
import { createResolveAbRewrite } from '@focus-reactive/payload-plugin-ab/middleware'
```

**6. `src/shared/context/Providers.tsx`**
```typescript
// Before:
import { ABAnalyticsProvider } from '@kiryl.pekarski/payload-plugin-ab/analytics/client'
// After:
import { ABAnalyticsProvider } from '@focus-reactive/payload-plugin-ab/analytics/client'
```

**7. `src/app/(frontend)/[locale]/[domain]/variants/[bucketID]/[...slug]/page.tsx`**
```typescript
// Before:
import { ExperimentTracker } from '@kiryl.pekarski/payload-plugin-ab/analytics/client'
import { resolveAbCookieNames } from '@kiryl.pekarski/payload-plugin-ab/analytics'
// After:
import { ExperimentTracker } from '@focus-reactive/payload-plugin-ab/analytics/client'
import { resolveAbCookieNames } from '@focus-reactive/payload-plugin-ab/analytics'
```

---

### Task T2b.2 — Remove old package

```bash
cd apps/payload && pnpm remove @kiryl.pekarski/payload-plugin-ab
```

**Verify:** `pnpm exec tsc --noEmit` passes, dev server starts, A/B variant pages load.

**Commit:**
```bash
git add apps/payload/src/ apps/payload/package.json pnpm-lock.yaml
git commit -m "feat(payload): replace @kiryl.pekarski/payload-plugin-ab with @focus-reactive/payload-plugin-ab"
```

---

## T3 — Move Header and Footer to Global Components group

**Goal:** Change `admin.group` in Header and Footer config from `'Settings'` to `'Global Components'`.

---

### Task T3.1 — Update Header config

**File:** `apps/payload/src/collections/Header/config.ts`

```typescript
admin: {
  group: 'Global Components',  // was 'Settings'
  useAsTitle: 'name',
  ...
}
```

---

### Task T3.2 — Update Footer config

**File:** `apps/payload/src/collections/Footer/config.ts`

```typescript
admin: {
  group: 'Global Components',  // was 'Settings'
  useAsTitle: 'name',
  ...
}
```

**Commit:**
```bash
git add apps/payload/src/collections/Header/config.ts apps/payload/src/collections/Footer/config.ts
git commit -m "feat(payload): move Header and Footer to Global Components admin group"
```

---

## T4 — Align page builder blocks with @shared/ui

**Goal:** Create Payload adapter functions (like Sanity/Storyblok have), update Hero and TextSection blocks to use `@shared/ui` components, and add 5 new blocks: CardsGrid, Carousel, Logos, LinksList, BlogSection.

**Pattern to follow:** Same controller pattern as `apps/sanity/src/contentSections/` — block Component receives Payload data, uses adapters to transform it to UI props, renders `@shared/ui` component.

Key imports:
- Shared UI components: `import { Hero, Copy, CardsGrid, Carousel, Logos, LinksList, BlogSection } from '@shared/ui'`
- Payload's own `@/shared/ui` (Section, Container, RichText, Media) is separate and stays for internal Payload layouts

---

### Task T4.1 — Create adapter functions

**Create directory:** `apps/payload/src/lib/adapters/`

**File 1:** `apps/payload/src/lib/adapters/prepareImageProps.ts`

```typescript
import type { Media } from '@/payload-types'
import { ImageAspectRatio, type IImageProps } from '@shared/ui/components/ui/image/types'

export function prepareImageProps(
  media: Media | number | null | undefined,
  aspectRatio: ImageAspectRatio = ImageAspectRatio['16/9'],
): IImageProps {
  if (!media || typeof media !== 'object') {
    return {
      src: '',
      alt: '',
      aspectRatio,
      fill: true,
      fit: 'cover',
    }
  }

  return {
    src: media.url ?? '',
    alt: media.alt ?? '',
    aspectRatio,
    fill: true,
    fit: 'cover',
    sizes: '(max-width: 1280px) 100vw, 1280px',
  }
}
```

**File 2:** `apps/payload/src/lib/adapters/prepareLinkProps.ts`

```typescript
import type { LinkProps } from '@shared/ui/components/ui/link/types'

type PayloadLink = {
  type?: 'reference' | 'custom' | null
  url?: string | null
  reference?: {
    relationTo: string
    value: unknown
  } | null
  label?: string | null
  appearance?: string | null
  newTab?: boolean | null
}

export function prepareLinkProps(link: PayloadLink | null | undefined): LinkProps {
  if (!link) return { text: '', href: '' }

  let href = ''

  if (link.type === 'custom' && link.url) {
    href = link.url
  } else if (link.type === 'reference' && link.reference) {
    const value = link.reference.value as Record<string, unknown>
    if (typeof value === 'object' && value !== null) {
      const breadcrumbs = (value.breadcrumbs as Array<{ url?: string }>) ?? []
      href = breadcrumbs[breadcrumbs.length - 1]?.url ?? (value.slug as string) ?? ''
    }
  }

  return {
    text: link.label ?? '',
    href,
    variant: (link.appearance as 'default' | 'outline') ?? 'default',
  }
}
```

**File 3:** `apps/payload/src/lib/adapters/prepareRichTextProps.tsx`

```typescript
import React from 'react'
import type { SerializedEditorState } from 'lexical'
import { AlignVariant, type IRichTextProps } from '@shared/ui/components/ui/richText/types'
import { RichText } from '@/shared/ui'

export function prepareRichTextProps(
  content: SerializedEditorState | null | undefined,
  align: AlignVariant = AlignVariant.Left,
  removeInnerMargins = false,
): IRichTextProps {
  return {
    richText: content ? <RichText content={content} /> : null,
    alignVariant: align,
    removeInnerMargins,
  }
}
```

**Verify:** TypeScript compiles — `pnpm exec tsc --noEmit 2>&1 | head -20`.

---

### Task T4.2 — Add title field to heroFields and update Hero Component

**Background:** `IHeroProps` from `@shared/ui` requires `title: string`. The current heroFields only have `richText` (used as body). Add a `title` text field so the Hero block matches the shared UI interface.

**File 1:** `apps/payload/src/fields/heroFields.ts`

Add `title` as the first field in the `heroFields` array:

```typescript
{
  name: 'title',
  type: 'text',
  label: { en: 'Title', es: 'Título' },
  localized: true,
  defaultValue: createLocalizedDefault(DEFAULT_VALUES.blocks.hero.title ?? { en: 'Hero Title', es: 'Título Hero' }),
},
```

> **Note:** If `DEFAULT_VALUES.blocks.hero.title` doesn't exist, use `{ en: 'Hero Title', es: 'Título Hero' }` as the fallback.

**File 2:** `apps/payload/src/blocks/Hero/Component.tsx`

Replace the entire implementation to use `@shared/ui` Hero:

```typescript
import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { Hero } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

type Props = HeroBlock

export const HeroBlockComponent: React.FC<Props> = ({ title, richText, actions, media }) => {
  return (
    <Hero
      title={title ?? ''}
      text={prepareRichTextProps(richText)}
      image={prepareImageProps(typeof media === 'object' ? media : null)}
      links={(actions ?? []).map((action) => prepareLinkProps(action))}
    />
  )
}
```

> The `overlay` fields are Payload-specific. The shared UI Hero doesn't support them. They remain in the schema for future use.

---

### Task T4.3 — Update TextSection Component to use @shared/ui Copy

**File:** `apps/payload/src/blocks/TextSection/Component.tsx`

```typescript
import React from 'react'
import type { TextSectionBlock as TextSectionBlockProps } from '@/payload-types'
import { Copy } from '@shared/ui'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

export const TextSectionBlockComponent: React.FC<TextSectionBlockProps> = ({ text }) => {
  return (
    <Copy
      columns={[prepareRichTextProps(text)]}
      isReversedOnMobile={false}
    />
  )
}
```

---

### Task T4.4 — Create CardsGrid block

**File 1:** `apps/payload/src/blocks/CardsGrid/config.ts`

```typescript
import type { Block } from 'payload'
import { link } from '@/fields/link'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'

export const CardsGridBlock: Block = {
  slug: 'cardsGrid',
  interfaceName: 'CardsGridBlock',
  ...getBlockPreviewImage('Cards Grid'),
  labels: {
    singular: { en: 'Cards Grid', es: 'Cuadrícula de Tarjetas' },
    plural: { en: 'Cards Grids', es: 'Cuadrículas de Tarjetas' },
  },
  fields: [
    {
      name: 'columns',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      label: { en: 'Columns', es: 'Columnas' },
    },
    {
      name: 'items',
      type: 'array',
      label: { en: 'Cards', es: 'Tarjetas' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: { en: 'Title', es: 'Título' },
        },
        {
          name: 'description',
          type: 'text',
          label: { en: 'Description', es: 'Descripción' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Image', es: 'Imagen' },
        },
        link(),
        {
          name: 'alignVariant',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: { en: 'Left', es: 'Izquierda' }, value: 'left' },
            { label: { en: 'Center', es: 'Centro' }, value: 'center' },
            { label: { en: 'Right', es: 'Derecha' }, value: 'right' },
          ],
          label: { en: 'Alignment', es: 'Alineación' },
        },
        {
          name: 'rounded',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
            { label: { en: 'Large', es: 'Grande' }, value: 'large' },
          ],
          label: { en: 'Rounded', es: 'Bordes redondeados' },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: { en: 'None', es: 'Ninguno' }, value: 'none' },
            { label: { en: 'Light', es: 'Claro' }, value: 'light' },
            { label: { en: 'Dark', es: 'Oscuro' }, value: 'dark' },
            { label: { en: 'Light Gray', es: 'Gris claro' }, value: 'light-gray' },
            { label: { en: 'Dark Gray', es: 'Gris oscuro' }, value: 'dark-gray' },
            { label: { en: 'Gradient 2', es: 'Gradiente 2' }, value: 'gradient-2' },
          ],
          label: { en: 'Background Color', es: 'Color de fondo' },
        },
      ],
    },
  ],
}
```

**File 2:** `apps/payload/src/blocks/CardsGrid/Component.tsx`

```typescript
import React from 'react'
import type { CardsGridBlock } from '@/payload-types'
import { CardsGrid } from '@shared/ui'
import type { IDefaultCardProps } from '@shared/ui/components/sections/cardsGrid/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const CardsGridBlockComponent: React.FC<CardsGridBlock> = ({ items, columns }) => {
  const cards: IDefaultCardProps[] = (items ?? []).map((item) => ({
    title: item.title,
    description: item.description ?? undefined,
    image: prepareImageProps(typeof item.image === 'object' ? item.image : null),
    link: prepareLinkProps(item.link),
    alignVariant: (item.alignVariant as IDefaultCardProps['alignVariant']) ?? 'center',
    rounded: (item.rounded as IDefaultCardProps['rounded']) ?? 'none',
    backgroundColor: (item.backgroundColor as IDefaultCardProps['backgroundColor']) ?? 'none',
  }))

  return <CardsGrid items={cards} columns={columns ?? 3} />
}
```

---

### Task T4.5 — Create Carousel block

**File 1:** `apps/payload/src/blocks/Carousel/config.ts`

```typescript
import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { generateRichText } from '@/shared/lib/generateRichText'

export const CarouselBlock: Block = {
  slug: 'carousel',
  interfaceName: 'CarouselBlock',
  ...getBlockPreviewImage('Carousel'),
  labels: {
    singular: { en: 'Carousel', es: 'Carrusel' },
    plural: { en: 'Carousels', es: 'Carruseles' },
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: generateRichText(),
      label: { en: 'Intro Text', es: 'Texto introductorio' },
      localized: true,
    },
    {
      name: 'effect',
      type: 'select',
      defaultValue: 'slide',
      options: [
        { label: 'Slide', value: 'slide' },
        { label: 'Fade', value: 'fade' },
        { label: 'Cube', value: 'cube' },
        { label: 'Flip', value: 'flip' },
        { label: 'Coverflow', value: 'coverflow' },
        { label: 'Cards', value: 'cards' },
      ],
      label: { en: 'Effect', es: 'Efecto' },
    },
    {
      name: 'slides',
      type: 'array',
      label: { en: 'Slides', es: 'Diapositivas' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Image', es: 'Imagen' },
        },
        {
          name: 'text',
          type: 'richText',
          editor: generateRichText(),
          label: { en: 'Slide Text', es: 'Texto de la diapositiva' },
        },
      ],
    },
  ],
}
```

**File 2:** `apps/payload/src/blocks/Carousel/Component.tsx`

```typescript
import React from 'react'
import type { CarouselBlock } from '@/payload-types'
import { Carousel } from '@shared/ui'
import type { ICarouselCardProps } from '@shared/ui/components/sections/carousel/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'

export const CarouselBlockComponent: React.FC<CarouselBlock> = ({ text, effect, slides }) => {
  const cards: ICarouselCardProps[] = (slides ?? []).map((slide) => ({
    image: prepareImageProps(typeof slide.image === 'object' ? slide.image : null),
    text: slide.text ? prepareRichTextProps(slide.text) : undefined,
    effect: (effect as ICarouselCardProps['effect']) ?? 'slide',
  }))

  return (
    <Carousel
      text={text ? prepareRichTextProps(text) : undefined}
      slides={cards}
      effect={(effect as ICarouselCardProps['effect']) ?? 'slide'}
    />
  )
}
```

---

### Task T4.6 — Create Logos block

**File 1:** `apps/payload/src/blocks/Logos/config.ts`

```typescript
import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { link } from '@/fields/link'

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  ...getBlockPreviewImage('Logos'),
  labels: {
    singular: { en: 'Logos', es: 'Logos' },
    plural: { en: 'Logos', es: 'Logos' },
  },
  fields: [
    {
      name: 'alignVariant',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: { en: 'Left', es: 'Izquierda' }, value: 'left' },
        { label: { en: 'Center', es: 'Centro' }, value: 'center' },
        { label: { en: 'Right', es: 'Derecha' }, value: 'right' },
      ],
      label: { en: 'Alignment', es: 'Alineación' },
    },
    {
      name: 'items',
      type: 'array',
      label: { en: 'Logo Items', es: 'Logos' },
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { en: 'Logo Image', es: 'Imagen del logo' },
        },
        link({ appearances: false }),
      ],
    },
  ],
}
```

**File 2:** `apps/payload/src/blocks/Logos/Component.tsx`

```typescript
import React from 'react'
import type { LogosBlock } from '@/payload-types'
import { Logos } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/logos/types'
import type { ILogoItem } from '@shared/ui/components/sections/logos/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LogosBlockComponent: React.FC<LogosBlock> = ({ items, alignVariant }) => {
  const logoItems: ILogoItem[] = (items ?? []).map((item) => ({
    image: prepareImageProps(typeof item.image === 'object' ? item.image : null),
    link: item.link ? prepareLinkProps(item.link) : undefined,
  }))

  return (
    <Logos
      items={logoItems}
      alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Center}
    />
  )
}
```

---

### Task T4.7 — Create LinksList block

**File 1:** `apps/payload/src/blocks/LinksList/config.ts`

```typescript
import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { link } from '@/fields/link'

export const LinksListBlock: Block = {
  slug: 'linksList',
  interfaceName: 'LinksListBlock',
  ...getBlockPreviewImage('Links List'),
  labels: {
    singular: { en: 'Links List', es: 'Lista de enlaces' },
    plural: { en: 'Links Lists', es: 'Listas de enlaces' },
  },
  fields: [
    {
      name: 'alignVariant',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: { en: 'Left', es: 'Izquierda' }, value: 'left' },
        { label: { en: 'Center', es: 'Centro' }, value: 'center' },
        { label: { en: 'Right', es: 'Derecha' }, value: 'right' },
      ],
      label: { en: 'Alignment', es: 'Alineación' },
    },
    {
      name: 'links',
      type: 'array',
      label: { en: 'Links', es: 'Enlaces' },
      minRows: 1,
      required: true,
      localized: true,
      fields: [link()],
    },
  ],
}
```

**File 2:** `apps/payload/src/blocks/LinksList/Component.tsx`

```typescript
import React from 'react'
import type { LinksListBlock } from '@/payload-types'
import { LinksList } from '@shared/ui'
import { AlignVariant } from '@shared/ui/components/sections/linksList/types'
import { prepareLinkProps } from '@/lib/adapters/prepareLinkProps'

export const LinksListBlockComponent: React.FC<LinksListBlock> = ({ links, alignVariant }) => {
  return (
    <LinksList
      links={(links ?? []).map((item) => prepareLinkProps(item.link))}
      alignVariant={(alignVariant as AlignVariant) ?? AlignVariant.Left}
    />
  )
}
```

---

### Task T4.8 — Create BlogSection block

This block renders a preview of recent blog posts using `@shared/ui` BlogSection. The component is async (Server Component) to fetch posts.

**File 1:** `apps/payload/src/blocks/BlogSection/config.ts`

```typescript
import type { Block } from 'payload'
import { getBlockPreviewImage } from '@/shared/lib/blockPreviewImage'
import { generateRichText } from '@/shared/lib/generateRichText'

export const BlogSectionBlock: Block = {
  slug: 'blogSection',
  interfaceName: 'BlogSectionBlock',
  ...getBlockPreviewImage('Blog Section'),
  labels: {
    singular: { en: 'Blog Section', es: 'Sección de Blog' },
    plural: { en: 'Blog Sections', es: 'Secciones de Blog' },
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: generateRichText(),
      label: { en: 'Intro Text', es: 'Texto introductorio' },
      localized: true,
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'three-column',
      options: [
        { label: { en: 'Three Column', es: 'Tres columnas' }, value: 'three-column' },
        { label: { en: 'Three Column with Images', es: 'Tres columnas con imágenes' }, value: 'three-column-with-images' },
        { label: { en: 'Three Column with Background Images', es: 'Tres columnas con imágenes de fondo' }, value: 'three-column-with-background-images' },
      ],
      label: { en: 'Style', es: 'Estilo' },
    },
    {
      name: 'postsLimit',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 12,
      label: { en: 'Number of Posts', es: 'Número de publicaciones' },
    },
  ],
}
```

**File 2:** `apps/payload/src/blocks/BlogSection/Component.tsx`

```typescript
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { BlogSectionBlock } from '@/payload-types'
import type { Post, Media } from '@/payload-types'
import { BlogSection } from '@shared/ui'
import type { IBlogPostCardProps } from '@shared/ui/components/sections/blog/types'
import { BlogStyle } from '@shared/ui/components/sections/blog/types'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { prepareRichTextProps } from '@/lib/adapters/prepareRichTextProps'
import { buildUrl } from '@/shared/lib/buildUrl'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async ({
  text,
  style,
  postsLimit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: postsLimit ?? 3,
    depth: 1,
    sort: '-createdAt',
    overrideAccess: true,
  })

  const blogStyle = (style as BlogStyle) ?? BlogStyle.ThreeColumn

  const formattedPosts: IBlogPostCardProps[] = posts.map((post: Post) => {
    const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
    const postUrl = buildUrl({ collection: 'posts', breadcrumbs: undefined, absolute: false, slug: post.slug })

    return {
      style: blogStyle,
      text: prepareRichTextProps(post.meta?.description ? null : null), // use title as richText
      image: prepareImageProps(heroImage),
      link: { text: post.title, href: postUrl },
    }
  })

  return (
    <BlogSection
      text={text ? prepareRichTextProps(text) : prepareRichTextProps(null)}
      posts={formattedPosts}
      style={blogStyle}
    />
  )
}
```

> **Note:** The `text` mapping for blog post cards (title/excerpt) may need adjusting once you see how `Post` type looks after `pnpm generate:types`. Update to use the appropriate post fields (title, meta.description, etc.).

---

### Task T4.9 — Register new blocks

**File 1:** `apps/payload/src/collections/Page/basePageFields.ts`

Add imports for all new blocks:
```typescript
import { CardsGridBlock } from '@/blocks/CardsGrid/config'
import { CarouselBlock } from '@/blocks/Carousel/config'
import { LogosBlock } from '@/blocks/Logos/config'
import { LinksListBlock } from '@/blocks/LinksList/config'
import { BlogSectionBlock } from '@/blocks/BlogSection/config'
```

Update the blocks array:
```typescript
blocks: [
  HeroBlock,
  TextSectionBlock,
  ContentBlock,
  FaqBlock,
  TestimonialsListBlock,
  CardsGridBlock,
  CarouselBlock,
  LogosBlock,
  LinksListBlock,
  BlogSectionBlock,
],
```

Update the `defaultValue` to include new block slugs if desired (optional — just add their slugs to the array).

**File 2:** `apps/payload/src/blocks/RenderBlocks.tsx`

Add imports and entries:
```typescript
import { CardsGridBlockComponent } from './CardsGrid/Component'
import { CarouselBlockComponent } from './Carousel/Component'
import { LogosBlockComponent } from './Logos/Component'
import { LinksListBlockComponent } from './LinksList/Component'
import { BlogSectionBlockComponent } from './BlogSection/Component'

const blockComponents = {
  hero: HeroBlockComponent,
  textSection: TextSectionBlockComponent,
  faq: FaqBlockComponent,
  content: ContentBlockComponent,
  testimonialsList: TestimonialsListBlockComponent,
  cardsGrid: CardsGridBlockComponent,
  carousel: CarouselBlockComponent,
  logos: LogosBlockComponent,
  linksList: LinksListBlockComponent,
  blogSection: BlogSectionBlockComponent,
}
```

---

### Task T4.10 — Generate types and create migration

```bash
cd apps/payload && pnpm generate:types && pnpm generate:importmap
```

Fix any TypeScript errors (especially in BlogSection Component — adjust post field names to match generated types).

Verify compile:
```bash
pnpm exec tsc --noEmit 2>&1 | head -30
```

Create migration (for new hero `title` field + all new block tables):
```bash
pnpm payload migrate:create
```

Run migration:
```bash
pnpm payload migrate
```

**Final verify:** Start dev server, open admin panel, confirm all new blocks appear in the page builder, Hero and TextSection render via @shared/ui.

**Commit:**
```bash
git add apps/payload/src/
git commit -m "feat(payload): add shared UI adapters and align page builder blocks with @shared/ui"
```

---

## Summary of Changes

| Task | Files changed | Migration needed |
|------|--------------|-----------------|
| T1 — BlogPageSettings → SiteSettings tab | 7 files, 1 dir deleted | Yes |
| T2a — presetsPlugin → npm | 3 files, 1 dir deleted | No |
| T2b — @kiryl → @focus-reactive AB | 7 files | No |
| T3 — Header/Footer group | 2 files | No |
| T4 — Shared UI blocks | 15+ new/modified files | Yes (hero title + 5 new block tables) |
