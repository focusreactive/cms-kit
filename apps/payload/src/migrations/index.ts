import * as migration_20260317_091401_init from './20260317_091401_init';
import * as migration_20260317_092633_add_slug_unique_constraints from './20260317_092633_add_slug_unique_constraints';
import * as migration_20260317_150738_create_ab_manifest__remove_page_variants from './20260317_150738_create_ab_manifest__remove_page_variants';
import * as migration_20260317_181410_set_required_to_categories_slug from './20260317_181410_set_required_to_categories_slug';
import * as migration_20260317_184349_forbid_localized_for_breadcrumbs from './20260317_184349_forbid_localized_for_breadcrumbs';
import * as migration_20260317_195931_remove_localized_for_breadcrumbs from './20260317_195931_remove_localized_for_breadcrumbs';

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
  {
    up: migration_20260317_181410_set_required_to_categories_slug.up,
    down: migration_20260317_181410_set_required_to_categories_slug.down,
    name: '20260317_181410_set_required_to_categories_slug',
  },
  {
    up: migration_20260317_184349_forbid_localized_for_breadcrumbs.up,
    down: migration_20260317_184349_forbid_localized_for_breadcrumbs.down,
    name: '20260317_184349_forbid_localized_for_breadcrumbs',
  },
  {
    up: migration_20260317_195931_remove_localized_for_breadcrumbs.up,
    down: migration_20260317_195931_remove_localized_for_breadcrumbs.down,
    name: '20260317_195931_remove_localized_for_breadcrumbs'
  },
];
