import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_hero_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_version_hero_overlay_color" AS ENUM('black', 'white');
  ALTER TABLE "page" ADD COLUMN "hero_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "page" ADD COLUMN "hero_overlay_color" "enum_page_hero_overlay_color" DEFAULT 'black';
  ALTER TABLE "page" ADD COLUMN "hero_overlay_opacity" numeric DEFAULT 40;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_color" "enum__page_v_version_hero_overlay_color" DEFAULT 'black';
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_overlay_opacity" numeric DEFAULT 40;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP COLUMN "hero_overlay_enabled";
  ALTER TABLE "page" DROP COLUMN "hero_overlay_color";
  ALTER TABLE "page" DROP COLUMN "hero_overlay_opacity";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_enabled";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_color";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_overlay_opacity";
  DROP TYPE "public"."enum_page_hero_overlay_color";
  DROP TYPE "public"."enum__page_v_version_hero_overlay_color";`)
}
