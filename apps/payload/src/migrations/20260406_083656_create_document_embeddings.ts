import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector;`)

  await db.execute(sql`
   CREATE TYPE "public"."enum_document_embeddings_collection" AS ENUM('page', 'post');
  CREATE TABLE "document_embeddings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"document_id" varchar NOT NULL,
  	"collection" "enum_document_embeddings_collection" NOT NULL,
  	"locale" varchar NOT NULL,
  	"title" varchar DEFAULT '' NOT NULL,
  	"slug" varchar DEFAULT '' NOT NULL,
  	"url" varchar DEFAULT '' NOT NULL,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE document_embeddings ADD COLUMN embedding vector(1536);                                                                                  
  ALTER TABLE document_embeddings ADD COLUMN fts_content tsvector;                                                                                    
  CREATE INDEX document_embeddings_embedding_idx ON document_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);               
  CREATE INDEX document_embeddings_fts_idx ON document_embeddings USING GIN (fts_content);
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "document_embeddings_id" integer;
  CREATE INDEX "document_embeddings_updated_at_idx" ON "document_embeddings" USING btree ("updated_at");
  CREATE INDEX "document_embeddings_created_at_idx" ON "document_embeddings" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_document_embeddings_fk" FOREIGN KEY ("document_embeddings_id") REFERENCES "public"."document_embeddings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_document_embeddings_id_idx" ON "payload_locked_documents_rels" USING btree ("document_embeddings_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_document_embeddings_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_document_embeddings_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "document_embeddings_id";
  DROP INDEX IF EXISTS "document_embeddings_embedding_idx";
  DROP INDEX IF EXISTS "document_embeddings_fts_idx";
  DROP TABLE IF EXISTS "document_embeddings" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_document_embeddings_collection";`)
}
