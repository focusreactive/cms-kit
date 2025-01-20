import React from 'react';
import { Badge, Box, Card, Dialog } from '@sanity/ui';
import { useFormValue } from 'sanity';
import { Preset } from '../../types';
import styled from 'styled-components';
import { saveContentBlockToLS } from './model';

const InnerArea = styled.div`
  box-sizing: border-box;
  background-color: rgb(130 130 130 / 7%);
  padding: 16px;
  height: 100%;
  position: relative;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 8px;
`;

type CurrentJSONProps = {
  data: object;
};

function CurrentJSON({ data }: CurrentJSONProps) {
  return <TextArea value={JSON.stringify(data, null, 2)} readOnly />;
}

type AvailableTemplates = {
  _type?: string;
  presets: Preset[];
};

function AvailableTemplates({ _type, presets }: AvailableTemplates) {
  if (!_type) {
    return 'no _type specified';
  }
  const availableTemplates = presets
    .map((p) => ({ ...p.value, type: p.value._type, name: p.name }))
    .filter((tm) => tm?.type === _type);

  return (
    <Box>
      {availableTemplates.map((tm) => (
        <Card key={tm.name}>{tm.name}</Card>
      ))}
    </Box>
  );
}

type BlockActionsProps = {
  path: Array<string | { _key: string }>;
  presets: Preset[];
};

enum DialogTabs {
  templates = 'templates',
  json = 'json',
}

export function BlockActions({ path, presets }: BlockActionsProps) {
  const currentPath = path.slice(0, -1);
  const data = useFormValue(currentPath) as Preset['value'];
  const [open, setOpen] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<DialogTabs>(DialogTabs.templates);
  const onClose = React.useCallback(() => setOpen(false), []);
  const onOpen = (openTab: DialogTabs) => () => {
    setTab(openTab);
    setOpen(true);
  };

  const tabsConfig = {
    [DialogTabs.templates]: {
      title: 'Available Templates',
      // TODO: we need to handle cases when data comes empty
      component: <AvailableTemplates _type={data?._type} presets={presets} />,
    },
    [DialogTabs.json]: {
      component: <CurrentJSON data={data as object} />,
      title: 'The Current Value',
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Badge
          onClick={onOpen(DialogTabs.templates)}
          tone="primary"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Presets...
        </Badge>
        <Badge
          onClick={onOpen(DialogTabs.json)}
          mode="outline"
          tone="default"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Current Value
        </Badge>
        <Badge
          onClick={() => saveContentBlockToLS(data as Preset['value'])}
          mode="outline"
          tone="default"
          padding={2}
          fontSize={6}
          style={{ cursor: 'pointer' }}
        >
          Copy
        </Badge>
      </div>
      {open && (
        <Dialog
          header={tabsConfig[tab].title}
          id="dialog-example"
          onClose={onClose}
          zOffset={1000}
          width={800}
        >
          <Box padding={0} style={{ height: 600, position: 'relative' }}>
            <InnerArea>{tabsConfig[tab].component}</InnerArea>
          </Box>
        </Dialog>
      )}
    </div>
  );
}
