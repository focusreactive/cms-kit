import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "testimonials_presets_rels_locale_idx";
  DROP INDEX "testimonials_presets_rels_testimonials_id_idx";
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id");
  ALTER TABLE "testimonials_presets_rels" DROP COLUMN "locale";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "testimonials_presets_rels_testimonials_id_idx";
  ALTER TABLE "testimonials_presets_rels" ADD COLUMN "locale" "_locales";
  CREATE INDEX "testimonials_presets_rels_locale_idx" ON "testimonials_presets_rels" USING btree ("locale");
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id","locale");`)
}
