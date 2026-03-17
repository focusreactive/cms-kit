import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page_slug_idx";
  DROP INDEX "posts_slug_idx";
  CREATE UNIQUE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page_slug_idx";
  DROP INDEX "posts_slug_idx";
  CREATE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");`)
}
