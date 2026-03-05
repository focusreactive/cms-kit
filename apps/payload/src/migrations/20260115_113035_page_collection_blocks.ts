import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "page_blocks_hero" CASCADE;
  DROP TABLE "_page_v_blocks_hero" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP INDEX "page__status_idx";
  DROP INDEX "_page_v_version_version__status_idx";
  DROP INDEX "_page_v_latest_idx";
  DROP INDEX "_page_v_autosave_idx";
  ALTER TABLE "page_blocks_text_section" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "layout" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "page_blocks_faq" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_text_section" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "layout" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "_page_v_blocks_faq" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_title" SET NOT NULL;
  ALTER TABLE "page" DROP COLUMN "_status";
  ALTER TABLE "_page_v" DROP COLUMN "version__status";
  ALTER TABLE "_page_v" DROP COLUMN "latest";
  ALTER TABLE "_page_v" DROP COLUMN "autosave";
  DROP TYPE "public"."enum_page_blocks_hero_cta_style";
  DROP TYPE "public"."enum_page_blocks_hero_background_overlay_color";
  DROP TYPE "public"."enum_page_blocks_hero_styles_height";
  DROP TYPE "public"."enum_page_blocks_hero_styles_text_alignment";
  DROP TYPE "public"."enum_page_status";
  DROP TYPE "public"."enum__page_v_blocks_hero_cta_style";
  DROP TYPE "public"."enum__page_v_blocks_hero_background_overlay_color";
  DROP TYPE "public"."enum__page_v_blocks_hero_styles_height";
  DROP TYPE "public"."enum__page_v_blocks_hero_styles_text_alignment";
  DROP TYPE "public"."enum__page_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_hero_cta_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_page_blocks_hero_background_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum_page_blocks_hero_styles_height" AS ENUM('full', 'half', 'auto');
  CREATE TYPE "public"."enum_page_blocks_hero_styles_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__page_v_blocks_hero_cta_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__page_v_blocks_hero_background_overlay_color" AS ENUM('black', 'white');
  CREATE TYPE "public"."enum__page_v_blocks_hero_styles_height" AS ENUM('full', 'half', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_hero_styles_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE "page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_style" "enum_page_blocks_hero_cta_style" DEFAULT 'primary',
  	"background_image_id" integer,
  	"background_fallback_color" varchar DEFAULT '#1a1a1a',
  	"background_overlay_enabled" boolean DEFAULT true,
  	"background_overlay_color" "enum_page_blocks_hero_background_overlay_color" DEFAULT 'black',
  	"background_overlay_opacity" numeric DEFAULT 40,
  	"styles_height" "enum_page_blocks_hero_styles_height" DEFAULT 'full',
  	"styles_text_alignment" "enum_page_blocks_hero_styles_text_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_style" "enum__page_v_blocks_hero_cta_style" DEFAULT 'primary',
  	"background_image_id" integer,
  	"background_fallback_color" varchar DEFAULT '#1a1a1a',
  	"background_overlay_enabled" boolean DEFAULT true,
  	"background_overlay_color" "enum__page_v_blocks_hero_background_overlay_color" DEFAULT 'black',
  	"background_overlay_opacity" numeric DEFAULT 40,
  	"styles_height" "enum__page_v_blocks_hero_styles_height" DEFAULT 'full',
  	"styles_text_alignment" "enum__page_v_blocks_hero_styles_text_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "page_blocks_text_section" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "layout" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "page_blocks_content" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "page_blocks_faq" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "page" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_text_section" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "layout" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_content" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "_page_v_blocks_faq" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "_page_v" ALTER COLUMN "version_title" DROP NOT NULL;
  ALTER TABLE "page" ADD COLUMN "_status" "enum_page_status" DEFAULT 'draft';
  ALTER TABLE "_page_v" ADD COLUMN "version__status" "enum__page_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_page_v" ADD COLUMN "latest" boolean;
  ALTER TABLE "_page_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_hero_order_idx" ON "page_blocks_hero" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_parent_id_idx" ON "page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_path_idx" ON "page_blocks_hero" USING btree ("_path");
  CREATE INDEX "page_blocks_hero_background_background_image_idx" ON "page_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_page_v_blocks_hero_order_idx" ON "_page_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_parent_id_idx" ON "_page_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_path_idx" ON "_page_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_hero_background_background_image_idx" ON "_page_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "page__status_idx" ON "page" USING btree ("_status");
  CREATE INDEX "_page_v_version_version__status_idx" ON "_page_v" USING btree ("version__status");
  CREATE INDEX "_page_v_latest_idx" ON "_page_v" USING btree ("latest");
  CREATE INDEX "_page_v_autosave_idx" ON "_page_v" USING btree ("autosave");`)
}
