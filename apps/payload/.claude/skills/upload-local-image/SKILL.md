---
name: upload-local-image
description: >
  Fallback skill for when the uploadImage MCP tool fails because it cannot read a
  local file path (e.g., Payload is hosted on Vercel and cannot access the
  developer's local filesystem). Use ONLY after receiving such an error from
  uploadImage tool from payload mcp — not proactively.
  Stages one or more files through Vercel Blob as a temporary transfer
  layer to work around the local filesystem access limitation.
---

# upload-local-image

Orchestrates uploading local files to Payload's media library by staging them through Vercel Blob.

## Flow

### Step 1 — Confirm file paths

If the user has not provided explicit local file paths, ask for them. One or more paths are accepted.

### Step 2 — Upload all to Vercel Blob

```bash
node apps/payload/.claude/skills/upload-local-image/scripts/upload-to-blob.mjs "<file1>" "<file2>" ...
```

Parse stdout JSON.

- If the top-level `error` field is present (e.g. token missing), show the setup instructions below and stop.
- If `results` is empty (all uploads failed), report each entry in `errors` and stop.
- If some uploads failed (partial success — `results` non-empty, `errors` non-empty), warn the user that those files were skipped and continue with the successful results only.
- On (partial) success, collect `url` and `pathname` from each entry in `results`.

**Token setup instructions (show only when `error` mentions `BLOB_READ_WRITE_TOKEN`):**

> Copy `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard, then add it to `.env` in the project root. Re-run the upload command.

### Step 3 — Derive alt text

For each successfully uploaded image, derive alt text from:

1. Visible content or subject matter (if the image can be inspected)
2. Surrounding conversation context
3. A short description derived from the filename (last resort — never copy the filename verbatim)

### Step 4 — Call `uploadImage`

Build one `{ source, alt }` entry per successful blob result. Call `uploadImage tool from payload mcp`:

```
images: [
  { source: "<url1>", alt: "<alt1>" },
  { source: "<url2>", alt: "<alt2>" },
  ...
]
```

- If the call **fails**: immediately run Step 5 for all `pathname` values to clean up temp blobs, then report the failure.
- If the call **succeeds**: proceed to Step 5.

### Step 5 — Delete all temp blobs

```bash
node apps/payload/.claude/skills/upload-local-image/scripts/upload-to-blob.mjs --delete "<pathname1>" "<pathname2>" ...
```

Parse `errors`. If any deletions failed, warn the user:

> Temp blob(s) at `<pathname>` were not deleted. Remove them manually from the Vercel dashboard → Storage → your blob store → Files.

This is never a hard failure — the workflow is complete regardless.

### Step 6 — Report result

For each entry in `uploaded` from the `uploadImage` response, output the Payload media `id` and `url`. Note any images listed in the `failed` array.

---

## Error Reference

| Failure                         | Behavior                                                                  |
| ------------------------------- | ------------------------------------------------------------------------- |
| `BLOB_READ_WRITE_TOKEN` missing | Script exits 1 with `error` field; show setup instructions, stop          |
| All blob uploads fail           | Script exits 1, `results` empty; report `errors`, stop                    |
| Some blob uploads fail          | Script exits 0, `results` partial; warn user, continue with successes     |
| `uploadImage` MCP fails         | Run delete step for all temp pathnames, then report failure               |
| Blob delete fails               | Warn user; blobs at listed pathnames can be removed from Vercel dashboard |
