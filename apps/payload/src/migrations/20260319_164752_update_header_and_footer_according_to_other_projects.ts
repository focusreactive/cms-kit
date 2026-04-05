import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_locales" (
  	"text" jsonb,
  	"copywrite_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_locales" (
  	"version_text" jsonb,
  	"version_copywrite_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "header_nav_items_links" CASCADE;
  DROP TABLE "_header_v_version_nav_items_links" CASCADE;
  DROP TABLE "footer_nav_items_links" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "_footer_v_version_nav_items_links" CASCADE;
  DROP TABLE "_footer_v_version_nav_items" CASCADE;
  ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_links" ADD CONSTRAINT "_footer_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_locales" ADD CONSTRAINT "_footer_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX "footer_links_locale_idx" ON "footer_links" USING btree ("_locale");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_v_version_links_order_idx" ON "_footer_v_version_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_links_parent_id_idx" ON "_footer_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_links_locale_idx" ON "_footer_v_version_links" USING btree ("_locale");
  CREATE UNIQUE INDEX "_footer_v_locales_locale_parent_id_unique" ON "_footer_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "header_nav_items" DROP COLUMN "type";
  ALTER TABLE "header_nav_items" DROP COLUMN "group_name";
  ALTER TABLE "_header_v_version_nav_items" DROP COLUMN "type";
  ALTER TABLE "_header_v_version_nav_items" DROP COLUMN "group_name";
  DROP TYPE "public"."enum_header_nav_items_links_link_type";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_links_link_type";
  DROP TYPE "public"."enum__header_v_version_nav_items_type";
  DROP TYPE "public"."enum_footer_nav_items_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_nav_items_links_link_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'links_group');
  CREATE TYPE "public"."enum__header_v_version_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__header_v_version_nav_items_type" AS ENUM('link', 'links_group');
  CREATE TYPE "public"."enum_footer_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__footer_v_version_nav_items_links_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "header_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "_header_v_version_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__header_v_version_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "footer_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group_name" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_items_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__footer_v_version_nav_items_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_name" varchar,
  	"_uuid" varchar
  );
  
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "_footer_v_version_links" CASCADE;
  DROP TABLE "_footer_v_locales" CASCADE;
  ALTER TABLE "header_nav_items" ADD COLUMN "type" "enum_header_nav_items_type" DEFAULT 'link';
  ALTER TABLE "header_nav_items" ADD COLUMN "group_name" varchar;
  ALTER TABLE "_header_v_version_nav_items" ADD COLUMN "type" "enum__header_v_version_nav_items_type" DEFAULT 'link';
  ALTER TABLE "_header_v_version_nav_items" ADD COLUMN "group_name" varchar;
  ALTER TABLE "header_nav_items_links" ADD CONSTRAINT "header_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_version_nav_items_links" ADD CONSTRAINT "_header_v_version_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_header_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_links" ADD CONSTRAINT "footer_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_items_links" ADD CONSTRAINT "_footer_v_version_nav_items_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_version_nav_items" ADD CONSTRAINT "_footer_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "header_nav_items_links_order_idx" ON "header_nav_items_links" USING btree ("_order");
  CREATE INDEX "header_nav_items_links_parent_id_idx" ON "header_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_links_locale_idx" ON "header_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_header_v_version_nav_items_links_order_idx" ON "_header_v_version_nav_items_links" USING btree ("_order");
  CREATE INDEX "_header_v_version_nav_items_links_parent_id_idx" ON "_header_v_version_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "_header_v_version_nav_items_links_locale_idx" ON "_header_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "footer_nav_items_links_order_idx" ON "footer_nav_items_links" USING btree ("_order");
  CREATE INDEX "footer_nav_items_links_parent_id_idx" ON "footer_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_links_locale_idx" ON "footer_nav_items_links" USING btree ("_locale");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_locale_idx" ON "footer_nav_items" USING btree ("_locale");
  CREATE INDEX "_footer_v_version_nav_items_links_order_idx" ON "_footer_v_version_nav_items_links" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_items_links_parent_id_idx" ON "_footer_v_version_nav_items_links" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_nav_items_links_locale_idx" ON "_footer_v_version_nav_items_links" USING btree ("_locale");
  CREATE INDEX "_footer_v_version_nav_items_order_idx" ON "_footer_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_footer_v_version_nav_items_parent_id_idx" ON "_footer_v_version_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_footer_v_version_nav_items_locale_idx" ON "_footer_v_version_nav_items" USING btree ("_locale");
  DROP TYPE "public"."enum_footer_links_link_type";
  DROP TYPE "public"."enum__footer_v_version_links_link_type";`)
}
