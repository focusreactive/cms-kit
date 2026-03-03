import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "page" DROP COLUMN "meta_og_type";
  ALTER TABLE "_page_v" DROP COLUMN "version_meta_og_type";
  ALTER TABLE "posts" DROP COLUMN "meta_og_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_meta_og_type";
  ALTER TABLE "blog_page_settings" DROP COLUMN "meta_og_type";
  ALTER TABLE "_blog_page_settings_v" DROP COLUMN "version_meta_og_type";
  DROP TYPE "public"."enum_page_meta_og_type";
  DROP TYPE "public"."enum__page_v_version_meta_og_type";
  DROP TYPE "public"."enum_posts_meta_og_type";
  DROP TYPE "public"."enum__posts_v_version_meta_og_type";
  DROP TYPE "public"."enum_blog_page_settings_meta_og_type";
  DROP TYPE "public"."enum__blog_page_settings_v_version_meta_og_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_page_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__page_v_version_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum_posts_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__posts_v_version_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum_blog_page_settings_meta_og_type" AS ENUM('website', 'article');
  CREATE TYPE "public"."enum__blog_page_settings_v_version_meta_og_type" AS ENUM('website', 'article');
  ALTER TABLE "page" ADD COLUMN "meta_og_type" "enum_page_meta_og_type" DEFAULT 'website';
  ALTER TABLE "_page_v" ADD COLUMN "version_meta_og_type" "enum__page_v_version_meta_og_type" DEFAULT 'website';
  ALTER TABLE "posts" ADD COLUMN "meta_og_type" "enum_posts_meta_og_type" DEFAULT 'article';
  ALTER TABLE "_posts_v" ADD COLUMN "version_meta_og_type" "enum__posts_v_version_meta_og_type" DEFAULT 'article';
  ALTER TABLE "blog_page_settings" ADD COLUMN "meta_og_type" "enum_blog_page_settings_meta_og_type" DEFAULT 'website';
  ALTER TABLE "_blog_page_settings_v" ADD COLUMN "version_meta_og_type" "enum__blog_page_settings_v_version_meta_og_type" DEFAULT 'website';`)
}
