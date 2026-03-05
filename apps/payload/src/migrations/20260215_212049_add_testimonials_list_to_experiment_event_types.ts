import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_experiment_events_event_type" ADD VALUE 'testimonialsList_view';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiment_events" ALTER COLUMN "event_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_experiment_events_event_type";
  CREATE TYPE "public"."enum_experiment_events_event_type" AS ENUM('hero_view');
  ALTER TABLE "experiment_events" ALTER COLUMN "event_type" SET DATA TYPE "public"."enum_experiment_events_event_type" USING "event_type"::"public"."enum_experiment_events_event_type";`)
}
