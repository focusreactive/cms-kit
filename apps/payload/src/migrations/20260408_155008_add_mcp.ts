import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"page_create" boolean DEFAULT false,
  	"page_update" boolean DEFAULT false,
  	"page_delete" boolean DEFAULT false,
  	"posts_create" boolean DEFAULT false,
  	"posts_update" boolean DEFAULT false,
  	"posts_delete" boolean DEFAULT false,
  	"header_create" boolean DEFAULT false,
  	"header_update" boolean DEFAULT false,
  	"header_delete" boolean DEFAULT false,
  	"footer_create" boolean DEFAULT false,
  	"footer_update" boolean DEFAULT false,
  	"footer_delete" boolean DEFAULT false,
  	"payload_mcp_tool_get_page_content" boolean DEFAULT true,
  	"payload_mcp_tool_get_page_field" boolean DEFAULT true,
  	"payload_mcp_tool_get_all_page" boolean DEFAULT true,
  	"payload_mcp_tool_get_posts_content" boolean DEFAULT true,
  	"payload_mcp_tool_get_posts_field" boolean DEFAULT true,
  	"payload_mcp_tool_get_all_posts" boolean DEFAULT true,
  	"payload_mcp_tool_get_header_content" boolean DEFAULT true,
  	"payload_mcp_tool_get_header_field" boolean DEFAULT true,
  	"payload_mcp_tool_get_all_header" boolean DEFAULT true,
  	"payload_mcp_tool_get_footer_content" boolean DEFAULT true,
  	"payload_mcp_tool_get_footer_field" boolean DEFAULT true,
  	"payload_mcp_tool_get_all_footer" boolean DEFAULT true,
  	"payload_mcp_tool_upload_image" boolean DEFAULT true,
  	"payload_mcp_tool_get_site_settings_content" boolean DEFAULT true,
  	"payload_mcp_tool_get_site_settings_field" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
  ALTER TABLE "testimonials_locales" ADD COLUMN "content" varchar NOT NULL DEFAULT '';
  ALTER TABLE "testimonials_locales" ALTER COLUMN "content" DROP DEFAULT;
  ALTER TABLE "presets_hero_actions" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "presets_hero_actions" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "presets_logos_items" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "presets_logos_items" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "presets_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "presets_hero_actions_locale_idx" ON "presets_hero_actions" USING btree ("_locale");
  CREATE INDEX "presets_logos_items_locale_idx" ON "presets_logos_items" USING btree ("_locale");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  ALTER TABLE "testimonials" DROP COLUMN "content";
  ALTER TABLE "presets" DROP COLUMN "hero_rich_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_mcp_api_keys" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk";
  
  DROP INDEX "presets_hero_actions_locale_idx";
  DROP INDEX "presets_logos_items_locale_idx";
  DROP INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";
  DROP INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx";
  ALTER TABLE "testimonials" ADD COLUMN "content" varchar NOT NULL;
  ALTER TABLE "presets" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "users" DROP COLUMN "enable_a_p_i_key";
  ALTER TABLE "users" DROP COLUMN "api_key";
  ALTER TABLE "users" DROP COLUMN "api_key_index";
  ALTER TABLE "testimonials_locales" DROP COLUMN "content";
  ALTER TABLE "presets_hero_actions" DROP COLUMN "_locale";
  ALTER TABLE "presets_logos_items" DROP COLUMN "_locale";
  ALTER TABLE "presets_locales" DROP COLUMN "hero_rich_text";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_mcp_api_keys_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "payload_mcp_api_keys_id";`)
}
