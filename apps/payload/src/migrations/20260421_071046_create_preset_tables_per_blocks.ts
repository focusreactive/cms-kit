import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_presets_blocks_hero_actions_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_blocks_hero_actions_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_blocks_hero_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_hero_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_text_section_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum_presets_blocks_content_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_content_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_content_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_content_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_content_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_content_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_faq_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_testimonials_list_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_cards_grid_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_carousel_slides_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_blocks_carousel_effect" AS ENUM('slide', 'fade', 'cube', 'flip', 'coverflow', 'cards');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_carousel_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_logos_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_blocks_logos_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_blocks_logos_items_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_blocks_logos_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_logos_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_blocks_links_list_links_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_blocks_links_list_links_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_blocks_links_list_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_blocks_links_list_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_blocks_links_list_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TABLE "presets_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_presets_blocks_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"custom_page" "enum_presets_blocks_hero_actions_custom_page",
  	"label" varchar NOT NULL,
  	"appearance" "enum_presets_blocks_hero_actions_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "presets_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_image_id" integer NOT NULL,
  	"image_aspect_ratio" "enum_presets_blocks_hero_image_aspect_ratio" DEFAULT '1/1',
  	"enabled" boolean DEFAULT true,
  	"color" "enum_presets_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"section_theme" "enum_presets_blocks_hero_section_theme",
  	"section_margin_top" "enum_presets_blocks_hero_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_hero_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_hero_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_hero_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_hero_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_hero_locales" (
  	"title" varchar,
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_theme" "enum_presets_blocks_text_section_section_theme",
  	"section_margin_top" "enum_presets_blocks_text_section_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_text_section_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_text_section_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_text_section_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_text_section_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_text_section_locales" (
  	"text" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_presets_blocks_content_layout" DEFAULT 'image-text' NOT NULL,
  	"image_id" integer NOT NULL,
  	"section_theme" "enum_presets_blocks_content_section_theme",
  	"section_margin_top" "enum_presets_blocks_content_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_content_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_content_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_content_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_content_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_content_locales" (
  	"heading" varchar,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "presets_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_theme" "enum_presets_blocks_faq_section_theme",
  	"section_margin_top" "enum_presets_blocks_faq_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_faq_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_faq_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_faq_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_faq_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_faq_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer NOT NULL
  );
  
  CREATE TABLE "presets_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"section_theme" "enum_presets_blocks_testimonials_list_section_theme",
  	"section_margin_top" "enum_presets_blocks_testimonials_list_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_testimonials_list_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_testimonials_list_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_testimonials_list_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_testimonials_list_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_testimonials_list_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_cards_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_image_id" integer,
  	"image_aspect_ratio" "enum_presets_blocks_cards_grid_items_image_aspect_ratio" DEFAULT '1/1',
  	"link_type" "enum_presets_blocks_cards_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_blocks_cards_grid_items_link_custom_page",
  	"link_label" varchar,
  	"link_appearance" "enum_presets_blocks_cards_grid_items_link_appearance" DEFAULT 'default',
  	"align_variant" "enum_presets_blocks_cards_grid_items_align_variant" DEFAULT 'center',
  	"rounded" "enum_presets_blocks_cards_grid_items_rounded" DEFAULT 'none',
  	"background_color" "enum_presets_blocks_cards_grid_items_background_color" DEFAULT 'none'
  );
  
  CREATE TABLE "presets_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"section_theme" "enum_presets_blocks_cards_grid_section_theme",
  	"section_margin_top" "enum_presets_blocks_cards_grid_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_cards_grid_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_cards_grid_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_cards_grid_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_cards_grid_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_image_id" integer NOT NULL,
  	"image_aspect_ratio" "enum_presets_blocks_carousel_slides_image_aspect_ratio" DEFAULT '1/1',
  	"text" jsonb
  );
  
  CREATE TABLE "presets_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"effect" "enum_presets_blocks_carousel_effect" DEFAULT 'slide',
  	"section_theme" "enum_presets_blocks_carousel_section_theme",
  	"section_margin_top" "enum_presets_blocks_carousel_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_carousel_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_carousel_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_carousel_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_carousel_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_carousel_locales" (
  	"text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_image_id" integer NOT NULL,
  	"image_aspect_ratio" "enum_presets_blocks_logos_items_image_aspect_ratio" DEFAULT '1/1',
  	"link_type" "enum_presets_blocks_logos_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_blocks_logos_items_link_custom_page",
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "presets_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_presets_blocks_logos_align_variant" DEFAULT 'center',
  	"section_theme" "enum_presets_blocks_logos_section_theme",
  	"section_margin_top" "enum_presets_blocks_logos_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_logos_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_logos_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_logos_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_logos_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "presets_blocks_links_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_presets_blocks_links_list_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_blocks_links_list_links_link_custom_page",
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_presets_blocks_links_list_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "presets_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_presets_blocks_links_list_align_variant" DEFAULT 'left',
  	"section_theme" "enum_presets_blocks_links_list_section_theme",
  	"section_margin_top" "enum_presets_blocks_links_list_section_margin_top" DEFAULT 'base',
  	"section_margin_bottom" "enum_presets_blocks_links_list_section_margin_bottom" DEFAULT 'base',
  	"section_padding_x" "enum_presets_blocks_links_list_section_padding_x" DEFAULT 'base',
  	"section_padding_y" "enum_presets_blocks_links_list_section_padding_y" DEFAULT 'base',
  	"section_max_width" "enum_presets_blocks_links_list_section_max_width" DEFAULT 'base',
  	"section_background_image_id" integer,
  	"block_name" varchar
  );
  
  ALTER TABLE "presets_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_links_list_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "presets_hero_actions" CASCADE;
  DROP TABLE "presets_faq_items" CASCADE;
  DROP TABLE "presets_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "presets_cards_grid_items" CASCADE;
  DROP TABLE "presets_carousel_slides" CASCADE;
  DROP TABLE "presets_logos_items" CASCADE;
  DROP TABLE "presets_links_list_links" CASCADE;
  ALTER TABLE "presets" DROP CONSTRAINT "presets_hero_image_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_hero_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_text_section_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_content_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_content_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_faq_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_testimonials_list_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_cards_grid_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_carousel_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_logos_section_background_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_links_list_section_background_image_id_media_id_fk";
  
  DROP INDEX "presets_hero_image_hero_image_image_idx";
  DROP INDEX "presets_hero_section_hero_section_background_image_idx";
  DROP INDEX "presets_text_section_section_text_section_section_backgr_idx";
  DROP INDEX "presets_content_content_image_idx";
  DROP INDEX "presets_content_section_content_section_background_image_idx";
  DROP INDEX "presets_faq_section_faq_section_background_image_idx";
  DROP INDEX "presets_testimonials_list_section_testimonials_list_sect_idx";
  DROP INDEX "presets_cards_grid_section_cards_grid_section_background_idx";
  DROP INDEX "presets_carousel_section_carousel_section_background_ima_idx";
  DROP INDEX "presets_logos_section_logos_section_background_image_idx";
  DROP INDEX "presets_links_list_section_links_list_section_background_idx";
  ALTER TABLE "presets_blocks_hero_actions" ADD CONSTRAINT "presets_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_hero" ADD CONSTRAINT "presets_blocks_hero_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_hero" ADD CONSTRAINT "presets_blocks_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_hero" ADD CONSTRAINT "presets_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_hero_locales" ADD CONSTRAINT "presets_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_text_section" ADD CONSTRAINT "presets_blocks_text_section_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_text_section" ADD CONSTRAINT "presets_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_text_section_locales" ADD CONSTRAINT "presets_blocks_text_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_text_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_content" ADD CONSTRAINT "presets_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_content" ADD CONSTRAINT "presets_blocks_content_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_content" ADD CONSTRAINT "presets_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_content_locales" ADD CONSTRAINT "presets_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_faq_items" ADD CONSTRAINT "presets_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_faq" ADD CONSTRAINT "presets_blocks_faq_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_faq" ADD CONSTRAINT "presets_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_faq_locales" ADD CONSTRAINT "presets_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_blocks_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_blocks_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_testimonials_list" ADD CONSTRAINT "presets_blocks_testimonials_list_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_testimonials_list" ADD CONSTRAINT "presets_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_testimonials_list_locales" ADD CONSTRAINT "presets_blocks_testimonials_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_testimonials_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_cards_grid_items" ADD CONSTRAINT "presets_blocks_cards_grid_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_cards_grid_items" ADD CONSTRAINT "presets_blocks_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_cards_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_cards_grid" ADD CONSTRAINT "presets_blocks_cards_grid_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_cards_grid" ADD CONSTRAINT "presets_blocks_cards_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_carousel_slides" ADD CONSTRAINT "presets_blocks_carousel_slides_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_carousel_slides" ADD CONSTRAINT "presets_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_carousel" ADD CONSTRAINT "presets_blocks_carousel_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_carousel" ADD CONSTRAINT "presets_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_carousel_locales" ADD CONSTRAINT "presets_blocks_carousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_logos_items" ADD CONSTRAINT "presets_blocks_logos_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_logos_items" ADD CONSTRAINT "presets_blocks_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_logos" ADD CONSTRAINT "presets_blocks_logos_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_logos" ADD CONSTRAINT "presets_blocks_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_links_list_links" ADD CONSTRAINT "presets_blocks_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets_blocks_links_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_blocks_links_list" ADD CONSTRAINT "presets_blocks_links_list_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_blocks_links_list" ADD CONSTRAINT "presets_blocks_links_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "presets_blocks_hero_actions_order_idx" ON "presets_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "presets_blocks_hero_actions_parent_id_idx" ON "presets_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_hero_actions_locale_idx" ON "presets_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "presets_blocks_hero_order_idx" ON "presets_blocks_hero" USING btree ("_order");
  CREATE INDEX "presets_blocks_hero_parent_id_idx" ON "presets_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_hero_path_idx" ON "presets_blocks_hero" USING btree ("_path");
  CREATE INDEX "presets_blocks_hero_image_image_image_idx" ON "presets_blocks_hero" USING btree ("image_image_id");
  CREATE INDEX "presets_blocks_hero_section_section_background_image_idx" ON "presets_blocks_hero" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_hero_locales_locale_parent_id_unique" ON "presets_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_text_section_order_idx" ON "presets_blocks_text_section" USING btree ("_order");
  CREATE INDEX "presets_blocks_text_section_parent_id_idx" ON "presets_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_text_section_path_idx" ON "presets_blocks_text_section" USING btree ("_path");
  CREATE INDEX "presets_blocks_text_section_section_section_background_i_idx" ON "presets_blocks_text_section" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_text_section_locales_locale_parent_id_unique" ON "presets_blocks_text_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_content_order_idx" ON "presets_blocks_content" USING btree ("_order");
  CREATE INDEX "presets_blocks_content_parent_id_idx" ON "presets_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_content_path_idx" ON "presets_blocks_content" USING btree ("_path");
  CREATE INDEX "presets_blocks_content_image_idx" ON "presets_blocks_content" USING btree ("image_id");
  CREATE INDEX "presets_blocks_content_section_section_background_image_idx" ON "presets_blocks_content" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_content_locales_locale_parent_id_unique" ON "presets_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_faq_items_order_idx" ON "presets_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "presets_blocks_faq_items_parent_id_idx" ON "presets_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_faq_items_locale_idx" ON "presets_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "presets_blocks_faq_order_idx" ON "presets_blocks_faq" USING btree ("_order");
  CREATE INDEX "presets_blocks_faq_parent_id_idx" ON "presets_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_faq_path_idx" ON "presets_blocks_faq" USING btree ("_path");
  CREATE INDEX "presets_blocks_faq_section_section_background_image_idx" ON "presets_blocks_faq" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_faq_locales_locale_parent_id_unique" ON "presets_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_testimonials_list_testimonial_items_order_idx" ON "presets_blocks_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "presets_blocks_testimonials_list_testimonial_items_parent_id_idx" ON "presets_blocks_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_testimonials_list_testimonial_items_testi_idx" ON "presets_blocks_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "presets_blocks_testimonials_list_order_idx" ON "presets_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "presets_blocks_testimonials_list_parent_id_idx" ON "presets_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_testimonials_list_path_idx" ON "presets_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "presets_blocks_testimonials_list_section_section_backgro_idx" ON "presets_blocks_testimonials_list" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_testimonials_list_locales_locale_parent_id_un" ON "presets_blocks_testimonials_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_cards_grid_items_order_idx" ON "presets_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX "presets_blocks_cards_grid_items_parent_id_idx" ON "presets_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_cards_grid_items_locale_idx" ON "presets_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX "presets_blocks_cards_grid_items_image_image_image_idx" ON "presets_blocks_cards_grid_items" USING btree ("image_image_id");
  CREATE INDEX "presets_blocks_cards_grid_order_idx" ON "presets_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX "presets_blocks_cards_grid_parent_id_idx" ON "presets_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_cards_grid_path_idx" ON "presets_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX "presets_blocks_cards_grid_section_section_background_ima_idx" ON "presets_blocks_cards_grid" USING btree ("section_background_image_id");
  CREATE INDEX "presets_blocks_carousel_slides_order_idx" ON "presets_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "presets_blocks_carousel_slides_parent_id_idx" ON "presets_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_carousel_slides_locale_idx" ON "presets_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX "presets_blocks_carousel_slides_image_image_image_idx" ON "presets_blocks_carousel_slides" USING btree ("image_image_id");
  CREATE INDEX "presets_blocks_carousel_order_idx" ON "presets_blocks_carousel" USING btree ("_order");
  CREATE INDEX "presets_blocks_carousel_parent_id_idx" ON "presets_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_carousel_path_idx" ON "presets_blocks_carousel" USING btree ("_path");
  CREATE INDEX "presets_blocks_carousel_section_section_background_image_idx" ON "presets_blocks_carousel" USING btree ("section_background_image_id");
  CREATE UNIQUE INDEX "presets_blocks_carousel_locales_locale_parent_id_unique" ON "presets_blocks_carousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_blocks_logos_items_order_idx" ON "presets_blocks_logos_items" USING btree ("_order");
  CREATE INDEX "presets_blocks_logos_items_parent_id_idx" ON "presets_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_logos_items_locale_idx" ON "presets_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX "presets_blocks_logos_items_image_image_image_idx" ON "presets_blocks_logos_items" USING btree ("image_image_id");
  CREATE INDEX "presets_blocks_logos_order_idx" ON "presets_blocks_logos" USING btree ("_order");
  CREATE INDEX "presets_blocks_logos_parent_id_idx" ON "presets_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_logos_path_idx" ON "presets_blocks_logos" USING btree ("_path");
  CREATE INDEX "presets_blocks_logos_section_section_background_image_idx" ON "presets_blocks_logos" USING btree ("section_background_image_id");
  CREATE INDEX "presets_blocks_links_list_links_order_idx" ON "presets_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX "presets_blocks_links_list_links_parent_id_idx" ON "presets_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_links_list_links_locale_idx" ON "presets_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX "presets_blocks_links_list_order_idx" ON "presets_blocks_links_list" USING btree ("_order");
  CREATE INDEX "presets_blocks_links_list_parent_id_idx" ON "presets_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX "presets_blocks_links_list_path_idx" ON "presets_blocks_links_list" USING btree ("_path");
  CREATE INDEX "presets_blocks_links_list_section_section_background_ima_idx" ON "presets_blocks_links_list" USING btree ("section_background_image_id");
  ALTER TABLE "presets" DROP COLUMN "type";
  ALTER TABLE "presets" DROP COLUMN "hero_image_image_id";
  ALTER TABLE "presets" DROP COLUMN "hero_image_aspect_ratio";
  ALTER TABLE "presets" DROP COLUMN "hero_enabled";
  ALTER TABLE "presets" DROP COLUMN "hero_color";
  ALTER TABLE "presets" DROP COLUMN "hero_opacity";
  ALTER TABLE "presets" DROP COLUMN "hero_section_theme";
  ALTER TABLE "presets" DROP COLUMN "hero_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "hero_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "hero_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "hero_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "hero_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "hero_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_theme";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "text_section_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "content_layout";
  ALTER TABLE "presets" DROP COLUMN "content_image_id";
  ALTER TABLE "presets" DROP COLUMN "content_section_theme";
  ALTER TABLE "presets" DROP COLUMN "content_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "content_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "content_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "content_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "content_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "content_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "faq_section_theme";
  ALTER TABLE "presets" DROP COLUMN "faq_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "faq_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "faq_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "faq_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "faq_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "faq_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_duration";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_show_rating";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_show_avatar";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_theme";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_columns";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_theme";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "cards_grid_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "carousel_effect";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_theme";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "carousel_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "logos_align_variant";
  ALTER TABLE "presets" DROP COLUMN "logos_section_theme";
  ALTER TABLE "presets" DROP COLUMN "logos_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "logos_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "logos_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "logos_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "logos_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "logos_section_background_image_id";
  ALTER TABLE "presets" DROP COLUMN "links_list_align_variant";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_theme";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_margin_top";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_margin_bottom";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_padding_x";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_padding_y";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_max_width";
  ALTER TABLE "presets" DROP COLUMN "links_list_section_background_image_id";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_title";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "presets_locales" DROP COLUMN "text_section_text";
  ALTER TABLE "presets_locales" DROP COLUMN "content_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "content_content";
  ALTER TABLE "presets_locales" DROP COLUMN "faq_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_subheading";
  ALTER TABLE "presets_locales" DROP COLUMN "carousel_text";
  DROP TYPE "public"."enum_presets_hero_actions_type";
  DROP TYPE "public"."enum_presets_hero_actions_custom_page";
  DROP TYPE "public"."enum_presets_hero_actions_appearance";
  DROP TYPE "public"."enum_presets_cards_grid_items_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_cards_grid_items_link_type";
  DROP TYPE "public"."enum_presets_cards_grid_items_link_custom_page";
  DROP TYPE "public"."enum_presets_cards_grid_items_link_appearance";
  DROP TYPE "public"."enum_presets_cards_grid_items_align_variant";
  DROP TYPE "public"."enum_presets_cards_grid_items_rounded";
  DROP TYPE "public"."enum_presets_cards_grid_items_background_color";
  DROP TYPE "public"."enum_presets_carousel_slides_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_logos_items_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_logos_items_link_type";
  DROP TYPE "public"."enum_presets_logos_items_link_custom_page";
  DROP TYPE "public"."enum_presets_links_list_links_link_type";
  DROP TYPE "public"."enum_presets_links_list_links_link_custom_page";
  DROP TYPE "public"."enum_presets_links_list_links_link_appearance";
  DROP TYPE "public"."enum_presets_type";
  DROP TYPE "public"."enum_presets_hero_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_hero_color";
  DROP TYPE "public"."enum_presets_hero_section_theme";
  DROP TYPE "public"."enum_presets_hero_section_margin_top";
  DROP TYPE "public"."enum_presets_hero_section_margin_bottom";
  DROP TYPE "public"."enum_presets_hero_section_padding_x";
  DROP TYPE "public"."enum_presets_hero_section_padding_y";
  DROP TYPE "public"."enum_presets_hero_section_max_width";
  DROP TYPE "public"."enum_presets_text_section_section_theme";
  DROP TYPE "public"."enum_presets_text_section_section_margin_top";
  DROP TYPE "public"."enum_presets_text_section_section_margin_bottom";
  DROP TYPE "public"."enum_presets_text_section_section_padding_x";
  DROP TYPE "public"."enum_presets_text_section_section_padding_y";
  DROP TYPE "public"."enum_presets_text_section_section_max_width";
  DROP TYPE "public"."enum_presets_content_layout";
  DROP TYPE "public"."enum_presets_content_section_theme";
  DROP TYPE "public"."enum_presets_content_section_margin_top";
  DROP TYPE "public"."enum_presets_content_section_margin_bottom";
  DROP TYPE "public"."enum_presets_content_section_padding_x";
  DROP TYPE "public"."enum_presets_content_section_padding_y";
  DROP TYPE "public"."enum_presets_content_section_max_width";
  DROP TYPE "public"."enum_presets_faq_section_theme";
  DROP TYPE "public"."enum_presets_faq_section_margin_top";
  DROP TYPE "public"."enum_presets_faq_section_margin_bottom";
  DROP TYPE "public"."enum_presets_faq_section_padding_x";
  DROP TYPE "public"."enum_presets_faq_section_padding_y";
  DROP TYPE "public"."enum_presets_faq_section_max_width";
  DROP TYPE "public"."enum_presets_testimonials_list_section_theme";
  DROP TYPE "public"."enum_presets_testimonials_list_section_margin_top";
  DROP TYPE "public"."enum_presets_testimonials_list_section_margin_bottom";
  DROP TYPE "public"."enum_presets_testimonials_list_section_padding_x";
  DROP TYPE "public"."enum_presets_testimonials_list_section_padding_y";
  DROP TYPE "public"."enum_presets_testimonials_list_section_max_width";
  DROP TYPE "public"."enum_presets_cards_grid_section_theme";
  DROP TYPE "public"."enum_presets_cards_grid_section_margin_top";
  DROP TYPE "public"."enum_presets_cards_grid_section_margin_bottom";
  DROP TYPE "public"."enum_presets_cards_grid_section_padding_x";
  DROP TYPE "public"."enum_presets_cards_grid_section_padding_y";
  DROP TYPE "public"."enum_presets_cards_grid_section_max_width";
  DROP TYPE "public"."enum_presets_carousel_effect";
  DROP TYPE "public"."enum_presets_carousel_section_theme";
  DROP TYPE "public"."enum_presets_carousel_section_margin_top";
  DROP TYPE "public"."enum_presets_carousel_section_margin_bottom";
  DROP TYPE "public"."enum_presets_carousel_section_padding_x";
  DROP TYPE "public"."enum_presets_carousel_section_padding_y";
  DROP TYPE "public"."enum_presets_carousel_section_max_width";
  DROP TYPE "public"."enum_presets_logos_align_variant";
  DROP TYPE "public"."enum_presets_logos_section_theme";
  DROP TYPE "public"."enum_presets_logos_section_margin_top";
  DROP TYPE "public"."enum_presets_logos_section_margin_bottom";
  DROP TYPE "public"."enum_presets_logos_section_padding_x";
  DROP TYPE "public"."enum_presets_logos_section_padding_y";
  DROP TYPE "public"."enum_presets_logos_section_max_width";
  DROP TYPE "public"."enum_presets_links_list_align_variant";
  DROP TYPE "public"."enum_presets_links_list_section_theme";
  DROP TYPE "public"."enum_presets_links_list_section_margin_top";
  DROP TYPE "public"."enum_presets_links_list_section_margin_bottom";
  DROP TYPE "public"."enum_presets_links_list_section_padding_x";
  DROP TYPE "public"."enum_presets_links_list_section_padding_y";
  DROP TYPE "public"."enum_presets_links_list_section_max_width";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_presets_hero_actions_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_hero_actions_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_cards_grid_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum_presets_carousel_slides_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_logos_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_logos_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_logos_items_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_links_list_links_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_links_list_links_link_custom_page" AS ENUM('blog', 'search');
  CREATE TYPE "public"."enum_presets_links_list_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_type" AS ENUM('hero', 'textSection', 'content', 'faq', 'testimonialsList', 'cardsGrid', 'carousel', 'logos', 'linksList');
  CREATE TYPE "public"."enum_presets_hero_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_presets_hero_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_hero_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_hero_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_hero_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_hero_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_hero_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_text_section_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_text_section_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_text_section_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_text_section_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_text_section_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_text_section_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum_presets_content_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_content_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_content_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_content_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_content_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_content_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_faq_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_faq_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_faq_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_faq_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_faq_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_faq_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_testimonials_list_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_cards_grid_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_cards_grid_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_carousel_effect" AS ENUM('slide', 'fade', 'cube', 'flip', 'coverflow', 'cards');
  CREATE TYPE "public"."enum_presets_carousel_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_carousel_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_carousel_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_carousel_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_carousel_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_carousel_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_logos_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_logos_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_logos_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_logos_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_logos_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_logos_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_logos_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum_presets_links_list_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_links_list_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_presets_links_list_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_links_list_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_links_list_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_links_list_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_presets_links_list_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TABLE "presets_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_presets_hero_actions_type" DEFAULT 'reference',
  	"new_tab" boolean,
  	"url" varchar,
  	"custom_page" "enum_presets_hero_actions_custom_page",
  	"label" varchar,
  	"appearance" "enum_presets_hero_actions_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "presets_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "presets_testimonials_list_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonial_id" integer
  );
  
  CREATE TABLE "presets_cards_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_image_id" integer,
  	"image_aspect_ratio" "enum_presets_cards_grid_items_image_aspect_ratio" DEFAULT '1/1',
  	"link_type" "enum_presets_cards_grid_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_cards_grid_items_link_custom_page",
  	"link_label" varchar,
  	"link_appearance" "enum_presets_cards_grid_items_link_appearance" DEFAULT 'default',
  	"align_variant" "enum_presets_cards_grid_items_align_variant" DEFAULT 'center',
  	"rounded" "enum_presets_cards_grid_items_rounded" DEFAULT 'none',
  	"background_color" "enum_presets_cards_grid_items_background_color" DEFAULT 'none'
  );
  
  CREATE TABLE "presets_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_image_id" integer,
  	"image_aspect_ratio" "enum_presets_carousel_slides_image_aspect_ratio" DEFAULT '1/1',
  	"text" jsonb
  );
  
  CREATE TABLE "presets_logos_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_image_id" integer,
  	"image_aspect_ratio" "enum_presets_logos_items_image_aspect_ratio" DEFAULT '1/1',
  	"link_type" "enum_presets_logos_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_logos_items_link_custom_page",
  	"link_label" varchar
  );
  
  CREATE TABLE "presets_links_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_presets_links_list_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_custom_page" "enum_presets_links_list_links_link_custom_page",
  	"link_label" varchar,
  	"link_appearance" "enum_presets_links_list_links_link_appearance" DEFAULT 'default'
  );
  
  ALTER TABLE "presets_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_text_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_text_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_testimonials_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_carousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_links_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_blocks_links_list" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "presets_blocks_hero_actions" CASCADE;
  DROP TABLE "presets_blocks_hero" CASCADE;
  DROP TABLE "presets_blocks_hero_locales" CASCADE;
  DROP TABLE "presets_blocks_text_section" CASCADE;
  DROP TABLE "presets_blocks_text_section_locales" CASCADE;
  DROP TABLE "presets_blocks_content" CASCADE;
  DROP TABLE "presets_blocks_content_locales" CASCADE;
  DROP TABLE "presets_blocks_faq_items" CASCADE;
  DROP TABLE "presets_blocks_faq" CASCADE;
  DROP TABLE "presets_blocks_faq_locales" CASCADE;
  DROP TABLE "presets_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE "presets_blocks_testimonials_list" CASCADE;
  DROP TABLE "presets_blocks_testimonials_list_locales" CASCADE;
  DROP TABLE "presets_blocks_cards_grid_items" CASCADE;
  DROP TABLE "presets_blocks_cards_grid" CASCADE;
  DROP TABLE "presets_blocks_carousel_slides" CASCADE;
  DROP TABLE "presets_blocks_carousel" CASCADE;
  DROP TABLE "presets_blocks_carousel_locales" CASCADE;
  DROP TABLE "presets_blocks_logos_items" CASCADE;
  DROP TABLE "presets_blocks_logos" CASCADE;
  DROP TABLE "presets_blocks_links_list_links" CASCADE;
  DROP TABLE "presets_blocks_links_list" CASCADE;
  ALTER TABLE "presets" ADD COLUMN "type" "enum_presets_type" NOT NULL DEFAULT 'hero';
  ALTER TABLE "presets" ALTER COLUMN "type" DROP DEFAULT;
  ALTER TABLE "presets" ADD COLUMN "hero_image_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "hero_image_aspect_ratio" "enum_presets_hero_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "presets" ADD COLUMN "hero_enabled" boolean DEFAULT true;
  ALTER TABLE "presets" ADD COLUMN "hero_color" "enum_presets_hero_color" DEFAULT 'black';
  ALTER TABLE "presets" ADD COLUMN "hero_opacity" numeric DEFAULT 40;
  ALTER TABLE "presets" ADD COLUMN "hero_section_theme" "enum_presets_hero_section_theme";
  ALTER TABLE "presets" ADD COLUMN "hero_section_margin_top" "enum_presets_hero_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "hero_section_margin_bottom" "enum_presets_hero_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "hero_section_padding_x" "enum_presets_hero_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "hero_section_padding_y" "enum_presets_hero_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "hero_section_max_width" "enum_presets_hero_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "hero_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "text_section_section_theme" "enum_presets_text_section_section_theme";
  ALTER TABLE "presets" ADD COLUMN "text_section_section_margin_top" "enum_presets_text_section_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "text_section_section_margin_bottom" "enum_presets_text_section_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "text_section_section_padding_x" "enum_presets_text_section_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "text_section_section_padding_y" "enum_presets_text_section_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "text_section_section_max_width" "enum_presets_text_section_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "text_section_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "content_layout" "enum_presets_content_layout" DEFAULT 'image-text';
  ALTER TABLE "presets" ADD COLUMN "content_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "content_section_theme" "enum_presets_content_section_theme";
  ALTER TABLE "presets" ADD COLUMN "content_section_margin_top" "enum_presets_content_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "content_section_margin_bottom" "enum_presets_content_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "content_section_padding_x" "enum_presets_content_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "content_section_padding_y" "enum_presets_content_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "content_section_max_width" "enum_presets_content_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "content_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "faq_section_theme" "enum_presets_faq_section_theme";
  ALTER TABLE "presets" ADD COLUMN "faq_section_margin_top" "enum_presets_faq_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "faq_section_margin_bottom" "enum_presets_faq_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "faq_section_padding_x" "enum_presets_faq_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "faq_section_padding_y" "enum_presets_faq_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "faq_section_max_width" "enum_presets_faq_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "faq_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_duration" numeric DEFAULT 60;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_show_rating" boolean DEFAULT true;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_show_avatar" boolean DEFAULT true;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_theme" "enum_presets_testimonials_list_section_theme";
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_margin_top" "enum_presets_testimonials_list_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_margin_bottom" "enum_presets_testimonials_list_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_padding_x" "enum_presets_testimonials_list_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_padding_y" "enum_presets_testimonials_list_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_max_width" "enum_presets_testimonials_list_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "cards_grid_columns" numeric DEFAULT 3;
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_theme" "enum_presets_cards_grid_section_theme";
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_margin_top" "enum_presets_cards_grid_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_margin_bottom" "enum_presets_cards_grid_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_padding_x" "enum_presets_cards_grid_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_padding_y" "enum_presets_cards_grid_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_max_width" "enum_presets_cards_grid_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "cards_grid_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "carousel_effect" "enum_presets_carousel_effect" DEFAULT 'slide';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_theme" "enum_presets_carousel_section_theme";
  ALTER TABLE "presets" ADD COLUMN "carousel_section_margin_top" "enum_presets_carousel_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_margin_bottom" "enum_presets_carousel_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_padding_x" "enum_presets_carousel_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_padding_y" "enum_presets_carousel_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_max_width" "enum_presets_carousel_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "carousel_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "logos_align_variant" "enum_presets_logos_align_variant" DEFAULT 'center';
  ALTER TABLE "presets" ADD COLUMN "logos_section_theme" "enum_presets_logos_section_theme";
  ALTER TABLE "presets" ADD COLUMN "logos_section_margin_top" "enum_presets_logos_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "logos_section_margin_bottom" "enum_presets_logos_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "logos_section_padding_x" "enum_presets_logos_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "logos_section_padding_y" "enum_presets_logos_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "logos_section_max_width" "enum_presets_logos_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "logos_section_background_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "links_list_align_variant" "enum_presets_links_list_align_variant" DEFAULT 'left';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_theme" "enum_presets_links_list_section_theme";
  ALTER TABLE "presets" ADD COLUMN "links_list_section_margin_top" "enum_presets_links_list_section_margin_top" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_margin_bottom" "enum_presets_links_list_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_padding_x" "enum_presets_links_list_section_padding_x" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_padding_y" "enum_presets_links_list_section_padding_y" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_max_width" "enum_presets_links_list_section_max_width" DEFAULT 'base';
  ALTER TABLE "presets" ADD COLUMN "links_list_section_background_image_id" integer;
  ALTER TABLE "presets_locales" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "presets_locales" ADD COLUMN "text_section_text" jsonb;
  ALTER TABLE "presets_locales" ADD COLUMN "content_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "content_content" jsonb;
  ALTER TABLE "presets_locales" ADD COLUMN "faq_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_subheading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "carousel_text" jsonb;
  ALTER TABLE "presets_hero_actions" ADD CONSTRAINT "presets_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_faq_items" ADD CONSTRAINT "presets_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_testimonials_list_testimonial_items" ADD CONSTRAINT "presets_testimonials_list_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_cards_grid_items" ADD CONSTRAINT "presets_cards_grid_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_cards_grid_items" ADD CONSTRAINT "presets_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_carousel_slides" ADD CONSTRAINT "presets_carousel_slides_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_carousel_slides" ADD CONSTRAINT "presets_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_logos_items" ADD CONSTRAINT "presets_logos_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_logos_items" ADD CONSTRAINT "presets_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_links_list_links" ADD CONSTRAINT "presets_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "presets_hero_actions_order_idx" ON "presets_hero_actions" USING btree ("_order");
  CREATE INDEX "presets_hero_actions_parent_id_idx" ON "presets_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "presets_hero_actions_locale_idx" ON "presets_hero_actions" USING btree ("_locale");
  CREATE INDEX "presets_faq_items_order_idx" ON "presets_faq_items" USING btree ("_order");
  CREATE INDEX "presets_faq_items_parent_id_idx" ON "presets_faq_items" USING btree ("_parent_id");
  CREATE INDEX "presets_faq_items_locale_idx" ON "presets_faq_items" USING btree ("_locale");
  CREATE INDEX "presets_testimonials_list_testimonial_items_order_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_order");
  CREATE INDEX "presets_testimonials_list_testimonial_items_parent_id_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "presets_testimonials_list_testimonial_items_testimonial_idx" ON "presets_testimonials_list_testimonial_items" USING btree ("testimonial_id");
  CREATE INDEX "presets_cards_grid_items_order_idx" ON "presets_cards_grid_items" USING btree ("_order");
  CREATE INDEX "presets_cards_grid_items_parent_id_idx" ON "presets_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX "presets_cards_grid_items_locale_idx" ON "presets_cards_grid_items" USING btree ("_locale");
  CREATE INDEX "presets_cards_grid_items_image_image_image_idx" ON "presets_cards_grid_items" USING btree ("image_image_id");
  CREATE INDEX "presets_carousel_slides_order_idx" ON "presets_carousel_slides" USING btree ("_order");
  CREATE INDEX "presets_carousel_slides_parent_id_idx" ON "presets_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "presets_carousel_slides_locale_idx" ON "presets_carousel_slides" USING btree ("_locale");
  CREATE INDEX "presets_carousel_slides_image_image_image_idx" ON "presets_carousel_slides" USING btree ("image_image_id");
  CREATE INDEX "presets_logos_items_order_idx" ON "presets_logos_items" USING btree ("_order");
  CREATE INDEX "presets_logos_items_parent_id_idx" ON "presets_logos_items" USING btree ("_parent_id");
  CREATE INDEX "presets_logos_items_locale_idx" ON "presets_logos_items" USING btree ("_locale");
  CREATE INDEX "presets_logos_items_image_image_image_idx" ON "presets_logos_items" USING btree ("image_image_id");
  CREATE INDEX "presets_links_list_links_order_idx" ON "presets_links_list_links" USING btree ("_order");
  CREATE INDEX "presets_links_list_links_parent_id_idx" ON "presets_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "presets_links_list_links_locale_idx" ON "presets_links_list_links" USING btree ("_locale");
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_image_image_id_media_id_fk" FOREIGN KEY ("hero_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("hero_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_text_section_section_background_image_id_media_id_fk" FOREIGN KEY ("text_section_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_content_section_background_image_id_media_id_fk" FOREIGN KEY ("content_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_faq_section_background_image_id_media_id_fk" FOREIGN KEY ("faq_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_testimonials_list_section_background_image_id_media_id_fk" FOREIGN KEY ("testimonials_list_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_cards_grid_section_background_image_id_media_id_fk" FOREIGN KEY ("cards_grid_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_carousel_section_background_image_id_media_id_fk" FOREIGN KEY ("carousel_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_logos_section_background_image_id_media_id_fk" FOREIGN KEY ("logos_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_links_list_section_background_image_id_media_id_fk" FOREIGN KEY ("links_list_section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "presets_hero_image_hero_image_image_idx" ON "presets" USING btree ("hero_image_image_id");
  CREATE INDEX "presets_hero_section_hero_section_background_image_idx" ON "presets" USING btree ("hero_section_background_image_id");
  CREATE INDEX "presets_text_section_section_text_section_section_backgr_idx" ON "presets" USING btree ("text_section_section_background_image_id");
  CREATE INDEX "presets_content_content_image_idx" ON "presets" USING btree ("content_image_id");
  CREATE INDEX "presets_content_section_content_section_background_image_idx" ON "presets" USING btree ("content_section_background_image_id");
  CREATE INDEX "presets_faq_section_faq_section_background_image_idx" ON "presets" USING btree ("faq_section_background_image_id");
  CREATE INDEX "presets_testimonials_list_section_testimonials_list_sect_idx" ON "presets" USING btree ("testimonials_list_section_background_image_id");
  CREATE INDEX "presets_cards_grid_section_cards_grid_section_background_idx" ON "presets" USING btree ("cards_grid_section_background_image_id");
  CREATE INDEX "presets_carousel_section_carousel_section_background_ima_idx" ON "presets" USING btree ("carousel_section_background_image_id");
  CREATE INDEX "presets_logos_section_logos_section_background_image_idx" ON "presets" USING btree ("logos_section_background_image_id");
  CREATE INDEX "presets_links_list_section_links_list_section_background_idx" ON "presets" USING btree ("links_list_section_background_image_id");
  DROP TYPE "public"."enum_presets_blocks_hero_actions_type";
  DROP TYPE "public"."enum_presets_blocks_hero_actions_custom_page";
  DROP TYPE "public"."enum_presets_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum_presets_blocks_hero_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_blocks_hero_color";
  DROP TYPE "public"."enum_presets_blocks_hero_section_theme";
  DROP TYPE "public"."enum_presets_blocks_hero_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_hero_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_hero_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_hero_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_hero_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_theme";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_text_section_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_content_layout";
  DROP TYPE "public"."enum_presets_blocks_content_section_theme";
  DROP TYPE "public"."enum_presets_blocks_content_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_content_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_content_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_content_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_content_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_faq_section_theme";
  DROP TYPE "public"."enum_presets_blocks_faq_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_faq_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_faq_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_faq_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_faq_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_theme";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_testimonials_list_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_link_type";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_link_custom_page";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_link_appearance";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_align_variant";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_rounded";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_items_background_color";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_theme";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_cards_grid_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_carousel_slides_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_blocks_carousel_effect";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_theme";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_carousel_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_logos_items_image_aspect_ratio";
  DROP TYPE "public"."enum_presets_blocks_logos_items_link_type";
  DROP TYPE "public"."enum_presets_blocks_logos_items_link_custom_page";
  DROP TYPE "public"."enum_presets_blocks_logos_align_variant";
  DROP TYPE "public"."enum_presets_blocks_logos_section_theme";
  DROP TYPE "public"."enum_presets_blocks_logos_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_logos_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_logos_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_logos_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_logos_section_max_width";
  DROP TYPE "public"."enum_presets_blocks_links_list_links_link_type";
  DROP TYPE "public"."enum_presets_blocks_links_list_links_link_custom_page";
  DROP TYPE "public"."enum_presets_blocks_links_list_links_link_appearance";
  DROP TYPE "public"."enum_presets_blocks_links_list_align_variant";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_theme";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_margin_top";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_margin_bottom";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_padding_x";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_padding_y";
  DROP TYPE "public"."enum_presets_blocks_links_list_section_max_width";`)
}
