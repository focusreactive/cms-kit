import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "meta_og_type" SET DEFAULT 'article';
  ALTER TABLE "_posts_v" ALTER COLUMN "version_meta_og_type" SET DEFAULT 'article';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" ALTER COLUMN "meta_og_type" SET DEFAULT 'website';
  ALTER TABLE "_posts_v" ALTER COLUMN "version_meta_og_type" SET DEFAULT 'website';`)
}
