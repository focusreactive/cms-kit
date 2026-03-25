# Blog Enhancement Implementation Plan

> **For agentic workers:** REQUIRED: Use **agents team** (`/agents-team`) to implement this plan. Tasks are designed for parallel execution by independent agents where possible.

**Goal:** Enhance the Payload CMS blog with a cleaner post layout, excerpt field, auto-filling related posts, global blog labels in site settings, and mandatory author/category fields.

**Architecture:** Restructure the Posts collection to two tabs (Content + SEO), add an `excerpt` field, move labels to site settings, redesign the PostHero component to a clean conventional layout, and add frontend logic to auto-fill related posts (always 3, prioritize manual, backfill from same categories by publish date).

**Tech Stack:** Payload CMS 3, Next.js 15, React 19, Tailwind CSS 4, TypeScript, PostgreSQL

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `apps/payload/src/collections/Posts/index.ts` | Restructure tabs, add excerpt, make authors/categories required |
| Modify | `apps/payload/src/core/constants/defaultValues.ts` | Add excerpt + blog label defaults, remove relatedPostsIntro |
| Modify | `apps/payload/src/core/types/blog.ts` | Update CardPostData to include excerpt |
| Modify | `apps/payload/src/globals/SiteSettings/config.ts` | Replace blogTitle/blogDescription with labels group |
| Modify | `apps/payload/src/core/lib/getBlogPageSettings.ts` | Return labels instead of title/description |
| Create | `apps/payload/src/core/lib/getRelatedPosts.ts` | Auto-fill related posts logic (prioritize manual, backfill from category) |
| Modify | `apps/payload/src/core/lib/getPosts.ts` | Add `excerpt` to select clause, keep `meta` for SEO |
| Modify | `apps/payload/src/core/ui/components/PostHero/index.tsx` | Redesign to clean layout: categories -> title -> author + date -> image -> excerpt |
| Modify | `apps/payload/src/core/ui/components/Card/index.tsx` | Use excerpt instead of meta.description, add "Read More" link |
| Modify | `apps/payload/src/widgets/PostContent/index.tsx` | Use new PostHero, integrate getRelatedPosts, pass labels |
| Modify | `apps/payload/src/widgets/BlogPageContent/index.tsx` | Accept readMoreLabel, remove title dependency on blogTitle |
| Modify | `apps/payload/src/entities/RelatedPosts/index.tsx` | Accept label from props (site settings) instead of per-post field |
| Modify | `apps/payload/src/entities/BlogPostsGrid/index.tsx` | Accept and forward readMoreLabel to Card |
| Modify | `apps/payload/src/app/(frontend)/[locale]/blog/[slug]/page.tsx` | Pass site settings to PostContent for labels |
| Modify | `apps/payload/src/app/(frontend)/[locale]/blog/page.tsx` | Update generateMetadata to remove blogTitle/blogDescription refs |
| Modify | `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogPageDynamic.tsx` | Pass readMoreLabel, remove blogTitle usage |
| Modify | `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogJsonLdWrapper.tsx` | Use hardcoded 'Blog' for breadcrumb title |
| Modify | `apps/payload/src/core/seo/schemas/blogSchema.ts` | Remove blogTitle/blogDescription references |
| Modify | `apps/payload/src/blocks/BlogSection/Component.tsx` | Pass readMoreLabel to cards |

---

## Task 1: Update Default Values and Types

**Files:**
- Modify: `apps/payload/src/core/constants/defaultValues.ts`
- Modify: `apps/payload/src/core/types/blog.ts`

These are leaf dependencies — other tasks depend on these values existing.

- [ ] **Step 1: Update defaultValues.ts**

In `apps/payload/src/core/constants/defaultValues.ts`, make these changes:

1. Remove `relatedPostsIntro` from `collections.posts`
2. Add `excerpt` default to `collections.posts`
3. Add `blog.labels` defaults to `collections.siteSettings`

```typescript
// In collections.posts, replace relatedPostsIntro with excerpt:
posts: {
  title: { en: 'Title', es: 'Título' },
  excerpt: { en: 'Short description of the post', es: 'Breve descripción de la publicación' },
},

// In collections.siteSettings, add:
blog: {
  readMoreLabel: { en: 'Read More', es: 'Leer más' },
  relatedPostsLabel: { en: 'Related Articles', es: 'Artículos relacionados' },
},
```

- [ ] **Step 2: Update CardPostData type**

In `apps/payload/src/core/types/blog.ts`, replace `meta` with `excerpt`:

```typescript
import type { Post } from '@/payload-types'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'excerpt' | 'title' | 'heroImage' | 'publishedAt' | 'updatedAt' | 'authors'
>
```

