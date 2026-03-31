import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_page_field" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_posts_content" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_posts_field" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_post_content";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_page_block";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_post_content" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" ADD COLUMN "payload_mcp_tool_get_page_block" boolean DEFAULT true;
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_page_field";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_posts_content";
  ALTER TABLE "payload_mcp_api_keys" DROP COLUMN "payload_mcp_tool_get_posts_field";`)
}
