import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "page" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "page" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "page" ADD CONSTRAINT "page_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_meta_meta_image_idx" ON "page" USING btree ("meta_image_id");
  CREATE INDEX "_page_v_version_meta_version_meta_image_idx" ON "_page_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP CONSTRAINT "page_meta_image_id_media_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "page_meta_meta_image_idx";
  DROP INDEX "_page_v_version_meta_version_meta_image_idx";
  ALTER TABLE "page" DROP COLUMN "meta_title";
  ALTER TABLE "page" DROP COLUMN "meta_image_id";
  ALTER TABLE "page" DROP COLUMN "meta_description";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_description";`)
}