- [ ] **Step 3: Commit**

```bash
git add apps/payload/src/core/constants/defaultValues.ts apps/payload/src/core/types/blog.ts
git commit -m "feat(blog): update default values and CardPostData type for blog enhancement"
```

---

## Task 2: Restructure Posts Collection

**Files:**
- Modify: `apps/payload/src/collections/Posts/index.ts`

Depends on: Task 1 (default values)

- [ ] **Step 1: Restructure the Posts collection**

Rewrite the `fields` array in `apps/payload/src/collections/Posts/index.ts`. The new structure:

**Tabs:**
1. **Content tab** — title, excerpt, heroImage, content
2. **SEO tab** — unchanged (meta fields from generateSeoFields)

**Sidebar fields (outside tabs):**
- relatedPosts (relationship to posts, hasMany, with auto-fill description)
- categories (relationship, hasMany, **required**)
- authors (relationship, hasMany, **required**)
- publishedAt (date, unchanged)
- slug (unchanged)

**Remove entirely:**
- The "Meta" tab
- The `relatedPostsIntro` field

**Key changes to existing fields:**
- `title`: move inside Content tab (remove from top-level, place as first field in Content tab)
- `categories`: add `required: true`
- `authors`: add `required: true`
- `relatedPosts`: add admin description: `{ en: 'Select up to 3 related posts. If fewer than 3 are selected, additional posts from the same categories will be shown automatically based on publish date.', es: 'Selecciona hasta 3 publicaciones relacionadas. Si se seleccionan menos de 3, se mostrarán automáticamente publicaciones adicionales de las mismas categorías según la fecha de publicación.' }`

**Update `defaultPopulate`** — replace `meta: { image: true, description: true }` with `excerpt: true`:

```typescript
defaultPopulate: {
  title: true,
  slug: true,
  categories: true,
  authors: true,
  excerpt: true,
  heroImage: true,
  publishedAt: true,
},
```

Full rewritten fields array:

```typescript
fields: [
  {
    type: 'tabs',
    tabs: [
      {
        label: {
          en: 'Content',
          es: 'Contenido',
        },
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
            label: {
              en: 'Title',
              es: 'Título',
            },
            localized: true,
            defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.posts.title),
          },
          {
            name: 'excerpt',
            type: 'textarea',
            required: true,
            label: {
              en: 'Excerpt',
              es: 'Extracto',
            },
            localized: true,
            defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.posts.excerpt),
          },
          {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: {
              en: 'Hero Image',
              es: 'Imagen de la cabecera',
            },
            defaultValue: async () => getDefaultMediaId(PLATFORM_DEFAULT_MEDIA_SLOT),
          },
          {
            name: 'content',
            type: 'richText',
            editor: generateRichText(),
            label: {
              en: 'Content',
              es: 'Contenido',
            },
            required: true,
            localized: true,
            defaultValue: createLocalizedRichText(DEFAULT_VALUES.richText.content),
          },
        ],
      },
      {
        name: 'meta',
        label: {
          en: 'SEO',
          es: 'SEO',
        },
        fields: generateSeoFields(),
        localized: true,
      },
    ],
  },
  {
    name: 'relatedPosts',
    type: 'relationship',
    admin: {
      position: 'sidebar',
      description: {
        en: 'Select up to 3 related posts. If fewer than 3 are selected, additional posts from the same categories will be shown automatically based on publish date.',
        es: 'Selecciona hasta 3 publicaciones relacionadas. Si se seleccionan menos de 3, se mostrarán automáticamente publicaciones adicionales de las mismas categorías según la fecha de publicación.',
      },
    },
    filterOptions: ({ id }) => {
      return {
        id: {
          not_in: [id],
        },
      }
    },
    hasMany: true,
    relationTo: BLOG_CONFIG.collection,
    label: {
      en: 'Related Posts',
      es: 'Publicaciones relacionadas',
    },
  },
  {
    name: 'categories',
    type: 'relationship',
    admin: {
      position: 'sidebar',
    },
    hasMany: true,
    required: true,
    relationTo: 'categories',
    label: {
      en: 'Categories',
      es: 'Categorías',
    },
  },
  {
    name: 'publishedAt',
    index: true,
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
      position: 'sidebar',
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === 'published' && !value) {
            return new Date()
          }
          return value
        },
      ],
    },
    label: {
      en: 'Published At',
      es: 'Publicado el',
    },
  },
  {
    name: 'authors',
    type: 'relationship',
    admin: {
      position: 'sidebar',
    },
    hasMany: true,
    required: true,
    relationTo: 'authors',
    label: {
      en: 'Authors',
      es: 'Autores',
    },
  },
  createSharedSlugField('posts'),
],
```

