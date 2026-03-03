import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  ALTER TABLE "posts_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_authors_id_idx" ON "posts_rels" USING btree ("authors_id");
  CREATE INDEX "_posts_v_rels_authors_id_idx" ON "_posts_v_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  ALTER TABLE "posts_rels" DROP COLUMN "users_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "users_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "authors" CASCADE;`)

  await db.execute(sql`
   DO $$ 
   BEGIN
     ALTER TABLE "posts_rels" DROP COLUMN "authors_id";
   EXCEPTION WHEN undefined_column THEN NULL;
   END $$;`)

  await db.execute(sql`
   DO $$ 
   BEGIN
     ALTER TABLE "_posts_v_rels" DROP COLUMN "authors_id";
   EXCEPTION WHEN undefined_column THEN NULL;
   END $$;`)

  await db.execute(sql`
   DO $$ 
   BEGIN
     ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "authors_id";
   EXCEPTION WHEN undefined_column THEN NULL;
   END $$;`)

  await db.execute(sql`
   ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
   ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
   
   DO $$
   BEGIN
     ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
   EXCEPTION WHEN undefined_object THEN NULL;
   END $$;
   
   DO $$
   BEGIN
     ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
   EXCEPTION WHEN undefined_object THEN NULL;
   END $$;
   
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
   CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
   CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");`)
}
