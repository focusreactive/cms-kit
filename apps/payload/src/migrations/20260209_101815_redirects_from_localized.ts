import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "redirects_locales" (
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"type" "enum_redirects_type" DEFAULT '307' NOT NULL,
  	"is_active" boolean DEFAULT true NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX "redirects_from_idx";
  DROP INDEX "redirects_rels_page_id_idx";
  DROP INDEX "redirects_rels_posts_id_idx";
  ALTER TABLE "redirects_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "redirects_locales" ADD CONSTRAINT "redirects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "redirects_locales_locale_parent_id_unique" ON "redirects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "redirects_rels_locale_idx" ON "redirects_rels" USING btree ("locale");
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_rels_page_id_idx" ON "redirects_rels" USING btree ("page_id","locale");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id","locale");
  ALTER TABLE "redirects" DROP COLUMN "to_type";
  ALTER TABLE "redirects" DROP COLUMN "to_url";
  ALTER TABLE "redirects" DROP COLUMN "type";
  ALTER TABLE "redirects" DROP COLUMN "is_active";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "redirects_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "redirects_locales" CASCADE;
  DROP INDEX "redirects_rels_locale_idx";
  DROP INDEX "redirects_from_idx";
  DROP INDEX "redirects_rels_page_id_idx";
  DROP INDEX "redirects_rels_posts_id_idx";
  ALTER TABLE "redirects" ADD COLUMN "to_type" "enum_redirects_to_type" DEFAULT 'reference';
  ALTER TABLE "redirects" ADD COLUMN "to_url" varchar;
  ALTER TABLE "redirects" ADD COLUMN "type" "enum_redirects_type" DEFAULT '307' NOT NULL;
  ALTER TABLE "redirects" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_rels_page_id_idx" ON "redirects_rels" USING btree ("page_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  ALTER TABLE "redirects_rels" DROP COLUMN "locale";`)
}