- [ ] **Step 2: Remove unused imports**

Remove the `generateRichText` import only if it was used exclusively by `relatedPostsIntro`. Check — it's used by the `content` field, so keep it. No imports to remove here.

- [ ] **Step 3: Commit**

```bash
git add apps/payload/src/collections/Posts/index.ts
git commit -m "feat(blog): restructure Posts collection - two tabs, excerpt field, required authors/categories"
```

---

## Task 3: Update Site Settings Blog Tab

**Files:**
- Modify: `apps/payload/src/globals/SiteSettings/config.ts`
- Modify: `apps/payload/src/core/lib/getBlogPageSettings.ts`

Depends on: Task 1 (default values)

- [ ] **Step 1: Update SiteSettings blog tab**

In `apps/payload/src/globals/SiteSettings/config.ts`, replace the blog tab fields. Remove `blogTitle` and `blogDescription`. Keep `blogMeta` (SEO group). Add a `labels` group.

Replace the blog tab (lines 338-378) with:

```typescript
{
  name: 'blog',
  label: {
    en: 'Blog',
    es: 'Blog',
  },
  fields: [
    {
      name: 'labels',
      type: 'group',
      label: { en: 'Labels', es: 'Etiquetas' },
      fields: [
        {
          name: 'readMoreLabel',
          type: 'text',
          label: { en: 'Read More Button Label', es: 'Etiqueta del botón Leer más' },
          localized: true,
          defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.blog.readMoreLabel),
        },
        {
          name: 'relatedPostsLabel',
          type: 'text',
          label: { en: 'Related Posts Label', es: 'Etiqueta de publicaciones relacionadas' },
          localized: true,
          defaultValue: createLocalizedDefault(DEFAULT_VALUES.collections.siteSettings.blog.relatedPostsLabel),
        },
      ],
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

- [ ] **Step 2: Update getBlogPageSettings.ts**

Rewrite `apps/payload/src/core/lib/getBlogPageSettings.ts` to return labels instead of title/description:

```typescript
import type { SiteSetting } from '@/payload-types'
import { getCachedGlobal } from './getGlobals'
import { Locale } from '@/core/types'
import { resolveLocale } from './resolveLocale'
import { draftMode } from 'next/headers'

export type BlogPageSettingsData = {
  readMoreLabel?: string | null
  relatedPostsLabel?: string | null
  blogMeta?: NonNullable<SiteSetting['blog']>['blogMeta']
}

