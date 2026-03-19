import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en'::"_locales";
  ALTER TABLE "_page_v_version_breadcrumbs" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en'::"_locales";
  ALTER TABLE "page_breadcrumbs" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "_page_v_version_breadcrumbs" ALTER COLUMN "_locale" DROP DEFAULT;
  CREATE INDEX "page_breadcrumbs_locale_idx" ON "page_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_page_v_version_breadcrumbs_locale_idx" ON "_page_v_version_breadcrumbs" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page_breadcrumbs_locale_idx";
  DROP INDEX "_page_v_version_breadcrumbs_locale_idx";
  ALTER TABLE "page_breadcrumbs" DROP COLUMN "_locale";
  ALTER TABLE "_page_v_version_breadcrumbs" DROP COLUMN "_locale";`)
}
