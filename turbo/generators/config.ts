import type { PlopTypes } from "@turbo/gen";

import { componentNamePrompt, createUISectionActions } from "./constants";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setHelper("capitialize", (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  plop.setHelper("loweraseFirstLetter", (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
  });

  plop.setGenerator("UI", {
    description: "Create a new UI section component",
    prompts: [componentNamePrompt],
    actions: createUISectionActions,
  });

  plop.setGenerator("Storyblok", {
    description: "Create a new content section",
    prompts: [componentNamePrompt],
    actions: [
      ...createUISectionActions,
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/storyblok/src/contentSections/{{ capitialize sectionName }}/index.tsx",
        templateFile: "templates/storyblokSection.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/storyblok/src/contentSections/{{ capitialize sectionName }}/types.ts",
        templateFile: "templates/storyblokSectionTypes.hbs",
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/storyblok/src/constants/sbComponents.tsx",
        pattern: /(\/\/ end of sb components imports)/g,
        template: `import {{ capitialize sectionName }} from '@/contentSections/{{ capitialize sectionName }}'\n$1`,
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/storyblok/src/constants/sbComponents.tsx",
        pattern: /(\/\/ end of sb components mapping)/g,
        template: `{{ loweraseFirstLetter sectionName }}: {{ capitialize sectionName }},\n$1`,
      },
    ],
  });

  plop.setGenerator("Sanity", {
    description: "Create a new content section",
    prompts: [componentNamePrompt],
    actions: [
      ...createUISectionActions,
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/sanity/src/contentSections/{{ capitialize sectionName }}/index.tsx",
        templateFile: "templates/sanitySection.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/sanity/src/contentSections/{{ capitialize sectionName }}/types.ts",
        templateFile: "templates/sanitySectionTypes.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/sanity/src/contentSections/{{ capitialize sectionName }}/schema.ts",
        templateFile: "templates/sanitySectionSchema.hbs",
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/sanity/src/contentSections/index.tsx",
        pattern: /(\/\/ end of section imports)/g,
        template:
          "import {{ capitialize sectionName }} from './{{ capitialize sectionName }}'\n$1",
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/sanity/src/contentSections/index.tsx",
        pattern: /(\/\/ end of section object)/g,
        template:
          "'section.{{ loweraseFirstLetter sectionName }}': {{ capitialize sectionName }},\n$1",
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/sanity/src/lib/schemas/sections.ts",
        pattern: /(\/\/ end of section imports)/g,
        template: `import {{ loweraseFirstLetter sectionName }} from '@/contentSections/{{ capitialize sectionName }}/schema'\n$1`,
      },
      {
        type: "modify",
        path: "{{ turbo.paths.root }}/apps/sanity/src/lib/schemas/sections.ts",
        pattern: /(\/\/ end of section array)/g,
        template: `{{ loweraseFirstLetter sectionName }},\n$1`,
      },
    ],
  });
}
