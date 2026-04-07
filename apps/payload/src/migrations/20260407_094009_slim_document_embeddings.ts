import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "document_embeddings" DROP COLUMN "title";
  ALTER TABLE "document_embeddings" DROP COLUMN "slug";
  ALTER TABLE "document_embeddings" DROP COLUMN "url";
  ALTER TABLE "document_embeddings" DROP COLUMN "image_url";
  ALTER TABLE "document_embeddings" DROP COLUMN "image_alt";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "document_embeddings" ADD COLUMN "title" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "document_embeddings" ADD COLUMN "slug" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "document_embeddings" ADD COLUMN "url" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "document_embeddings" ADD COLUMN "image_url" varchar;
  ALTER TABLE "document_embeddings" ADD COLUMN "image_alt" varchar;`)
}
