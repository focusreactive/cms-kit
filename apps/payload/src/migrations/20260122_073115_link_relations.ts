import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_page_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_header_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_footer_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "page_rels" ADD CONSTRAINT "page_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_rels" ADD CONSTRAINT "_page_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_header_v_rels" ADD CONSTRAINT "_header_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_v_rels" ADD CONSTRAINT "_footer_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_rels_posts_id_idx" ON "page_rels" USING btree ("posts_id");
  CREATE INDEX "_page_v_rels_posts_id_idx" ON "_page_v_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "_header_v_rels_posts_id_idx" ON "_header_v_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "_footer_v_rels_posts_id_idx" ON "_footer_v_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_rels" DROP CONSTRAINT "page_rels_posts_fk";
  
  ALTER TABLE "_page_v_rels" DROP CONSTRAINT "_page_v_rels_posts_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "_header_v_rels" DROP CONSTRAINT "_header_v_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  ALTER TABLE "_footer_v_rels" DROP CONSTRAINT "_footer_v_rels_posts_fk";
  
  DROP INDEX "page_rels_posts_id_idx";
  DROP INDEX "_page_v_rels_posts_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "_header_v_rels_posts_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  DROP INDEX "_footer_v_rels_posts_id_idx";
  ALTER TABLE "page_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_page_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "header_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_header_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "footer_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_footer_v_rels" DROP COLUMN "posts_id";`)
}
