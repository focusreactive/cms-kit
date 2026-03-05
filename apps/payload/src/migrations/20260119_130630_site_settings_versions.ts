import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_settings_v_version_seo_title_separator" AS ENUM('|', '-', '•');
  CREATE TYPE "public"."enum__site_settings_v_version_default_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__site_settings_v_version_default_twitter_card" AS ENUM('summary_large_image', 'summary');
  CREATE TYPE "public"."enum__site_settings_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_site_name" varchar DEFAULT 'My Site',
  	"version_seo_title_separator" "enum__site_settings_v_version_seo_title_separator" DEFAULT '|',
  	"version_seo_title_suffix" varchar,
  	"version_default_og_title" varchar,
  	"version_default_description" varchar,
  	"version_default_og_description" varchar,
  	"version_default_og_image_id" integer,
  	"version_og_site_name" varchar,
  	"version_default_og_type" "enum__site_settings_v_version_default_og_type" DEFAULT 'website',
  	"version_twitter_site" varchar,
  	"version_twitter_creator" varchar,
  	"version_default_twitter_card" "enum__site_settings_v_version_default_twitter_card" DEFAULT 'summary_large_image',
  	"version_not_found_title" varchar DEFAULT '404 - Page not found',
  	"version_not_found_description" varchar DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.',
  	"version__status" "enum__site_settings_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "seo_title_separator" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "default_og_type" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "default_twitter_card" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "not_found_title" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "not_found_description" DROP NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "_status" "enum_site_settings_status" DEFAULT 'draft';
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_default_og_image_id_media_id_fk" FOREIGN KEY ("version_default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "_site_settings_v_version_version_default_og_image_idx" ON "_site_settings_v" USING btree ("version_default_og_image_id");
  CREATE INDEX "_site_settings_v_version_version__status_idx" ON "_site_settings_v" USING btree ("version__status");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE INDEX "_site_settings_v_latest_idx" ON "_site_settings_v" USING btree ("latest");
  CREATE INDEX "site_settings__status_idx" ON "site_settings" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP INDEX "site_settings__status_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "site_name" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "seo_title_separator" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "default_og_type" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "default_twitter_card" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "not_found_title" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "not_found_description" SET NOT NULL;
  ALTER TABLE "site_settings" DROP COLUMN "_status";
  DROP TYPE "public"."enum_site_settings_status";
  DROP TYPE "public"."enum__site_settings_v_version_seo_title_separator";
  DROP TYPE "public"."enum__site_settings_v_version_default_og_type";
  DROP TYPE "public"."enum__site_settings_v_version_default_twitter_card";
  DROP TYPE "public"."enum__site_settings_v_version_status";`)
}
