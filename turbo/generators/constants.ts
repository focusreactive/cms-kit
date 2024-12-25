export const componentNamePrompt = {
  type: "input",
  name: "sectionName",
  message: "What is the name of the new section?",
  validate: (input: string) => {
    if (!input) {
      return "section name is required";
    }

    if (input.split(" ").length > 1) {
      return "section name should be a single word";
    }

    return true;
  },
};

export const createUISectionActions = [
  {
    type: "add",
    path: "{{ turbo.paths.root }}/packages/ui/components/sections/{{ sectionName }}/index.tsx",
    templateFile: "templates/uiSection.hbs",
  },
  {
    type: "add",
    path: "{{ turbo.paths.root }}/packages/ui/components/sections/{{ sectionName }}/types.ts",
    templateFile: "templates/uiSectionProps.hbs",
  },
  {
    type: "modify",
    path: "{{ turbo.paths.root }}/packages/ui/index.tsx",
    pattern: /(\/\/ end component exports)/g,
    template: `export * from "./components/sections/{{ sectionName }}"\n$1`,
  },
];
