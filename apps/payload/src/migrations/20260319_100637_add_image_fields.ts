import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_hero_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_page_blocks_cards_grid_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_page_blocks_carousel_slides_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_page_blocks_logos_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_page_blocks_blog_section_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_hero_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_cards_grid_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_carousel_slides_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_logos_items_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum_presets_hero_image_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  ALTER TABLE "page_blocks_hero" DROP CONSTRAINT "page_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "page_blocks_cards_grid_items" DROP CONSTRAINT "page_blocks_cards_grid_items_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_carousel_slides" DROP CONSTRAINT "page_blocks_carousel_slides_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_logos_items" DROP CONSTRAINT "page_blocks_logos_items_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_hero" DROP CONSTRAINT "_page_v_blocks_hero_media_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_cards_grid_items" DROP CONSTRAINT "_page_v_blocks_cards_grid_items_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_carousel_slides" DROP CONSTRAINT "_page_v_blocks_carousel_slides_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_logos_items" DROP CONSTRAINT "_page_v_blocks_logos_items_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_hero_media_id_media_id_fk";
  
  DROP INDEX "page_blocks_hero_media_idx";
  DROP INDEX "page_blocks_cards_grid_items_image_idx";
  DROP INDEX "page_blocks_carousel_slides_image_idx";
  DROP INDEX "page_blocks_logos_items_image_idx";
  DROP INDEX "_page_v_blocks_hero_media_idx";
  DROP INDEX "_page_v_blocks_cards_grid_items_image_idx";
  DROP INDEX "_page_v_blocks_carousel_slides_image_idx";
  DROP INDEX "_page_v_blocks_logos_items_image_idx";
  DROP INDEX "presets_hero_hero_media_idx";
  ALTER TABLE "page_blocks_hero" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "page_blocks_hero" ADD COLUMN "image_aspect_ratio" "enum_page_blocks_hero_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "page_blocks_cards_grid_items" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "page_blocks_cards_grid_items" ADD COLUMN "image_aspect_ratio" "enum_page_blocks_cards_grid_items_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "page_blocks_carousel_slides" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "page_blocks_carousel_slides" ADD COLUMN "image_aspect_ratio" "enum_page_blocks_carousel_slides_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "page_blocks_logos_items" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "page_blocks_logos_items" ADD COLUMN "image_aspect_ratio" "enum_page_blocks_logos_items_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "page_blocks_blog_section" ADD COLUMN "aspect_ratio" "enum_page_blocks_blog_section_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "image_aspect_ratio" "enum__page_v_blocks_hero_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD COLUMN "image_aspect_ratio" "enum__page_v_blocks_cards_grid_items_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD COLUMN "image_aspect_ratio" "enum__page_v_blocks_carousel_slides_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "_page_v_blocks_logos_items" ADD COLUMN "image_image_id" integer;
  ALTER TABLE "_page_v_blocks_logos_items" ADD COLUMN "image_aspect_ratio" "enum__page_v_blocks_logos_items_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "_page_v_blocks_blog_section" ADD COLUMN "aspect_ratio" "enum__page_v_blocks_blog_section_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "presets" ADD COLUMN "hero_image_image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "hero_image_aspect_ratio" "enum_presets_hero_image_aspect_ratio" DEFAULT '1/1';
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_cards_grid_items" ADD CONSTRAINT "page_blocks_cards_grid_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_carousel_slides" ADD CONSTRAINT "page_blocks_carousel_slides_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_logos_items" ADD CONSTRAINT "page_blocks_logos_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD CONSTRAINT "_page_v_blocks_cards_grid_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD CONSTRAINT "_page_v_blocks_carousel_slides_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_logos_items" ADD CONSTRAINT "_page_v_blocks_logos_items_image_image_id_media_id_fk" FOREIGN KEY ("image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_image_image_id_media_id_fk" FOREIGN KEY ("hero_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_hero_image_image_image_idx" ON "page_blocks_hero" USING btree ("image_image_id");
  CREATE INDEX "page_blocks_cards_grid_items_image_image_image_idx" ON "page_blocks_cards_grid_items" USING btree ("image_image_id");
  CREATE INDEX "page_blocks_carousel_slides_image_image_image_idx" ON "page_blocks_carousel_slides" USING btree ("image_image_id");
  CREATE INDEX "page_blocks_logos_items_image_image_image_idx" ON "page_blocks_logos_items" USING btree ("image_image_id");
  CREATE INDEX "_page_v_blocks_hero_image_image_image_idx" ON "_page_v_blocks_hero" USING btree ("image_image_id");
  CREATE INDEX "_page_v_blocks_cards_grid_items_image_image_image_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("image_image_id");
  CREATE INDEX "_page_v_blocks_carousel_slides_image_image_image_idx" ON "_page_v_blocks_carousel_slides" USING btree ("image_image_id");
  CREATE INDEX "_page_v_blocks_logos_items_image_image_image_idx" ON "_page_v_blocks_logos_items" USING btree ("image_image_id");
  CREATE INDEX "presets_hero_image_hero_image_image_idx" ON "presets" USING btree ("hero_image_image_id");
  ALTER TABLE "page_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "page_blocks_cards_grid_items" DROP COLUMN "image_id";
  ALTER TABLE "page_blocks_carousel_slides" DROP COLUMN "image_id";
  ALTER TABLE "page_blocks_logos_items" DROP COLUMN "image_id";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "media_id";
  ALTER TABLE "_page_v_blocks_cards_grid_items" DROP COLUMN "image_id";
  ALTER TABLE "_page_v_blocks_carousel_slides" DROP COLUMN "image_id";
  ALTER TABLE "_page_v_blocks_logos_items" DROP COLUMN "image_id";
  ALTER TABLE "presets" DROP COLUMN "hero_media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_hero" DROP CONSTRAINT "page_blocks_hero_image_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_cards_grid_items" DROP CONSTRAINT "page_blocks_cards_grid_items_image_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_carousel_slides" DROP CONSTRAINT "page_blocks_carousel_slides_image_image_id_media_id_fk";
  
  ALTER TABLE "page_blocks_logos_items" DROP CONSTRAINT "page_blocks_logos_items_image_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_hero" DROP CONSTRAINT "_page_v_blocks_hero_image_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_cards_grid_items" DROP CONSTRAINT "_page_v_blocks_cards_grid_items_image_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_carousel_slides" DROP CONSTRAINT "_page_v_blocks_carousel_slides_image_image_id_media_id_fk";
  
  ALTER TABLE "_page_v_blocks_logos_items" DROP CONSTRAINT "_page_v_blocks_logos_items_image_image_id_media_id_fk";
  
  ALTER TABLE "presets" DROP CONSTRAINT "presets_hero_image_image_id_media_id_fk";
  
  DROP INDEX "page_blocks_hero_image_image_image_idx";
  DROP INDEX "page_blocks_cards_grid_items_image_image_image_idx";
  DROP INDEX "page_blocks_carousel_slides_image_image_image_idx";
  DROP INDEX "page_blocks_logos_items_image_image_image_idx";
  DROP INDEX "_page_v_blocks_hero_image_image_image_idx";
  DROP INDEX "_page_v_blocks_cards_grid_items_image_image_image_idx";
  DROP INDEX "_page_v_blocks_carousel_slides_image_image_image_idx";
  DROP INDEX "_page_v_blocks_logos_items_image_image_image_idx";
  DROP INDEX "presets_hero_image_hero_image_image_idx";
  ALTER TABLE "page_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "page_blocks_cards_grid_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "page_blocks_carousel_slides" ADD COLUMN "image_id" integer;
  ALTER TABLE "page_blocks_logos_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_page_v_blocks_hero" ADD COLUMN "media_id" integer;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD COLUMN "image_id" integer;
  ALTER TABLE "_page_v_blocks_logos_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "presets" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_cards_grid_items" ADD CONSTRAINT "page_blocks_cards_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_carousel_slides" ADD CONSTRAINT "page_blocks_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_logos_items" ADD CONSTRAINT "page_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_cards_grid_items" ADD CONSTRAINT "_page_v_blocks_cards_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_carousel_slides" ADD CONSTRAINT "_page_v_blocks_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_logos_items" ADD CONSTRAINT "_page_v_blocks_logos_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "presets" ADD CONSTRAINT "presets_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_blocks_hero_media_idx" ON "page_blocks_hero" USING btree ("media_id");
  CREATE INDEX "page_blocks_cards_grid_items_image_idx" ON "page_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX "page_blocks_carousel_slides_image_idx" ON "page_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX "page_blocks_logos_items_image_idx" ON "page_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_hero_media_idx" ON "_page_v_blocks_hero" USING btree ("media_id");
  CREATE INDEX "_page_v_blocks_cards_grid_items_image_idx" ON "_page_v_blocks_cards_grid_items" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_carousel_slides_image_idx" ON "_page_v_blocks_carousel_slides" USING btree ("image_id");
  CREATE INDEX "_page_v_blocks_logos_items_image_idx" ON "_page_v_blocks_logos_items" USING btree ("image_id");
  CREATE INDEX "presets_hero_hero_media_idx" ON "presets" USING btree ("hero_media_id");
  ALTER TABLE "page_blocks_hero" DROP COLUMN "image_image_id";
  ALTER TABLE "page_blocks_hero" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "page_blocks_cards_grid_items" DROP COLUMN "image_image_id";
  ALTER TABLE "page_blocks_cards_grid_items" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "page_blocks_carousel_slides" DROP COLUMN "image_image_id";
  ALTER TABLE "page_blocks_carousel_slides" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "page_blocks_logos_items" DROP COLUMN "image_image_id";
  ALTER TABLE "page_blocks_logos_items" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "page_blocks_blog_section" DROP COLUMN "aspect_ratio";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "image_image_id";
  ALTER TABLE "_page_v_blocks_hero" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "_page_v_blocks_cards_grid_items" DROP COLUMN "image_image_id";
  ALTER TABLE "_page_v_blocks_cards_grid_items" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "_page_v_blocks_carousel_slides" DROP COLUMN "image_image_id";
  ALTER TABLE "_page_v_blocks_carousel_slides" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "_page_v_blocks_logos_items" DROP COLUMN "image_image_id";
  ALTER TABLE "_page_v_blocks_logos_items" DROP COLUMN "image_aspect_ratio";
  ALTER TABLE "_page_v_blocks_blog_section" DROP COLUMN "aspect_ratio";
  ALTER TABLE "presets" DROP COLUMN "hero_image_image_id";
  ALTER TABLE "presets" DROP COLUMN "hero_image_aspect_ratio";
  DROP TYPE "public"."enum_page_blocks_hero_image_aspect_ratio";
  DROP TYPE "public"."enum_page_blocks_cards_grid_items_image_aspect_ratio";
  DROP TYPE "public"."enum_page_blocks_carousel_slides_image_aspect_ratio";
  DROP TYPE "public"."enum_page_blocks_logos_items_image_aspect_ratio";
  DROP TYPE "public"."enum_page_blocks_blog_section_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_hero_image_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_cards_grid_items_image_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_carousel_slides_image_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_logos_items_image_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_aspect_ratio";
  DROP TYPE "public"."enum_presets_hero_image_aspect_ratio";`)
}