export const getBlogPageSettings = async ({
  locale,
}: {
  locale?: Locale
}): Promise<BlogPageSettingsData> => {
  const { isEnabled: draft } = await draftMode()
  const resolvedLocale = await resolveLocale(locale)

  const settings = (await getCachedGlobal(
    'site-settings',
    1,
    resolvedLocale,
    draft,
  )()) as SiteSetting

  return {
    readMoreLabel: settings?.blog?.labels?.readMoreLabel,
    relatedPostsLabel: settings?.blog?.labels?.relatedPostsLabel,
    blogMeta: settings?.blog?.blogMeta,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/payload/src/globals/SiteSettings/config.ts apps/payload/src/core/lib/getBlogPageSettings.ts
git commit -m "feat(blog): replace blogTitle/blogDescription with labels group in site settings"
```

---

## Task 4: Create Related Posts Auto-Fill Logic

**Files:**
- Create: `apps/payload/src/core/lib/getRelatedPosts.ts`

Depends on: Task 1 (types). No other dependencies — can run in parallel with Tasks 2, 3.

- [ ] **Step 1: Create getRelatedPosts.ts**

Create `apps/payload/src/core/lib/getRelatedPosts.ts`:

```typescript
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { Locale } from '@/core/types'

const RELATED_POSTS_COUNT = 3

/**
 * Returns exactly 3 related posts for a given post.
 * Prioritizes manually selected related posts, then backfills
 * from the same categories sorted by publish date (newest first).
 * Excludes the current post from results.
 */
export async function getRelatedPosts({
  post,
  locale,
}: {
  post: Post
  locale: Locale
}): Promise<Post[]> {
  const manualPosts = (post.relatedPosts ?? []).filter(
    (p): p is Post => typeof p === 'object' && p !== null,
  )

  if (manualPosts.length >= RELATED_POSTS_COUNT) {
    return manualPosts.slice(0, RELATED_POSTS_COUNT)
  }

  const remaining = RELATED_POSTS_COUNT - manualPosts.length
  const excludeIds = [post.id, ...manualPosts.map((p) => p.id)]

  const categoryIds = (post.categories ?? []).map((cat) =>
    typeof cat === 'object' ? cat.id : cat,
  ).filter(Boolean)

  if (categoryIds.length === 0) {
    return manualPosts
  }

  const payload = await getPayload({ config: configPromise })

  const { docs: backfillPosts } = await payload.find({
    collection: BLOG_CONFIG.collection,
    where: {
      and: [
        { id: { not_in: excludeIds } },
        { categories: { in: categoryIds } },
        { _status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    limit: remaining,
    depth: 1,
    locale,
    overrideAccess: true,
  })

  return [...manualPosts, ...backfillPosts]
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/payload/src/core/lib/getRelatedPosts.ts
git commit -m "feat(blog): add getRelatedPosts with auto-fill from same categories"
```

---

## Task 5: Redesign PostHero Component

**Files:**
- Modify: `apps/payload/src/core/ui/components/PostHero/index.tsx`

Depends on: Task 2 (excerpt field exists on Post type after type generation)

- [ ] **Step 1: Rewrite PostHero**

Replace the entire content of `apps/payload/src/core/ui/components/PostHero/index.tsx` with a clean, conventional blog layout:

```tsx
import React from 'react'

import type { Post } from '@/payload-types'
import { formatAuthors } from '@/core/lib/formatAuthors'
import { formatDateTime } from '@/core/lib/formatDateTime'
import { Image } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, authors, publishedAt, title, excerpt } = post

  const hasAuthors = authors && authors.length > 0 && formatAuthors(authors) !== ''

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {categories.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                return (
                  <span
                    key={index}
                    className="text-sm font-medium text-primary uppercase tracking-wide"
                  >
                    {category.title || 'Untitled category'}
                    {index < categories.length - 1 && (
                      <span className="text-muted-foreground ml-2 mr-1">&middot;</span>
                    )}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
          {title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {hasAuthors && (
            <span className="font-medium text-foreground">{formatAuthors(authors)}</span>
          )}
          {hasAuthors && publishedAt && <span>&middot;</span>}
          {publishedAt && (
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          )}
        </div>
      </div>

      {/* Hero Image */}
      <div className="mx-auto max-w-4xl mb-8">
        {heroImage && typeof heroImage !== 'number' && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              fill
              priority
              className="object-cover"
              {...prepareImageProps({ image: heroImage })}
            />
          </div>
        )}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <div className="mx-auto max-w-3xl">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
      )}
    </div>
  )
}
```

Key design decisions:
- Categories as colored text with dot separators (not pills on dark bg)
- Title is large and bold
- Author + date inline, separated by a middot
- Hero image with 16:9 aspect ratio, rounded corners
- Excerpt in a slightly larger, muted font below the image
- max-w-3xl for text, max-w-4xl for image (image slightly wider than text)

- [ ] **Step 2: Commit**

```bash
git add apps/payload/src/core/ui/components/PostHero/index.tsx
git commit -m "feat(blog): redesign PostHero to clean conventional layout"
```

---

## Task 6: Update Card Component

**Files:**
- Modify: `apps/payload/src/core/ui/components/Card/index.tsx`

Depends on: Task 1 (CardPostData type includes excerpt)

- [ ] **Step 1: Update Card to use excerpt and add Read More**

In `apps/payload/src/core/ui/components/Card/index.tsx`:

1. Replace `meta.description` usage with `excerpt`
2. Add a "Read More" link at the bottom
3. Accept `readMoreLabel` prop

```tsx
import React, { Fragment } from 'react'
import { Link } from '@/core/ui'
import { cn } from '@/core/lib/utils'
import NextImage from 'next/image'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { CardPostData } from '@/core/types'
import { Image } from '@shared/ui'
import { prepareImageProps } from '@/lib/adapters/prepareImageProps'
import { ImageAspectRatio } from '@shared/ui/components/ui/image/types'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  basePath?: string
  showCategories?: boolean
  title?: string
  readMoreLabel?: string
}> = (props) => {
  const {
    className,
    doc,
    basePath = BLOG_CONFIG.basePath,
    showCategories,
    title: titleFromProps,
    readMoreLabel,
  } = props

  const { slug, categories, excerpt, title, heroImage } = doc || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `${basePath}/${slug}`

  return (
    <Link className="not-prose" href={href}>
      <article
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
          className,
        )}
      >
        <div className="relative w-full">
          {!heroImage && (
            <div className="relative w-full aspect-[4/3]">
              <NextImage
                src="/empty-placeholder.jpg"
                alt={`${titleToUse} - Placeholder image`}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          )}
          {heroImage && typeof heroImage !== 'number' && (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image
              fill
              priority
              className="object-cover"
              {...prepareImageProps({ image: heroImage, aspectRatio: ImageAspectRatio['4/3'] })}
            />
          )}
        </div>
        <div className="p-4">
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category

                  const categoryTitle = titleFromCategory || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <Fragment key={index}>
                      {categoryTitle}
                      {!isLast && <Fragment>, &nbsp;</Fragment>}
                    </Fragment>
                  )
                }

                return null
              })}
            </div>
          )}
          {titleToUse && (
            <div className="prose">
              <h3>{titleToUse}</h3>
            </div>
          )}
          {excerpt && (
            <div className="mt-2">
              <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
            </div>
          )}
          {readMoreLabel && (
            <div className="mt-4">
              <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                {readMoreLabel}
                <span aria-hidden="true">&rsaquo;</span>
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/payload/src/core/ui/components/Card/index.tsx
git commit -m "feat(blog): update Card to use excerpt and add Read More label"
```

---

## Task 7: Update PostContent, RelatedPosts, and Blog Post Page

**Files:**
- Modify: `apps/payload/src/widgets/PostContent/index.tsx`
- Modify: `apps/payload/src/entities/RelatedPosts/index.tsx`
- Modify: `apps/payload/src/app/(frontend)/[locale]/blog/[slug]/page.tsx`

Depends on: Tasks 2, 3, 4, 5, 6 (all schema + component changes)

- [ ] **Step 1: Update RelatedPosts component**

In `apps/payload/src/entities/RelatedPosts/index.tsx`, accept `relatedPostsLabel` and `readMoreLabel` instead of `relatedPostsIntro`:

```tsx
import React from 'react'

import type { Post } from '@/payload-types'

import { BlogPostsGrid } from '../BlogPostsGrid'
import { cn } from '@/core/lib/utils'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  relatedPostsLabel?: string | null
  readMoreLabel?: string | null
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, relatedPostsLabel, readMoreLabel } = props

  if (!docs || docs.length === 0) {
    return null
  }

  return (
    <div className={cn('w-full', className)}>
      {relatedPostsLabel && (
        <h2 className="text-2xl font-bold mb-6">{relatedPostsLabel}</h2>
      )}
      <BlogPostsGrid posts={docs} readMoreLabel={readMoreLabel} />
    </div>
  )
}
```

- [ ] **Step 2: Update BlogPostsGrid to pass readMoreLabel**

In `apps/payload/src/entities/BlogPostsGrid/index.tsx`, accept and forward `readMoreLabel`:

```tsx
import React from 'react'
import { Card, EmptyState } from '@/core/ui'
import { BLOG_CONFIG } from '@/core/config/blog'
import type { CardPostData } from '@/core/types'

