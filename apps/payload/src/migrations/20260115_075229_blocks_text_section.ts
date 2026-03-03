import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "page_blocks_content_text" CASCADE;
  DROP TABLE "_page_v_blocks_content_text" CASCADE;
  ALTER TABLE "page_blocks_text_section" ADD CONSTRAINT "page_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_text_section" ADD CONSTRAINT "_page_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_text_section_order_idx" ON "page_blocks_text_section" USING btree ("_order");
  CREATE INDEX "page_blocks_text_section_parent_id_idx" ON "page_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_text_section_path_idx" ON "page_blocks_text_section" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_text_section_order_idx" ON "_page_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_text_section_parent_id_idx" ON "_page_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_text_section_path_idx" ON "_page_v_blocks_text_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_blocks_content_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_content_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "page_blocks_text_section" CASCADE;
  DROP TABLE "_page_v_blocks_text_section" CASCADE;
  ALTER TABLE "page_blocks_content_text" ADD CONSTRAINT "page_blocks_content_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content_text" ADD CONSTRAINT "_page_v_blocks_content_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_content_text_order_idx" ON "page_blocks_content_text" USING btree ("_order");
  CREATE INDEX "page_blocks_content_text_parent_id_idx" ON "page_blocks_content_text" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_content_text_path_idx" ON "page_blocks_content_text" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_content_text_order_idx" ON "_page_v_blocks_content_text" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_content_text_parent_id_idx" ON "_page_v_blocks_content_text" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_content_text_path_idx" ON "_page_v_blocks_content_text" USING btree ("_path");`)
}
