import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_page_blocks_hero_actions_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_page_blocks_cards_grid_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_page_blocks_logos_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_page_blocks_links_list_links_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__page_v_blocks_hero_actions_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__page_v_blocks_cards_grid_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__page_v_blocks_logos_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__page_v_blocks_links_list_links_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_header_nav_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__header_v_version_nav_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_footer_links_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum__footer_v_version_links_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_presets_hero_actions_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_presets_cards_grid_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_presets_logos_items_link_custom_page" ADD VALUE 'search';
  ALTER TYPE "public"."enum_presets_links_list_links_link_custom_page" ADD VALUE 'search';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  UPDATE "page_blocks_hero_actions" SET "custom_page" = NULL WHERE "custom_page"::text = 'search';
  UPDATE "page_blocks_cards_grid_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "page_blocks_logos_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "page_blocks_links_list_links" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "_page_v_blocks_hero_actions" SET "custom_page" = NULL WHERE "custom_page"::text = 'search';
  UPDATE "_page_v_blocks_cards_grid_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "_page_v_blocks_logos_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "_page_v_blocks_links_list_links" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "header_nav_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "_header_v_version_nav_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "footer_links" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "_footer_v_version_links" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "presets_hero_actions" SET "custom_page" = NULL WHERE "custom_page"::text = 'search';
  UPDATE "presets_cards_grid_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "presets_logos_items" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';
  UPDATE "presets_links_list_links" SET "link_custom_page" = NULL WHERE "link_custom_page"::text = 'search';`)

  await db.execute(sql`
   ALTER TABLE "page_blocks_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_page_blocks_hero_actions_custom_page";
  CREATE TYPE "public"."enum_page_blocks_hero_actions_custom_page" AS ENUM('blog');
  ALTER TABLE "page_blocks_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE "public"."enum_page_blocks_hero_actions_custom_page" USING "custom_page"::"public"."enum_page_blocks_hero_actions_custom_page";
  ALTER TABLE "page_blocks_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_link_custom_page";
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "page_blocks_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_page_blocks_cards_grid_items_link_custom_page" USING "link_custom_page"::"public"."enum_page_blocks_cards_grid_items_link_custom_page";
  ALTER TABLE "page_blocks_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_page_blocks_logos_items_link_custom_page";
  CREATE TYPE "public"."enum_page_blocks_logos_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "page_blocks_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_page_blocks_logos_items_link_custom_page" USING "link_custom_page"::"public"."enum_page_blocks_logos_items_link_custom_page";
  ALTER TABLE "page_blocks_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_page_blocks_links_list_links_link_custom_page";
  CREATE TYPE "public"."enum_page_blocks_links_list_links_link_custom_page" AS ENUM('blog');
  ALTER TABLE "page_blocks_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_page_blocks_links_list_links_link_custom_page" USING "link_custom_page"::"public"."enum_page_blocks_links_list_links_link_custom_page";
  ALTER TABLE "_page_v_blocks_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__page_v_blocks_hero_actions_custom_page";
  CREATE TYPE "public"."enum__page_v_blocks_hero_actions_custom_page" AS ENUM('blog');
  ALTER TABLE "_page_v_blocks_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE "public"."enum__page_v_blocks_hero_actions_custom_page" USING "custom_page"::"public"."enum__page_v_blocks_hero_actions_custom_page";
  ALTER TABLE "_page_v_blocks_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_link_custom_page";
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "_page_v_blocks_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum__page_v_blocks_cards_grid_items_link_custom_page" USING "link_custom_page"::"public"."enum__page_v_blocks_cards_grid_items_link_custom_page";
  ALTER TABLE "_page_v_blocks_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__page_v_blocks_logos_items_link_custom_page";
  CREATE TYPE "public"."enum__page_v_blocks_logos_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "_page_v_blocks_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum__page_v_blocks_logos_items_link_custom_page" USING "link_custom_page"::"public"."enum__page_v_blocks_logos_items_link_custom_page";
  ALTER TABLE "_page_v_blocks_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__page_v_blocks_links_list_links_link_custom_page";
  CREATE TYPE "public"."enum__page_v_blocks_links_list_links_link_custom_page" AS ENUM('blog');
  ALTER TABLE "_page_v_blocks_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum__page_v_blocks_links_list_links_link_custom_page" USING "link_custom_page"::"public"."enum__page_v_blocks_links_list_links_link_custom_page";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_link_custom_page";
  CREATE TYPE "public"."enum_header_nav_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_header_nav_items_link_custom_page" USING "link_custom_page"::"public"."enum_header_nav_items_link_custom_page";
  ALTER TABLE "_header_v_version_nav_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__header_v_version_nav_items_link_custom_page";
  CREATE TYPE "public"."enum__header_v_version_nav_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "_header_v_version_nav_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum__header_v_version_nav_items_link_custom_page" USING "link_custom_page"::"public"."enum__header_v_version_nav_items_link_custom_page";
  ALTER TABLE "footer_links" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_links_link_custom_page";
  CREATE TYPE "public"."enum_footer_links_link_custom_page" AS ENUM('blog');
  ALTER TABLE "footer_links" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_footer_links_link_custom_page" USING "link_custom_page"::"public"."enum_footer_links_link_custom_page";
  ALTER TABLE "_footer_v_version_links" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum__footer_v_version_links_link_custom_page";
  CREATE TYPE "public"."enum__footer_v_version_links_link_custom_page" AS ENUM('blog');
  ALTER TABLE "_footer_v_version_links" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum__footer_v_version_links_link_custom_page" USING "link_custom_page"::"public"."enum__footer_v_version_links_link_custom_page";
  ALTER TABLE "presets_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_presets_hero_actions_custom_page";
  CREATE TYPE "public"."enum_presets_hero_actions_custom_page" AS ENUM('blog');
  ALTER TABLE "presets_hero_actions" ALTER COLUMN "custom_page" SET DATA TYPE "public"."enum_presets_hero_actions_custom_page" USING "custom_page"::"public"."enum_presets_hero_actions_custom_page";
  ALTER TABLE "presets_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_presets_cards_grid_items_link_custom_page";
  CREATE TYPE "public"."enum_presets_cards_grid_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "presets_cards_grid_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_presets_cards_grid_items_link_custom_page" USING "link_custom_page"::"public"."enum_presets_cards_grid_items_link_custom_page";
  ALTER TABLE "presets_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_presets_logos_items_link_custom_page";
  CREATE TYPE "public"."enum_presets_logos_items_link_custom_page" AS ENUM('blog');
  ALTER TABLE "presets_logos_items" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_presets_logos_items_link_custom_page" USING "link_custom_page"::"public"."enum_presets_logos_items_link_custom_page";
  ALTER TABLE "presets_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_presets_links_list_links_link_custom_page";
  CREATE TYPE "public"."enum_presets_links_list_links_link_custom_page" AS ENUM('blog');
  ALTER TABLE "presets_links_list_links" ALTER COLUMN "link_custom_page" SET DATA TYPE "public"."enum_presets_links_list_links_link_custom_page" USING "link_custom_page"::"public"."enum_presets_links_list_links_link_custom_page";`)
}
