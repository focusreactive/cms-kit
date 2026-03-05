import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_page_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__page_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__page_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  ALTER TABLE "page" ADD COLUMN "meta_robots_index" "enum_page_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "page" ADD COLUMN "meta_robots_follow" "enum_page_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots_index" "enum__page_v_version_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots_follow" "enum__page_v_version_meta_robots_follow" DEFAULT 'follow';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP COLUMN "meta_robots_index";
  ALTER TABLE "page" DROP COLUMN "meta_robots_follow";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots_index";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots_follow";
  DROP TYPE "public"."enum_page_meta_robots_index";
  DROP TYPE "public"."enum_page_meta_robots_follow";
  DROP TYPE "public"."enum__page_v_version_meta_robots_index";
  DROP TYPE "public"."enum__page_v_version_meta_robots_follow";`)
}
