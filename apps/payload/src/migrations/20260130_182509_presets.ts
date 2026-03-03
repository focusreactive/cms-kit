import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_presets_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_presets_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_presets_type" AS ENUM('hero', 'testimonialsList');
  CREATE TYPE "public"."enum_presets_hero_overlay_color" AS ENUM('black', 'white');
  CREATE TABLE "page_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_preset" boolean DEFAULT false,
  	"preset_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"use_preset" boolean DEFAULT false,
  	"preset_id" integer,
  	"heading" varchar,
  	"subheading" varchar,
  	"duration" numeric DEFAULT 60,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
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
  
  CREATE TABLE "presets_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "presets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_presets_type" NOT NULL,
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"hero_overlay_enabled" boolean DEFAULT true,
  	"hero_overlay_color" "enum_presets_hero_overlay_color" DEFAULT 'black',
  	"hero_overlay_opacity" numeric DEFAULT 40,
  	"testimonials_list_duration" numeric DEFAULT 60,
  	"testimonials_list_show_rating" boolean DEFAULT true,
  	"testimonials_list_show_avatar" boolean DEFAULT true,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "presets_locales" (
  	"name" varchar NOT NULL,
  	"testimonials_list_heading" varchar,
  	"testimonials_list_subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"page_id" integer,
  	"posts_id" integer,
  	"testimonials_id" integer
  );
  
  ALTER TABLE "page_blocks_testimonials_preset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_testimonials_preset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_testimonials_preset" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_preset" CASCADE;
  DROP TABLE "testimonials_presets_tenants" CASCADE;
  DROP TABLE "testimonials_presets" CASCADE;
  DROP TABLE "testimonials_presets_locales" CASCADE;
  DROP TABLE "testimonials_presets_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_testimonials_presets_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_testimonials_presets_id_idx";
  ALTER TABLE "page_locales" ADD COLUMN "hero_use_preset" boolean DEFAULT false;
  ALTER TABLE "page_locales" ADD COLUMN "hero_preset_id" integer;
  ALTER TABLE "page_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_use_preset" boolean DEFAULT false;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_preset_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "presets_id" integer;
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_hero_links" ADD CONSTRAINT "presets_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_tenants" ADD CONSTRAINT "presets_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_tenants" ADD CONSTRAINT "presets_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_locales" ADD CONSTRAINT "presets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_rels" ADD CONSTRAINT "presets_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_list_order_idx" ON "page_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_list_parent_id_idx" ON "page_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_list_path_idx" ON "page_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "page_blocks_testimonials_list_locale_idx" ON "page_blocks_testimonials_list" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_list_preset_idx" ON "page_blocks_testimonials_list" USING btree ("preset_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_order_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_list_parent_id_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_path_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_testimonials_list_locale_idx" ON "_page_v_blocks_testimonials_list" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_list_preset_idx" ON "_page_v_blocks_testimonials_list" USING btree ("preset_id");
  CREATE INDEX "presets_hero_links_order_idx" ON "presets_hero_links" USING btree ("_order");
  CREATE INDEX "presets_hero_links_parent_id_idx" ON "presets_hero_links" USING btree ("_parent_id");
  CREATE INDEX "presets_tenants_order_idx" ON "presets_tenants" USING btree ("_order");
  CREATE INDEX "presets_tenants_parent_id_idx" ON "presets_tenants" USING btree ("_parent_id");
  CREATE INDEX "presets_tenants_tenant_idx" ON "presets_tenants" USING btree ("tenant_id");
  CREATE INDEX "presets_hero_hero_media_idx" ON "presets" USING btree ("hero_media_id");
  CREATE INDEX "presets_tenant_idx" ON "presets" USING btree ("tenant_id");
  CREATE INDEX "presets_updated_at_idx" ON "presets" USING btree ("updated_at");
  CREATE INDEX "presets_created_at_idx" ON "presets" USING btree ("created_at");
  CREATE UNIQUE INDEX "presets_locales_locale_parent_id_unique" ON "presets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "presets_rels_order_idx" ON "presets_rels" USING btree ("order");
  CREATE INDEX "presets_rels_parent_idx" ON "presets_rels" USING btree ("parent_id");
  CREATE INDEX "presets_rels_path_idx" ON "presets_rels" USING btree ("path");
  CREATE INDEX "presets_rels_page_id_idx" ON "presets_rels" USING btree ("page_id");
  CREATE INDEX "presets_rels_posts_id_idx" ON "presets_rels" USING btree ("posts_id");
  CREATE INDEX "presets_rels_testimonials_id_idx" ON "presets_rels" USING btree ("testimonials_id");
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_preset_id_presets_id_fk" FOREIGN KEY ("hero_preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_preset_id_presets_id_fk" FOREIGN KEY ("version_hero_preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_presets_fk" FOREIGN KEY ("presets_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_hero_hero_preset_idx" ON "page_locales" USING btree ("hero_preset_id");
  CREATE INDEX "page_rels_testimonials_id_idx" ON "page_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "_page_v_version_hero_version_hero_preset_idx" ON "_page_v_locales" USING btree ("version_hero_preset_id");
  CREATE INDEX "_page_v_rels_testimonials_id_idx" ON "_page_v_rels" USING btree ("testimonials_id","locale");
  CREATE INDEX "payload_locked_documents_rels_presets_id_idx" ON "payload_locked_documents_rels" USING btree ("presets_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "testimonials_presets_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_blocks_testimonials_preset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonials_preset_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_preset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonials_preset_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "testimonials_presets_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "testimonials_presets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"duration" numeric,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "testimonials_presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  ALTER TABLE "page_blocks_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_testimonials_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_testimonials_list" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_list" CASCADE;
  DROP TABLE "presets_hero_links" CASCADE;
  DROP TABLE "presets_tenants" CASCADE;
  DROP TABLE "presets" CASCADE;
  DROP TABLE "presets_locales" CASCADE;
  DROP TABLE "presets_rels" CASCADE;
  ALTER TABLE "page_locales" DROP CONSTRAINT IF EXISTS "page_locales_hero_preset_id_presets_id_fk";
  
  ALTER TABLE "page_rels" DROP CONSTRAINT IF EXISTS "page_rels_testimonials_fk";
  
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT IF EXISTS "_page_v_locales_version_hero_preset_id_presets_id_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT IF EXISTS "_page_v_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_presets_fk";
  
  DROP INDEX IF EXISTS "page_hero_hero_preset_idx";
  DROP INDEX IF EXISTS "page_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "_page_v_version_hero_version_hero_preset_idx";
  DROP INDEX IF EXISTS "_page_v_rels_testimonials_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_presets_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_presets_id" integer;
  ALTER TABLE "page_blocks_testimonials_preset" ADD CONSTRAINT "page_blocks_testimonials_preset_testimonials_preset_id_testimonials_presets_id_fk" FOREIGN KEY ("testimonials_preset_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_preset" ADD CONSTRAINT "page_blocks_testimonials_preset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_preset" ADD CONSTRAINT "_page_v_blocks_testimonials_preset_testimonials_preset_id_testimonials_presets_id_fk" FOREIGN KEY ("testimonials_preset_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_preset" ADD CONSTRAINT "_page_v_blocks_testimonials_preset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_tenants" ADD CONSTRAINT "testimonials_presets_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_presets_tenants" ADD CONSTRAINT "testimonials_presets_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets" ADD CONSTRAINT "testimonials_presets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_presets_locales" ADD CONSTRAINT "testimonials_presets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_rels" ADD CONSTRAINT "testimonials_presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_rels" ADD CONSTRAINT "testimonials_presets_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_preset_order_idx" ON "page_blocks_testimonials_preset" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_preset_parent_id_idx" ON "page_blocks_testimonials_preset" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_preset_path_idx" ON "page_blocks_testimonials_preset" USING btree ("_path");
  CREATE INDEX "page_blocks_testimonials_preset_locale_idx" ON "page_blocks_testimonials_preset" USING btree ("_locale");
  CREATE INDEX "page_blocks_testimonials_preset_testimonials_preset_idx" ON "page_blocks_testimonials_preset" USING btree ("testimonials_preset_id");
  CREATE INDEX "_page_v_blocks_testimonials_preset_order_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_preset_parent_id_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_preset_path_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_testimonials_preset_locale_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_testimonials_preset_testimonials_preset_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("testimonials_preset_id");
  CREATE INDEX "testimonials_presets_tenants_order_idx" ON "testimonials_presets_tenants" USING btree ("_order");
  CREATE INDEX "testimonials_presets_tenants_parent_id_idx" ON "testimonials_presets_tenants" USING btree ("_parent_id");
  CREATE INDEX "testimonials_presets_tenants_tenant_idx" ON "testimonials_presets_tenants" USING btree ("tenant_id");
  CREATE INDEX "testimonials_presets_tenant_idx" ON "testimonials_presets" USING btree ("tenant_id");
  CREATE INDEX "testimonials_presets_updated_at_idx" ON "testimonials_presets" USING btree ("updated_at");
  CREATE INDEX "testimonials_presets_created_at_idx" ON "testimonials_presets" USING btree ("created_at");
  CREATE UNIQUE INDEX "testimonials_presets_locales_locale_parent_id_unique" ON "testimonials_presets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_presets_rels_order_idx" ON "testimonials_presets_rels" USING btree ("order");
  CREATE INDEX "testimonials_presets_rels_parent_idx" ON "testimonials_presets_rels" USING btree ("parent_id");
  CREATE INDEX "testimonials_presets_rels_path_idx" ON "testimonials_presets_rels" USING btree ("path");
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_presets_fk" FOREIGN KEY ("testimonials_presets_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_testimonials_presets_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_presets_id");
  ALTER TABLE "page_locales" DROP COLUMN IF EXISTS "hero_use_preset";
  ALTER TABLE "page_locales" DROP COLUMN IF EXISTS "hero_preset_id";
  ALTER TABLE "page_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "_page_v_locales" DROP COLUMN IF EXISTS "version_hero_use_preset";
  ALTER TABLE "_page_v_locales" DROP COLUMN IF EXISTS "version_hero_preset_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN IF EXISTS "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "presets_id";
  DROP TYPE "public"."enum_presets_hero_links_link_type";
  DROP TYPE "public"."enum_presets_hero_links_link_appearance";
  DROP TYPE "public"."enum_presets_type";
  DROP TYPE "public"."enum_presets_hero_overlay_color";`)
}
