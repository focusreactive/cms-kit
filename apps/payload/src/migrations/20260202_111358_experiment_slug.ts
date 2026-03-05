import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "experiments_slug_idx";
  ALTER TABLE "experiments" ADD COLUMN "generate_slug" boolean DEFAULT true;
  CREATE INDEX "experiments_slug_idx" ON "experiments" USING btree ("slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "experiments_slug_idx";
  CREATE UNIQUE INDEX "experiments_slug_idx" ON "experiments" USING btree ("slug");
  ALTER TABLE "experiments" DROP COLUMN "generate_slug";`)
}
