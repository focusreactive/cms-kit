# SectionContainer Redesign — Payload App

**Date:** 2026-03-18
**Status:** Approved

## Goal

Align the Payload app's `SectionContainer` with the Sanity and Storyblok implementations: data-driven, CMS-controlled spacing/theme/background per block. Delete the separate `Section` and `Container` primitives; non-block components inline their CSS directly.

## Context

The monorepo has three CMS apps. Sanity and Storyblok both have a rich `SectionContainer` where each block carries its own section styling fields (`marginTop`, `marginBottom`, `paddingX`, `paddingY`, `maxWidth`, `theme`, `backgroundImage`). Payload has a dumb `SectionContainer` (hardcoded padding) plus two low-level primitives (`Section`, `Container`) that are used both in blocks and non-block layout components (Header, Footer, PostHero, etc.).

## Decisions

- **Option A chosen:** `SectionContainer` becomes fully data-driven (requires `sectionData`). Non-block components inline their CSS classes. `Section` and `Container` are deleted.
- **No `backgroundGradient`:** Matches Sanity (Storyblok-only feature).
- **`maxWidth` values:** `"none" | "base" | "small"` matching Sanity/Storyblok (`base` = `max-w-screen-xl`, `small` = `max-w-screen-sm`, `none` = `max-w-none`).
- **`cva` for variants:** Uses class-variance-authority like Storyblok (cleaner than Sanity's inline conditionals).
- **Section fields as a Payload group:** Named `section`, collapsed by default in admin. Maps to `block.section.*` in generated types.

## Architecture

### New file: `src/fields/sectionFields.ts`

Exports a single `GroupField` to spread into every block's `fields` array.

```
section (group, initCollapsed: true)
  ├── theme        select  "light" | "dark" | "light-gray" | "dark-gray"
  ├── marginTop    select  "none" | "base" | "large"   default: "base"
  ├── marginBottom select  "none" | "base" | "large"   default: "base"
  ├── paddingX     select  "none" | "base" | "large"   default: "base"
  ├── paddingY     select  "none" | "base" | "large"   default: "base"
  ├── maxWidth     select  "none" | "base" | "small"   default: "base"
  └── backgroundImage  upload: media
```

### Updated: `src/core/ui/blocks/SectionContainer/index.tsx`

```tsx
type SectionData = {
  id?: string
  theme?: 'light' | 'dark' | 'light-gray' | 'dark-gray' | null
  marginTop?: 'none' | 'base' | 'large' | null
  marginBottom?: 'none' | 'base' | 'large' | null
  paddingX?: 'none' | 'base' | 'large' | null
  paddingY?: 'none' | 'base' | 'large' | null
  maxWidth?: 'none' | 'base' | 'small' | null
  backgroundImage?: { url: string } | null
}

type Props = {
  children: React.ReactNode
  className?: string
  sectionData: SectionData
}
```

Two `cva` variant groups:
- `outerVariants`: `marginTop`, `marginBottom`, theme class, `bg-bgColor` when theme is set
- `innerVariants`: `paddingX`, `paddingY`, `maxWidth`

Background image applied as inline `style` when present.

### Block configs — all 10 blocks

Add `sectionFields` to `fields` array. For preset-based blocks (`Hero`, `TestimonialsList`), add it to the field definitions in `heroFields.ts` / `testimonialsListFields.ts`.

Affected configs:
- `Hero/config.ts`
- `TextSection/config.ts`
- `Content/config.ts`
- `Faq/config.ts`
- `CardsGrid/config.ts`
- `Carousel/config.ts`
- `Logos/config.ts`
- `LinksList/config.ts`
- `BlogSection/config.ts`
- `TestimonialsList/config.ts`

### Block components — all 10 blocks

Destructure `section` from props, pass as `sectionData={section ?? {}}`.

### Non-block migration — inline CSS

| File | Before | After |
|------|--------|-------|
| `Header/Component.client.tsx` | `<Section as="div" block="header"><Container>` | `<div className="py-4 px-4 sm:px-6 md:px-8 lg:px-8"><div className="mx-auto max-w-7xl">` |
| `Footer/Component.tsx` | `<Section as="div"><Container>` | `<div className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"><div className="mx-auto max-w-7xl">` |
| `PostHero/index.tsx` | `<Section className="py-6 ..."><Container maxWidth="4xl">` | `<div className="py-6 px-4 sm:px-6 md:px-8 lg:px-8 w-full"><div className="mx-auto max-w-4xl z-10 relative">` |
| `PostContent/index.tsx` | `<Section className="py-4 ..."><Container maxWidth="4xl">` | `<div className="py-4 px-4 sm:px-6 md:px-8 lg:px-8"><div className="mx-auto max-w-4xl">` |
| `ErrorBoundary/index.tsx` | `<Section><Container maxWidth="4xl">` | `<div className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"><div className="mx-auto max-w-4xl">` |
| `not-found.tsx` | `<Section className="..."><Container className="...">` | `<section className="flex items-center justify-center min-h-[60vh] py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"><div className="mx-auto max-w-7xl text-center">` |
| `BlogPageContent/index.tsx` | `<Section><Container maxWidth="7xl">` | `<section className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"><div className="mx-auto max-w-7xl">` |
| `BlogPageSkeleton.tsx` | `<Section><Container maxWidth="7xl">` | `<section className="py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8"><div className="mx-auto max-w-7xl">` |

### Deleted files

- `src/core/ui/blocks/Section/index.tsx`
- `src/core/ui/blocks/Container/index.tsx`

### Updated exports

- `src/core/ui/blocks/index.ts` — remove `Section`, `Container`
- `src/core/ui/index.ts` — remove `Section`, `Container`

## Schema Workflow

After adding `sectionFields` to all block configs:

```bash
pnpm generate:types
pnpm payload migrate:create
pnpm payload migrate
```

## CSS Class Mapping

| Token | Tailwind class |
|-------|---------------|
| `marginTop: "base"` | `mt-sectionBase` |
| `marginTop: "large"` | `mt-sectionLarge` |
| `marginBottom: "base"` | `mb-sectionBase` |
| `marginBottom: "large"` | `mb-sectionLarge` |
| `paddingX: "base"` | `px-sectionBase` |
| `paddingX: "large"` | `px-sectionLarge` |
| `paddingY: "base"` | `py-sectionBase` |
| `paddingY: "large"` | `py-sectionLarge` |
| `maxWidth: "base"` | `max-w-screen-xl` |
| `maxWidth: "small"` | `max-w-screen-sm` |
| `maxWidth: "none"` | `max-w-none` |
