import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ALTER COLUMN "related_posts_intro" DROP DEFAULT;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "version_related_posts_intro" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "site_name" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "not_found_title" DROP DEFAULT;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "not_found_description" DROP DEFAULT;
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_site_name" DROP DEFAULT;
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_not_found_title" DROP DEFAULT;
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_not_found_description" DROP DEFAULT;
  ALTER TABLE "blog_page_settings_locales" ALTER COLUMN "title" DROP DEFAULT;
  ALTER TABLE "_blog_page_settings_v_locales" ALTER COLUMN "version_title" DROP DEFAULT;
  ALTER TABLE "presets_locales" ADD COLUMN IF NOT EXISTS "hero_rich_text" jsonb;
  ALTER TABLE "presets" DROP COLUMN IF EXISTS "hero_rich_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ALTER COLUMN "related_posts_intro" SET DEFAULT 'Related Posts';
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "version_related_posts_intro" SET DEFAULT 'Related Posts';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "site_name" SET DEFAULT 'My Site';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "not_found_title" SET DEFAULT '404 - Page not found';
  ALTER TABLE "site_settings_locales" ALTER COLUMN "not_found_description" SET DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.';
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_site_name" SET DEFAULT 'My Site';
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_not_found_title" SET DEFAULT '404 - Page not found';
  ALTER TABLE "_site_settings_v_locales" ALTER COLUMN "version_not_found_description" SET DEFAULT 'Unfortunately, the requested page does not exist or has been deleted.';
  ALTER TABLE "blog_page_settings_locales" ALTER COLUMN "title" SET DEFAULT 'Blog';
  ALTER TABLE "_blog_page_settings_v_locales" ALTER COLUMN "version_title" SET DEFAULT 'Blog';
  ALTER TABLE "presets" ADD COLUMN IF NOT EXISTS "hero_rich_text" jsonb;
  ALTER TABLE "presets_locales" DROP COLUMN IF EXISTS "hero_rich_text";`)
}
