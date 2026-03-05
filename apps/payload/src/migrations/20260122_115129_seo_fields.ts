import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  ALTER TABLE "page" DROP COLUMN "meta_robots_index";
  ALTER TABLE "page" DROP COLUMN "meta_robots_follow";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots_index";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_robots_follow";
  ALTER TABLE "posts" DROP COLUMN "meta_robots_index";
  ALTER TABLE "posts" DROP COLUMN "meta_robots_follow";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots_index";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots_follow";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_robots_index";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_robots_follow";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_robots_index";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_robots_follow";
  DROP TYPE "public"."enum_page_meta_robots_index";
  DROP TYPE "public"."enum_page_meta_robots_follow";
  DROP TYPE "public"."enum__page_v_version_meta_robots_index";
  DROP TYPE "public"."enum__page_v_version_meta_robots_follow";
  DROP TYPE "public"."enum_posts_meta_robots_index";
  DROP TYPE "public"."enum_posts_meta_robots_follow";
  DROP TYPE "public"."enum__posts_v_version_meta_robots_index";
  DROP TYPE "public"."enum__posts_v_version_meta_robots_follow";
  DROP TYPE "public"."enum_blog_page_settings_meta_robots_index";
  DROP TYPE "public"."enum_blog_page_settings_meta_robots_follow";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_robots_index";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_robots_follow";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_page_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__page_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__page_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_posts_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_blog_page_settings_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_blog_page_settings_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  ALTER TABLE "page" ADD COLUMN "meta_robots_index" "enum_page_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "page" ADD COLUMN "meta_robots_follow" "enum_page_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots_index" "enum__page_v_version_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_robots_follow" "enum__page_v_version_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "posts" ADD COLUMN "meta_robots_index" "enum_posts_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "posts" ADD COLUMN "meta_robots_follow" "enum_posts_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots_index" "enum__posts_v_version_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots_follow" "enum__posts_v_version_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_robots_index" "enum_blog_page_settings_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_robots_follow" "enum_blog_page_settings_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_robots_index" "enum__blog_page_settings_v_version_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_robots_follow" "enum__blog_page_settings_v_version_meta_robots_follow" DEFAULT 'follow';
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
