import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.resolve(__dirname, '../../../../.env') })

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) {
  process.stdout.write(
    JSON.stringify({
      error:
        'BLOB_READ_WRITE_TOKEN is not set. Copy it from the Vercel dashboard and add it to .env.',
    }) + '\n',
  )
  process.exit(1)
}

const { put, del } = await import('@vercel/blob')

const args = process.argv.slice(2)

if (args[0] === '--delete') {
  const pathnames = args.slice(1)

  if (pathnames.length === 0) {
    process.stdout.write(
      JSON.stringify({
        deleted: [],
        errors: [{ pathname: '', error: 'No pathnames provided for --delete' }],
      }) + '\n',
    )
    process.exit(0)
  }

  const settlements = await Promise.allSettled(
    pathnames.map((pathname) => del(pathname, { token }).then(() => pathname)),
  )

  const deleted = []
  const errors = []

  for (let i = 0; i < settlements.length; i++) {
    const s = settlements[i]

    if (s.status === 'fulfilled') {
      deleted.push(s.value)
    } else {
      errors.push({ pathname: pathnames[i], error: s.reason?.message ?? String(s.reason) })
    }
  }

  process.stdout.write(JSON.stringify({ deleted, errors }) + '\n')
  process.exit(0)
}

const filepaths = args

if (filepaths.length === 0) {
  process.stdout.write(
    JSON.stringify({
      error:
        'Missing filepath(s). Usage: node apps/payload/.claude/skills/upload-local-image/scripts/upload-to-blob.mjs <file1> [file2] ...',
    }) + '\n',
  )
  process.exit(1)
}

const settlements = await Promise.allSettled(
  filepaths.map(async (filepath) => {
    const buffer = await readFile(filepath)
    const filename = path.basename(filepath)
    const pathname = `temp/${filename}`
    const result = await put(pathname, buffer, { access: 'public', token, addRandomSuffix: false })

    return { url: result.url, pathname: result.pathname, filename }
  }),
)

const results = []
const errors = []

for (let i = 0; i < settlements.length; i++) {
  const s = settlements[i]

  if (s.status === 'fulfilled') {
    results.push(s.value)
  } else {
    errors.push({ filepath: filepaths[i], error: s.reason?.message ?? String(s.reason) })
  }
}

process.stdout.write(JSON.stringify({ results, errors }) + '\n')
process.exit(results.length === 0 ? 1 : 0)
