# Shadcn Removal from Payload Frontend — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all shadcn components and CSS variables from Payload's frontend, replacing them with `@shared/ui` components and the Sanity/Storyblok-consistent CSS variable system.

**Architecture:** Each shadcn component is replaced with either a `@shared/ui` equivalent or a minimal custom implementation built with plain Tailwind + the new CSS design tokens (`--bg`, `--text`, `--primary`, etc.). `styles.css` is rewritten to match the Sanity/Storyblok `globals.css` pattern, and `src/shared/ui/shadcn/` is deleted once all consumers are updated.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, `@shared/ui` (`packages/ui`), TypeScript, Lucide icons

---

## Parallel Execution Map

Tasks T1–T8 are fully independent and can run in parallel. T9 must run after all others complete.

| Task | Touches | Deps |
|------|---------|------|
| T1 | styles.css, layouts, SiteSettings | — |
| T2 | Accordion component, FAQ block | — |
| T3 | DesktopNav | — |
| T4 | MobileNav | — |
| T5 | LocaleSelector | — |
| T6 | Pagination component | — |
| T7 | BlogPageSkeleton, SkeletonFallback | — |
| T8 | packages/ui exports, CMSLink, not-found, ThemeSelector, ErrorBoundary | — |
| T9 | shadcn dir deletion, shared/ui index, verification | T1–T8 |

---

## Chunk 1: CSS, Layout, SiteSettings, and Accordion

### Task 1: CSS, Layout, and SiteSettings

**Files:**
- Modify: `apps/payload/src/app/(frontend)/styles.css`
- Modify: `apps/payload/src/app/(frontend)/layout.tsx`
- Modify: `apps/payload/src/app/(frontend)/[locale]/[domain]/layout.tsx`
- Modify: `apps/payload/src/collections/SiteSettings/config.ts`
- Modify: `apps/payload/src/collections/SiteSettings/defaultValues.ts`

- [ ] **Step 1: Replace styles.css**

Replace the entire file with the following. Notes on intentional removals:
- The `@layer base` typography overrides (h1–h6, p, a, table, etc.) are intentionally dropped — Tailwind's preflight and the shared `base.css` handle base resets consistently across all three CMS apps, and Sanity/Storyblok do not have app-level typography overrides.
- The `html { opacity: 0 } / html[data-theme=...] { opacity: initial }` FOUC-prevention trick is intentionally removed — it existed only to prevent flash-of-unstyled-content during dynamic theme switching, which is no longer needed with a single static `.light` class.
- The `@source` path is `"../.."` (not `".."`): this file lives at `src/app/(frontend)/styles.css`, so `../..` resolves to `src/` — the correct level for scanning all blocks, collections, and features.

```css
@import '@shared/tailwind-config/base.css';

@source "../..";

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

:root {
  --section-margin-base: 24px;
  --section-margin-large: 72px;
  --section-padding-base: 16px;
  --section-padding-large: 72px;
}

.light {
  --bg: #fff;
  --text: #222222;
  --text-secondary: #666666;
  --primary: #4f46e5;
  --primary-light: #e4e1ff;
  --primary-2: #4f46e5;
  --primary-2-light: #e4e1ff;
}

@theme {
  --color-error: oklch(0.577 0.245 27.325);
  --color-success: oklch(0.6 0.15 145);
  --color-warning: oklch(0.75 0.15 85);
}

.testimonials-carousel:hover .testimonials-carousel-group {
  animation-play-state: paused;
}

.testimonials-carousel-group {
  animation: testimonials-carousel-scrolling var(--testimonials-carousel-duration, 60s) linear infinite;
}

@keyframes testimonials-carousel-scrolling {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
```

- [ ] **Step 2: Update root layout.tsx**

Replace `apps/payload/src/app/(frontend)/layout.tsx` with:

