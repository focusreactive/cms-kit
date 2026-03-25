import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" ADD COLUMN "blog_blog_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_blog_description" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_blog_title" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_blog_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_description";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_title";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_description";`)
}
