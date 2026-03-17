import * as migration_20260114_131012_initial from './20260114_131012_initial';
import * as migration_20260114_132326_page_collectiion_slug from './20260114_132326_page_collectiion_slug';
import * as migration_20260114_134556_page_collection_background from './20260114_134556_page_collection_background';
import * as migration_20260114_145130_page_collection_seo from './20260114_145130_page_collection_seo';
import * as migration_20260114_151954_page_collection_blocks from './20260114_151954_page_collection_blocks';
import * as migration_20260115_065645_blocks_content_fields from './20260115_065645_blocks_content_fields';
import * as migration_20260115_075229_blocks_text_section from './20260115_075229_blocks_text_section';
import * as migration_20260115_113035_page_collection_blocks from './20260115_113035_page_collection_blocks';
import * as migration_20260115_113205_page_collection_hero from './20260115_113205_page_collection_hero';
import * as migration_20260115_115500_page_collection_links from './20260115_115500_page_collection_links';
import * as migration_20260115_121928_page_collection_hero_overlay from './20260115_121928_page_collection_hero_overlay';
import * as migration_20260115_142537_page_collection_hero from './20260115_142537_page_collection_hero';
import * as migration_20260115_151606_page_collection_draft from './20260115_151606_page_collection_draft';
import * as migration_20260116_090251_header_footer from './20260116_090251_header_footer';
import * as migration_20260116_133823_footer_group_name_field from './20260116_133823_footer_group_name_field';
import * as migration_20260119_124322_merge from './20260119_124322_merge';
import * as migration_20260119_130630_site_settings_versions from './20260119_130630_site_settings_versions';
import * as migration_20260119_135806_page_collection_index_follow from './20260119_135806_page_collection_index_follow';
import * as migration_20260120_062558_site_settings_admin_logo_icon from './20260120_062558_site_settings_admin_logo_icon';
import * as migration_20260120_094143_page_collection_folders_support from './20260120_094143_page_collection_folders_support';
import * as migration_20260120_095228_page_collection_folders_support from './20260120_095228_page_collection_folders_support';
import * as migration_20260120_095705_redirects from './20260120_095705_redirects';
import * as migration_20260120_112143_redirects_custom_fields from './20260120_112143_redirects_custom_fields';
import * as migration_20260120_121552_categories_collection from './20260120_121552_categories_collection';
import * as migration_20260120_122235_posts_collection from './20260120_122235_posts_collection';
import * as migration_20260120_123504_posts_collection_drafts from './20260120_123504_posts_collection_drafts';
import * as migration_20260120_124139_posts_collection_seo from './20260120_124139_posts_collection_seo';
import * as migration_20260120_130251_posts_collection_seo from './20260120_130251_posts_collection_seo';
import * as migration_20260121_092236_posts_collection_publishedAt_index from './20260121_092236_posts_collection_publishedAt_index';
import * as migration_20260121_100834_blog_page_settings from './20260121_100834_blog_page_settings';
import * as migration_20260121_145209_user_roles from './20260121_145209_user_roles';
import * as migration_20260121_151317_user_name from './20260121_151317_user_name';
import * as migration_20260122_073115_link_relations from './20260122_073115_link_relations';
import * as migration_20260122_113438_seo_fields_remove_og_type from './20260122_113438_seo_fields_remove_og_type';
import * as migration_20260122_115129_seo_fields from './20260122_115129_seo_fields';
import * as migration_20260122_115615_blog_page_settings_structured_data from './20260122_115615_blog_page_settings_structured_data';
import * as migration_20260122_120809_posts_collection_intro from './20260122_120809_posts_collection_intro';
import * as migration_20260122_121032_users_collection_default_role from './20260122_121032_users_collection_default_role';
import * as migration_20260122_122715_authors_collection from './20260122_122715_authors_collection';
import * as migration_20260122_124950_posts_collection_populate_authors from './20260122_124950_posts_collection_populate_authors';
import * as migration_20260122_163810_seo_fields_rename from './20260122_163810_seo_fields_rename';
import * as migration_20260122_195216_testimonials_global_component from './20260122_195216_testimonials_global_component';
import * as migration_20260123_073533_testimonials_preset_duration from './20260123_073533_testimonials_preset_duration';
import * as migration_20260123_090333_plugin_nested_docs from './20260123_090333_plugin_nested_docs';
import * as migration_20260123_101517_plugin_redirects_posts from './20260123_101517_plugin_redirects_posts';
import * as migration_20260126_065706_localization from './20260126_065706_localization';
import * as migration_20260126_094302_localization_localized from './20260126_094302_localization_localized';
import * as migration_20260126_101244_testimonials_presets_localized from './20260126_101244_testimonials_presets_localized';
import * as migration_20260126_102727_site_settings_default_og_type from './20260126_102727_site_settings_default_og_type';
import * as migration_20260127_130327_tenants_collection from './20260127_130327_tenants_collection';
import * as migration_20260127_132822_multi_tenant_plugin from './20260127_132822_multi_tenant_plugin';
import * as migration_20260127_170535_tenant_announcements from './20260127_170535_tenant_announcements';
import * as migration_20260127_171505_tenant_domain_unique from './20260127_171505_tenant_domain_unique';
import * as migration_20260129_120219_multi_tenancy from './20260129_120219_multi_tenancy';
import * as migration_20260130_182509_presets from './20260130_182509_presets';
import * as migration_20260202_074222_experiments from './20260202_074222_experiments';
import * as migration_20260202_111358_experiment_slug from './20260202_111358_experiment_slug';
import * as migration_20260202_191943_experiment_events from './20260202_191943_experiment_events';
import * as migration_20260203_091137_experiments_localized from './20260203_091137_experiments_localized';
import * as migration_20260203_114316_default_values from './20260203_114316_default_values';
import * as migration_20260203_121959_default_image from './20260203_121959_default_image';
import * as migration_20260204_093032_collection_site_settings_theme from './20260204_093032_collection_site_settings_theme';
import * as migration_20260204_214627_pages_collection_blocks_hero from './20260204_214627_pages_collection_blocks_hero';
import * as migration_20260205_070859_pages_collection_blocks_testimonials_list from './20260205_070859_pages_collection_blocks_testimonials_list';
import * as migration_20260205_091728_collection_presets_preview from './20260205_091728_collection_presets_preview';
import * as migration_20260209_101815_redirects_from_localized from './20260209_101815_redirects_from_localized';
import * as migration_20260209_111206_site_settings_header_footer from './20260209_111206_site_settings_header_footer';
import * as migration_20260209_112848_collections_page_header_footer from './20260209_112848_collections_page_header_footer';
import * as migration_20260210_103447_header_footer_name from './20260210_103447_header_footer_name';
import * as migration_20260215_212049_add_testimonials_list_to_experiment_event_types from './20260215_212049_add_testimonials_list_to_experiment_event_types';
import * as migration_20260223_201029_remove_experiment_fields_from_blocks from './20260223_201029_remove_experiment_fields_from_blocks';
import * as migration_20260223_201507_drop_experiments_and_experiment_events_collections from './20260223_201507_drop_experiments_and_experiment_events_collections';
import * as migration_20260223_202459_create_page_variants_collection from './20260223_202459_create_page_variants_collection';
import * as migration_20260223_203419_create_ab_manifest_global from './20260223_203419_create_ab_manifest_global';
import * as migration_20260224_093858_drop_ab_manifest_global from './20260224_093858_drop_ab_manifest_global';
import * as migration_20260225_163031_add_ab_testing_rules_to_page_variants_collection from './20260225_163031_add_ab_testing_rules_to_page_variants_collection';
import * as migration_20260226_195958_remove_tenant_field_from_page_variants_collection from './20260226_195958_remove_tenant_field_from_page_variants_collection';
import * as migration_20260317_011918_add_blocks_cards_grid_carousel_logos_links_list_blog_section from './20260317_011918_add_blocks_cards_grid_carousel_logos_links_list_blog_section';

