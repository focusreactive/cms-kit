import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "document_embeddings" AS older
    USING "document_embeddings" AS newer
    WHERE older."id" < newer."id"
      AND older."document_id" = newer."document_id"
      AND older."collection" = newer."collection"
      AND older."locale" = newer."locale";

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'document_embeddings_document_locale_unique'
      ) THEN
        ALTER TABLE "document_embeddings"
        ADD CONSTRAINT "document_embeddings_document_locale_unique"
        UNIQUE ("document_id", "collection", "locale");
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "document_embeddings"
    DROP CONSTRAINT IF EXISTS "document_embeddings_document_locale_unique";
  `)
}
