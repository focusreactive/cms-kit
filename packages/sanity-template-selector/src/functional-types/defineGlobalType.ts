import { defineType } from 'sanity';

export const defineGlobalType = (typeFn) => {
  const type = defineType(typeFn());
  // @ts-ignore
  type.kitOptions = { group: 'GLOBAL' };
  type.name = `glob.${type.name}`;
  type.title = `_${type.title}`;
  type.description = `${type.description || 'utility type'} (global)`;

  return type;
};
