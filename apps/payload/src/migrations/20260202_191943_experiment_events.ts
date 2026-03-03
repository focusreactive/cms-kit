import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_experiment_events_event_type" AS ENUM('hero_view');
  CREATE TABLE "experiments_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"status" "enum_experiments_status" DEFAULT 'draft' NOT NULL,
  	"type" "enum_experiments_type" NOT NULL,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
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
  
  ALTER TABLE "experiments_variants" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiment_events_id" integer;
  ALTER TABLE "experiments_locales" ADD CONSTRAINT "experiments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiment_events" ADD CONSTRAINT "experiment_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "experiments_locales_locale_parent_id_unique" ON "experiments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiment_events_experiment_idx" ON "experiment_events" USING btree ("experiment_id");
  CREATE INDEX "experiment_events_tenant_idx" ON "experiment_events" USING btree ("tenant_id");
  CREATE INDEX "experiment_events_updated_at_idx" ON "experiment_events" USING btree ("updated_at");
  CREATE INDEX "experiment_events_created_at_idx" ON "experiment_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiment_events_fk" FOREIGN KEY ("experiment_events_id") REFERENCES "public"."experiment_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "experiments_variants_locale_idx" ON "experiments_variants" USING btree ("_locale");
  CREATE INDEX "payload_locked_documents_rels_experiment_events_id_idx" ON "payload_locked_documents_rels" USING btree ("experiment_events_id");
  ALTER TABLE "experiments" DROP COLUMN "name";
  ALTER TABLE "experiments" DROP COLUMN "description";
  ALTER TABLE "experiments" DROP COLUMN "status";
  ALTER TABLE "experiments" DROP COLUMN "type";
  ALTER TABLE "experiments" DROP COLUMN "start_date";
  ALTER TABLE "experiments" DROP COLUMN "end_date";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiments_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiment_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_experiment_events_fk";
  ALTER TABLE "experiments" ADD COLUMN "name" varchar, ADD COLUMN "description" varchar, ADD COLUMN "status" "enum_experiments_status" DEFAULT 'draft', ADD COLUMN "type" "enum_experiments_type", ADD COLUMN "start_date" timestamp(3) with time zone, ADD COLUMN "end_date" timestamp(3) with time zone;
  UPDATE "experiments" e SET name = el.name, description = el.description, status = el.status, type = el.type, start_date = el.start_date, end_date = el.end_date FROM (SELECT DISTINCT ON (_parent_id) _parent_id, name, description, status, type, start_date, end_date FROM "experiments_locales" ORDER BY _parent_id, _locale) el WHERE e.id = el._parent_id;
  UPDATE "experiments" SET name = '' WHERE name IS NULL;
  UPDATE "experiments" SET type = 'hero' WHERE type IS NULL;
  ALTER TABLE "experiments" ALTER COLUMN "name" SET NOT NULL, ALTER COLUMN "status" SET NOT NULL, ALTER COLUMN "type" SET NOT NULL;
  DROP TABLE "experiments_locales" CASCADE;
  DROP TABLE "experiment_events" CASCADE;
  DROP INDEX IF EXISTS "experiments_variants_locale_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_experiment_events_id_idx";
  ALTER TABLE "experiments_variants" DROP COLUMN "_locale";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "experiment_events_id";
  DROP TYPE "public"."enum_experiment_events_event_type";`)
}
