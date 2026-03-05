import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "categories_slug_idx";
  ALTER TABLE "categories" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "presets" ADD COLUMN "preview_id" integer;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_preview_id_media_id_fk" FOREIGN KEY ("preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "presets_preview_idx" ON "presets" USING btree ("preview_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "presets" DROP CONSTRAINT "presets_preview_id_media_id_fk";
  
  DROP INDEX "presets_preview_idx";
  DROP INDEX "categories_slug_idx";
  ALTER TABLE "categories" ALTER COLUMN "slug" SET NOT NULL;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  ALTER TABLE "presets" DROP COLUMN "preview_id";`)
}
