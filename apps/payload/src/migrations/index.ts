import * as migration_20260317_091401_init from './20260317_091401_init';
import * as migration_20260317_092633_add_slug_unique_constraints from './20260317_092633_add_slug_unique_constraints';

export const migrations = [
  {
    up: migration_20260317_091401_init.up,
    down: migration_20260317_091401_init.down,
    name: '20260317_091401_init',
  },
  {
    up: migration_20260317_092633_add_slug_unique_constraints.up,
    down: migration_20260317_092633_add_slug_unique_constraints.down,
    name: '20260317_092633_add_slug_unique_constraints',
  },
];
