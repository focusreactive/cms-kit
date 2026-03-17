import * as migration_20260317_091401_init from './20260317_091401_init'
import * as migration_20260317_092633_add_slug_unique_constraints from './20260317_092633_add_slug_unique_constraints'
import * as migration_20260317_150738_create_ab_manifest__remove_page_variants from './20260317_150738_create_ab_manifest__remove_page_variants'

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
  {
    up: migration_20260317_150738_create_ab_manifest__remove_page_variants.up,
    down: migration_20260317_150738_create_ab_manifest__remove_page_variants.down,
    name: '20260317_150738_create_ab_manifest__remove_page_variants',
  },
]
