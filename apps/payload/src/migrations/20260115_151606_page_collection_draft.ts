import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__page_v_version_status" AS ENUM('draft', 'published');
  ALTER TABLE "page_hero_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "page_blocks_text_section" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "layout" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "_page_v_version_hero_links" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_text_section" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "layout" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_title" DROP NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_slug" DROP NOT NULL;
  ALTER TABLE "page" ADD COLUMN "_status" "enum_page_status" DEFAULT 'draft';
  ALTER TABLE "_page_v" ADD COLUMN "version__status" "enum__page_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_page_v" ADD COLUMN "latest" boolean;
  CREATE INDEX "page__status_idx" ON "page" USING btree ("_status");
  CREATE INDEX "_page_v_version_version__status_idx" ON "_page_v" USING btree ("version__status");
  CREATE INDEX "_page_v_latest_idx" ON "_page_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "page__status_idx";
  DROP INDEX "_page_v_version_version__status_idx";
  DROP INDEX "_page_v_latest_idx";
  ALTER TABLE "page_hero_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "page_blocks_text_section" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "layout" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "page_blocks_faq" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "_page_v_version_hero_links" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_text_section" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "layout" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_title" SET NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_slug" SET NOT NULL;
  ALTER TABLE "page" DROP COLUMN "_status";
  ALTER TABLE "_page_v" DROP COLUMN "version__status";
  ALTER TABLE "_page_v" DROP COLUMN "latest";
  DROP TYPE "public"."enum_page_status";
  DROP TYPE "public"."enum__page_v_version_status";`)
}
