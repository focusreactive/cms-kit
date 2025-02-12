# CMS-Kit 🔧🔧🔧

An endeavor accumulating the experience and best practices collected at [Focus Reactive](https://focusreactive.com/).
The project serves the idea of making Headless CMS-based development accessible, comfortable, and fast.

## Demo 👀

- [Storyblok landing](https://turbo-cms-kit-storyblok.vercel.app/)
- [Sanity landing](https://turbo-cms-kit-sanity.vercel.app/)

## What you get

1. New CMS project (**Storyblok**/**Sanity**), set up with vercel deployments
2. Multiple ready to use components with different presets(styles)
3. New Vercel project, deployed and configured with your CMS project
4. Ready-to-use pages in different styles

## Quick start

### Setup

0. Since application will be deployed to Vercel, make sure your Github account is linked to Vercel. You can do it [here](https://github.com/settings/installations).

1. Create a new repository using this template by clicking the "Use this template" button at the top of the repository page.
   ![Screenshot 2024-11-07 at 13 38 48](https://github.com/user-attachments/assets/9a159ebd-d810-4b6d-ab79-ab453da6ab9c)

2. Await the initial workflow to be finished

![Screenshot 2024-11-07 at 16 00 17](https://github.com/user-attachments/assets/375ce843-8185-4782-95ff-5f9d6aaf2935)

3. Clone your new repository:

   ```bash
   git clone <your-repository-url>
   ```

4. Navigate to the project directory:

   ```bash
   cd <repository-name>
   ```

5. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

**Choose CMS option for your project: Storyblok or Sanity. Follow corresponding steps.**

Learn more about each of the CMS options in our detailed articles: [Storyblok CMS Overview](https://focusreactive.com/storyblok-cms-overview/), [Sanity CMS Overview](https://focusreactive.com/sanity-cms-overview/).

### Storyblok

6. Navigate to the Storyblok CLI directory:

   ```bash
   cd apps/storyblok/CLI
   ```

7. Run the setup script,

⚠️ command should be executed from _apps/storyblok/CLI_ (previous step), to consume correct environment variables:

```bash
   node sb.mjs
```

8. Follow the interactive prompts in the CLI tool to:

   - Enter your Storyblok Personal Access Token
   - Enter your Vercel Personal Auth Token
   - Select your Vercel team
   - Choose a project name
   - Complete the space creation and configuration process

9. Go to project settings in Vercel dashboard
   - select **Git** section
   - create deploy hook and copy it
   - select **Environment variables** section
   - add variables called **VERCEL_REDEPLOY_HOOK_URL** and assign it to created deploy hook value
   - trigger rebuild

This process ensures that global component updates are displayed on all pages.

### [TODO]: add video example

### Sanity

6. Navigate to the Storyblok CLI directory:

   ```bash
   cd apps/sanity/CLI
   ```

7. Run the setup script,

⚠️ command should be executed from _apps/sanity/CLI_ (previous step), to consume correct environment variables:

```bash
   node sa.mjs
```

8. Follow the interactive prompts in the CLI tool to:

   - Enter your Sanity Personal Access Token
   - Select your Sanity organization
   - Enter your Vercel Personal Auth Token
   - Select your Vercel team
   - Choose a project name
   - Choose a dataset name
   - Complete the project creation and configuration process

🏁 Your CMS-based project is ready 🏁

## Core Features

- Monorepo using **Turborepo**
- **Multiple CMS** support
- New `/app` dir
- Routing, layouts, nested layouts
- Data fetching, **caching** and **revalidation**
- Server and client components
- Reusable UI components built using **Radix UI**
- Styled using **tailwind CSS**
- Written in **TypeScript**
- Types and components **generation**
- **CLI** to create new set up project
- **Themes** using CSS variables
- **Predefined** structure

## Repo structure

- `apps/storyblok`: CMS app
- `apps/sanity`: CMS app
- `packages/ui`: UI components library, shared between both CMS apps
- `packages/eslint-config`: shared `eslint` configurations
- `packages/ts-config`: shared `ts-config` configuration
- `packages/tailwind-config`: shared `tailwind` configuration

### Types of components

- **UI component** - universal and sharable component between multiple CMSs
- **Controller component** - takes data from CMS, convert it to UI component format, and use UI component with converted props. Each CMS has it's own controller component for each UI component.
- All **controller components** have common propertiers to change style, such as margin, background, alignment etc.

### Components composition and hierarchy

The website structure follows a clear hierarchical composition:

1. Pages

   - Top-level components that represent entire web pages
   - Each page contains multiple sections, SEO properties and theme

2. Sections

   - Container components that organize content into distinct areas
   - Can be configured with settings like margin, background, width, alignment etc.
   - Hold and arrange other components

3. Base Components

   - Components like **link**, **image**, and **rich text**
   - Combination of multiple functional components like **card**
   - Can be combined and reused across different sections

**RichText** component has additional functionality. It allows to add sections inside, which gives ability to combine sections with text.

### Add new section

1. Create new component using generators

```bash
pnpm gen
```

2. Select type of component to create

```bash
- UI: Create a new UI component
- Storyblok: Create a new content section
- Sanity: Create a new content section
```

3. Enter name of the component
4. For Storyblok, add section component to the CMS
5. Update properties and design
6. Go to CMS folder

```bash
cd apps/storyblok
```

or

```bash
cd apps/sanity
```

7. Generate types for added section

```bash
pnpm sb-login

pnpm gen:types
```

### Update existing section

1. Updata design
2. Update fields
3. Go to CMS folder

```bash
cd apps/storyblok
```

or

```bash
cd apps/sanity
```

4. Generate types for updated section

```bash
pnpm gen:types
```

## Start project in dev mode

### Instalation

1. Clone repository
   ```bash
   git clone https://github.com/focusreactive/cms-kit
   ```
2. Go to project directory
   ```bash
   cd cms-kit
   ```
3. Install dependencies
   ```bash
   pnpm install
   ```
4. Add and fill `.env` and `.env.local` file with proper data:

Create `.env` and `.env.local` files in project folder (apps/sanity or apps/storyblok) and add the following variables:

.env

```bash
REPO_PROD_BRANCH="main"
REPO_TYPE="github"
REPO_ID="[repo id]"
REPO_NAME="[nickname]/[repo name]"
```

**Storyblok project**

.env.local

```bash
NEXT_PUBLIC_DOMAIN="https://localhost:4050"
NEXT_PUBLIC_IS_PREVIEW="true"
NEXT_PUBLIC_STORYBLOK_TOKEN="[storyblok space preview token]"
NEXT_PUBLIC_STORYBLOK_API_GATE="https://api.storyblok.com/v2/cdn"
```

**Sanity project**

.env.local

```bash
NEXT_PUBLIC_DOMAIN="http://localhost:3000"
NEXT_PUBLIC_SANITY_PROJECT_ID="[project id]"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_READ_TOKEN="[read token]"
```

5. Run dev server
   ```bash
   pnpm dev
   ```

Happy hacking 👾
