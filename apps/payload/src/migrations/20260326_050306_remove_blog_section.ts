import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "page_blocks_blog_section" CASCADE;
  DROP TABLE "_page_v_blocks_blog_section" CASCADE;
  DROP TYPE "public"."enum_page_blocks_blog_section_style";
  DROP TYPE "public"."enum_page_blocks_blog_section_aspect_ratio";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_style";
  DROP TYPE "public"."enum__page_v_blocks_blog_section_aspect_ratio";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_blog_section_style" AS ENUM('three-column', 'three-column-with-images', 'three-column-with-background-images');
  CREATE TYPE "public"."enum_page_blocks_blog_section_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_style" AS ENUM('three-column', 'three-column-with-images', 'three-column-with-background-images');
  CREATE TYPE "public"."enum__page_v_blocks_blog_section_aspect_ratio" AS ENUM('16/9', '3/2', '4/3', '1/1', '9/16', '1/2', '4/1', '3/1', 'auto');
  CREATE TABLE "page_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"style" "enum_page_blocks_blog_section_style" DEFAULT 'three-column',
  	"aspect_ratio" "enum_page_blocks_blog_section_aspect_ratio" DEFAULT '1/1',
  	"posts_limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_blog_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"style" "enum__page_v_blocks_blog_section_style" DEFAULT 'three-column',
  	"aspect_ratio" "enum__page_v_blocks_blog_section_aspect_ratio" DEFAULT '1/1',
  	"posts_limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "page_blocks_blog_section" ADD CONSTRAINT "page_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_blog_section" ADD CONSTRAINT "_page_v_blocks_blog_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_blog_section_order_idx" ON "page_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "page_blocks_blog_section_parent_id_idx" ON "page_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_blog_section_path_idx" ON "page_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "page_blocks_blog_section_locale_idx" ON "page_blocks_blog_section" USING btree ("_locale");
  CREATE INDEX "_page_v_blocks_blog_section_order_idx" ON "_page_v_blocks_blog_section" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_blog_section_parent_id_idx" ON "_page_v_blocks_blog_section" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_blog_section_path_idx" ON "_page_v_blocks_blog_section" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_blog_section_locale_idx" ON "_page_v_blocks_blog_section" USING btree ("_locale");`)
}
