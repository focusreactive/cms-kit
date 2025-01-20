import { defineGlobalType } from '../defineGlobalType';
import { components } from './componentsUtil';

export const createTemplateView = (params) =>
  defineGlobalType(() => ({
    name: 'templateView',
    type: 'string',
    // components: components(params),
  }));
