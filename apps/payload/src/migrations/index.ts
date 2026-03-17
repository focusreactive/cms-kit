import * as migration_20260316_142547_init from './20260316_142547_init';
import * as migration_20260316_152822_remove_tenants from './20260316_152822_remove_tenants';

export const migrations = [
  {
    up: migration_20260316_142547_init.up,
    down: migration_20260316_142547_init.down,
    name: '20260316_142547_init',
  },
  {
    up: migration_20260316_152822_remove_tenants.up,
    down: migration_20260316_152822_remove_tenants.down,
    name: '20260316_152822_remove_tenants'
  },
];
