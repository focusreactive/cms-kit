import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "comment_reads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"comment_id" integer NOT NULL,
  	"user_id" integer NOT NULL,
  	"read_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comment_reads_id" integer;
  ALTER TABLE "comment_reads" ADD CONSTRAINT "comment_reads_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comment_reads" ADD CONSTRAINT "comment_reads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "comment_reads_comment_idx" ON "comment_reads" USING btree ("comment_id");
  CREATE INDEX "comment_reads_user_idx" ON "comment_reads" USING btree ("user_id");
  CREATE INDEX "comment_reads_updated_at_idx" ON "comment_reads" USING btree ("updated_at");
  CREATE INDEX "comment_reads_created_at_idx" ON "comment_reads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comment_reads_fk" FOREIGN KEY ("comment_reads_id") REFERENCES "public"."comment_reads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_comment_reads_id_idx" ON "payload_locked_documents_rels" USING btree ("comment_reads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comment_reads_fk";
  DROP INDEX "payload_locked_documents_rels_comment_reads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comment_reads_id";
  ALTER TABLE "comment_reads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "comment_reads" CASCADE;`)
}
