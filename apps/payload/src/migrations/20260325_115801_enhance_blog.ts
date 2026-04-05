import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_labels_read_more_label" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_labels_related_posts_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_labels_read_more_label" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_labels_related_posts_label" varchar;
  ALTER TABLE "posts_locales" DROP COLUMN "related_posts_intro";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_related_posts_intro";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_title";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_blog_description";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_title";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_blog_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ADD COLUMN "related_posts_intro" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_related_posts_intro" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_blog_title" varchar;
  ALTER TABLE "site_settings_locales" ADD COLUMN "blog_blog_description" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_blog_title" varchar;
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_blog_blog_description" varchar;
  ALTER TABLE "posts_locales" DROP COLUMN "excerpt";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_excerpt";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_labels_read_more_label";
  ALTER TABLE "site_settings_locales" DROP COLUMN "blog_labels_related_posts_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_labels_read_more_label";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_blog_labels_related_posts_label";`)
}
