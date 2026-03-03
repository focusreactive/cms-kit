import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"position" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_presets_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar DEFAULT 'My Site',
  	"seo_title_suffix" varchar,
  	"default_og_title" varchar,
  	"default_description" varchar,
  	"default_og_description" varchar,
  	"og_site_name" varchar,
  	"default_og_type" "enum_site_settings_default_og_type" DEFAULT 'website',
  	"twitter_site" varchar,
  	"twitter_creator" varchar,
  	"not_found_title" varchar DEFAULT '404 - Page not found',
  	"not_found_description" varchar DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_site_name" varchar DEFAULT 'My Site',
  	"version_seo_title_suffix" varchar,
  	"version_default_og_title" varchar,
  	"version_default_description" varchar,
  	"version_default_og_description" varchar,
  	"version_og_site_name" varchar,
  	"version_default_og_type" "enum__site_settings_v_version_default_og_type" DEFAULT 'website',
  	"version_twitter_site" varchar,
  	"version_twitter_creator" varchar,
  	"version_not_found_title" varchar DEFAULT '404 - Page not found',
  	"version_not_found_description" varchar DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "page" DROP CONSTRAINT "page_hero_media_id_media_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX "page_hero_hero_media_idx";
  DROP INDEX "_page_v_version_hero_version_hero_media_idx";
  DROP INDEX "page_meta_meta_image_idx";
  DROP INDEX "page_rels_page_id_idx";
  DROP INDEX "page_rels_posts_id_idx";
  DROP INDEX "_page_v_version_meta_version_meta_image_idx";
  DROP INDEX "_page_v_rels_page_id_idx";
  DROP INDEX "_page_v_rels_posts_id_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "testimonials_presets_rels_testimonials_id_idx";
  DROP INDEX "header_rels_page_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "_header_v_rels_page_id_idx";
  DROP INDEX "_header_v_rels_posts_id_idx";
  DROP INDEX "footer_rels_page_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  DROP INDEX "_footer_v_rels_page_id_idx";
  DROP INDEX "_footer_v_rels_posts_id_idx";
  DROP INDEX "blog_page_settings_meta_meta_image_idx";
  DROP INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx";
  ALTER TABLE "page_hero_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_blocks_text_section" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_blocks_content" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_blocks_faq_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_blocks_faq" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_blocks_testimonials_preset" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "page_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "page_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "page_locales" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "page_locales" ADD COLUMN "meta_robots" "enum_page_meta_robots" DEFAULT 'index';
  ALTER TABLE "page_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_page_v_version_hero_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_blocks_text_section" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_blocks_faq_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_blocks_faq" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_blocks_testimonials_preset" ADD COLUMN "_locale" "_locales";
  UPDATE "page_hero_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "page_blocks_text_section" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "page_blocks_content" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "page_blocks_faq_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "page_blocks_faq" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "page_blocks_testimonials_preset" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_version_hero_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_blocks_text_section" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_blocks_content" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_blocks_faq_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_blocks_faq" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_blocks_testimonials_preset" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  ALTER TABLE "page_hero_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "page_blocks_text_section" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "page_blocks_faq" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "page_blocks_testimonials_preset" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_version_hero_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_text_section" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_testimonials_preset" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_meta_robots" "enum__page_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "_page_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "posts_locales" ADD COLUMN "title" varchar;
  ALTER TABLE "posts_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts_locales" ADD COLUMN "related_posts_intro" varchar DEFAULT 'Related Posts';
  ALTER TABLE "posts_locales" ADD COLUMN "meta_robots" "enum_posts_meta_robots" DEFAULT 'index';
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_related_posts_intro" varchar DEFAULT 'Related Posts';
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_meta_robots" "enum__posts_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "testimonials_presets_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "header_nav_items_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "header_nav_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "header_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_header_v_version_nav_items_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_header_v_version_nav_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_header_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "footer_nav_items_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "footer_nav_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "footer_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_footer_v_version_nav_items_links" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_footer_v_version_nav_items" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_footer_v_rels" ADD COLUMN "locale" "_locales";
  UPDATE "header_nav_items_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "header_nav_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_header_v_version_nav_items_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_header_v_version_nav_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "footer_nav_items_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "footer_nav_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_footer_v_version_nav_items_links" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_footer_v_version_nav_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  ALTER TABLE "header_nav_items_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_header_v_version_nav_items_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_header_v_version_nav_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "footer_nav_items_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_footer_v_version_nav_items_links" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_footer_v_version_nav_items" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "blog_page_settings_locales" ADD COLUMN "title" varchar DEFAULT 'Blog';
  ALTER TABLE "blog_page_settings_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "blog_page_settings_locales" ADD COLUMN "meta_robots" "enum_blog_page_settings_meta_robots" DEFAULT 'index';
  ALTER TABLE "_blog_page_settings_v_locales" ADD COLUMN "version_title" varchar DEFAULT 'Blog';
  ALTER TABLE "_blog_page_settings_v_locales" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_blog_page_settings_v_locales" ADD COLUMN "version_meta_robots" "enum__blog_page_settings_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_locales" ADD CONSTRAINT "testimonials_presets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_presets_locales_locale_parent_id_unique" ON "testimonials_presets_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_hero_links_locale_idx" ON "page_hero_links" USING btree ("_locale");
  CREATE INDEX "page_blocks_text_section_locale_idx" ON "page_blocks_text_section" USING btree ("_locale");
  CREATE INDEX "page_blocks_content_locale_idx" ON "page_blocks_content" USING btree ("_locale");
  CREATE INDEX "page_blocks_faq_items_locale_idx" ON "page_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "page_blocks_faq_locale_idx" ON "page_blocks_faq" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_preset_locale_idx" ON "page_blocks_testimonials_preset" USING btree ("_locale");
  CREATE INDEX "page_hero_hero_media_idx" ON "page_locales" USING btree ("hero_media_id");
  CREATE INDEX "page_rels_locale_idx" ON "page_rels" USING btree ("locale");
  CREATE INDEX "_page_v_version_hero_links_locale_idx" ON "_page_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_text_section_locale_idx" ON "_page_v_blocks_text_section" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_content_locale_idx" ON "_page_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_faq_items_locale_idx" ON "_page_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_faq_locale_idx" ON "_page_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_preset_locale_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_locale");
  CREATE INDEX "_page_v_version_hero_version_hero_media_idx" ON "_page_v_locales" USING btree ("version_hero_media_id");
  CREATE INDEX "_page_v_rels_locale_idx" ON "_page_v_rels" USING btree ("locale");
  CREATE INDEX "testimonials_presets_rels_locale_idx" ON "testimonials_presets_rels" USING btree ("locale");
  CREATE INDEX "header_nav_items_links_locale_idx" ON "header_nav_items_links" USING btree ("_locale");
  CREATE INDEX "header_nav_items_locale_idx" ON "header_nav_items" USING btree ("_locale");
  CREATE INDEX "header_rels_locale_idx" ON "header_rels" USING btree ("locale");
  CREATE INDEX "_header_v_version_nav_items_links_locale_idx" ON "_header_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_header_v_version_nav_items_locale_idx" ON "_header_v_version_nav_items" USING btree ("_locale");
  CREATE INDEX "_header_v_rels_locale_idx" ON "_header_v_rels" USING btree ("locale");
  CREATE INDEX "footer_nav_items_links_locale_idx" ON "footer_nav_items_links" USING btree ("_locale");
  CREATE INDEX "footer_nav_items_locale_idx" ON "footer_nav_items" USING btree ("_locale");
  CREATE INDEX "footer_rels_locale_idx" ON "footer_rels" USING btree ("locale");
  CREATE INDEX "_footer_v_version_nav_items_links_locale_idx" ON "_footer_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_footer_v_version_nav_items_locale_idx" ON "_footer_v_version_nav_items" USING btree ("_locale");
  CREATE INDEX "_footer_v_rels_locale_idx" ON "_footer_v_rels" USING btree ("locale");
  CREATE INDEX "page_meta_meta_image_idx" ON "page_locales" USING btree ("meta_image_id");
  CREATE INDEX "page_rels_page_id_idx" ON "page_rels" USING btree ("page_id","locale");
  CREATE INDEX "page_rels_posts_id_idx" ON "page_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v_locales" USING btree ("version_meta_image_id");
  CREATE INDEX "_page_v_rels_page_id_idx" ON "_page_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_page_v_rels_posts_id_idx" ON "_page_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id");
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "header_rels_page_id_idx" ON "header_rels" USING btree ("page_id","locale");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_header_v_rels_page_id_idx" ON "_header_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "footer_rels_page_id_idx" ON "footer_rels" USING btree ("page_id","locale");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id","locale");
  CREATE INDEX "_footer_v_rels_page_id_idx" ON "_footer_v_rels" USING btree ("page_id","locale");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings_locales" USING btree ("meta_image_id");
  CREATE INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v_locales" USING btree ("version_meta_image_id");
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "page" DROP COLUMN "title";
  ALTER TABLE "page" DROP COLUMN "hero_rich_text";
  ALTER TABLE "page" DROP COLUMN "hero_media_id";
  ALTER TABLE "page" DROP COLUMN "meta_robots";
  ALTER TABLE "_page_v" DROP COLUMN "version_title";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots";
  ALTER TABLE "categories" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "related_posts_intro";
  ALTER TABLE "posts" DROP COLUMN "meta_robots";
  ALTER TABLE "_posts_v" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v" DROP COLUMN "version_related_posts_intro";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots";
  ALTER TABLE "testimonials" DROP COLUMN "position";
  ALTER TABLE "testimonials_presets" DROP COLUMN "name";
  ALTER TABLE "testimonials_presets" DROP COLUMN "description";
  ALTER TABLE "testimonials_presets" DROP COLUMN "heading";
  ALTER TABLE "testimonials_presets" DROP COLUMN "subheading";
  ALTER TABLE "site_settings" DROP COLUMN "site_name";
  ALTER TABLE "site_settings" DROP COLUMN "seo_title_suffix";
  ALTER TABLE "site_settings" DROP COLUMN "default_og_title";
  ALTER TABLE "site_settings" DROP COLUMN "default_description";
  ALTER TABLE "site_settings" DROP COLUMN "default_og_description";
  ALTER TABLE "site_settings" DROP COLUMN "og_site_name";
  ALTER TABLE "site_settings" DROP COLUMN "default_og_type";
  ALTER TABLE "site_settings" DROP COLUMN "twitter_site";
  ALTER TABLE "site_settings" DROP COLUMN "twitter_creator";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_title";
  ALTER TABLE "site_settings" DROP COLUMN "not_found_description";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_site_name";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_seo_title_suffix";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_default_og_title";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_default_description";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_default_og_description";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_og_site_name";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_default_og_type";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_twitter_site";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_twitter_creator";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_not_found_title";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_not_found_description";
  ALTER TABLE "blog_page_settings" DROP COLUMN "title";
  ALTER TABLE "blog_page_settings" DROP COLUMN "description";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_robots";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_title";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_description";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_robots";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales_hero_media_id_media_id_fk";
  
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT "_page_v_locales_version_hero_media_id_media_id_fk";
  
  DROP INDEX "page_hero_links_locale_idx";
  DROP INDEX "page_blocks_text_section_locale_idx";
  DROP INDEX "page_blocks_content_locale_idx";
  DROP INDEX "page_blocks_faq_items_locale_idx";
  DROP INDEX "page_blocks_faq_locale_idx";
  DROP INDEX "page_blocks_testimonials_preset_locale_idx";
  DROP INDEX "page_hero_hero_media_idx";
  DROP INDEX "page_rels_locale_idx";
  DROP INDEX "_page_v_version_hero_links_locale_idx";
  DROP INDEX "_page_v_blocks_text_section_locale_idx";
  DROP INDEX "_page_v_blocks_content_locale_idx";
  DROP INDEX "_page_v_blocks_faq_items_locale_idx";
  DROP INDEX "_page_v_blocks_faq_locale_idx";
  DROP INDEX "_page_v_blocks_testimonials_preset_locale_idx";
  DROP INDEX "_page_v_version_hero_version_hero_media_idx";
  DROP INDEX "_page_v_rels_locale_idx";
  DROP INDEX "testimonials_presets_rels_locale_idx";
  DROP INDEX "header_nav_items_links_locale_idx";
  DROP INDEX "header_nav_items_locale_idx";
  DROP INDEX "header_rels_locale_idx";
  DROP INDEX "_header_v_version_nav_items_links_locale_idx";
  DROP INDEX "_header_v_version_nav_items_locale_idx";
  DROP INDEX "_header_v_rels_locale_idx";
  DROP INDEX "footer_nav_items_links_locale_idx";
  DROP INDEX "footer_nav_items_locale_idx";
  DROP INDEX "footer_rels_locale_idx";
  DROP INDEX "_footer_v_version_nav_items_links_locale_idx";
  DROP INDEX "_footer_v_version_nav_items_locale_idx";
  DROP INDEX "_footer_v_rels_locale_idx";
  DROP INDEX "page_meta_meta_image_idx";
  DROP INDEX "page_rels_page_id_idx";
  DROP INDEX "page_rels_posts_id_idx";
  DROP INDEX "_page_v_version_meta_version_meta_image_idx";
  DROP INDEX "_page_v_rels_page_id_idx";
  DROP INDEX "_page_v_rels_posts_id_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "testimonials_presets_rels_testimonials_id_idx";
  DROP INDEX "header_rels_page_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "_header_v_rels_page_id_idx";
  DROP INDEX "_header_v_rels_posts_id_idx";
  DROP INDEX "footer_rels_page_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  DROP INDEX "_footer_v_rels_page_id_idx";
  DROP INDEX "_footer_v_rels_posts_id_idx";
  DROP INDEX "blog_page_settings_meta_meta_image_idx";
  DROP INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar;
  ALTER TABLE "media" ADD COLUMN "caption" jsonb;
  ALTER TABLE "page" ADD COLUMN "title" varchar;
  ALTER TABLE "page" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "page" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "page" ADD COLUMN "meta_robots" "enum_page_meta_robots" DEFAULT 'index';
  ALTER TABLE "_page_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots" "enum__page_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "categories" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN "related_posts_intro" varchar DEFAULT 'Related Posts';
  ALTER TABLE "posts" ADD COLUMN "meta_robots" "enum_posts_meta_robots" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN "version_related_posts_intro" varchar DEFAULT 'Related Posts';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots" "enum__posts_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "testimonials" ADD COLUMN "position" varchar;
  ALTER TABLE "testimonials_presets" ADD COLUMN "name" varchar;
  ALTER TABLE "testimonials_presets" ADD COLUMN "description" varchar;
  ALTER TABLE "testimonials_presets" ADD COLUMN "heading" varchar;
  ALTER TABLE "testimonials_presets" ADD COLUMN "subheading" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "site_name" varchar DEFAULT 'My Site';
  ALTER TABLE "site_settings" ADD COLUMN "seo_title_suffix" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_og_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_og_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "og_site_name" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "default_og_type" "enum_site_settings_default_og_type" DEFAULT 'website';
  ALTER TABLE "site_settings" ADD COLUMN "twitter_site" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "twitter_creator" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "not_found_title" varchar DEFAULT '404 - Page not found';
  ALTER TABLE "site_settings" ADD COLUMN "not_found_description" varchar DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_site_name" varchar DEFAULT 'My Site';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_seo_title_suffix" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_default_og_title" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_default_description" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_default_og_description" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_og_site_name" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_default_og_type" "enum__site_settings_v_version_default_og_type" DEFAULT 'website';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_twitter_site" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_twitter_creator" varchar;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_not_found_title" varchar DEFAULT '404 - Page not found';
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_not_found_description" varchar DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.';
  ALTER TABLE "blog_page_settings" ADD COLUMN "title" varchar DEFAULT 'Blog';
  ALTER TABLE "blog_page_settings" ADD COLUMN "description" varchar;
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_robots" "enum_blog_page_settings_meta_robots" DEFAULT 'index';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_title" varchar DEFAULT 'Blog';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_robots" "enum__blog_page_settings_v_version_meta_robots" DEFAULT 'index';

  -- restore non-localized values from *_locales (prefer 'en')
  UPDATE "media" m
  SET
    alt = (
      SELECT alt
      FROM "media_locales" ml
      WHERE ml."_parent_id" = m.id
      ORDER BY (ml."_locale" = 'en') DESC
      LIMIT 1
    ),
    caption = (
      SELECT caption
      FROM "media_locales" ml
      WHERE ml."_parent_id" = m.id
      ORDER BY (ml."_locale" = 'en') DESC
      LIMIT 1
    );

  UPDATE "categories" c
  SET title = (
    SELECT title
    FROM "categories_locales" cl
    WHERE cl."_parent_id" = c.id
    ORDER BY (cl."_locale" = 'en') DESC
    LIMIT 1
  );

  UPDATE "testimonials_presets" tp
  SET
    name = (
      SELECT name
      FROM "testimonials_presets_locales" tpl
      WHERE tpl."_parent_id" = tp.id
      ORDER BY (tpl."_locale" = 'en') DESC
      LIMIT 1
    ),
    description = (
      SELECT description
      FROM "testimonials_presets_locales" tpl
      WHERE tpl."_parent_id" = tp.id
      ORDER BY (tpl."_locale" = 'en') DESC
      LIMIT 1
    ),
    heading = (
      SELECT heading
      FROM "testimonials_presets_locales" tpl
      WHERE tpl."_parent_id" = tp.id
      ORDER BY (tpl."_locale" = 'en') DESC
      LIMIT 1
    ),
    subheading = (
      SELECT subheading
      FROM "testimonials_presets_locales" tpl
      WHERE tpl."_parent_id" = tp.id
      ORDER BY (tpl."_locale" = 'en') DESC
      LIMIT 1
    );

  -- fill remaining NULLs for NOT NULL columns and enforce constraints
  UPDATE "media" SET alt = '' WHERE alt IS NULL;
  ALTER TABLE "media" ALTER COLUMN "alt" SET NOT NULL;

  UPDATE "categories" SET title = '' WHERE title IS NULL;
  ALTER TABLE "categories" ALTER COLUMN "title" SET NOT NULL;

  UPDATE "testimonials_presets" SET name = '' WHERE name IS NULL;
  ALTER TABLE "testimonials_presets" ALTER COLUMN "name" SET NOT NULL;

  -- now safe to drop locales tables
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "testimonials_presets_locales" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  ALTER TABLE "page" ADD CONSTRAINT "page_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_hero_hero_media_idx" ON "page" USING btree ("hero_media_id");
  CREATE INDEX "_page_v_version_hero_version_hero_media_idx" ON "_page_v" USING btree ("version_hero_media_id");
  CREATE INDEX "page_meta_meta_image_idx" ON "page_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "page_rels_page_id_idx" ON "page_rels" USING btree ("page_id");
  CREATE INDEX "page_rels_posts_id_idx" ON "page_rels" USING btree ("posts_id");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "_page_v_rels_page_id_idx" ON "_page_v_rels" USING btree ("page_id");
  CREATE INDEX "_page_v_rels_posts_id_idx" ON "_page_v_rels" USING btree ("posts_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id");
  CREATE INDEX "header_rels_page_id_idx" ON "header_rels" USING btree ("page_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "_header_v_rels_page_id_idx" ON "_header_v_rels" USING btree ("page_id");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_page_id_idx" ON "footer_rels" USING btree ("page_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "_footer_v_rels_page_id_idx" ON "_footer_v_rels" USING btree ("page_id");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id");
  CREATE INDEX "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v_locales" USING btree ("version_meta_image_id","_locale");
  ALTER TABLE "page_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "page_blocks_text_section" DROP COLUMN "_locale";
  ALTER TABLE "page_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "page_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "page_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "page_blocks_testimonials_preset" DROP COLUMN "_locale";
  ALTER TABLE "page_locales" DROP COLUMN "title";
  ALTER TABLE "page_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "page_locales" DROP COLUMN "hero_media_id";
  ALTER TABLE "page_locales" DROP COLUMN "meta_robots";
  ALTER TABLE "page_rels" DROP COLUMN "locale";
  ALTER TABLE "_page_v_version_hero_links" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_blocks_text_section" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_blocks_testimonials_preset" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_meta_robots";
  ALTER TABLE "_page_v_rels" DROP COLUMN "locale";
  ALTER TABLE "posts_locales" DROP COLUMN "title";
  ALTER TABLE "posts_locales" DROP COLUMN "content";
  ALTER TABLE "posts_locales" DROP COLUMN "related_posts_intro";
  ALTER TABLE "posts_locales" DROP COLUMN "meta_robots";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_content";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_related_posts_intro";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_meta_robots";
  ALTER TABLE "testimonials_presets_rels" DROP COLUMN "locale";
  ALTER TABLE "header_nav_items_links" DROP COLUMN "_locale";
  ALTER TABLE "header_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "header_rels" DROP COLUMN "locale";
  ALTER TABLE "_header_v_version_nav_items_links" DROP COLUMN "_locale";
  ALTER TABLE "_header_v_version_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "_header_v_rels" DROP COLUMN "locale";
  ALTER TABLE "footer_nav_items_links" DROP COLUMN "_locale";
  ALTER TABLE "footer_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "footer_rels" DROP COLUMN "locale";
  ALTER TABLE "_footer_v_version_nav_items_links" DROP COLUMN "_locale";
  ALTER TABLE "_footer_v_version_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "_footer_v_rels" DROP COLUMN "locale";
  ALTER TABLE "blog_page_settings_locales" DROP COLUMN "title";
  ALTER TABLE "blog_page_settings_locales" DROP COLUMN "description";
  ALTER TABLE "blog_page_settings_locales" DROP COLUMN "meta_robots";
  ALTER TABLE "_blog_page_settings_v_locales" DROP COLUMN "version_title";
  ALTER TABLE "_blog_page_settings_v_locales" DROP COLUMN "version_description";
  ALTER TABLE "_blog_page_settings_v_locales" DROP COLUMN "version_meta_robots";`)
}
