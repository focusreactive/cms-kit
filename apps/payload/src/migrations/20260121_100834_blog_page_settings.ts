import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_page_settings_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_blog_page_settings_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_blog_page_settings_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum_blog_page_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "blog_page_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Blog',
  	"description" varchar,
  	"enable_structured_data" boolean DEFAULT true,
  	"structured_data_description" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"meta_robots_index" "enum_blog_page_settings_meta_robots_index" DEFAULT 'index',
  	"meta_robots_follow" "enum_blog_page_settings_meta_robots_follow" DEFAULT 'follow',
  	"meta_og_type" "enum_blog_page_settings_meta_og_type" DEFAULT 'website',
  	"_status" "enum_blog_page_settings_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_blog_page_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar DEFAULT 'Blog',
  	"version_description" varchar,
  	"version_enable_structured_data" boolean DEFAULT true,
  	"version_structured_data_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_meta_robots_index" "enum__blog_page_settings_v_version_meta_robots_index" DEFAULT 'index',
  	"version_meta_robots_follow" "enum__blog_page_settings_v_version_meta_robots_follow" DEFAULT 'follow',
  	"version_meta_og_type" "enum__blog_page_settings_v_version_meta_og_type" DEFAULT 'website',
  	"version__status" "enum__blog_page_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "blog_page_settings" ADD CONSTRAINT "blog_page_settings_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_page_settings_v" ADD CONSTRAINT "_blog_page_settings_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "blog_page_settings_meta_meta_image_idx" ON "blog_page_settings" USING btree ("meta_image_id");
  CREATE INDEX "blog_page_settings__status_idx" ON "blog_page_settings" USING btree ("_status");
  CREATE INDEX "_blog_page_settings_v_version_meta_version_meta_image_idx" ON "_blog_page_settings_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_blog_page_settings_v_version_version__status_idx" ON "_blog_page_settings_v" USING btree ("version__status");
  CREATE INDEX "_blog_page_settings_v_created_at_idx" ON "_blog_page_settings_v" USING btree ("created_at");
  CREATE INDEX "_blog_page_settings_v_updated_at_idx" ON "_blog_page_settings_v" USING btree ("updated_at");
  CREATE INDEX "_blog_page_settings_v_latest_idx" ON "_blog_page_settings_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_page_settings" CASCADE;
  DROP TABLE "_blog_page_settings_v" CASCADE;
  DROP TYPE "public"."enum_blog_page_settings_meta_robots_index";
  DROP TYPE "public"."enum_blog_page_settings_meta_robots_follow";
  DROP TYPE "public"."enum_blog_page_settings_meta_og_type";
  DROP TYPE "public"."enum_blog_page_settings_status";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_robots_index";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_robots_follow";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_og_type";
  DROP TYPE "public"."enum__blog_page_settings_v_version_status";`)
}
