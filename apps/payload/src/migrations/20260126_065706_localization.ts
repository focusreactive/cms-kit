import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__page_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__header_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__footer_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__site_settings_v_published_locale" AS ENUM('en', 'es');
  CREATE TYPE "public"."enum__blog_page_settings_v_published_locale" AS ENUM('en', 'es');
  CREATE TABLE "page_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_page_settings_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_blog_page_settings_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "page" DROP CONSTRAINT "page_meta_image_id_media_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "blog_page_settings" DROP CONSTRAINT "blog_page_settings_meta_image_id_media_id_fk";
  
  ALTER TABLE "_blog_page_settings_v" DROP CONSTRAINT "_blog_page_settings_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "page_meta_meta_image_idx";
  DROP INDEX "_page_v_version_meta_version_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "blog_page_settings_meta_meta_image_idx";
  DROP INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx";
  ALTER TABLE "page_breadcrumbs" ADD COLUMN "_locale" "_locales";
  ALTER TABLE "_page_v_version_breadcrumbs" ADD COLUMN "_locale" "_locales";
  UPDATE "page_breadcrumbs" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  UPDATE "_page_v_version_breadcrumbs" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  ALTER TABLE "page_breadcrumbs" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v_version_breadcrumbs" ALTER COLUMN "_locale" SET NOT NULL;
  ALTER TABLE "_page_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_page_v" ADD COLUMN "published_locale" "enum__page_v_published_locale";
  ALTER TABLE "_posts_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN "published_locale" "enum__posts_v_published_locale";
  ALTER TABLE "_header_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_header_v" ADD COLUMN "published_locale" "enum__header_v_published_locale";
  ALTER TABLE "_footer_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_footer_v" ADD COLUMN "published_locale" "enum__footer_v_published_locale";
  ALTER TABLE "_site_settings_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_site_settings_v" ADD COLUMN "published_locale" "enum__site_settings_v_published_locale";
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "published_locale" "enum__blog_page_settings_v_published_locale";
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_settings_locales" ADD CONSTRAINT "blog_page_settings_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings_locales" ADD CONSTRAINT "blog_page_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_locales" ADD CONSTRAINT "_blog_page_settings_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_locales" ADD CONSTRAINT "_blog_page_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_page_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_meta_meta_image_idx" ON "page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "page_locales_locale_parent_id_unique" ON "page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_page_v_locales_locale_parent_id_unique" ON "_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "blog_page_settings_locales_locale_parent_id_unique" ON "blog_page_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_blog_page_settings_v_locales_locale_parent_id_unique" ON "_blog_page_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_breadcrumbs_locale_idx" ON "page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_page_v_version_breadcrumbs_locale_idx" ON "_page_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_page_v_snapshot_idx" ON "_page_v" USING btree ("snapshot");
  CREATE INDEX "_page_v_published_locale_idx" ON "_page_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_header_v_snapshot_idx" ON "_header_v" USING btree ("snapshot");
  CREATE INDEX "_header_v_published_locale_idx" ON "_header_v" USING btree ("published_locale");
  CREATE INDEX "_footer_v_snapshot_idx" ON "_footer_v" USING btree ("snapshot");
  CREATE INDEX "_footer_v_published_locale_idx" ON "_footer_v" USING btree ("published_locale");
  CREATE INDEX "_site_settings_v_snapshot_idx" ON "_site_settings_v" USING btree ("snapshot");
  CREATE INDEX "_site_settings_v_published_locale_idx" ON "_site_settings_v" USING btree ("published_locale");
  CREATE INDEX "_blog_page_settings_v_snapshot_idx" ON "_blog_page_settings_v" USING btree ("snapshot");
  CREATE INDEX "_blog_page_settings_v_published_locale_idx" ON "_blog_page_settings_v" USING btree ("published_locale");
  ALTER TABLE "page" DROP COLUMN "meta_title";
  ALTER TABLE "page" DROP COLUMN "meta_image_id";
  ALTER TABLE "page" DROP COLUMN "meta_description";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_title";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_image_id";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_description";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_settings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_locales" CASCADE;
  DROP TABLE "_page_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "blog_page_settings_locales" CASCADE;
  DROP TABLE "_blog_page_settings_v_locales" CASCADE;
  DROP INDEX "page_breadcrumbs_locale_idx";
  DROP INDEX "_page_v_version_breadcrumbs_locale_idx";
  DROP INDEX "_page_v_snapshot_idx";
  DROP INDEX "_page_v_published_locale_idx";
  DROP INDEX "_posts_v_snapshot_idx";
  DROP INDEX "_posts_v_published_locale_idx";
  DROP INDEX "_header_v_snapshot_idx";
  DROP INDEX "_header_v_published_locale_idx";
  DROP INDEX "_footer_v_snapshot_idx";
  DROP INDEX "_footer_v_published_locale_idx";
  DROP INDEX "_site_settings_v_snapshot_idx";
  DROP INDEX "_site_settings_v_published_locale_idx";
  DROP INDEX "_blog_page_settings_v_snapshot_idx";
  DROP INDEX "_blog_page_settings_v_published_locale_idx";
  ALTER TABLE "page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "page" ADD CONSTRAINT "page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings" ADD CONSTRAINT "blog_page_settings_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_meta_meta_image_idx" ON "page" USING btree ("meta_image_id");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v" USING btree ("version_meta_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings" USING btree ("meta_image_id");
  CREATE INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v" USING btree ("version_meta_image_id");
  ALTER TABLE "page_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_version_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "_page_v" DROP COLUMN "snapshot";
  ALTER TABLE "_page_v" DROP COLUMN "published_locale";
  ALTER TABLE "_posts_v" DROP COLUMN "snapshot";
  ALTER TABLE "_posts_v" DROP COLUMN "published_locale";
  ALTER TABLE "_header_v" DROP COLUMN "snapshot";
  ALTER TABLE "_header_v" DROP COLUMN "published_locale";
  ALTER TABLE "_footer_v" DROP COLUMN "snapshot";
  ALTER TABLE "_footer_v" DROP COLUMN "published_locale";
  ALTER TABLE "_site_settings_v" DROP COLUMN "snapshot";
  ALTER TABLE "_site_settings_v" DROP COLUMN "published_locale";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "snapshot";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "published_locale";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum__page_v_published_locale";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum__header_v_published_locale";
  DROP TYPE "public"."enum__footer_v_published_locale";
  DROP TYPE "public"."enum__site_settings_v_published_locale";
  DROP TYPE "public"."enum__blog_page_settings_v_published_locale";`)
}
