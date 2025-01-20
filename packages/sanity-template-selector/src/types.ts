import { SchemaTypeDefinition } from "sanity";

export type Preset = {
  name: string;
  value: {
    _key: string;
    _type: string;
  };
  meta: {
    area: string;
    category: string;
    title: string;
    screenshot: string;
  };
};

export type OnItemAppend = (item: { _key: string }) => void;

export type RenderItemViewProps = {
  preset: Preset;
};

export type RenderItemProps = {
  preset: Preset;
  onItemAppend: OnItemAppend;
  selectSinglePreset: (p?: Preset) => void;
};

export type RenderViewProps = {
  presets: Array<Preset>;
  onItemAppend: OnItemAppend;
  selectSinglePreset: (p?: Preset) => void;
};

export type contentBlocksProps = {
  blockTypes: SchemaTypeDefinition[];
  name: string;
  params: object;
};

export type ContentBlocksArg = {
  sets?: Array<object>;
  presets?: Array<object>;
  blockTypes?: SchemaTypeDefinition[];
};

export type BlocksInputCustomProps = {
  presets: Preset[];
};