export const migrations = [
  {
    up: migration_20260114_131012_initial.up,
    down: migration_20260114_131012_initial.down,
    name: '20260114_131012_initial',
  },
  {
    up: migration_20260114_132326_page_collectiion_slug.up,
    down: migration_20260114_132326_page_collectiion_slug.down,
    name: '20260114_132326_page_collectiion_slug',
  },
  {
    up: migration_20260114_134556_page_collection_background.up,
    down: migration_20260114_134556_page_collection_background.down,
    name: '20260114_134556_page_collection_background',
  },
  {
    up: migration_20260114_145130_page_collection_seo.up,
    down: migration_20260114_145130_page_collection_seo.down,
    name: '20260114_145130_page_collection_seo',
  },
  {
    up: migration_20260114_151954_page_collection_blocks.up,
    down: migration_20260114_151954_page_collection_blocks.down,
    name: '20260114_151954_page_collection_blocks',
  },
  {
    up: migration_20260115_065645_blocks_content_fields.up,
    down: migration_20260115_065645_blocks_content_fields.down,
    name: '20260115_065645_blocks_content_fields',
  },
  {
    up: migration_20260115_075229_blocks_text_section.up,
    down: migration_20260115_075229_blocks_text_section.down,
    name: '20260115_075229_blocks_text_section',
  },
  {
    up: migration_20260115_113035_page_collection_blocks.up,
    down: migration_20260115_113035_page_collection_blocks.down,
    name: '20260115_113035_page_collection_blocks',
  },
  {
    up: migration_20260115_113205_page_collection_hero.up,
    down: migration_20260115_113205_page_collection_hero.down,
    name: '20260115_113205_page_collection_hero',
  },
  {
    up: migration_20260115_115500_page_collection_links.up,
    down: migration_20260115_115500_page_collection_links.down,
    name: '20260115_115500_page_collection_links',
  },
  {
    up: migration_20260115_121928_page_collection_hero_overlay.up,
    down: migration_20260115_121928_page_collection_hero_overlay.down,
    name: '20260115_121928_page_collection_hero_overlay',
  },
  {
    up: migration_20260115_142537_page_collection_hero.up,
    down: migration_20260115_142537_page_collection_hero.down,
    name: '20260115_142537_page_collection_hero',
  },
  {
    up: migration_20260115_151606_page_collection_draft.up,
    down: migration_20260115_151606_page_collection_draft.down,
    name: '20260115_151606_page_collection_draft',
  },
  {
    up: migration_20260116_090251_header_footer.up,
    down: migration_20260116_090251_header_footer.down,
    name: '20260116_090251_header_footer',
  },
  {
    up: migration_20260116_133823_footer_group_name_field.up,
    down: migration_20260116_133823_footer_group_name_field.down,
    name: '20260116_133823_footer_group_name_field',
  },
  {
    up: migration_20260119_124322_merge.up,
    down: migration_20260119_124322_merge.down,
    name: '20260119_124322_merge',
  },
  {
    up: migration_20260119_130630_site_settings_versions.up,
    down: migration_20260119_130630_site_settings_versions.down,
    name: '20260119_130630_site_settings_versions',
  },
  {
    up: migration_20260119_135806_page_collection_index_follow.up,
    down: migration_20260119_135806_page_collection_index_follow.down,
    name: '20260119_135806_page_collection_index_follow',
  },
  {
    up: migration_20260120_062558_site_settings_admin_logo_icon.up,
    down: migration_20260120_062558_site_settings_admin_logo_icon.down,
    name: '20260120_062558_site_settings_admin_logo_icon',
  },
  {
    up: migration_20260120_094143_page_collection_folders_support.up,
    down: migration_20260120_094143_page_collection_folders_support.down,
    name: '20260120_094143_page_collection_folders_support',
  },
  {
    up: migration_20260120_095228_page_collection_folders_support.up,
    down: migration_20260120_095228_page_collection_folders_support.down,
    name: '20260120_095228_page_collection_folders_support',
  },
  {
    up: migration_20260120_095705_redirects.up,
    down: migration_20260120_095705_redirects.down,
    name: '20260120_095705_redirects',
  },
  {
    up: migration_20260120_112143_redirects_custom_fields.up,
    down: migration_20260120_112143_redirects_custom_fields.down,
    name: '20260120_112143_redirects_custom_fields',
  },
  {
    up: migration_20260120_121552_categories_collection.up,
    down: migration_20260120_121552_categories_collection.down,
    name: '20260120_121552_categories_collection',
  },
  {
    up: migration_20260120_122235_posts_collection.up,
    down: migration_20260120_122235_posts_collection.down,
    name: '20260120_122235_posts_collection',
  },
  {
    up: migration_20260120_123504_posts_collection_drafts.up,
    down: migration_20260120_123504_posts_collection_drafts.down,
    name: '20260120_123504_posts_collection_drafts',
  },
  {
    up: migration_20260120_124139_posts_collection_seo.up,
    down: migration_20260120_124139_posts_collection_seo.down,
    name: '20260120_124139_posts_collection_seo',
  },
  {
    up: migration_20260120_130251_posts_collection_seo.up,
    down: migration_20260120_130251_posts_collection_seo.down,
    name: '20260120_130251_posts_collection_seo',
  },
  {
    up: migration_20260121_092236_posts_collection_publishedAt_index.up,
    down: migration_20260121_092236_posts_collection_publishedAt_index.down,
    name: '20260121_092236_posts_collection_publishedAt_index',
  },
  {
    up: migration_20260121_100834_blog_page_settings.up,
    down: migration_20260121_100834_blog_page_settings.down,
    name: '20260121_100834_blog_page_settings',
  },
  {
    up: migration_20260121_145209_user_roles.up,
    down: migration_20260121_145209_user_roles.down,
    name: '20260121_145209_user_roles',
  },
  {
    up: migration_20260121_151317_user_name.up,
    down: migration_20260121_151317_user_name.down,
    name: '20260121_151317_user_name',
  },
  {
    up: migration_20260122_073115_link_relations.up,
    down: migration_20260122_073115_link_relations.down,
    name: '20260122_073115_link_relations',
  },
  {
    up: migration_20260122_113438_seo_fields_remove_og_type.up,
    down: migration_20260122_113438_seo_fields_remove_og_type.down,
    name: '20260122_113438_seo_fields_remove_og_type',
  },
  {
    up: migration_20260122_115129_seo_fields.up,
    down: migration_20260122_115129_seo_fields.down,
    name: '20260122_115129_seo_fields',
  },
  {
    up: migration_20260122_115615_blog_page_settings_structured_data.up,
    down: migration_20260122_115615_blog_page_settings_structured_data.down,
    name: '20260122_115615_blog_page_settings_structured_data',
  },
  {
    up: migration_20260122_120809_posts_collection_intro.up,
    down: migration_20260122_120809_posts_collection_intro.down,
    name: '20260122_120809_posts_collection_intro',
  },
  {
    up: migration_20260122_121032_users_collection_default_role.up,
    down: migration_20260122_121032_users_collection_default_role.down,
    name: '20260122_121032_users_collection_default_role',
  },
  {
    up: migration_20260122_122715_authors_collection.up,
    down: migration_20260122_122715_authors_collection.down,
    name: '20260122_122715_authors_collection',
  },
  {
    up: migration_20260122_124950_posts_collection_populate_authors.up,
    down: migration_20260122_124950_posts_collection_populate_authors.down,
    name: '20260122_124950_posts_collection_populate_authors',
  },
  {
    up: migration_20260122_163810_seo_fields_rename.up,
    down: migration_20260122_163810_seo_fields_rename.down,
    name: '20260122_163810_seo_fields_rename',
  },
  {
    up: migration_20260122_195216_testimonials_global_component.up,
    down: migration_20260122_195216_testimonials_global_component.down,
    name: '20260122_195216_testimonials_global_component',
  },
  {
    up: migration_20260123_073533_testimonials_preset_duration.up,
    down: migration_20260123_073533_testimonials_preset_duration.down,
    name: '20260123_073533_testimonials_preset_duration',
  },
  {
    up: migration_20260123_090333_plugin_nested_docs.up,
    down: migration_20260123_090333_plugin_nested_docs.down,
    name: '20260123_090333_plugin_nested_docs',
  },
  {
    up: migration_20260123_101517_plugin_redirects_posts.up,
    down: migration_20260123_101517_plugin_redirects_posts.down,
    name: '20260123_101517_plugin_redirects_posts',
  },
  {
    up: migration_20260126_065706_localization.up,
    down: migration_20260126_065706_localization.down,
    name: '20260126_065706_localization',
  },
  {
    up: migration_20260126_094302_localization_localized.up,
    down: migration_20260126_094302_localization_localized.down,
    name: '20260126_094302_localization_localized',
  },
  {
    up: migration_20260126_101244_testimonials_presets_localized.up,
    down: migration_20260126_101244_testimonials_presets_localized.down,
    name: '20260126_101244_testimonials_presets_localized',
  },
  {
    up: migration_20260126_102727_site_settings_default_og_type.up,
    down: migration_20260126_102727_site_settings_default_og_type.down,
    name: '20260126_102727_site_settings_default_og_type',
  },
  {
    up: migration_20260127_130327_tenants_collection.up,
    down: migration_20260127_130327_tenants_collection.down,
    name: '20260127_130327_tenants_collection',
  },
  {
    up: migration_20260127_132822_multi_tenant_plugin.up,
    down: migration_20260127_132822_multi_tenant_plugin.down,
    name: '20260127_132822_multi_tenant_plugin',
  },
  {
    up: migration_20260127_170535_tenant_announcements.up,
    down: migration_20260127_170535_tenant_announcements.down,
    name: '20260127_170535_tenant_announcements',
  },
  {
    up: migration_20260127_171505_tenant_domain_unique.up,
    down: migration_20260127_171505_tenant_domain_unique.down,
    name: '20260127_171505_tenant_domain_unique',
  },
  {
    up: migration_20260129_120219_multi_tenancy.up,
    down: migration_20260129_120219_multi_tenancy.down,
    name: '20260129_120219_multi_tenancy',
  },
  {
    up: migration_20260130_182509_presets.up,
    down: migration_20260130_182509_presets.down,
    name: '20260130_182509_presets',
  },
  {
    up: migration_20260202_074222_experiments.up,
    down: migration_20260202_074222_experiments.down,
    name: '20260202_074222_experiments',
  },
  {
    up: migration_20260202_111358_experiment_slug.up,
    down: migration_20260202_111358_experiment_slug.down,
    name: '20260202_111358_experiment_slug',
  },
  {
    up: migration_20260202_191943_experiment_events.up,
    down: migration_20260202_191943_experiment_events.down,
    name: '20260202_191943_experiment_events',
  },
  {
    up: migration_20260203_091137_experiments_localized.up,
    down: migration_20260203_091137_experiments_localized.down,
    name: '20260203_091137_experiments_localized',
  },
  {
    up: migration_20260203_114316_default_values.up,
    down: migration_20260203_114316_default_values.down,
    name: '20260203_114316_default_values',
  },
  {
    up: migration_20260203_121959_default_image.up,
    down: migration_20260203_121959_default_image.down,
    name: '20260203_121959_default_image',
  },
  {
    up: migration_20260204_093032_collection_site_settings_theme.up,
    down: migration_20260204_093032_collection_site_settings_theme.down,
    name: '20260204_093032_collection_site_settings_theme',
  },
  {
    up: migration_20260204_214627_pages_collection_blocks_hero.up,
    down: migration_20260204_214627_pages_collection_blocks_hero.down,
    name: '20260204_214627_pages_collection_blocks_hero',
  },
  {
    up: migration_20260205_070859_pages_collection_blocks_testimonials_list.up,
    down: migration_20260205_070859_pages_collection_blocks_testimonials_list.down,
    name: '20260205_070859_pages_collection_blocks_testimonials_list',
  },
  {
    up: migration_20260205_091728_collection_presets_preview.up,
    down: migration_20260205_091728_collection_presets_preview.down,
    name: '20260205_091728_collection_presets_preview',
  },
  {
    up: migration_20260209_101815_redirects_from_localized.up,
    down: migration_20260209_101815_redirects_from_localized.down,
    name: '20260209_101815_redirects_from_localized',
  },
  {
    up: migration_20260209_111206_site_settings_header_footer.up,
    down: migration_20260209_111206_site_settings_header_footer.down,
    name: '20260209_111206_site_settings_header_footer',
  },
  {
    up: migration_20260209_112848_collections_page_header_footer.up,
    down: migration_20260209_112848_collections_page_header_footer.down,
    name: '20260209_112848_collections_page_header_footer',
  },
  {
    up: migration_20260210_103447_header_footer_name.up,
    down: migration_20260210_103447_header_footer_name.down,
    name: '20260210_103447_header_footer_name',
  },
  {
    up: migration_20260215_212049_add_testimonials_list_to_experiment_event_types.up,
    down: migration_20260215_212049_add_testimonials_list_to_experiment_event_types.down,
    name: '20260215_212049_add_testimonials_list_to_experiment_event_types',
  },
  {
    up: migration_20260223_201029_remove_experiment_fields_from_blocks.up,
    down: migration_20260223_201029_remove_experiment_fields_from_blocks.down,
    name: '20260223_201029_remove_experiment_fields_from_blocks',
  },
  {
    up: migration_20260223_201507_drop_experiments_and_experiment_events_collections.up,
    down: migration_20260223_201507_drop_experiments_and_experiment_events_collections.down,
    name: '20260223_201507_drop_experiments_and_experiment_events_collections',
  },
  {
    up: migration_20260223_202459_create_page_variants_collection.up,
    down: migration_20260223_202459_create_page_variants_collection.down,
    name: '20260223_202459_create_page_variants_collection',
  },
  {
    up: migration_20260223_203419_create_ab_manifest_global.up,
    down: migration_20260223_203419_create_ab_manifest_global.down,
    name: '20260223_203419_create_ab_manifest_global',
  },
  {
    up: migration_20260224_093858_drop_ab_manifest_global.up,
    down: migration_20260224_093858_drop_ab_manifest_global.down,
    name: '20260224_093858_drop_ab_manifest_global',
  },
  {
    up: migration_20260225_163031_add_ab_testing_rules_to_page_variants_collection.up,
    down: migration_20260225_163031_add_ab_testing_rules_to_page_variants_collection.down,
    name: '20260225_163031_add_ab_testing_rules_to_page_variants_collection',
  },
  {
    up: migration_20260226_195958_remove_tenant_field_from_page_variants_collection.up,
    down: migration_20260226_195958_remove_tenant_field_from_page_variants_collection.down,
    name: '20260226_195958_remove_tenant_field_from_page_variants_collection',
  },
  {
    up: migration_20260317_011918_add_blocks_cards_grid_carousel_logos_links_list_blog_section.up,
    down: migration_20260317_011918_add_blocks_cards_grid_carousel_logos_links_list_blog_section.down,
    name: '20260317_011918_add_blocks_cards_grid_carousel_logos_links_list_blog_section'
  },
];
