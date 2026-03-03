import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_locales" DROP COLUMN "default_og_type";
  ALTER TABLE "_site_settings_v_locales" DROP COLUMN "version_default_og_type";
  DROP TYPE "public"."enum_site_settings_default_og_type";
  DROP TYPE "public"."enum__site_settings_v_version_default_og_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_default_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__site_settings_v_version_default_og_type" AS ENUM('website', 'article');
  ALTER TABLE "site_settings_locales" ADD COLUMN "default_og_type" "enum_site_settings_default_og_type" DEFAULT 'website';
  ALTER TABLE "_site_settings_v_locales" ADD COLUMN "version_default_og_type" "enum__site_settings_v_version_default_og_type" DEFAULT 'website';`)
}
