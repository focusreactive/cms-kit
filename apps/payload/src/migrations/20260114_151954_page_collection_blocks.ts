import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page_slug_idx";
  DROP INDEX "_page_v_version_version_slug_idx";
  ALTER TABLE "page" DROP COLUMN "slug";
  ALTER TABLE "_page_v" DROP COLUMN "version_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" ADD COLUMN "slug" varchar;
  ALTER TABLE "_page_v" ADD COLUMN "version_slug" varchar;
  CREATE UNIQUE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "_page_v_version_version_slug_idx" ON "_page_v" USING btree ("version_slug");`)
}
