import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_page_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "page" ADD COLUMN "parent_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_parent_id" integer;
  ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs_doc_id_page_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_breadcrumbs" ADD CONSTRAINT "page_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_version_breadcrumbs" ADD CONSTRAINT "_page_v_version_breadcrumbs_doc_id_page_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_version_breadcrumbs" ADD CONSTRAINT "_page_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_breadcrumbs_order_idx" ON "page_breadcrumbs" USING btree ("_order");
  CREATE INDEX "page_breadcrumbs_parent_id_idx" ON "page_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "page_breadcrumbs_doc_idx" ON "page_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_page_v_version_breadcrumbs_order_idx" ON "_page_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_page_v_version_breadcrumbs_parent_id_idx" ON "_page_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_page_v_version_breadcrumbs_doc_idx" ON "_page_v_version_breadcrumbs" USING btree ("doc_id");
  ALTER TABLE "page" ADD CONSTRAINT "page_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_parent_id_page_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_parent_idx" ON "page" USING btree ("parent_id");
  CREATE INDEX "_page_v_version_version_parent_idx" ON "_page_v" USING btree ("version_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_breadcrumbs" CASCADE;
  DROP TABLE "_page_v_version_breadcrumbs" CASCADE;
  ALTER TABLE "page" DROP CONSTRAINT "page_parent_id_page_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_parent_id_page_id_fk";
  
  DROP INDEX "page_parent_idx";
  DROP INDEX "_page_v_version_version_parent_idx";
  ALTER TABLE "page" DROP COLUMN "parent_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_parent_id";`)
}
