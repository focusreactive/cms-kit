import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "header_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "header_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "header_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "header_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "footer_find" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "footer_create" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "footer_update" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "footer_delete" boolean DEFAULT false;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_all_header" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_all_footer" boolean DEFAULT true;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "header_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "header_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "header_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "header_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "footer_find";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "footer_create";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "footer_update";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "footer_delete";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_all_header";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_all_footer";`)
}
