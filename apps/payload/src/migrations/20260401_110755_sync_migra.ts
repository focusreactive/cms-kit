import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "testimonials_locales" ADD COLUMN IF NOT EXISTS "content" varchar;
  UPDATE "testimonials_locales" SET "content" = '' WHERE "content" IS NULL;
  ALTER TABLE "testimonials_locales" ALTER COLUMN "content" SET NOT NULL;

  ALTER TABLE "presets_hero_actions" ADD COLUMN IF NOT EXISTS "_locale" "_locales";
  UPDATE "presets_hero_actions" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  ALTER TABLE "presets_hero_actions" ALTER COLUMN "_locale" SET NOT NULL;

  ALTER TABLE "presets_logos_items" ADD COLUMN IF NOT EXISTS "_locale" "_locales";
  UPDATE "presets_logos_items" SET "_locale" = 'en' WHERE "_locale" IS NULL;
  ALTER TABLE "presets_logos_items" ALTER COLUMN "_locale" SET NOT NULL;

  ALTER TABLE "presets_locales" ADD COLUMN IF NOT EXISTS "hero_rich_text" jsonb;
  CREATE INDEX IF NOT EXISTS "presets_hero_actions_locale_idx" ON "presets_hero_actions" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "presets_logos_items_locale_idx" ON "presets_logos_items" USING btree ("_locale");
  ALTER TABLE "testimonials" DROP COLUMN IF EXISTS "content";
  ALTER TABLE "presets" DROP COLUMN IF EXISTS "hero_rich_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX IF EXISTS "presets_hero_actions_locale_idx";
  DROP INDEX IF EXISTS "presets_logos_items_locale_idx";

  ALTER TABLE "testimonials" ADD COLUMN "content" varchar;
  UPDATE "testimonials" SET "content" = '' WHERE "content" IS NULL;
  ALTER TABLE "testimonials" ALTER COLUMN "content" SET NOT NULL;

  ALTER TABLE "presets" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "testimonials_locales" DROP COLUMN "content";
  ALTER TABLE "presets_hero_actions" DROP COLUMN "_locale";
  ALTER TABLE "presets_logos_items" DROP COLUMN "_locale";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_rich_text";`)
}
