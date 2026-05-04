import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS document_embeddings_fts_idx;
    ALTER TABLE document_embeddings DROP COLUMN IF EXISTS fts_content;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE document_embeddings ADD COLUMN fts_content tsvector;
    CREATE INDEX document_embeddings_fts_idx ON document_embeddings USING GIN (fts_content);
  `)
}
