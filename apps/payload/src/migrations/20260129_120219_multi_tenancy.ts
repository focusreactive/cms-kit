import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "media_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "page_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_page_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "categories_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "authors_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "posts_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_posts_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "testimonials_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "testimonials_presets_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "header_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_header_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "footer_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_footer_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "site_settings_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_site_settings_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "blog_page_settings_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "_blog_page_settings_v_version_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "redirects_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  DROP TABLE IF EXISTS "tenant_announcements_announcements" CASCADE;
  DROP TABLE IF EXISTS "tenant_announcements" CASCADE;
  ALTER TABLE "tenants" DROP CONSTRAINT IF EXISTS "tenants_created_by_id_users_id_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_tenant_announcements_fk";
  DROP INDEX IF EXISTS "tenants_created_by_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tenant_announcements_id_idx";
  DROP INDEX IF EXISTS "page_slug_idx";
  DROP INDEX IF EXISTS "posts_slug_idx";
  ALTER TABLE "users_tenants" ALTER COLUMN "tenant_id" DROP NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "header" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "header" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "footer" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "footer" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "blog_page_settings" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "blog_page_settings" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "users" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "page" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "categories" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "authors" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "posts" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "testimonials" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "testimonials_presets" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "redirects" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "header_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "footer_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_settings_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_page_settings_id" integer;
  ALTER TABLE "header" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_header_v" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_header_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "footer" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_footer_v" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_footer_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "blog_page_settings" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "media_tenants" ADD CONSTRAINT "media_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_tenants" ADD CONSTRAINT "media_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_tenants" ADD CONSTRAINT "page_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_tenants" ADD CONSTRAINT "page_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_version_tenants" ADD CONSTRAINT "_page_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_version_tenants" ADD CONSTRAINT "_page_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_tenants" ADD CONSTRAINT "categories_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_tenants" ADD CONSTRAINT "categories_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors_tenants" ADD CONSTRAINT "authors_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_tenants" ADD CONSTRAINT "authors_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tenants" ADD CONSTRAINT "posts_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_tenants" ADD CONSTRAINT "posts_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tenants" ADD CONSTRAINT "_posts_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tenants" ADD CONSTRAINT "_posts_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_tenants" ADD CONSTRAINT "testimonials_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_tenants" ADD CONSTRAINT "testimonials_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_tenants" ADD CONSTRAINT "testimonials_presets_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_presets_tenants" ADD CONSTRAINT "testimonials_presets_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_tenants" ADD CONSTRAINT "header_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_tenants" ADD CONSTRAINT "header_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_tenants" ADD CONSTRAINT "_header_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v_version_tenants" ADD CONSTRAINT "_header_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_tenants" ADD CONSTRAINT "footer_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_tenants" ADD CONSTRAINT "footer_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_tenants" ADD CONSTRAINT "_footer_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v_version_tenants" ADD CONSTRAINT "_footer_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_tenants" ADD CONSTRAINT "site_settings_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_tenants" ADD CONSTRAINT "site_settings_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_tenants" ADD CONSTRAINT "_site_settings_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_tenants" ADD CONSTRAINT "_site_settings_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_page_settings_tenants" ADD CONSTRAINT "blog_page_settings_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings_tenants" ADD CONSTRAINT "blog_page_settings_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_version_tenants" ADD CONSTRAINT "_blog_page_settings_v_version_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v_version_tenants" ADD CONSTRAINT "_blog_page_settings_v_version_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_page_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_tenants" ADD CONSTRAINT "redirects_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_tenants" ADD CONSTRAINT "redirects_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_tenants_order_idx" ON "media_tenants" USING btree ("_order");
  CREATE INDEX "media_tenants_parent_id_idx" ON "media_tenants" USING btree ("_parent_id");
  CREATE INDEX "media_tenants_tenant_idx" ON "media_tenants" USING btree ("tenant_id");
  CREATE INDEX "page_tenants_order_idx" ON "page_tenants" USING btree ("_order");
  CREATE INDEX "page_tenants_parent_id_idx" ON "page_tenants" USING btree ("_parent_id");
  CREATE INDEX "page_tenants_tenant_idx" ON "page_tenants" USING btree ("tenant_id");
  CREATE INDEX "_page_v_version_tenants_order_idx" ON "_page_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_page_v_version_tenants_parent_id_idx" ON "_page_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_page_v_version_tenants_tenant_idx" ON "_page_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "categories_tenants_order_idx" ON "categories_tenants" USING btree ("_order");
  CREATE INDEX "categories_tenants_parent_id_idx" ON "categories_tenants" USING btree ("_parent_id");
  CREATE INDEX "categories_tenants_tenant_idx" ON "categories_tenants" USING btree ("tenant_id");
  CREATE INDEX "authors_tenants_order_idx" ON "authors_tenants" USING btree ("_order");
  CREATE INDEX "authors_tenants_parent_id_idx" ON "authors_tenants" USING btree ("_parent_id");
  CREATE INDEX "authors_tenants_tenant_idx" ON "authors_tenants" USING btree ("tenant_id");
  CREATE INDEX "posts_tenants_order_idx" ON "posts_tenants" USING btree ("_order");
  CREATE INDEX "posts_tenants_parent_id_idx" ON "posts_tenants" USING btree ("_parent_id");
  CREATE INDEX "posts_tenants_tenant_idx" ON "posts_tenants" USING btree ("tenant_id");
  CREATE INDEX "_posts_v_version_tenants_order_idx" ON "_posts_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tenants_parent_id_idx" ON "_posts_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_tenants_tenant_idx" ON "_posts_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "testimonials_tenants_order_idx" ON "testimonials_tenants" USING btree ("_order");
  CREATE INDEX "testimonials_tenants_parent_id_idx" ON "testimonials_tenants" USING btree ("_parent_id");
  CREATE INDEX "testimonials_tenants_tenant_idx" ON "testimonials_tenants" USING btree ("tenant_id");
  CREATE INDEX "testimonials_presets_tenants_order_idx" ON "testimonials_presets_tenants" USING btree ("_order");
  CREATE INDEX "testimonials_presets_tenants_parent_id_idx" ON "testimonials_presets_tenants" USING btree ("_parent_id");
  CREATE INDEX "testimonials_presets_tenants_tenant_idx" ON "testimonials_presets_tenants" USING btree ("tenant_id");
  CREATE INDEX "header_tenants_order_idx" ON "header_tenants" USING btree ("_order");
  CREATE INDEX "header_tenants_parent_id_idx" ON "header_tenants" USING btree ("_parent_id");
  CREATE INDEX "header_tenants_tenant_idx" ON "header_tenants" USING btree ("tenant_id");
  CREATE INDEX "_header_v_version_tenants_order_idx" ON "_header_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_header_v_version_tenants_parent_id_idx" ON "_header_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_tenants_tenant_idx" ON "_header_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "footer_tenants_order_idx" ON "footer_tenants" USING btree ("_order");
  CREATE INDEX "footer_tenants_parent_id_idx" ON "footer_tenants" USING btree ("_parent_id");
  CREATE INDEX "footer_tenants_tenant_idx" ON "footer_tenants" USING btree ("tenant_id");
  CREATE INDEX "_footer_v_version_tenants_order_idx" ON "_footer_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_footer_v_version_tenants_parent_id_idx" ON "_footer_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_tenants_tenant_idx" ON "_footer_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "site_settings_tenants_order_idx" ON "site_settings_tenants" USING btree ("_order");
  CREATE INDEX "site_settings_tenants_parent_id_idx" ON "site_settings_tenants" USING btree ("_parent_id");
  CREATE INDEX "site_settings_tenants_tenant_idx" ON "site_settings_tenants" USING btree ("tenant_id");
  CREATE INDEX "_site_settings_v_version_tenants_order_idx" ON "_site_settings_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_tenants_parent_id_idx" ON "_site_settings_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_tenants_tenant_idx" ON "_site_settings_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "blog_page_settings_tenants_order_idx" ON "blog_page_settings_tenants" USING btree ("_order");
  CREATE INDEX "blog_page_settings_tenants_parent_id_idx" ON "blog_page_settings_tenants" USING btree ("_parent_id");
  CREATE INDEX "blog_page_settings_tenants_tenant_idx" ON "blog_page_settings_tenants" USING btree ("tenant_id");
  CREATE INDEX "_blog_page_settings_v_version_tenants_order_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("_order");
  CREATE INDEX "_blog_page_settings_v_version_tenants_parent_id_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("_parent_id");
  CREATE INDEX "_blog_page_settings_v_version_tenants_tenant_idx" ON "_blog_page_settings_v_version_tenants" USING btree ("tenant_id");
  CREATE INDEX "redirects_tenants_order_idx" ON "redirects_tenants" USING btree ("_order");
  CREATE INDEX "redirects_tenants_parent_id_idx" ON "redirects_tenants" USING btree ("_parent_id");
  CREATE INDEX "redirects_tenants_tenant_idx" ON "redirects_tenants" USING btree ("tenant_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_presets" ADD CONSTRAINT "testimonials_presets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects" ADD CONSTRAINT "redirects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_header_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_footer_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_settings_fk" FOREIGN KEY ("site_settings_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_page_settings_fk" FOREIGN KEY ("blog_page_settings_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_parent_id_header_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_parent_id_footer_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_parent_id_site_settings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_page_settings" ADD CONSTRAINT "blog_page_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_parent_id_blog_page_settings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_page_settings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_tenant_idx" ON "users" USING btree ("tenant_id");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "page_tenant_idx" ON "page" USING btree ("tenant_id");
  CREATE INDEX "_page_v_version_version_tenant_idx" ON "_page_v" USING btree ("version_tenant_id");
  CREATE INDEX "categories_tenant_idx" ON "categories" USING btree ("tenant_id");
  CREATE INDEX "authors_tenant_idx" ON "authors" USING btree ("tenant_id");
  CREATE INDEX "posts_tenant_idx" ON "posts" USING btree ("tenant_id");
  CREATE INDEX "_posts_v_version_version_tenant_idx" ON "_posts_v" USING btree ("version_tenant_id");
  CREATE INDEX "testimonials_tenant_idx" ON "testimonials" USING btree ("tenant_id");
  CREATE INDEX "testimonials_presets_tenant_idx" ON "testimonials_presets" USING btree ("tenant_id");
  CREATE INDEX "redirects_tenant_idx" ON "redirects" USING btree ("tenant_id");
  CREATE INDEX "payload_locked_documents_rels_header_id_idx" ON "payload_locked_documents_rels" USING btree ("header_id");
  CREATE INDEX "payload_locked_documents_rels_footer_id_idx" ON "payload_locked_documents_rels" USING btree ("footer_id");
  CREATE INDEX "payload_locked_documents_rels_site_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("site_settings_id");
  CREATE INDEX "payload_locked_documents_rels_blog_page_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_page_settings_id");
  CREATE INDEX "header_tenant_idx" ON "header" USING btree ("tenant_id");
  CREATE INDEX "header_updated_at_idx" ON "header" USING btree ("updated_at");
  CREATE INDEX "header_created_at_idx" ON "header" USING btree ("created_at");
  CREATE INDEX "_header_v_parent_idx" ON "_header_v" USING btree ("parent_id");
  CREATE INDEX "_header_v_version_version_tenant_idx" ON "_header_v" USING btree ("version_tenant_id");
  CREATE INDEX "_header_v_version_version_updated_at_idx" ON "_header_v" USING btree ("version_updated_at");
  CREATE INDEX "_header_v_version_version_created_at_idx" ON "_header_v" USING btree ("version_created_at");
  CREATE INDEX "footer_tenant_idx" ON "footer" USING btree ("tenant_id");
  CREATE INDEX "footer_updated_at_idx" ON "footer" USING btree ("updated_at");
  CREATE INDEX "footer_created_at_idx" ON "footer" USING btree ("created_at");
  CREATE INDEX "_footer_v_parent_idx" ON "_footer_v" USING btree ("parent_id");
  CREATE INDEX "_footer_v_version_version_tenant_idx" ON "_footer_v" USING btree ("version_tenant_id");
  CREATE INDEX "_footer_v_version_version_updated_at_idx" ON "_footer_v" USING btree ("version_updated_at");
  CREATE INDEX "_footer_v_version_version_created_at_idx" ON "_footer_v" USING btree ("version_created_at");
  CREATE INDEX "site_settings_tenant_idx" ON "site_settings" USING btree ("tenant_id");
  CREATE INDEX "site_settings_updated_at_idx" ON "site_settings" USING btree ("updated_at");
  CREATE INDEX "site_settings_created_at_idx" ON "site_settings" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_parent_idx" ON "_site_settings_v" USING btree ("parent_id");
  CREATE INDEX "_site_settings_v_version_version_tenant_idx" ON "_site_settings_v" USING btree ("version_tenant_id");
  CREATE INDEX "_site_settings_v_version_version_updated_at_idx" ON "_site_settings_v" USING btree ("version_updated_at");
  CREATE INDEX "_site_settings_v_version_version_created_at_idx" ON "_site_settings_v" USING btree ("version_created_at");
  CREATE INDEX "blog_page_settings_tenant_idx" ON "blog_page_settings" USING btree ("tenant_id");
  CREATE INDEX "blog_page_settings_updated_at_idx" ON "blog_page_settings" USING btree ("updated_at");
  CREATE INDEX "blog_page_settings_created_at_idx" ON "blog_page_settings" USING btree ("created_at");
  CREATE INDEX "_blog_page_settings_v_parent_idx" ON "_blog_page_settings_v" USING btree ("parent_id");
  CREATE INDEX "_blog_page_settings_v_version_version_tenant_idx" ON "_blog_page_settings_v" USING btree ("version_tenant_id");
  CREATE INDEX "_blog_page_settings_v_version_version_updated_at_idx" ON "_blog_page_settings_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_page_settings_v_version_version_created_at_idx" ON "_blog_page_settings_v" USING btree ("version_created_at");
  CREATE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  ALTER TABLE "tenants" DROP COLUMN IF EXISTS "created_by_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tenant_announcements_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "tenant_announcements_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "tenant_announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer,
  	"created_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "media_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "authors_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_page_settings_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_page_settings_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects_tenants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_tenants" CASCADE;
  DROP TABLE "page_tenants" CASCADE;
  DROP TABLE "_page_v_version_tenants" CASCADE;
  DROP TABLE "categories_tenants" CASCADE;
  DROP TABLE "authors_tenants" CASCADE;
  DROP TABLE "posts_tenants" CASCADE;
  DROP TABLE "_posts_v_version_tenants" CASCADE;
  DROP TABLE "testimonials_tenants" CASCADE;
  DROP TABLE "testimonials_presets_tenants" CASCADE;
  DROP TABLE "header_tenants" CASCADE;
  DROP TABLE "_header_v_version_tenants" CASCADE;
  DROP TABLE "footer_tenants" CASCADE;
  DROP TABLE "_footer_v_version_tenants" CASCADE;
  DROP TABLE "site_settings_tenants" CASCADE;
  DROP TABLE "_site_settings_v_version_tenants" CASCADE;
  DROP TABLE "blog_page_settings_tenants" CASCADE;
  DROP TABLE "_blog_page_settings_v_version_tenants" CASCADE;
  DROP TABLE "redirects_tenants" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_tenants_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "page" DROP CONSTRAINT "page_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_tenant_id_tenants_id_fk";
  
  ALTER TABLE "authors" DROP CONSTRAINT "authors_tenant_id_tenants_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_tenant_id_tenants_id_fk";
  
  ALTER TABLE "testimonials_presets" DROP CONSTRAINT "testimonials_presets_tenant_id_tenants_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_header_v" DROP CONSTRAINT "_header_v_parent_id_header_id_fk";
  
  ALTER TABLE "_header_v" DROP CONSTRAINT "_header_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_footer_v" DROP CONSTRAINT "_footer_v_parent_id_footer_id_fk";
  
  ALTER TABLE "_footer_v" DROP CONSTRAINT "_footer_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_parent_id_site_settings_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "blog_page_settings" DROP CONSTRAINT "blog_page_settings_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_blog_page_settings_v" DROP CONSTRAINT "_blog_page_settings_v_parent_id_blog_page_settings_id_fk";
  
  ALTER TABLE "_blog_page_settings_v" DROP CONSTRAINT "_blog_page_settings_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "redirects" DROP CONSTRAINT "redirects_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_header_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_footer_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_site_settings_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_page_settings_fk";
  
  DROP INDEX "users_tenant_idx";
  DROP INDEX "media_tenant_idx";
  DROP INDEX "page_tenant_idx";
  DROP INDEX "_page_v_version_version_tenant_idx";
  DROP INDEX "categories_tenant_idx";
  DROP INDEX "authors_tenant_idx";
  DROP INDEX "posts_tenant_idx";
  DROP INDEX "_posts_v_version_version_tenant_idx";
  DROP INDEX "testimonials_tenant_idx";
  DROP INDEX "testimonials_presets_tenant_idx";
  DROP INDEX "header_tenant_idx";
  DROP INDEX "header_updated_at_idx";
  DROP INDEX "header_created_at_idx";
  DROP INDEX "_header_v_parent_idx";
  DROP INDEX "_header_v_version_version_tenant_idx";
  DROP INDEX "_header_v_version_version_updated_at_idx";
  DROP INDEX "_header_v_version_version_created_at_idx";
  DROP INDEX "footer_tenant_idx";
  DROP INDEX "footer_updated_at_idx";
  DROP INDEX "footer_created_at_idx";
  DROP INDEX "_footer_v_parent_idx";
  DROP INDEX "_footer_v_version_version_tenant_idx";
  DROP INDEX "_footer_v_version_version_updated_at_idx";
  DROP INDEX "_footer_v_version_version_created_at_idx";
  DROP INDEX "site_settings_tenant_idx";
  DROP INDEX "site_settings_updated_at_idx";
  DROP INDEX "site_settings_created_at_idx";
  DROP INDEX "_site_settings_v_parent_idx";
  DROP INDEX "_site_settings_v_version_version_tenant_idx";
  DROP INDEX "_site_settings_v_version_version_updated_at_idx";
  DROP INDEX "_site_settings_v_version_version_created_at_idx";
  DROP INDEX "blog_page_settings_tenant_idx";
  DROP INDEX "blog_page_settings_updated_at_idx";
  DROP INDEX "blog_page_settings_created_at_idx";
  DROP INDEX "_blog_page_settings_v_parent_idx";
  DROP INDEX "_blog_page_settings_v_version_version_tenant_idx";
  DROP INDEX "_blog_page_settings_v_version_version_updated_at_idx";
  DROP INDEX "_blog_page_settings_v_version_version_created_at_idx";
  DROP INDEX "redirects_tenant_idx";
  DROP INDEX "payload_locked_documents_rels_header_id_idx";
  DROP INDEX "payload_locked_documents_rels_footer_id_idx";
  DROP INDEX "payload_locked_documents_rels_site_settings_id_idx";
  DROP INDEX "payload_locked_documents_rels_blog_page_settings_id_idx";
  DROP INDEX "page_slug_idx";
  DROP INDEX "posts_slug_idx";
  ALTER TABLE "users_tenants" ALTER COLUMN "tenant_id" SET NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "header" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "header" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "footer" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "footer" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "footer" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "blog_page_settings" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "tenants" ADD COLUMN "created_by_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tenant_announcements_id" integer;
  ALTER TABLE "tenant_announcements_announcements" ADD CONSTRAINT "tenant_announcements_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tenant_announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tenant_announcements" ADD CONSTRAINT "tenant_announcements_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tenant_announcements" ADD CONSTRAINT "tenant_announcements_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "tenant_announcements_announcements_order_idx" ON "tenant_announcements_announcements" USING btree ("_order");
  CREATE INDEX "tenant_announcements_announcements_parent_id_idx" ON "tenant_announcements_announcements" USING btree ("_parent_id");
  CREATE INDEX "tenant_announcements_tenant_idx" ON "tenant_announcements" USING btree ("tenant_id");
  CREATE INDEX "tenant_announcements_created_by_idx" ON "tenant_announcements" USING btree ("created_by_id");
  CREATE INDEX "tenant_announcements_updated_at_idx" ON "tenant_announcements" USING btree ("updated_at");
  CREATE INDEX "tenant_announcements_created_at_idx" ON "tenant_announcements" USING btree ("created_at");
  ALTER TABLE "tenants" ADD CONSTRAINT "tenants_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenant_announcements_fk" FOREIGN KEY ("tenant_announcements_id") REFERENCES "public"."tenant_announcements"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tenants_created_by_idx" ON "tenants" USING btree ("created_by_id");
  CREATE INDEX "payload_locked_documents_rels_tenant_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("tenant_announcements_id");
  CREATE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  ALTER TABLE "users" DROP COLUMN "tenant_id";
  ALTER TABLE "media" DROP COLUMN "tenant_id";
  ALTER TABLE "page" DROP COLUMN "tenant_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "categories" DROP COLUMN "tenant_id";
  ALTER TABLE "authors" DROP COLUMN "tenant_id";
  ALTER TABLE "posts" DROP COLUMN "tenant_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "testimonials" DROP COLUMN "tenant_id";
  ALTER TABLE "testimonials_presets" DROP COLUMN "tenant_id";
  ALTER TABLE "header" DROP COLUMN "tenant_id";
  ALTER TABLE "_header_v" DROP COLUMN "parent_id";
  ALTER TABLE "_header_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "footer" DROP COLUMN "tenant_id";
  ALTER TABLE "_footer_v" DROP COLUMN "parent_id";
  ALTER TABLE "_footer_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "site_settings" DROP COLUMN "tenant_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "parent_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "blog_page_settings" DROP COLUMN "tenant_id";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "parent_id";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "redirects" DROP COLUMN "tenant_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "header_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "footer_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "site_settings_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_page_settings_id";`)
}
