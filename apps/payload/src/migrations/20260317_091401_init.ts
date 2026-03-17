import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'author', 'user');
  CREATE TYPE "public"."enum_media_default_for" AS ENUM('platform_default');
  CREATE TYPE "public"."enum_page_blocks_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_page_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum_page_blocks_carousel_effect" AS ENUM('slide', 'fade', 'cube', 'flip', 'coverflow', 'cards');
  CREATE TYPE "public"."enum_page_blocks_logos_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_blocks_logos_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_blocks_links_list_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_blocks_links_list_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_blocks_links_list_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_blocks_blog_section_style" AS ENUM('three-column', 'three-column-with-images', 'three-column-with-background-images');
  CREATE TYPE "public"."enum_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_page_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__page_v_blocks_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum__page_v_blocks_carousel_effect" AS ENUM('slide', 'fade', 'cube', 'flip', 'coverflow', 'cards');
  CREATE TYPE "public"."enum__page_v_blocks_logos_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_blocks_logos_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__page_v_blocks_links_list_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_blocks_links_list_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_blocks_links_list_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_style" AS ENUM('three-column', 'three-column-with-images', 'three-column-with-background-images');
  CREATE TYPE "public"."enum__page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__page_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__page_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_header_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'links_group');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_version_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_nav_items_type" AS ENUM('link', 'links_group');
  CREATE TYPE "public"."enum__header_v_version_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__header_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_footer_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_version_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum_page_variants_blocks_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_variants_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_variants_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_page_variants_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum_page_variants_blocks_cards_grid_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_variants_blocks_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_variants_blocks_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_variants_blocks_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum_page_variants_blocks_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum_page_variants_blocks_carousel_effect" AS ENUM('slide', 'fade', 'cube', 'flip', 'coverflow', 'cards');
  CREATE TYPE "public"."enum_page_variants_blocks_logos_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_variants_blocks_logos_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_variants_blocks_links_list_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_variants_blocks_links_list_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_variants_blocks_links_list_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_variants_blocks_blog_section_style" AS ENUM('three-column', 'three-column-with-images', 'three-column-with-background-images');
  CREATE TYPE "public"."enum_page_variants_bucket_i_d" AS ENUM('a', 'b', 'c');
  CREATE TYPE "public"."enum_page_variants_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_redirects_type" AS ENUM('307', '308');
  CREATE TYPE "public"."enum_presets_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_presets_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_type" AS ENUM('hero', 'testimonialsList');
  CREATE TYPE "public"."enum_presets_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media', 'page');
  CREATE TYPE "public"."enum_site_settings_seo_title_separator" AS ENUM('|', '-', '•');
  CREATE TYPE "public"."enum_site_settings_default_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_blog_blog_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__site_settings_v_version_seo_title_separator" AS ENUM('|', '-', '•');
  CREATE TYPE "public"."enum__site_settings_v_version_default_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__site_settings_v_version_blog_blog_meta_robots" AS ENUM('index', 'noindex');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media_default_for" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_media_default_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_page_blocks_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_page_blocks_hero_actions_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"enabled" boolean DEFAULT true,
  	"color" "enum_page_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_page_blocks_content_layout" DEFAULT 'image-text',
  	"image_id" integer,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer
  );
  
  CREATE TABLE "page_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_cards_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"link_type" "enum_page_blocks_cards_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_blocks_cards_grid_items_link_appearance" DEFAULT 'default',
  	"align_variant" "enum_page_blocks_cards_grid_items_align_variant" DEFAULT 'center',
  	"rounded" "enum_page_blocks_cards_grid_items_rounded" DEFAULT 'none',
  	"background_color" "enum_page_blocks_cards_grid_items_background_color" DEFAULT 'none'
  );
  
  CREATE TABLE "page_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb
  );
  
  CREATE TABLE "page_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"effect" "enum_page_blocks_carousel_effect" DEFAULT 'slide',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_page_blocks_logos_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "page_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_blocks_logos_align_variant" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_links_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_blocks_links_list_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_blocks_links_list_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_blocks_links_list_align_variant" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"style" "enum_page_blocks_blog_section_style" DEFAULT 'three-column',
  	"posts_limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_id" integer,
  	"footer_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"parent_id" integer,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_page_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "page_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_robots" "enum_page_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_page_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__page_v_blocks_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum__page_v_blocks_hero_actions_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"enabled" boolean DEFAULT true,
  	"color" "enum__page_v_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__page_v_blocks_content_layout" DEFAULT 'image-text',
  	"image_id" integer,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonial_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_cards_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"link_type" "enum__page_v_blocks_cards_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__page_v_blocks_cards_grid_items_link_appearance" DEFAULT 'default',
  	"align_variant" "enum__page_v_blocks_cards_grid_items_align_variant" DEFAULT 'center',
  	"rounded" "enum__page_v_blocks_cards_grid_items_rounded" DEFAULT 'none',
  	"background_color" "enum__page_v_blocks_cards_grid_items_background_color" DEFAULT 'none',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"effect" "enum__page_v_blocks_carousel_effect" DEFAULT 'slide',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__page_v_blocks_logos_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align_variant" "enum__page_v_blocks_logos_align_variant" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_links_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__page_v_blocks_links_list_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__page_v_blocks_links_list_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align_variant" "enum__page_v_blocks_links_list_align_variant" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"style" "enum__page_v_blocks_blog_section_style" DEFAULT 'three-column',
  	"posts_limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_header_id" integer,
  	"version_footer_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_parent_id" integer,
  	"version_folder_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__page_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_page_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_robots" "enum__page_v_version_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"related_posts_intro" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_robots" "enum_posts_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"authors_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_image_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_related_posts_intro" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_robots" "enum__posts_v_version_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"authors_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"company" varchar,
  	"avatar_id" integer,
  	"content" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"position" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"group_name" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_header_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "header_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_header_v_version_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__header_v_version_nav_items_type" DEFAULT 'link',
  	"link_type" "enum__header_v_version_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"group_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_header_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__header_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__header_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_header_v_locales" (
  	"version_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_header_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group_name" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_footer_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_footer_v_version_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_logo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__footer_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__footer_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_footer_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "page_variants_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_page_variants_blocks_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar NOT NULL,
  	"appearance" "enum_page_variants_blocks_hero_actions_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_variants_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"media_id" integer NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"color" "enum_page_variants_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_page_variants_blocks_content_layout" DEFAULT 'image-text' NOT NULL,
  	"image_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "page_variants_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer NOT NULL
  );
  
  CREATE TABLE "page_variants_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_cards_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer NOT NULL,
  	"link_type" "enum_page_variants_blocks_cards_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_variants_blocks_cards_grid_items_link_appearance" DEFAULT 'default',
  	"align_variant" "enum_page_variants_blocks_cards_grid_items_align_variant" DEFAULT 'center',
  	"rounded" "enum_page_variants_blocks_cards_grid_items_rounded" DEFAULT 'none',
  	"background_color" "enum_page_variants_blocks_cards_grid_items_background_color" DEFAULT 'none'
  );
  
  CREATE TABLE "page_variants_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"text" jsonb
  );
  
  CREATE TABLE "page_variants_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"effect" "enum_page_variants_blocks_carousel_effect" DEFAULT 'slide',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link_type" "enum_page_variants_blocks_logos_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "page_variants_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_variants_blocks_logos_align_variant" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_links_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_variants_blocks_links_list_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_variants_blocks_links_list_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_variants_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_variants_blocks_links_list_align_variant" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"style" "enum_page_variants_blocks_blog_section_style" DEFAULT 'three-column',
  	"posts_limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_id" integer,
  	"footer_id" integer,
  	"page_id" integer NOT NULL,
  	"bucket_i_d" "enum_page_variants_bucket_i_d" NOT NULL,
  	"ab_testing_rules_pass_percentage" numeric DEFAULT 50 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "page_variants_locales" (
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_robots" "enum_page_variants_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "page_variants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_locales" (
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" DEFAULT '307' NOT NULL,
  	"is_active" boolean DEFAULT true NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "presets_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_presets_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"label" varchar,
  	"appearance" "enum_presets_hero_actions_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "presets_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer
  );
  
  CREATE TABLE "presets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"preview_id" integer,
  	"type" "enum_presets_type" NOT NULL,
  	"hero_title" varchar,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"hero_enabled" boolean DEFAULT true,
  	"hero_color" "enum_presets_hero_color" DEFAULT 'black',
  	"hero_opacity" numeric DEFAULT 40,
  	"testimonials_list_heading" varchar,
  	"testimonials_list_subheading" varchar,
  	"testimonials_list_duration" numeric DEFAULT 60,
  	"testimonials_list_show_rating" boolean DEFAULT true,
  	"testimonials_list_show_avatar" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "presets_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"page_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"page_id" integer,
  	"categories_id" integer,
  	"authors_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer,
  	"header_id" integer,
  	"footer_id" integer,
  	"page_variants_id" integer,
  	"redirects_id" integer,
  	"presets_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_id" integer,
  	"footer_id" integer,
  	"admin_logo_id" integer,
  	"admin_icon_id" integer,
  	"seo_title_separator" "enum_site_settings_seo_title_separator" DEFAULT '|',
  	"default_og_image_id" integer,
  	"default_twitter_card" "enum_site_settings_default_twitter_card" DEFAULT 'summary_large_image',
  	"_status" "enum_site_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar,
  	"seo_title_suffix" varchar,
  	"default_og_title" varchar,
  	"default_description" varchar,
  	"default_og_description" varchar,
  	"og_site_name" varchar,
  	"twitter_site" varchar,
  	"twitter_creator" varchar,
  	"not_found_title" varchar,
  	"not_found_description" varchar,
  	"blog_blog_title" varchar,
  	"blog_blog_description" varchar,
  	"blog_blog_meta_title" varchar,
  	"blog_blog_meta_image_id" integer,
  	"blog_blog_meta_description" varchar,
  	"blog_blog_meta_robots" "enum_site_settings_blog_blog_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_id" integer,
  	"version_footer_id" integer,
  	"version_admin_logo_id" integer,
  	"version_admin_icon_id" integer,
  	"version_seo_title_separator" "enum__site_settings_v_version_seo_title_separator" DEFAULT '|',
  	"version_default_og_image_id" integer,
  	"version_default_twitter_card" "enum__site_settings_v_version_default_twitter_card" DEFAULT 'summary_large_image',
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__site_settings_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_site_name" varchar,
  	"version_seo_title_suffix" varchar,
  	"version_default_og_title" varchar,
  	"version_default_description" varchar,
  	"version_default_og_description" varchar,
  	"version_og_site_name" varchar,
  	"version_twitter_site" varchar,
  	"version_twitter_creator" varchar,
  	"version_not_found_title" varchar,
  	"version_not_found_description" varchar,
  	"version_blog_blog_title" varchar,
  	"version_blog_blog_description" varchar,
  	"version_blog_blog_meta_title" varchar,
  	"version_blog_blog_meta_image_id" integer,
  	"version_blog_blog_meta_description" varchar,
  	"version_blog_blog_meta_robots" "enum__site_settings_v_version_blog_blog_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_default_for" ADD CONSTRAINT "media_default_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_hero_actions" ADD CONSTRAINT "page_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_text_section" ADD CONSTRAINT "page_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_faq_items" ADD CONSTRAINT "page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_faq" ADD CONSTRAINT "page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_cards_grid_items" ADD CONSTRAINT "page_blocks_cards_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_cards_grid_items" ADD CONSTRAINT "page_blocks_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_cards_grid" ADD CONSTRAINT "page_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_carousel_slides" ADD CONSTRAINT "page_blocks_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_carousel_slides" ADD CONSTRAINT "page_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_carousel" ADD CONSTRAINT "page_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_logos_items" ADD CONSTRAINT "page_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_logos_items" ADD CONSTRAINT "page_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_logos" ADD CONSTRAINT "page_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_links_list_links" ADD CONSTRAINT "page_blocks_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_links_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_links_list" ADD CONSTRAINT "page_blocks_links_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_blog_section" ADD CONSTRAINT "page_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs_doc_id_page_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_header_id_header_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_footer_id_footer_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero_actions" ADD CONSTRAINT "_page_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_text_section" ADD CONSTRAINT "_page_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_faq_items" ADD CONSTRAINT "_page_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_faq" ADD CONSTRAINT "_page_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "_page_v_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "_page_v_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD CONSTRAINT "_page_v_blocks_cards_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD CONSTRAINT "_page_v_blocks_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_cards_grid" ADD CONSTRAINT "_page_v_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD CONSTRAINT "_page_v_blocks_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD CONSTRAINT "_page_v_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_carousel" ADD CONSTRAINT "_page_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_logos_items" ADD CONSTRAINT "_page_v_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_logos_items" ADD CONSTRAINT "_page_v_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_logos" ADD CONSTRAINT "_page_v_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_links_list_links" ADD CONSTRAINT "_page_v_blocks_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_links_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_links_list" ADD CONSTRAINT "_page_v_blocks_links_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_blog_section" ADD CONSTRAINT "_page_v_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_version_breadcrumbs" ADD CONSTRAINT "_page_v_version_breadcrumbs_doc_id_page_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_version_breadcrumbs" ADD CONSTRAINT "_page_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_header_id_header_id_fk" FOREIGN KEY ("version_header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_footer_id_footer_id_fk" FOREIGN KEY ("version_footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_parent_id_page_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_links" ADD CONSTRAINT "header_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items_links" ADD CONSTRAINT "_header_v_version_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items" ADD CONSTRAINT "_header_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_parent_id_header_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_locales" ADD CONSTRAINT "_header_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_links" ADD CONSTRAINT "footer_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_items_links" ADD CONSTRAINT "_footer_v_version_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_items" ADD CONSTRAINT "_footer_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_parent_id_footer_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_hero_actions" ADD CONSTRAINT "page_variants_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_hero" ADD CONSTRAINT "page_variants_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_hero" ADD CONSTRAINT "page_variants_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_text_section" ADD CONSTRAINT "page_variants_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_content" ADD CONSTRAINT "page_variants_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_content" ADD CONSTRAINT "page_variants_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_faq_items" ADD CONSTRAINT "page_variants_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_faq" ADD CONSTRAINT "page_variants_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_variants_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "page_variants_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_testimonials_list" ADD CONSTRAINT "page_variants_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_cards_grid_items" ADD CONSTRAINT "page_variants_blocks_cards_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_cards_grid_items" ADD CONSTRAINT "page_variants_blocks_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_cards_grid" ADD CONSTRAINT "page_variants_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_carousel_slides" ADD CONSTRAINT "page_variants_blocks_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_carousel_slides" ADD CONSTRAINT "page_variants_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_carousel" ADD CONSTRAINT "page_variants_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_logos_items" ADD CONSTRAINT "page_variants_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_logos_items" ADD CONSTRAINT "page_variants_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_logos" ADD CONSTRAINT "page_variants_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_links_list_links" ADD CONSTRAINT "page_variants_blocks_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants_blocks_links_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_links_list" ADD CONSTRAINT "page_variants_blocks_links_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_blocks_blog_section" ADD CONSTRAINT "page_variants_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants" ADD CONSTRAINT "page_variants_header_id_header_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants" ADD CONSTRAINT "page_variants_footer_id_footer_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants" ADD CONSTRAINT "page_variants_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_locales" ADD CONSTRAINT "page_variants_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_variants_locales" ADD CONSTRAINT "page_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_rels" ADD CONSTRAINT "page_variants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_rels" ADD CONSTRAINT "page_variants_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_variants_rels" ADD CONSTRAINT "page_variants_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_locales" ADD CONSTRAINT "redirects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_hero_actions" ADD CONSTRAINT "presets_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_preview_id_media_id_fk" FOREIGN KEY ("preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_locales" ADD CONSTRAINT "presets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_header_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_footer_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_variants_fk" FOREIGN KEY ("page_variants_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_presets_fk" FOREIGN KEY ("presets_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_header_id_header_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_footer_id_footer_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_admin_logo_id_media_id_fk" FOREIGN KEY ("admin_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_admin_icon_id_media_id_fk" FOREIGN KEY ("admin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_blog_blog_meta_image_id_media_id_fk" FOREIGN KEY ("blog_blog_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_header_id_header_id_fk" FOREIGN KEY ("version_header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_footer_id_footer_id_fk" FOREIGN KEY ("version_footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_admin_logo_id_media_id_fk" FOREIGN KEY ("version_admin_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_admin_icon_id_media_id_fk" FOREIGN KEY ("version_admin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_version_blog_blog_meta_image_id_media_id_fk" FOREIGN KEY ("version_blog_blog_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_default_for_order_idx" ON "media_default_for" USING btree ("order");
  CREATE INDEX "media_default_for_parent_idx" ON "media_default_for" USING btree ("parent_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_blocks_hero_actions_order_idx" ON "page_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_actions_parent_id_idx" ON "page_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_actions_locale_idx" ON "page_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "page_blocks_hero_order_idx" ON "page_blocks_hero" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_parent_id_idx" ON "page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_path_idx" ON "page_blocks_hero" USING btree ("_path");
  CREATE INDEX "page_blocks_hero_locale_idx" ON "page_blocks_hero" USING btree ("_locale");
  CREATE INDEX "page_blocks_hero_media_idx" ON "page_blocks_hero" USING btree ("media_id");
  CREATE INDEX "page_blocks_text_section_order_idx" ON "page_blocks_text_section" USING btree ("_order");
  CREATE INDEX "page_blocks_text_section_parent_id_idx" ON "page_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_text_section_path_idx" ON "page_blocks_text_section" USING btree ("_path");
  CREATE INDEX "page_blocks_text_section_locale_idx" ON "page_blocks_text_section" USING btree ("_locale");
  CREATE INDEX "page_blocks_content_order_idx" ON "page_blocks_content" USING btree ("_order");
  CREATE INDEX "page_blocks_content_parent_id_idx" ON "page_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_content_path_idx" ON "page_blocks_content" USING btree ("_path");
  CREATE INDEX "page_blocks_content_locale_idx" ON "page_blocks_content" USING btree ("_locale");
  CREATE INDEX "page_blocks_content_image_idx" ON "page_blocks_content" USING btree ("image_id");
  CREATE INDEX "page_blocks_faq_items_order_idx" ON "page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "page_blocks_faq_items_parent_id_idx" ON "page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_faq_items_locale_idx" ON "page_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_faq_order_idx" ON "page_blocks_faq" USING btree ("_order");
  CREATE INDEX "page_blocks_faq_parent_id_idx" ON "page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_faq_path_idx" ON "page_blocks_faq" USING btree ("_path");
  CREATE INDEX "page_blocks_faq_locale_idx" ON "page_blocks_faq" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_order_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_locale_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_list_testimonial_items_testimon_idx" ON "page_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "page_blocks_testimonials_list_order_idx" ON "page_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_list_parent_id_idx" ON "page_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_list_path_idx" ON "page_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "page_blocks_testimonials_list_locale_idx" ON "page_blocks_testimonials_list" USING btree ("_locale");
  CREATE INDEX "page_blocks_cards_grid_items_order_idx" ON "page_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX "page_blocks_cards_grid_items_parent_id_idx" ON "page_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_cards_grid_items_locale_idx" ON "page_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_cards_grid_items_image_idx" ON "page_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX "page_blocks_cards_grid_order_idx" ON "page_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "page_blocks_cards_grid_parent_id_idx" ON "page_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_cards_grid_path_idx" ON "page_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "page_blocks_cards_grid_locale_idx" ON "page_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX "page_blocks_carousel_slides_order_idx" ON "page_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "page_blocks_carousel_slides_parent_id_idx" ON "page_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_carousel_slides_locale_idx" ON "page_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX "page_blocks_carousel_slides_image_idx" ON "page_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX "page_blocks_carousel_order_idx" ON "page_blocks_carousel" USING btree ("_order");
  CREATE INDEX "page_blocks_carousel_parent_id_idx" ON "page_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_carousel_path_idx" ON "page_blocks_carousel" USING btree ("_path");
  CREATE INDEX "page_blocks_carousel_locale_idx" ON "page_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "page_blocks_logos_items_order_idx" ON "page_blocks_logos_items" USING btree ("_order");
  CREATE INDEX "page_blocks_logos_items_parent_id_idx" ON "page_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_logos_items_locale_idx" ON "page_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_logos_items_image_idx" ON "page_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX "page_blocks_logos_order_idx" ON "page_blocks_logos" USING btree ("_order");
  CREATE INDEX "page_blocks_logos_parent_id_idx" ON "page_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_logos_path_idx" ON "page_blocks_logos" USING btree ("_path");
  CREATE INDEX "page_blocks_logos_locale_idx" ON "page_blocks_logos" USING btree ("_locale");
  CREATE INDEX "page_blocks_links_list_links_order_idx" ON "page_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX "page_blocks_links_list_links_parent_id_idx" ON "page_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_links_list_links_locale_idx" ON "page_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX "page_blocks_links_list_order_idx" ON "page_blocks_links_list" USING btree ("_order");
  CREATE INDEX "page_blocks_links_list_parent_id_idx" ON "page_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_links_list_path_idx" ON "page_blocks_links_list" USING btree ("_path");
  CREATE INDEX "page_blocks_links_list_locale_idx" ON "page_blocks_links_list" USING btree ("_locale");
  CREATE INDEX "page_blocks_blog_section_order_idx" ON "page_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "page_blocks_blog_section_parent_id_idx" ON "page_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_blog_section_path_idx" ON "page_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "page_blocks_blog_section_locale_idx" ON "page_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX "page_breadcrumbs_order_idx" ON "page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "page_breadcrumbs_parent_id_idx" ON "page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "page_breadcrumbs_locale_idx" ON "page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "page_breadcrumbs_doc_idx" ON "page_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "page_header_idx" ON "page" USING btree ("header_id");
  CREATE INDEX "page_footer_idx" ON "page" USING btree ("footer_id");
  CREATE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "page_parent_idx" ON "page" USING btree ("parent_id");
  CREATE INDEX "page_folder_idx" ON "page" USING btree ("folder_id");
  CREATE INDEX "page_updated_at_idx" ON "page" USING btree ("updated_at");
  CREATE INDEX "page_created_at_idx" ON "page" USING btree ("created_at");
  CREATE INDEX "page__status_idx" ON "page" USING btree ("_status");
  CREATE INDEX "page_meta_meta_image_idx" ON "page_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "page_locales_locale_parent_id_unique" ON "page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_rels_order_idx" ON "page_rels" USING btree ("order");
  CREATE INDEX "page_rels_parent_idx" ON "page_rels" USING btree ("parent_id");
  CREATE INDEX "page_rels_path_idx" ON "page_rels" USING btree ("path");
  CREATE INDEX "page_rels_locale_idx" ON "page_rels" USING btree ("locale");
  CREATE INDEX "page_rels_page_id_idx" ON "page_rels" USING btree ("page_id","locale");
  CREATE INDEX "page_rels_posts_id_idx" ON "page_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_page_v_blocks_hero_actions_order_idx" ON "_page_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_actions_parent_id_idx" ON "_page_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_actions_locale_idx" ON "_page_v_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_hero_order_idx" ON "_page_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_parent_id_idx" ON "_page_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_path_idx" ON "_page_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_hero_locale_idx" ON "_page_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_hero_media_idx" ON "_page_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_page_v_blocks_text_section_order_idx" ON "_page_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_text_section_parent_id_idx" ON "_page_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_text_section_path_idx" ON "_page_v_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_text_section_locale_idx" ON "_page_v_blocks_text_section" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_content_order_idx" ON "_page_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_content_parent_id_idx" ON "_page_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_content_path_idx" ON "_page_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_content_locale_idx" ON "_page_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_content_image_idx" ON "_page_v_blocks_content" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_faq_items_order_idx" ON "_page_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_faq_items_parent_id_idx" ON "_page_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_faq_items_locale_idx" ON "_page_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_faq_order_idx" ON "_page_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_faq_parent_id_idx" ON "_page_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_faq_path_idx" ON "_page_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_faq_locale_idx" ON "_page_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_order_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_locale_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_list_testimonial_items_testi_idx" ON "_page_v_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_order_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_list_parent_id_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_path_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_testimonials_list_locale_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_cards_grid_items_order_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_cards_grid_items_parent_id_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_cards_grid_items_locale_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_cards_grid_items_image_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_cards_grid_order_idx" ON "_page_v_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_cards_grid_parent_id_idx" ON "_page_v_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_cards_grid_path_idx" ON "_page_v_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_cards_grid_locale_idx" ON "_page_v_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_carousel_slides_order_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_carousel_slides_parent_id_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_carousel_slides_locale_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_carousel_slides_image_idx" ON "_page_v_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_carousel_order_idx" ON "_page_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_carousel_parent_id_idx" ON "_page_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_carousel_path_idx" ON "_page_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_carousel_locale_idx" ON "_page_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_logos_items_order_idx" ON "_page_v_blocks_logos_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_logos_items_parent_id_idx" ON "_page_v_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_logos_items_locale_idx" ON "_page_v_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_logos_items_image_idx" ON "_page_v_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_logos_order_idx" ON "_page_v_blocks_logos" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_logos_parent_id_idx" ON "_page_v_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_logos_path_idx" ON "_page_v_blocks_logos" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_logos_locale_idx" ON "_page_v_blocks_logos" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_links_list_links_order_idx" ON "_page_v_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_links_list_links_parent_id_idx" ON "_page_v_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_links_list_links_locale_idx" ON "_page_v_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_links_list_order_idx" ON "_page_v_blocks_links_list" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_links_list_parent_id_idx" ON "_page_v_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_links_list_path_idx" ON "_page_v_blocks_links_list" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_links_list_locale_idx" ON "_page_v_blocks_links_list" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_blog_section_order_idx" ON "_page_v_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_blog_section_parent_id_idx" ON "_page_v_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_blog_section_path_idx" ON "_page_v_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_blog_section_locale_idx" ON "_page_v_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX "_page_v_version_breadcrumbs_order_idx" ON "_page_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_page_v_version_breadcrumbs_parent_id_idx" ON "_page_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_page_v_version_breadcrumbs_locale_idx" ON "_page_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_page_v_version_breadcrumbs_doc_idx" ON "_page_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_page_v_parent_idx" ON "_page_v" USING btree ("parent_id");
  CREATE INDEX "_page_v_version_version_header_idx" ON "_page_v" USING btree ("version_header_id");
  CREATE INDEX "_page_v_version_version_footer_idx" ON "_page_v" USING btree ("version_footer_id");
  CREATE INDEX "_page_v_version_version_slug_idx" ON "_page_v" USING btree ("version_slug");
  CREATE INDEX "_page_v_version_version_parent_idx" ON "_page_v" USING btree ("version_parent_id");
  CREATE INDEX "_page_v_version_version_folder_idx" ON "_page_v" USING btree ("version_folder_id");
  CREATE INDEX "_page_v_version_version_updated_at_idx" ON "_page_v" USING btree ("version_updated_at");
  CREATE INDEX "_page_v_version_version_created_at_idx" ON "_page_v" USING btree ("version_created_at");
  CREATE INDEX "_page_v_version_version__status_idx" ON "_page_v" USING btree ("version__status");
  CREATE INDEX "_page_v_created_at_idx" ON "_page_v" USING btree ("created_at");
  CREATE INDEX "_page_v_updated_at_idx" ON "_page_v" USING btree ("updated_at");
  CREATE INDEX "_page_v_snapshot_idx" ON "_page_v" USING btree ("snapshot");
  CREATE INDEX "_page_v_published_locale_idx" ON "_page_v" USING btree ("published_locale");
  CREATE INDEX "_page_v_latest_idx" ON "_page_v" USING btree ("latest");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v_locales" USING btree ("version_meta_image_id");
  CREATE UNIQUE INDEX "_page_v_locales_locale_parent_id_unique" ON "_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_v_rels_order_idx" ON "_page_v_rels" USING btree ("order");
  CREATE INDEX "_page_v_rels_parent_idx" ON "_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_page_v_rels_path_idx" ON "_page_v_rels" USING btree ("path");
  CREATE INDEX "_page_v_rels_locale_idx" ON "_page_v_rels" USING btree ("locale");
  CREATE INDEX "_page_v_rels_page_id_idx" ON "_page_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_page_v_rels_posts_id_idx" ON "_page_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published_at");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_authors_id_idx" ON "posts_rels" USING btree ("authors_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_version_published_at_idx" ON "_posts_v" USING btree ("version_published_at");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_authors_id_idx" ON "_posts_v_rels" USING btree ("authors_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_links_order_idx" ON "header_nav_items_links" USING btree ("_order");
  CREATE INDEX "header_nav_items_links_parent_id_idx" ON "header_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_links_locale_idx" ON "header_nav_items_links" USING btree ("_locale");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_locale_idx" ON "header_nav_items" USING btree ("_locale");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_updated_at_idx" ON "header" USING btree ("updated_at");
  CREATE INDEX "header_created_at_idx" ON "header" USING btree ("created_at");
  CREATE INDEX "header__status_idx" ON "header" USING btree ("_status");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_locale_idx" ON "header_rels" USING btree ("locale");
  CREATE INDEX "header_rels_page_id_idx" ON "header_rels" USING btree ("page_id","locale");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_header_v_version_nav_items_links_order_idx" ON "_header_v_version_nav_items_links" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_links_parent_id_idx" ON "_header_v_version_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_links_locale_idx" ON "_header_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_header_v_version_nav_items_order_idx" ON "_header_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_parent_id_idx" ON "_header_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_locale_idx" ON "_header_v_version_nav_items" USING btree ("_locale");
  CREATE INDEX "_header_v_parent_idx" ON "_header_v" USING btree ("parent_id");
  CREATE INDEX "_header_v_version_version_logo_idx" ON "_header_v" USING btree ("version_logo_id");
  CREATE INDEX "_header_v_version_version_updated_at_idx" ON "_header_v" USING btree ("version_updated_at");
  CREATE INDEX "_header_v_version_version_created_at_idx" ON "_header_v" USING btree ("version_created_at");
  CREATE INDEX "_header_v_version_version__status_idx" ON "_header_v" USING btree ("version__status");
  CREATE INDEX "_header_v_created_at_idx" ON "_header_v" USING btree ("created_at");
  CREATE INDEX "_header_v_updated_at_idx" ON "_header_v" USING btree ("updated_at");
  CREATE INDEX "_header_v_snapshot_idx" ON "_header_v" USING btree ("snapshot");
  CREATE INDEX "_header_v_published_locale_idx" ON "_header_v" USING btree ("published_locale");
  CREATE INDEX "_header_v_latest_idx" ON "_header_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_header_v_locales_locale_parent_id_unique" ON "_header_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_header_v_rels_order_idx" ON "_header_v_rels" USING btree ("order");
  CREATE INDEX "_header_v_rels_parent_idx" ON "_header_v_rels" USING btree ("parent_id");
  CREATE INDEX "_header_v_rels_path_idx" ON "_header_v_rels" USING btree ("path");
  CREATE INDEX "_header_v_rels_locale_idx" ON "_header_v_rels" USING btree ("locale");
  CREATE INDEX "_header_v_rels_page_id_idx" ON "_header_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "footer_nav_items_links_order_idx" ON "footer_nav_items_links" USING btree ("_order");
  CREATE INDEX "footer_nav_items_links_parent_id_idx" ON "footer_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_links_locale_idx" ON "footer_nav_items_links" USING btree ("_locale");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_locale_idx" ON "footer_nav_items" USING btree ("_locale");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "footer_updated_at_idx" ON "footer" USING btree ("updated_at");
  CREATE INDEX "footer_created_at_idx" ON "footer" USING btree ("created_at");
  CREATE INDEX "footer__status_idx" ON "footer" USING btree ("_status");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_locale_idx" ON "footer_rels" USING btree ("locale");
  CREATE INDEX "footer_rels_page_id_idx" ON "footer_rels" USING btree ("page_id","locale");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_footer_v_version_nav_items_links_order_idx" ON "_footer_v_version_nav_items_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_items_links_parent_id_idx" ON "_footer_v_version_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_nav_items_links_locale_idx" ON "_footer_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_footer_v_version_nav_items_order_idx" ON "_footer_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_items_parent_id_idx" ON "_footer_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_nav_items_locale_idx" ON "_footer_v_version_nav_items" USING btree ("_locale");
  CREATE INDEX "_footer_v_parent_idx" ON "_footer_v" USING btree ("parent_id");
  CREATE INDEX "_footer_v_version_version_logo_idx" ON "_footer_v" USING btree ("version_logo_id");
  CREATE INDEX "_footer_v_version_version_updated_at_idx" ON "_footer_v" USING btree ("version_updated_at");
  CREATE INDEX "_footer_v_version_version_created_at_idx" ON "_footer_v" USING btree ("version_created_at");
  CREATE INDEX "_footer_v_version_version__status_idx" ON "_footer_v" USING btree ("version__status");
  CREATE INDEX "_footer_v_created_at_idx" ON "_footer_v" USING btree ("created_at");
  CREATE INDEX "_footer_v_updated_at_idx" ON "_footer_v" USING btree ("updated_at");
  CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" USING btree ("snapshot");
  CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" USING btree ("published_locale");
  CREATE INDEX "_footer_v_latest_idx" ON "_footer_v" USING btree ("latest");
  CREATE INDEX "_footer_v_rels_order_idx" ON "_footer_v_rels" USING btree ("order");
  CREATE INDEX "_footer_v_rels_parent_idx" ON "_footer_v_rels" USING btree ("parent_id");
  CREATE INDEX "_footer_v_rels_path_idx" ON "_footer_v_rels" USING btree ("path");
  CREATE INDEX "_footer_v_rels_locale_idx" ON "_footer_v_rels" USING btree ("locale");
  CREATE INDEX "_footer_v_rels_page_id_idx" ON "_footer_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "page_variants_blocks_hero_actions_order_idx" ON "page_variants_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_hero_actions_parent_id_idx" ON "page_variants_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_hero_actions_locale_idx" ON "page_variants_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_hero_order_idx" ON "page_variants_blocks_hero" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_hero_parent_id_idx" ON "page_variants_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_hero_path_idx" ON "page_variants_blocks_hero" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_hero_locale_idx" ON "page_variants_blocks_hero" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_hero_media_idx" ON "page_variants_blocks_hero" USING btree ("media_id");
  CREATE INDEX "page_variants_blocks_text_section_order_idx" ON "page_variants_blocks_text_section" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_text_section_parent_id_idx" ON "page_variants_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_text_section_path_idx" ON "page_variants_blocks_text_section" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_text_section_locale_idx" ON "page_variants_blocks_text_section" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_content_order_idx" ON "page_variants_blocks_content" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_content_parent_id_idx" ON "page_variants_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_content_path_idx" ON "page_variants_blocks_content" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_content_locale_idx" ON "page_variants_blocks_content" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_content_image_idx" ON "page_variants_blocks_content" USING btree ("image_id");
  CREATE INDEX "page_variants_blocks_faq_items_order_idx" ON "page_variants_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_faq_items_parent_id_idx" ON "page_variants_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_faq_items_locale_idx" ON "page_variants_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_faq_order_idx" ON "page_variants_blocks_faq" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_faq_parent_id_idx" ON "page_variants_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_faq_path_idx" ON "page_variants_blocks_faq" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_faq_locale_idx" ON "page_variants_blocks_faq" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_testimonials_list_testimonial_items_order_idx" ON "page_variants_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "page_variants_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_testimonials_list_testimonial_items_locale_idx" ON "page_variants_blocks_testimonials_list_testimonial_items" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_testimonials_list_testimonial_items_idx" ON "page_variants_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "page_variants_blocks_testimonials_list_order_idx" ON "page_variants_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_testimonials_list_parent_id_idx" ON "page_variants_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_testimonials_list_path_idx" ON "page_variants_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_testimonials_list_locale_idx" ON "page_variants_blocks_testimonials_list" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_cards_grid_items_order_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_cards_grid_items_parent_id_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_cards_grid_items_locale_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_cards_grid_items_image_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX "page_variants_blocks_cards_grid_order_idx" ON "page_variants_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_cards_grid_parent_id_idx" ON "page_variants_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_cards_grid_path_idx" ON "page_variants_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_cards_grid_locale_idx" ON "page_variants_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_carousel_slides_order_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_carousel_slides_parent_id_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_carousel_slides_locale_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_carousel_slides_image_idx" ON "page_variants_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX "page_variants_blocks_carousel_order_idx" ON "page_variants_blocks_carousel" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_carousel_parent_id_idx" ON "page_variants_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_carousel_path_idx" ON "page_variants_blocks_carousel" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_carousel_locale_idx" ON "page_variants_blocks_carousel" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_logos_items_order_idx" ON "page_variants_blocks_logos_items" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_logos_items_parent_id_idx" ON "page_variants_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_logos_items_locale_idx" ON "page_variants_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_logos_items_image_idx" ON "page_variants_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX "page_variants_blocks_logos_order_idx" ON "page_variants_blocks_logos" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_logos_parent_id_idx" ON "page_variants_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_logos_path_idx" ON "page_variants_blocks_logos" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_logos_locale_idx" ON "page_variants_blocks_logos" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_links_list_links_order_idx" ON "page_variants_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_links_list_links_parent_id_idx" ON "page_variants_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_links_list_links_locale_idx" ON "page_variants_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_links_list_order_idx" ON "page_variants_blocks_links_list" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_links_list_parent_id_idx" ON "page_variants_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_links_list_path_idx" ON "page_variants_blocks_links_list" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_links_list_locale_idx" ON "page_variants_blocks_links_list" USING btree ("_locale");
  CREATE INDEX "page_variants_blocks_blog_section_order_idx" ON "page_variants_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "page_variants_blocks_blog_section_parent_id_idx" ON "page_variants_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "page_variants_blocks_blog_section_path_idx" ON "page_variants_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "page_variants_blocks_blog_section_locale_idx" ON "page_variants_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX "page_variants_header_idx" ON "page_variants" USING btree ("header_id");
  CREATE INDEX "page_variants_footer_idx" ON "page_variants" USING btree ("footer_id");
  CREATE INDEX "page_variants_page_idx" ON "page_variants" USING btree ("page_id");
  CREATE INDEX "page_variants_bucket_i_d_idx" ON "page_variants" USING btree ("bucket_i_d");
  CREATE INDEX "page_variants_updated_at_idx" ON "page_variants" USING btree ("updated_at");
  CREATE INDEX "page_variants_created_at_idx" ON "page_variants" USING btree ("created_at");
  CREATE INDEX "page_variants_meta_meta_image_idx" ON "page_variants_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "page_variants_locales_locale_parent_id_unique" ON "page_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_variants_rels_order_idx" ON "page_variants_rels" USING btree ("order");
  CREATE INDEX "page_variants_rels_parent_idx" ON "page_variants_rels" USING btree ("parent_id");
  CREATE INDEX "page_variants_rels_path_idx" ON "page_variants_rels" USING btree ("path");
  CREATE INDEX "page_variants_rels_locale_idx" ON "page_variants_rels" USING btree ("locale");
  CREATE INDEX "page_variants_rels_page_id_idx" ON "page_variants_rels" USING btree ("page_id","locale");
  CREATE INDEX "page_variants_rels_posts_id_idx" ON "page_variants_rels" USING btree ("posts_id","locale");
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_locales_locale_parent_id_unique" ON "redirects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_locale_idx" ON "redirects_rels" USING btree ("locale");
  CREATE INDEX "redirects_rels_page_id_idx" ON "redirects_rels" USING btree ("page_id","locale");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id","locale");
  CREATE INDEX "presets_hero_actions_order_idx" ON "presets_hero_actions" USING btree ("_order");
  CREATE INDEX "presets_hero_actions_parent_id_idx" ON "presets_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "presets_testimonials_list_testimonial_items_order_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "presets_testimonials_list_testimonial_items_parent_id_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "presets_testimonials_list_testimonial_items_testimonial_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "presets_preview_idx" ON "presets" USING btree ("preview_id");
  CREATE INDEX "presets_hero_hero_media_idx" ON "presets" USING btree ("hero_media_id");
  CREATE INDEX "presets_updated_at_idx" ON "presets" USING btree ("updated_at");
  CREATE INDEX "presets_created_at_idx" ON "presets" USING btree ("created_at");
  CREATE UNIQUE INDEX "presets_locales_locale_parent_id_unique" ON "presets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_rels_order_idx" ON "presets_rels" USING btree ("order");
  CREATE INDEX "presets_rels_parent_idx" ON "presets_rels" USING btree ("parent_id");
  CREATE INDEX "presets_rels_path_idx" ON "presets_rels" USING btree ("path");
  CREATE INDEX "presets_rels_page_id_idx" ON "presets_rels" USING btree ("page_id");
  CREATE INDEX "presets_rels_posts_id_idx" ON "presets_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_page_id_idx" ON "payload_locked_documents_rels" USING btree ("page_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_header_id_idx" ON "payload_locked_documents_rels" USING btree ("header_id");
  CREATE INDEX "payload_locked_documents_rels_footer_id_idx" ON "payload_locked_documents_rels" USING btree ("footer_id");
  CREATE INDEX "payload_locked_documents_rels_page_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("page_variants_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_presets_id_idx" ON "payload_locked_documents_rels" USING btree ("presets_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_header_idx" ON "site_settings" USING btree ("header_id");
  CREATE INDEX "site_settings_footer_idx" ON "site_settings" USING btree ("footer_id");
  CREATE INDEX "site_settings_admin_logo_idx" ON "site_settings" USING btree ("admin_logo_id");
  CREATE INDEX "site_settings_admin_icon_idx" ON "site_settings" USING btree ("admin_icon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");
  CREATE INDEX "site_settings_blog_blog_meta_blog_blog_meta_image_idx" ON "site_settings_locales" USING btree ("blog_blog_meta_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_version_header_idx" ON "_site_settings_v" USING btree ("version_header_id");
  CREATE INDEX "_site_settings_v_version_version_footer_idx" ON "_site_settings_v" USING btree ("version_footer_id");
  CREATE INDEX "_site_settings_v_version_version_admin_logo_idx" ON "_site_settings_v" USING btree ("version_admin_logo_id");
  CREATE INDEX "_site_settings_v_version_version_admin_icon_idx" ON "_site_settings_v" USING btree ("version_admin_icon_id");
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "_site_settings_v_version_blog_blog_meta_version_blog_blo_idx" ON "_site_settings_v_locales" USING btree ("version_blog_blog_meta_image_id");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media_default_for" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "page_blocks_hero_actions" CASCADE;
  DROP TABLE "page_blocks_hero" CASCADE;
  DROP TABLE "page_blocks_text_section" CASCADE;
  DROP TABLE "page_blocks_content" CASCADE;
  DROP TABLE "page_blocks_faq_items" CASCADE;
  DROP TABLE "page_blocks_faq" CASCADE;
  DROP TABLE "page_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "page_blocks_testimonials_list" CASCADE;
  DROP TABLE "page_blocks_cards_grid_items" CASCADE;
  DROP TABLE "page_blocks_cards_grid" CASCADE;
  DROP TABLE "page_blocks_carousel_slides" CASCADE;
  DROP TABLE "page_blocks_carousel" CASCADE;
  DROP TABLE "page_blocks_logos_items" CASCADE;
  DROP TABLE "page_blocks_logos" CASCADE;
  DROP TABLE "page_blocks_links_list_links" CASCADE;
  DROP TABLE "page_blocks_links_list" CASCADE;
  DROP TABLE "page_blocks_blog_section" CASCADE;
  DROP TABLE "page_breadcrumbs" CASCADE;
  DROP TABLE "page" CASCADE;
  DROP TABLE "page_locales" CASCADE;
  DROP TABLE "page_rels" CASCADE;
  DROP TABLE "_page_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_page_v_blocks_hero" CASCADE;
  DROP TABLE "_page_v_blocks_text_section" CASCADE;
  DROP TABLE "_page_v_blocks_content" CASCADE;
  DROP TABLE "_page_v_blocks_faq_items" CASCADE;
  DROP TABLE "_page_v_blocks_faq" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_list" CASCADE;
  DROP TABLE "_page_v_blocks_cards_grid_items" CASCADE;
  DROP TABLE "_page_v_blocks_cards_grid" CASCADE;
  DROP TABLE "_page_v_blocks_carousel_slides" CASCADE;
  DROP TABLE "_page_v_blocks_carousel" CASCADE;
  DROP TABLE "_page_v_blocks_logos_items" CASCADE;
  DROP TABLE "_page_v_blocks_logos" CASCADE;
  DROP TABLE "_page_v_blocks_links_list_links" CASCADE;
  DROP TABLE "_page_v_blocks_links_list" CASCADE;
  DROP TABLE "_page_v_blocks_blog_section" CASCADE;
  DROP TABLE "_page_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_page_v" CASCADE;
  DROP TABLE "_page_v_locales" CASCADE;
  DROP TABLE "_page_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "header_nav_items_links" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "_header_v_version_nav_items_links" CASCADE;
  DROP TABLE "_header_v_version_nav_items" CASCADE;
  DROP TABLE "_header_v" CASCADE;
  DROP TABLE "_header_v_locales" CASCADE;
  DROP TABLE "_header_v_rels" CASCADE;
  DROP TABLE "footer_nav_items_links" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "_footer_v_version_nav_items_links" CASCADE;
  DROP TABLE "_footer_v_version_nav_items" CASCADE;
  DROP TABLE "_footer_v" CASCADE;
  DROP TABLE "_footer_v_rels" CASCADE;
  DROP TABLE "page_variants_blocks_hero_actions" CASCADE;
  DROP TABLE "page_variants_blocks_hero" CASCADE;
  DROP TABLE "page_variants_blocks_text_section" CASCADE;
  DROP TABLE "page_variants_blocks_content" CASCADE;
  DROP TABLE "page_variants_blocks_faq_items" CASCADE;
  DROP TABLE "page_variants_blocks_faq" CASCADE;
  DROP TABLE "page_variants_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "page_variants_blocks_testimonials_list" CASCADE;
  DROP TABLE "page_variants_blocks_cards_grid_items" CASCADE;
  DROP TABLE "page_variants_blocks_cards_grid" CASCADE;
  DROP TABLE "page_variants_blocks_carousel_slides" CASCADE;
  DROP TABLE "page_variants_blocks_carousel" CASCADE;
  DROP TABLE "page_variants_blocks_logos_items" CASCADE;
  DROP TABLE "page_variants_blocks_logos" CASCADE;
  DROP TABLE "page_variants_blocks_links_list_links" CASCADE;
  DROP TABLE "page_variants_blocks_links_list" CASCADE;
  DROP TABLE "page_variants_blocks_blog_section" CASCADE;
  DROP TABLE "page_variants" CASCADE;
  DROP TABLE "page_variants_locales" CASCADE;
  DROP TABLE "page_variants_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_locales" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "presets_hero_actions" CASCADE;
  DROP TABLE "presets_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "presets" CASCADE;
  DROP TABLE "presets_locales" CASCADE;
  DROP TABLE "presets_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_media_default_for";
  DROP TYPE "public"."enum_page_blocks_hero_actions_type";
  DROP TYPE "public"."enum_page_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum_page_blocks_hero_color";
  DROP TYPE "public"."enum_page_blocks_content_layout";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_link_type";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_link_appearance";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_align_variant";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_rounded";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_background_color";
  DROP TYPE "public"."enum_page_blocks_carousel_effect";
  DROP TYPE "public"."enum_page_blocks_logos_items_link_type";
  DROP TYPE "public"."enum_page_blocks_logos_align_variant";
  DROP TYPE "public"."enum_page_blocks_links_list_links_link_type";
  DROP TYPE "public"."enum_page_blocks_links_list_links_link_appearance";
  DROP TYPE "public"."enum_page_blocks_links_list_align_variant";
  DROP TYPE "public"."enum_page_blocks_blog_section_style";
  DROP TYPE "public"."enum_page_status";
  DROP TYPE "public"."enum_page_meta_robots";
  DROP TYPE "public"."enum__page_v_blocks_hero_actions_type";
  DROP TYPE "public"."enum__page_v_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum__page_v_blocks_hero_color";
  DROP TYPE "public"."enum__page_v_blocks_content_layout";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_link_type";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_link_appearance";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_align_variant";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_rounded";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_background_color";
  DROP TYPE "public"."enum__page_v_blocks_carousel_effect";
  DROP TYPE "public"."enum__page_v_blocks_logos_items_link_type";
  DROP TYPE "public"."enum__page_v_blocks_logos_align_variant";
  DROP TYPE "public"."enum__page_v_blocks_links_list_links_link_type";
  DROP TYPE "public"."enum__page_v_blocks_links_list_links_link_appearance";
  DROP TYPE "public"."enum__page_v_blocks_links_list_align_variant";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_style";
  DROP TYPE "public"."enum__page_v_version_status";
  DROP TYPE "public"."enum__page_v_published_locale";
  DROP TYPE "public"."enum__page_v_version_meta_robots";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_posts_meta_robots";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum__posts_v_version_meta_robots";
  DROP TYPE "public"."enum_header_nav_items_links_link_type";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_status";
  DROP TYPE "public"."enum__header_v_version_nav_items_links_link_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_link_type";
  DROP TYPE "public"."enum__header_v_version_status";
  DROP TYPE "public"."enum__header_v_published_locale";
  DROP TYPE "public"."enum_footer_nav_items_links_link_type";
  DROP TYPE "public"."enum_footer_status";
  DROP TYPE "public"."enum__footer_v_version_nav_items_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_status";
  DROP TYPE "public"."enum__footer_v_published_locale";
  DROP TYPE "public"."enum_page_variants_blocks_hero_actions_type";
  DROP TYPE "public"."enum_page_variants_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum_page_variants_blocks_hero_color";
  DROP TYPE "public"."enum_page_variants_blocks_content_layout";
  DROP TYPE "public"."enum_page_variants_blocks_cards_grid_items_link_type";
  DROP TYPE "public"."enum_page_variants_blocks_cards_grid_items_link_appearance";
  DROP TYPE "public"."enum_page_variants_blocks_cards_grid_items_align_variant";
  DROP TYPE "public"."enum_page_variants_blocks_cards_grid_items_rounded";
  DROP TYPE "public"."enum_page_variants_blocks_cards_grid_items_background_color";
  DROP TYPE "public"."enum_page_variants_blocks_carousel_effect";
  DROP TYPE "public"."enum_page_variants_blocks_logos_items_link_type";
  DROP TYPE "public"."enum_page_variants_blocks_logos_align_variant";
  DROP TYPE "public"."enum_page_variants_blocks_links_list_links_link_type";
  DROP TYPE "public"."enum_page_variants_blocks_links_list_links_link_appearance";
  DROP TYPE "public"."enum_page_variants_blocks_links_list_align_variant";
  DROP TYPE "public"."enum_page_variants_blocks_blog_section_style";
  DROP TYPE "public"."enum_page_variants_bucket_i_d";
  DROP TYPE "public"."enum_page_variants_meta_robots";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_redirects_type";
  DROP TYPE "public"."enum_presets_hero_actions_type";
  DROP TYPE "public"."enum_presets_hero_actions_appearance";
  DROP TYPE "public"."enum_presets_type";
  DROP TYPE "public"."enum_presets_hero_color";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_site_settings_seo_title_separator";
  DROP TYPE "public"."enum_site_settings_default_twitter_card";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum_site_settings_blog_blog_meta_robots";
  DROP TYPE "public"."enum__site_settings_v_version_seo_title_separator";
  DROP TYPE "public"."enum__site_settings_v_version_default_twitter_card";
  DROP TYPE "public"."enum__site_settings_v_version_status";
  DROP TYPE "public"."enum__site_settings_v_published_locale";
  DROP TYPE "public"."enum__site_settings_v_version_blog_blog_meta_robots";`)
}