```tsx
import React from 'react'
import './styles.css'
import '@shared/ui/styles/global.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 3: Update domain layout.tsx**

Replace `apps/payload/src/app/(frontend)/[locale]/[domain]/layout.tsx` with the following. The `getSiteSettings` call is removed entirely — in the current file it is only used for `siteSettings?.theme?.config` (the inline style injection), which is being removed. The `ThemeProvider` context (via `Providers`) is kept as-is for now; it will no longer conflict because the hardcoded `className="light"` on `<html>` prevents `data-theme` attribute fighting. The `InitTheme` script is removed as it only existed to set `data-theme` before hydration.

```tsx
import React from 'react'
import { Providers } from '@/shared/context'
import { Viewport } from 'next'
import { Locale } from '@/shared/types'
import { getMessages } from 'next-intl/server'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/features'
import { GoogleAnalyticsScript } from '@/shared/lib/analytics/GoogleAnalyticsScript'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: Locale; domain: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const { isEnabled: draft } = await draftMode()
  const messages = await getMessages()

  return (
    <html lang={locale} className="light">
      <head />
      <body>
        <Providers locale={locale as Locale} messages={messages}>
          {children}
          {draft && <LivePreviewListener />}
        </Providers>
        <GoogleAnalyticsScript measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Remove Theme tab from SiteSettings config**

Read `apps/payload/src/collections/SiteSettings/config.ts`. Find the tab object that contains a field named `config` (a textarea holding CSS variables — it is the Theme tab, around lines 124–146). Remove that entire tab object from the tabs array.

- [ ] **Step 5: Remove theme from SiteSettings defaultValues**

Read `apps/payload/src/collections/SiteSettings/defaultValues.ts`. Remove the `theme` property and its large CSS string value from `SITE_SETTINGS_DEFAULT_VALUES`.

- [ ] **Step 6: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add "apps/payload/src/app/(frontend)/styles.css" \
        "apps/payload/src/app/(frontend)/layout.tsx" \
        "apps/payload/src/app/(frontend)/[locale]/[domain]/layout.tsx" \
        "apps/payload/src/collections/SiteSettings/config.ts" \
        "apps/payload/src/collections/SiteSettings/defaultValues.ts"
git commit -m "feat(payload): align CSS with sanity/storyblok, remove shadcn vars and SiteSettings theme"
```

---

### Task 2: Custom Accordion + FAQ Block

**Files:**
- Create: `apps/payload/src/shared/ui/components/Accordion/index.tsx`
- Modify: `apps/payload/src/blocks/Faq/Component.tsx`

- [ ] **Step 1: Read existing FAQ block**

Read `apps/payload/src/blocks/Faq/Component.tsx` to confirm:
- The exact shape of each FAQ item (`item.question` is expected to be a plain string; `item.answer` is expected to be a Lexical RichText node rendered via `<RichText>`)
- The name of the `RichText` import used in the file

- [ ] **Step 2: Create custom Accordion component**

```tsx
// apps/payload/src/shared/ui/components/Accordion/index.tsx
'use client'
import React, { useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

export interface AccordionItemData {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn('divide-y divide-primaryLightColor', className)}>
      {items.map((item) => (
        <div key={item.id}>
          <button
            type="button"
            className="flex w-full items-center justify-between py-4 text-left font-medium text-textColor hover:text-primaryColor transition-colors"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            aria-expanded={openId === item.id}
          >
            <span>{item.trigger}</span>
            <ChevronDownIcon
              className={cn(
                'ml-4 size-4 shrink-0 text-textSecondaryColor transition-transform duration-200',
                openId === item.id && 'rotate-180',
              )}
              aria-hidden
            />
          </button>
          {openId === item.id && (
            <div className="pb-4 text-textSecondaryColor">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Update FAQ/Component.tsx — full replacement of the Accordion JSX**

The current file uses the shadcn namespace API (`<Accordion.Root>`, `<Accordion.Item>`, `<Accordion.Trigger>`, `<Accordion.Content>`). Delete the entire Accordion JSX block (the `<div className="space-y-4"><Accordion.Root ...>...</Accordion.Root></div>` wrapper and everything inside it) and replace it in its entirety.

At the top, replace the shadcn Accordion import with the direct-path import:
```tsx
import { Accordion, AccordionItemData } from '@/shared/ui/components/Accordion'
```

Inside the component, build the items array and render the new component:
```tsx
const accordionItems: AccordionItemData[] = items.map((item, index) => ({
  id: String(index),
  trigger: item.question,
  content: <RichText content={item.answer} />,  // use whatever RichText import the file already uses
}))

return <Accordion items={accordionItems} />
```

Confirm `item.question` and `item.answer` match the actual field names from step 1.

- [ ] **Step 4: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add "apps/payload/src/shared/ui/components/Accordion/index.tsx" \
        "apps/payload/src/blocks/Faq/Component.tsx"
git commit -m "feat(payload): replace shadcn Accordion with custom component in FAQ block"
```

---

## Chunk 2: Navigation and LocaleSelector

### Task 3: Custom DesktopNav

**Files:**
- Modify: `apps/payload/src/collections/Header/Nav/DesktopNav.tsx`

- [ ] **Step 1: Read current DesktopNav**

Read `apps/payload/src/collections/Header/Nav/DesktopNav.tsx` to confirm:
- The exact type of `item.id` (likely `string | null | undefined` — use `item.id ?? null` when setting state)
- The exact type of `item.type` discriminant values (`'link'` and `'links_group'`)

- [ ] **Step 2: Rewrite without NavigationMenu**

Note: This component must be `'use client'` because it uses `useState` and `useEffect`. The current file may be a Server Component — adding `'use client'` creates a new client boundary at the nav level, which is acceptable since navigation is inherently interactive.

Replace the entire file:

```tsx
'use client'
import React, { useState, useRef, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import { LocaleSelector } from '@/features/LocaleSelector'
import { ChevronDownIcon } from 'lucide-react'

const navLinkClass =
  'px-3 py-2 text-sm font-medium text-textColor hover:text-primaryColor hover:bg-primaryLightColor rounded-md transition-colors no-underline'

export const DesktopNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav ref={navRef} aria-label="Main navigation" className="hidden md:flex gap-1 items-center">
      {navItems.map((item, index) => {
        if (item.type === 'link') {
          return (
            <CMSLink
              key={item.id ?? index}
              {...item.link}
              appearance="inline"
              className={navLinkClass}
            />
          )
        }

        if (item.type === 'links_group') {
          const isOpen = openGroup === item.id
          return (
            <div key={item.id ?? index} className="relative">
              <button
                type="button"
                className={cn(navLinkClass, 'flex items-center gap-1 cursor-pointer')}
                onClick={() => setOpenGroup(isOpen ? null : (item.id ?? null))}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {item.groupName}
                <ChevronDownIcon
                  className={cn('size-3 transition-transform duration-200', isOpen && 'rotate-180')}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <ul
                  className="absolute top-full left-0 z-50 mt-1 w-48 rounded-md border border-primaryLightColor bg-bgColor py-1 shadow-lg"
                  role="list"
                  aria-label={`${item.groupName} links`}
                >
                  {item.links?.map((link) => (
                    <li key={link.id} className="px-1">
                      <CMSLink
                        {...link.link}
                        appearance="inline"
                        className="block rounded px-3 py-2 text-sm text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors no-underline"
                        onClick={() => setOpenGroup(null)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        }

        return null
      })}
      <LocaleSelector
        render={(locale) => (
          <span className={cn(navLinkClass, 'flex items-center gap-1 cursor-pointer')}>
            {locale}
            <ChevronDownIcon className="size-3" aria-hidden />
          </span>
        )}
      />
    </nav>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "apps/payload/src/collections/Header/Nav/DesktopNav.tsx"
git commit -m "feat(payload): replace shadcn NavigationMenu with custom Tailwind nav in DesktopNav"
```

---

### Task 4: Custom MobileNav

**Files:**
- Modify: `apps/payload/src/collections/Header/Nav/MobileNav.tsx`

- [ ] **Step 1: Read current MobileNav**

Read `apps/payload/src/collections/Header/Nav/MobileNav.tsx` to confirm:
- The `render` prop shape passed to `LocaleSelector`
- Whether `CMSLink` accepts an `onClick` prop (check `apps/payload/src/shared/ui/blocks/CMSLink/index.tsx` — it does declare `onClick?: React.MouseEventHandler<HTMLElement>` in its Props type, and passes it through to the underlying `Link`)
- The exact `item.id` null-safety pattern needed for `groupId`

- [ ] **Step 2: Rewrite without Sheet**

The drawer uses CSS `translate-x` transitions so it slides in/out rather than appearing abruptly. The overlay and aside are always rendered; visibility is controlled via transform and opacity classes.

Replace the entire file:

```tsx
'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { CMSLink, Link } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
import type { Header as HeaderType } from '@/payload-types'
import { LocaleSelector } from '@/features/LocaleSelector'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [open, setOpen] = useState(false)
  const navItems = data?.navItems || []

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="flex md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-md p-2 text-textColor hover:bg-primaryLightColor transition-colors"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer — always rendered, slides in/out via transform */}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-bgColor shadow-xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-primaryLightColor px-6 py-4">
          <span className="text-xl font-semibold text-textColor">Navigation</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-md p-1 text-textSecondaryColor hover:text-textColor hover:bg-primaryLightColor transition-colors"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Main navigation">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <li key={item.id ?? index}>
                    <CMSLink
                      {...item.link}
                      appearance="inline"
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium no-underline text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <ChevronRight className="size-4 text-textSecondaryColor" aria-hidden />
                    </CMSLink>
                  </li>
                )
              }

              if (item.type === 'links_group') {
                const groupId = `nav-group-${item.id ?? index}`
                return (
                  <li key={item.id ?? index}>
                    <span
                      id={groupId}
                      className="block px-3 py-2 text-xs font-semibold tracking-wider text-textSecondaryColor"
                    >
                      {item.groupName}
                    </span>
                    <ul
                      className="flex flex-col gap-0.5 border-l-2 border-primaryColor/20 ml-3"
                      role="list"
                      aria-labelledby={groupId}
                    >
                      {item.links?.map((link, linkIndex) => (
                        <li key={link.id ?? linkIndex}>
                          <CMSLink
                            {...link.link}
                            appearance="inline"
                            className="flex items-center justify-between ml-2 rounded-lg px-3 py-2.5 text-sm no-underline text-textSecondaryColor hover:bg-primaryLightColor hover:text-textColor transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            <ChevronRight className="size-3.5 text-textSecondaryColor" aria-hidden />
                          </CMSLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              }

              return null
            })}
          </ul>
        </nav>

        <div className="border-t border-primaryLightColor px-4 py-4">
          <LocaleSelector
            render={(locale) => (
              <Link
                href="/"
                locale={locale}
                className="flex items-center justify-between ml-2 rounded-lg px-3 py-2.5 text-sm no-underline text-textSecondaryColor hover:bg-primaryLightColor hover:text-textColor transition-colors"
                onClick={() => setOpen(false)}
              >
                {locale}
                <ChevronRight className="size-3.5 text-textSecondaryColor" aria-hidden />
              </Link>
            )}
          />
        </div>
      </aside>
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "apps/payload/src/collections/Header/Nav/MobileNav.tsx"
git commit -m "feat(payload): replace shadcn Sheet with custom slide-in drawer in MobileNav"
```

---

### Task 5: Custom LocaleSelector

**Files:**
- Modify: `apps/payload/src/features/LocaleSelector/index.tsx`

- [ ] **Step 1: Read current LocaleSelector**

Read `apps/payload/src/features/LocaleSelector/index.tsx` in full. Confirm:
- How current locale is obtained (expected: `useLocale()` from `next-intl`, not `useParams()`)
- Import path for `usePathname` (expected: `@/i18n/navigation`)
- Import path for `I18N_CONFIG` (expected: `@/shared/config/i18n`)
- The shape of locale entries in `I18N_CONFIG.locales` (expected: `{ code: string, label: string }`)
- The exact `render` prop type
- Any additional guards or early returns

- [ ] **Step 2: Rewrite without DropdownMenu**

The component below uses `useLocale` from `next-intl` (matching the current implementation). If step 1 reveals different imports, adjust accordingly. Note: `'use client'` is required because `useState`, `useRef`, `useEffect`, and `useLocale` are all client-only hooks.

```tsx
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { cn } from '@/shared/lib/utils'
import { Link } from '@/shared/ui'
import { I18N_CONFIG } from '@/shared/config/i18n'

type LocaleSelectorProps = {
  render: (locale: string) => React.ReactNode
}

export const LocaleSelector = ({ render }: LocaleSelectorProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const locale = useLocale()

  // useEffect must come before any conditional return (Rules of Hooks)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLocaleConfig = I18N_CONFIG.locales.find((l) => l.code === locale)
  const currentLocaleLabel = currentLocaleConfig?.label ?? locale

  // Don't render the selector when there is only one locale
  if (I18N_CONFIG.locales.length === 1) return null

  return (
    <div ref={ref} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
        {render(currentLocaleLabel)}
      </div>
      {open && (
        <ul className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-md border border-primaryLightColor bg-bgColor py-1 shadow-lg">
          {I18N_CONFIG.locales.map((loc) => (
            <li key={loc.code}>
              <Link
                href={pathname}
                locale={loc.code}
                className={cn(
                  'block px-4 py-2 text-sm text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors no-underline',
                  loc.code === locale && 'text-textSecondaryColor pointer-events-none cursor-default',
                )}
                onClick={() => setOpen(false)}
              >
                {loc.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "apps/payload/src/features/LocaleSelector/index.tsx"
git commit -m "feat(payload): replace shadcn DropdownMenu with custom dropdown in LocaleSelector"
```

---

## Chunk 3: Pagination, Skeleton, Button Migrations, and Cleanup

### Task 6: Custom Pagination

**Files:**
- Modify: `apps/payload/src/shared/ui/components/Pagination/index.tsx`

- [ ] **Step 1: Replace with custom Tailwind implementation**

Keep the same `PaginationProps` interface — callers need no changes. Note: the outer element changes from `<div>` to `<nav>` for semantic correctness; any caller passing a `className` should be unaffected since the new component also applies it to the outer element.

```tsx
import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Link } from '@/shared/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PaginationProps {
  className?: string
  page: number
  totalPages: number
  basePath: string
}

const itemClass =
  'flex items-center justify-center h-9 min-w-[2.25rem] rounded-md px-2 text-sm font-medium text-textColor hover:bg-primaryLightColor hover:text-primaryColor transition-colors'

export const Pagination: React.FC<PaginationProps> = ({ className, page, totalPages, basePath }) => {
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const getPagePath = (pageNumber: number) =>
    pageNumber === 1 ? basePath : `${basePath}?page=${pageNumber}`

  return (
    <nav
      className={cn('my-12 flex items-center justify-center gap-1', className)}
      aria-label="Pagination navigation"
    >
      {hasPrevPage ? (
        <Link href={getPagePath(page - 1)} className={itemClass} aria-label="Go to previous page">
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')} aria-disabled="true">
          <ChevronLeft className="size-4" />
        </span>
      )}

      {hasExtraPrevPages && (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')}>…</span>
      )}

      {hasPrevPage && (
        <Link href={getPagePath(page - 1)} className={itemClass}>{page - 1}</Link>
      )}

      <span className={cn(itemClass, 'bg-primaryColor text-bgColor pointer-events-none')} aria-current="page">
        {page}
      </span>

      {hasNextPage && (
        <Link href={getPagePath(page + 1)} className={itemClass}>{page + 1}</Link>
      )}

      {hasExtraNextPages && (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')}>…</span>
      )}

      {hasNextPage ? (
        <Link href={getPagePath(page + 1)} className={itemClass} aria-label="Go to next page">
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(itemClass, 'pointer-events-none opacity-40')} aria-disabled="true">
          <ChevronRight className="size-4" />
        </span>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "apps/payload/src/shared/ui/components/Pagination/index.tsx"
git commit -m "feat(payload): replace shadcn Pagination with custom Tailwind component"
```

---

### Task 7: Skeleton Replacement

**Files:**
- Modify: `apps/payload/src/app/(frontend)/[locale]/[domain]/blog/_components/BlogPageSkeleton.tsx`
- Modify: `apps/payload/src/shared/ui/components/SkeletonFallback/index.tsx`

- [ ] **Step 1: Read both skeleton files**

Read both files to understand how many `<Skeleton />` instances are used and what dimensions are passed via className in each.

- [ ] **Step 2: Update BlogPageSkeleton.tsx**

Remove `import { Skeleton } from '@/shared/ui/shadcn'`. Replace each `<Skeleton className="..." />` with a plain div:

```tsx
// Before:
<Skeleton className="h-6 w-48" />

// After:
<div className="animate-pulse rounded-md bg-primaryLightColor h-6 w-48" />
```

Preserve all existing dimensions from the original className on each instance.

- [ ] **Step 3: Update SkeletonFallback/index.tsx**

Apply the same replacement pattern: remove the shadcn `Skeleton` import, replace each instance with an `animate-pulse` div matching the same dimensions.

- [ ] **Step 4: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add "apps/payload/src/app/(frontend)/[locale]/[domain]/blog/_components/BlogPageSkeleton.tsx" \
        "apps/payload/src/shared/ui/components/SkeletonFallback/index.tsx"
git commit -m "feat(payload): replace shadcn Skeleton with Tailwind animate-pulse divs"
```

---

### Task 8: Button Migrations

**Files:**
- Modify: `packages/ui/index.tsx`
- Modify: `apps/payload/src/shared/ui/blocks/CMSLink/index.tsx`
- Modify: `apps/payload/src/app/(frontend)/[locale]/[domain]/not-found.tsx`
- Modify: `apps/payload/src/features/ThemeSelector/index.tsx`
- Modify: `apps/payload/src/shared/ui/components/ErrorBoundary/index.tsx`

- [ ] **Step 1: Read @shared/ui Button**

Read `packages/ui/components/ui/button/index.tsx` to confirm:
- Available variants (expected: `default`, `primary`, `secondary`, `badge`, `ghost`, `ghost-dark` — note: there is no `link` variant)
- Available sizes (expected: `base`, `sm`, `lg` — note: small is `"sm"`, large is `"lg"`, not `"small"`/`"large"`)
- Whether `asChild` is supported via `@radix-ui/react-slot` (expected: yes)
- The exported `buttonVariants` CVA function

- [ ] **Step 2: Export Button from packages/ui**

Read `packages/ui/index.tsx`. If `Button` is not already exported from the root, add it:

```tsx
// Add to packages/ui/index.tsx exports:
export { Button, buttonVariants } from './components/ui/button'
```

Run TypeScript check to confirm the export works:

```bash
cd packages/ui && pnpm tsc --noEmit 2>/dev/null || true
```

- [ ] **Step 2a: Re-export Button from the Payload-local shared/ui/index.ts**

Read `apps/payload/src/shared/ui/index.ts`. Add these two exports so all existing `import { Button } from '@/shared/ui'` and `import { buttonVariants } from '@/shared/ui'` calls across CMSLink, ThemeSelector, ErrorBoundary, and any other consumers continue to resolve correctly after shadcn is deleted in Task 9:

```ts
export { Button, buttonVariants } from '@shared/ui'
```

This means individual consumer files (CMSLink, ThemeSelector, ErrorBoundary) do **not** need their import paths changed — they all use `@/shared/ui` which now proxies to `@shared/ui`.

- [ ] **Step 3: Read all four Payload files**

Read:
- `apps/payload/src/shared/ui/blocks/CMSLink/index.tsx`
- `apps/payload/src/app/(frontend)/[locale]/[domain]/not-found.tsx`
- `apps/payload/src/features/ThemeSelector/index.tsx`
- `apps/payload/src/shared/ui/components/ErrorBoundary/index.tsx`

Note current variant and size values used in each.

- [ ] **Step 4: Verify CMSLink needs no import change**

`CMSLink` imports `Button` from `@/shared/ui`. After step 2a, that resolves to the `@shared/ui` Button. The existing `<Button asChild ...><Link ...>` pattern is preserved since `@shared/ui` Button supports `asChild`. No file changes needed — just confirm TypeScript is happy.

Variant mapping for reference if any appearance values need updating:
- `'primary'` → `'primary'`, `'secondary'` → `'secondary'`, `'ghost'` → `'ghost'`
- Any appearance previously mapped to shadcn's `'default'` → use `'primary'`

- [ ] **Step 5: Update ThemeSelector**

In `apps/payload/src/features/ThemeSelector/index.tsx`:
- No import change needed (Button now proxied through `@/shared/ui`)
- `size="icon"` does not exist in `@shared/ui` Button — replace with `size="sm"` and add `className="w-9 h-9 !p-0"`. The `!p-0` uses Tailwind's important modifier to override the `p-1` that `size="sm"` applies.

- [ ] **Step 6: Update not-found.tsx**

Read the current file. The existing pattern is `<Link><Button>` nesting (Button inside Link), which is an anti-pattern. Replace with `buttonVariants` applied directly to the Link — this is simpler and works in a Server Component. The file resolves `locale` from the URL params and passes it to `<Link locale={locale}>` for locale-prefixed routing — preserve this prop:

```tsx
import { Link, buttonVariants } from '@/shared/ui'

// Replace <Link href="/" locale={locale}><Button>{t('goToHomepage')}</Button></Link> with:
<Link href="/" locale={locale} className={buttonVariants({ variant: 'primary' })}>
  {t('goToHomepage')}
</Link>
```

No import path change needed (`buttonVariants` is now available via `@/shared/ui` after step 2a).

- [ ] **Step 7: Update ErrorBoundary**

In `apps/payload/src/shared/ui/components/ErrorBoundary/index.tsx`:
- No import change needed
- Map variants:
  - `variant="default"` → `variant="primary"` (shadcn `default` = filled primary; `@shared/ui`'s own `"default"` is a bare text style — do not use it)
  - `variant="outline"` → `variant="secondary"`
  - `variant="ghost"` → `variant="ghost"` (unchanged)
- Note: `ErrorBoundary` does not use `size="icon"` — no size mapping needed here

- [ ] **Step 8: Verify TypeScript**

```bash
cd apps/payload && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 9: Commit**

```bash
git add "packages/ui/index.tsx" \
        "apps/payload/src/shared/ui/index.ts" \
        "apps/payload/src/shared/ui/blocks/CMSLink/index.tsx" \
        "apps/payload/src/app/(frontend)/[locale]/[domain]/not-found.tsx" \
        "apps/payload/src/features/ThemeSelector/index.tsx" \
        "apps/payload/src/shared/ui/components/ErrorBoundary/index.tsx"
git commit -m "feat(payload): migrate Button usages from shadcn to @shared/ui, export Button from packages/ui"
```

---

### Task 9: Delete Shadcn — Final Cleanup

**⚠️ Run only after Tasks 1–8 are all complete.**

**Files:**
- Delete: `apps/payload/src/shared/ui/shadcn/` (entire directory)
- Modify: `apps/payload/src/shared/ui/index.ts`

- [ ] **Step 1: Check for remaining shadcn component imports**

Run these greps excluding the shadcn directory itself (which is about to be deleted):

```bash
grep -r "from '@/shared/ui/shadcn'" apps/payload/src/ --include="*.ts" --include="*.tsx" --exclude-dir=shadcn
grep -rE "NavigationMenu|Sheet\b|DropdownMenu\b" apps/payload/src/ --include="*.ts" --include="*.tsx" --exclude-dir=shadcn
```

Expected: no results. Fix any remaining imports before proceeding.

- [ ] **Step 2: Confirm buttonVariants is proxied correctly**

```bash
grep -r "buttonVariants" apps/payload/src/ --include="*.ts" --include="*.tsx" --exclude-dir=shadcn
```

All results should import from `@/shared/ui` (which now re-exports from `@shared/ui` via the change in T8 Step 2a). If any file imports directly from `@/shared/ui/shadcn`, update it to `@/shared/ui`.

- [ ] **Step 3: Read and update src/shared/ui/index.ts**

Read `apps/payload/src/shared/ui/index.ts`. Remove all exports that re-export from `./shadcn` (e.g. `export * from './shadcn'`, or individual named exports like `Accordion`, `Sheet`, `NavigationMenu`, etc. that originate from the shadcn directory). The `Button` and `buttonVariants` exports added in T8 Step 2a should remain. Ensure the following are still exported:
- `CMSLink` from `./blocks/CMSLink`
- `Pagination` from `./components/Pagination`
- `ErrorBoundary` from `./components/ErrorBoundary`
- `Button`, `buttonVariants` from `@shared/ui` (added in T8 Step 2a)
- `Accordion` — remove this export (FAQ block imports directly from `@/shared/ui/components/Accordion`)
- Any other components in `./components/` that are not shadcn-based

- [ ] **Step 4: Delete the shadcn directory**

```bash
rm -rf apps/payload/src/shared/ui/shadcn
```

- [ ] **Step 5: Final TypeScript + lint check**

```bash
cd apps/payload && pnpm tsc --noEmit && pnpm lint
```

Expected: no errors or warnings about missing modules.

- [ ] **Step 6: Commit**

```bash
git add -A apps/payload/src/shared/ui/
git commit -m "feat(payload): delete shadcn directory, complete full shadcn removal"
```
