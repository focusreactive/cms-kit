import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__page_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_blog_page_settings_meta_robots" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots" AS ENUM('index', 'noindex');
  ALTER TABLE "page" ADD COLUMN "meta_robots" "enum_page_meta_robots" DEFAULT 'index';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots" "enum__page_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "posts" ADD COLUMN "meta_robots" "enum_posts_meta_robots" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots" "enum__posts_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_robots" "enum_blog_page_settings_meta_robots" DEFAULT 'index';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_robots" "enum__blog_page_settings_v_version_meta_robots" DEFAULT 'index';
  ALTER TABLE "page" DROP COLUMN "meta_index";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_index";
  ALTER TABLE "posts" DROP COLUMN "meta_index";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_index";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_index";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_index";
  DROP TYPE "public"."enum_page_meta_index";
  DROP TYPE "public"."enum__page_v_version_meta_index";
  DROP TYPE "public"."enum_posts_meta_index";
  DROP TYPE "public"."enum__posts_v_version_meta_index";
  DROP TYPE "public"."enum_blog_page_settings_meta_index";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_index";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_meta_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__page_v_version_meta_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_meta_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_blog_page_settings_meta_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_index" AS ENUM('index', 'noindex');
  ALTER TABLE "page" ADD COLUMN "meta_index" "enum_page_meta_index" DEFAULT 'index';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_index" "enum__page_v_version_meta_index" DEFAULT 'index';
  ALTER TABLE "posts" ADD COLUMN "meta_index" "enum_posts_meta_index" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_index" "enum__posts_v_version_meta_index" DEFAULT 'index';
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_index" "enum_blog_page_settings_meta_index" DEFAULT 'index';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_index" "enum__blog_page_settings_v_version_meta_index" DEFAULT 'index';
  ALTER TABLE "page" DROP COLUMN "meta_robots";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots";
  ALTER TABLE "posts" DROP COLUMN "meta_robots";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_robots";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_robots";
  DROP TYPE "public"."enum_page_meta_robots";
  DROP TYPE "public"."enum__page_v_version_meta_robots";
  DROP TYPE "public"."enum_posts_meta_robots";
  DROP TYPE "public"."enum__posts_v_version_meta_robots";
  DROP TYPE "public"."enum_blog_page_settings_meta_robots";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_robots";`)
}
