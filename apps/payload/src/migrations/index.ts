import * as migration_20260317_091401_init from './20260317_091401_init';
import * as migration_20260317_092633_add_slug_unique_constraints from './20260317_092633_add_slug_unique_constraints';
import * as migration_20260317_150738_create_ab_manifest__remove_page_variants from './20260317_150738_create_ab_manifest__remove_page_variants';
import * as migration_20260317_181410_set_required_to_categories_slug from './20260317_181410_set_required_to_categories_slug';
import * as migration_20260317_184349_forbid_localized_for_breadcrumbs from './20260317_184349_forbid_localized_for_breadcrumbs';
import * as migration_20260317_195931_remove_localized_for_breadcrumbs from './20260317_195931_remove_localized_for_breadcrumbs';
import * as migration_20260318_022640_create_comments from './20260318_022640_create_comments';
import * as migration_20260318_140943_add_section_group_to_blocks from './20260318_140943_add_section_group_to_blocks';
import * as migration_20260319_100637_add_image_fields from './20260319_100637_add_image_fields';
import * as migration_20260319_103151_remove_section_fields_from_blog_section from './20260319_103151_remove_section_fields_from_blog_section';
import * as migration_20260319_164752_update_header_and_footer_according_to_other_projects from './20260319_164752_update_header_and_footer_according_to_other_projects';
import * as migration_20260325_115801_enhance_blog from './20260325_115801_enhance_blog';
import * as migration_20260325_124045_return_blog_field from './20260325_124045_return_blog_field';
import * as migration_20260325_124521_restructure_blog_field from './20260325_124521_restructure_blog_field';
import * as migration_20260326_050306_remove_blog_section from './20260326_050306_remove_blog_section';
import * as migration_20260326_051511_add_custom_page_type_to from './20260326_051511_add_custom_page_type_to';
import * as migration_20260329_153412_add_presets_to_all_blocks from './20260329_153412_add_presets_to_all_blocks';

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
    name: '20260317_195931_remove_localized_for_breadcrumbs',
  },
  {
    up: migration_20260318_022640_create_comments.up,
    down: migration_20260318_022640_create_comments.down,
    name: '20260318_022640_create_comments',
  },
  {
    up: migration_20260318_140943_add_section_group_to_blocks.up,
    down: migration_20260318_140943_add_section_group_to_blocks.down,
    name: '20260318_140943_add_section_group_to_blocks',
  },
  {
    up: migration_20260319_100637_add_image_fields.up,
    down: migration_20260319_100637_add_image_fields.down,
    name: '20260319_100637_add_image_fields',
  },
  {
    up: migration_20260319_103151_remove_section_fields_from_blog_section.up,
    down: migration_20260319_103151_remove_section_fields_from_blog_section.down,
    name: '20260319_103151_remove_section_fields_from_blog_section',
  },
  {
    up: migration_20260319_164752_update_header_and_footer_according_to_other_projects.up,
    down: migration_20260319_164752_update_header_and_footer_according_to_other_projects.down,
    name: '20260319_164752_update_header_and_footer_according_to_other_projects',
  },
  {
    up: migration_20260325_115801_enhance_blog.up,
    down: migration_20260325_115801_enhance_blog.down,
    name: '20260325_115801_enhance_blog',
  },
  {
    up: migration_20260325_124045_return_blog_field.up,
    down: migration_20260325_124045_return_blog_field.down,
    name: '20260325_124045_return_blog_field',
  },
  {
    up: migration_20260325_124521_restructure_blog_field.up,
    down: migration_20260325_124521_restructure_blog_field.down,
    name: '20260325_124521_restructure_blog_field',
  },
  {
    up: migration_20260326_050306_remove_blog_section.up,
    down: migration_20260326_050306_remove_blog_section.down,
    name: '20260326_050306_remove_blog_section',
  },
  {
    up: migration_20260326_051511_add_custom_page_type_to.up,
    down: migration_20260326_051511_add_custom_page_type_to.down,
    name: '20260326_051511_add_custom_page_type_to',
  },
  {
    up: migration_20260329_153412_add_presets_to_all_blocks.up,
    down: migration_20260329_153412_add_presets_to_all_blocks.down,
    name: '20260329_153412_add_presets_to_all_blocks'
  },
];
