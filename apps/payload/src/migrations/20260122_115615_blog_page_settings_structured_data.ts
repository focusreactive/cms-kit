import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_page_settings" DROP COLUMN "enable_structured_data";
  ALTER TABLE "blog_page_settings" DROP COLUMN "structured_data_description";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_enable_structured_data";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_structured_data_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_page_settings" ADD COLUMN "enable_structured_data" boolean DEFAULT true;
  ALTER TABLE "blog_page_settings" ADD COLUMN "structured_data_description" varchar;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_enable_structured_data" boolean DEFAULT true;
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_structured_data_description" varchar;`)
}
