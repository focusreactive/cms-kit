import { ComponentType } from 'react';
import { ImageValue, ObjectInputProps, ObjectSchemaType } from 'sanity';

export const ImageInput: ComponentType<
  ObjectInputProps<ImageValue, ObjectSchemaType>
> = (props: ObjectInputProps<ImageValue>) => {
  return props.renderDefault(props);
};
