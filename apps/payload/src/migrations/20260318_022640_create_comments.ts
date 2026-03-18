import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "comments_mentions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL
  );
  
  CREATE TABLE "comments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" numeric,
  	"collection_slug" varchar,
  	"global_slug" varchar,
  	"field_path" varchar,
  	"locale" varchar,
  	"text" varchar NOT NULL,
  	"author_id" integer NOT NULL,
  	"is_resolved" boolean DEFAULT false,
  	"resolved_by_id" integer,
  	"resolved_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "presets_locales" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_heading" varchar;
  ALTER TABLE "presets_locales" ADD COLUMN "testimonials_list_subheading" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
  ALTER TABLE "comments_mentions" ADD CONSTRAINT "comments_mentions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comments_mentions" ADD CONSTRAINT "comments_mentions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comments" ADD CONSTRAINT "comments_resolved_by_id_users_id_fk" FOREIGN KEY ("resolved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "comments_mentions_order_idx" ON "comments_mentions" USING btree ("_order");
  CREATE INDEX "comments_mentions_parent_id_idx" ON "comments_mentions" USING btree ("_parent_id");
  CREATE INDEX "comments_mentions_user_idx" ON "comments_mentions" USING btree ("user_id");
  CREATE INDEX "comments_document_id_idx" ON "comments" USING btree ("document_id");
  CREATE INDEX "comments_collection_slug_idx" ON "comments" USING btree ("collection_slug");
  CREATE INDEX "comments_global_slug_idx" ON "comments" USING btree ("global_slug");
  CREATE INDEX "comments_field_path_idx" ON "comments" USING btree ("field_path");
  CREATE INDEX "comments_locale_idx" ON "comments" USING btree ("locale");
  CREATE INDEX "comments_author_idx" ON "comments" USING btree ("author_id");
  CREATE INDEX "comments_resolved_by_idx" ON "comments" USING btree ("resolved_by_id");
  CREATE INDEX "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX "comments_created_at_idx" ON "comments" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  ALTER TABLE "presets" DROP COLUMN "hero_title";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_heading";
  ALTER TABLE "presets" DROP COLUMN "testimonials_list_subheading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comments_mentions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "comments_mentions" CASCADE;
  DROP TABLE "comments" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
  
  DROP INDEX "payload_locked_documents_rels_comments_id_idx";
  ALTER TABLE "presets" ADD COLUMN "hero_title" varchar;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_heading" varchar;
  ALTER TABLE "presets" ADD COLUMN "testimonials_list_subheading" varchar;
  ALTER TABLE "presets_locales" DROP COLUMN "hero_title";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_heading";
  ALTER TABLE "presets_locales" DROP COLUMN "testimonials_list_subheading";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comments_id";`)
}
