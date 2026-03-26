import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" ADD COLUMN "blog_read_more_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_related_posts_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_read_more_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_related_posts_label" varchar;
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_labels_read_more_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_labels_related_posts_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_labels_read_more_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_labels_related_posts_label";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" ADD COLUMN "blog_labels_read_more_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_labels_related_posts_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_labels_read_more_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_labels_related_posts_label" varchar;
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_read_more_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_related_posts_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_read_more_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_related_posts_label";`)
}
