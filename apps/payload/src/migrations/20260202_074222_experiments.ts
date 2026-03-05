import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiments_status" AS ENUM('draft', 'running', 'paused', 'completed');
  CREATE TYPE "public"."enum_experiments_type" AS ENUM('hero', 'testimonialsList');
  CREATE TABLE "experiments_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"preset_id" integer NOT NULL,
  	"weight" numeric DEFAULT 50 NOT NULL
  );
  
  CREATE TABLE "experiments_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "experiments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"slug" varchar NOT NULL,
  	"status" "enum_experiments_status" DEFAULT 'draft' NOT NULL,
  	"type" "enum_experiments_type" NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "page_blocks_testimonials_list" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "page_locales" ADD COLUMN "hero_use_experiment" boolean DEFAULT false;
  ALTER TABLE "page_locales" ADD COLUMN "hero_experiment_id" integer;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "use_experiment" boolean DEFAULT false;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD COLUMN "experiment_id" integer;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_use_experiment" boolean DEFAULT false;
  ALTER TABLE "_page_v_locales" ADD COLUMN "version_hero_experiment_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiments_id" integer;
  ALTER TABLE "experiments_variants" ADD CONSTRAINT "experiments_variants_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiments_variants" ADD CONSTRAINT "experiments_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiments_tenants" ADD CONSTRAINT "experiments_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiments_tenants" ADD CONSTRAINT "experiments_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiments" ADD CONSTRAINT "experiments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "experiments_variants_order_idx" ON "experiments_variants" USING btree ("_order");
  CREATE INDEX "experiments_variants_parent_id_idx" ON "experiments_variants" USING btree ("_parent_id");
  CREATE INDEX "experiments_variants_preset_idx" ON "experiments_variants" USING btree ("preset_id");
  CREATE INDEX "experiments_tenants_order_idx" ON "experiments_tenants" USING btree ("_order");
  CREATE INDEX "experiments_tenants_parent_id_idx" ON "experiments_tenants" USING btree ("_parent_id");
  CREATE INDEX "experiments_tenants_tenant_idx" ON "experiments_tenants" USING btree ("tenant_id");
  CREATE UNIQUE INDEX "experiments_slug_idx" ON "experiments" USING btree ("slug");
  CREATE INDEX "experiments_tenant_idx" ON "experiments" USING btree ("tenant_id");
  CREATE INDEX "experiments_updated_at_idx" ON "experiments" USING btree ("updated_at");
  CREATE INDEX "experiments_created_at_idx" ON "experiments" USING btree ("created_at");
  ALTER TABLE "page_blocks_testimonials_list" ADD CONSTRAINT "page_blocks_testimonials_list_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_locales" ADD CONSTRAINT "page_locales_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("hero_experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_blocks_testimonials_list" ADD CONSTRAINT "_page_v_blocks_testimonials_list_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v_locales" ADD CONSTRAINT "_page_v_locales_version_hero_experiment_id_experiments_id_fk" FOREIGN KEY ("version_hero_experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiments_fk" FOREIGN KEY ("experiments_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "page_blocks_testimonials_list_experiment_idx" ON "page_blocks_testimonials_list" USING btree ("experiment_id");
  CREATE INDEX "page_hero_hero_experiment_idx" ON "page_locales" USING btree ("hero_experiment_id");
  CREATE INDEX "_page_v_blocks_testimonials_list_experiment_idx" ON "_page_v_blocks_testimonials_list" USING btree ("experiment_id");
  CREATE INDEX "_page_v_version_hero_version_hero_experiment_idx" ON "_page_v_locales" USING btree ("version_hero_experiment_id");
  CREATE INDEX "payload_locked_documents_rels_experiments_id_idx" ON "payload_locked_documents_rels" USING btree ("experiments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "page_blocks_testimonials_list" DROP CONSTRAINT IF EXISTS "page_blocks_testimonials_list_experiment_id_experiments_id_fk";
  ALTER TABLE "page_locales" DROP CONSTRAINT IF EXISTS "page_locales_hero_experiment_id_experiments_id_fk";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP CONSTRAINT IF EXISTS "_page_v_blocks_testimonials_list_experiment_id_experiments_id_fk";
  ALTER TABLE "_page_v_locales" DROP CONSTRAINT IF EXISTS "_page_v_locales_version_hero_experiment_id_experiments_id_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_experiments_fk";

  DROP INDEX IF EXISTS "page_blocks_testimonials_list_experiment_idx";
  DROP INDEX IF EXISTS "page_hero_hero_experiment_idx";
  DROP INDEX IF EXISTS "_page_v_blocks_testimonials_list_experiment_idx";
  DROP INDEX IF EXISTS "_page_v_version_hero_version_hero_experiment_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_experiments_id_idx";

  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN IF EXISTS "use_experiment";
  ALTER TABLE "page_blocks_testimonials_list" DROP COLUMN IF EXISTS "experiment_id";
  ALTER TABLE "page_locales" DROP COLUMN IF EXISTS "hero_use_experiment";
  ALTER TABLE "page_locales" DROP COLUMN IF EXISTS "hero_experiment_id";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN IF EXISTS "use_experiment";
  ALTER TABLE "_page_v_blocks_testimonials_list" DROP COLUMN IF EXISTS "experiment_id";
  ALTER TABLE "_page_v_locales" DROP COLUMN IF EXISTS "version_hero_use_experiment";
  ALTER TABLE "_page_v_locales" DROP COLUMN IF EXISTS "version_hero_experiment_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "experiments_id";

  DROP TABLE IF EXISTS "experiments_variants" CASCADE;
  DROP TABLE IF EXISTS "experiments_tenants" CASCADE;
  DROP TABLE IF EXISTS "experiments" CASCADE;

  DROP TYPE IF EXISTS "public"."enum_experiments_status";
  DROP TYPE IF EXISTS "public"."enum_experiments_type";`)
}
