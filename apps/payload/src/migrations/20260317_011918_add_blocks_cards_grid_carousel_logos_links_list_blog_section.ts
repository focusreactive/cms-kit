import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  CREATE TYPE "public"."enum_site_settings_blog_blog_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__site_settings_v_version_blog_blog_meta_robots" AS ENUM('index', 'noindex');
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
  CREATE TABLE IF NOT EXISTS "page_blocks_cards_grid_items" (
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
  
  CREATE TABLE IF NOT EXISTS "page_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"effect" "enum_page_blocks_carousel_effect" DEFAULT 'slide',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_logos_items" (
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
  
  CREATE TABLE IF NOT EXISTS "page_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_blocks_logos_align_variant" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_links_list_links" (
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
  
  CREATE TABLE IF NOT EXISTS "page_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_blocks_links_list_align_variant" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_blocks_blog_section" (
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
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_cards_grid_items" (
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
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"text" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_carousel" (
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
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_logos_items" (
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
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align_variant" "enum__page_v_blocks_logos_align_variant" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_links_list_links" (
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
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align_variant" "enum__page_v_blocks_links_list_align_variant" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_page_v_blocks_blog_section" (
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
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_cards_grid_items" (
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
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_cards_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"text" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"effect" "enum_page_variants_blocks_carousel_effect" DEFAULT 'slide',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_logos_items" (
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
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_variants_blocks_logos_align_variant" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_links_list_links" (
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
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_links_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align_variant" "enum_page_variants_blocks_links_list_align_variant" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "page_variants_blocks_blog_section" (
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
  
  ALTER TABLE "blog_page_settings_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_settings_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "blog_page_settings_tenants" CASCADE;
  DROP TABLE IF EXISTS "blog_page_settings" CASCADE;
  DROP TABLE IF EXISTS "blog_page_settings_locales" CASCADE;
  DROP TABLE IF EXISTS "_blog_page_settings_v_version_tenants" CASCADE;
  DROP TABLE IF EXISTS "_blog_page_settings_v" CASCADE;
  DROP TABLE IF EXISTS "_blog_page_settings_v_locales" CASCADE;
  ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_blog_page_settings_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_blog_page_settings_id_idx";
  ALTER TABLE "page_blocks_hero" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_meta_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_meta_image_id" integer;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_meta_description" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "blog_blog_meta_robots" "enum_site_settings_blog_blog_meta_robots" DEFAULT 'index';
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_title" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_description" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_meta_title" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_meta_image_id" integer;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_meta_description" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN IF NOT EXISTS "version_blog_blog_meta_robots" "enum__site_settings_v_version_blog_blog_meta_robots" DEFAULT 'index';
  ALTER TABLE "page_variants_blocks_hero" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN IF NOT EXISTS "hero_title" varchar;
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
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_items_order_idx" ON "page_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_items_parent_id_idx" ON "page_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_items_locale_idx" ON "page_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_items_image_idx" ON "page_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_order_idx" ON "page_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_parent_id_idx" ON "page_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_path_idx" ON "page_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_cards_grid_locale_idx" ON "page_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_slides_order_idx" ON "page_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_slides_parent_id_idx" ON "page_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_slides_locale_idx" ON "page_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_slides_image_idx" ON "page_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_order_idx" ON "page_blocks_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_parent_id_idx" ON "page_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_path_idx" ON "page_blocks_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_carousel_locale_idx" ON "page_blocks_carousel" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_items_order_idx" ON "page_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_items_parent_id_idx" ON "page_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_items_locale_idx" ON "page_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_items_image_idx" ON "page_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_order_idx" ON "page_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_parent_id_idx" ON "page_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_path_idx" ON "page_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_logos_locale_idx" ON "page_blocks_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_links_order_idx" ON "page_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_links_parent_id_idx" ON "page_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_links_locale_idx" ON "page_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_order_idx" ON "page_blocks_links_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_parent_id_idx" ON "page_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_path_idx" ON "page_blocks_links_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_links_list_locale_idx" ON "page_blocks_links_list" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_blocks_blog_section_order_idx" ON "page_blocks_blog_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_blocks_blog_section_parent_id_idx" ON "page_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_blocks_blog_section_path_idx" ON "page_blocks_blog_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_blocks_blog_section_locale_idx" ON "page_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_items_order_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_items_parent_id_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_items_locale_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_items_image_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_order_idx" ON "_page_v_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_parent_id_idx" ON "_page_v_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_path_idx" ON "_page_v_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_cards_grid_locale_idx" ON "_page_v_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_slides_order_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_slides_parent_id_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_slides_locale_idx" ON "_page_v_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_slides_image_idx" ON "_page_v_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_order_idx" ON "_page_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_parent_id_idx" ON "_page_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_path_idx" ON "_page_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_carousel_locale_idx" ON "_page_v_blocks_carousel" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_items_order_idx" ON "_page_v_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_items_parent_id_idx" ON "_page_v_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_items_locale_idx" ON "_page_v_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_items_image_idx" ON "_page_v_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_order_idx" ON "_page_v_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_parent_id_idx" ON "_page_v_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_path_idx" ON "_page_v_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_logos_locale_idx" ON "_page_v_blocks_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_links_order_idx" ON "_page_v_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_links_parent_id_idx" ON "_page_v_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_links_locale_idx" ON "_page_v_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_order_idx" ON "_page_v_blocks_links_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_parent_id_idx" ON "_page_v_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_path_idx" ON "_page_v_blocks_links_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_links_list_locale_idx" ON "_page_v_blocks_links_list" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_blog_section_order_idx" ON "_page_v_blocks_blog_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_blog_section_parent_id_idx" ON "_page_v_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_blog_section_path_idx" ON "_page_v_blocks_blog_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_page_v_blocks_blog_section_locale_idx" ON "_page_v_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_items_order_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_items_parent_id_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_items_locale_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_items_image_idx" ON "page_variants_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_order_idx" ON "page_variants_blocks_cards_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_parent_id_idx" ON "page_variants_blocks_cards_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_path_idx" ON "page_variants_blocks_cards_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_cards_grid_locale_idx" ON "page_variants_blocks_cards_grid" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_slides_order_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_slides_parent_id_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_slides_locale_idx" ON "page_variants_blocks_carousel_slides" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_slides_image_idx" ON "page_variants_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_order_idx" ON "page_variants_blocks_carousel" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_parent_id_idx" ON "page_variants_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_path_idx" ON "page_variants_blocks_carousel" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_carousel_locale_idx" ON "page_variants_blocks_carousel" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_items_order_idx" ON "page_variants_blocks_logos_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_items_parent_id_idx" ON "page_variants_blocks_logos_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_items_locale_idx" ON "page_variants_blocks_logos_items" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_items_image_idx" ON "page_variants_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_order_idx" ON "page_variants_blocks_logos" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_parent_id_idx" ON "page_variants_blocks_logos" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_path_idx" ON "page_variants_blocks_logos" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_logos_locale_idx" ON "page_variants_blocks_logos" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_links_order_idx" ON "page_variants_blocks_links_list_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_links_parent_id_idx" ON "page_variants_blocks_links_list_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_links_locale_idx" ON "page_variants_blocks_links_list_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_order_idx" ON "page_variants_blocks_links_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_parent_id_idx" ON "page_variants_blocks_links_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_path_idx" ON "page_variants_blocks_links_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_links_list_locale_idx" ON "page_variants_blocks_links_list" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_blog_section_order_idx" ON "page_variants_blocks_blog_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_blog_section_parent_id_idx" ON "page_variants_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_blog_section_path_idx" ON "page_variants_blocks_blog_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "page_variants_blocks_blog_section_locale_idx" ON "page_variants_blocks_blog_section" USING btree ("_locale");
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_blog_blog_meta_image_id_media_id_fk" FOREIGN KEY ("blog_blog_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_version_blog_blog_meta_image_id_media_id_fk" FOREIGN KEY ("version_blog_blog_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "site_settings_blog_blog_meta_blog_blog_meta_image_idx" ON "site_settings_locales" USING btree ("blog_blog_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_site_settings_v_version_blog_blog_meta_version_blog_blo_idx" ON "_site_settings_v_locales" USING btree ("version_blog_blog_meta_image_id");
  ALTER TABLE IF EXISTS "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blog_page_settings_id";
  DROP TYPE IF EXISTS "public"."enum_blog_page_settings_status";
  DROP TYPE IF EXISTS "public"."enum_blog_page_settings_meta_robots";
  DROP TYPE IF EXISTS "public"."enum__blog_page_settings_v_version_status";
  DROP TYPE IF EXISTS "public"."enum__blog_page_settings_v_published_locale";
  DROP TYPE IF EXISTS "public"."enum__blog_page_settings_v_version_meta_robots";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_page_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_page_settings_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_settings_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TABLE IF NOT EXISTS "blog_page_settings_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_blog_page_settings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "blog_page_settings_locales" (
  	"title" varchar,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_robots" "enum_blog_page_settings_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_page_settings_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_page_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tenant_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_page_settings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__blog_page_settings_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_page_settings_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_robots" "enum__blog_page_settings_v_version_meta_robots" DEFAULT 'index',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "page_blocks_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_links_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_links_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_links_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_links_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_links_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_links_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_variants_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_cards_grid_items" CASCADE;
  DROP TABLE "page_blocks_cards_grid" CASCADE;
  DROP TABLE "page_blocks_carousel_slides" CASCADE;
  DROP TABLE "page_blocks_carousel" CASCADE;
  DROP TABLE "page_blocks_logos_items" CASCADE;
  DROP TABLE "page_blocks_logos" CASCADE;
  DROP TABLE "page_blocks_links_list_links" CASCADE;
  DROP TABLE "page_blocks_links_list" CASCADE;
  DROP TABLE "page_blocks_blog_section" CASCADE;
  DROP TABLE "_page_v_blocks_cards_grid_items" CASCADE;
  DROP TABLE "_page_v_blocks_cards_grid" CASCADE;
  DROP TABLE "_page_v_blocks_carousel_slides" CASCADE;
  DROP TABLE "_page_v_blocks_carousel" CASCADE;
  DROP TABLE "_page_v_blocks_logos_items" CASCADE;
  DROP TABLE "_page_v_blocks_logos" CASCADE;
  DROP TABLE "_page_v_blocks_links_list_links" CASCADE;
  DROP TABLE "_page_v_blocks_links_list" CASCADE;
  DROP TABLE "_page_v_blocks_blog_section" CASCADE;
  DROP TABLE "page_variants_blocks_cards_grid_items" CASCADE;
  DROP TABLE "page_variants_blocks_cards_grid" CASCADE;
  DROP TABLE "page_variants_blocks_carousel_slides" CASCADE;
  DROP TABLE "page_variants_blocks_carousel" CASCADE;
  DROP TABLE "page_variants_blocks_logos_items" CASCADE;
  DROP TABLE "page_variants_blocks_logos" CASCADE;
  DROP TABLE "page_variants_blocks_links_list_links" CASCADE;
  DROP TABLE "page_variants_blocks_links_list" CASCADE;
  DROP TABLE "page_variants_blocks_blog_section" CASCADE;
  ALTER TABLE "site_settings_locales" DROP CONSTRAINT "site_settings_locales_blog_blog_meta_image_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v_locales" DROP CONSTRAINT "_site_settings_v_locales_version_blog_blog_meta_image_id_media_id_fk";
  
  DROP INDEX "site_settings_blog_blog_meta_blog_blog_meta_image_idx";
  DROP INDEX "_site_settings_v_version_blog_blog_meta_version_blog_blo_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_page_settings_id" integer;
  ALTER TABLE "blog_page_settings_tenants" ADD CONSTRAINT "blog_page_settings_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings_tenants" ADD CONSTRAINT "blog_page_settings_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_settings" ADD CONSTRAINT "blog_page_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings_locales" ADD CONSTRAINT "blog_page_settings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings_locales" ADD CONSTRAINT "blog_page_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_version_tenants" ADD CONSTRAINT "_blog_page_settings_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_version_tenants" ADD CONSTRAINT "_blog_page_settings_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_page_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_parent_id_blog_page_settings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_locales" ADD CONSTRAINT "_blog_page_settings_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_locales" ADD CONSTRAINT "_blog_page_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_page_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "blog_page_settings_tenants_order_idx" ON "blog_page_settings_tenants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_tenants_parent_id_idx" ON "blog_page_settings_tenants" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_tenants_tenant_idx" ON "blog_page_settings_tenants" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_tenant_idx" ON "blog_page_settings" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_updated_at_idx" ON "blog_page_settings" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_created_at_idx" ON "blog_page_settings" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_page_settings__status_idx" ON "blog_page_settings" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "blog_page_settings_locales_locale_parent_id_unique" ON "blog_page_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_tenants_order_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_tenants_parent_id_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_tenants_tenant_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_parent_idx" ON "_blog_page_settings_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_version_tenant_idx" ON "_blog_page_settings_v" USING btree ("version_tenant_id");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_version_updated_at_idx" ON "_blog_page_settings_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_version_created_at_idx" ON "_blog_page_settings_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_version__status_idx" ON "_blog_page_settings_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_created_at_idx" ON "_blog_page_settings_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_updated_at_idx" ON "_blog_page_settings_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_snapshot_idx" ON "_blog_page_settings_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_published_locale_idx" ON "_blog_page_settings_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_latest_idx" ON "_blog_page_settings_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v_locales" USING btree ("version_meta_image_id");
  CREATE UNIQUE INDEX "_blog_page_settings_v_locales_locale_parent_id_unique" ON "_blog_page_settings_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_page_settings_fk" FOREIGN KEY ("blog_page_settings_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_page_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_page_settings_id");
  ALTER TABLE "page_blocks_hero" DROP COLUMN "title";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_meta_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_meta_image_id";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_meta_description";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_meta_robots";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_title";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_description";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_meta_title";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_meta_image_id";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_meta_description";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_meta_robots";
  ALTER TABLE "page_variants_blocks_hero" DROP COLUMN "title";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_title";
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
  DROP TYPE "public"."enum_site_settings_blog_blog_meta_robots";
  DROP TYPE "public"."enum__site_settings_v_version_blog_blog_meta_robots";
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
  DROP TYPE "public"."enum_page_variants_blocks_blog_section_style";`)
}
