import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_content" DROP CONSTRAINT "page_blocks_content_columns_left_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_content" DROP CONSTRAINT "page_blocks_content_columns_right_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_content" DROP CONSTRAINT "_page_v_blocks_content_columns_left_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_content" DROP CONSTRAINT "_page_v_blocks_content_columns_right_image_id_media_id_fk";
  
  DROP INDEX "page_blocks_content_columns_left_columns_left_image_idx";
  DROP INDEX "page_blocks_content_columns_right_columns_right_image_idx";
  DROP INDEX "_page_v_blocks_content_columns_left_columns_left_image_idx";
  DROP INDEX "_page_v_blocks_content_columns_right_columns_right_image_idx";
  ALTER TABLE "page_blocks_content" ADD COLUMN "image_id" integer;
  ALTER TABLE "page_blocks_content" ADD COLUMN "content" jsonb;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "image_id" integer;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "content" jsonb;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_content_image_idx" ON "page_blocks_content" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_content_image_idx" ON "_page_v_blocks_content" USING btree ("image_id");
  ALTER TABLE "page_blocks_content" DROP COLUMN "columns_left_image_id";
  ALTER TABLE "page_blocks_content" DROP COLUMN "columns_left_content";
  ALTER TABLE "page_blocks_content" DROP COLUMN "columns_right_image_id";
  ALTER TABLE "page_blocks_content" DROP COLUMN "columns_right_content";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "columns_left_image_id";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "columns_left_content";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "columns_right_image_id";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "columns_right_content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_content" DROP CONSTRAINT "page_blocks_content_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_content" DROP CONSTRAINT "_page_v_blocks_content_image_id_media_id_fk";
  
  DROP INDEX "page_blocks_content_image_idx";
  DROP INDEX "_page_v_blocks_content_image_idx";
  ALTER TABLE "page_blocks_content" ADD COLUMN "columns_left_image_id" integer;
  ALTER TABLE "page_blocks_content" ADD COLUMN "columns_left_content" jsonb;
  ALTER TABLE "page_blocks_content" ADD COLUMN "columns_right_image_id" integer;
  ALTER TABLE "page_blocks_content" ADD COLUMN "columns_right_content" jsonb;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "columns_left_image_id" integer;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "columns_left_content" jsonb;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "columns_right_image_id" integer;
  ALTER TABLE "_page_v_blocks_content" ADD COLUMN "columns_right_content" jsonb;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_columns_left_image_id_media_id_fk" FOREIGN KEY ("columns_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_columns_right_image_id_media_id_fk" FOREIGN KEY ("columns_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_columns_left_image_id_media_id_fk" FOREIGN KEY ("columns_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_columns_right_image_id_media_id_fk" FOREIGN KEY ("columns_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_content_columns_left_columns_left_image_idx" ON "page_blocks_content" USING btree ("columns_left_image_id");
  CREATE INDEX "page_blocks_content_columns_right_columns_right_image_idx" ON "page_blocks_content" USING btree ("columns_right_image_id");
  CREATE INDEX "_page_v_blocks_content_columns_left_columns_left_image_idx" ON "_page_v_blocks_content" USING btree ("columns_left_image_id");
  CREATE INDEX "_page_v_blocks_content_columns_right_columns_right_image_idx" ON "_page_v_blocks_content" USING btree ("columns_right_image_id");
  ALTER TABLE "page_blocks_content" DROP COLUMN "image_id";
  ALTER TABLE "page_blocks_content" DROP COLUMN "content";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "image_id";
  ALTER TABLE "_page_v_blocks_content" DROP COLUMN "content";`)
}
