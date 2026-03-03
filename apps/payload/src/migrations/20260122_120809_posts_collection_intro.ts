import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "related_posts_intro" varchar DEFAULT 'Related Posts';
  ALTER TABLE "_posts_v" ADD COLUMN "version_related_posts_intro" varchar DEFAULT 'Related Posts';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "related_posts_intro";
  ALTER TABLE "_posts_v" DROP COLUMN "version_related_posts_intro";`)
}
