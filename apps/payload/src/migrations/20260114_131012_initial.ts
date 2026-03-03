import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_blocks_hero_cta_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_page_blocks_hero_styles_height" AS ENUM('full', 'half', 'auto');
  CREATE TYPE "public"."enum_page_blocks_hero_styles_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_page_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__page_v_blocks_hero_cta_style" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__page_v_blocks_hero_styles_height" AS ENUM('full', 'half', 'auto');
  CREATE TYPE "public"."enum__page_v_blocks_hero_styles_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__page_v_blocks_content_layout" AS ENUM('image-text', 'text-image');
  CREATE TYPE "public"."enum__page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
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
  	"styles_height" "enum_page_blocks_hero_styles_height" DEFAULT 'full',
  	"styles_text_alignment" "enum_page_blocks_hero_styles_text_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_content_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_page_blocks_content_layout" DEFAULT 'image-text',
  	"columns_left_image_id" integer,
  	"columns_left_content" jsonb,
  	"columns_right_image_id" integer,
  	"columns_right_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "page_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_page_status" DEFAULT 'draft'
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
  	"styles_height" "enum__page_v_blocks_hero_styles_height" DEFAULT 'full',
  	"styles_text_alignment" "enum__page_v_blocks_hero_styles_text_alignment" DEFAULT 'center',
  	"_uuid" varchar,
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
  
  CREATE TABLE "_page_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__page_v_blocks_content_layout" DEFAULT 'image-text',
  	"columns_left_image_id" integer,
  	"columns_left_content" jsonb,
  	"columns_right_image_id" integer,
  	"columns_right_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__page_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
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
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"page_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_hero" ADD CONSTRAINT "page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_content_text" ADD CONSTRAINT "page_blocks_content_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_columns_left_image_id_media_id_fk" FOREIGN KEY ("columns_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_columns_right_image_id_media_id_fk" FOREIGN KEY ("columns_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_content" ADD CONSTRAINT "page_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_faq_items" ADD CONSTRAINT "page_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_blocks_faq" ADD CONSTRAINT "page_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_hero" ADD CONSTRAINT "_page_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content_text" ADD CONSTRAINT "_page_v_blocks_content_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_columns_left_image_id_media_id_fk" FOREIGN KEY ("columns_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_columns_right_image_id_media_id_fk" FOREIGN KEY ("columns_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_content" ADD CONSTRAINT "_page_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_faq_items" ADD CONSTRAINT "_page_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_faq" ADD CONSTRAINT "_page_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_parent_id_page_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_fk" FOREIGN KEY ("page_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "page_blocks_hero_order_idx" ON "page_blocks_hero" USING btree ("_order");
  CREATE INDEX "page_blocks_hero_parent_id_idx" ON "page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_hero_path_idx" ON "page_blocks_hero" USING btree ("_path");
  CREATE INDEX "page_blocks_hero_background_image_idx" ON "page_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "page_blocks_content_text_order_idx" ON "page_blocks_content_text" USING btree ("_order");
  CREATE INDEX "page_blocks_content_text_parent_id_idx" ON "page_blocks_content_text" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_content_text_path_idx" ON "page_blocks_content_text" USING btree ("_path");
  CREATE INDEX "page_blocks_content_order_idx" ON "page_blocks_content" USING btree ("_order");
  CREATE INDEX "page_blocks_content_parent_id_idx" ON "page_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_content_path_idx" ON "page_blocks_content" USING btree ("_path");
  CREATE INDEX "page_blocks_content_columns_left_columns_left_image_idx" ON "page_blocks_content" USING btree ("columns_left_image_id");
  CREATE INDEX "page_blocks_content_columns_right_columns_right_image_idx" ON "page_blocks_content" USING btree ("columns_right_image_id");
  CREATE INDEX "page_blocks_faq_items_order_idx" ON "page_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "page_blocks_faq_items_parent_id_idx" ON "page_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_faq_order_idx" ON "page_blocks_faq" USING btree ("_order");
  CREATE INDEX "page_blocks_faq_parent_id_idx" ON "page_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_faq_path_idx" ON "page_blocks_faq" USING btree ("_path");
  CREATE INDEX "page_updated_at_idx" ON "page" USING btree ("updated_at");
  CREATE INDEX "page_created_at_idx" ON "page" USING btree ("created_at");
  CREATE INDEX "page__status_idx" ON "page" USING btree ("_status");
  CREATE INDEX "_page_v_blocks_hero_order_idx" ON "_page_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_hero_parent_id_idx" ON "_page_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_hero_path_idx" ON "_page_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_hero_background_image_idx" ON "_page_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_page_v_blocks_content_text_order_idx" ON "_page_v_blocks_content_text" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_content_text_parent_id_idx" ON "_page_v_blocks_content_text" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_content_text_path_idx" ON "_page_v_blocks_content_text" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_content_order_idx" ON "_page_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_content_parent_id_idx" ON "_page_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_content_path_idx" ON "_page_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_content_columns_left_columns_left_image_idx" ON "_page_v_blocks_content" USING btree ("columns_left_image_id");
  CREATE INDEX "_page_v_blocks_content_columns_right_columns_right_image_idx" ON "_page_v_blocks_content" USING btree ("columns_right_image_id");
  CREATE INDEX "_page_v_blocks_faq_items_order_idx" ON "_page_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_faq_items_parent_id_idx" ON "_page_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_faq_order_idx" ON "_page_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_faq_parent_id_idx" ON "_page_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_faq_path_idx" ON "_page_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_page_v_parent_idx" ON "_page_v" USING btree ("parent_id");
  CREATE INDEX "_page_v_version_version_updated_at_idx" ON "_page_v" USING btree ("version_updated_at");
  CREATE INDEX "_page_v_version_version_created_at_idx" ON "_page_v" USING btree ("version_created_at");
  CREATE INDEX "_page_v_version_version__status_idx" ON "_page_v" USING btree ("version__status");
  CREATE INDEX "_page_v_created_at_idx" ON "_page_v" USING btree ("created_at");
  CREATE INDEX "_page_v_updated_at_idx" ON "_page_v" USING btree ("updated_at");
  CREATE INDEX "_page_v_latest_idx" ON "_page_v" USING btree ("latest");
  CREATE INDEX "_page_v_autosave_idx" ON "_page_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
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
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_page_id_idx" ON "payload_locked_documents_rels" USING btree ("page_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "page_blocks_hero" CASCADE;
  DROP TABLE "page_blocks_content_text" CASCADE;
  DROP TABLE "page_blocks_content" CASCADE;
  DROP TABLE "page_blocks_faq_items" CASCADE;
  DROP TABLE "page_blocks_faq" CASCADE;
  DROP TABLE "page" CASCADE;
  DROP TABLE "_page_v_blocks_hero" CASCADE;
  DROP TABLE "_page_v_blocks_content_text" CASCADE;
  DROP TABLE "_page_v_blocks_content" CASCADE;
  DROP TABLE "_page_v_blocks_faq_items" CASCADE;
  DROP TABLE "_page_v_blocks_faq" CASCADE;
  DROP TABLE "_page_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_page_blocks_hero_cta_style";
  DROP TYPE "public"."enum_page_blocks_hero_styles_height";
  DROP TYPE "public"."enum_page_blocks_hero_styles_text_alignment";
  DROP TYPE "public"."enum_page_blocks_content_layout";
  DROP TYPE "public"."enum_page_status";
  DROP TYPE "public"."enum__page_v_blocks_hero_cta_style";
  DROP TYPE "public"."enum__page_v_blocks_hero_styles_height";
  DROP TYPE "public"."enum__page_v_blocks_hero_styles_text_alignment";
  DROP TYPE "public"."enum__page_v_blocks_content_layout";
  DROP TYPE "public"."enum__page_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
