import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_blocks_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_blocks_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_blocks_hero_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_presets_hero_actions_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_presets_hero_actions_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_hero_color" AS ENUM('black', 'white');
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
  	"use_experiment" boolean DEFAULT false,
  	"experiment_id" integer,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"enabled" boolean DEFAULT true,
  	"color" "enum_page_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"block_name" varchar
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
  	"use_experiment" boolean DEFAULT false,
  	"experiment_id" integer,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"enabled" boolean DEFAULT true,
  	"color" "enum__page_v_blocks_hero_color" DEFAULT 'black',
  	"opacity" numeric DEFAULT 40,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  ALTER TABLE "page_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_version_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_hero_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_hero_links" CASCADE;
  DROP TABLE "_page_v_version_hero_links" CASCADE;
  DROP TABLE "presets_hero_links" CASCADE;
  ALTER TABLE "page_blocks_testimonials_list" DROP CONSTRAINT "page_blocks_testimonials_list_preset_id_presets_id_fk";
  
  ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales_hero_experiment_id_experiments_id_fk";
  
  ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales_hero_preset_id_presets_id_fk";
  
  ALTER TABLE "page_locales" DROP CONSTRAINT "page_locales_hero_media_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP CONSTRAINT "_page_v_blocks_testimonials_list_preset_id_presets_id_fk";
  
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT "_page_v_locales_version_hero_experiment_id_experiments_id_fk";
  
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT "_page_v_locales_version_hero_preset_id_presets_id_fk";
  
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT "_page_v_locales_version_hero_media_id_media_id_fk";
  
  DROP INDEX "page_blocks_testimonials_list_preset_idx";
  DROP INDEX "page_hero_hero_experiment_idx";
  DROP INDEX "page_hero_hero_preset_idx";
  DROP INDEX "page_hero_hero_media_idx";
  DROP INDEX "_page_v_blocks_testimonials_list_preset_idx";
  DROP INDEX "_page_v_version_hero_version_hero_experiment_idx";
  DROP INDEX "_page_v_version_hero_version_hero_preset_idx";
  DROP INDEX "_page_v_version_hero_version_hero_media_idx";
  ALTER TABLE "presets" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "presets" ADD COLUMN "hero_enabled" boolean DEFAULT true;
  ALTER TABLE "presets" ADD COLUMN "hero_color" "enum_presets_hero_color" DEFAULT 'black';
  ALTER TABLE "presets" ADD COLUMN "hero_opacity" numeric DEFAULT 40;
  ALTER TABLE "page_blocks_hero_actions" ADD CONSTRAINT "page_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero_actions" ADD CONSTRAINT "_page_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_hero_actions" ADD CONSTRAINT "presets_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_hero_actions_order_idx" ON "page_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_actions_parent_id_idx" ON "page_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_actions_locale_idx" ON "page_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "page_blocks_hero_order_idx" ON "page_blocks_hero" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_parent_id_idx" ON "page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_path_idx" ON "page_blocks_hero" USING btree ("_path");
  CREATE INDEX "page_blocks_hero_locale_idx" ON "page_blocks_hero" USING btree ("_locale");
  CREATE INDEX "page_blocks_hero_experiment_idx" ON "page_blocks_hero" USING btree ("experiment_id");
  CREATE INDEX "page_blocks_hero_media_idx" ON "page_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_page_v_blocks_hero_actions_order_idx" ON "_page_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_actions_parent_id_idx" ON "_page_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_actions_locale_idx" ON "_page_v_blocks_hero_actions" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_hero_order_idx" ON "_page_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_parent_id_idx" ON "_page_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_path_idx" ON "_page_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_hero_locale_idx" ON "_page_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_hero_experiment_idx" ON "_page_v_blocks_hero" USING btree ("experiment_id");
  CREATE INDEX "_page_v_blocks_hero_media_idx" ON "_page_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "presets_hero_actions_order_idx" ON "presets_hero_actions" USING btree ("_order");
  CREATE INDEX "presets_hero_actions_parent_id_idx" ON "presets_hero_actions" USING btree ("_parent_id");
  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN "use_preset";
  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN "preset_id";
  ALTER TABLE "page" DROP COLUMN "hero_overlay_enabled";
  ALTER TABLE "page" DROP COLUMN "hero_overlay_color";
  ALTER TABLE "page" DROP COLUMN "hero_overlay_opacity";
  ALTER TABLE "page_locales" DROP COLUMN "hero_use_experiment";
  ALTER TABLE "page_locales" DROP COLUMN "hero_experiment_id";
  ALTER TABLE "page_locales" DROP COLUMN "hero_use_preset";
  ALTER TABLE "page_locales" DROP COLUMN "hero_preset_id";
  ALTER TABLE "page_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "page_locales" DROP COLUMN "hero_media_id";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN "use_preset";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN "preset_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_enabled";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_color";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_opacity";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_use_experiment";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_experiment_id";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_use_preset";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_preset_id";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_page_v_locales" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "presets" DROP COLUMN "hero_overlay_enabled";
  ALTER TABLE "presets" DROP COLUMN "hero_overlay_color";
  ALTER TABLE "presets" DROP COLUMN "hero_overlay_opacity";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_rich_text";
  DROP TYPE "public"."enum_page_hero_links_link_type";
  DROP TYPE "public"."enum_page_hero_links_link_appearance";
  DROP TYPE "public"."enum_page_hero_overlay_color";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__page_v_version_hero_overlay_color";
  DROP TYPE "public"."enum_presets_hero_links_link_type";
  DROP TYPE "public"."enum_presets_hero_links_link_appearance";
  DROP TYPE "public"."enum_presets_hero_overlay_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_page_hero_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_version_hero_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_presets_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_presets_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_hero_overlay_color" AS ENUM('black', 'white');
  CREATE TABLE "page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_page_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "_page_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__page_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__page_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "presets_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_presets_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_presets_hero_links_link_appearance" DEFAULT 'default'
  );
  
  ALTER TABLE "page_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_hero_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_hero_actions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_hero_actions" CASCADE;
  DROP TABLE "page_blocks_hero" CASCADE;
  DROP TABLE "_page_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_page_v_blocks_hero" CASCADE;
  DROP TABLE "presets_hero_actions" CASCADE;
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "use_preset" boolean DEFAULT false;
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "preset_id" integer;
  ALTER TABLE "page" ADD COLUMN "hero_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "page" ADD COLUMN "hero_overlay_color" "enum_page_hero_overlay_color" DEFAULT 'black';
  ALTER TABLE "page" ADD COLUMN "hero_overlay_opacity" numeric DEFAULT 40;
  ALTER TABLE "page_locales" ADD COLUMN "hero_use_experiment" boolean DEFAULT false;
  ALTER TABLE "page_locales" ADD COLUMN "hero_experiment_id" integer;
  ALTER TABLE "page_locales" ADD COLUMN "hero_use_preset" boolean DEFAULT false;
  ALTER TABLE "page_locales" ADD COLUMN "hero_preset_id" integer;
  ALTER TABLE "page_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "page_locales" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "use_preset" boolean DEFAULT false;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "preset_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_color" "enum__page_v_version_hero_overlay_color" DEFAULT 'black';
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_opacity" numeric DEFAULT 40;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_use_experiment" boolean DEFAULT false;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_experiment_id" integer;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_use_preset" boolean DEFAULT false;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_preset_id" integer;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "presets" ADD COLUMN "hero_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "presets" ADD COLUMN "hero_overlay_color" "enum_presets_hero_overlay_color" DEFAULT 'black';
  ALTER TABLE "presets" ADD COLUMN "hero_overlay_opacity" numeric DEFAULT 40;
  ALTER TABLE "presets_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "page_hero_links" ADD CONSTRAINT "page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_version_hero_links" ADD CONSTRAINT "_page_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_hero_links" ADD CONSTRAINT "presets_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_hero_links_order_idx" ON "page_hero_links" USING btree ("_order");
  CREATE INDEX "page_hero_links_parent_id_idx" ON "page_hero_links" USING btree ("_parent_id");
  CREATE INDEX "page_hero_links_locale_idx" ON "page_hero_links" USING btree ("_locale");
  CREATE INDEX "_page_v_version_hero_links_order_idx" ON "_page_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_page_v_version_hero_links_parent_id_idx" ON "_page_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_page_v_version_hero_links_locale_idx" ON "_page_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX "presets_hero_links_order_idx" ON "presets_hero_links" USING btree ("_order");
  CREATE INDEX "presets_hero_links_parent_id_idx" ON "presets_hero_links" USING btree ("_parent_id");
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("hero_experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_preset_id_presets_id_fk" FOREIGN KEY ("hero_preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("version_hero_experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_preset_id_presets_id_fk" FOREIGN KEY ("version_hero_preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_list_preset_idx" ON "page_blocks_testimonials_list" USING btree ("preset_id");
  CREATE INDEX "page_hero_hero_experiment_idx" ON "page_locales" USING btree ("hero_experiment_id");
  CREATE INDEX "page_hero_hero_preset_idx" ON "page_locales" USING btree ("hero_preset_id");
  CREATE INDEX "page_hero_hero_media_idx" ON "page_locales" USING btree ("hero_media_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_preset_idx" ON "_page_v_blocks_testimonials_list" USING btree ("preset_id");
  CREATE INDEX "_page_v_version_hero_version_hero_experiment_idx" ON "_page_v_locales" USING btree ("version_hero_experiment_id");
  CREATE INDEX "_page_v_version_hero_version_hero_preset_idx" ON "_page_v_locales" USING btree ("version_hero_preset_id");
  CREATE INDEX "_page_v_version_hero_version_hero_media_idx" ON "_page_v_locales" USING btree ("version_hero_media_id");
  ALTER TABLE "presets" DROP COLUMN "hero_rich_text";
  ALTER TABLE "presets" DROP COLUMN "hero_enabled";
  ALTER TABLE "presets" DROP COLUMN "hero_color";
  ALTER TABLE "presets" DROP COLUMN "hero_opacity";
  DROP TYPE "public"."enum_page_blocks_hero_actions_type";
  DROP TYPE "public"."enum_page_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum_page_blocks_hero_color";
  DROP TYPE "public"."enum__page_v_blocks_hero_actions_type";
  DROP TYPE "public"."enum__page_v_blocks_hero_actions_appearance";
  DROP TYPE "public"."enum__page_v_blocks_hero_color";
  DROP TYPE "public"."enum_presets_hero_actions_type";
  DROP TYPE "public"."enum_presets_hero_actions_appearance";
  DROP TYPE "public"."enum_presets_hero_color";`)
}
