# Ideal CMS — Open-Source Payload CMS Starter with Next.js 15

Production-ready, open-source headless CMS built on [Payload CMS 3](https://payloadcms.com/) and [Next.js 15](https://nextjs.org/) — bundling the [FocusReactive Payload plugins](https://github.com/focusreactive/payload-plugins) and a modular block-based page builder so you can ship marketing sites, blogs, and product platforms in a day.

**Features:**

- **Presets** — multiple pre-configured block configurations to build pages faster.
- **A/B Testing** — native experiments with dynamic % of traffic per variant, controlled inline.
- **Comments** — inline collaboration for content teams and developers, directly on the field.
- **Multi-Language + AI Translation** — one-click AI translations on top of Payload's localization plugin.
- **Scheduled Publishing on Serverless** — works on Vercel and other serverless platforms where Payload's native scheduling can't run.
- **Locale-Scoped Semantic Search** — pgvector search that respects the visitor's active locale.
- **SSO** — OIDC support for Auth0, Keycloak, Okta, and any OIDC-compliant identity provider.
- **Modular Page Builder** — composable, localizable blocks with preset and A/B-experiment hooks.
- **AI Development Ready** — `CLAUDE.md`, `AGENTS.md`, `.claude/`, and `.cursor/rules` ship in-repo so Claude Code, Cursor, and other agents are productive on day one.

## Quick Start

1. Create a new repository from this template and clone it locally.
2. Provision a database — we recommend [Neon](https://console.neon.tech/app) for free, branchable Postgres.
3. Run [Claude Code](https://www.anthropic.com/claude-code) and paste [this setup prompt](./setup_payload_prompt.md) — the agent will configure environment variables, run migrations, and seed sample content.

Prefer manual setup? Jump to [Getting Started](#getting-started).

## About the Project

At [FocusReactive](https://focusreactive.com/) we build projects on different CMSs — Sanity, Storyblok, Strapi, and Payload. Each platform has its own unique features and limitations, and sometimes a project needs a feature one CMS has but another doesn't.

So we decided to build all of that into one open-source project — we call it **Ideal CMS**. The best features from every CMS we've worked with, available as Payload plugins. You can use the project with everything integrated, or install [individual plugins](https://github.com/focusreactive/payload-plugins) to get the features you need. This often helps our clients free up budget for things we believe should be included from day one.

Every plugin works independently in any Payload project. For new projects, we recommend starting from this repository — it combines all of the plugins with the basic setup you'll need to ship.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| CMS | [Payload CMS 3](https://payloadcms.com/) |
| Framework | [Next.js 15+](https://nextjs.org/) (App Router) + React 19 |
| Database | PostgreSQL · MongoDB · Supabase |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Rich Text | Lexical Editor |
| Internationalization | [next-intl](https://next-intl-docs.vercel.app/) + AI translations |
| Authentication | JWT + OIDC/SSO (Auth0, Keycloak, Okta) |
| Storage | Vercel Blob · S3 · Supabase Storage |
| Deployment | Optimized for [Vercel](https://vercel.com/), Docker-ready |
| AI Development | Claude Code · Cursor · agent-ready (`CLAUDE.md`, `AGENTS.md`, `.claude/`, `.cursor/rules`) |

## AI Development

Ideal CMS ships a curated set of [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills) under `.claude/skills/`. These auto-activate when you describe a task that matches their domain, so an AI agent (Claude Code, or any other tool that reads the same skill format) gets project-grounded guidance the moment you say "design a new collection" or "audit this page for performance."

Highlights:

- **`payload`** — design Payload schemas the right way: collections, fields, hooks, access control, validation, drafts/versioning, virtual fields, and Local API patterns. Triggers on anything touching `payload.config.ts`, collections, fields, or hooks.
- **`payload-block-extractor`** — when you add a new page block, this skill wires it into the semantic search pipeline (text extraction + indexing) so search stays accurate without manual plumbing.
- **`vercel-react-best-practices`** — Vercel Engineering's 45-rule playbook for React and Next.js performance. Use it to audit pages, refactor components, and tune data fetching.
- **`cache-components`** — proactive guidance for Next.js Cache Components and Partial Prerendering — `'use cache'`, `cacheLife`, `cacheTag`, `updateTag`.
- **`upload-local-image`** — fallback flow for staging local images into Payload's media library through Vercel Blob when the agent can't reach the local filesystem directly.
- **`nextjs-best-practices`**, **`tailwindcss-development`**, **`typescript`** — the everyday craft skills: App Router patterns, Tailwind v4 utilities, and TypeScript style.

Drop a new skill into `.claude/skills/<name>/SKILL.md` and it picks up on the next conversation — no rebuild, no config.

## Plugins

Ideal CMS bundles the [FocusReactive Payload plugins](https://github.com/focusreactive/payload-plugins) — every plugin works standalone in any Payload project, and together they cover the features we believe should be in the box from day one.

### Presets Plugin for Payload CMS

Multiple pre-configured block configurations you can use to build up your pages. It's like having multiple versions of default values — because content teams prefer editing over creating from scratch.

- Package: [`@focus-reactive/payload-plugin-presets`](https://github.com/focusreactive/payload-plugins)
- [![npm](https://img.shields.io/npm/v/@focus-reactive/payload-plugin-presets)](https://www.npmjs.com/package/@focus-reactive/payload-plugin-presets)

### A/B Testing Plugin for Payload CMS

Native experiments with a dynamic percentage of traffic going to each content variant. Control everything from the same page you're working on — page variants, middleware, and analytics adapters included.

- Package: [`@focus-reactive/payload-plugin-ab`](https://github.com/focusreactive/payload-plugins)
- [![npm](https://img.shields.io/npm/v/@focus-reactive/payload-plugin-ab)](https://www.npmjs.com/package/@focus-reactive/payload-plugin-ab)

### Comments Plugin for Payload CMS

A way to collaborate inside the CMS. Inline field comments, mentions, and annotations — helpful for both the content team and developers, letting everyone leave feedback directly inside the admin.

- Package: [`@focus-reactive/payload-plugin-comments`](https://github.com/focusreactive/payload-plugins)
- [![npm](https://img.shields.io/npm/v/@focus-reactive/payload-plugin-comments)](https://www.npmjs.com/package/@focus-reactive/payload-plugin-comments)

### AI Translation Plugin for Payload CMS

Payload already has a localization plugin, so we built a plugin to do AI translations on top of it — fill in every localized field with one click.

- Package: [`@focus-reactive/payload-plugin-translator`](https://github.com/focusreactive/payload-plugins)
- [![npm](https://img.shields.io/npm/v/@focus-reactive/payload-plugin-translator)](https://www.npmjs.com/package/@focus-reactive/payload-plugin-translator)

### Scheduled Publishing Plugin for Payload CMS

Payload CMS natively supports scheduled publishing, but not for serverless platforms like Vercel. Since that's where we deploy most of our projects, we built a plugin that makes it work.

- Package: [`@focus-reactive/payload-plugin-scheduling`](https://github.com/focusreactive/payload-plugins)
- [![npm](https://img.shields.io/npm/v/@focus-reactive/payload-plugin-scheduling)](https://www.npmjs.com/package/@focus-reactive/payload-plugin-scheduling)

### Roadmap

Two more plugins we're actively working on — game changers, in our opinion:

- **Releases** — schedule the publication of multiple resources together in [Payload CMS](https://github.com/focusreactive/payload-plugins), so complex launches go out as a single coordinated release with no surprises.
- **Visual Editing** — a UI overlay over your content in preview mode, letting editors jump to the right field with one click instead of hunting through the admin.

Want to influence the roadmap? Open an issue on [`focusreactive/payload-plugins`](https://github.com/focusreactive/payload-plugins) — we read everything.

## Getting Started

### Prerequisites

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` or `^10`
- A PostgreSQL instance ([Neon](https://neon.tech/) recommended for serverless deployments)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Secret key for encrypting Payload data |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Public-facing URL of the application |
| `PREVIEW_SECRET` | No | Secret for validating live preview requests |
| `BLOB_READ_WRITE_TOKEN` | Production | Vercel Blob storage token for media uploads |
| `OPENAI_API_KEY` | No | Enables AI translations and semantic search embeddings |
| `OIDC_ISSUER` | No | OIDC provider URL for SSO |
| `OIDC_CLIENT_ID` | No | OIDC client ID |
| `OIDC_CLIENT_SECRET` | No | OIDC client secret |
| `OIDC_REDIRECT_URI` | No | Callback URL (defaults to `SERVER_URL/api/auth/oidc/callback`) |
| `OIDC_USE_PKCE` | No | Enable PKCE flow (recommended for Auth0) |
| `OIDC_PROVIDER_NAME` | No | Label shown on the SSO login button |
| `NEXT_PUBLIC_OIDC_PROVIDER_NAME` | No | Client-side SSO provider label |

### 3. Run database migrations

```bash
pnpm payload migrate
```

### 4. Start the dev server

```bash
pnpm dev
```

### 5. Open the admin

Visit [`http://localhost:3333/admin`](http://localhost:3333/admin) and create your first admin user. The frontend uses locale-prefixed routes — `/en/...`, `/es/...`.

## License

MIT — free for personal and commercial use.
