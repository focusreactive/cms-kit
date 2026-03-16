import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "authors_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_header_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_version_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "redirects_tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "presets_tenants" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "media_tenants" CASCADE;
  DROP TABLE "page_tenants" CASCADE;
  DROP TABLE "_page_v_version_tenants" CASCADE;
  DROP TABLE "categories_tenants" CASCADE;
  DROP TABLE "authors_tenants" CASCADE;
  DROP TABLE "posts_tenants" CASCADE;
  DROP TABLE "_posts_v_version_tenants" CASCADE;
  DROP TABLE "testimonials_tenants" CASCADE;
  DROP TABLE "tenants" CASCADE;
  DROP TABLE "header_tenants" CASCADE;
  DROP TABLE "_header_v_version_tenants" CASCADE;
  DROP TABLE "footer_tenants" CASCADE;
  DROP TABLE "_footer_v_version_tenants" CASCADE;
  DROP TABLE "site_settings_tenants" CASCADE;
  DROP TABLE "_site_settings_v_version_tenants" CASCADE;
  DROP TABLE "redirects_tenants" CASCADE;
  DROP TABLE "presets_tenants" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_tenant_id_tenants_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_tenant_id_tenants_id_fk";
  
  ALTER TABLE "page" DROP CONSTRAINT "page_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "categories" DROP CONSTRAINT "categories_tenant_id_tenants_id_fk";
  
  ALTER TABLE "authors" DROP CONSTRAINT "authors_tenant_id_tenants_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_tenant_id_tenants_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_header_v" DROP CONSTRAINT "_header_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_footer_v" DROP CONSTRAINT "_footer_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_tenant_id_tenants_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_parent_id_site_settings_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_tenant_id_tenants_id_fk";
  
  ALTER TABLE "redirects" DROP CONSTRAINT "redirects_tenant_id_tenants_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tenants_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_site_settings_fk";
  
  DROP INDEX "users_tenant_idx";
  DROP INDEX "media_tenant_idx";
  DROP INDEX "page_tenant_idx";
  DROP INDEX "_page_v_version_version_tenant_idx";
  DROP INDEX "categories_tenant_idx";
  DROP INDEX "authors_tenant_idx";
  DROP INDEX "posts_tenant_idx";
  DROP INDEX "_posts_v_version_version_tenant_idx";
  DROP INDEX "testimonials_tenant_idx";
  DROP INDEX "header_tenant_idx";
  DROP INDEX "_header_v_version_version_tenant_idx";
  DROP INDEX "footer_tenant_idx";
  DROP INDEX "_footer_v_version_version_tenant_idx";
  DROP INDEX "site_settings_tenant_idx";
  DROP INDEX "site_settings_updated_at_idx";
  DROP INDEX "site_settings_created_at_idx";
  DROP INDEX "_site_settings_v_parent_idx";
  DROP INDEX "_site_settings_v_version_version_tenant_idx";
  DROP INDEX "_site_settings_v_version_version_updated_at_idx";
  DROP INDEX "_site_settings_v_version_version_created_at_idx";
  DROP INDEX "redirects_tenant_idx";
  DROP INDEX "presets_tenant_idx";
  DROP INDEX "payload_locked_documents_rels_tenants_id_idx";
  DROP INDEX "payload_locked_documents_rels_site_settings_id_idx";
  ALTER TABLE "site_settings" ALTER COLUMN "theme_config" SET DEFAULT '
  :root {
    --font-mono: ''Roboto Mono'', monospace;
    --background-color: white;
    --text-color: black;
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.13 0.028 261.692);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.13 0.028 261.692);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.13 0.028 261.692);
    --primary: oklch(0.21 0.034 264.665);
    --primary-foreground: oklch(0.985 0.002 247.839);
    --secondary: oklch(0.967 0.003 264.542);
    --secondary-foreground: oklch(0.21 0.034 264.665);
    --muted: oklch(0.967 0.003 264.542);
    --muted-foreground: oklch(0.551 0.027 264.364);
    --accent: oklch(0.967 0.003 264.542);
    --accent-foreground: oklch(0.21 0.034 264.665);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.928 0.006 264.531);
    --input: oklch(0.928 0.006 264.531);
    --ring: oklch(0.707 0.022 261.325);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0.002 247.839);
    --sidebar-foreground: oklch(0.13 0.028 261.692);
    --sidebar-primary: oklch(0.21 0.034 264.665);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.967 0.003 264.542);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(0.928 0.006 264.531);
    --sidebar-ring: oklch(0.707 0.022 261.325);
  }
  
  [data-theme=''dark''] {
    --background: oklch(0.13 0.028 261.692);
    --foreground: oklch(0.985 0.002 247.839);
    --card: oklch(0.21 0.034 264.665);
    --card-foreground: oklch(0.985 0.002 247.839);
    --popover: oklch(0.21 0.034 264.665);
    --popover-foreground: oklch(0.985 0.002 247.839);
    --primary: oklch(0.928 0.006 264.531);
    --primary-foreground: oklch(0.21 0.034 264.665);
    --secondary: oklch(0.278 0.033 256.848);
    --secondary-foreground: oklch(0.985 0.002 247.839);
    --muted: oklch(0.278 0.033 256.848);
    --muted-foreground: oklch(0.707 0.022 261.325);
    --accent: oklch(0.278 0.033 256.848);
    --accent-foreground: oklch(0.985 0.002 247.839);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.551 0.027 264.364);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    --sidebar: oklch(0.21 0.034 264.665);
    --sidebar-foreground: oklch(0.985 0.002 247.839);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.278 0.033 256.848);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.551 0.027 264.364);
  }
  ';
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "_site_settings_v" ALTER COLUMN "version_theme_config" SET DEFAULT '
  :root {
    --font-mono: ''Roboto Mono'', monospace;
    --background-color: white;
    --text-color: black;
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.13 0.028 261.692);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.13 0.028 261.692);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.13 0.028 261.692);
    --primary: oklch(0.21 0.034 264.665);
    --primary-foreground: oklch(0.985 0.002 247.839);
    --secondary: oklch(0.967 0.003 264.542);
    --secondary-foreground: oklch(0.21 0.034 264.665);
    --muted: oklch(0.967 0.003 264.542);
    --muted-foreground: oklch(0.551 0.027 264.364);
    --accent: oklch(0.967 0.003 264.542);
    --accent-foreground: oklch(0.21 0.034 264.665);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.928 0.006 264.531);
    --input: oklch(0.928 0.006 264.531);
    --ring: oklch(0.707 0.022 261.325);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0.002 247.839);
    --sidebar-foreground: oklch(0.13 0.028 261.692);
    --sidebar-primary: oklch(0.21 0.034 264.665);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.967 0.003 264.542);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(0.928 0.006 264.531);
    --sidebar-ring: oklch(0.707 0.022 261.325);
  }
  
  [data-theme=''dark''] {
    --background: oklch(0.13 0.028 261.692);
    --foreground: oklch(0.985 0.002 247.839);
    --card: oklch(0.21 0.034 264.665);
    --card-foreground: oklch(0.985 0.002 247.839);
    --popover: oklch(0.21 0.034 264.665);
    --popover-foreground: oklch(0.985 0.002 247.839);
    --primary: oklch(0.928 0.006 264.531);
    --primary-foreground: oklch(0.21 0.034 264.665);
    --secondary: oklch(0.278 0.033 256.848);
    --secondary-foreground: oklch(0.985 0.002 247.839);
    --muted: oklch(0.278 0.033 256.848);
    --muted-foreground: oklch(0.707 0.022 261.325);
    --accent: oklch(0.278 0.033 256.848);
    --accent-foreground: oklch(0.985 0.002 247.839);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.551 0.027 264.364);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    --sidebar: oklch(0.21 0.034 264.665);
    --sidebar-foreground: oklch(0.985 0.002 247.839);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.278 0.033 256.848);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.551 0.027 264.364);
  }
  ';
  ALTER TABLE "presets" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_heading" varchar;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_subheading" varchar;
  ALTER TABLE "users" DROP COLUMN "tenant_id";
  ALTER TABLE "media" DROP COLUMN "tenant_id";
  ALTER TABLE "page" DROP COLUMN "tenant_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "categories" DROP COLUMN "tenant_id";
  ALTER TABLE "authors" DROP COLUMN "tenant_id";
  ALTER TABLE "posts" DROP COLUMN "tenant_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "testimonials" DROP COLUMN "tenant_id";
  ALTER TABLE "header" DROP COLUMN "tenant_id";
  ALTER TABLE "_header_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "footer" DROP COLUMN "tenant_id";
  ALTER TABLE "_footer_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "site_settings" DROP COLUMN "tenant_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "parent_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_tenant_id";
  ALTER TABLE "redirects" DROP COLUMN "tenant_id";
  ALTER TABLE "presets" DROP COLUMN "tenant_id";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_title";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_subheading";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "site_settings_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
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
  
  CREATE TABLE "tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"domain" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  
  CREATE TABLE "redirects_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "presets_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "theme_config" SET DEFAULT '
  :root {
    --font-mono: ''Roboto Mono'', monospace;
    --background-color: white;
    --text-color: black;
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.13 0.028 261.692);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.13 0.028 261.692);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.13 0.028 261.692);
    --primary: oklch(0.21 0.034 264.665);
    --primary-foreground: oklch(0.985 0.002 247.839);
    --secondary: oklch(0.967 0.003 264.542);
    --secondary-foreground: oklch(0.21 0.034 264.665);
    --muted: oklch(0.967 0.003 264.542);
    --muted-foreground: oklch(0.551 0.027 264.364);
    --accent: oklch(0.967 0.003 264.542);
    --accent-foreground: oklch(0.21 0.034 264.665);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.928 0.006 264.531);
    --input: oklch(0.928 0.006 264.531);
    --ring: oklch(0.707 0.022 261.325);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0.002 247.839);
    --sidebar-foreground: oklch(0.13 0.028 261.692);
    --sidebar-primary: oklch(0.21 0.034 264.665);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.967 0.003 264.542);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(0.928 0.006 264.531);
    --sidebar-ring: oklch(0.707 0.022 261.325);
  }
  
  [data-theme=''dark''] {
    --background: oklch(0.13 0.028 261.692);
    --foreground: oklch(0.985 0.002 247.839);
    --card: oklch(0.21 0.034 264.665);
    --card-foreground: oklch(0.985 0.002 247.839);
    --popover: oklch(0.21 0.034 264.665);
    --popover-foreground: oklch(0.985 0.002 247.839);
    --primary: oklch(0.928 0.006 264.531);
    --primary-foreground: oklch(0.21 0.034 264.665);
    --secondary: oklch(0.278 0.033 256.848);
    --secondary-foreground: oklch(0.985 0.002 247.839);
    --muted: oklch(0.278 0.033 256.848);
    --muted-foreground: oklch(0.707 0.022 261.325);
    --accent: oklch(0.278 0.033 256.848);
    --accent-foreground: oklch(0.985 0.002 247.839);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.551 0.027 264.364);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    --sidebar: oklch(0.21 0.034 264.665);
    --sidebar-foreground: oklch(0.985 0.002 247.839);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.278 0.033 256.848);
    --sidebar-accent-foreground: oklch(0.985 0.002 247.839);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.551 0.027 264.364);
  }
  ';
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "site_settings" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "site_settings" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "_site_settings_v" ALTER COLUMN "version_theme_config" SET DEFAULT '
  :root {
    --font-mono: ''Roboto Mono'', monospace;
    --background-color: white;
    --text-color: black;
    --radius: 0.625rem;
    --background: oklch(1 0 0);
    --foreground: oklch(0.13 0.028 261.692);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.13 0.028 261.692);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.13 0.028 261.692);
    --primary: oklch(0.21 0.034 264.665);
    --primary-foreground: oklch(0.985 0.002 247.839);
    --secondary: oklch(0.967 0.003 264.542);
    --secondary-foreground: oklch(0.21 0.034 264.665);
    --muted: oklch(0.967 0.003 264.542);
    --muted-foreground: oklch(0.551 0.027 264.364);
    --accent: oklch(0.967 0.003 264.542);
    --accent-foreground: oklch(0.21 0.034 264.665);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.928 0.006 264.531);
    --input: oklch(0.928 0.006 264.531);
    --ring: oklch(0.707 0.022 261.325);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --sidebar: oklch(0.985 0.002 247.839);
    --sidebar-foreground: oklch(0.13 0.028 261.692);
    --sidebar-primary: oklch(0.21 0.034 264.665);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.967 0.003 264.542);
    --sidebar-accent-foreground: oklch(0.21 0.034 264.665);
    --sidebar-border: oklch(0.928 0.006 264.531);
    --sidebar-ring: oklch(0.707 0.022 261.325);
  }
  
  [data-theme=''dark''] {
    --background: oklch(0.13 0.028 261.692);
    --foreground: oklch(0.985 0.002 247.839);
    --card: oklch(0.21 0.034 264.665);
    --card-foreground: oklch(0.985 0.002 247.839);
    --popover: oklch(0.21 0.034 264.665);
    --popover-foreground: oklch(0.985 0.002 247.839);
    --primary: oklch(0.928 0.006 264.531);
    --primary-foreground: oklch(0.21 0.034 264.665);
    --secondary: oklch(0.278 0.033 256.848);
    --secondary-foreground: oklch(0.985 0.002 247.839);
    --muted: oklch(0.278 0.033 256.848);
    --muted-foreground: oklch(0.707 0.022 261.325);
    --accent: oklch(0.278 0.033 256.848);
    --accent-foreground: oklch(0.985 0.002 247.839);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.551 0.027 264.364);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
    --sidebar: oklch(0.21 0.034 264.665);
    --sidebar-foreground: oklch(0.985 0.002 247.839);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0.002 247.839);
    --sidebar-accent: oklch(0.278 0.033 256.848);
    --sidebar-accent-foreground: oklch(0.985 0.002 247.839);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.551 0.027 264.364);
  }
  ';
  ALTER TABLE "users" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "media" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "page" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "categories" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "authors" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "posts" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "testimonials" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "header" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_header_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "footer" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_footer_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "redirects" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "presets" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "presets_locales" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_subheading" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "site_settings_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_tenant_id" integer;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "redirects_tenants" ADD CONSTRAINT "redirects_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_tenants" ADD CONSTRAINT "redirects_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "presets_tenants" ADD CONSTRAINT "presets_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets_tenants" ADD CONSTRAINT "presets_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
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
  CREATE UNIQUE INDEX "tenants_domain_idx" ON "tenants" USING btree ("domain");
  CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at");
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
  CREATE INDEX "redirects_tenants_order_idx" ON "redirects_tenants" USING btree ("_order");
  CREATE INDEX "redirects_tenants_parent_id_idx" ON "redirects_tenants" USING btree ("_parent_id");
  CREATE INDEX "redirects_tenants_tenant_idx" ON "redirects_tenants" USING btree ("tenant_id");
  CREATE INDEX "presets_tenants_order_idx" ON "presets_tenants" USING btree ("_order");
  CREATE INDEX "presets_tenants_parent_id_idx" ON "presets_tenants" USING btree ("_parent_id");
  CREATE INDEX "presets_tenants_tenant_idx" ON "presets_tenants" USING btree ("tenant_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_header_v" ADD CONSTRAINT "_header_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_footer_v" ADD CONSTRAINT "_footer_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects" ADD CONSTRAINT "redirects_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_settings_fk" FOREIGN KEY ("site_settings_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_parent_id_site_settings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_tenant_id_tenants_id_fk" FOREIGN KEY ("version_tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_tenant_idx" ON "users" USING btree ("tenant_id");
  CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id");
  CREATE INDEX "page_tenant_idx" ON "page" USING btree ("tenant_id");
  CREATE INDEX "_page_v_version_version_tenant_idx" ON "_page_v" USING btree ("version_tenant_id");
  CREATE INDEX "categories_tenant_idx" ON "categories" USING btree ("tenant_id");
  CREATE INDEX "authors_tenant_idx" ON "authors" USING btree ("tenant_id");
  CREATE INDEX "posts_tenant_idx" ON "posts" USING btree ("tenant_id");
  CREATE INDEX "_posts_v_version_version_tenant_idx" ON "_posts_v" USING btree ("version_tenant_id");
  CREATE INDEX "testimonials_tenant_idx" ON "testimonials" USING btree ("tenant_id");
  CREATE INDEX "header_tenant_idx" ON "header" USING btree ("tenant_id");
  CREATE INDEX "_header_v_version_version_tenant_idx" ON "_header_v" USING btree ("version_tenant_id");
  CREATE INDEX "footer_tenant_idx" ON "footer" USING btree ("tenant_id");
  CREATE INDEX "_footer_v_version_version_tenant_idx" ON "_footer_v" USING btree ("version_tenant_id");
  CREATE INDEX "redirects_tenant_idx" ON "redirects" USING btree ("tenant_id");
  CREATE INDEX "presets_tenant_idx" ON "presets" USING btree ("tenant_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_site_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("site_settings_id");
  CREATE INDEX "site_settings_tenant_idx" ON "site_settings" USING btree ("tenant_id");
  CREATE INDEX "site_settings_updated_at_idx" ON "site_settings" USING btree ("updated_at");
  CREATE INDEX "site_settings_created_at_idx" ON "site_settings" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_parent_idx" ON "_site_settings_v" USING btree ("parent_id");
  CREATE INDEX "_site_settings_v_version_version_tenant_idx" ON "_site_settings_v" USING btree ("version_tenant_id");
  CREATE INDEX "_site_settings_v_version_version_updated_at_idx" ON "_site_settings_v" USING btree ("version_updated_at");
  CREATE INDEX "_site_settings_v_version_version_created_at_idx" ON "_site_settings_v" USING btree ("version_created_at");
  ALTER TABLE "presets" DROP COLUMN "hero_title";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_heading";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_subheading";`)
}
