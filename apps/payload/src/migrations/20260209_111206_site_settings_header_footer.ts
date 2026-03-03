import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "header_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "footer_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_header_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_footer_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_header_id_header_id_fk" FOREIGN KEY ("header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_footer_id_footer_id_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_header_id_header_id_fk" FOREIGN KEY ("version_header_id") REFERENCES "public"."header"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_footer_id_footer_id_fk" FOREIGN KEY ("version_footer_id") REFERENCES "public"."footer"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_header_idx" ON "site_settings" USING btree ("header_id");
  CREATE INDEX "site_settings_footer_idx" ON "site_settings" USING btree ("footer_id");
  CREATE INDEX "_site_settings_v_version_version_header_idx" ON "_site_settings_v" USING btree ("version_header_id");
  CREATE INDEX "_site_settings_v_version_version_footer_idx" ON "_site_settings_v" USING btree ("version_footer_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_header_id_header_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_footer_id_footer_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_header_id_header_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_footer_id_footer_id_fk";
  
  DROP INDEX "site_settings_header_idx";
  DROP INDEX "site_settings_footer_idx";
  DROP INDEX "_site_settings_v_version_version_header_idx";
  DROP INDEX "_site_settings_v_version_version_footer_idx";
  ALTER TABLE "site_settings" DROP COLUMN "header_id";
  ALTER TABLE "site_settings" DROP COLUMN "footer_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_header_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_footer_id";`)
}
