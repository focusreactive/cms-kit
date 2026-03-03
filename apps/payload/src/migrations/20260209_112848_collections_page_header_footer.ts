import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" ADD COLUMN "header_id" integer;
  ALTER TABLE "page" ADD COLUMN "footer_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_header_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_footer_id" integer;
  ALTER TABLE "page" ADD CONSTRAINT "page_header_id_header_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page" ADD CONSTRAINT "page_footer_id_footer_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_header_id_header_id_fk" FOREIGN KEY ("version_header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_footer_id_footer_id_fk" FOREIGN KEY ("version_footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_header_idx" ON "page" USING btree ("header_id");
  CREATE INDEX "page_footer_idx" ON "page" USING btree ("footer_id");
  CREATE INDEX "_page_v_version_version_header_idx" ON "_page_v" USING btree ("version_header_id");
  CREATE INDEX "_page_v_version_version_footer_idx" ON "_page_v" USING btree ("version_footer_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP CONSTRAINT "page_header_id_header_id_fk";
  
  ALTER TABLE "page" DROP CONSTRAINT "page_footer_id_footer_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_header_id_header_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_footer_id_footer_id_fk";
  
  DROP INDEX "page_header_idx";
  DROP INDEX "page_footer_idx";
  DROP INDEX "_page_v_version_version_header_idx";
  DROP INDEX "_page_v_version_version_footer_idx";
  ALTER TABLE "page" DROP COLUMN "header_id";
  ALTER TABLE "page" DROP COLUMN "footer_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_header_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_footer_id";`)
}
