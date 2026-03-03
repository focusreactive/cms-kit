import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "admin_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "admin_icon_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_admin_logo_id" integer;
  ALTER TABLE "_site_settings_v" ADD COLUMN "version_admin_icon_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_admin_logo_id_media_id_fk" FOREIGN KEY ("admin_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_admin_icon_id_media_id_fk" FOREIGN KEY ("admin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_admin_logo_id_media_id_fk" FOREIGN KEY ("version_admin_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_admin_icon_id_media_id_fk" FOREIGN KEY ("version_admin_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_admin_logo_idx" ON "site_settings" USING btree ("admin_logo_id");
  CREATE INDEX "site_settings_admin_icon_idx" ON "site_settings" USING btree ("admin_icon_id");
  CREATE INDEX "_site_settings_v_version_version_admin_logo_idx" ON "_site_settings_v" USING btree ("version_admin_logo_id");
  CREATE INDEX "_site_settings_v_version_version_admin_icon_idx" ON "_site_settings_v" USING btree ("version_admin_icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_admin_logo_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_admin_icon_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_admin_logo_id_media_id_fk";
  
  ALTER TABLE "_site_settings_v" DROP CONSTRAINT "_site_settings_v_version_admin_icon_id_media_id_fk";
  
  DROP INDEX "site_settings_admin_logo_idx";
  DROP INDEX "site_settings_admin_icon_idx";
  DROP INDEX "_site_settings_v_version_version_admin_logo_idx";
  DROP INDEX "_site_settings_v_version_version_admin_icon_idx";
  ALTER TABLE "site_settings" DROP COLUMN "admin_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "admin_icon_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_admin_logo_id";
  ALTER TABLE "_site_settings_v" DROP COLUMN "version_admin_icon_id";`)
}