export type Props = {
  posts: CardPostData[]
  readMoreLabel?: string | null
}

export const BlogPostsGrid: React.FC<Props> = (props) => {
  const { posts, readMoreLabel } = props

  if (!posts || posts.length === 0) {
    return <EmptyState title="No posts" description="" />
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
      {posts.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div className="col-span-4" key={index}>
              <Card
                className="h-full"
                doc={result}
                basePath={BLOG_CONFIG.basePath}
                showCategories
                readMoreLabel={readMoreLabel ?? undefined}
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
```

- [ ] **Step 3: Update PostContent widget**

Rewrite `apps/payload/src/widgets/PostContent/index.tsx` to use `getRelatedPosts` and accept labels:

```tsx
import { RichText, PostHero } from '@/core/ui'
import type { Post } from '@/payload-types'
import { RelatedPosts } from '@/entities'
import { getRelatedPosts } from '@/core/lib/getRelatedPosts'
import type { Locale } from '@/core/types'

type PostContentProps = {
  post: Post
  locale: Locale
  relatedPostsLabel?: string | null
  readMoreLabel?: string | null
}

export const PostContent: React.FC<PostContentProps> = async ({
  post,
  locale,
  relatedPostsLabel,
  readMoreLabel,
}) => {
  const relatedPosts = await getRelatedPosts({ post, locale })

  return (
    <article>
      <PostHero post={post} />

      <div className="py-8 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <RichText className="mx-auto" content={post.content} />
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="border-t border-border py-12 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <RelatedPosts
              docs={relatedPosts}
              relatedPostsLabel={relatedPostsLabel}
              readMoreLabel={readMoreLabel}
            />
          </div>
        </div>
      )}
    </article>
  )
}
```

Note: PostContent becomes an **async server component** because it calls `getRelatedPosts`.

- [ ] **Step 4: Update the blog post page**

In `apps/payload/src/app/(frontend)/[locale]/blog/[slug]/page.tsx`, pass labels from blog settings to PostContent:

```tsx
import type { Metadata } from 'next'

import React from 'react'

import { PayloadRedirects } from '@/features'
import { generateMeta } from '@/core/lib/generateMeta'
import { getSiteSettings } from '@/core/lib/getSiteSettings'
import { buildUrl } from '@/core/utils/path/buildUrl'
import { getPostBySlug } from '@/core/lib/getPostBySlug'
import { generateNotFoundMeta } from '@/core/lib/generateNotFoundMeta'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'
import { ArticleJsonLd, BreadcrumbsJsonLd } from '@/core/seo/components'
import { getBlogPostStaticParams } from '@/core/lib/staticParams/posts'
import { Footer, Header, PostContent } from '@/widgets'
import { Locale } from '@/core/types'
import { Footer as FooterType, Header as HeaderType } from '@/payload-types'

type Args = {
  params: Promise<{
    slug?: string
    locale: Locale
  }>
}

export default async function Page({ params }: Args) {
  const { slug = '', locale } = await params
  const decodedSlug = decodeURIComponent(slug)
  const url = buildUrl({ collection: 'posts', slug: decodedSlug, locale })

  const [post, siteSettings, blogSettings] = await Promise.all([
    getPostBySlug({ slug: decodedSlug, locale }),
    getSiteSettings({ locale }),
    getBlogPageSettings({ locale }),
  ])

  if (!post) {
    return <PayloadRedirects url={url} locale={locale} />
  }

  return (
    <>
      <Header data={siteSettings.header as HeaderType} />
      <main>
        <ArticleJsonLd post={post} siteName={siteSettings.siteName as string} locale={locale} />
        <BreadcrumbsJsonLd
          locale={locale}
          blog={{
            title: 'Blog',
            post: {
              title: post.title,
              slug: post.slug ?? decodedSlug,
            },
          }}
        />

        <PayloadRedirects disableNotFound url={url} locale={locale} />

        <PostContent
          post={post}
          locale={locale}
          relatedPostsLabel={blogSettings.relatedPostsLabel}
          readMoreLabel={blogSettings.readMoreLabel}
        />
      </main>
      <Footer data={siteSettings.footer as FooterType} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '', locale } = await params
  const decodedSlug = decodeURIComponent(slug)
  const post = await getPostBySlug({ slug: decodedSlug, locale })

  if (!post) {
    return generateNotFoundMeta({ locale })
  }

  return generateMeta({
    doc: post,
    collection: 'posts',
    locale,
  })
}

export async function generateStaticParams() {
  return getBlogPostStaticParams()
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/payload/src/entities/RelatedPosts/index.tsx apps/payload/src/entities/BlogPostsGrid/index.tsx apps/payload/src/widgets/PostContent/index.tsx apps/payload/src/app/(frontend)/[locale]/blog/[slug]/page.tsx
git commit -m "feat(blog): wire up related posts auto-fill and blog labels end-to-end"
```

---

## Task 8: Update BlogSection Block Component

**Files:**
- Modify: `apps/payload/src/blocks/BlogSection/Component.tsx`

Depends on: Tasks 3, 6 (labels from settings, Card accepts readMoreLabel)

- [ ] **Step 1: Check if BlogSection uses Card directly or via shared UI**

The current `BlogSectionBlockComponent` uses a shared `BlogSection` component from `@shared/ui` and maps posts to `IBlogPostCardProps`. This is a different card system than the `Card` component we modified.

If this block uses the shared UI `BlogSection` component (which it does), the "Read More" label needs to be passed through to that shared component. Inspect `@shared/ui/components/sections/blog/types` to understand the interface.

For now, the minimum change is to also pass `readMoreLabel` from blog settings. Update the component to fetch blog settings:

```tsx
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
import { BLOG_CONFIG } from '@/core/config/blog'
import { resolveLocale } from '@/core/lib/resolveLocale'
import { shouldIncludeLocalePrefix } from '@/core/lib/localePrefix'
import { getBlogPageSettings } from '@/core/lib/getBlogPageSettings'

export const BlogSectionBlockComponent: React.FC<BlogSectionBlock> = async ({
  text,
  style,
  aspectRatio,
  postsLimit,
}) => {
  const payload = await getPayload({ config: configPromise })
  const locale = await resolveLocale()
  const blogSettings = await getBlogPageSettings({ locale })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: postsLimit ?? 3,
    depth: 1,
    sort: '-createdAt',
    overrideAccess: true,
    locale,
  })

  const blogStyle = (style as BlogStyle) ?? BlogStyle.ThreeColumn

  const formattedPosts: IBlogPostCardProps[] = posts.map((post: Post) => {
    const heroImage = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
    const postUrl = `${shouldIncludeLocalePrefix(locale) ? `/${locale}` : ''}${BLOG_CONFIG.basePath}/${post.slug}`

    return {
      style: blogStyle,
      text: prepareRichTextProps(post.content),
      image: prepareImageProps({ image: heroImage, aspectRatio: aspectRatio ?? null }),
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

**Note:** The shared `BlogSection` component from `@shared/ui` has its own card rendering. If it doesn't support a `readMoreLabel` prop, you'll need to check `@shared/ui/components/sections/blog/` to see if it can be extended. If not feasible within this task, leave a TODO comment and skip — the "Read More" label on the blog listing page cards can be a follow-up. The critical path is the individual post page cards (covered in Task 7).

- [ ] **Step 2: Commit**

```bash
git add apps/payload/src/blocks/BlogSection/Component.tsx
git commit -m "feat(blog): update BlogSection to fetch blog settings"
```

---

## Task 9: Update Blog Listing Page and SEO Schema

**Files:**
- Modify: `apps/payload/src/core/lib/getPosts.ts`
- Modify: `apps/payload/src/app/(frontend)/[locale]/blog/page.tsx`
- Modify: `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogPageDynamic.tsx`
- Modify: `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogJsonLdWrapper.tsx`
- Modify: `apps/payload/src/core/seo/schemas/blogSchema.ts`
- Modify: `apps/payload/src/widgets/BlogPageContent/index.tsx`

Depends on: Tasks 1, 3, 6 (types, settings, Card)

These files all reference `blogTitle`, `blogDescription`, or `meta.description` from the old schema and must be updated.

- [ ] **Step 1: Update getPosts.ts — add excerpt to select**

In `apps/payload/src/core/lib/getPosts.ts`, add `excerpt: true` to the `select` clause. Keep `meta: true` because `blogSchema.ts` still uses `post.meta?.description` for SEO structured data.

```typescript
select: {
  title: true,
  slug: true,
  categories: true,
  excerpt: true,
  meta: true,
  heroImage: true,
  publishedAt: true,
  updatedAt: true,
  authors: true,
},
```

- [ ] **Step 2: Update blogSchema.ts — remove blogTitle/blogDescription refs**

In `apps/payload/src/core/seo/schemas/blogSchema.ts`:

1. Line 21: Change `settings.blogMeta?.description || settings.blogDescription || ''` to `settings.blogMeta?.description || ''`
2. Line 64: Change `name: settings.blogTitle` to `name: 'Blog'`

```typescript
// Line 21 — remove blogDescription fallback:
const description = settings.blogMeta?.description || ''

// Line 64 — hardcode blog name:
name: 'Blog',
```

- [ ] **Step 3: Update BlogJsonLdWrapper.tsx — use hardcoded 'Blog'**

In `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogJsonLdWrapper.tsx`, line 39:

Change:
```tsx
title: blogSettings.blogTitle || 'Blog',
```
To:
```tsx
title: 'Blog',
```

- [ ] **Step 4: Update BlogPageDynamic.tsx — pass readMoreLabel instead of blogTitle**

In `apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogPageDynamic.tsx`:

Replace `title={blogSettings.blogTitle}` with `readMoreLabel={blogSettings.readMoreLabel}`:

```tsx
return (
  <BlogPageContent
    posts={posts.docs}
    currentPage={posts.page}
    totalPages={posts.totalPages}
    totalDocs={posts.totalDocs}
    readMoreLabel={blogSettings.readMoreLabel}
  />
)
```

- [ ] **Step 5: Update BlogPageContent widget — accept readMoreLabel, remove title**

In `apps/payload/src/widgets/BlogPageContent/index.tsx`:

Replace the `title` prop with `readMoreLabel` and pass it to `BlogPostsGrid`. Remove the `<h1>{title}</h1>` since blogTitle no longer exists (the blog page title is managed via the Pages collection):

```tsx
import { PageRange, Pagination } from '@/core/ui'
import type { CardPostData } from '@/core/types'
import { BlogPostsGrid } from '@/entities'
import { BLOG_CONFIG } from '@/core/config/blog'

type BlogPageContentProps = {
  posts: CardPostData[]
  currentPage?: number
  totalPages?: number
  totalDocs?: number
  readMoreLabel?: string | null
}

export const BlogPageContent: React.FC<BlogPageContentProps> = ({
  posts,
  currentPage,
  totalPages,
  totalDocs,
  readMoreLabel,
}) => {
  return (
    <section className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {currentPage && totalDocs !== undefined && (
          <div className="mb-8">
            <PageRange
              collection="posts"
              currentPage={currentPage}
              limit={BLOG_CONFIG.postsPerPage}
              totalDocs={totalDocs}
            />
          </div>
        )}

        <BlogPostsGrid posts={posts} readMoreLabel={readMoreLabel} />

        {currentPage && totalPages && totalPages > 1 && (
          <Pagination basePath={BLOG_CONFIG.basePath} page={currentPage} totalPages={totalPages} />
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Update blog/page.tsx generateMetadata — remove blogTitle/blogDescription**

In `apps/payload/src/app/(frontend)/[locale]/blog/page.tsx`, update the `generateMetadata` function:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const blogSettings = await getBlogPageSettings({ locale })

  return generateMeta({
    doc: {
      title: 'Blog',
      slug: BLOG_CONFIG.slug,
      meta: {
        title: blogSettings.blogMeta?.title,
        description: blogSettings.blogMeta?.description,
        image: blogSettings.blogMeta?.image,
        robots: blogSettings.blogMeta?.robots,
      },
    },
    collection: 'posts',
    locale,
  })
}
```

- [ ] **Step 7: Commit**

```bash
git add apps/payload/src/core/lib/getPosts.ts apps/payload/src/core/seo/schemas/blogSchema.ts apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogJsonLdWrapper.tsx apps/payload/src/app/(frontend)/[locale]/blog/_components/BlogPageDynamic.tsx apps/payload/src/widgets/BlogPageContent/index.tsx apps/payload/src/app/(frontend)/[locale]/blog/page.tsx
git commit -m "feat(blog): update blog listing page and SEO schema for removed blogTitle/blogDescription"
```

---

## Task 10: Generate Types and Create Migration

**Files:**
- Regenerate: `apps/payload/src/payload-types.ts`
- Create: new migration file

Depends on: All previous tasks (Tasks 1-9). This is the final step after all schema changes are in place.

- [ ] **Step 1: Generate Payload types**

```bash
cd apps/payload && pnpm generate:types
```

Verify that `payload-types.ts` now includes:
- `excerpt` field on `Post` type
- `labels` group on `SiteSetting['blog']` with `readMoreLabel` and `relatedPostsLabel`
- No `relatedPostsIntro` on `Post`
- No `blogTitle` or `blogDescription` on `SiteSetting['blog']`

- [ ] **Step 2: Create database migration**

```bash
cd apps/payload && pnpm payload migrate:create
```

Name it something like `blog-enhancement-excerpt-labels`.

- [ ] **Step 3: Run migration**

```bash
cd apps/payload && pnpm payload migrate
```

- [ ] **Step 4: Verify build**

```bash
cd apps/payload && tsc --noEmit && pnpm lint
```

Fix any type errors that surface.

- [ ] **Step 5: Commit**

```bash
git add apps/payload/src/payload-types.ts apps/payload/src/migrations/
git commit -m "feat(blog): generate types and migration for blog enhancement"
```

---

## Task Dependency Graph

```
Task 1 (defaults + types)
├── Task 2 (Posts collection)      ─┐
├── Task 3 (Site settings)         ─┤── Task 7 (PostContent + post page wiring)
├── Task 4 (getRelatedPosts)       ─┤
├── Task 5 (PostHero redesign)     ─┤
├── Task 6 (Card component)       ─┘
├── Task 3 + Task 6               ─── Task 8 (BlogSection block)
├── Task 1 + Task 3 + Task 6      ─── Task 9 (Blog listing page + SEO schema)
└── All tasks                      ─── Task 10 (types + migration)
```

**Parallel groups for agents team:**
- **Wave 1:** Task 1
- **Wave 2:** Tasks 2, 3, 4, 5, 6 (all independent after Task 1)
- **Wave 3:** Tasks 7, 8, 9 (depend on wave 2, independent of each other)
- **Wave 4:** Task 10 (final, depends on everything)

---

## Cleanup Checklist

After all tasks are complete, verify:

- [ ] No references to `relatedPostsIntro` remain in the codebase
- [ ] No references to `blogTitle` or `blogDescription` remain (except in migration files)
- [ ] `meta.description` is no longer used for card rendering (only SEO)
- [ ] All blog post pages show exactly 3 related posts (manual + auto-fill)
- [ ] Categories and authors are required in the admin panel
- [ ] Excerpt shows on cards and between hero image and content on post pages
