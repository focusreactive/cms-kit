import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "experiments_variants" CASCADE;
  DROP TABLE IF EXISTS "experiments_tenants" CASCADE;
  DROP TABLE IF EXISTS "experiments" CASCADE;
  DROP TABLE IF EXISTS "experiments_locales" CASCADE;
  DROP TABLE IF EXISTS "experiment_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_experiments_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_experiment_events_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_experiments_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_experiment_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "experiments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "experiment_events_id";
  DROP TYPE IF EXISTS "public"."enum_experiments_status";
  DROP TYPE IF EXISTS "public"."enum_experiments_type";
  DROP TYPE IF EXISTS "public"."enum_experiment_events_event_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiments_status" AS ENUM('draft', 'running', 'paused', 'completed');
  CREATE TYPE "public"."enum_experiments_type" AS ENUM('hero', 'testimonialsList');
  CREATE TYPE "public"."enum_experiment_events_event_type" AS ENUM('hero_view', 'testimonialsList_view');
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
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"status" "enum_experiments_status" DEFAULT 'draft' NOT NULL,
  	"type" "enum_experiments_type" NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"tenant_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiments_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiment_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"experiment_id" integer NOT NULL,
  	"tenant_id" integer,
  	"variant_id" varchar NOT NULL,
  	"event_type" "enum_experiment_events_event_type" NOT NULL,
  	"metadata" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiment_events_id" integer;
  ALTER TABLE "experiments_variants" ADD CONSTRAINT "experiments_variants_preset_id_presets_id_fk" FOREIGN KEY ("preset_id") REFERENCES "public"."presets"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiments_variants" ADD CONSTRAINT "experiments_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiments_tenants" ADD CONSTRAINT "experiments_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiments_tenants" ADD CONSTRAINT "experiments_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiments" ADD CONSTRAINT "experiments_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiments_locales" ADD CONSTRAINT "experiments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "experiments_variants_order_idx" ON "experiments_variants" USING btree ("_order");
  CREATE INDEX "experiments_variants_parent_id_idx" ON "experiments_variants" USING btree ("_parent_id");
  CREATE INDEX "experiments_variants_preset_idx" ON "experiments_variants" USING btree ("preset_id");
  CREATE INDEX "experiments_tenants_order_idx" ON "experiments_tenants" USING btree ("_order");
  CREATE INDEX "experiments_tenants_parent_id_idx" ON "experiments_tenants" USING btree ("_parent_id");
  CREATE INDEX "experiments_tenants_tenant_idx" ON "experiments_tenants" USING btree ("tenant_id");
  CREATE INDEX "experiments_slug_idx" ON "experiments" USING btree ("slug");
  CREATE INDEX "experiments_tenant_idx" ON "experiments" USING btree ("tenant_id");
  CREATE INDEX "experiments_updated_at_idx" ON "experiments" USING btree ("updated_at");
  CREATE INDEX "experiments_created_at_idx" ON "experiments" USING btree ("created_at");
  CREATE UNIQUE INDEX "experiments_locales_locale_parent_id_unique" ON "experiments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiment_events_experiment_idx" ON "experiment_events" USING btree ("experiment_id");
  CREATE INDEX "experiment_events_tenant_idx" ON "experiment_events" USING btree ("tenant_id");
  CREATE INDEX "experiment_events_updated_at_idx" ON "experiment_events" USING btree ("updated_at");
  CREATE INDEX "experiment_events_created_at_idx" ON "experiment_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiments_fk" FOREIGN KEY ("experiments_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiment_events_fk" FOREIGN KEY ("experiment_events_id") REFERENCES "public"."experiment_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_experiments_id_idx" ON "payload_locked_documents_rels" USING btree ("experiments_id");
  CREATE INDEX "payload_locked_documents_rels_experiment_events_id_idx" ON "payload_locked_documents_rels" USING btree ("experiment_events_id");`)
}
