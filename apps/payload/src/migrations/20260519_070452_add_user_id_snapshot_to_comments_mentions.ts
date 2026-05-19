import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comments_mentions" ALTER COLUMN "user_id" DROP NOT NULL;
  ALTER TABLE "comments_mentions" ADD COLUMN "user_id_snapshot" numeric;
  ALTER TABLE "comments_mentions" ADD COLUMN "display_name_snapshot" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comments_mentions" ALTER COLUMN "user_id" SET NOT NULL;
  ALTER TABLE "comments_mentions" DROP COLUMN "user_id_snapshot";
  ALTER TABLE "comments_mentions" DROP COLUMN "display_name_snapshot";`)
}
