import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_page_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__page_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__page_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "page_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_page_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_page_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE "_page_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__page_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum__page_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"page_id" integer
  );
  
  ALTER TABLE "page_hero_links" ADD CONSTRAINT "page_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_version_hero_links" ADD CONSTRAINT "_page_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_hero_links_order_idx" ON "page_hero_links" USING btree ("_order");
  CREATE INDEX "page_hero_links_parent_id_idx" ON "page_hero_links" USING btree ("_parent_id");
  CREATE INDEX "page_rels_order_idx" ON "page_rels" USING btree ("order");
  CREATE INDEX "page_rels_parent_idx" ON "page_rels" USING btree ("parent_id");
  CREATE INDEX "page_rels_path_idx" ON "page_rels" USING btree ("path");
  CREATE INDEX "page_rels_page_id_idx" ON "page_rels" USING btree ("page_id");
  CREATE INDEX "_page_v_version_hero_links_order_idx" ON "_page_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_page_v_version_hero_links_parent_id_idx" ON "_page_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_page_v_rels_order_idx" ON "_page_v_rels" USING btree ("order");
  CREATE INDEX "_page_v_rels_parent_idx" ON "_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_page_v_rels_path_idx" ON "_page_v_rels" USING btree ("path");
  CREATE INDEX "_page_v_rels_page_id_idx" ON "_page_v_rels" USING btree ("page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_hero_links" CASCADE;
  DROP TABLE "page_rels" CASCADE;
  DROP TABLE "_page_v_version_hero_links" CASCADE;
  DROP TABLE "_page_v_rels" CASCADE;
  DROP TYPE "public"."enum_page_hero_links_link_type";
  DROP TYPE "public"."enum_page_hero_links_link_appearance";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__page_v_version_hero_links_link_appearance";`)
}
