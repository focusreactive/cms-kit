import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  CREATE TYPE "public"."enum__page_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "page" ADD COLUMN "hero_type" "enum_page_hero_type" DEFAULT 'lowImpact' NOT NULL;
  ALTER TABLE "page" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "page" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "page" ADD COLUMN "generate_slug" boolean DEFAULT true;
  ALTER TABLE "page" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_type" "enum__page_v_version_hero_type" DEFAULT 'lowImpact' NOT NULL;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_page_v" ADD COLUMN "version_hero_media_id" integer;
  ALTER TABLE "_page_v" ADD COLUMN "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_page_v" ADD COLUMN "version_slug" varchar NOT NULL;
  ALTER TABLE "page" ADD CONSTRAINT "page_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_v" ADD CONSTRAINT "_page_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "page_hero_hero_media_idx" ON "page" USING btree ("hero_media_id");
  CREATE UNIQUE INDEX "page_slug_idx" ON "page" USING btree ("slug");
  CREATE INDEX "_page_v_version_hero_version_hero_media_idx" ON "_page_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_page_v_version_version_slug_idx" ON "_page_v" USING btree ("version_slug");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP CONSTRAINT "page_hero_media_id_media_id_fk";
  
  ALTER TABLE "_page_v" DROP CONSTRAINT "_page_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX "page_hero_hero_media_idx";
  DROP INDEX "page_slug_idx";
  DROP INDEX "_page_v_version_hero_version_hero_media_idx";
  DROP INDEX "_page_v_version_version_slug_idx";
  ALTER TABLE "page" DROP COLUMN "hero_type";
  ALTER TABLE "page" DROP COLUMN "hero_rich_text";
  ALTER TABLE "page" DROP COLUMN "hero_media_id";
  ALTER TABLE "page" DROP COLUMN "generate_slug";
  ALTER TABLE "page" DROP COLUMN "slug";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_type";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_page_v" DROP COLUMN "version_hero_media_id";
  ALTER TABLE "_page_v" DROP COLUMN "version_generate_slug";
  ALTER TABLE "_page_v" DROP COLUMN "version_slug";
  DROP TYPE "public"."enum_page_hero_type";
  DROP TYPE "public"."enum__page_v_version_hero_type";`)
}
