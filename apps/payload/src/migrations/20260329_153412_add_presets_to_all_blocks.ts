import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_presets_cards_grid_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_custom_page" AS ENUM('blog');
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_cards_grid_items_align_variant" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_presets_cards_grid_items_rounded" AS ENUM('none', 'large');
  CREATE TYPE "public"."enum_presets_cards_grid_items_background_color" AS ENUM('none', 'light', 'dark', 'light-gray', 'dark-gray', 'gradient-2');
  CREATE TYPE "public"."enum_presets_carousel_slides_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_logos_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_logos_items_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_logos_items_link_custom_page" AS ENUM('blog');
  CREATE TYPE "public"."enum_presets_links_list_links_link_type" AS ENUM('reference', 'custom', 'customPage');
  CREATE TYPE "public"."enum_presets_links_list_links_link_custom_page" AS ENUM('blog');
  CREATE TYPE "public"."enum_presets_links_list_links_link_appearance" AS ENUM('default', 'outline');
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
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'textSection' BEFORE 'testimonialsList';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'content' BEFORE 'testimonialsList';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'faq' BEFORE 'testimonialsList';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'cardsGrid';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'carousel';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'logos';
  ALTER TYPE "public"."enum_presets_type" ADD VALUE 'linksList';
  CREATE TABLE "presets_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
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
  
  DROP INDEX "presets_rels_page_id_idx";
  DROP INDEX "presets_rels_posts_id_idx";
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
  ALTER TABLE "presets_locales" ADD COLUMN "text_section_text" jsonb;
  ALTER TABLE "presets_locales" ADD COLUMN "content_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "content_content" jsonb;
  ALTER TABLE "presets_locales" ADD COLUMN "faq_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "carousel_text" jsonb;
  ALTER TABLE "presets_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "presets_faq_items" ADD CONSTRAINT "presets_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_cards_grid_items" ADD CONSTRAINT "presets_cards_grid_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_cards_grid_items" ADD CONSTRAINT "presets_cards_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_carousel_slides" ADD CONSTRAINT "presets_carousel_slides_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_carousel_slides" ADD CONSTRAINT "presets_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_logos_items" ADD CONSTRAINT "presets_logos_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_logos_items" ADD CONSTRAINT "presets_logos_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_links_list_links" ADD CONSTRAINT "presets_links_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "presets_faq_items_order_idx" ON "presets_faq_items" USING btree ("_order");
  CREATE INDEX "presets_faq_items_parent_id_idx" ON "presets_faq_items" USING btree ("_parent_id");
  CREATE INDEX "presets_faq_items_locale_idx" ON "presets_faq_items" USING btree ("_locale");
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
  CREATE INDEX "presets_logos_items_image_image_image_idx" ON "presets_logos_items" USING btree ("image_image_id");
  CREATE INDEX "presets_links_list_links_order_idx" ON "presets_links_list_links" USING btree ("_order");
  CREATE INDEX "presets_links_list_links_parent_id_idx" ON "presets_links_list_links" USING btree ("_parent_id");
  CREATE INDEX "presets_links_list_links_locale_idx" ON "presets_links_list_links" USING btree ("_locale");
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
  CREATE INDEX "presets_rels_locale_idx" ON "presets_rels" USING btree ("locale");
  CREATE INDEX "presets_rels_page_id_idx" ON "presets_rels" USING btree ("page_id","locale");
  CREATE INDEX "presets_rels_posts_id_idx" ON "presets_rels" USING btree ("posts_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "presets_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_cards_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_logos_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_links_list_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "presets_faq_items" CASCADE;
  DROP TABLE "presets_cards_grid_items" CASCADE;
  DROP TABLE "presets_carousel_slides" CASCADE;
  DROP TABLE "presets_logos_items" CASCADE;
  DROP TABLE "presets_links_list_links" CASCADE;
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
  
  ALTER TABLE "presets" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_presets_type";
  CREATE TYPE "public"."enum_presets_type" AS ENUM('hero', 'testimonialsList');
  ALTER TABLE "presets" ALTER COLUMN "type" SET DATA TYPE "public"."enum_presets_type" USING "type"::"public"."enum_presets_type";
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
  DROP INDEX "presets_rels_locale_idx";
  DROP INDEX "presets_rels_page_id_idx";
  DROP INDEX "presets_rels_posts_id_idx";
  CREATE INDEX "presets_rels_page_id_idx" ON "presets_rels" USING btree ("page_id");
  CREATE INDEX "presets_rels_posts_id_idx" ON "presets_rels" USING btree ("posts_id");
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
  ALTER TABLE "presets_locales" DROP COLUMN "text_section_text";
  ALTER TABLE "presets_locales" DROP COLUMN "content_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "content_content";
  ALTER TABLE "presets_locales" DROP COLUMN "faq_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "carousel_text";
  ALTER TABLE "presets_rels" DROP COLUMN "locale";
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
