import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_blog_section" DROP CONSTRAINT "page_blocks_blog_section_section_background_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_blog_section" DROP CONSTRAINT "_page_v_blocks_blog_section_section_background_image_id_media_id_fk";
  
  DROP INDEX "page_blocks_blog_section_section_section_background_imag_idx";
  DROP INDEX "_page_v_blocks_blog_section_section_section_background_i_idx";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_theme";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_margin_top";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_margin_bottom";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_padding_x";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_padding_y";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_max_width";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "section_background_image_id";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_theme";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_margin_top";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_margin_bottom";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_padding_x";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_padding_y";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_max_width";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "section_background_image_id";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_theme";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_margin_top";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_margin_bottom";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_padding_x";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_padding_y";
  DROP TYPE "public"."enum_page_blocks_blog_section_section_max_width";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_theme";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_margin_top";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_margin_bottom";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_padding_x";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_padding_y";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_section_max_width";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_blog_section_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum_page_blocks_blog_section_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_page_blocks_blog_section_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_page_blocks_blog_section_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_page_blocks_blog_section_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum_page_blocks_blog_section_section_max_width" AS ENUM('none', 'base', 'small');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_theme" AS ENUM('light', 'dark', 'light-gray', 'dark-gray');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_margin_top" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_margin_bottom" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_padding_x" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_padding_y" AS ENUM('none', 'base', 'large');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_section_max_width" AS ENUM('none', 'base', 'small');
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_theme" "enum_page_blocks_blog_section_section_theme";
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_margin_top" "enum_page_blocks_blog_section_section_margin_top" DEFAULT 'base';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_margin_bottom" "enum_page_blocks_blog_section_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_padding_x" "enum_page_blocks_blog_section_section_padding_x" DEFAULT 'base';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_padding_y" "enum_page_blocks_blog_section_section_padding_y" DEFAULT 'base';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_max_width" "enum_page_blocks_blog_section_section_max_width" DEFAULT 'base';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_theme" "enum__page_v_blocks_blog_section_section_theme";
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_margin_top" "enum__page_v_blocks_blog_section_section_margin_top" DEFAULT 'base';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_margin_bottom" "enum__page_v_blocks_blog_section_section_margin_bottom" DEFAULT 'base';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_padding_x" "enum__page_v_blocks_blog_section_section_padding_x" DEFAULT 'base';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_padding_y" "enum__page_v_blocks_blog_section_section_padding_y" DEFAULT 'base';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_max_width" "enum__page_v_blocks_blog_section_section_max_width" DEFAULT 'base';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "section_background_image_id" integer;
  ALTER TABLE "page_blocks_blog_section" ADD CONSTRAINT "page_blocks_blog_section_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_blog_section" ADD CONSTRAINT "_page_v_blocks_blog_section_section_background_image_id_media_id_fk" FOREIGN KEY ("section_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_blog_section_section_section_background_imag_idx" ON "page_blocks_blog_section" USING btree ("section_background_image_id");
  CREATE INDEX "_page_v_blocks_blog_section_section_section_background_i_idx" ON "_page_v_blocks_blog_section" USING btree ("section_background_image_id");`)
}
