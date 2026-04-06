---
name: payload-block-extractor
description: >
  Use when a developer adds a new page block to this CMS and needs to wire up semantic
  search indexing for it. Triggers on: "add block to search", "index new block",
  "wire up extractor", or any mention of a new block needing search support.
---

# payload-block-extractor

Use this skill when a new block has been created at `apps/payload/src/blocks/<BlockName>/config.ts`
and needs its text extraction wired into semantic search.

Each block owns its extractor at `apps/payload/src/blocks/<BlockName>/extractText.ts`.
The orchestrator that calls all extractors is `apps/payload/src/collections/Page/extractPageText.ts`.
The two shared utilities are `extractLexicalText` and `joinText` from `@/core/utils/text`.

---

## Step 1 — Read the block config

Read `apps/payload/src/blocks/<BlockName>/config.ts`. Identify all fields and their types.

---

## Step 2 — Map fields to extractor expressions

| Field type | Expression |
|------------|------------|
| `text` / `textarea` | `block.fieldName` |
| `richText` | `extractLexicalText(block.fieldName)` |
| `array` with sub-fields | `(block.items ?? []).flatMap(item => [<recurse sub-fields>])` |
| `relationship` / `upload` / other | `// TODO: manual extraction needed for block.fieldName` |

For nested `array` fields, recurse into sub-fields using the same mapping rules.

---

## Step 3 — Create `apps/payload/src/blocks/<BlockName>/extractText.ts`

Write the extractor function in the block's own folder:

```ts
import type { <BlockName>Block } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extract<BlockName>Text(block: <BlockName>Block): string {
  return joinText([
    // mapped field expressions
  ])
}
```

Example — for a block named `Promo` with a `text` field, a `richText` body, and an `items` array each having a `label` text field:

```ts
// apps/payload/src/blocks/Promo/extractText.ts
import type { PromoBlock } from '@/payload-types'
import { extractLexicalText, joinText } from '@/core/utils/text'

export function extractPromoText(block: PromoBlock): string {
  return joinText([
    block.text,
    extractLexicalText(block.body),
    ...(block.items ?? []).flatMap((item) => [item.label]),
  ])
}
```

---

## Step 4 — Register the extractor in `extractPageText.ts`

Open `apps/payload/src/collections/Page/extractPageText.ts`.

1. Add an import for the new extractor function (keep imports sorted alphabetically by block name):

```ts
import { extract<BlockName>Text } from '@/blocks/<BlockName>/extractText'
```

2. Add a `case` to the switch inside `extractPageBlockText`:

```ts
case 'blockSlug':
  return extract<BlockName>Text(block)
```

The `blockSlug` is the `slug` property defined in the block's `config.ts`.

---

## Step 5 — Lint and type-check

```bash
cd apps/payload && npx tsc --noEmit && pnpm lint
```

Fix any errors before committing.

---

## Step 6 — Commit

```bash
git add apps/payload/src/blocks/<BlockName>/extractText.ts
git add apps/payload/src/collections/Page/extractPageText.ts
git commit -m "feat(search): add text extractor for <BlockName> block"
```

---

## Relationship fields

When a field is a `relationship` or `upload`, emit a `// TODO` rather than guessing:

```ts
// TODO: manual extraction needed for block.heroImage (relationship/upload)
```

Leave the TODO in place and note it in the PR description so a human can decide whether to populate it (e.g. by looking up the related document's title).
