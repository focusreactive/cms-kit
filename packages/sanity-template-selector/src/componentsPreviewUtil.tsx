import React from 'react';
import { BlocksInput } from './BlocksInput';

export const componentsWithBlocksInput = (params: object) => {
  return {
    field: (props) => <BlocksInput {...props} {...params} />,
  };
};
