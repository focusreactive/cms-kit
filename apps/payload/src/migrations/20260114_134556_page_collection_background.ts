import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_hero_background_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_blocks_hero_background_overlay_color" AS ENUM('black', 'white');
  DROP INDEX "page_blocks_hero_background_image_idx";
  DROP INDEX "_page_v_blocks_hero_background_image_idx";
  ALTER TABLE "page_blocks_hero" ADD COLUMN "background_fallback_color" varchar DEFAULT '#1a1a1a';
  ALTER TABLE "page_blocks_hero" ADD COLUMN "background_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "page_blocks_hero" ADD COLUMN "background_overlay_color" "enum_page_blocks_hero_background_overlay_color" DEFAULT 'black';
  ALTER TABLE "page_blocks_hero" ADD COLUMN "background_overlay_opacity" numeric DEFAULT 40;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "background_fallback_color" varchar DEFAULT '#1a1a1a';
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "background_overlay_enabled" boolean DEFAULT true;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "background_overlay_color" "enum__page_v_blocks_hero_background_overlay_color" DEFAULT 'black';
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "background_overlay_opacity" numeric DEFAULT 40;
  CREATE INDEX "page_blocks_hero_background_background_image_idx" ON "page_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_page_v_blocks_hero_background_background_image_idx" ON "_page_v_blocks_hero" USING btree ("background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page_blocks_hero_background_background_image_idx";
  DROP INDEX "_page_v_blocks_hero_background_background_image_idx";
  CREATE INDEX "page_blocks_hero_background_image_idx" ON "page_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_page_v_blocks_hero_background_image_idx" ON "_page_v_blocks_hero" USING btree ("background_image_id");
  ALTER TABLE "page_blocks_hero" DROP COLUMN "background_fallback_color";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "background_overlay_enabled";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "background_overlay_color";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "background_overlay_opacity";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "background_fallback_color";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "background_overlay_enabled";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "background_overlay_color";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "background_overlay_opacity";
  DROP TYPE "public"."enum_page_blocks_hero_background_overlay_color";
  DROP TYPE "public"."enum__page_v_blocks_hero_background_overlay_color";`)
}
