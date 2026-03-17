import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "abmanifest" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"manifest" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE IF EXISTS "page_variants_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_text_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_testimonials_list_testimonial_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_cards_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_links_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_links_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_blocks_blog_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE IF EXISTS "page_variants_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "page_variants_blocks_hero_actions" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_hero" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_text_section" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_content" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_faq_items" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_faq" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_testimonials_list_testimonial_items" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_testimonials_list" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_cards_grid_items" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_cards_grid" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_carousel_slides" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_carousel" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_logos_items" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_logos" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_links_list_links" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_links_list" CASCADE;
  DROP TABLE IF EXISTS "page_variants_blocks_blog_section" CASCADE;
  DROP TABLE IF EXISTS "page_variants" CASCADE;
  DROP TABLE IF EXISTS "page_variants_locales" CASCADE;
  DROP TABLE IF EXISTS "page_variants_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_page_variants_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_page_variants_id_idx";
  ALTER TABLE "page" ADD COLUMN "_abpasspercentage" numeric;
  ALTER TABLE "page" ADD COLUMN "_abvariantof_id" integer;
  ALTER TABLE "page" ADD COLUMN "_abvariantpercentages" jsonb;
  ALTER TABLE "_page_v" ADD COLUMN "version__abpasspercentage" numeric;
  ALTER TABLE "_page_v" ADD COLUMN "version__abvariantof_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version__abvariantpercentages" jsonb;
  ALTER TABLE "page" ADD CONSTRAINT "page__abvariantof_id_page_id_fk" FOREIGN KEY ("_abvariantof_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version__abvariantof_id_page_id_fk" FOREIGN KEY ("version__abvariantof_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page__abvariantof_idx" ON "page" USING btree ("_abvariantof_id");
  CREATE INDEX "_page_v_version_version__abvariantof_idx" ON "_page_v" USING btree ("version__abvariantof_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "page_variants_id";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_hero_actions_type";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_hero_actions_appearance";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_hero_color";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_content_layout";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_cards_grid_items_link_type";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_cards_grid_items_link_appearance";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_cards_grid_items_align_variant";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_cards_grid_items_rounded";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_cards_grid_items_background_color";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_carousel_effect";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_logos_items_link_type";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_logos_align_variant";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_links_list_links_link_type";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_links_list_links_link_appearance";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_links_list_align_variant";
  DROP TYPE IF EXISTS "public"."enum_page_variants_blocks_blog_section_style";
  DROP TYPE IF EXISTS "public"."enum_page_variants_bucket_i_d";
  DROP TYPE IF EXISTS "public"."enum_page_variants_meta_robots";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "abmanifest" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "abmanifest" CASCADE;
  ALTER TABLE "page" DROP CONSTRAINT "page__abvariantof_id_page_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version__abvariantof_id_page_id_fk";
  
  DROP INDEX "page__abvariantof_idx";
  DROP INDEX "_page_v_version_version__abvariantof_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "page_variants_id" integer;
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
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_variants_fk" FOREIGN KEY ("page_variants_id") REFERENCES "public"."page_variants"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_page_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("page_variants_id");
  ALTER TABLE "page" DROP COLUMN "_abpasspercentage";
  ALTER TABLE "page" DROP COLUMN "_abvariantof_id";
  ALTER TABLE "page" DROP COLUMN "_abvariantpercentages";
  ALTER TABLE "_page_v" DROP COLUMN "version__abpasspercentage";
  ALTER TABLE "_page_v" DROP COLUMN "version__abvariantof_id";
  ALTER TABLE "_page_v" DROP COLUMN "version__abvariantpercentages";`)
}
