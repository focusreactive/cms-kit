import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_posts_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_meta_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__posts_v_version_meta_og_type" AS ENUM('website', 'article');
  ALTER TABLE "posts" ADD COLUMN "meta_robots_index" "enum_posts_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "posts" ADD COLUMN "meta_robots_follow" "enum_posts_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "posts" ADD COLUMN "meta_og_type" "enum_posts_meta_og_type" DEFAULT 'website';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots_index" "enum__posts_v_version_meta_robots_index" DEFAULT 'index';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_robots_follow" "enum__posts_v_version_meta_robots_follow" DEFAULT 'follow';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_og_type" "enum__posts_v_version_meta_og_type" DEFAULT 'website';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "meta_robots_index";
  ALTER TABLE "posts" DROP COLUMN "meta_robots_follow";
  ALTER TABLE "posts" DROP COLUMN "meta_og_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots_index";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_robots_follow";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_og_type";
  DROP TYPE "public"."enum_posts_meta_robots_index";
  DROP TYPE "public"."enum_posts_meta_robots_follow";
  DROP TYPE "public"."enum_posts_meta_og_type";
  DROP TYPE "public"."enum__posts_v_version_meta_robots_index";
  DROP TYPE "public"."enum__posts_v_version_meta_robots_follow";
  DROP TYPE "public"."enum__posts_v_version_meta_og_type";`)
}
