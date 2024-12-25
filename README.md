# CMS-Kit 🔧

An endeavor accumulating the experience and best practices collected at [Focus Reactive](https://focusreactive.com/).
The project serves the idea of making Headless CMS-based development accessible, comfortable, and fast.

## Quick start

### What you get

1. New Storyblok space, set up with vercel deployments
2. 10+ ready to use components with different presets(styles)
3. New Vercel project, deployed and configured with your new Storyblok space
4. Multiple ready pages in different styles

### Storyblok

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

### [TODO]: add video example

### Sanity

soon

## Demo 👀

- [Storyblok Landing](https://turbo-cms-kit-storyblok.vercel.app/)
- [Sanity landing](https://turbo-cms-kit-sanity.vercel.app/)

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
# For Storyblok you will additionally
# need to log into CLI
pnpm sb-login

pnpm gen:types
```

⚠️If you generating types for Storyblok, make sure you logged into CLI⚠️

```bash

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

### Environment variables

#### Storyblok project

Create `.env` and `.env.local` files in the root of your project and add the following variables:

.env

```bash
REPO_PROD_BRANCH="main"
REPO_TYPE="github"
REPO_ID="[repo id]"
REPO_NAME="[nickname]/[repo name]"
```

.env.local

```bash
# Created by Vercel CLI
NEXT_PUBLIC_API_GATE="https://api.storyblok.com/v2/cdn"
NEXT_PUBLIC_DOMAIN="https://localhost:4050"
NEXT_PUBLIC_IS_PREVIEW="true"
NEXT_PUBLIC_SB_REGION="EU"
NEXT_PUBLIC_URL="https://localhost:4050"
SB_PREVIEW_TOKEN="[storyblok space preview token]"
SB_WEBHOOK_REVALIDATE_SECRET="[storyblok webhook revalidate key]"
```

#### Sanity

.env

```bash
REPO_PROD_BRANCH="main"
REPO_TYPE="github"
REPO_ID="[repo id]"
REPO_NAME="[nickname]/[repo name]"
```

.env.local
**tbd**

4. Create a new repo based on [cms-kit template](https://github.com/focusreactive/cms-kit)
   ![Screenshot 2024-10-24 at 17 52 54](https://github.com/user-attachments/assets/b4773c54-bf7f-4697-ae7e-ada6e5163bf0)
5. Pull repo locally
6. Install packages
   ```bash
   pnpm install
   ```
7. Go to CLI folder
   ```bash
   cd apps/storyblok/cli
   ```
8. Execute command
   ```bash
   node sb.mjs
   ```
9. Follow steps

Happy hacking 👾
