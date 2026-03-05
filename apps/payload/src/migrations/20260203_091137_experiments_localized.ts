import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "experiments_variants_locale_idx";
  ALTER TABLE "experiments" ADD COLUMN "status" "enum_experiments_status" DEFAULT 'draft' NOT NULL;
  ALTER TABLE "experiments" ADD COLUMN "type" "enum_experiments_type" DEFAULT 'hero' NOT NULL;
  ALTER TABLE "experiments" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "experiments" ADD COLUMN "end_date" timestamp(3) with time zone;
  ALTER TABLE "experiments_variants" DROP COLUMN "_locale";
  ALTER TABLE "experiments_locales" DROP COLUMN "status";
  ALTER TABLE "experiments_locales" DROP COLUMN "type";
  ALTER TABLE "experiments_locales" DROP COLUMN "start_date";
  ALTER TABLE "experiments_locales" DROP COLUMN "end_date";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiments_variants" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "experiments_locales" ADD COLUMN "status" "enum_experiments_status" DEFAULT 'draft' NOT NULL;
  ALTER TABLE "experiments_locales" ADD COLUMN "type" "enum_experiments_type" DEFAULT 'hero' NOT NULL;
  ALTER TABLE "experiments_locales" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "experiments_locales" ADD COLUMN "end_date" timestamp(3) with time zone;
  CREATE INDEX "experiments_variants_locale_idx" ON "experiments_variants" USING btree ("_locale");
  ALTER TABLE "experiments" DROP COLUMN "status";
  ALTER TABLE "experiments" DROP COLUMN "type";
  ALTER TABLE "experiments" DROP COLUMN "start_date";
  ALTER TABLE "experiments" DROP COLUMN "end_date";`)
}
