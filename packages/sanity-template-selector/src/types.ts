import { SchemaTypeDefinition } from 'sanity';

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
  renderItemView: (props: RenderItemViewProps) => React.ReactNode;
};

export type RenderViewProps = {
  presets: Array<Preset>;
  onItemAppend: OnItemAppend;
  renderItem: (props: RenderItemProps) => React.ReactNode;
  renderItemView: (props: RenderItemViewProps) => React.ReactNode;
  selectSinglePreset: (p?: Preset) => void;
};

export type contentBlocksProps = {
  blockTypes: SchemaTypeDefinition[];
  name: string;
  params: object;
  renderItem?: (props: RenderItemProps) => React.ReactNode;
  renderItemView?: (props: RenderItemViewProps) => React.ReactNode;
  renderView?: (props: RenderViewProps) => React.ReactNode;
};

export type ContentBlocksArg = {
  sets?: Array<object>;
  presets?: Array<object>;
  blockTypes?: SchemaTypeDefinition[];
};

export type BlocksInputCustomProps = {
  renderItem?: (props: RenderItemProps) => React.ReactNode;
  renderItemView?: (props: RenderItemViewProps) => React.ReactNode;
  renderView?: (props: RenderViewProps) => React.ReactNode;
  presets: Preset[];
};
