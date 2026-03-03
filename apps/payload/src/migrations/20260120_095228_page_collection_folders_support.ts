import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_payload_folders_folder_type" ADD VALUE 'page';
  ALTER TABLE "page" ADD COLUMN "folder_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_folder_id" integer;
  ALTER TABLE "page" ADD CONSTRAINT "page_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_folder_id_payload_folders_id_fk" FOREIGN KEY ("version_folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_folder_idx" ON "page" USING btree ("folder_id");
  CREATE INDEX "_page_v_version_version_folder_idx" ON "_page_v" USING btree ("version_folder_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP CONSTRAINT "page_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_folder_id_payload_folders_id_fk";
  
  DROP INDEX "page_folder_idx";
  DROP INDEX "_page_v_version_version_folder_idx";
  ALTER TABLE "page" DROP COLUMN "folder_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_folder_id";
  
  DELETE FROM "payload_folders_folder_type" WHERE "value" = 'page';
  DELETE FROM "payload_folders" WHERE "id" IN (
    SELECT "parent_id" FROM "payload_folders_folder_type" WHERE "value" = 'page'
  );
  
  ALTER TABLE "payload_folders_folder_type" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_payload_folders_folder_type";
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  ALTER TABLE "payload_folders_folder_type" ALTER COLUMN "value" SET DATA TYPE "public"."enum_payload_folders_folder_type" USING "value"::"public"."enum_payload_folders_folder_type";`)
}
