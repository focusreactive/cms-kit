import { defineArrayMember, defineField, defineType } from 'sanity';
import { componentsWithBlocksInput } from './componentsPreviewUtil';
import { BlocksInputCustomProps } from './types';

type DefineBlocksFieldProps = {
  name: string;
  of: ReturnType<typeof defineArrayMember>[];
  options?: BlocksInputCustomProps;
};

export const defineBlocksField = ({
  name,
  of = [],
  options = { presets: [] },
}: DefineBlocksFieldProps) => {
  return defineField({
    name,
    type: 'array',
    of,
    components: componentsWithBlocksInput(options),
  });
};
