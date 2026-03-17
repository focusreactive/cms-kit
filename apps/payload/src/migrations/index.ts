import * as migration_20260317_091401_init from './20260317_091401_init'

export const migrations = [
  {
    up: migration_20260317_091401_init.up,
    down: migration_20260317_091401_init.down,
    name: '20260317_091401_init',
  },
]
