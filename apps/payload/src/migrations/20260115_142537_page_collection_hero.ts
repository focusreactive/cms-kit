import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP COLUMN "hero_type";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_type";
  DROP TYPE "public"."enum_page_hero_type";
  DROP TYPE "public"."enum__page_v_version_hero_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__page_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "page" ADD COLUMN "hero_type" "enum_page_hero_type" DEFAULT 'lowImpact' NOT NULL;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_type" "enum__page_v_version_hero_type" DEFAULT 'lowImpact' NOT NULL;`)
}
