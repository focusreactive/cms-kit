import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_site_settings_content" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_site_settings_field" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_site_settings_content";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_site_settings_field";`)
}
