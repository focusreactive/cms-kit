import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_media_default_for" AS ENUM('platform_default');
  CREATE TABLE "media_default_for" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_media_default_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "media_default_for" ADD CONSTRAINT "media_default_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_default_for_order_idx" ON "media_default_for" USING btree ("order");
  CREATE INDEX "media_default_for_parent_idx" ON "media_default_for" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "media_default_for" CASCADE;
  DROP TYPE "public"."enum_media_default_for";`)
}
