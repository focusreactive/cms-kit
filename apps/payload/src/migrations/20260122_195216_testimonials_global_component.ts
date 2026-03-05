import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "page_blocks_testimonials_preset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"testimonials_preset_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_page_v_blocks_testimonials_preset" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"testimonials_preset_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"company" varchar,
  	"position" varchar,
  	"avatar_id" integer,
  	"content" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_presets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"show_rating" boolean DEFAULT true,
  	"show_avatar" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_presets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_presets_id" integer;
  ALTER TABLE "page_blocks_testimonials_preset" ADD CONSTRAINT "page_blocks_testimonials_preset_testimonials_preset_id_testimonials_presets_id_fk" FOREIGN KEY ("testimonials_preset_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_blocks_testimonials_preset" ADD CONSTRAINT "page_blocks_testimonials_preset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_preset" ADD CONSTRAINT "_page_v_blocks_testimonials_preset_testimonials_preset_id_testimonials_presets_id_fk" FOREIGN KEY ("testimonials_preset_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_preset" ADD CONSTRAINT "_page_v_blocks_testimonials_preset_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_presets_rels" ADD CONSTRAINT "testimonials_presets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_presets_rels" ADD CONSTRAINT "testimonials_presets_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_preset_order_idx" ON "page_blocks_testimonials_preset" USING btree ("_order");
  CREATE INDEX "page_blocks_testimonials_preset_parent_id_idx" ON "page_blocks_testimonials_preset" USING btree ("_parent_id");
  CREATE INDEX "page_blocks_testimonials_preset_path_idx" ON "page_blocks_testimonials_preset" USING btree ("_path");
  CREATE INDEX "page_blocks_testimonials_preset_testimonials_preset_idx" ON "page_blocks_testimonials_preset" USING btree ("testimonials_preset_id");
  CREATE INDEX "_page_v_blocks_testimonials_preset_order_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_order");
  CREATE INDEX "_page_v_blocks_testimonials_preset_parent_id_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_parent_id");
  CREATE INDEX "_page_v_blocks_testimonials_preset_path_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("_path");
  CREATE INDEX "_page_v_blocks_testimonials_preset_testimonials_preset_idx" ON "_page_v_blocks_testimonials_preset" USING btree ("testimonials_preset_id");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials_presets_updated_at_idx" ON "testimonials_presets" USING btree ("updated_at");
  CREATE INDEX "testimonials_presets_created_at_idx" ON "testimonials_presets" USING btree ("created_at");
  CREATE INDEX "testimonials_presets_rels_order_idx" ON "testimonials_presets_rels" USING btree ("order");
  CREATE INDEX "testimonials_presets_rels_parent_idx" ON "testimonials_presets_rels" USING btree ("parent_id");
  CREATE INDEX "testimonials_presets_rels_path_idx" ON "testimonials_presets_rels" USING btree ("path");
  CREATE INDEX "testimonials_presets_rels_testimonials_id_idx" ON "testimonials_presets_rels" USING btree ("testimonials_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_presets_fk" FOREIGN KEY ("testimonials_presets_id") REFERENCES "public"."testimonials_presets"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_presets_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_presets_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page_blocks_testimonials_preset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_v_blocks_testimonials_preset" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_presets_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_presets_fk";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_presets_id_idx";
  DROP TABLE "page_blocks_testimonials_preset" CASCADE;
  DROP TABLE "_page_v_blocks_testimonials_preset" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_presets" CASCADE;
  DROP TABLE "testimonials_presets_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_presets_id";`)
}
